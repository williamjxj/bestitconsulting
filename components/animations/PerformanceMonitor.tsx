'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { animationPerformanceMonitor } from '@/lib/animations/performance'

interface PerformanceMonitorProps {
  className?: string
  showMetrics?: boolean
  threshold?: {
    fps: number
    memory: number
    renderTime: number
  }
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  className,
  showMetrics = false,
  threshold = {
    fps: 30,
    memory: 100,
    renderTime: 16,
  },
}) => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memoryUsage: 0,
    cpuUsage: 0,
    renderTime: 0,
  })
  const [isLowPerformance, setIsLowPerformance] = useState(false)

  useEffect(() => {
    const unsubscribe = animationPerformanceMonitor.subscribe(newMetrics => {
      setMetrics(newMetrics)

      // Check if performance is below threshold
      const lowFPS = newMetrics.fps < threshold.fps
      const highMemory = newMetrics.memoryUsage > threshold.memory
      const slowRender = newMetrics.renderTime > threshold.renderTime

      setIsLowPerformance(lowFPS || highMemory || slowRender)
    })

    // Start monitoring
    animationPerformanceMonitor.start()

    return () => {
      unsubscribe()
      animationPerformanceMonitor.stop()
    }
  }, [threshold])

  if (!showMetrics) {
    return null
  }

  return (
    <motion.div
      className={cn(
        'fixed bottom-4 right-4 bg-background/80 backdrop-blur-sm border rounded-lg p-4 text-xs font-mono z-50',
        isLowPerformance && 'border-red-500 bg-red-50/80',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='space-y-1'>
        <div className='flex items-center gap-2'>
          <div
            className={cn(
              'w-2 h-2 rounded-full',
              isLowPerformance ? 'bg-red-500' : 'bg-green-500'
            )}
          />
          <span className='font-semibold'>Performance</span>
        </div>
        <div>FPS: {metrics.fps}</div>
        <div>Memory: {metrics.memoryUsage}MB</div>
        <div>Render: {metrics.renderTime}ms</div>
        {isLowPerformance && (
          <div className='text-red-600 font-semibold'>
            Low Performance Detected
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default PerformanceMonitor
