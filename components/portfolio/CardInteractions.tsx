/**
 * Card interactions component
 * Provides interactive states and animations for portfolio cards
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface CardInteractionsProps {
  children: React.ReactNode
  interactionType?: 'hover' | 'click' | 'focus' | 'all'
  className?: string
  respectReducedMotion?: boolean
  onInteraction?: (type: string) => void
}

export const CardInteractions: React.FC<CardInteractionsProps> = ({
  children,
  interactionType = 'all',
  className = '',
  respectReducedMotion = true,
  onInteraction,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useAccessibility()

  // Handle hover events
  const handleMouseEnter = useCallback(() => {
    if (interactionType === 'hover' || interactionType === 'all') {
      setIsHovered(true)
      onInteraction?.('hover')
    }
  }, [interactionType, onInteraction])

  const handleMouseLeave = useCallback(() => {
    if (interactionType === 'hover' || interactionType === 'all') {
      setIsHovered(false)
    }
  }, [interactionType])

  // Handle click events
  const handleClick = useCallback(() => {
    if (interactionType === 'click' || interactionType === 'all') {
      setIsClicked(true)
      onInteraction?.('click')

      // Reset click state after animation
      setTimeout(() => {
        setIsClicked(false)
      }, 200)
    }
  }, [interactionType, onInteraction])

  // Handle focus events
  const handleFocus = useCallback(() => {
    if (interactionType === 'focus' || interactionType === 'all') {
      setIsFocused(true)
      onInteraction?.('focus')
    }
  }, [interactionType, onInteraction])

  const handleBlur = useCallback(() => {
    if (interactionType === 'focus' || interactionType === 'all') {
      setIsFocused(false)
    }
  }, [interactionType])

  // Card variants
  const cardVariants = {
    initial: { scale: 1, y: 0, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    click: {
      scale: 0.98,
      y: 0,
      transition: { duration: 0.1, ease: 'easeOut' },
    },
    focus: {
      scale: 1.01,
      y: -2,
      boxShadow: '0 0 0 2px #3b82f6',
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  }

  // Get current variant based on interaction state
  const getCurrentVariant = () => {
    if (isClicked) return 'click'
    if (isFocused) return 'focus'
    if (isHovered) return 'hover'
    return 'initial'
  }

  // Fallback for reduced motion
  if (respectReducedMotion && prefersReducedMotion) {
    return (
      <div ref={cardRef} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      variants={cardVariants}
      initial='initial'
      animate={getCurrentVariant()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      {children}

      {/* Interaction overlay */}
      <motion.div
        className='absolute inset-0 bg-blue-500/10 pointer-events-none'
        animate={{
          opacity: isHovered || isFocused ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Click ripple effect */}
      {isClicked && (
        <motion.div
          className='absolute inset-0 bg-blue-500/20 pointer-events-none'
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}
    </motion.div>
  )
}

export default CardInteractions
