'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion, useAccessibility } from '@/hooks/useAccessibility'
import { useOptimizedAnimation } from '@/hooks/useAnimations'
import { AccessibilityUtils } from '@/lib/accessibility'

interface AccessibleAnimationProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  animation?: 'fade' | 'slide' | 'scale' | 'rotate' | 'parallax'
  direction?: 'up' | 'down' | 'left' | 'right' | 'center'
  duration?: number
  delay?: number
  threshold?: number
  triggerOnce?: boolean
  ariaLabel?: string
  ariaDescription?: string
  reducedMotionAlternative?: React.ReactNode
  className?: string
}

const AccessibleAnimation: React.FC<AccessibleAnimationProps> = ({
  children,
  animation = 'fade',
  direction = 'up',
  duration = 0.6,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  ariaLabel,
  ariaDescription,
  reducedMotionAlternative,
  className,
  ...rest
}) => {
  const { prefersReducedMotion, announceToScreenReader } = useAccessibility()
  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: `accessible-${animation}`,
      name: `Accessible ${animation}`,
      type: 'transition',
      duration: duration * 1000,
      easing: 'ease-out',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-fallback',
        staticFallback: true,
      },
      performance: {
        maxDuration: duration * 1000,
        targetFPS: 60,
        memoryLimit: 10,
        gpuAcceleration: true,
      },
    },
    'accessible-animation'
  )

  // Generate unique IDs for accessibility
  const descriptionId = React.useId()

  // Generate accessibility attributes
  const accessibilityProps = {
    'aria-label':
      ariaLabel || AccessibilityUtils.generateAriaLabel('content', animation),
    'aria-describedby': ariaDescription
      ? `animation-description-${descriptionId}`
      : undefined,
    role: 'img',
    'aria-live': 'polite',
  }

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={className} {...accessibilityProps} {...rest}>
        {reducedMotionAlternative || children}
      </div>
    )
  }

  // Animation variants based on type and direction
  const getAnimationVariants = () => {
    const baseVariants = {
      hidden: {},
      visible: {
        transition: {
          duration: optimizedConfig.duration / 1000,
          delay: delay / 1000,
          ease: optimizedConfig.easing,
        },
      },
    }

    switch (animation) {
      case 'fade':
        return {
          ...baseVariants,
          hidden: { opacity: 0 },
          visible: { ...baseVariants.visible, opacity: 1 },
        }

      case 'slide':
        const slideDistance = 50
        const slideProps = {
          up: { y: slideDistance, opacity: 0 },
          down: { y: -slideDistance, opacity: 0 },
          left: { x: slideDistance, opacity: 0 },
          right: { x: -slideDistance, opacity: 0 },
          center: { y: slideDistance, opacity: 0 },
        }
        return {
          ...baseVariants,
          hidden: slideProps[direction],
          visible: { ...baseVariants.visible, x: 0, y: 0, opacity: 1 },
        }

      case 'scale':
        return {
          ...baseVariants,
          hidden: { scale: 0.8, opacity: 0 },
          visible: { ...baseVariants.visible, scale: 1, opacity: 1 },
        }

      case 'rotate':
        return {
          ...baseVariants,
          hidden: { rotate: -180, opacity: 0 },
          visible: { ...baseVariants.visible, rotate: 0, opacity: 1 },
        }

      case 'parallax':
        return {
          ...baseVariants,
          hidden: { y: 100, opacity: 0 },
          visible: { ...baseVariants.visible, y: 0, opacity: 1 },
        }

      default:
        return baseVariants
    }
  }

  const variants = getAnimationVariants()

  // Handle animation events
  const handleAnimationStart = () => {
    announceToScreenReader(`${animation} animation started`)
  }

  const handleAnimationComplete = () => {
    announceToScreenReader(`${animation} animation completed`)
  }

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: triggerOnce, amount: threshold }}
      variants={variants}
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
      className={className}
      {...accessibilityProps}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

// Specialized accessible animation components
export const AccessibleFade: React.FC<
  Omit<AccessibleAnimationProps, 'animation'>
> = props => <AccessibleAnimation {...props} animation='fade' />

export const AccessibleSlide: React.FC<
  Omit<AccessibleAnimationProps, 'animation'>
> = props => <AccessibleAnimation {...props} animation='slide' />

export const AccessibleScale: React.FC<
  Omit<AccessibleAnimationProps, 'animation'>
> = props => <AccessibleAnimation {...props} animation='scale' />

export const AccessibleRotate: React.FC<
  Omit<AccessibleAnimationProps, 'animation'>
> = props => <AccessibleAnimation {...props} animation='rotate' />

export const AccessibleParallax: React.FC<
  Omit<AccessibleAnimationProps, 'animation'>
> = props => <AccessibleAnimation {...props} animation='parallax' />

// Accessible button with animations
interface AccessibleAnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  animation?: 'lift' | 'glow' | 'scale' | 'pulse'
  className?: string
}

export const AccessibleAnimatedButton: React.FC<
  AccessibleAnimatedButtonProps
> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  animation = 'lift',
  className,
}) => {
  const { prefersReducedMotion, announceToScreenReader } = useAccessibility()
  const [isPressed, setIsPressed] = React.useState(false)

  const handleClick = () => {
    if (disabled) return
    announceToScreenReader('Button clicked')
    onClick?.()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  const getButtonVariants = () => {
    if (prefersReducedMotion) {
      return {
        rest: {},
        hover: {},
        tap: {},
      }
    }

    switch (animation) {
      case 'lift':
        return {
          rest: { y: 0 },
          hover: { y: -2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' },
          tap: { y: 0, scale: 0.98 },
        }
      case 'glow':
        return {
          rest: { boxShadow: '0 0 0 rgba(59, 130, 246, 0)' },
          hover: { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' },
          tap: { scale: 0.98 },
        }
      case 'scale':
        return {
          rest: { scale: 1 },
          hover: { scale: 1.05 },
          tap: { scale: 0.95 },
        }
      case 'pulse':
        return {
          rest: { scale: 1 },
          hover: { scale: 1.02 },
          tap: { scale: 0.98 },
        }
      default:
        return {
          rest: {},
          hover: {},
          tap: {},
        }
    }
  }

  const variants = getButtonVariants()

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
  }

  return (
    <motion.button
      variants={variants}
      initial='rest'
      whileHover='hover'
      whileTap='tap'
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        rounded-lg font-medium transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
      aria-label={`Button: ${typeof children === 'string' ? children : 'Interactive element'}`}
      aria-disabled={disabled}
    >
      {children}
    </motion.button>
  )
}

// Accessible card with animations
interface AccessibleAnimatedCardProps {
  children: React.ReactNode
  title?: string
  description?: string
  href?: string
  onClick?: () => void
  className?: string
}

export const AccessibleAnimatedCard: React.FC<AccessibleAnimatedCardProps> = ({
  children,
  title,
  description,
  href,
  onClick,
  className,
}) => {
  const { prefersReducedMotion, announceToScreenReader } = useAccessibility()
  const [isFocused, setIsFocused] = React.useState(false)

  // Generate unique IDs for accessibility
  const cardDescriptionId = React.useId()

  const handleClick = () => {
    announceToScreenReader(`Card ${title || 'interactive element'} clicked`)
    onClick?.()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  const cardVariants = prefersReducedMotion
    ? {
        rest: {},
        hover: {},
        focus: {},
      }
    : {
        rest: { y: 0, scale: 1 },
        hover: {
          y: -4,
          scale: 1.02,
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
        },
        focus: {
          y: -2,
          scale: 1.01,
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
        },
      }

  const content = (
    <motion.div
      variants={cardVariants}
      initial='rest'
      whileHover='hover'
      whileFocus='focus'
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`
        group relative overflow-hidden rounded-xl border border-border/40 bg-card p-6
        transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${isFocused ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${className}
      `}
      tabIndex={0}
      role={href ? 'link' : 'button'}
      aria-label={title}
      aria-describedby={
        description ? `card-description-${cardDescriptionId}` : undefined
      }
    >
      {title && (
        <h3 className='text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors'>
          {title}
        </h3>
      )}
      {description && (
        <p
          id={`card-description-${cardDescriptionId}`}
          className='text-muted-foreground group-hover:text-foreground/80 transition-colors'
        >
          {description}
        </p>
      )}
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} className='block'>
        {content}
      </a>
    )
  }

  return content
}

export default AccessibleAnimation
