/**
 * SlideIn animation wrapper component
 * Provides consistent slide-in animation behavior across the application
 */

'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode, forwardRef } from 'react'
import { useReducedMotion } from '@/lib/accessibility'
import {
  getMobileOptimizedVariants,
  getDeviceType,
} from '@/lib/mobile-optimization'
import {
  slideInUp,
  slideInDown,
  slideInLeft,
  slideInRight,
} from '@/lib/framer-variants'

interface SlideInProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  distance?: number
  stagger?: number
  threshold?: number
  className?: string
  as?: keyof typeof motion | string
  once?: boolean
  amount?: number
  fallback?: ReactNode
}

export const SlideIn = forwardRef<HTMLDivElement, SlideInProps>(
  (
    {
      children,
      direction = 'up',
      delay = 0,
      duration = 0.6,
      distance = 50,
      stagger = 0,
      threshold = 0.1,
      className = '',
      as = 'div',
      once = true,
      amount = 0.1,
      fallback,
    },
    ref
  ) => {
    const reducedMotion = useReducedMotion()
    const deviceType = getDeviceType()

    // Get direction-specific variants
    const getDirectionVariants = (dir: string, dist: number): Variants => {
      switch (dir) {
        case 'up':
          return {
            initial: { opacity: 0, y: dist },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -dist },
          }
        case 'down':
          return {
            initial: { opacity: 0, y: -dist },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: dist },
          }
        case 'left':
          return {
            initial: { opacity: 0, x: -dist },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: dist },
          }
        case 'right':
          return {
            initial: { opacity: 0, x: dist },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -dist },
          }
        default:
          return slideInUp
      }
    }

    const baseVariants = getDirectionVariants(direction, distance)

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
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: reducedMotion ? 0.1 : duration,
          delay: reducedMotion ? 0 : delay,
          ease: reducedMotion ? 'linear' : 'easeOut',
        }}
        className={className}
        aria-label='Content is sliding into view'
      >
        {children}
      </motion.div>
    )
  }
)

SlideIn.displayName = 'SlideIn'
