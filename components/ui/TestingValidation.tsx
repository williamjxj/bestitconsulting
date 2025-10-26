'use client'

import React, { useState, useEffect } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Star,
  Award,
  Clock,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Shield,
  Target,
  Eye,
  Bug,
  TestTube,
} from 'lucide-react'

interface TestingValidationProps extends HTMLMotionProps<'div'> {
  tests: Array<{
    id: string
    name: string
    category: 'unit' | 'integration' | 'e2e' | 'performance' | 'accessibility'
    status: 'pending' | 'running' | 'passed' | 'failed' | 'skipped'
    duration: number
    coverage: number
    issues: string[]
    icon: React.ReactNode
  }>
  metrics: {
    totalTests: number
    passedTests: number
    failedTests: number
    skippedTests: number
    coverage: number
    duration: number
  }
  onTestRun?: (testId: string) => void
  onAllTestsRun?: () => void
  onTestRetry?: (testId: string) => void
  className?: string
}

const TestingValidation: React.FC<TestingValidationProps> = ({
  tests,
  metrics,
  onTestRun,
  onAllTestsRun,
  onTestRetry,
  className,
  ...rest
}) => {
  const [testResults, setTestResults] = useState<Record<string, string>>({})
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [animatedMetrics, setAnimatedMetrics] = useState({
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    skippedTests: 0,
    coverage: 0,
    duration: 0,
  })
  const prefersReducedMotion = useReducedMotion()

  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'testing-validation',
      name: 'Testing Validation',
      type: 'interaction',
      duration: 800,
      easing: 'easeOut',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-testing',
        staticFallback: true,
      },
      performance: {
        maxDuration: 800,
        targetFPS: 60,
        memoryLimit: 15,
        gpuAcceleration: true,
      },
    },
    'testing-validation'
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
        totalTests: Math.round(metrics.totalTests * progress),
        passedTests: Math.round(metrics.passedTests * progress),
        failedTests: Math.round(metrics.failedTests * progress),
        skippedTests: Math.round(metrics.skippedTests * progress),
        coverage: Math.round(metrics.coverage * progress),
        duration: Math.round(metrics.duration * progress),
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
      case 'unit':
        return 'bg-blue-100 text-blue-800'
      case 'integration':
        return 'bg-green-100 text-green-800'
      case 'e2e':
        return 'bg-purple-100 text-purple-800'
      case 'performance':
        return 'bg-orange-100 text-orange-800'
      case 'accessibility':
        return 'bg-pink-100 text-pink-800'
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
      case 'skipped':
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
      case 'skipped':
        return <AlertTriangle className='h-4 w-4' />
      default:
        return <Clock className='h-4 w-4' />
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setProgress(0)
    setCurrentTest(null)

    const totalTests = tests.length
    let completedTests = 0

    for (const test of tests) {
      setCurrentTest(test.id)

      // Simulate test execution
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simulate test result
      const passed = Math.random() > 0.2 // 80% success rate
      setTestResults(prev => ({
        ...prev,
        [test.id]: passed ? 'passed' : 'failed',
      }))

      completedTests++
      setProgress((completedTests / totalTests) * 100)
    }

    setIsRunning(false)
    setCurrentTest(null)
    setProgress(100)

    if (onAllTestsRun) {
      onAllTestsRun()
    }
  }

  const runSingleTest = async (testId: string) => {
    setCurrentTest(testId)

    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate test result
    const passed = Math.random() > 0.2 // 80% success rate
    setTestResults(prev => ({
      ...prev,
      [testId]: passed ? 'passed' : 'failed',
    }))

    setCurrentTest(null)

    if (onTestRun) {
      onTestRun(testId)
    }
  }

  const retryTest = async (testId: string) => {
    setCurrentTest(testId)

    // Simulate retry
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Simulate test result
    const passed = Math.random() > 0.1 // 90% success rate on retry
    setTestResults(prev => ({
      ...prev,
      [testId]: passed ? 'passed' : 'failed',
    }))

    setCurrentTest(null)

    if (onTestRetry) {
      onTestRetry(testId)
    }
  }

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`space-y-6 ${className}`} {...(rest as any)}>
        {/* Test controls */}
        <div className='bg-white p-4 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold'>Test Suite</h3>
            <Button onClick={runAllTests} disabled={isRunning}>
              {isRunning ? 'Running...' : 'Run All Tests'}
            </Button>
          </div>
          {isRunning && (
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-blue-500 h-2 rounded-full transition-all duration-300'
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Metrics */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <TestTube className='h-5 w-5 text-blue-500' />
              <span className='text-sm font-medium text-gray-600'>
                Total Tests
              </span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.totalTests}
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <CheckCircle className='h-5 w-5 text-green-500' />
              <span className='text-sm font-medium text-gray-600'>Passed</span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.passedTests}
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center gap-2 mb-2'>
              <XCircle className='h-5 w-5 text-red-500' />
              <span className='text-sm font-medium text-gray-600'>Failed</span>
            </div>
            <div className='text-2xl font-bold text-gray-900'>
              {metrics.failedTests}
            </div>
          </div>
        </div>

        {/* Tests */}
        <div>
          <h4 className='text-md font-semibold mb-3'>Test Results</h4>
          <div className='space-y-2'>
            {tests.map(test => (
              <div
                key={test.id}
                className='bg-white p-4 rounded-lg shadow-sm border'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    {test.icon}
                    <div>
                      <div className='font-medium'>{test.name}</div>
                      <div className='text-sm text-gray-600'>
                        {test.category}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Badge className={getStatusColor(test.status)}>
                      {test.status}
                    </Badge>
                    <span className='text-sm font-medium'>
                      {test.duration}ms
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

  const testVariants = {
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
      {/* Test controls */}
      <motion.div
        variants={containerVariants}
        className='bg-white p-4 rounded-lg shadow-sm border'
      >
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2'>
            <motion.div
              animate={{ rotate: isRunning ? 360 : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <TestTube className='h-5 w-5 text-blue-500' />
            </motion.div>
            <h3 className='text-lg font-semibold'>Test Suite</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runAllTests}
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
                Running...
              </>
            ) : (
              <>
                <Play className='h-4 w-4 mr-2' />
                Run All Tests
              </>
            )}
          </motion.button>
        </div>
        {isRunning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className='space-y-2'
          >
            <div className='flex items-center justify-between text-sm text-gray-600'>
              <span>
                {currentTest
                  ? `Running: ${tests.find(t => t.id === currentTest)?.name}`
                  : 'Running tests...'}
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
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <TestTube className='h-5 w-5 text-blue-500' />
            </motion.div>
            <span className='text-sm font-medium text-gray-600'>
              Total Tests
            </span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-2xl font-bold text-gray-900'
          >
            {animatedMetrics.totalTests}
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
            {animatedMetrics.passedTests}
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
            {animatedMetrics.failedTests}
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
            <span className='text-sm font-medium text-gray-600'>Skipped</span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-xl font-bold text-gray-900'
          >
            {animatedMetrics.skippedTests}
          </motion.div>
        </motion.div>

        <motion.div
          variants={metricVariants}
          whileHover='hover'
          className='bg-white p-4 rounded-lg shadow-sm border'
        >
          <div className='flex items-center gap-2 mb-2'>
            <Target className='h-5 w-5 text-purple-500' />
            <span className='text-sm font-medium text-gray-600'>Coverage</span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-xl font-bold text-gray-900'
          >
            {animatedMetrics.coverage}%
          </motion.div>
        </motion.div>

        <motion.div
          variants={metricVariants}
          whileHover='hover'
          className='bg-white p-4 rounded-lg shadow-sm border'
        >
          <div className='flex items-center gap-2 mb-2'>
            <Clock className='h-5 w-5 text-indigo-500' />
            <span className='text-sm font-medium text-gray-600'>Duration</span>
          </div>
          <motion.div
            variants={numberVariants}
            className='text-xl font-bold text-gray-900'
          >
            {animatedMetrics.duration}s
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Tests */}
      <motion.div variants={containerVariants}>
        <h4 className='text-md font-semibold mb-3 flex items-center gap-2'>
          <Bug className='h-5 w-5 text-orange-500' />
          Test Results
        </h4>
        <div className='space-y-2'>
          {tests.map((test, index) => (
            <motion.div
              key={test.id}
              variants={testVariants}
              whileHover='hover'
              className='bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer relative overflow-hidden'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Status indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`absolute top-0 left-0 h-1 ${
                  test.status === 'passed'
                    ? 'bg-green-500'
                    : test.status === 'failed'
                      ? 'bg-red-500'
                      : test.status === 'running'
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
                        rotate: test.status === 'running' ? 360 : 0,
                        scale: test.status === 'passed' ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: test.status === 'running' ? 1 : 0.5,
                        repeat: test.status === 'running' ? Infinity : 1,
                        ease: 'linear',
                      }}
                    >
                      {test.icon}
                    </motion.div>
                  </motion.div>
                  <div>
                    <div className='font-medium'>{test.name}</div>
                    <div className='text-sm text-gray-600 capitalize'>
                      {test.category}
                    </div>
                    {test.issues.length > 0 && (
                      <div className='text-xs text-red-600'>
                        {test.issues.length} issue
                        {test.issues.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Badge className={getCategoryColor(test.category)}>
                      {test.category}
                    </Badge>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Badge className={getStatusColor(test.status)}>
                      {getStatusIcon(test.status)}
                      <span className='ml-1'>{test.status}</span>
                    </Badge>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className='text-sm font-medium text-gray-900'
                  >
                    {test.duration}ms
                  </motion.div>
                </div>
              </div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className='absolute top-2 right-2 flex gap-1'
              >
                {test.status === 'failed' && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={e => {
                      e.stopPropagation()
                      retryTest(test.id)
                    }}
                    className='p-2 bg-yellow-500 text-white rounded-full shadow-sm hover:shadow-md transition-all'
                  >
                    <RotateCcw className='h-4 w-4' />
                  </motion.button>
                )}

                {test.status === 'pending' && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={e => {
                      e.stopPropagation()
                      runSingleTest(test.id)
                    }}
                    className='p-2 bg-blue-500 text-white rounded-full shadow-sm hover:shadow-md transition-all'
                  >
                    <Play className='h-4 w-4' />
                  </motion.button>
                )}
              </motion.div>

              {/* Test result indicator */}
              {testResults[test.id] && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                    testResults[test.id] === 'passed'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                >
                  {testResults[test.id] === 'passed' ? (
                    <CheckCircle className='h-4 w-4 text-white' />
                  ) : (
                    <XCircle className='h-4 w-4 text-white' />
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
        className='bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4'
      >
        <div className='flex items-center gap-2 mb-2'>
          <Shield className='h-5 w-5 text-blue-500' />
          <span className='font-semibold text-blue-800'>Test Summary</span>
        </div>
        <p className='text-sm text-blue-700'>
          {animatedMetrics.passedTests} of {animatedMetrics.totalTests} tests
          passed. Coverage: {animatedMetrics.coverage}%. Total duration:{' '}
          {animatedMetrics.duration}s.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default TestingValidation
