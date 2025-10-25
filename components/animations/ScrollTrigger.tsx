/**
 * ScrollTrigger animation wrapper component
 * Provides scroll-triggered animations for enhanced user experience
 */

'use client'

import { motion, useInView } from 'framer-motion'
import { ReactNode, forwardRef, useRef } from 'react'
import { useReducedMotion } from '@/lib/accessibility'
import {
  getMobileOptimizedVariants,
  getDeviceType,
} from '@/lib/mobile-optimization'

interface ScrollTriggerProps {
  children: ReactNode
  animation?: 'fade' | 'slide' | 'scale' | 'custom'
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  as?: keyof typeof motion | string
  once?: boolean
  amount?: number
  fallback?: ReactNode
}

export const ScrollTrigger = forwardRef<HTMLDivElement, ScrollTriggerProps>(
  (
    {
      children,
      animation = 'fade',
      direction = 'up',
      delay = 0,
      duration = 0.6,
      threshold = 0.1,
      className = '',
      as = 'div',
      once = true,
      amount = 0.1,
      fallback,
    },
    ref
  ) => {
    const elementRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(elementRef, {
      once,
      amount,
      margin: '0px 0px -50px 0px',
    })
    const reducedMotion = useReducedMotion()
    const deviceType = getDeviceType()

    // Get animation variants based on type and direction
    const getAnimationVariants = () => {
      if (reducedMotion) {
        return {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 1 },
        }
      }

      const baseVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }

      switch (animation) {
        case 'slide':
          return {
            ...baseVariants,
            initial: {
              ...baseVariants.initial,
              y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
              x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
            },
            animate: {
              ...baseVariants.animate,
              y: 0,
              x: 0,
            },
            exit: {
              ...baseVariants.exit,
              y: direction === 'up' ? -50 : direction === 'down' ? 50 : 0,
              x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
            },
          }
        case 'scale':
          return {
            ...baseVariants,
            initial: { ...baseVariants.initial, scale: 0.8 },
            animate: { ...baseVariants.animate, scale: 1 },
            exit: { ...baseVariants.exit, scale: 0.8 },
          }
        case 'fade':
        default:
          return baseVariants
      }
    }

    const baseVariants = getAnimationVariants()

    // Apply mobile optimization
    const optimizedVariants = getMobileOptimizedVariants(
      baseVariants,
      deviceType
    )

    // Apply reduced motion optimization
    const finalVariants = reducedMotion
      ? {
          ...optimizedVariants,
          animate: {
            ...optimizedVariants.animate,
            transition: {
              duration: 0.1,
              ease: 'linear',
            },
          },
        }
      : optimizedVariants

    // If reduced motion and fallback is provided, show fallback
    if (reducedMotion && fallback) {
      return <>{fallback}</>
    }

    return (
      <motion.div
        ref={ref || elementRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: reducedMotion ? 0.1 : duration,
          delay: reducedMotion ? 0 : delay,
          ease: reducedMotion ? 'linear' : 'easeOut',
        }}
        className={className}
        aria-label='Content with scroll-triggered animation'
      >
        {children}
      </motion.div>
    )
  }
)

ScrollTrigger.displayName = 'ScrollTrigger'
