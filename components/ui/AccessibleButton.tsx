/**
 * Accessible button component
 * Enhanced button with comprehensive accessibility features
 */

'use client'

import React, { useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from './button'
import { useAccessibility } from '@/hooks/useAccessibility'

interface AccessibleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  children: React.ReactNode
  className?: string
  ariaLabel?: string
  ariaDescription?: string
  focusVisible?: boolean
  keyboardAccessible?: boolean
  screenReaderText?: string
  onFocus?: () => void
  onBlur?: () => void
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  variant = 'default',
  size = 'default',
  children,
  className = '',
  ariaLabel,
  ariaDescription,
  focusVisible = true,
  keyboardAccessible = true,
  screenReaderText,
  onFocus,
  onBlur,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const { announceToScreenReader } = useAccessibility()

  // Handle focus events
  const handleFocus = useCallback(() => {
    setIsFocused(true)
    onFocus?.()

    if (screenReaderText) {
      announceToScreenReader(screenReaderText)
    }
  }, [onFocus, screenReaderText, announceToScreenReader])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
    onBlur?.()
  }, [onBlur])

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!keyboardAccessible) return

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault()
          setIsPressed(true)
          onClick?.(event as any)
          break
        case 'Escape':
          event.preventDefault()
          buttonRef.current?.blur()
          break
      }
    },
    [keyboardAccessible, onClick]
  )

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        setIsPressed(false)
      }
    },
    []
  )

  // Handle click events
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event)

      // Announce action to screen readers
      if (ariaLabel) {
        announceToScreenReader(`Button ${ariaLabel} activated`)
      }
    },
    [onClick, ariaLabel, announceToScreenReader]
  )

  // Focus management
  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    // Add focus indicator
    if (focusVisible && isFocused) {
      button.style.outline = '2px solid #3b82f6'
      button.style.outlineOffset = '2px'
    } else {
      button.style.outline = 'none'
    }
  }, [focusVisible, isFocused])

  // Button variants for accessibility
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1, ease: 'easeOut' },
    },
    focus: {
      scale: 1.02,
      boxShadow: '0 0 0 2px #3b82f6',
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      className='inline-block'
      variants={buttonVariants}
      initial='initial'
      whileHover='hover'
      whileTap='tap'
      animate={isFocused ? 'focus' : 'initial'}
    >
      <Button
        ref={buttonRef}
        variant={variant}
        size={size}
        className={`relative ${className}`}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        aria-label={ariaLabel}
        aria-describedby={
          ariaDescription ? `${props.id}-description` : undefined
        }
        tabIndex={keyboardAccessible ? 0 : -1}
        {...props}
      >
        {children}

        {/* Screen reader only text */}
        {screenReaderText && (
          <span className='sr-only'>{screenReaderText}</span>
        )}

        {/* Focus indicator */}
        {isFocused && focusVisible && (
          <motion.div
            className='absolute inset-0 rounded-md border-2 border-blue-500 pointer-events-none'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </Button>

      {/* Description for screen readers */}
      {ariaDescription && (
        <div id={`${props.id}-description`} className='sr-only'>
          {ariaDescription}
        </div>
      )}
    </motion.div>
  )
}

export default AccessibleButton
