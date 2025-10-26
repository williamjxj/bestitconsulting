/**
 * Avatar hover component
 * Provides subtle hover effects for testimonial avatars
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface AvatarHoverProps {
  children: React.ReactNode
  hoverEffect?: 'scale' | 'glow' | 'lift' | 'rotate' | 'none'
  intensity?: 'low' | 'medium' | 'high'
  className?: string
  respectReducedMotion?: boolean
  onHover?: () => void
  onLeave?: () => void
}

export const AvatarHover: React.FC<AvatarHoverProps> = ({
  children,
  hoverEffect = 'scale',
  intensity = 'medium',
  className = '',
  respectReducedMotion = true,
  onHover,
  onLeave,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const avatarRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  // Get intensity values
  const getIntensityValues = () => {
    const values = {
      low: { scale: 1.05, glow: 0.1, lift: 2, rotate: 5 },
      medium: { scale: 1.1, glow: 0.2, lift: 4, rotate: 10 },
      high: { scale: 1.15, glow: 0.3, lift: 6, rotate: 15 },
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
      case 'glow':
        return {
          hover: {
            scale: intensityValues.scale,
            boxShadow: `0 0 20px rgba(59, 130, 246, ${intensityValues.glow})`,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          tap: { scale: 0.95 },
        }
      case 'lift':
        return {
          hover: {
            scale: intensityValues.scale,
            y: -intensityValues.lift,
            boxShadow: `0 ${intensityValues.lift}px 20px rgba(0, 0, 0, 0.1)`,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          tap: { scale: 0.95, y: 0 },
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
          tap: { scale: 0.95, rotate: 0 },
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
      ref={avatarRef}
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
          className='absolute inset-0 rounded-full bg-blue-500/20 pointer-events-none'
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}

      {/* Pulse effect overlay */}
      {hoverEffect === 'scale' && isHovered && (
        <motion.div
          className='absolute inset-0 rounded-full bg-blue-500/10 pointer-events-none'
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

export default AvatarHover
