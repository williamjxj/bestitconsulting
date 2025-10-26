/**
 * Stagger filter component
 * Provides staggered animations for filter results
 */

'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface StaggerFilterProps {
  children: React.ReactNode[]
  staggerDelay?: number
  className?: string
  respectReducedMotion?: boolean
  onStaggerComplete?: () => void
}

export const StaggerFilter: React.FC<StaggerFilterProps> = ({
  children,
  staggerDelay = 0.1,
  className = '',
  respectReducedMotion = true,
  onStaggerComplete,
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useAccessibility()

  // Handle stagger animation
  const handleStaggerAnimation = useCallback(() => {
    if (respectReducedMotion && prefersReducedMotion) return

    setIsAnimating(true)

    // Complete animation after all items are animated
    const totalDelay = children.length * staggerDelay * 1000
    setTimeout(() => {
      setIsAnimating(false)
      onStaggerComplete?.()
    }, totalDelay)
  }, [
    children.length,
    staggerDelay,
    onStaggerComplete,
    respectReducedMotion,
    prefersReducedMotion,
  ])

  // Start stagger animation when component mounts
  useEffect(() => {
    handleStaggerAnimation()
  }, [handleStaggerAnimation])

  // Item variants
  const itemVariants = {
    initial: { opacity: 0, y: 30, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -30, scale: 0.9 },
  }

  // Container variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
        onComplete: () => {
          setIsAnimating(false)
          onStaggerComplete?.()
        },
      },
    },
  }

  // Fallback for reduced motion
  if (respectReducedMotion && prefersReducedMotion) {
    return (
      <div ref={filterRef} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={filterRef}
      className={className}
      variants={containerVariants}
      initial='initial'
      animate='animate'
    >
      <AnimatePresence mode='wait'>
        {children.map((child, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{
              duration: 0.5,
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

export default StaggerFilter
