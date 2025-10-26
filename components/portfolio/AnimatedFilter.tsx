/**
 * Animated filter component
 * Provides smooth filter animations for portfolio items
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface AnimatedFilterProps {
  children: React.ReactNode[]
  filters: Array<{
    id: string
    label: string
    value: string
  }>
  activeFilter: string
  onFilterChange: (filter: string) => void
  className?: string
  respectReducedMotion?: boolean
  onFilterComplete?: (filter: string) => void
}

export const AnimatedFilter: React.FC<AnimatedFilterProps> = ({
  children,
  filters,
  activeFilter,
  onFilterChange,
  className = '',
  respectReducedMotion = true,
  onFilterComplete,
}) => {
  const [isFiltering, setIsFiltering] = useState(false)
  const [filteredItems, setFilteredItems] = useState(children)
  const filterRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useAccessibility()

  // Handle filter change
  const handleFilterChange = useCallback(
    (filter: string) => {
      if (respectReducedMotion && prefersReducedMotion) {
        onFilterChange(filter)
        return
      }

      setIsFiltering(true)
      onFilterChange(filter)

      // Simulate filtering delay
      setTimeout(() => {
        setIsFiltering(false)
        onFilterComplete?.(filter)
      }, 300)
    },
    [
      onFilterChange,
      onFilterComplete,
      respectReducedMotion,
      prefersReducedMotion,
    ]
  )

  // Filter button variants
  const buttonVariants = {
    initial: { scale: 1, opacity: 0.7 },
    active: { scale: 1.05, opacity: 1 },
    hover: { scale: 1.02, opacity: 0.9 },
  }

  // Item variants
  const itemVariants = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.9 },
  }

  // Container variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  // Fallback for reduced motion
  if (respectReducedMotion && prefersReducedMotion) {
    return (
      <div ref={filterRef} className={className}>
        <div className='flex space-x-2 mb-4'>
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.value)}
              className={`px-4 py-2 rounded ${
                activeFilter === filter.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {children}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      ref={filterRef}
      className={className}
      variants={containerVariants}
      initial='initial'
      animate='animate'
    >
      {/* Filter buttons */}
      <motion.div className='flex space-x-2 mb-4'>
        {filters && filters.length > 0
          ? filters.map(filter => (
              <motion.button
                key={filter.id}
                onClick={() => handleFilterChange(filter.value)}
                className={`px-4 py-2 rounded transition-colors ${
                  activeFilter === filter.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                variants={buttonVariants}
                initial='initial'
                animate={activeFilter === filter.value ? 'active' : 'initial'}
                whileHover='hover'
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))
          : null}
      </motion.div>

      {/* Filtered items */}
      <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <AnimatePresence mode='wait'>
          {isFiltering ? (
            <motion.div
              key='loading'
              className='col-span-full flex items-center justify-center py-8'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className='w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full'
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              className='contents'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {children.map((child, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: 'easeOut',
                  }}
                >
                  {child}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default AnimatedFilter
