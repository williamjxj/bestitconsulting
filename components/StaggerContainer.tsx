'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import React from 'react'
import {
  shouldReduceMotion,
  getReducedMotionVariants,
} from '@/lib/accessibility'

interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  threshold?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
  delay?: number
}

function StaggerContainer({
  children,
  staggerDelay = 0.1,
  threshold = 0.2,
  className,
  as: Component = 'div',
  delay,
}: StaggerContainerProps) {
  // Get animation variants based on motion preference
  const getAnimationVariants = () => {
    if (shouldReduceMotion()) {
      const reducedVariants = getReducedMotionVariants()
      return {
        container: reducedVariants.staggerContainer,
        item: reducedVariants.staggerItem,
      }
    }

    return {
      container: {
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      },
      item: {
        initial: { y: 40, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
      },
    }
  }

  const { container, item } = getAnimationVariants()

  return (
    <motion.div
      variants={container}
      initial='initial'
      animate='animate'
      className={className}
      as={Component}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={item}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={item}>{children}</motion.div>
      )}
    </motion.div>
  )
}

export default StaggerContainer
export { StaggerContainer }
