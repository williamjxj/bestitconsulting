/**
 * Card expansion component
 * Provides expandable card functionality for portfolio items
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface CardExpansionProps {
  children: React.ReactNode
  expandedContent: React.ReactNode
  isExpanded?: boolean
  onToggle?: (isExpanded: boolean) => void
  className?: string
  respectReducedMotion?: boolean
  expandDirection?: 'down' | 'up' | 'left' | 'right'
  duration?: number
}

export const CardExpansion: React.FC<CardExpansionProps> = ({
  children,
  expandedContent,
  isExpanded: controlledExpanded,
  onToggle,
  className = '',
  respectReducedMotion = true,
  expandDirection = 'down',
  duration = 0.3,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  const isExpanded =
    controlledExpanded !== undefined ? controlledExpanded : internalExpanded

  // Handle toggle
  const handleToggle = useCallback(() => {
    if (respectReducedMotion && preferences.reducedMotion) return

    const newState = !isExpanded
    if (controlledExpanded === undefined) {
      setInternalExpanded(newState)
    }
    onToggle?.(newState)
  }, [
    isExpanded,
    controlledExpanded,
    onToggle,
    respectReducedMotion,
    preferences.reducedMotion,
  ])

  // Get expand variants based on direction
  const getExpandVariants = () => {
    if (respectReducedMotion && preferences.reducedMotion) {
      return {
        collapsed: { opacity: 0, height: 0 },
        expanded: { opacity: 1, height: 'auto' },
      }
    }

    switch (expandDirection) {
      case 'down':
        return {
          collapsed: { opacity: 0, height: 0, y: -10 },
          expanded: { opacity: 1, height: 'auto', y: 0 },
        }
      case 'up':
        return {
          collapsed: { opacity: 0, height: 0, y: 10 },
          expanded: { opacity: 1, height: 'auto', y: 0 },
        }
      case 'left':
        return {
          collapsed: { opacity: 0, width: 0, x: 10 },
          expanded: { opacity: 1, width: 'auto', x: 0 },
        }
      case 'right':
        return {
          collapsed: { opacity: 0, width: 0, x: -10 },
          expanded: { opacity: 1, width: 'auto', x: 0 },
        }
      default:
        return {
          collapsed: { opacity: 0, height: 0 },
          expanded: { opacity: 1, height: 'auto' },
        }
    }
  }

  const expandVariants = getExpandVariants()

  // Card variants
  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    expanded: { scale: 1.05 },
  }

  // Fallback for reduced motion
  if (respectReducedMotion && preferences.reducedMotion) {
    return (
      <div ref={cardRef} className={`relative ${className}`}>
        <div onClick={handleToggle} className='cursor-pointer'>
          {children}
        </div>
        {isExpanded && <div className='mt-4'>{expandedContent}</div>}
      </div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      variants={cardVariants}
      initial='initial'
      whileHover='hover'
      animate={isExpanded ? 'expanded' : 'initial'}
      onClick={handleToggle}
    >
      {/* Main content */}
      <motion.div className='relative z-10'>{children}</motion.div>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className='relative z-20'
            variants={expandVariants}
            initial='collapsed'
            animate='expanded'
            exit='collapsed'
            transition={{
              duration,
              ease: 'easeInOut',
            }}
          >
            {expandedContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand indicator */}
      <motion.div
        className='absolute top-2 right-2 w-6 h-6 flex items-center justify-center'
        animate={{
          rotate: isExpanded ? 180 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default CardExpansion
