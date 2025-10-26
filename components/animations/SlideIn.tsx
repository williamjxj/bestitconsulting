'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AnimationProps } from '../../lib/types'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'

interface SlideInProps extends AnimationProps {
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  delay?: number
  duration?: number
  stagger?: number
  className?: string
}

export function SlideIn({
  children,
  direction = 'up',
  distance = 50,
  delay = 0,
  duration = 600,
  stagger = 0,
  className,
  onComplete,
  onStart,
  ...props
}: SlideInProps) {
  const prefersReducedMotion = useReducedMotion()
  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'slide-in',
      name: 'Slide In',
      type: 'transition',
      duration,
      easing: [0.4, 0, 0.2, 1],
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'slide-in-static',
        staticFallback: true,
      },
      performance: {
        maxDuration: duration,
        targetFPS: 60,
        memoryLimit: 15,
        gpuAcceleration: true,
      },
    },
    'slide-in'
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
      default:
        return { y: distance, opacity: 0 }
    }
  }

  const getFinalPosition = () => {
    return { x: 0, y: 0, opacity: 1 }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={getFinalPosition()}
      transition={{
        duration: optimizedConfig.duration / 1000,
        delay: (delay + stagger) / 1000,
        ease: optimizedConfig.easing,
      }}
      onAnimationStart={onStart}
      onAnimationComplete={onComplete}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Staggered SlideIn for multiple elements
export function StaggeredSlideIn({
  children,
  stagger = 100,
  direction = 'up',
  distance = 50,
  className,
  ...props
}: Omit<SlideInProps, 'stagger'> & { stagger?: number }) {
  const childrenArray = React.Children.toArray(children)

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <SlideIn
          key={index}
          direction={direction}
          distance={distance}
          stagger={index * stagger}
          {...props}
        >
          {child}
        </SlideIn>
      ))}
    </div>
  )
}

// SlideIn with scroll trigger
export function ScrollSlideIn({
  children,
  threshold = 0.1,
  triggerOnce = true,
  direction = 'up',
  distance = 50,
  className,
  ...props
}: SlideInProps & {
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
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 }
      case 'down':
        return { y: -distance, opacity: 0 }
      case 'left':
        return { x: distance, opacity: 0 }
      case 'right':
        return { x: -distance, opacity: 0 }
      default:
        return { y: distance, opacity: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: triggerOnce, amount: threshold }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// SlideIn with spring animation
export function SpringSlideIn({
  children,
  direction = 'up',
  distance = 50,
  delay = 0,
  className,
  ...props
}: SlideInProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }

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
      default:
        return { y: distance, opacity: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: delay / 1000,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
