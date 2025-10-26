/**
 * Gallery loading component
 * Provides loading states for portfolio gallery
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface GalleryLoadingProps {
  children: React.ReactNode
  loading?: boolean
  loadingType?: 'skeleton' | 'spinner' | 'pulse' | 'shimmer'
  className?: string
  respectReducedMotion?: boolean
  onLoadingComplete?: () => void
}

export const GalleryLoading: React.FC<GalleryLoadingProps> = ({
  children,
  loading = false,
  loadingType = 'skeleton',
  className = '',
  respectReducedMotion = true,
  onLoadingComplete,
}) => {
  const [isLoading, setIsLoading] = useState(loading)
  const galleryRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  // Handle loading state changes
  useEffect(() => {
    if (loading && !isLoading) {
      setIsLoading(true)
    } else if (!loading && isLoading) {
      setIsLoading(false)
      onLoadingComplete?.()
    }
  }, [loading, isLoading, onLoadingComplete])

  // Loading skeleton component
  const SkeletonLoading = () => (
    <div className='space-y-4'>
      <div className='h-4 bg-gray-200 rounded animate-pulse' />
      <div className='h-4 bg-gray-200 rounded animate-pulse w-3/4' />
      <div className='h-4 bg-gray-200 rounded animate-pulse w-1/2' />
    </div>
  )

  // Loading spinner component
  const SpinnerLoading = () => (
    <motion.div
      className='w-8 h-8 border-2 border-current border-t-transparent rounded-full'
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )

  // Pulse loading component
  const PulseLoading = () => (
    <motion.div
      className='w-full h-full bg-gray-200 rounded'
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )

  // Shimmer loading component
  const ShimmerLoading = () => (
    <div className='relative overflow-hidden'>
      <div className='w-full h-full bg-gray-200 rounded' />
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )

  // Get loading content based on type
  const getLoadingContent = () => {
    switch (loadingType) {
      case 'skeleton':
        return <SkeletonLoading />
      case 'spinner':
        return <SpinnerLoading />
      case 'pulse':
        return <PulseLoading />
      case 'shimmer':
        return <ShimmerLoading />
      default:
        return <SpinnerLoading />
    }
  }

  // Gallery variants
  const galleryVariants = {
    initial: { opacity: 0 },
    loading: { opacity: 0.7 },
    loaded: { opacity: 1 },
  }

  // Loading overlay variants
  const overlayVariants = {
    initial: { opacity: 0 },
    loading: { opacity: 1 },
    exit: { opacity: 0 },
  }

  // Fallback for reduced motion
  if (respectReducedMotion && preferences.reducedMotion) {
    return (
      <div ref={galleryRef} className={`relative ${className}`}>
        {isLoading ? getLoadingContent() : children}
      </div>
    )
  }

  return (
    <motion.div
      ref={galleryRef}
      className={`relative ${className}`}
      variants={galleryVariants}
      initial='initial'
      animate={isLoading ? 'loading' : 'loaded'}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Main content */}
      <AnimatePresence mode='wait'>
        {!isLoading ? (
          <motion.div
            key='content'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            key='loading'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='flex items-center justify-center p-8'
          >
            {getLoadingContent()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className='absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center'
            variants={overlayVariants}
            initial='initial'
            animate='loading'
            exit='exit'
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className='flex items-center justify-center'
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {getLoadingContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default GalleryLoading
