'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { getAnimationVariants } from '@/lib/framer-animations'

interface AnimatedCounterProps {
  end: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  className?: string
  start?: number
}

/**
 * AnimatedCounter Component
 *
 * A counter component that animates from start to end value
 * Implements smooth number transitions with accessibility support
 */
export function AnimatedCounter({
  end,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
  start = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      const increment = (end - start) / (duration * 60) // 60fps
      const timer = setInterval(() => {
        setCount(prev => {
          const next = prev + increment
          if (next >= end) {
            clearInterval(timer)
            return end
          }
          return next
        })
      }, 1000 / 60)

      return () => clearInterval(timer)
    }
  }, [isInView, end, start, duration])

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return Math.floor(num).toString()
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
    >
      {prefix}
      {formatNumber(count)}
      {suffix}
    </motion.span>
  )
}
