/**
 * Scroll-triggered text reveal animation
 * Animates text based on scroll position
 */

'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface ScrollTextRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  duration?: number
  className?: string
  respectReducedMotion?: boolean
}

export const ScrollTextReveal: React.FC<ScrollTextRevealProps> = ({
  children,
  direction = 'up',
  distance = 50,
  duration = 0.6,
  className = '',
  respectReducedMotion = true,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const { prefersReducedMotion } = useAccessibility()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Transform values based on direction
  const getTransformValues = () => {
    const baseTransform = {
      up: { y: distance, opacity: 0 },
      down: { y: -distance, opacity: 0 },
      left: { x: distance, opacity: 0 },
      right: { x: -distance, opacity: 0 },
    }

    return baseTransform[direction]
  }

  const getAnimateValues = () => {
    const baseAnimate = {
      up: { y: 0, opacity: 1 },
      down: { y: 0, opacity: 1 },
      left: { x: 0, opacity: 1 },
      right: { x: 0, opacity: 1 },
    }

    return baseAnimate[direction]
  }

  // Use scroll progress for smooth animation
  const y = useTransform(scrollYProgress, [0, 1], [distance, 0])
  const x = useTransform(scrollYProgress, [0, 1], [distance, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0, 1, 1])

  // Get transform values based on direction
  const getScrollTransform = () => {
    switch (direction) {
      case 'up':
        return { y, opacity }
      case 'down':
        return {
          y: useTransform(scrollYProgress, [0, 1], [-distance, 0]),
          opacity,
        }
      case 'left':
        return { x, opacity }
      case 'right':
        return {
          x: useTransform(scrollYProgress, [0, 1], [-distance, 0]),
          opacity,
        }
      default:
        return { y, opacity }
    }
  }

  const scrollTransform = getScrollTransform()

  // Check if element is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  // Fallback for reduced motion
  if (respectReducedMotion && prefersReducedMotion) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={scrollTransform}
      initial={getTransformValues()}
      animate={isInView ? getAnimateValues() : getTransformValues()}
      transition={{
        duration,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollTextReveal
