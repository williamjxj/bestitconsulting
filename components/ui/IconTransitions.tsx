/**
 * Icon transition effects component
 * Provides smooth transition animations for icons
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface IconTransitionsProps {
  children: React.ReactNode
  transitionType?: 'fade' | 'slide' | 'scale' | 'flip' | 'rotate' | 'none'
  duration?: number
  delay?: number
  className?: string
  respectReducedMotion?: boolean
  onTransitionStart?: () => void
  onTransitionEnd?: () => void
}

export const IconTransitions: React.FC<IconTransitionsProps> = ({
  children,
  transitionType = 'fade',
  duration = 0.3,
  delay = 0,
  className = '',
  respectReducedMotion = true,
  onTransitionStart,
  onTransitionEnd,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  // Intersection observer for scroll-triggered animations
  useEffect(() => {
    if (!iconRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(iconRef.current)

    return () => observer.disconnect()
  }, [])

  // Get transition variants based on type
  const getTransitionVariants = () => {
    if (respectReducedMotion && preferences.reducedMotion) {
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
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
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
      case 'rotate':
        return {
          initial: { opacity: 0, rotate: -180 },
          animate: { opacity: 1, rotate: 0 },
          exit: { opacity: 0, rotate: 180 },
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

  // Handle transition events
  const handleTransitionStart = useCallback(() => {
    setIsTransitioning(true)
    onTransitionStart?.()
  }, [onTransitionStart])

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false)
    onTransitionEnd?.()
  }, [onTransitionEnd])

  return (
    <motion.div
      ref={iconRef}
      className={`relative ${className}`}
      initial='initial'
      animate={isVisible ? 'animate' : 'initial'}
      onAnimationStart={handleTransitionStart}
      onAnimationComplete={handleTransitionEnd}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={transitionType}
          variants={transitionVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{
            duration,
            delay,
            ease: 'easeOut',
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default IconTransitions
