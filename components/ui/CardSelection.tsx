/**
 * Card selection component
 * Provides selection states and animations for cards
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface CardSelectionProps {
  children: React.ReactNode
  isSelected?: boolean
  onSelect?: (isSelected: boolean) => void
  selectionType?: 'single' | 'multiple'
  className?: string
  respectReducedMotion?: boolean
  selectionIndicator?: React.ReactNode
  onSelectionChange?: (selected: boolean) => void
}

export const CardSelection: React.FC<CardSelectionProps> = ({
  children,
  isSelected: controlledSelected,
  onSelect,
  selectionType = 'single',
  className = '',
  respectReducedMotion = true,
  selectionIndicator,
  onSelectionChange,
}) => {
  const [internalSelected, setInternalSelected] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useAccessibility()

  const isSelected =
    controlledSelected !== undefined ? controlledSelected : internalSelected

  // Handle selection
  const handleSelect = useCallback(() => {
    if (respectReducedMotion && prefersReducedMotion) return

    const newState = !isSelected
    if (controlledSelected === undefined) {
      setInternalSelected(newState)
    }
    onSelect?.(newState)
    onSelectionChange?.(newState)
  }, [
    isSelected,
    controlledSelected,
    onSelect,
    onSelectionChange,
    respectReducedMotion,
    prefersReducedMotion,
  ])

  // Card variants
  const cardVariants = {
    initial: {
      scale: 1,
      borderColor: 'transparent',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    selected: {
      scale: 1.02,
      borderColor: '#3b82f6',
      boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.1)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.01,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  }

  // Selection indicator variants
  const indicatorVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    selected: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  // Default selection indicator
  const DefaultSelectionIndicator = () => (
    <motion.div
      className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center'
      variants={indicatorVariants}
      initial='initial'
      animate={isSelected ? 'selected' : 'initial'}
    >
      <svg
        className='w-4 h-4 text-white'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M5 13l4 4L19 7'
        />
      </svg>
    </motion.div>
  )

  return (
    <motion.div
      ref={cardRef}
      className={`relative w-full ${className}`}
      variants={cardVariants}
      initial='initial'
      animate={isSelected ? 'selected' : 'initial'}
      whileHover='hover'
      onClick={handleSelect}
      style={{
        cursor: 'pointer',
        border: '2px solid transparent',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
      }}
    >
      {children}

      {/* Selection indicator */}
      <motion.div
        className='absolute top-2 right-2 z-10'
        variants={indicatorVariants}
        initial='initial'
        animate={isSelected ? 'selected' : 'initial'}
      >
        {selectionIndicator || <DefaultSelectionIndicator />}
      </motion.div>

      {/* Selection overlay */}
      {isSelected && (
        <motion.div
          className='absolute inset-0 bg-blue-500/5 rounded-lg pointer-events-none'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Selection border */}
      {isSelected && (
        <motion.div
          className='absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}

export default CardSelection
