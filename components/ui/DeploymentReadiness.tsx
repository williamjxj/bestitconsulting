'use client'

import React, { useState, useEffect } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Rocket,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Zap,
  Star,
  Award,
  Shield,
  Target,
  Eye,
  Bug,
  TestTube,
  Smartphone,
  Monitor,
  Globe,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react'

interface DeploymentReadinessProps extends HTMLMotionProps<'div'> {
  checks: Array<{
    id: string
    name: string
    category:
      | 'performance'
      | 'accessibility'
      | 'security'
      | 'compatibility'
      | 'testing'
    status: 'pending' | 'running' | 'passed' | 'failed' | 'warning'
    description: string
    impact: 'high' | 'medium' | 'low'
    duration: number
    issues: string[]
    icon: React.ReactNode
  }>
  metrics: {
    totalChecks: number
    passedChecks: number
    failedChecks: number
    warningChecks: number
    overallScore: number
    deploymentReady: boolean
  }
  onCheckRun?: (checkId: string) => void
  onAllChecksRun?: () => void
  onDeploy?: () => void
  className?: string
}

const DeploymentReadiness: React.FC<DeploymentReadinessProps> = ({
  checks,
  metrics,
  onCheckRun,
  onAllChecksRun,
  onDeploy,
  className,
  ...rest
}) => {
  const [checkResults, setCheckResults] = useState<Record<string, string>>({})
  const [isRunning, setIsRunning] = useState(false)
  const [currentCheck, setCurrentCheck] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [animatedMetrics, setAnimatedMetrics] = useState({
    totalChecks: 0,
    passedChecks: 0,
    failedChecks: 0,
    warningChecks: 0,
    overallScore: 0,
    deploymentReady: false,
  })
  const prefersReducedMotion = useReducedMotion()

  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'deployment-readiness',
      name: 'Deployment Readiness',
      type: 'interaction',
      duration: 800,
      easing: 'easeOut',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-deployment',
        staticFallback: true,
      },
      performance: {
        maxDuration: 800,
        targetFPS: 60,
        memoryLimit: 18,
        gpuAcceleration: true,
      },
    },
    'deployment-readiness'
  )

  // Animate metrics
  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimatedMetrics(metrics)
      return
    }

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedMetrics({
        totalChecks: Math.round(metrics.totalChecks * progress),
        passedChecks: Math.round(metrics.passedChecks * progress),
        failedChecks: Math.round(metrics.failedChecks * progress),
        warningChecks: Math.round(metrics.warningChecks * progress),
        overallScore: Math.round(metrics.overallScore * progress),
        deploymentReady: metrics.deploymentReady,
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedMetrics(metrics)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [metrics, prefersReducedMotion])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance':
        return 'bg-blue-100 text-blue-800'
      case 'accessibility':
        return 'bg-green-100 text-green-800'
      case 'security':
        return 'bg-red-100 text-red-800'
      case 'compatibility':
        return 'bg-purple-100 text-purple-800'
      case 'testing':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      case 'running':
        return 'bg-blue-100 text-blue-800'
      case 'passed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className='h-4 w-4' />
      case 'running':
        return <Activity className='h-4 w-4' />
      case 'passed':
        return <CheckCircle className='h-4 w-4' />
      case 'failed':
        return <XCircle className='h-4 w-4' />
      case 'warning':
        return <AlertTriangle className='h-4 w-4' />
      default:
        return <Clock className='h-4 w-4' />
    }
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

  const runAllChecks = async () => {
    setIsRunning(true)
    setProgress(0)
    setCurrentCheck(null)

    const totalChecks = checks.length
    let completedChecks = 0

    for (const check of checks) {
      setCurrentCheck(check.id)

      // Simulate check execution
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simulate check result
      const result =
        Math.random() > 0.1
          ? 'passed'
          : Math.random() > 0.5
            ? 'failed'
            : 'warning'
      setCheckResults(prev => ({ ...prev, [check.id]: result }))

      completedChecks++
      setProgress((completedChecks / totalChecks) * 100)
    }

    setIsRunning(false)
    setCurrentCheck(null)
    setProgress(100)

    if (onAllChecksRun) {
      onAllChecksRun()
    }
  }

  const runSingleCheck = async (checkId: string) => {
    setCurrentCheck(checkId)

    // Simulate check execution
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate check result
    const result =
      Math.random() > 0.1
        ? 'passed'
        : Math.random() > 0.5
          ? 'failed'
          : 'warning'
    setCheckResults(prev => ({ ...prev, [checkId]: result }))

    setCurrentCheck(null)

    if (onCheckRun) {
      onCheckRun(checkId)
    }
  }

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`space-y-6 ${className}`} {...(rest as any)}>
        {/* Deployment status */}
        <div className='bg-white p-4 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <Rocket className='h-5 w-5 text-blue-500' />
              <h3 className='text-lg font-semibold'>Deployment Readiness</h3>
            </div>
            <Badge
              className={
                metrics.deploymentReady
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }
            >
              {metrics.deploymentReady ? 'Ready' : 'Not Ready'}
            </Badge>
          </div>
          <Button onClick={runAllChecks} disabled={isRunning}>
            {isRunning ? 'Running Checks...' : 'Run All Checks'}
          </Button>
        </div>

        {/* Metrics */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <TestTube className='h-5 w-5 text-blue-500' />
              <span className='text-sm font-medium text-gray-600'>
                Total Checks
              </span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.totalChecks}
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <CheckCircle className='h-5 w-5 text-green-500' />
              <span className='text-sm font-medium text-gray-600'>Passed</span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.passedChecks}
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <XCircle className='h-5 w-5 text-red-500' />
              <span className='text-sm font-medium text-gray-600'>Failed</span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.failedChecks}
            </div>
          </div>
        </div>

        {/* Checks */}
        <div>
          <h4 className='text-md font-semibold mb-3'>Pre-Deployment Checks</h4>
          <div className='space-y-2'>
            {checks.map(check => (
              <div
                key={check.id}
                className='bg-white p-4 rounded-lg shadow-sm border'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    {check.icon}
                    <div>
                      <div className='font-medium'>{check.name}</div>
                      <div className='text-sm text-gray-600'>
                        {check.description}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Badge className={getStatusColor(check.status)}>
                      {check.status}
                    </Badge>
                    <Badge className={getImpactColor(check.impact)}>
                      {check.impact} impact
                    </Badge>
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

  const checkVariants = {
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
      {/* Deployment status */}
      <motion.div
        variants={containerVariants}
        className='bg-white p-4 rounded-lg shadow-sm border'
      >
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2'>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: animatedMetrics.deploymentReady ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Rocket className='h-5 w-5 text-blue-500' />
            </motion.div>
            <h3 className='text-lg font-semibold'>Deployment Readiness</h3>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Badge
              className={
                animatedMetrics.deploymentReady
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }
            >
              {animatedMetrics.deploymentReady ? 'Ready' : 'Not Ready'}
            </Badge>
          </motion.div>
        </div>

        <div className='flex items-center gap-4'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runAllChecks}
            disabled={isRunning}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50'
          >
            {isRunning ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className='inline-block mr-2'
                >
                  <Activity className='h-4 w-4' />
                </motion.div>
                Running Checks...
              </>
            ) : (
              <>
                <Play className='h-4 w-4 mr-2' />
                Run All Checks
              </>
            )}
          </motion.button>

          {animatedMetrics.deploymentReady && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDeploy}
              className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'
            >
              <Rocket className='h-4 w-4 mr-2' />
              Deploy Now
            </motion.button>
          )}
        </div>

        {isRunning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className='mt-4 space-y-2'
          >
            <div className='flex items-center justify-between text-sm text-gray-600'>
              <span>
                {currentCheck
                  ? `Running: ${checks.find(c => c.id === currentCheck)?.name}`
                  : 'Running checks...'}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
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
              animate={{ rotate: isRunning ? 360 : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <TestTube className='h-5 w-5 text-blue-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>
              Total Checks
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            {animatedMetrics.totalChecks}
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
              animate={{ scale: isRunning ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <CheckCircle className='h-5 w-5 text-green-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>Passed</span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            {animatedMetrics.passedChecks}
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
              animate={{ y: isRunning ? [0, -5, 0] : 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <XCircle className='h-5 w-5 text-red-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>Failed</span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            {animatedMetrics.failedChecks}
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeOut' as const }}
            className='absolute bottom-0 left-0 h-1 bg-red-500'
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
            <AlertTriangle className='h-5 w-5 text-yellow-500' />
            <span className='text-sm font-medium text-gray-600'>Warnings</span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-xl font-bold text-gray-900'
          >
            {animatedMetrics.warningChecks}
          </motion.div>
        </motion.div>

        <motion.div
          variants={metricVariants}
          whileHover='hover'
          className='bg-white p-4 rounded-lg shadow-sm border'
        >
          <div className='flex items-center gap-2 mb-2'>
            <Target className='h-5 w-5 text-purple-500' />
            <span className='text-sm font-medium text-gray-600'>
              Overall Score
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-xl font-bold text-gray-900'
          >
            {animatedMetrics.overallScore}%
          </motion.div>
        </motion.div>

        <motion.div
          variants={metricVariants}
          whileHover='hover'
          className='bg-white p-4 rounded-lg shadow-sm border'
        >
          <div className='flex items-center gap-2 mb-2'>
            <Shield className='h-5 w-5 text-indigo-500' />
            <span className='text-sm font-medium text-gray-600'>Security</span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-xl font-bold text-gray-900'
          >
            {Math.round(animatedMetrics.overallScore * 0.9)}%
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Checks */}
      <motion.div variants={containerVariants}>
        <h4 className='text-md font-semibold mb-3 flex items-center gap-2'>
          <Shield className='h-5 w-5 text-green-500' />
          Pre-Deployment Checks
        </h4>
        <div className='space-y-2'>
          {checks.map((check, index) => (
            <motion.div
              key={check.id}
              variants={checkVariants}
              whileHover='hover'
              className='bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer relative overflow-hidden'
              onClick={() => runSingleCheck(check.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Status indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`absolute top-0 left-0 h-1 ${
                  check.status === 'passed'
                    ? 'bg-green-500'
                    : check.status === 'failed'
                      ? 'bg-red-500'
                      : check.status === 'warning'
                        ? 'bg-yellow-500'
                        : check.status === 'running'
                          ? 'bg-blue-500'
                          : 'bg-gray-500'
                }`}
              />

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'
                  >
                    <motion.div
                      animate={{
                        rotate: check.status === 'running' ? 360 : 0,
                        scale: check.status === 'passed' ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: check.status === 'running' ? 1 : 0.5,
                        repeat: check.status === 'running' ? Infinity : 1,
                        ease: 'linear',
                      }}
                    >
                      {check.icon}
                    </motion.div>
                  </motion.div>
                  <div>
                    <div className='font-medium'>{check.name}</div>
                    <div className='text-sm text-gray-600'>
                      {check.description}
                    </div>
                    {check.issues.length > 0 && (
                      <div className='text-xs text-red-600'>
                        {check.issues.length} issue
                        {check.issues.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Badge className={getCategoryColor(check.category)}>
                      {check.category}
                    </Badge>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Badge className={getStatusColor(check.status)}>
                      {getStatusIcon(check.status)}
                      <span className='ml-1'>{check.status}</span>
                    </Badge>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Badge className={getImpactColor(check.impact)}>
                      {check.impact} impact
                    </Badge>
                  </motion.div>
                </div>
              </div>

              {/* Check result indicator */}
              {checkResults[check.id] && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                    checkResults[check.id] === 'passed'
                      ? 'bg-green-500'
                      : checkResults[check.id] === 'failed'
                        ? 'bg-red-500'
                        : 'bg-yellow-500'
                  }`}
                >
                  {checkResults[check.id] === 'passed' ? (
                    <CheckCircle className='h-4 w-4 text-white' />
                  ) : checkResults[check.id] === 'failed' ? (
                    <XCircle className='h-4 w-4 text-white' />
                  ) : (
                    <AlertTriangle className='h-4 w-4 text-white' />
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`border rounded-lg p-4 ${
          animatedMetrics.deploymentReady
            ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200'
            : 'bg-gradient-to-r from-red-50 to-yellow-50 border-red-200'
        }`}
      >
        <div className='flex items-center gap-2 mb-2'>
          {animatedMetrics.deploymentReady ? (
            <CheckCircle className='h-5 w-5 text-green-500' />
          ) : (
            <XCircle className='h-5 w-5 text-red-500' />
          )}
          <span
            className={`font-semibold ${
              animatedMetrics.deploymentReady
                ? 'text-green-800'
                : 'text-red-800'
            }`}
          >
            {animatedMetrics.deploymentReady
              ? 'Ready for Deployment!'
              : 'Not Ready for Deployment'}
          </span>
        </div>
        <p
          className={`text-sm ${
            animatedMetrics.deploymentReady ? 'text-green-700' : 'text-red-700'
          }`}
        >
          {animatedMetrics.passedChecks} of {animatedMetrics.totalChecks} checks
          passed. Overall score: {animatedMetrics.overallScore}%.
          {animatedMetrics.failedChecks > 0 && (
            <span className='ml-2'>
              {animatedMetrics.failedChecks} critical issues need to be
              resolved.
            </span>
          )}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default DeploymentReadiness
