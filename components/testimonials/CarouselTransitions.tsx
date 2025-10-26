/**
 * Carousel transitions component
 * Provides smooth transition effects for testimonial carousels
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface CarouselTransitionsProps {
  children: React.ReactNode[]
  currentIndex: number
  transitionType?: 'fade' | 'slide' | 'scale' | 'flip' | 'none'
  duration?: number
  className?: string
  respectReducedMotion?: boolean
  onTransitionStart?: () => void
  onTransitionEnd?: () => void
}

export const CarouselTransitions: React.FC<CarouselTransitionsProps> = ({
  children,
  currentIndex,
  transitionType = 'slide',
  duration = 0.5,
  className = '',
  respectReducedMotion = true,
  onTransitionStart,
  onTransitionEnd,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

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
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -50 },
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

  // Carousel variants
  const carouselVariants = {
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
  if (respectReducedMotion && preferences.reducedMotion) {
    return (
      <div ref={carouselRef} className={className}>
        {children[currentIndex]}
      </div>
    )
  }

  return (
    <motion.div
      ref={carouselRef}
      className={`relative overflow-hidden ${className}`}
      variants={carouselVariants}
      initial='initial'
      animate='animate'
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          variants={transitionVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{
            duration,
            ease: 'easeInOut',
          }}
          onAnimationStart={handleTransitionStart}
          onAnimationComplete={handleTransitionEnd}
        >
          {children[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default CarouselTransitions
