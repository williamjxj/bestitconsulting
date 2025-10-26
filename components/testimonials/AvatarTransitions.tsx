/**
 * Avatar transitions component
 * Provides smooth transition animations for testimonial avatars
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface AvatarTransitionsProps {
  children: React.ReactNode
  transitionType?: 'fade' | 'slide' | 'scale' | 'flip' | 'rotate' | 'none'
  duration?: number
  delay?: number
  className?: string
  respectReducedMotion?: boolean
  onTransitionStart?: () => void
  onTransitionEnd?: () => void
}

export const AvatarTransitions: React.FC<AvatarTransitionsProps> = ({
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
  const avatarRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  // Intersection observer for scroll-triggered animations
  useEffect(() => {
    if (!avatarRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(avatarRef.current)

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

  // Fallback for reduced motion
  if (respectReducedMotion && preferences.reducedMotion) {
    return (
      <div ref={avatarRef} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={avatarRef}
      className={className}
      variants={transitionVariants}
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

export default AvatarTransitions
