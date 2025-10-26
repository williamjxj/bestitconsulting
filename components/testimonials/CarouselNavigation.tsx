/**
 * Carousel navigation component
 * Provides navigation controls for testimonial carousels
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface CarouselNavigationProps {
  currentIndex: number
  totalItems: number
  onPrevious: () => void
  onNext: () => void
  onGoTo: (index: number) => void
  className?: string
  respectReducedMotion?: boolean
  showDots?: boolean
  showArrows?: boolean
  showThumbnails?: boolean
}

export const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
  onGoTo,
  className = '',
  respectReducedMotion = true,
  showDots = true,
  showArrows = true,
  showThumbnails = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          onPrevious()
          break
        case 'ArrowRight':
          onNext()
          break
        case 'Home':
          onGoTo(0)
          break
        case 'End':
          onGoTo(totalItems - 1)
          break
      }
    },
    [onPrevious, onNext, onGoTo, totalItems]
  )

  // Navigation variants
  const navVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { opacity: 1, y: 0 },
  }

  // Button variants
  const buttonVariants = {
    initial: { scale: 1, opacity: 0.7 },
    hover: { scale: 1.1, opacity: 1 },
    tap: { scale: 0.95 },
  }

  // Dot variants
  const dotVariants = {
    initial: { scale: 1, opacity: 0.5 },
    active: { scale: 1.2, opacity: 1 },
    hover: { scale: 1.1, opacity: 0.8 },
  }

  // Fallback for reduced motion
  if (respectReducedMotion && preferences.reducedMotion) {
    return (
      <div
        ref={navRef}
        className={`flex items-center justify-center space-x-4 ${className}`}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {showArrows && (
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
          >
            Previous
          </button>
        )}

        {showDots && (
          <div className='flex space-x-2'>
            {Array.from({ length: totalItems }, (_, index) => (
              <button
                key={index}
                onClick={() => onGoTo(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}

        {showArrows && (
          <button
            onClick={onNext}
            disabled={currentIndex === totalItems - 1}
            className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
          >
            Next
          </button>
        )}
      </div>
    )
  }

  return (
    <motion.div
      ref={navRef}
      className={`flex items-center justify-center space-x-4 ${className}`}
      variants={navVariants}
      initial='initial'
      animate='animate'
      whileHover='hover'
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Previous button */}
      {showArrows && (
        <motion.button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
          variants={buttonVariants}
          initial='initial'
          whileHover='hover'
          whileTap='tap'
        >
          ‹ Previous
        </motion.button>
      )}

      {/* Dots navigation */}
      {showDots && (
        <div className='flex space-x-2'>
          {Array.from({ length: totalItems }, (_, index) => (
            <motion.button
              key={index}
              onClick={() => onGoTo(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              variants={dotVariants}
              initial='initial'
              animate={index === currentIndex ? 'active' : 'initial'}
              whileHover='hover'
              whileTap='tap'
            />
          ))}
        </div>
      )}

      {/* Next button */}
      {showArrows && (
        <motion.button
          onClick={onNext}
          disabled={currentIndex === totalItems - 1}
          className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
          variants={buttonVariants}
          initial='initial'
          whileHover='hover'
          whileTap='tap'
        >
          Next ›
        </motion.button>
      )}

      {/* Thumbnail navigation */}
      {showThumbnails && (
        <motion.div
          className='flex space-x-2'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {Array.from({ length: totalItems }, (_, index) => (
            <motion.button
              key={index}
              onClick={() => onGoTo(index)}
              className={`w-12 h-12 rounded overflow-hidden ${
                index === currentIndex ? 'ring-2 ring-blue-500' : ''
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className='w-full h-full bg-gray-200 flex items-center justify-center text-xs'>
                {index + 1}
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default CarouselNavigation
