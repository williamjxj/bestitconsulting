'use client'

import { motion } from 'framer-motion'
import {
  scaleIn,
  hoverScale,
  getAnimationVariants,
} from '@/lib/framer-animations'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  hover?: {
    scale?: number
    rotate?: number
    translateY?: number
    opacity?: number
  }
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

/**
 * AnimatedButton Component
 *
 * A button component with smooth animations and hover effects
 * Implements accessibility-aware animations with reduced motion support
 */
export function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  hover = { scale: 1.05 },
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: AnimatedButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = {
    primary:
      'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
    secondary:
      'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-500',
    outline:
      'border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg',
  }

  const hoverVariants = {
    rest: {
      scale: 1,
      rotate: 0,
      y: 0,
      opacity: 1,
    },
    hover: {
      scale: hover.scale || 1.05,
      rotate: hover.rotate || 0,
      y: hover.translateY || 0,
      opacity: hover.opacity || 1,
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      variants={getAnimationVariants(hoverVariants)}
      initial='rest'
      whileHover='hover'
      whileTap='tap'
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      aria-disabled={disabled}
    >
      {children}
    </motion.button>
  )
}
