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
  as?: keyof JSX.IntrinsicElements
  fallback?: ReactNode
}

export const ParallaxScroll = forwardRef<HTMLElement, ParallaxScrollProps>(
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
    const elementRef = useRef<HTMLElement>(null)
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

    const getTransforms = () => {
      if (!shouldParallax) return { y: 0, x: 0 }

      switch (direction) {
        case 'up':
          return { y: baseTransform, x: 0 }
        case 'down':
          return { y: useTransform(baseTransform, value => -value), x: 0 }
        case 'left':
          return { y: 0, x: baseTransform }
        case 'right':
          return { y: 0, x: useTransform(baseTransform, value => -value) }
        default:
          return { y: baseTransform, x: 0 }
      }
    }

    const transforms = getTransforms()

    // If reduced motion and fallback is provided, show fallback
    if (reducedMotion && fallback) {
      return <>{fallback}</>
    }

    const MotionComponent = motion[as] as any

    return (
      <MotionComponent
        ref={ref || elementRef}
        style={{
          y: shouldParallax ? transforms.y : 0,
          x: shouldParallax ? transforms.x : 0,
        }}
        className={className}
        aria-label='Content with parallax scrolling effect'
      >
        {children}
      </MotionComponent>
    )
  }
)

ParallaxScroll.displayName = 'ParallaxScroll'
