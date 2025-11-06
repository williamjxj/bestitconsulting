'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import React from 'react'
import {
  shouldReduceMotion,
  getReducedMotionVariants,
} from '@/lib/accessibility'

interface AnimatedSectionProps {
  children: ReactNode
  variant?: 'fade' | 'slide' | 'scale' | 'stagger'
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  threshold?: number
  duration?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
  animation?: string
}

function AnimatedSection({
  children,
  variant = 'fade',
  direction = 'up',
  delay = 0,
  threshold = 0.2,
  duration = 0.8,
  className,
  as: Component = 'section',
  animation,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

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

    const variants = {
      fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration, delay, ease: [0.4, 0, 0.2, 1] as const },
      },
      slide: {
        initial: {
          opacity: 0,
          x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
          y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
        },
        animate: {
          opacity: 1,
          x: 0,
          y: 0,
        },
        transition: { duration, delay, ease: [0.4, 0, 0.2, 1] as const },
      },
      scale: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration, delay, ease: [0.4, 0, 0.2, 1] as const },
      },
      stagger: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: {
          duration,
          delay,
          ease: [0.4, 0, 0.2, 1] as const,
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    }

    return variants[variant]
  }

  const animationVariants = getAnimationVariants()

  return (
    <motion.div
      ref={ref}
      initial={animationVariants.initial}
      animate={inView ? animationVariants.animate : animationVariants.initial}
      transition={animationVariants.transition}
      className={className}
      as={Component}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedSection
export { AnimatedSection }
