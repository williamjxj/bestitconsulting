/**
 * Grid animations component
 * Provides dynamic grid animations for portfolio items
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface GridAnimationsProps {
  children: React.ReactNode[]
  animationType?: 'stagger' | 'wave' | 'spiral' | 'random'
  duration?: number
  delay?: number
  className?: string
  respectReducedMotion?: boolean
  onAnimationComplete?: () => void
}

export const GridAnimations: React.FC<GridAnimationsProps> = ({
  children,
  animationType = 'stagger',
  duration = 0.5,
  delay = 0,
  className = '',
  respectReducedMotion = true,
  onAnimationComplete,
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useAccessibility()

  // Get animation variants based on type
  const getAnimationVariants = () => {
    if (respectReducedMotion && prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    }

    switch (animationType) {
      case 'stagger':
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
        }
      case 'wave':
        return {
          initial: { opacity: 0, x: -50, y: 20 },
          animate: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, x: 50, y: -20 },
        }
      case 'spiral':
        return {
          initial: { opacity: 0, scale: 0.8, rotate: -180 },
          animate: { opacity: 1, scale: 1, rotate: 0 },
          exit: { opacity: 0, scale: 0.8, rotate: 180 },
        }
      case 'random':
        return {
          initial: { opacity: 0, scale: 0.5, rotate: Math.random() * 360 },
          animate: { opacity: 1, scale: 1, rotate: 0 },
          exit: { opacity: 0, scale: 0.5, rotate: Math.random() * 360 },
        }
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
        }
    }
  }

  const animationVariants = getAnimationVariants()

  // Container variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
        onComplete: () => {
          setIsAnimating(false)
          onAnimationComplete?.()
        },
      },
    },
  }

  // Handle animation start
  const handleAnimationStart = useCallback(() => {
    setIsAnimating(true)
  }, [])

  // Handle animation complete
  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false)
    onAnimationComplete?.()
  }, [onAnimationComplete])

  return (
    <motion.div
      ref={gridRef}
      className={`relative ${className}`}
      variants={containerVariants}
      initial='initial'
      animate='animate'
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
    >
      <AnimatePresence mode='wait'>
        {children.map((child, index) => (
          <motion.div
            key={index}
            variants={animationVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{
              duration,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default GridAnimations
