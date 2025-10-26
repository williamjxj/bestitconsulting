/**
 * AnimatedCounter component
 * Provides smooth counting animations for statistics and numbers
 */

'use client'

import { motion, useInView } from 'framer-motion'
import { ReactNode, forwardRef, useRef, useEffect, useState } from 'react'
import React from 'react'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'

interface AnimatedCounterProps {
  children: ReactNode
  value: number
  duration?: number
  delay?: number
  suffix?: string
  prefix?: string
  className?: string
  as?: keyof typeof motion | string
  threshold?: number
  once?: boolean
  amount?: number
  fallback?: ReactNode
}

export const AnimatedCounter = forwardRef<HTMLDivElement, AnimatedCounterProps>(
  (
    {
      children,
      value,
      duration = 2,
      delay = 0,
      suffix = '',
      prefix = '',
      className = '',
      as = 'div',
      threshold = 0.1,
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
    const [count, setCount] = useState(0)
    const reducedMotion = useReducedMotion()
    const deviceType = getDeviceType()

    useEffect(() => {
      if (!isInView || reducedMotion) {
        setCount(value)
        return
      }

      // Adjust duration for mobile and reduced motion
      const adjustedDuration = reducedMotion
        ? 0.1
        : deviceType === 'mobile'
          ? Math.min(duration, 1)
          : duration

      let startTime: number
      let animationFrame: number

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / (adjustedDuration * 1000), 1)

        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentValue = Math.floor(value * easeOut)

        setCount(currentValue)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      const timeoutId = setTimeout(() => {
        animationFrame = requestAnimationFrame(animate)
      }, delay * 1000)

      return () => {
        clearTimeout(timeoutId)
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }, [isInView, value, duration, delay, reducedMotion, deviceType])

    // If reduced motion and fallback is provided, show fallback
    if (reducedMotion && fallback) {
      return <>{fallback}</>
    }

    return (
      <motion.div
        ref={ref || elementRef}
        className={className}
        aria-label={`Animated counter: ${count}${suffix}`}
      >
        {children}
        <span className='inline-block'>
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </span>
      </motion.div>
    )
  }
)

AnimatedCounter.displayName = 'AnimatedCounter'
