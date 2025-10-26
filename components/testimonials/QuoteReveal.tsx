/**
 * Quote reveal component
 * Provides scroll-triggered reveal animations for testimonial quotes
 */

'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface QuoteRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  duration?: number
  className?: string
  respectReducedMotion?: boolean
  onReveal?: () => void
}

export const QuoteReveal: React.FC<QuoteRevealProps> = ({
  children,
  direction = 'up',
  distance = 50,
  duration = 0.6,
  className = '',
  respectReducedMotion = true,
  onReveal,
}) => {
  const [isInView, setIsInView] = useState(false)
  const quoteRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  const { scrollYProgress } = useScroll({
    target: quoteRef,
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

  // Get scroll transform based on direction
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
        if (entry.isIntersecting) {
          setIsInView(true)
          onReveal?.()
        }
      },
      { threshold: 0.1 }
    )

    if (quoteRef.current) {
      observer.observe(quoteRef.current)
    }

    return () => observer.disconnect()
  }, [onReveal])

  // Quote variants
  const quoteVariants = {
    initial: getTransformValues(),
    animate: getAnimateValues(),
  }

  // Fallback for reduced motion
  if (respectReducedMotion && preferences.reducedMotion) {
    return (
      <motion.div
        ref={quoteRef}
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
      ref={quoteRef}
      className={className}
      style={scrollTransform}
      variants={quoteVariants}
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      transition={{
        duration,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}

export default QuoteReveal
