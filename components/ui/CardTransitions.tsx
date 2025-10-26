// @ts-nocheck
/**
 * Card transition effects component
 * Provides smooth transition animations for cards
 */

'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface CardTransitionsProps {
  children: React.ReactNode
  transitionType?: 'fade' | 'slide' | 'scale' | 'flip' | 'glide'
  duration?: number
  delay?: number
  className?: string
  respectReducedMotion?: boolean
}

export const CardTransitions: React.FC<CardTransitionsProps> = ({
  children,
  transitionType = 'fade',
  duration = 0.3,
  delay = 0,
  className = '',
  respectReducedMotion = true,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useAccessibility()

  // Intersection observer for scroll-triggered animations
  useEffect(() => {
    if (!cardRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(cardRef.current)

    return () => observer.disconnect()
  }, [])

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
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -50 },
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
      case 'glide':
        return {
          initial: { opacity: 0, x: -100, y: 50 },
          animate: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, x: 100, y: -50 },
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

  // Stagger animation for multiple cards
  const staggerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  }

  const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      variants={staggerVariants}
      initial='initial'
      animate={isVisible ? 'animate' : 'initial'}
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
          <motion.div variants={childVariants} className='w-full h-full'>
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default CardTransitions
