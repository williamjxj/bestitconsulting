'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'

interface LoadingAnimationsProps extends HTMLMotionProps<'div'> {
  children?: React.ReactNode
  type?:
    | 'spinner'
    | 'skeleton'
    | 'progress'
    | 'pulse'
    | 'dots'
    | 'wave'
    | 'shimmer'
  size?: 'small' | 'medium' | 'large'
  color?: string
  duration?: number
  className?: string
}

const LoadingAnimations: React.FC<LoadingAnimationsProps> = ({
  children,
  type = 'spinner',
  size = 'medium',
  color = '#3B82F6',
  duration = 1,
  className,
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion()
  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: `loading-${type}`,
      name: `Loading ${type}`,
      type: 'loading',
      duration: duration * 1000,
      easing: 'linear',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-loading',
        staticFallback: true,
      },
      performance: {
        maxDuration: duration * 1000,
        targetFPS: 60,
        memoryLimit: 5,
        gpuAcceleration: true,
      },
    },
    'loading-animation'
  )

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        {...(rest as any)}
      >
        <div className='w-4 h-4 bg-gray-300 rounded-full' />
      </div>
    )
  }

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  }

  const getLoadingComponent = () => {
    const baseProps = {
      className: `${sizeClasses[size]} ${className}`,
      style: { color },
      ...(rest as any),
    }

    switch (type) {
      case 'spinner':
        return (
          <motion.div
            {...baseProps}
            animate={{ rotate: 360 }}
            transition={{
              duration: optimizedConfig.duration / 1000,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              border: `2px solid ${color}20`,
              borderTop: `2px solid ${color}`,
              borderRadius: '50%',
              ...baseProps.style,
            }}
          />
        )

      case 'dots':
        return (
          <div className='flex space-x-1' {...baseProps}>
            {[0, 1, 2].map(index => (
              <motion.div
                key={index}
                className='w-2 h-2 rounded-full'
                style={{ backgroundColor: color }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: optimizedConfig.duration / 1000,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: 'easeInOut' as const,
                }}
              />
            ))}
          </div>
        )

      case 'wave':
        return (
          <div className='flex space-x-1' {...baseProps}>
            {[0, 1, 2, 3, 4].map(index => (
              <motion.div
                key={index}
                className='w-1 bg-current rounded-full'
                style={{ backgroundColor: color }}
                animate={{
                  height: ['20%', '100%', '20%'],
                }}
                transition={{
                  duration: optimizedConfig.duration / 1000,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: 'easeInOut' as const,
                }}
              />
            ))}
          </div>
        )

      case 'pulse':
        return (
          <motion.div
            {...baseProps}
            className={`rounded-full ${baseProps.className}`}
            style={{ backgroundColor: color }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: optimizedConfig.duration / 1000,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
          />
        )

      case 'progress':
        return (
          <div
            className='w-full bg-gray-200 rounded-full overflow-hidden'
            {...baseProps}
          >
            <motion.div
              className='h-full rounded-full'
              style={{ backgroundColor: color }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: optimizedConfig.duration / 1000,
                repeat: Infinity,
                ease: 'easeInOut' as const,
              }}
            />
          </div>
        )

      case 'shimmer':
        return (
          <motion.div
            {...baseProps}
            className='relative overflow-hidden rounded'
            style={{ backgroundColor: color + '20' }}
            animate={{
              background: [
                `linear-gradient(90deg, ${color}20 0%, ${color}40 50%, ${color}20 100%)`,
                `linear-gradient(90deg, ${color}20 0%, ${color}40 50%, ${color}20 100%)`,
              ],
            }}
            transition={{
              duration: optimizedConfig.duration / 1000,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: optimizedConfig.duration / 1000,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            {children}
          </motion.div>
        )

      case 'skeleton':
        return (
          <div className='space-y-2' {...baseProps}>
            <motion.div
              className='h-4 bg-gray-200 rounded'
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: optimizedConfig.duration / 1000,
                repeat: Infinity,
                ease: 'easeInOut' as const,
              }}
            />
            <motion.div
              className='h-4 bg-gray-200 rounded w-3/4'
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: optimizedConfig.duration / 1000,
                repeat: Infinity,
                delay: 0.2,
                ease: 'easeInOut' as const,
              }}
            />
            <motion.div
              className='h-4 bg-gray-200 rounded w-1/2'
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: optimizedConfig.duration / 1000,
                repeat: Infinity,
                delay: 0.4,
                ease: 'easeInOut' as const,
              }}
            />
          </div>
        )

      default:
        return (
          <motion.div
            {...baseProps}
            animate={{ rotate: 360 }}
            transition={{
              duration: optimizedConfig.duration / 1000,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              border: `2px solid ${color}20`,
              borderTop: `2px solid ${color}`,
              borderRadius: '50%',
              ...baseProps.style,
            }}
          />
        )
    }
  }

  return getLoadingComponent()
}

// Specialized loading components
export const LoadingSpinner: React.FC<
  Omit<LoadingAnimationsProps, 'type'>
> = props => <LoadingAnimations {...props} type='spinner' />

export const LoadingDots: React.FC<
  Omit<LoadingAnimationsProps, 'type'>
> = props => <LoadingAnimations {...props} type='dots' />

export const LoadingWave: React.FC<
  Omit<LoadingAnimationsProps, 'type'>
> = props => <LoadingAnimations {...props} type='wave' />

export const LoadingPulse: React.FC<
  Omit<LoadingAnimationsProps, 'type'>
> = props => <LoadingAnimations {...props} type='pulse' />

export const LoadingProgress: React.FC<
  Omit<LoadingAnimationsProps, 'type'>
> = props => <LoadingAnimations {...props} type='progress' />

export const LoadingShimmer: React.FC<
  Omit<LoadingAnimationsProps, 'type'>
> = props => <LoadingAnimations {...props} type='shimmer' />

export const LoadingSkeleton: React.FC<
  Omit<LoadingAnimationsProps, 'type'>
> = props => <LoadingAnimations {...props} type='skeleton' />

// Page loading overlay
interface PageLoadingProps {
  isLoading: boolean
  message?: string
  progress?: number
  onComplete?: () => void
}

export const PageLoading: React.FC<PageLoadingProps> = ({
  isLoading,
  message = 'Loading...',
  progress,
  onComplete,
}) => {
  const [show, setShow] = React.useState(isLoading)

  React.useEffect(() => {
    if (isLoading) {
      setShow(true)
    } else {
      const timer = setTimeout(() => {
        setShow(false)
        onComplete?.()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading, onComplete])

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center'
    >
      <div className='text-center'>
        <LoadingSpinner size='large' color='#3B82F6' />
        <p className='mt-4 text-lg font-medium text-gray-700'>{message}</p>
        {progress !== undefined && (
          <div className='mt-4 w-64 mx-auto'>
            <LoadingProgress color='#3B82F6' />
            <p className='mt-2 text-sm text-gray-600'>
              {Math.round(progress)}%
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Content loading placeholder
interface ContentLoadingProps {
  lines?: number
  showAvatar?: boolean
  className?: string
}

export const ContentLoading: React.FC<ContentLoadingProps> = ({
  lines = 3,
  showAvatar = false,
  className,
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {showAvatar && (
        <div className='flex items-center space-x-3'>
          <LoadingSkeleton className='w-10 h-10 rounded-full' />
          <div className='space-y-2 flex-1'>
            <LoadingSkeleton className='h-4 w-1/4' />
            <LoadingSkeleton className='h-3 w-1/6' />
          </div>
        </div>
      )}
      {Array.from({ length: lines }).map((_, index) => (
        <LoadingSkeleton
          key={index}
          className={`h-4 ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

// Button loading state
interface ButtonLoadingProps {
  isLoading: boolean
  children: React.ReactNode
  loadingText?: string
  className?: string
}

export const ButtonLoading: React.FC<ButtonLoadingProps> = ({
  isLoading,
  children,
  loadingText = 'Loading...',
  className,
}) => {
  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-white/80'>
          <LoadingSpinner size='small' color='#3B82F6' />
          <span className='ml-2 text-sm'>{loadingText}</span>
        </div>
      )}
      {children}
    </div>
  )
}

export default LoadingAnimations
