/**
 * Filter transitions component
 * Provides smooth transitions between filter states
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface FilterTransitionsProps {
  children: React.ReactNode[]
  transitionType?: 'fade' | 'slide' | 'scale' | 'flip' | 'none'
  duration?: number
  className?: string
  respectReducedMotion?: boolean
  onTransitionStart?: () => void
  onTransitionEnd?: () => void
}

export const FilterTransitions: React.FC<FilterTransitionsProps> = ({
  children,
  transitionType = 'fade',
  duration = 0.3,
  className = '',
  respectReducedMotion = true,
  onTransitionStart,
  onTransitionEnd,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useAccessibility()

  // Get transition variants based on type
  const getTransitionVariants = () => {
    if (respectReducedMotion && prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    }

    switch (transitionType) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        }
      case 'slide':
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 50 },
        }
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 },
        }
      case 'flip':
        return {
          initial: { opacity: 0, rotateY: -90 },
          animate: { opacity: 1, rotateY: 0 },
          exit: { opacity: 0, rotateY: 90 },
        }
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        }
    }
  }

  const transitionVariants = getTransitionVariants()

  // Handle transition start
  const handleTransitionStart = useCallback(() => {
    setIsTransitioning(true)
    onTransitionStart?.()
  }, [onTransitionStart])

  // Handle transition end
  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false)
    onTransitionEnd?.()
  }, [onTransitionEnd])

  // Container variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  // Fallback for reduced motion
  if (respectReducedMotion && prefersReducedMotion) {
    return (
      <div ref={filterRef} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={filterRef}
      className={className}
      variants={containerVariants}
      initial='initial'
      animate='animate'
    >
      <AnimatePresence mode='wait'>
        {children.map((child, index) => (
          <motion.div
            key={index}
            variants={transitionVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{
              duration,
              ease: 'easeOut',
            }}
            onAnimationStart={handleTransitionStart}
            onAnimationComplete={handleTransitionEnd}
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default FilterTransitions
