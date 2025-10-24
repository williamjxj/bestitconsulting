/**
 * ScaleIn animation wrapper component
 * Provides consistent scale-in animation behavior across the application
 */

'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode, forwardRef } from 'react'
import { useReducedMotion } from '@/lib/accessibility'
import {
  getMobileOptimizedVariants,
  getDeviceType,
} from '@/lib/mobile-optimization'
import { scaleIn, scaleInUp } from '@/lib/framer-variants'

interface ScaleInProps {
  children: ReactNode
  direction?: 'in' | 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  scale?: number
  stagger?: number
  threshold?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
  once?: boolean
  amount?: number
  fallback?: ReactNode
}

export const ScaleIn = forwardRef<HTMLElement, ScaleInProps>(
  (
    {
      children,
      direction = 'in',
      delay = 0,
      duration = 0.4,
      scale = 0.8,
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
    const getDirectionVariants = (
      dir: string,
      scaleValue: number
    ): Variants => {
      switch (dir) {
        case 'in':
          return {
            initial: { opacity: 0, scale: scaleValue },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: scaleValue },
          }
        case 'up':
          return {
            initial: { opacity: 0, scale: scaleValue, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: scaleValue, y: -20 },
          }
        case 'down':
          return {
            initial: { opacity: 0, scale: scaleValue, y: -20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: scaleValue, y: 20 },
          }
        case 'left':
          return {
            initial: { opacity: 0, scale: scaleValue, x: -20 },
            animate: { opacity: 1, scale: 1, x: 0 },
            exit: { opacity: 0, scale: scaleValue, x: 20 },
          }
        case 'right':
          return {
            initial: { opacity: 0, scale: scaleValue, x: 20 },
            animate: { opacity: 1, scale: 1, x: 0 },
            exit: { opacity: 0, scale: scaleValue, x: -20 },
          }
        default:
          return scaleIn
      }
    }

    const baseVariants = getDirectionVariants(direction, scale)

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

    const MotionComponent = motion[as] as any

    return (
      <MotionComponent
        ref={ref}
        variants={finalVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{
          duration: reducedMotion ? 0.1 : duration,
          delay: reducedMotion ? 0 : delay,
          ease: reducedMotion ? 'linear' : 'easeOut',
          staggerChildren: stagger,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: 0,
        }}
        viewport={{
          once,
          amount,
          margin: '0px 0px -50px 0px',
        }}
        className={className}
        aria-label='Content is scaling up'
      >
        {children}
      </MotionComponent>
    )
  }
)

ScaleIn.displayName = 'ScaleIn'
