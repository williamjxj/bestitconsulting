'use client'

import React, { useState, useEffect } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Smartphone,
  Tablet,
  Monitor,
  Wifi,
  Battery,
  Touch,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Zap,
  Star,
  Award,
  Clock,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'

interface MobileOptimizationProps extends HTMLMotionProps<'div'> {
  devices: Array<{
    id: string
    name: string
    type: 'mobile' | 'tablet' | 'desktop'
    screenSize: string
    resolution: string
    icon: React.ReactNode
    performance: number
    issues: string[]
    optimizations: Array<{
      name: string
      applied: boolean
      impact: 'high' | 'medium' | 'low'
    }>
  }>
  metrics: {
    touchTargets: number
    loadingTime: number
    responsiveBreakpoints: number
    imageOptimization: number
    fontLoading: number
    bundleSize: number
  }
  onDeviceOptimize?: (deviceId: string) => void
  onOptimizationApply?: (deviceId: string, optimizationName: string) => void
  className?: string
}

const MobileOptimization: React.FC<MobileOptimizationProps> = ({
  devices,
  metrics,
  onDeviceOptimize,
  onOptimizationApply,
  className,
  ...rest
}) => {
  const [animatedMetrics, setAnimatedMetrics] = useState({
    touchTargets: 0,
    loadingTime: 0,
    responsiveBreakpoints: 0,
    imageOptimization: 0,
    fontLoading: 0,
    bundleSize: 0,
  })
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationProgress, setOptimizationProgress] = useState(0)
  const [appliedOptimizations, setAppliedOptimizations] = useState<
    Record<string, string[]>
  >({})
  const prefersReducedMotion = useReducedMotion()

  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'mobile-optimization',
      name: 'Mobile Optimization',
      type: 'interaction',
      duration: 800,
      easing: 'ease-out',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-mobile',
        staticFallback: true,
      },
      performance: {
        maxDuration: 800,
        targetFPS: 60,
        memoryLimit: 18,
        gpuAcceleration: true,
      },
    },
    'mobile-optimization'
  )

  // Animate metrics
  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimatedMetrics(metrics)
      return
    }

    setIsOptimizing(true)

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedMetrics({
        touchTargets: Math.round(metrics.touchTargets * progress),
        loadingTime: Math.round(metrics.loadingTime * progress),
        responsiveBreakpoints: Math.round(
          metrics.responsiveBreakpoints * progress
        ),
        imageOptimization: Math.round(metrics.imageOptimization * progress),
        fontLoading: Math.round(metrics.fontLoading * progress),
        bundleSize: Math.round(metrics.bundleSize * progress),
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setIsOptimizing(false)
        setAnimatedMetrics(metrics)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [metrics, prefersReducedMotion])

  const getDeviceTypeIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className='h-4 w-4' />
      case 'tablet':
        return <Tablet className='h-4 w-4' />
      case 'desktop':
        return <Monitor className='h-4 w-4' />
      default:
        return <Smartphone className='h-4 w-4' />
    }
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getPerformanceBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100'
    if (score >= 70) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleOptimizationApply = (
    deviceId: string,
    optimizationName: string
  ) => {
    setAppliedOptimizations(prev => ({
      ...prev,
      [deviceId]: [...(prev[deviceId] || []), optimizationName],
    }))
    if (onOptimizationApply) {
      onOptimizationApply(deviceId, optimizationName)
    }
  }

  const runOptimization = async () => {
    setIsOptimizing(true)
    setOptimizationProgress(0)

    // Simulate optimization progress
    const totalSteps = 100
    let currentStep = 0

    const progressInterval = setInterval(() => {
      currentStep += 2
      setOptimizationProgress(currentStep)

      if (currentStep >= totalSteps) {
        clearInterval(progressInterval)
        setIsOptimizing(false)
        setOptimizationProgress(100)
      }
    }, 50)
  }

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`space-y-6 ${className}`} {...rest}>
        {/* Optimization controls */}
        <div className='bg-white p-4 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold'>Mobile Optimization</h3>
            <Button onClick={runOptimization} disabled={isOptimizing}>
              {isOptimizing ? 'Optimizing...' : 'Run Optimization'}
            </Button>
          </div>
          {isOptimizing && (
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-blue-500 h-2 rounded-full transition-all duration-300'
                style={{ width: `${optimizationProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* Metrics */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <Touch className='h-5 w-5 text-blue-500' />
              <span className='text-sm font-medium text-gray-600'>
                Touch Targets
              </span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.touchTargets}
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <Clock className='h-5 w-5 text-green-500' />
              <span className='text-sm font-medium text-gray-600'>
                Loading Time
              </span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.loadingTime}s
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <BarChart3 className='h-5 w-5 text-purple-500' />
              <span className='text-sm font-medium text-gray-600'>
                Breakpoints
              </span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.responsiveBreakpoints}
            </div>
          </div>
        </div>

        {/* Devices */}
        <div>
          <h4 className='text-md font-semibold mb-3'>Device Performance</h4>
          <div className='space-y-3'>
            {devices.map(device => (
              <div
                key={device.id}
                className='bg-white p-4 rounded-lg shadow-sm border'
              >
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    {device.icon}
                    <span className='font-medium'>{device.name}</span>
                  </div>
                  <Badge className={getPerformanceBgColor(device.performance)}>
                    {device.performance}%
                  </Badge>
                </div>
                <div className='text-sm text-gray-600 mb-2'>
                  {device.screenSize} • {device.resolution}
                </div>
                {device.issues.length > 0 && (
                  <div className='text-sm text-red-600'>
                    {device.issues.length} issue
                    {device.issues.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: optimizedConfig.duration / 1000,
        staggerChildren: 0.1,
        ease: optimizedConfig.easing,
      },
    },
  }

  const metricVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  }

  const deviceVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  }

  const numberVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'ease-out',
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={`space-y-6 ${className}`}
      {...rest}
    >
      {/* Optimization controls */}
      <motion.div
        variants={containerVariants}
        className='bg-white p-4 rounded-lg shadow-sm border'
      >
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2'>
            <motion.div
              animate={{ rotate: isOptimizing ? 360 : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Smartphone className='h-5 w-5 text-blue-500' />
            </motion.div>
            <h3 className='text-lg font-semibold'>Mobile Optimization</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runOptimization}
            disabled={isOptimizing}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50'
          >
            {isOptimizing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className='inline-block mr-2'
                >
                  <Zap className='h-4 w-4' />
                </motion.div>
                Optimizing...
              </>
            ) : (
              <>
                <Zap className='h-4 w-4 mr-2' />
                Run Optimization
              </>
            )}
          </motion.button>
        </div>
        {isOptimizing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className='space-y-2'
          >
            <div className='flex items-center justify-between text-sm text-gray-600'>
              <span>Optimizing mobile experience...</span>
              <span>{optimizationProgress}%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${optimizationProgress}%` }}
                transition={{ duration: 0.3 }}
                className='h-2 bg-blue-500 rounded-full relative'
              >
                <motion.div
                  animate={{ x: ['0%', '100%', '0%'] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30'
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Metrics */}
      <motion.div
        variants={containerVariants}
        className='grid grid-cols-2 md:grid-cols-3 gap-4'
      >
        <motion.div
          variants={metricVariants}
          whileHover='hover'
          className='bg-white p-4 rounded-lg shadow-sm border relative overflow-hidden'
        >
          <div className='flex items-center gap-2 mb-2'>
            <motion.div
              animate={{ rotate: isOptimizing ? 360 : 0 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Touch className='h-5 w-5 text-blue-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>
              Touch Targets
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            {animatedMetrics.touchTargets}
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'ease-out' }}
            className='absolute bottom-0 left-0 h-1 bg-blue-500'
          />
        </motion.div>

        <motion.div
          variants={metricVariants}
          whileHover='hover'
          className='bg-white p-4 rounded-lg shadow-sm border relative overflow-hidden'
        >
          <div className='flex items-center gap-2 mb-2'>
            <motion.div
              animate={{ scale: isOptimizing ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Clock className='h-5 w-5 text-green-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>
              Loading Time
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            {animatedMetrics.loadingTime}s
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'ease-out' }}
            className='absolute bottom-0 left-0 h-1 bg-green-500'
          />
        </motion.div>

        <motion.div
          variants={metricVariants}
          whileHover='hover'
          className='bg-white p-4 rounded-lg shadow-sm border relative overflow-hidden'
        >
          <div className='flex items-center gap-2 mb-2'>
            <motion.div
              animate={{ y: isOptimizing ? [0, -5, 0] : 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <BarChart3 className='h-5 w-5 text-purple-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>
              Breakpoints
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            {animatedMetrics.responsiveBreakpoints}
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'ease-out' }}
            className='absolute bottom-0 left-0 h-1 bg-purple-500'
          />
        </motion.div>
      </motion.div>

      {/* Additional metrics */}
      <motion.div
        variants={containerVariants}
        className='grid grid-cols-2 md:grid-cols-3 gap-4'
      >
        <motion.div
          variants={metricVariants}
          whileHover='hover'
          className='bg-white p-4 rounded-lg shadow-sm border'
        >
          <div className='flex items-center gap-2 mb-2'>
            <Activity className='h-5 w-5 text-orange-500' />
            <span className='text-sm font-medium text-gray-600'>
              Image Optimization
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-xl font-bold text-gray-900'
          >
            {animatedMetrics.imageOptimization}%
          </motion.div>
        </motion.div>

        <motion.div
          variants={metricVariants}
          whileHover='hover'
          className='bg-white p-4 rounded-lg shadow-sm border'
        >
          <div className='flex items-center gap-2 mb-2'>
            <Wifi className='h-5 w-5 text-indigo-500' />
            <span className='text-sm font-medium text-gray-600'>
              Font Loading
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-xl font-bold text-gray-900'
          >
            {animatedMetrics.fontLoading}%
          </motion.div>
        </motion.div>

        <motion.div
          variants={metricVariants}
          whileHover='hover'
          className='bg-white p-4 rounded-lg shadow-sm border'
        >
          <div className='flex items-center gap-2 mb-2'>
            <Battery className='h-5 w-5 text-red-500' />
            <span className='text-sm font-medium text-gray-600'>
              Bundle Size
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-xl font-bold text-gray-900'
          >
            {animatedMetrics.bundleSize}KB
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Devices */}
      <motion.div variants={containerVariants}>
        <h4 className='text-md font-semibold mb-3 flex items-center gap-2'>
          <Smartphone className='h-5 w-5 text-green-500' />
          Device Performance
        </h4>
        <div className='space-y-3'>
          {devices.map((device, index) => (
            <motion.div
              key={device.id}
              variants={deviceVariants}
              whileHover='hover'
              className='bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer relative overflow-hidden'
              onClick={() => onDeviceOptimize?.(device.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Status indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`absolute top-0 left-0 h-1 ${
                  device.performance >= 90
                    ? 'bg-green-500'
                    : device.performance >= 70
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
              />

              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2'>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'
                  >
                    <motion.div
                      animate={{
                        rotate: device.performance >= 90 ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {device.icon}
                    </motion.div>
                  </motion.div>
                  <div>
                    <div className='font-medium'>{device.name}</div>
                    <div className='text-sm text-gray-600'>
                      {device.screenSize} • {device.resolution}
                    </div>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Badge className={getPerformanceBgColor(device.performance)}>
                    {device.performance}%
                  </Badge>
                </motion.div>
              </div>

              {device.issues.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className='text-sm text-red-600 mb-2'
                >
                  {device.issues.length} issue
                  {device.issues.length > 1 ? 's' : ''} detected
                </motion.div>
              )}

              {/* Optimizations */}
              <div className='space-y-1'>
                {device.optimizations.map((optimization, optIndex) => (
                  <motion.div
                    key={optIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + optIndex * 0.05 }}
                    className='flex items-center justify-between text-xs'
                  >
                    <span className='text-gray-600'>{optimization.name}</span>
                    <div className='flex items-center gap-1'>
                      <Badge className={getImpactColor(optimization.impact)}>
                        {optimization.impact}
                      </Badge>
                      {optimization.applied ? (
                        <CheckCircle className='h-3 w-3 text-green-500' />
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={e => {
                            e.stopPropagation()
                            handleOptimizationApply(
                              device.id,
                              optimization.name
                            )
                          }}
                          className='p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors'
                        >
                          <Zap className='h-2 w-2' />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className='bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4'
      >
        <div className='flex items-center gap-2 mb-2'>
          <Star className='h-5 w-5 text-yellow-500' />
          <span className='font-semibold text-green-800'>
            Mobile Optimization Summary
          </span>
        </div>
        <p className='text-sm text-green-700'>
          Optimized for {devices.length} device types with{' '}
          {Object.values(appliedOptimizations).flat().length} optimizations
          applied. Average performance:{' '}
          {Math.round(
            devices.reduce((sum, device) => sum + device.performance, 0) /
              devices.length
          )}
          %
        </p>
      </motion.div>
    </motion.div>
  )
}

export default MobileOptimization
