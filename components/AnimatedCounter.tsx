'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  shouldReduceMotion,
  getReducedMotionVariants,
} from '@/lib/accessibility'

interface AnimatedCounterProps {
  end: number
  start?: number
  duration?: number
  suffix?: string
  prefix?: string
  delay?: number
  threshold?: number
  className?: string
  format?: (value: number) => string
  onComplete?: () => void
}

function AnimatedCounter({
  end,
  start = 0,
  duration = 2000,
  suffix = '',
  prefix = '',
  delay = 0,
  threshold = 0.2,
  className,
  format,
  onComplete,
}: AnimatedCounterProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(start)

  // Get animation variants based on motion preference
  const getAnimationVariants = () => {
    if (shouldReduceMotion()) {
      const reducedVariants = getReducedMotionVariants()
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
      }
    }

    return {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] as const },
    }
  }

  const animationVariants = getAnimationVariants()

  // Animate counter when in view
  useEffect(() => {
    if (!inView) return

    const startTime = Date.now()
    const startValue = start
    const endValue = end
    const totalDuration = duration

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / totalDuration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (endValue - startValue) * easeOutQuart

      setCount(Math.floor(currentValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(endValue)
        onComplete?.()
      }
    }

    // Start animation after delay
    const timeout = setTimeout(animate, delay)

    return () => clearTimeout(timeout)
  }, [inView, start, end, duration, delay, onComplete])

  // Format the counter value
  const formatValue = (value: number) => {
    if (format) {
      return format(value)
    }

    // Default formatting with commas for large numbers
    return value.toLocaleString()
  }

  return (
    <motion.div
      ref={ref}
      initial={animationVariants.initial}
      animate={inView ? animationVariants.animate : animationVariants.initial}
      transition={animationVariants.transition}
      className={className}
    >
      <span className='font-bold text-4xl'>
        {prefix}
        {formatValue(count)}
        {suffix}
      </span>
    </motion.div>
  )
}

export default AnimatedCounter
export { AnimatedCounter }
