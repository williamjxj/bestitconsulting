/**
 * Icon loading states component
 * Provides animated loading states for icons
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface IconLoadingStatesProps {
  children: React.ReactNode
  loading?: boolean
  loadingIcon?: React.ReactNode
  successIcon?: React.ReactNode
  errorIcon?: React.ReactNode
  className?: string
  respectReducedMotion?: boolean
  onLoadingComplete?: () => void
}

export const IconLoadingStates: React.FC<IconLoadingStatesProps> = ({
  children,
  loading = false,
  loadingIcon,
  successIcon,
  errorIcon,
  className = '',
  respectReducedMotion = true,
  onLoadingComplete,
}) => {
  const [loadingState, setLoadingState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [isAnimating, setIsAnimating] = useState(false)
  const iconRef = useRef<HTMLDivElement>(null)
  const { announceToScreenReader } = useAccessibility()

  // Handle loading state changes
  useEffect(() => {
    if (loading && loadingState !== 'loading') {
      setLoadingState('loading')
      announceToScreenReader('Loading...')
    } else if (!loading && loadingState === 'loading') {
      setLoadingState('success')
      announceToScreenReader('Completed')

      // Reset to idle after success animation
      setTimeout(() => {
        setLoadingState('idle')
        onLoadingComplete?.()
      }, 2000)
    }
  }, [loading, loadingState, announceToScreenReader, onLoadingComplete])

  // Loading spinner component
  const LoadingSpinner = () => (
    <motion.div
      className='w-4 h-4 border-2 border-current border-t-transparent rounded-full'
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )

  // Success checkmark component
  const SuccessIcon = () => (
    <motion.div
      className='w-4 h-4'
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path d='M20 6L9 17l-5-5' />
      </svg>
    </motion.div>
  )

  // Error icon component
  const ErrorIcon = () => (
    <motion.div
      className='w-4 h-4'
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path d='M18 6L6 18M6 6l12 12' />
      </svg>
    </motion.div>
  )

  // Get current icon based on state
  const getCurrentIcon = () => {
    switch (loadingState) {
      case 'loading':
        return loadingIcon || <LoadingSpinner />
      case 'success':
        return successIcon || <SuccessIcon />
      case 'error':
        return errorIcon || <ErrorIcon />
      default:
        return children
    }
  }

  // Icon variants
  const iconVariants = {
    initial: { scale: 1, opacity: 1 },
    loading: { scale: 0.9, opacity: 0.7 },
    success: { scale: 1.1, opacity: 1 },
    error: { scale: 0.9, opacity: 0.7 },
  }

  // Content animation variants
  const contentVariants = {
    initial: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    enter: { opacity: 1, scale: 1 },
  }

  // Fallback for reduced motion
  if (respectReducedMotion && prefersReducedMotion) {
    return (
      <div ref={iconRef} className={`relative ${className}`}>
        {loading ? loadingIcon || <LoadingSpinner /> : children}
      </div>
    )
  }

  return (
    <motion.div
      ref={iconRef}
      className={`relative ${className}`}
      variants={iconVariants}
      animate={loadingState}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={loadingState}
          variants={contentVariants}
          initial='initial'
          animate='enter'
          exit='exit'
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {getCurrentIcon()}
        </motion.div>
      </AnimatePresence>

      {/* Loading progress ring */}
      {loadingState === 'loading' && (
        <motion.div
          className='absolute inset-0 border-2 border-current border-t-transparent rounded-full'
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Success pulse effect */}
      {loadingState === 'success' && (
        <motion.div
          className='absolute inset-0 bg-current opacity-20 rounded-full'
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
    </motion.div>
  )
}

export default IconLoadingStates
