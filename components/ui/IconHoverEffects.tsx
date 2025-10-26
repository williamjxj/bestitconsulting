/**
 * Icon hover effects component
 * Provides enhanced hover animations for icons
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface IconHoverEffectsProps {
  children: React.ReactNode
  effect?: 'bounce' | 'pulse' | 'glow' | 'rotate' | 'scale' | 'none'
  intensity?: 'low' | 'medium' | 'high'
  color?: string
  className?: string
  respectReducedMotion?: boolean
  onHover?: () => void
  onLeave?: () => void
}

export const IconHoverEffects: React.FC<IconHoverEffectsProps> = ({
  children,
  effect = 'scale',
  intensity = 'medium',
  color = '#3b82f6',
  className = '',
  respectReducedMotion = true,
  onHover,
  onLeave,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useAccessibility()

  // Get intensity values
  const getIntensityValues = () => {
    const values = {
      low: { scale: 1.05, rotate: 5, glow: 0.1, bounce: 0.1 },
      medium: { scale: 1.1, rotate: 10, glow: 0.2, bounce: 0.2 },
      high: { scale: 1.15, rotate: 15, glow: 0.3, bounce: 0.3 },
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

  // Get effect variants based on effect type
  const getEffectVariants = () => {
    if (respectReducedMotion && prefersReducedMotion) {
      return {
        hover: { scale: 1 },
        tap: { scale: 0.95 },
      }
    }

    switch (effect) {
      case 'bounce':
        return {
          hover: {
            scale: intensityValues.scale,
            y: -intensityValues.bounce * 10,
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
      case 'glow':
        return {
          hover: {
            scale: intensityValues.scale,
            boxShadow: `0 0 20px ${color}${Math.round(
              intensityValues.glow * 255
            )
              .toString(16)
              .padStart(2, '0')}`,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          tap: { scale: 0.95 },
        }
      case 'rotate':
        return {
          hover: {
            scale: intensityValues.scale,
            rotate: intensityValues.rotate,
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
      ref={iconRef}
      className={`relative inline-flex items-center justify-center ${className}`}
      variants={effectVariants}
      initial='initial'
      whileHover='hover'
      whileTap='tap'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Glow effect overlay */}
      {effect === 'glow' && isHovered && (
        <motion.div
          className='absolute inset-0 rounded-full bg-current opacity-20'
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0.2 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}

      {/* Pulse effect overlay */}
      {effect === 'pulse' && isHovered && (
        <motion.div
          className='absolute inset-0 rounded-full bg-current opacity-10'
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

export default IconHoverEffects
