/**
 * Animated button with ripple effect
 * Enhanced button component with smooth animations
 */

'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from './button'
import { useAccessibility } from '@/hooks/useAccessibility'

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  ripple?: boolean
  hoverEffect?: boolean
  loading?: boolean
  children: React.ReactNode
  className?: string
  respectReducedMotion?: boolean
  asChild?: boolean
  // Custom props that should not be passed to DOM
  rippleColor?: string
  duration?: number
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'default',
  size = 'default',
  ripple = true,
  hoverEffect = true,
  loading = false,
  children,
  className = '',
  respectReducedMotion = true,
  asChild = false,
  // Custom props - destructure to prevent them from being passed to DOM
  rippleColor = 'rgba(255, 255, 255, 0.3)',
  duration = 0.6,
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { prefersReducedMotion } = useAccessibility()

  // Create ripple effect
  const createRipple = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!ripple || (respectReducedMotion && prefersReducedMotion)) return

      const button = buttonRef.current
      if (!button) return

      const rect = button.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const newRipple = {
        id: Date.now(),
        x,
        y,
      }

      setRipples(prev => [...prev, newRipple])

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
      }, duration * 1000)
    },
    [ripple, respectReducedMotion, prefersReducedMotion, duration]
  )

  // Handle click
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(event)
      onClick?.(event)
    },
    [createRipple, onClick]
  )

  // Button variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover:
      hoverEffect && !(respectReducedMotion && prefersReducedMotion)
        ? {
            scale: 1.05,
            transition: { duration: 0.2, ease: 'easeOut' },
          }
        : { scale: 1 },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1, ease: 'easeOut' },
    },
  }

  // Ripple animation variants
  const rippleVariants = {
    initial: {
      scale: 0,
      opacity: 1,
    },
    animate: {
      scale: 4,
      opacity: 0,
      transition: {
        duration: duration,
        ease: 'easeOut',
      },
    },
  }

  // When asChild is true, we need to pass the children directly to avoid breaking Slot
  if (asChild) {
    return (
      <Button
        ref={buttonRef}
        variant={variant}
        size={size}
        className={`relative ${className}`}
        onClick={handleClick}
        disabled={loading}
        asChild={asChild}
        {...props}
      >
        {children}
      </Button>
    )
  }

  return (
    <motion.div
      className='relative inline-block overflow-hidden'
      variants={buttonVariants}
      initial='initial'
      whileHover='hover'
      whileTap='tap'
    >
      <Button
        ref={buttonRef}
        variant={variant}
        size={size}
        className={`relative ${className}`}
        onClick={handleClick}
        disabled={loading}
        {...props}
      >
        {loading && (
          <motion.div
            className='absolute inset-0 flex items-center justify-center bg-inherit'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='w-4 h-4 border-2 border-current border-t-transparent rounded-full'
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}

        <motion.span
          className={loading ? 'opacity-0' : 'opacity-100'}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>

        {/* Ripple effects */}
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className='absolute pointer-events-none rounded-full'
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
              backgroundColor: rippleColor,
            }}
            variants={rippleVariants}
            initial='initial'
            animate='animate'
          />
        ))}
      </Button>
    </motion.div>
  )
}

export default AnimatedButton
