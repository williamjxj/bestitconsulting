/**
 * Avatar loading component
 * Provides loading states for testimonial avatars
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface AvatarLoadingProps {
  children: React.ReactNode
  loading?: boolean
  loadingType?: 'skeleton' | 'spinner' | 'pulse' | 'shimmer'
  className?: string
  respectReducedMotion?: boolean
  onLoadingComplete?: () => void
}

export const AvatarLoading: React.FC<AvatarLoadingProps> = ({
  children,
  loading = false,
  loadingType = 'skeleton',
  className = '',
  respectReducedMotion = true,
  onLoadingComplete,
}) => {
  const [isLoading, setIsLoading] = useState(loading)
  const avatarRef = useRef<HTMLDivElement>(null)
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
    <div className='w-full h-full bg-gray-200 rounded-full animate-pulse' />
  )

  // Loading spinner component
  const SpinnerLoading = () => (
    <motion.div
      className='w-full h-full border-2 border-current border-t-transparent rounded-full'
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )

  // Pulse loading component
  const PulseLoading = () => (
    <motion.div
      className='w-full h-full bg-gray-200 rounded-full'
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
    <div className='relative overflow-hidden w-full h-full rounded-full'>
      <div className='w-full h-full bg-gray-200 rounded-full' />
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full'
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

  // Avatar variants
  const avatarVariants = {
    initial: { scale: 1, opacity: 1 },
    loading: { scale: 0.9, opacity: 0.7 },
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
      <div ref={avatarRef} className={`relative ${className}`}>
        {isLoading ? getLoadingContent() : children}
      </div>
    )
  }

  return (
    <motion.div
      ref={avatarRef}
      className={`relative ${className}`}
      variants={avatarVariants}
      initial='initial'
      animate={isLoading ? 'loading' : 'initial'}
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
            className='flex items-center justify-center'
          >
            {getLoadingContent()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className='absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-full'
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

export default AvatarLoading
