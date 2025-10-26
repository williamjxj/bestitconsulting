'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import PerformanceMonitor from './PerformanceMonitor'
import AccessibilityAudit from './AccessibilityAudit'

interface AnimationTestSuiteProps {
  className?: string
  showPerformance?: boolean
  showAccessibility?: boolean
  showTestControls?: boolean
}

const AnimationTestSuite: React.FC<AnimationTestSuiteProps> = ({
  className,
  showPerformance = false,
  showAccessibility = false,
  showTestControls = false,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      {showTestControls && (
        <motion.button
          className={cn(
            'fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium z-50',
            className
          )}
          onClick={toggleVisibility}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isVisible ? 'Hide Tests' : 'Show Tests'}
        </motion.button>
      )}

      {isVisible && (
        <>
          {showPerformance && (
            <PerformanceMonitor
              showMetrics={true}
              threshold={{
                fps: 30,
                memory: 100,
                renderTime: 16,
              }}
            />
          )}

          {showAccessibility && (
            <AccessibilityAudit
              showAudit={true}
              onAuditComplete={results => {
                console.log('Accessibility Audit Results:', results)
              }}
            />
          )}
        </>
      )}
    </>
  )
}

export default AnimationTestSuite
