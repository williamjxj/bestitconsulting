/**
 * Animated rating component
 * Provides animated star ratings for testimonials
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface AnimatedRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
  respectReducedMotion?: boolean
  onRatingChange?: (rating: number) => void
}

export const AnimatedRating: React.FC<AnimatedRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  color = '#fbbf24',
  className = '',
  respectReducedMotion = true,
  onRatingChange,
}) => {
  const [hoveredRating, setHoveredRating] = useState(0)
  const ratingRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  // Get size values
  const getSizeValues = () => {
    const values = {
      sm: { width: 16, height: 16 },
      md: { width: 20, height: 20 },
      lg: { width: 24, height: 24 },
    }
    return values[size]
  }

  const sizeValues = getSizeValues()

  // Handle star hover
  const handleStarHover = useCallback(
    (starRating: number) => {
      if (respectReducedMotion && preferences.reducedMotion) return
      setHoveredRating(starRating)
    },
    [respectReducedMotion, preferences.reducedMotion]
  )

  // Handle star leave
  const handleStarLeave = useCallback(() => {
    if (respectReducedMotion && preferences.reducedMotion) return
    setHoveredRating(0)
  }, [respectReducedMotion, preferences.reducedMotion])

  // Handle star click
  const handleStarClick = useCallback(
    (starRating: number) => {
      if (respectReducedMotion && preferences.reducedMotion) return
      onRatingChange?.(starRating)
    },
    [onRatingChange, respectReducedMotion, preferences.reducedMotion]
  )

  // Star variants
  const starVariants = {
    initial: { scale: 1, opacity: 0.3 },
    filled: { scale: 1, opacity: 1 },
    hover: { scale: 1.2, opacity: 1 },
    tap: { scale: 0.9 },
  }

  // Get star state
  const getStarState = (starIndex: number) => {
    const currentRating = hoveredRating || rating
    return starIndex < currentRating ? 'filled' : 'initial'
  }

  // Fallback for reduced motion
  if (respectReducedMotion && preferences.reducedMotion) {
    return (
      <div ref={ratingRef} className={`flex space-x-1 ${className}`}>
        {Array.from({ length: maxRating }, (_, index) => (
          <div
            key={index}
            className={`w-${sizeValues.width} h-${sizeValues.height} ${
              index < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      ref={ratingRef}
      className={`flex space-x-1 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {Array.from({ length: maxRating }, (_, index) => (
        <motion.div
          key={index}
          className='cursor-pointer'
          variants={starVariants}
          initial='initial'
          animate={getStarState(index)}
          whileHover='hover'
          whileTap='tap'
          onMouseEnter={() => handleStarHover(index + 1)}
          onMouseLeave={handleStarLeave}
          onClick={() => handleStarClick(index + 1)}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
        >
          <motion.div
            className={`w-${sizeValues.width} h-${sizeValues.height} text-${color}`}
            style={{
              color: index < (hoveredRating || rating) ? color : '#d1d5db',
            }}
            animate={{
              scale: index < (hoveredRating || rating) ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
          >
            ★
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default AnimatedRating
