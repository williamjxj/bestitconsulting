/**
 * Animated service icon component
 * Integrates Lottie animations for service icons
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { LottieIcon } from '@/components/animations/LottieIcon'
import { useAccessibility } from '@/hooks/useAccessibility'

interface AnimatedServiceIconProps {
  icon: React.ReactNode
  lottieAnimationId?: string
  size?: number
  color?: string
  className?: string
  respectReducedMotion?: boolean
  onHover?: () => void
  onLeave?: () => void
}

export const AnimatedServiceIcon: React.FC<AnimatedServiceIconProps> = ({
  icon,
  lottieAnimationId,
  size = 24,
  color = '#3b82f6',
  className = '',
  respectReducedMotion = true,
  onHover,
  onLeave,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  // Handle hover events
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    onHover?.()
  }, [onHover])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    onLeave?.()
  }, [onLeave])

  // Icon variants
  const iconVariants = {
    initial: {
      scale: 1,
      rotate: 0,
      color: color,
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      color: color,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: 'easeOut',
      },
    },
  }

  // Lottie animation variants
  const lottieVariants = {
    initial: {
      scale: 1,
      opacity: 0,
    },
    hover: {
      scale: 1.1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: 'easeOut',
      },
    },
  }

  // Fallback for reduced motion
  if (respectReducedMotion && preferences.reducedMotion) {
    return (
      <div
        ref={iconRef}
        className={`flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        {icon}
      </div>
    )
  }

  return (
    <motion.div
      ref={iconRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      variants={iconVariants}
      initial='initial'
      whileHover='hover'
      whileTap='tap'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static icon */}
      <motion.div
        className='absolute inset-0 flex items-center justify-center'
        animate={{
          opacity: isHovered && lottieAnimationId ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>

      {/* Lottie animation */}
      {lottieAnimationId && (
        <motion.div
          className='absolute inset-0 flex items-center justify-center'
          variants={lottieVariants}
          initial='initial'
          whileHover='hover'
          whileTap='tap'
        >
          <LottieIcon
            animationId={lottieAnimationId}
            size={size}
            color={color}
            autoplay={isHovered}
            loop={isHovered}
            respectReducedMotion={respectReducedMotion}
            onComplete={() => setIsAnimating(false)}
            onEnterFrame={() => setIsAnimating(true)}
          />
        </motion.div>
      )}

      {/* Hover glow effect */}
      {isHovered && (
        <motion.div
          className='absolute inset-0 rounded-full bg-current opacity-20'
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0.2 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}
    </motion.div>
  )
}

export default AnimatedServiceIcon
