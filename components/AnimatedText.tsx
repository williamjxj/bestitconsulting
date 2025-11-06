'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import React from 'react'
import {
  shouldReduceMotion,
  getReducedMotionVariants,
} from '@/lib/accessibility'

interface AnimatedTextProps {
  children: ReactNode
  variant?: 'fade' | 'slide' | 'typewriter' | 'split'
  delay?: number
  duration?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
  split?: boolean
  stagger?: number
  animation?: string
}

function AnimatedText({
  children,
  variant = 'fade',
  delay = 0,
  duration = 0.8,
  className,
  as: Component = 'div',
  split = false,
  stagger = 0.1,
  animation,
}: AnimatedTextProps) {
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
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration, delay, ease: [0.4, 0, 0.2, 1] as const },
      },
      typewriter: {
        initial: { width: 0 },
        animate: { width: '100%' },
        transition: { duration, delay, ease: [0.4, 0, 0.2, 1] as const },
      },
      split: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: {
          duration,
          delay,
          ease: [0.4, 0, 0.2, 1] as const,
          staggerChildren: stagger,
          delayChildren: 0.1,
        },
      },
    }

    return variants[variant]
  }

  const animationVariants = getAnimationVariants()

  // Split text into words for stagger animation
  const splitText = (text: string) => {
    return text.split(' ').map((word, index) => (
      <motion.span
        key={index}
        initial={{ y: 20, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{
          duration,
          delay: delay + index * stagger,
          ease: [0.4, 0, 0.2, 1] as const,
        }}
        className='inline-block mr-2'
      >
        {word}
      </motion.span>
    ))
  }

  return (
    <motion.div
      ref={ref}
      initial={animationVariants.initial}
      animate={inView ? animationVariants.animate : animationVariants.initial}
      transition={animationVariants.transition}
      className={className}
      as={Component}
    >
      {split && typeof children === 'string' ? splitText(children) : children}
    </motion.div>
  )
}

export default AnimatedText
export { AnimatedText }
