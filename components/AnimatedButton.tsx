'use client'

import { motion } from 'framer-motion'
import { ReactNode, forwardRef } from 'react'
import { Button } from '@/components/ui/button'
import { shouldReduceMotion } from '@/lib/accessibility'

interface AnimatedButtonProps {
  children: ReactNode
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  asChild?: boolean
  hover?: {
    scale?: number
    rotate?: number
    color?: string
  }
  click?: {
    scale?: number
    duration?: number
  }
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      children,
      variant = 'default',
      size = 'default',
      disabled = false,
      loading = false,
      onClick,
      className,
      type = 'button',
      asChild = false,
      hover = { scale: 1.05 },
      click = { scale: 0.95, duration: 0.1 },
    },
    ref
  ) => {
    // Get animation variants based on motion preference
    const getAnimationVariants = () => {
      if (shouldReduceMotion() || disabled || loading) {
        return {
          whileHover: undefined,
          whileTap: undefined,
          transition: undefined,
        }
      }

      return {
        whileHover: hover.scale ? { scale: hover.scale } : undefined,
        whileTap: click.scale ? { scale: click.scale } : undefined,
        transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
      }
    }

    const animationProps = getAnimationVariants()

    return (
      <motion.div {...animationProps} className={className}>
        <Button
          ref={ref}
          variant={variant}
          size={size}
          disabled={disabled || loading}
          onClick={onClick}
          type={type}
          className='w-full'
          asChild={asChild}
        >
          {loading ? 'Loading...' : children}
        </Button>
      </motion.div>
    )
  }
)

AnimatedButton.displayName = 'AnimatedButton'

export default AnimatedButton
export { AnimatedButton }
