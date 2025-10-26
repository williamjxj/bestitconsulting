'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AnimationProps } from '../../lib/types'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'

interface FadeInProps extends AnimationProps {
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number
  delay?: number
  duration?: number
  stagger?: number
  className?: string
}

export function FadeIn({
  children,
  direction = 'fade',
  distance = 20,
  delay = 0,
  duration = 500,
  stagger = 0,
  className,
  onComplete,
  onStart,
  ...props
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion()
  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'fade-in',
      name: 'Fade In',
      type: 'transition',
      duration,
      easing: 'ease-out',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'fade-in-static',
        staticFallback: true,
      },
      performance: {
        maxDuration: duration,
        targetFPS: 60,
        memoryLimit: 10,
        gpuAcceleration: true,
      },
    },
    'fade-in'
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
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 }
      case 'down':
        return { y: -distance, opacity: 0 }
      case 'left':
        return { x: distance, opacity: 0 }
      case 'right':
        return { x: -distance, opacity: 0 }
      case 'fade':
      default:
        return { opacity: 0 }
    }
  }

  const getFinalPosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 }
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 }
      case 'fade':
      default:
        return { opacity: 1 }
    }
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
        onStart: onStart,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Staggered FadeIn for multiple elements
export function StaggeredFadeIn({
  children,
  stagger = 100,
  direction = 'up',
  distance = 20,
  className,
  ...props
}: Omit<FadeInProps, 'stagger'> & { stagger?: number }) {
  const childrenArray = React.Children.toArray(children)

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <FadeIn
          key={index}
          direction={direction}
          distance={distance}
          stagger={index * stagger}
          {...props}
        >
          {child}
        </FadeIn>
      ))}
    </div>
  )
}

// FadeIn with scroll trigger
export function ScrollFadeIn({
  children,
  threshold = 0.1,
  triggerOnce = true,
  direction = 'up',
  distance = 20,
  className,
  ...props
}: FadeInProps & {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: triggerOnce, amount: threshold }}
      transition={{
        duration: 0.6,
        ease: 'ease-out',
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
