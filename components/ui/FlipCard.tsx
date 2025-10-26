/**
 * Flip card component
 * Creates 3D flip animation for cards
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  flipDirection?: 'horizontal' | 'vertical'
  flipTrigger?: 'hover' | 'click' | 'both'
  className?: string
  respectReducedMotion?: boolean
  onFlip?: (isFlipped: boolean) => void
}

export const FlipCard: React.FC<FlipCardProps> = ({
  front,
  back,
  flipDirection = 'horizontal',
  flipTrigger = 'hover',
  className = '',
  respectReducedMotion = true,
  onFlip,
}) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  // Handle flip
  const handleFlip = useCallback(() => {
    if (respectReducedMotion && preferences.reducedMotion) return

    setIsFlipped(prev => {
      const newState = !prev
      onFlip?.(newState)
      return newState
    })
  }, [respectReducedMotion, preferences.reducedMotion, onFlip])

  // Handle mouse events
  const handleMouseEnter = useCallback(() => {
    if (flipTrigger === 'hover' || flipTrigger === 'both') {
      handleFlip()
    }
  }, [flipTrigger, handleFlip])

  const handleMouseLeave = useCallback(() => {
    if (flipTrigger === 'hover' || flipTrigger === 'both') {
      handleFlip()
    }
  }, [flipTrigger, handleFlip])

  const handleClick = useCallback(() => {
    if (flipTrigger === 'click' || flipTrigger === 'both') {
      handleFlip()
    }
  }, [flipTrigger, handleFlip])

  // Get flip variants based on direction
  const getFlipVariants = () => {
    if (respectReducedMotion && preferences.reducedMotion) {
      return {
        initial: { opacity: 1 },
        flipped: { opacity: 1 },
      }
    }

    switch (flipDirection) {
      case 'horizontal':
        return {
          initial: { rotateY: 0 },
          flipped: { rotateY: 180 },
        }
      case 'vertical':
        return {
          initial: { rotateX: 0 },
          flipped: { rotateX: 180 },
        }
      default:
        return {
          initial: { rotateY: 0 },
          flipped: { rotateY: 180 },
        }
    }
  }

  const flipVariants = getFlipVariants()

  // Card variants
  const cardVariants = {
    initial: {
      scale: 1,
      perspective: '1000px',
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative w-full h-full ${className}`}
      variants={cardVariants}
      initial='initial'
      whileHover='hover'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className='relative w-full h-full'
        variants={flipVariants}
        initial='initial'
        animate={isFlipped ? 'flipped' : 'initial'}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front side */}
        <motion.div
          className='absolute inset-0 w-full h-full'
          style={{
            backfaceVisibility: 'hidden',
            transform:
              flipDirection === 'horizontal'
                ? 'rotateY(0deg)'
                : 'rotateX(0deg)',
          }}
        >
          {front}
        </motion.div>

        {/* Back side */}
        <motion.div
          className='absolute inset-0 w-full h-full'
          style={{
            backfaceVisibility: 'hidden',
            transform:
              flipDirection === 'horizontal'
                ? 'rotateY(180deg)'
                : 'rotateX(180deg)',
          }}
        >
          {back}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default FlipCard
