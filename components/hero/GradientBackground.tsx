/**
 * Advanced gradient background with animated effects
 * Creates dynamic gradient animations for hero sections
 */

'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface GradientBackgroundProps {
  colors?: string[]
  direction?:
    | 'to-r'
    | 'to-l'
    | 'to-t'
    | 'to-b'
    | 'to-tr'
    | 'to-tl'
    | 'to-br'
    | 'to-bl'
  animated?: boolean
  speed?: number
  className?: string
  children?: React.ReactNode
  respectReducedMotion?: boolean
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  colors = ['#1e3a8a', '#3b82f6', '#8b5cf6'],
  direction = 'to-br',
  animated = true,
  speed = 1,
  className = '',
  children,
  respectReducedMotion = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [gradientStyle, setGradientStyle] = useState<string>('')
  const [animationKey, setAnimationKey] = useState(0)

  const { preferences } = useAccessibility()

  // Create gradient string
  const createGradient = (colorStops: string[]) => {
    return `linear-gradient(${direction}, ${colorStops.join(', ')})`
  }

  // Generate animated gradient
  useEffect(() => {
    if (!animated || (respectReducedMotion && preferences.reducedMotion)) {
      setGradientStyle(createGradient(colors))
      return
    }

    const animateGradient = () => {
      const time = Date.now() * 0.001 * speed
      const animatedColors = colors.map((color, index) => {
        // Create subtle color variations
        const hue = (index * 120 + time * 10) % 360
        const saturation = 70 + Math.sin(time + index) * 10
        const lightness = 50 + Math.cos(time + index) * 5

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`
      })

      setGradientStyle(createGradient(animatedColors))
      setAnimationKey(prev => prev + 1)
    }

    const interval = setInterval(animateGradient, 16) // ~60fps
    return () => clearInterval(interval)
  }, [
    colors,
    direction,
    animated,
    speed,
    respectReducedMotion,
    preferences.reducedMotion,
  ])

  const gradientVariants = {
    initial: {
      background: createGradient(colors),
    },
    animate: {
      background: gradientStyle,
      transition: {
        duration: 0.1,
        ease: 'linear',
      },
    },
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <motion.div
        className='absolute inset-0 w-full h-full'
        variants={
          animated && !(respectReducedMotion && preferences.reducedMotion)
            ? gradientVariants
            : undefined
        }
        initial='initial'
        animate='animate'
        style={{
          background: gradientStyle || createGradient(colors),
        }}
      />

      {/* Additional gradient layers for depth */}
      <div className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent' />
      <div className='absolute inset-0 bg-gradient-to-tl from-black/10 to-transparent' />

      {/* Animated gradient orbs */}
      {animated && !(respectReducedMotion && preferences.reducedMotion) && (
        <>
          <motion.div
            className='absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-20'
            style={{
              background: `radial-gradient(circle, ${colors[0]}40, transparent)`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className='absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full opacity-15'
            style={{
              background: `radial-gradient(circle, ${colors[1]}40, transparent)`,
            }}
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className='absolute top-1/4 right-1/3 w-96 h-96 rounded-full opacity-10'
            style={{
              background: `radial-gradient(circle, ${colors[2]}40, transparent)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}

      <div className='absolute inset-0 z-10'>{children}</div>
    </div>
  )
}

export default GradientBackground
