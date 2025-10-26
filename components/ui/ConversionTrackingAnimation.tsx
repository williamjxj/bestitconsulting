'use client'

import React, { useState, useEffect } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  TrendingUp,
  Users,
  Target,
  CheckCircle,
  ArrowUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Star,
  Award,
  Clock,
} from 'lucide-react'

interface ConversionTrackingAnimationProps extends HTMLMotionProps<'div'> {
  metrics: {
    totalVisitors: number
    conversions: number
    conversionRate: number
    goalValue: number
    timeOnSite: number
    bounceRate: number
  }
  goals: Array<{
    id: string
    name: string
    value: number
    achieved: boolean
    icon: React.ReactNode
  }>
  onGoalAchieved?: (goalId: string) => void
  className?: string
}

const ConversionTrackingAnimation: React.FC<
  ConversionTrackingAnimationProps
> = ({ metrics, goals, onGoalAchieved, className, ...rest }) => {
  const [animatedMetrics, setAnimatedMetrics] = useState({
    totalVisitors: 0,
    conversions: 0,
    conversionRate: 0,
    goalValue: 0,
    timeOnSite: 0,
    bounceRate: 0,
  })
  const [achievedGoals, setAchievedGoals] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'conversion-tracking',
      name: 'Conversion Tracking',
      type: 'interaction',
      duration: 1000,
      easing: 'ease-out',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-tracking',
        staticFallback: true,
      },
      performance: {
        maxDuration: 1000,
        targetFPS: 60,
        memoryLimit: 20,
        gpuAcceleration: true,
      },
    },
    'conversion-tracking'
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
        totalVisitors: Math.round(metrics.totalVisitors * progress),
        conversions: Math.round(metrics.conversions * progress),
        conversionRate:
          Math.round(metrics.conversionRate * progress * 100) / 100,
        goalValue: Math.round(metrics.goalValue * progress),
        timeOnSite: Math.round(metrics.timeOnSite * progress),
        bounceRate: Math.round(metrics.bounceRate * progress * 100) / 100,
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setIsAnimating(false)
        setAnimatedMetrics(metrics)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [metrics, prefersReducedMotion])

  // Check for goal achievements
  useEffect(() => {
    if (prefersReducedMotion) return

    goals.forEach(goal => {
      if (goal.achieved && !achievedGoals.includes(goal.id)) {
        setAchievedGoals(prev => [...prev, goal.id])
        if (onGoalAchieved) {
          onGoalAchieved(goal.id)
        }
      }
    })
  }, [goals, achievedGoals, onGoalAchieved, prefersReducedMotion])

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`space-y-6 ${className}`} {...rest}>
        {/* Metrics overview */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <Users className='h-5 w-5 text-blue-500' />
              <span className='text-sm font-medium text-gray-600'>
                Total Visitors
              </span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.totalVisitors.toLocaleString()}
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <Target className='h-5 w-5 text-green-500' />
              <span className='text-sm font-medium text-gray-600'>
                Conversions
              </span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.conversions.toLocaleString()}
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <TrendingUp className='h-5 w-5 text-purple-500' />
              <span className='text-sm font-medium text-gray-600'>
                Conversion Rate
              </span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.conversionRate}%
            </div>
          </div>
        </div>

        {/* Goals */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Goals</h3>
          <div className='space-y-2'>
            {goals.map(goal => (
              <div
                key={goal.id}
                className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
              >
                <div className='flex items-center gap-3'>
                  {goal.icon}
                  <span className='font-medium'>{goal.name}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-600'>
                    ${goal.value.toLocaleString()}
                  </span>
                  {goal.achieved ? (
                    <CheckCircle className='h-5 w-5 text-green-500' />
                  ) : (
                    <Clock className='h-5 w-5 text-gray-400' />
                  )}
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

  const goalVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    achieved: {
      scale: 1.05,
      transition: { duration: 0.3 },
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
      {/* Metrics overview */}
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
              animate={{ rotate: isAnimating ? 360 : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Users className='h-5 w-5 text-blue-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>
              Total Visitors
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            {animatedMetrics.totalVisitors.toLocaleString()}
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
              animate={{ scale: isAnimating ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Target className='h-5 w-5 text-green-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>
              Conversions
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            {animatedMetrics.conversions.toLocaleString()}
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
              animate={{ rotate: isAnimating ? [0, 10, -10, 0] : 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <TrendingUp className='h-5 w-5 text-purple-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>
              Conversion Rate
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            {animatedMetrics.conversionRate}%
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
        className='grid grid-cols-1 md:grid-cols-3 gap-4'
      >
        <motion.div
          variants={metricVariants}
          whileHover='hover'
          className='bg-white p-4 rounded-lg shadow-sm border'
        >
          <div className='flex items-center gap-2 mb-2'>
            <BarChart3 className='h-5 w-5 text-orange-500' />
            <span className='text-sm font-medium text-gray-600'>
              Goal Value
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-xl font-bold text-gray-900'
          >
            ${animatedMetrics.goalValue.toLocaleString()}
          </motion.div>
        </motion.div>

        <motion.div
          variants={metricVariants}
          whileHover='hover'
          className='bg-white p-4 rounded-lg shadow-sm border'
        >
          <div className='flex items-center gap-2 mb-2'>
            <Clock className='h-5 w-5 text-indigo-500' />
            <span className='text-sm font-medium text-gray-600'>
              Time on Site
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-xl font-bold text-gray-900'
          >
            {animatedMetrics.timeOnSite}m
          </motion.div>
        </motion.div>

        <motion.div
          variants={metricVariants}
          whileHover='hover'
          className='bg-white p-4 rounded-lg shadow-sm border'
        >
          <div className='flex items-center gap-2 mb-2'>
            <Activity className='h-5 w-5 text-red-500' />
            <span className='text-sm font-medium text-gray-600'>
              Bounce Rate
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-xl font-bold text-gray-900'
          >
            {animatedMetrics.bounceRate}%
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Goals section */}
      <motion.div variants={containerVariants}>
        <h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
          <Award className='h-5 w-5 text-yellow-500' />
          Goals
        </h3>
        <div className='space-y-2'>
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              variants={goalVariants}
              animate={goal.achieved ? 'achieved' : 'visible'}
              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                goal.achieved
                  ? 'bg-green-50 border-2 border-green-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className='flex items-center gap-3'>
                <motion.div
                  animate={goal.achieved ? { scale: [1, 1.2, 1] } : {}}
                  transition={{
                    duration: 0.5,
                    repeat: goal.achieved ? Infinity : 0,
                  }}
                >
                  {goal.icon}
                </motion.div>
                <span
                  className={`font-medium ${goal.achieved ? 'text-green-800' : 'text-gray-800'}`}
                >
                  {goal.name}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <span
                  className={`text-sm ${goal.achieved ? 'text-green-600' : 'text-gray-600'}`}
                >
                  ${goal.value.toLocaleString()}
                </span>
                {goal.achieved ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <CheckCircle className='h-5 w-5 text-green-500' />
                  </motion.div>
                ) : (
                  <Clock className='h-5 w-5 text-gray-400' />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievement celebration */}
      {achievedGoals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className='bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4'
        >
          <div className='flex items-center gap-2 mb-2'>
            <Star className='h-5 w-5 text-yellow-500' />
            <span className='font-semibold text-green-800'>Goal Achieved!</span>
          </div>
          <p className='text-sm text-green-700'>
            Congratulations! You've reached {achievedGoals.length} goal
            {achievedGoals.length > 1 ? 's' : ''}.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ConversionTrackingAnimation
