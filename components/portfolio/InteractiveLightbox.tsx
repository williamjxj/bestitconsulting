/**
 * Interactive lightbox component
 * Creates smooth lightbox with transitions for portfolio images
 */

'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface InteractiveLightboxProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  currentIndex: number
  onIndexChange: (index: number) => void
  className?: string
  respectReducedMotion?: boolean
  onImageClick?: (index: number) => void
}

export const InteractiveLightbox: React.FC<InteractiveLightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  className = '',
  respectReducedMotion = true,
  onImageClick,
}) => {
  const lightboxRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const { prefersReducedMotion } = useAccessibility()

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onIndexChange((currentIndex - 1 + images.length) % images.length)
          break
        case 'ArrowRight':
          onIndexChange((currentIndex + 1) % images.length)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange])

  // Handle click outside
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === lightboxRef.current) {
        onClose()
      }
    },
    [onClose]
  )

  // Handle image click
  const handleImageClick = useCallback(() => {
    onImageClick?.(currentIndex)
  }, [currentIndex, onImageClick])

  // Lightbox variants
  const lightboxVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  // Image variants
  const imageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  }

  // Navigation variants
  const navVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  }

  // Fallback for reduced motion
  if (respectReducedMotion && prefersReducedMotion) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className='fixed inset-0 z-50 bg-black/80 flex items-center justify-center'>
            <div className='relative max-w-4xl max-h-4xl'>
              <img
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                className='max-w-full max-h-full object-contain'
              />
              <button
                onClick={onClose}
                className='absolute top-4 right-4 text-white text-2xl'
              >
                ×
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={lightboxRef}
          className={`fixed inset-0 z-50 bg-black/80 flex items-center justify-center ${className}`}
          variants={lightboxVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          onClick={handleBackdropClick}
        >
          {/* Close button */}
          <motion.button
            className='absolute top-4 right-4 text-white text-2xl z-10'
            onClick={onClose}
            variants={navVariants}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            ×
          </motion.button>

          {/* Navigation arrows */}
          <motion.button
            className='absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10'
            onClick={() =>
              onIndexChange((currentIndex - 1 + images.length) % images.length)
            }
            variants={navVariants}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            ‹
          </motion.button>

          <motion.button
            className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10'
            onClick={() => onIndexChange((currentIndex + 1) % images.length)}
            variants={navVariants}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            ›
          </motion.button>

          {/* Main image */}
          <motion.div
            className='relative max-w-4xl max-h-4xl'
            variants={imageVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            onClick={handleImageClick}
          >
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className='max-w-full max-h-full object-contain cursor-zoom-in'
            />
          </motion.div>

          {/* Thumbnail navigation */}
          <motion.div
            className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'
            variants={navVariants}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            {images.map((image, index) => (
              <motion.button
                key={index}
                className={`w-16 h-16 rounded overflow-hidden ${
                  index === currentIndex ? 'ring-2 ring-white' : ''
                }`}
                onClick={() => onIndexChange(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InteractiveLightbox
