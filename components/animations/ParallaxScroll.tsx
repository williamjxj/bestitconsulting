/**
 * ParallaxScroll animation wrapper component
 * Provides parallax scrolling effects for enhanced visual appeal
 */

'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, forwardRef, useRef } from 'react'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'

interface ParallaxScrollProps {
  children: ReactNode
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  offset?: number
  className?: string
  as?: keyof typeof motion | string
  fallback?: ReactNode
}

export const ParallaxScroll = forwardRef<HTMLDivElement, ParallaxScrollProps>(
  (
    {
      children,
      speed = 0.5,
      direction = 'up',
      offset = 0,
      className = '',
      as = 'div',
      fallback,
    },
    ref
  ) => {
    const elementRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
      target: elementRef,
      offset: ['start end', 'end start'],
    })
    const reducedMotion = useReducedMotion()
    const deviceType = getDeviceType()

    // Disable parallax for reduced motion or mobile
    const shouldParallax = !reducedMotion && deviceType !== 'mobile'

    // Get transform values based on direction
    const baseTransform = useTransform(
      scrollYProgress,
      [0, 1],
      [offset, offset - 100 * speed]
    )

    // Calculate transforms based on direction
    const upTransform = useTransform(
      scrollYProgress,
      [0, 1],
      [offset, offset - 100 * speed]
    )
    const downTransform = useTransform(
      scrollYProgress,
      [0, 1],
      [offset, offset + 100 * speed]
    )
    const leftTransform = useTransform(
      scrollYProgress,
      [0, 1],
      [offset, offset - 100 * speed]
    )
    const rightTransform = useTransform(
      scrollYProgress,
      [0, 1],
      [offset, offset + 100 * speed]
    )

    const getTransforms = () => {
      if (!shouldParallax) return { y: 0, x: 0 }

      switch (direction) {
        case 'up':
          return { y: upTransform, x: 0 }
        case 'down':
          return { y: downTransform, x: 0 }
        case 'left':
          return { y: 0, x: leftTransform }
        case 'right':
          return { y: 0, x: rightTransform }
        default:
          return { y: upTransform, x: 0 }
      }
    }

    const transforms = getTransforms()

    // If reduced motion and fallback is provided, show fallback
    if (reducedMotion && fallback) {
      return <>{fallback}</>
    }

    return (
      <motion.div
        ref={ref || elementRef}
        style={{
          y: shouldParallax ? transforms.y : 0,
          x: shouldParallax ? transforms.x : 0,
        }}
        className={className}
        aria-label='Content with parallax scrolling effect'
      >
        {children}
      </motion.div>
    )
  }
)

ParallaxScroll.displayName = 'ParallaxScroll'
