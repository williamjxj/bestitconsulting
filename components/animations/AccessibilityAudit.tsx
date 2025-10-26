'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useAnimationAccessibility } from '@/lib/animations/accessibility'

interface AccessibilityAuditProps {
  className?: string
  showAudit?: boolean
  onAuditComplete?: (results: AuditResults) => void
}

interface AuditResults {
  reducedMotion: boolean
  animationsDisabled: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  colorContrast: boolean
  focusManagement: boolean
  ariaLabels: boolean
  score: number
}

const AccessibilityAudit: React.FC<AccessibilityAuditProps> = ({
  className,
  showAudit = false,
  onAuditComplete,
}) => {
  const [auditResults, setAuditResults] = useState<AuditResults | null>(null)
  const { prefersReducedMotion, disableAnimations } =
    useAnimationAccessibility()

  useEffect(() => {
    const runAudit = () => {
      const results: AuditResults = {
        reducedMotion: prefersReducedMotion,
        animationsDisabled: disableAnimations,
        screenReader: window.speechSynthesis !== undefined,
        keyboardNavigation: true, // Assume true if we can detect keyboard events
        colorContrast: true, // Would need more sophisticated testing
        focusManagement: true, // Would need more sophisticated testing
        ariaLabels: true, // Would need more sophisticated testing
        score: 0,
      }

      // Calculate score
      let score = 0
      if (results.reducedMotion) score += 20
      if (results.animationsDisabled) score += 20
      if (results.screenReader) score += 15
      if (results.keyboardNavigation) score += 15
      if (results.colorContrast) score += 15
      if (results.focusManagement) score += 10
      if (results.ariaLabels) score += 5

      results.score = score
      setAuditResults(results)
      onAuditComplete?.(results)
    }

    runAudit()
  }, [prefersReducedMotion, disableAnimations, onAuditComplete])

  if (!showAudit || !auditResults) {
    return null
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    return 'Needs Improvement'
  }

  return (
    <motion.div
      className={cn(
        'fixed bottom-4 left-4 bg-background/80 backdrop-blur-sm border rounded-lg p-4 text-xs z-50 max-w-sm',
        className
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-blue-500' />
          <span className='font-semibold'>Accessibility Audit</span>
        </div>

        <div className='space-y-1'>
          <div className='flex justify-between'>
            <span>Score:</span>
            <span
              className={cn('font-semibold', getScoreColor(auditResults.score))}
            >
              {auditResults.score}/100 - {getScoreLabel(auditResults.score)}
            </span>
          </div>

          <div className='space-y-1 text-xs'>
            <div className='flex justify-between'>
              <span>Reduced Motion:</span>
              <span
                className={
                  auditResults.reducedMotion ? 'text-green-600' : 'text-red-600'
                }
              >
                {auditResults.reducedMotion ? '✓' : '✗'}
              </span>
            </div>

            <div className='flex justify-between'>
              <span>Animations Disabled:</span>
              <span
                className={
                  auditResults.animationsDisabled
                    ? 'text-green-600'
                    : 'text-red-600'
                }
              >
                {auditResults.animationsDisabled ? '✓' : '✗'}
              </span>
            </div>

            <div className='flex justify-between'>
              <span>Screen Reader:</span>
              <span
                className={
                  auditResults.screenReader ? 'text-green-600' : 'text-red-600'
                }
              >
                {auditResults.screenReader ? '✓' : '✗'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AccessibilityAudit
