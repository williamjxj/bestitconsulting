'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AnimationProps } from '@/lib/types'
import { useReducedMotion } from '@/hooks/useAccessibility'
import { useOptimizedAnimation } from '@/hooks/useAnimations'

interface ScaleInProps extends AnimationProps {
  scale?: number
  direction?: 'center' | 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  duration?: number
  stagger?: number
  className?: string
}

export function ScaleIn({
  children,
  scale = 0.8,
  direction = 'center',
  delay = 0,
  duration = 400,
  stagger = 0,
  className,
  onComplete,
  onStart,
  ...props
}: ScaleInProps) {
  const prefersReducedMotion = useReducedMotion()
  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'scale-in',
      name: 'Scale In',
      type: 'interaction',
      duration,
      easing: 'easeOut',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'scale-in-static',
        staticFallback: true,
      },
      performance: {
        maxDuration: duration,
        targetFPS: 60,
        memoryLimit: 12,
        gpuAcceleration: true,
      },
    },
    'scale-in'
  )

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  // Calculate initial position based on direction
  const getInitialPosition = () => {
    const basePosition = { scale, opacity: 0 }

    switch (direction) {
      case 'top':
        return { ...basePosition, y: -20 }
      case 'bottom':
        return { ...basePosition, y: 20 }
      case 'left':
        return { ...basePosition, x: -20 }
      case 'right':
        return { ...basePosition, x: 20 }
      case 'center':
      default:
        return basePosition
    }
  }

  const getFinalPosition = () => {
    return { scale: 1, x: 0, y: 0, opacity: 1 }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={getFinalPosition()}
      transition={{
        duration: optimizedConfig.duration / 1000,
        delay: (delay + stagger) / 1000,
        ease: optimizedConfig.easing,
        onComplete: onComplete,
      }}
      onAnimationStart={onStart}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Staggered ScaleIn for multiple elements
export function StaggeredScaleIn({
  children,
  stagger = 100,
  scale = 0.8,
  direction = 'center',
  className,
  ...props
}: Omit<ScaleInProps, 'stagger'> & { stagger?: number }) {
  const childrenArray = React.Children.toArray(children)

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <ScaleIn
          key={index}
          scale={scale}
          direction={direction}
          stagger={index * stagger}
          {...props}
        >
          {child}
        </ScaleIn>
      ))}
    </div>
  )
}

// ScaleIn with scroll trigger
export function ScrollScaleIn({
  children,
  threshold = 0.1,
  triggerOnce = true,
  scale = 0.8,
  direction = 'center',
  className,
  ...props
}: ScaleInProps & {
  threshold?: number
  triggerOnce?: boolean
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  const getInitialPosition = () => {
    const basePosition = { scale, opacity: 0 }

    switch (direction) {
      case 'top':
        return { ...basePosition, y: -20 }
      case 'bottom':
        return { ...basePosition, y: 20 }
      case 'left':
        return { ...basePosition, x: -20 }
      case 'right':
        return { ...basePosition, x: 20 }
      case 'center':
      default:
        return basePosition
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ scale: 1, x: 0, y: 0, opacity: 1 }}
      viewport={{ once: triggerOnce, amount: threshold }}
      transition={{
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// ScaleIn with spring animation
export function SpringScaleIn({
  children,
  scale = 0.8,
  direction = 'center',
  delay = 0,
  className,
  ...props
}: ScaleInProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  const getInitialPosition = () => {
    const basePosition = { scale, opacity: 0 }

    switch (direction) {
      case 'top':
        return { ...basePosition, y: -20 }
      case 'bottom':
        return { ...basePosition, y: 20 }
      case 'left':
        return { ...basePosition, x: -20 }
      case 'right':
        return { ...basePosition, x: 20 }
      case 'center':
      default:
        return basePosition
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: delay / 1000,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// ScaleIn with hover effect
export function HoverScaleIn({
  children,
  scale = 0.95,
  hoverScale = 1.05,
  direction = 'center',
  className,
  ...props
}: ScaleInProps & {
  hoverScale?: number
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

  const getInitialPosition = () => {
    const basePosition = { scale, opacity: 0 }

    switch (direction) {
      case 'top':
        return { ...basePosition, y: -20 }
      case 'bottom':
        return { ...basePosition, y: 20 }
      case 'left':
        return { ...basePosition, x: -20 }
      case 'right':
        return { ...basePosition, x: 20 }
      case 'center':
      default:
        return basePosition
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
      whileHover={{ scale: hoverScale }}
      transition={{
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
