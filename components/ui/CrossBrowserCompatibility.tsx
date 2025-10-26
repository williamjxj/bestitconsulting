'use client'

import React, { useState, useEffect } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Globe,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Chrome,
  Firefox,
  Safari,
  Edge,
  Smartphone,
  Monitor,
  Tablet,
  Wifi,
  Shield,
  Zap,
  Star,
  Award,
} from 'lucide-react'

interface CrossBrowserCompatibilityProps extends HTMLMotionProps<'div'> {
  browsers: Array<{
    id: string
    name: string
    version: string
    icon: React.ReactNode
    support: 'full' | 'partial' | 'none'
    features: Array<{
      name: string
      supported: boolean
      fallback?: string
    }>
    performance: number
    lastTested: Date
  }>
  devices: Array<{
    id: string
    name: string
    type: 'desktop' | 'mobile' | 'tablet'
    icon: React.ReactNode
    compatibility: number
    issues: string[]
  }>
  onBrowserTest?: (browserId: string) => void
  onDeviceTest?: (deviceId: string) => void
  className?: string
}

const CrossBrowserCompatibility: React.FC<CrossBrowserCompatibilityProps> = ({
  browsers,
  devices,
  onBrowserTest,
  onDeviceTest,
  className,
  ...rest
}) => {
  const [testResults, setTestResults] = useState<Record<string, boolean>>({})
  const [isTesting, setIsTesting] = useState(false)
  const [testProgress, setTestProgress] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'cross-browser-compatibility',
      name: 'Cross Browser Compatibility',
      type: 'interaction',
      duration: 800,
      easing: 'ease-out',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-compatibility',
        staticFallback: true,
      },
      performance: {
        maxDuration: 800,
        targetFPS: 60,
        memoryLimit: 15,
        gpuAcceleration: true,
      },
    },
    'cross-browser-compatibility'
  )

  const getSupportColor = (support: string) => {
    switch (support) {
      case 'full':
        return 'bg-green-100 text-green-800'
      case 'partial':
        return 'bg-yellow-100 text-yellow-800'
      case 'none':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSupportIcon = (support: string) => {
    switch (support) {
      case 'full':
        return <CheckCircle className='h-4 w-4' />
      case 'partial':
        return <AlertTriangle className='h-4 w-4' />
      case 'none':
        return <XCircle className='h-4 w-4' />
      default:
        return <Globe className='h-4 w-4' />
    }
  }

  const getDeviceTypeIcon = (type: string) => {
    switch (type) {
      case 'desktop':
        return <Monitor className='h-4 w-4' />
      case 'mobile':
        return <Smartphone className='h-4 w-4' />
      case 'tablet':
        return <Tablet className='h-4 w-4' />
      default:
        return <Globe className='h-4 w-4' />
    }
  }

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getCompatibilityBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100'
    if (score >= 70) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const runCompatibilityTest = async () => {
    setIsTesting(true)
    setTestProgress(0)

    // Simulate testing progress
    const totalTests = browsers.length + devices.length
    let completedTests = 0

    const testInterval = setInterval(() => {
      completedTests++
      setTestProgress((completedTests / totalTests) * 100)

      if (completedTests >= totalTests) {
        clearInterval(testInterval)
        setIsTesting(false)
        setTestProgress(100)
      }
    }, 500)

    // Simulate test results
    setTimeout(() => {
      const results: Record<string, boolean> = {}
      browsers.forEach(browser => {
        results[browser.id] = Math.random() > 0.2 // 80% success rate
      })
      devices.forEach(device => {
        results[device.id] = Math.random() > 0.3 // 70% success rate
      })
      setTestResults(results)
    }, 2000)
  }

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`space-y-6 ${className}`} {...rest}>
        {/* Test controls */}
        <div className='bg-white p-4 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold'>Compatibility Testing</h3>
            <Button onClick={runCompatibilityTest} disabled={isTesting}>
              {isTesting ? 'Testing...' : 'Run Tests'}
            </Button>
          </div>
          {isTesting && (
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-blue-500 h-2 rounded-full transition-all duration-300'
                style={{ width: `${testProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* Browsers */}
        <div>
          <h4 className='text-md font-semibold mb-3'>Browser Support</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {browsers.map(browser => (
              <div
                key={browser.id}
                className='bg-white p-4 rounded-lg shadow-sm border'
              >
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    {browser.icon}
                    <span className='font-medium'>
                      {browser.name} {browser.version}
                    </span>
                  </div>
                  <Badge className={getSupportColor(browser.support)}>
                    {browser.support}
                  </Badge>
                </div>
                <div className='text-sm text-gray-600'>
                  Performance: {browser.performance}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div>
          <h4 className='text-md font-semibold mb-3'>Device Compatibility</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
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
                  <Badge
                    className={getCompatibilityBgColor(device.compatibility)}
                  >
                    {device.compatibility}%
                  </Badge>
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

  const itemVariants = {
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

  const testVariants = {
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
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
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
      {/* Test controls */}
      <motion.div
        variants={containerVariants}
        className='bg-white p-4 rounded-lg shadow-sm border'
      >
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2'>
            <motion.div
              animate={{ rotate: isTesting ? 360 : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Globe className='h-5 w-5 text-blue-500' />
            </motion.div>
            <h3 className='text-lg font-semibold'>Compatibility Testing</h3>
          </div>
          <motion.div variants={testVariants} whileHover='hover' whileTap='tap'>
            <Button onClick={runCompatibilityTest} disabled={isTesting}>
              {isTesting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className='mr-2'
                  >
                    <Zap className='h-4 w-4' />
                  </motion.div>
                  Testing...
                </>
              ) : (
                <>
                  <Zap className='h-4 w-4 mr-2' />
                  Run Tests
                </>
              )}
            </Button>
          </motion.div>
        </div>
        {isTesting && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className='space-y-2'
          >
            <div className='flex items-center justify-between text-sm text-gray-600'>
              <span>Testing compatibility...</span>
              <span>{Math.round(testProgress)}%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${testProgress}%` }}
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

      {/* Browsers */}
      <motion.div variants={containerVariants}>
        <h4 className='text-md font-semibold mb-3 flex items-center gap-2'>
          <Chrome className='h-5 w-5 text-blue-500' />
          Browser Support
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          {browsers.map((browser, index) => (
            <motion.div
              key={browser.id}
              variants={itemVariants}
              whileHover='hover'
              className='bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer relative overflow-hidden'
              onClick={() => onBrowserTest?.(browser.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Status indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`absolute top-0 left-0 h-1 ${
                  browser.support === 'full'
                    ? 'bg-green-500'
                    : browser.support === 'partial'
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
                        rotate: browser.support === 'full' ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {browser.icon}
                    </motion.div>
                  </motion.div>
                  <div>
                    <div className='font-medium'>{browser.name}</div>
                    <div className='text-sm text-gray-600'>
                      {browser.version}
                    </div>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Badge className={getSupportColor(browser.support)}>
                    {getSupportIcon(browser.support)}
                    <span className='ml-1'>{browser.support}</span>
                  </Badge>
                </motion.div>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-600'>Performance:</span>
                  <span className='font-medium'>{browser.performance}%</span>
                </div>

                {/* Feature support */}
                <div className='space-y-1'>
                  {browser.features.slice(0, 3).map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                      className='flex items-center justify-between text-xs'
                    >
                      <span className='text-gray-600'>{feature.name}</span>
                      <motion.div
                        animate={{ scale: feature.supported ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {feature.supported ? (
                          <CheckCircle className='h-3 w-3 text-green-500' />
                        ) : (
                          <XCircle className='h-3 w-3 text-red-500' />
                        )}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Test result */}
              {testResults[browser.id] !== undefined && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                    testResults[browser.id] ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {testResults[browser.id] ? (
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

      {/* Devices */}
      <motion.div variants={containerVariants}>
        <h4 className='text-md font-semibold mb-3 flex items-center gap-2'>
          <Smartphone className='h-5 w-5 text-green-500' />
          Device Compatibility
        </h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          {devices.map((device, index) => (
            <motion.div
              key={device.id}
              variants={itemVariants}
              whileHover='hover'
              className='bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer relative overflow-hidden'
              onClick={() => onDeviceTest?.(device.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Status indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`absolute top-0 left-0 h-1 ${
                  device.compatibility >= 90
                    ? 'bg-green-500'
                    : device.compatibility >= 70
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
                        rotate: device.compatibility >= 90 ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {device.icon}
                    </motion.div>
                  </motion.div>
                  <div>
                    <div className='font-medium'>{device.name}</div>
                    <div className='text-sm text-gray-600 capitalize'>
                      {device.type}
                    </div>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Badge
                    className={getCompatibilityBgColor(device.compatibility)}
                  >
                    {device.compatibility}%
                  </Badge>
                </motion.div>
              </div>

              {device.issues.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className='text-sm text-red-600'
                >
                  {device.issues.length} issue
                  {device.issues.length > 1 ? 's' : ''} detected
                </motion.div>
              )}

              {/* Test result */}
              {testResults[device.id] !== undefined && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                    testResults[device.id] ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {testResults[device.id] ? (
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
          <span className='font-semibold text-blue-800'>
            Compatibility Summary
          </span>
        </div>
        <p className='text-sm text-blue-700'>
          Testing across {browsers.length} browsers and {devices.length}{' '}
          devices.
          {Object.keys(testResults).length > 0 && (
            <span className='ml-2'>
              {Object.values(testResults).filter(Boolean).length} of{' '}
              {Object.keys(testResults).length} tests passed.
            </span>
          )}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default CrossBrowserCompatibility
