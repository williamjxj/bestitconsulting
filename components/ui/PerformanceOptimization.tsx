'use client'

import React, { useState, useEffect } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Zap,
  Gauge,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  PieChart,
  Clock,
  Star,
  Award,
} from 'lucide-react'

interface PerformanceOptimizationProps extends HTMLMotionProps<'div'> {
  metrics: {
    fps: number
    memoryUsage: number
    renderTime: number
    frameDrops: number
    networkLatency: number
    bundleSize: number
  }
  optimizations: Array<{
    id: string
    name: string
    description: string
    impact: 'high' | 'medium' | 'low'
    status: 'pending' | 'applied' | 'failed'
    improvement: number
    category: 'rendering' | 'memory' | 'network' | 'bundle'
    icon: React.ReactNode
  }>
  onOptimizationApply?: (optimizationId: string) => void
  onOptimizationRevert?: (optimizationId: string) => void
  className?: string
}

const PerformanceOptimization: React.FC<PerformanceOptimizationProps> = ({
  metrics,
  optimizations,
  onOptimizationApply,
  onOptimizationRevert,
  className,
  ...rest
}) => {
  const [animatedMetrics, setAnimatedMetrics] = useState({
    fps: 0,
    memoryUsage: 0,
    renderTime: 0,
    frameDrops: 0,
    networkLatency: 0,
    bundleSize: 0,
  })
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [appliedOptimizations, setAppliedOptimizations] = useState<string[]>([])
  const [performanceScore, setPerformanceScore] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'performance-optimization',
      name: 'Performance Optimization',
      type: 'interaction',
      duration: 1000,
      easing: 'easeOut',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-performance',
        staticFallback: true,
      },
      performance: {
        maxDuration: 1000,
        targetFPS: 60,
        memoryLimit: 20,
        gpuAcceleration: true,
      },
    },
    'performance-optimization'
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
        fps: Math.round(metrics.fps * progress),
        memoryUsage: Math.round(metrics.memoryUsage * progress),
        renderTime: Math.round(metrics.renderTime * progress),
        frameDrops: Math.round(metrics.frameDrops * progress),
        networkLatency: Math.round(metrics.networkLatency * progress),
        bundleSize: Math.round(metrics.bundleSize * progress),
      })

      // Calculate performance score
      const score = Math.round(
        (metrics.fps / 60) * 30 +
          (1 - metrics.memoryUsage / 100) * 25 +
          (1 - metrics.renderTime / 100) * 25 +
          (1 - metrics.frameDrops / 10) * 20
      )
      setPerformanceScore(Math.min(100, Math.max(0, score)))

      if (currentStep >= steps) {
        clearInterval(interval)
        setIsOptimizing(false)
        setAnimatedMetrics(metrics)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [metrics, prefersReducedMotion])

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      case 'applied':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'rendering':
        return <Cpu className='h-4 w-4' />
      case 'memory':
        return <HardDrive className='h-4 w-4' />
      case 'network':
        return <Wifi className='h-4 w-4' />
      case 'bundle':
        return <Battery className='h-4 w-4' />
      default:
        return <Activity className='h-4 w-4' />
    }
  }

  const handleApplyOptimization = (optimizationId: string) => {
    setAppliedOptimizations(prev => [...prev, optimizationId])
    if (onOptimizationApply) {
      onOptimizationApply(optimizationId)
    }
  }

  const handleRevertOptimization = (optimizationId: string) => {
    setAppliedOptimizations(prev => prev.filter(id => id !== optimizationId))
    if (onOptimizationRevert) {
      onOptimizationRevert(optimizationId)
    }
  }

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`space-y-6 ${className}`} {...(rest as any)}>
        {/* Performance score */}
        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold'>Performance Score</h3>
            <Badge
              className={`${getPerformanceBgColor(performanceScore)} ${getPerformanceColor(performanceScore)}`}
            >
              {performanceScore}/100
            </Badge>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-3'>
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                performanceScore >= 90
                  ? 'bg-green-500'
                  : performanceScore >= 70
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              }`}
              style={{ width: `${performanceScore}%` }}
            />
          </div>
        </div>

        {/* Metrics */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <Gauge className='h-5 w-5 text-blue-500' />
              <span className='text-sm font-medium text-gray-600'>FPS</span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.fps}
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <HardDrive className='h-5 w-5 text-green-500' />
              <span className='text-sm font-medium text-gray-600'>Memory</span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.memoryUsage}MB
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <Clock className='h-5 w-5 text-purple-500' />
              <span className='text-sm font-medium text-gray-600'>
                Render Time
              </span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.renderTime}ms
            </div>
          </div>
        </div>

        {/* Optimizations */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>
            Optimization Opportunities
          </h3>
          <div className='space-y-3'>
            {optimizations.map(optimization => (
              <div
                key={optimization.id}
                className='bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    {optimization.icon}
                    <div>
                      <div className='font-medium'>{optimization.name}</div>
                      <div className='text-sm text-gray-600'>
                        {optimization.description}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Badge className={getImpactColor(optimization.impact)}>
                      {optimization.impact} impact
                    </Badge>
                    <Badge className={getStatusColor(optimization.status)}>
                      {optimization.status}
                    </Badge>
                    <span className='text-sm font-medium text-green-600'>
                      +{optimization.improvement}%
                    </span>
                  </div>
                </div>
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

  const optimizationVariants = {
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
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  }

  const numberVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={`space-y-6 ${className}`}
      {...(rest as any)}
    >
      {/* Performance score */}
      <motion.div
        variants={containerVariants}
        className='bg-white p-6 rounded-lg shadow-sm border'
      >
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2'>
            <motion.div
              animate={{ rotate: isOptimizing ? 360 : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Zap className='h-5 w-5 text-blue-500' />
            </motion.div>
            <h3 className='text-lg font-semibold'>Performance Score</h3>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Badge
              className={`${getPerformanceBgColor(performanceScore)} ${getPerformanceColor(performanceScore)}`}
            >
              {performanceScore}/100
            </Badge>
          </motion.div>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-3 overflow-hidden'>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${performanceScore}%` }}
            transition={{ duration: 2, ease: 'easeOut' as const }}
            className={`h-3 rounded-full relative ${
              performanceScore >= 90
                ? 'bg-green-500'
                : performanceScore >= 70
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }`}
          >
            <motion.div
              animate={{ x: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30'
            />
          </motion.div>
        </div>
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
              <Gauge className='h-5 w-5 text-blue-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>FPS</span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            {animatedMetrics.fps}
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeOut' as const }}
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
              <HardDrive className='h-5 w-5 text-green-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>Memory</span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            {animatedMetrics.memoryUsage}MB
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeOut' as const }}
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
              <Clock className='h-5 w-5 text-purple-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>
              Render Time
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            {animatedMetrics.renderTime}ms
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeOut' as const }}
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
              Frame Drops
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-xl font-bold text-gray-900'
          >
            {animatedMetrics.frameDrops}
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
              Network Latency
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-xl font-bold text-gray-900'
          >
            {animatedMetrics.networkLatency}ms
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

      {/* Optimizations */}
      <motion.div variants={containerVariants}>
        <h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
          <Zap className='h-5 w-5 text-yellow-500' />
          Optimization Opportunities
        </h3>
        <div className='space-y-3'>
          {optimizations.map((optimization, index) => (
            <motion.div
              key={optimization.id}
              variants={optimizationVariants}
              whileHover='hover'
              whileTap='tap'
              className={`bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer relative overflow-hidden ${
                appliedOptimizations.includes(optimization.id)
                  ? 'border-green-200 bg-green-50'
                  : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Status indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`absolute top-0 left-0 h-1 ${
                  optimization.impact === 'high'
                    ? 'bg-red-500'
                    : optimization.impact === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                }`}
              />

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center'
                  >
                    <motion.div
                      animate={{
                        rotate: optimization.status === 'applied' ? 360 : 0,
                      }}
                      transition={{
                        duration: 1,
                        repeat:
                          optimization.status === 'applied' ? Infinity : 0,
                        ease: 'linear',
                      }}
                    >
                      {optimization.icon}
                    </motion.div>
                  </motion.div>
                  <div>
                    <div className='font-medium'>{optimization.name}</div>
                    <div className='text-sm text-gray-600'>
                      {optimization.description}
                    </div>
                    <div className='flex items-center gap-1 mt-1'>
                      {getCategoryIcon(optimization.category)}
                      <span className='text-xs text-gray-500 capitalize'>
                        {optimization.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Badge className={getImpactColor(optimization.impact)}>
                      {optimization.impact} impact
                    </Badge>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Badge className={getStatusColor(optimization.status)}>
                      {optimization.status}
                    </Badge>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className='text-sm font-medium text-green-600'
                  >
                    +{optimization.improvement}%
                  </motion.div>
                </div>
              </div>

              {/* Action buttons */}
              {optimization.status === 'pending' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className='absolute top-2 right-2 flex gap-1'
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={e => {
                      e.stopPropagation()
                      handleApplyOptimization(optimization.id)
                    }}
                    className='p-2 bg-green-500 text-white rounded-full shadow-sm hover:shadow-md transition-all'
                  >
                    <Zap className='h-4 w-4' />
                  </motion.button>
                </motion.div>
              )}

              {optimization.status === 'applied' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className='absolute top-2 right-2 flex gap-1'
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={e => {
                      e.stopPropagation()
                      handleRevertOptimization(optimization.id)
                    }}
                    className='p-2 bg-red-500 text-white rounded-full shadow-sm hover:shadow-md transition-all'
                  >
                    <AlertTriangle className='h-4 w-4' />
                  </motion.button>
                </motion.div>
              )}

              {/* Applied indicator */}
              {appliedOptimizations.includes(optimization.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className='absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'
                >
                  <CheckCircle className='h-5 w-5 text-white' />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Applied optimizations summary */}
      {appliedOptimizations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4'
        >
          <div className='flex items-center gap-2 mb-2'>
            <Star className='h-5 w-5 text-yellow-500' />
            <span className='font-semibold text-green-800'>
              Optimizations Applied!
            </span>
          </div>
          <p className='text-sm text-green-700'>
            You've applied {appliedOptimizations.length} optimization
            {appliedOptimizations.length > 1 ? 's' : ''}. Expected improvement:
            +
            {optimizations
              .filter(opt => appliedOptimizations.includes(opt.id))
              .reduce((sum, opt) => sum + opt.improvement, 0)}
            %
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default PerformanceOptimization
