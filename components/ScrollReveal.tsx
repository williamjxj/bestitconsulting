'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import React from 'react'
import {
  shouldReduceMotion,
  getReducedMotionVariants,
} from '@/lib/accessibility'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  threshold?: number
  duration?: number
  easing?: number[] | string
  className?: string
  as?: keyof JSX.IntrinsicElements
  animation?:
    | 'fadeInUp'
    | 'fadeInDown'
    | 'slideInLeft'
    | 'slideInRight'
    | 'scaleIn'
}

function ScrollReveal({
  children,
  delay = 0,
  threshold = 0.2,
  duration = 0.8,
  easing = [0.4, 0, 0.2, 1] as const,
  className,
  as: Component = 'div',
  animation = 'fadeInUp',
}: ScrollRevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  // Get animation variants based on motion preference
  const getAnimationVariants = () => {
    if (shouldReduceMotion()) {
      const reducedVariants = getReducedMotionVariants()
      return reducedVariants[animation] || reducedVariants.fadeInUp
    }

    const variants = {
      fadeInUp: {
        initial: { y: 60, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration, delay, ease: easing },
      },
      fadeInDown: {
        initial: { y: -60, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration, delay, ease: easing },
      },
      slideInLeft: {
        initial: { x: -60, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration, delay, ease: easing },
      },
      slideInRight: {
        initial: { x: 60, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration, delay, ease: easing },
      },
      scaleIn: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration, delay, ease: easing },
      },
    }

    return variants[animation] || variants.fadeInUp
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

export default ScrollReveal
export { ScrollReveal }
