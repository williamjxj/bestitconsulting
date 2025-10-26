/**
 * Rating transitions component
 * Provides smooth transition animations for rating stars
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface RatingTransitionsProps {
  children: React.ReactNode
  transitionType?: 'fade' | 'slide' | 'scale' | 'flip' | 'stagger' | 'none'
  duration?: number
  delay?: number
  className?: string
  respectReducedMotion?: boolean
  onTransitionStart?: () => void
  onTransitionEnd?: () => void
}

export const RatingTransitions: React.FC<RatingTransitionsProps> = ({
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
  const ratingRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  // Intersection observer for scroll-triggered animations
  useEffect(() => {
    if (!ratingRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(ratingRef.current)

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
      case 'stagger':
        return {
          initial: { opacity: 0, scale: 0.5 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.5 },
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

  // Container variants for stagger effect
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  }

  // Fallback for reduced motion
  if (respectReducedMotion && preferences.reducedMotion) {
    return (
      <div ref={ratingRef} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ratingRef}
      className={className}
      variants={
        transitionType === 'stagger' ? containerVariants : transitionVariants
      }
      initial='initial'
      animate={isVisible ? 'animate' : 'initial'}
      exit='exit'
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      onAnimationStart={handleTransitionStart}
      onAnimationComplete={handleTransitionEnd}
    >
      {children}
    </motion.div>
  )
}

export default RatingTransitions
