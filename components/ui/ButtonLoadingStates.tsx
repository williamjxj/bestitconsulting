/**
 * Button loading states component
 * Provides animated loading states for buttons
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'
import { useAccessibility } from '@/hooks/useAccessibility'

interface ButtonLoadingStatesProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
  loadingText?: string
  loadingIcon?: React.ReactNode
  successIcon?: React.ReactNode
  errorIcon?: React.ReactNode
  children: React.ReactNode
  className?: string
  onLoadingComplete?: () => void
  respectReducedMotion?: boolean
}

export const ButtonLoadingStates: React.FC<ButtonLoadingStatesProps> = ({
  variant = 'default',
  size = 'default',
  loading = false,
  loadingText,
  loadingIcon,
  successIcon,
  errorIcon,
  children,
  className = '',
  onLoadingComplete,
  respectReducedMotion = true,
  onClick,
  ...props
}) => {
  const [loadingState, setLoadingState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
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
      }, 2000)
    }
  }, [loading, loadingState, announceToScreenReader])

  // Handle click with loading state
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loadingState === 'loading') return

      setLoadingState('loading')
      onClick?.(event)
    },
    [loadingState, onClick]
  )

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
        return null
    }
  }

  // Get current text based on state
  const getCurrentText = () => {
    switch (loadingState) {
      case 'loading':
        return loadingText || 'Loading...'
      case 'success':
        return 'Success!'
      case 'error':
        return 'Error'
      default:
        return children
    }
  }

  // Button variants
  const buttonVariants = {
    idle: { scale: 1 },
    loading: { scale: 0.98 },
    success: { scale: 1.02 },
    error: { scale: 0.98 },
  }

  // Content animation variants
  const contentVariants = {
    initial: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className='inline-block'
      variants={buttonVariants}
      animate={loadingState}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Button
        ref={buttonRef}
        variant={variant}
        size={size}
        className={`relative overflow-hidden ${className}`}
        onClick={handleClick}
        disabled={loadingState === 'loading'}
        {...props}
      >
        <AnimatePresence mode='wait'>
          <motion.div
            key={loadingState}
            className='flex items-center justify-center gap-2'
            variants={contentVariants}
            initial='initial'
            animate='enter'
            exit='exit'
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {getCurrentIcon()}
            <span>{getCurrentText()}</span>
          </motion.div>
        </AnimatePresence>

        {/* Loading progress bar */}
        {loadingState === 'loading' &&
          !(respectReducedMotion && preferences.reducedMotion) && (
            <motion.div
              className='absolute bottom-0 left-0 h-1 bg-blue-500'
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'linear' }}
            />
          )}
      </Button>
    </motion.div>
  )
}

export default ButtonLoadingStates
