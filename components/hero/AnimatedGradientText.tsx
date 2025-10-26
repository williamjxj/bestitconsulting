/**
 * Animated gradient text component
 * Creates text with animated gradient effects
 */

'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface AnimatedGradientTextProps {
  children: React.ReactNode
  colors?: string[]
  speed?: number
  direction?: 'horizontal' | 'vertical' | 'diagonal'
  className?: string
  respectReducedMotion?: boolean
  animated?: boolean
}

export const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  children,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'],
  speed = 1,
  direction = 'horizontal',
  className = '',
  respectReducedMotion = true,
  animated = true,
}) => {
  const [gradientStyle, setGradientStyle] = useState<string>('')
  const [animationKey, setAnimationKey] = useState(0)

  const { prefersReducedMotion } = useAccessibility()

  // Create gradient string
  const createGradient = (colorStops: string[]) => {
    const gradientDirection = {
      horizontal: 'to right',
      vertical: 'to bottom',
      diagonal: 'to bottom right',
    }[direction]

    return `linear-gradient(${gradientDirection}, ${colorStops.join(', ')})`
  }

  // Animate gradient
  useEffect(() => {
    if (respectReducedMotion && prefersReducedMotion) {
      setGradientStyle(createGradient(colors))
      return
    }

    const animateGradient = () => {
      const time = Date.now() * 0.001 * speed
      const animatedColors = colors.map((color, index) => {
        // Create subtle color variations
        const hue = (index * 120 + time * 20) % 360
        const saturation = 70 + Math.sin(time + index) * 15
        const lightness = 50 + Math.cos(time + index) * 10

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`
      })

      setGradientStyle(createGradient(animatedColors))
      setAnimationKey(prev => prev + 1)
    }

    const interval = setInterval(animateGradient, 50) // 20fps for smooth animation
    return () => clearInterval(interval)
  }, [colors, direction, speed, respectReducedMotion, prefersReducedMotion])

  const gradientVariants = {
    initial: {
      background: createGradient(colors),
    },
    animate: {
      background: gradientStyle,
    },
  }

  return (
    <motion.span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        background: gradientStyle || createGradient(colors),
        backgroundSize: '200% 200%',
      }}
      variants={
        animated && !(respectReducedMotion && prefersReducedMotion)
          ? gradientVariants
          : undefined
      }
      initial='initial'
      animate='animate'
      transition={{ duration: 0.1, ease: 'linear' }}
      key={animationKey}
    >
      {children}
    </motion.span>
  )
}

export default AnimatedGradientText
