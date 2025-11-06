'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { shouldReduceMotion } from '@/lib/accessibility'

interface AnimatedCardProps {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'outlined' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  hover?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  hoverConfig?: {
    scale?: number
    y?: number
    shadow?: string
  }
}

function AnimatedCard({
  children,
  variant = 'default',
  size = 'md',
  hover = true,
  disabled = false,
  onClick,
  className,
  hoverConfig = { scale: 1.02, y: -5 },
}: AnimatedCardProps) {
  // Get animation variants based on motion preference
  const getAnimationVariants = () => {
    if (shouldReduceMotion() || !hover || disabled) {
      return {
        whileHover: undefined,
        whileTap: undefined,
        transition: undefined,
      }
    }

    return {
      whileHover: {
        scale: hoverConfig.scale || 1.02,
        y: hoverConfig.y || -5,
        boxShadow:
          hoverConfig.shadow ||
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      whileTap: { scale: 0.98 },
      transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
    }
  }

  const animationProps = getAnimationVariants()

  const cardClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const variantClasses = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg border-0',
    outlined: 'bg-transparent border-2 border-gray-300',
    glass: 'bg-white/10 backdrop-blur-sm border border-white/20',
  }

  return (
    <motion.div {...animationProps} className={className}>
      <Card
        className={`
          ${cardClasses[size]}
          ${variantClasses[variant]}
          ${onClick ? 'cursor-pointer' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          transition-all duration-300
        `}
        onClick={disabled ? undefined : onClick}
      >
        {children}
      </Card>
    </motion.div>
  )
}

export default AnimatedCard
export { AnimatedCard }
