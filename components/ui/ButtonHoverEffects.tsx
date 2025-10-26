// @ts-nocheck
/**
 * Button hover effects component
 * Provides enhanced hover animations for buttons
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from './button'
import { useAccessibility } from '@/hooks/useAccessibility'

interface ButtonHoverEffectsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  effect?: 'glow' | 'lift' | 'scale' | 'slide' | 'none'
  intensity?: 'low' | 'medium' | 'high'
  children: React.ReactNode
  className?: string
  respectReducedMotion?: boolean
  asChild?: boolean
  // Custom props that should not be passed to DOM
  hoverScale?: number
  hoverBgColor?: string
}

export const ButtonHoverEffects: React.FC<ButtonHoverEffectsProps> = ({
  variant = 'default',
  size = 'default',
  effect = 'glow',
  intensity = 'medium',
  children,
  className = '',
  respectReducedMotion = true,
  asChild = false,
  // Custom props - destructure to prevent them from being passed to DOM
  hoverScale = 1.05,
  hoverBgColor = 'rgba(255, 255, 255, 0.2)',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { prefersReducedMotion } = useAccessibility()

  // Get effect intensity
  const getIntensityValues = () => {
    const values = {
      low: { scale: hoverScale * 0.95, glow: 0.1, lift: 2 },
      medium: { scale: hoverScale, glow: 0.2, lift: 4 },
      high: { scale: hoverScale * 1.05, glow: 0.3, lift: 6 },
    }
    return values[intensity]
  }

  const intensityValues = getIntensityValues()

  // Handle hover events
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  // Get effect variants based on effect type
  const getEffectVariants = () => {
    if (respectReducedMotion && prefersReducedMotion) {
      return {
        hover: { scale: 1 },
        tap: { scale: 0.98 },
      }
    }

    switch (effect) {
      case 'glow':
        return {
          hover: {
            scale: intensityValues.scale,
            boxShadow: `0 0 20px rgba(59, 130, 246, ${intensityValues.glow})`,
            transition: { duration: 0.3, ease: 'easeOut' },
          },
          tap: { scale: 0.95 },
        }
      case 'lift':
        return {
          hover: {
            scale: intensityValues.scale,
            y: -intensityValues.lift,
            boxShadow: `0 ${intensityValues.lift}px 20px rgba(0, 0, 0, 0.1)`,
            transition: { duration: 0.3, ease: 'easeOut' },
          },
          tap: { scale: 0.95, y: 0 },
        }
      case 'scale':
        return {
          hover: {
            scale: intensityValues.scale,
            transition: { duration: 0.3, ease: 'easeOut' },
          },
          tap: { scale: 0.95 },
        }
      case 'slide':
        return {
          hover: {
            scale: intensityValues.scale,
            x: 4,
            transition: { duration: 0.3, ease: 'easeOut' },
          },
          tap: { scale: 0.95, x: 0 },
        }
      default:
        return {
          hover: { scale: 1 },
          tap: { scale: 0.98 },
        }
    }
  }

  const effectVariants = getEffectVariants()

  // When asChild is true, we need to pass the children directly to avoid breaking Slot
  if (asChild) {
    return (
      <Button
        ref={buttonRef}
        variant={variant}
        size={size}
        className={`relative overflow-hidden ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        asChild={asChild}
        {...props}
      >
        {children}
      </Button>
    )
  }

  return (
    <motion.div
      className='inline-block'
      variants={effectVariants}
      initial='initial'
      whileHover='hover'
      whileTap='tap'
    >
      <Button
        ref={buttonRef}
        variant={variant}
        size={size}
        className={`relative overflow-hidden ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}

        {/* Glow effect overlay */}
        {effect === 'glow' &&
          isHovered &&
          !(respectReducedMotion && prefersReducedMotion) && (
            <motion.div
              className='absolute inset-0 rounded-md'
              style={{ backgroundColor: hoverBgColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}

        {/* Slide effect overlay */}
        {effect === 'slide' &&
          isHovered &&
          !(respectReducedMotion && prefersReducedMotion) && (
            <motion.div
              className='absolute inset-0 rounded-md bg-gradient-to-r from-transparent to-white/10'
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          )}
      </Button>
    </motion.div>
  )
}

export default ButtonHoverEffects
