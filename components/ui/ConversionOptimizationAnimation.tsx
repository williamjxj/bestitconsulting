'use client'

import React, { useState, useEffect } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  TrendingUp,
  Target,
  Zap,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart,
  Activity,
  Star,
  Award,
  Clock,
  Sparkles,
} from 'lucide-react'

interface ConversionOptimizationAnimationProps extends HTMLMotionProps<'div'> {
  optimizations: Array<{
    id: string
    name: string
    description: string
    impact: 'high' | 'medium' | 'low'
    status: 'pending' | 'in-progress' | 'completed' | 'failed'
    improvement: number
    icon: React.ReactNode
  }>
  metrics: {
    currentConversionRate: number
    targetConversionRate: number
    improvement: number
    potentialRevenue: number
  }
  onOptimizationClick?: (optimizationId: string) => void
  onApplyOptimization?: (optimizationId: string) => void
  className?: string
}

const ConversionOptimizationAnimation: React.FC<
  ConversionOptimizationAnimationProps
> = ({
  optimizations,
  metrics,
  onOptimizationClick,
  onApplyOptimization,
  className,
  ...rest
}) => {
  const [animatedMetrics, setAnimatedMetrics] = useState({
    currentConversionRate: 0,
    targetConversionRate: 0,
    improvement: 0,
    potentialRevenue: 0,
  })
  const [isAnimating, setIsAnimating] = useState(false)
  const [appliedOptimizations, setAppliedOptimizations] = useState<string[]>([])
  const prefersReducedMotion = useReducedMotion()

  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'conversion-optimization',
      name: 'Conversion Optimization',
      type: 'interaction',
      duration: 800,
      easing: 'easeOut',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-optimization',
        staticFallback: true,
      },
      performance: {
        maxDuration: 800,
        targetFPS: 60,
        memoryLimit: 18,
        gpuAcceleration: true,
      },
    },
    'conversion-optimization'
  )

  // Animate metrics
  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimatedMetrics(metrics)
      return
    }

    setIsAnimating(true)

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedMetrics({
        currentConversionRate:
          Math.round(metrics.currentConversionRate * progress * 100) / 100,
        targetConversionRate:
          Math.round(metrics.targetConversionRate * progress * 100) / 100,
        improvement: Math.round(metrics.improvement * progress * 100) / 100,
        potentialRevenue: Math.round(metrics.potentialRevenue * progress),
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setIsAnimating(false)
        setAnimatedMetrics(metrics)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [metrics, prefersReducedMotion])

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
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleApplyOptimization = (optimizationId: string) => {
    setAppliedOptimizations(prev => [...prev, optimizationId])
    if (onApplyOptimization) {
      onApplyOptimization(optimizationId)
    }
  }

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`space-y-6 ${className}`} {...(rest as any)}>
        {/* Metrics overview */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <Target className='h-5 w-5 text-blue-500' />
              <span className='text-sm font-medium text-gray-600'>
                Current Rate
              </span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.currentConversionRate}%
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <TrendingUp className='h-5 w-5 text-green-500' />
              <span className='text-sm font-medium text-gray-600'>
                Target Rate
              </span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.targetConversionRate}%
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <ArrowUp className='h-5 w-5 text-purple-500' />
              <span className='text-sm font-medium text-gray-600'>
                Improvement
              </span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              +{metrics.improvement}%
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <Award className='h-5 w-5 text-orange-500' />
              <span className='text-sm font-medium text-gray-600'>
                Potential Revenue
              </span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              ${metrics.potentialRevenue.toLocaleString()}
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
                onClick={() => onOptimizationClick?.(optimization.id)}
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
      {/* Metrics overview */}
      <motion.div
        variants={containerVariants}
        className='grid grid-cols-2 md:grid-cols-4 gap-4'
      >
        <motion.div
          variants={metricVariants}
          whileHover='hover'
          className='bg-white p-4 rounded-lg shadow-sm border relative overflow-hidden'
        >
          <div className='flex items-center gap-2 mb-2'>
            <motion.div
              animate={{ rotate: isAnimating ? 360 : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Target className='h-5 w-5 text-blue-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>
              Current Rate
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            {animatedMetrics.currentConversionRate}%
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
              animate={{ scale: isAnimating ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <TrendingUp className='h-5 w-5 text-green-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>
              Target Rate
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            {animatedMetrics.targetConversionRate}%
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
              animate={{ y: isAnimating ? [0, -5, 0] : 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowUp className='h-5 w-5 text-purple-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>
              Improvement
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            +{animatedMetrics.improvement}%
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeOut' as const }}
            className='absolute bottom-0 left-0 h-1 bg-purple-500'
          />
        </motion.div>

        <motion.div
          variants={metricVariants}
          whileHover='hover'
          className='bg-white p-4 rounded-lg shadow-sm border relative overflow-hidden'
        >
          <div className='flex items-center gap-2 mb-2'>
            <motion.div
              animate={{ rotate: isAnimating ? [0, 10, -10, 0] : 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Award className='h-5 w-5 text-orange-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>
              Potential Revenue
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            ${animatedMetrics.potentialRevenue.toLocaleString()}
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeOut' as const }}
            className='absolute bottom-0 left-0 h-1 bg-orange-500'
          />
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        variants={containerVariants}
        className='bg-white p-4 rounded-lg shadow-sm border'
      >
        <div className='flex items-center justify-between mb-2'>
          <span className='text-sm font-medium text-gray-600'>
            Conversion Rate Progress
          </span>
          <span className='text-sm text-gray-500'>
            {animatedMetrics.currentConversionRate}% →{' '}
            {animatedMetrics.targetConversionRate}%
          </span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-3 overflow-hidden'>
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${(animatedMetrics.currentConversionRate / animatedMetrics.targetConversionRate) * 100}%`,
            }}
            transition={{ duration: 2, ease: 'easeOut' as const }}
            className='h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full relative'
          >
            <motion.div
              animate={{ x: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30'
            />
          </motion.div>
        </div>
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
              onClick={() => onOptimizationClick?.(optimization.id)}
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
                        rotate: optimization.status === 'in-progress' ? 360 : 0,
                      }}
                      transition={{
                        duration: 1,
                        repeat:
                          optimization.status === 'in-progress' ? Infinity : 0,
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

              {/* Action button */}
              {optimization.status === 'pending' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className='absolute top-2 right-2'
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

export default ConversionOptimizationAnimation
