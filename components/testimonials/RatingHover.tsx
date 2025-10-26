/**
 * Rating hover component
 * Provides hover effects for rating stars
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface RatingHoverProps {
  children: React.ReactNode
  hoverEffect?: 'glow' | 'scale' | 'pulse' | 'none'
  intensity?: 'low' | 'medium' | 'high'
  className?: string
  respectReducedMotion?: boolean
  onHover?: () => void
  onLeave?: () => void
}

export const RatingHover: React.FC<RatingHoverProps> = ({
  children,
  hoverEffect = 'glow',
  intensity = 'medium',
  className = '',
  respectReducedMotion = true,
  onHover,
  onLeave,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const ratingRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  // Get intensity values
  const getIntensityValues = () => {
    const values = {
      low: { scale: 1.05, glow: 0.1, pulse: 0.1 },
      medium: { scale: 1.1, glow: 0.2, pulse: 0.2 },
      high: { scale: 1.15, glow: 0.3, pulse: 0.3 },
    }
    return values[intensity]
  }

  const intensityValues = getIntensityValues()

  // Handle hover events
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    onHover?.()
  }, [onHover])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    onLeave?.()
  }, [onLeave])

  // Get effect variants based on hover effect type
  const getEffectVariants = () => {
    if (respectReducedMotion && preferences.reducedMotion) {
      return {
        hover: { scale: 1 },
        tap: { scale: 0.95 },
      }
    }

    switch (hoverEffect) {
      case 'glow':
        return {
          hover: {
            scale: intensityValues.scale,
            boxShadow: `0 0 20px rgba(251, 191, 36, ${intensityValues.glow})`,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          tap: { scale: 0.95 },
        }
      case 'scale':
        return {
          hover: {
            scale: intensityValues.scale,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          tap: { scale: 0.95 },
        }
      case 'pulse':
        return {
          hover: {
            scale: intensityValues.scale,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          tap: { scale: 0.95 },
        }
      default:
        return {
          hover: { scale: 1 },
          tap: { scale: 0.95 },
        }
    }
  }

  const effectVariants = getEffectVariants()

  return (
    <motion.div
      ref={ratingRef}
      className={`relative inline-block ${className}`}
      variants={effectVariants}
      initial='initial'
      whileHover='hover'
      whileTap='tap'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Glow effect overlay */}
      {hoverEffect === 'glow' && isHovered && (
        <motion.div
          className='absolute inset-0 rounded-full bg-yellow-400/20 pointer-events-none'
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}

      {/* Pulse effect overlay */}
      {hoverEffect === 'pulse' && isHovered && (
        <motion.div
          className='absolute inset-0 rounded-full bg-yellow-400/10 pointer-events-none'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.div>
  )
}

export default RatingHover
