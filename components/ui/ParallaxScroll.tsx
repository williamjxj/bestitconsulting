'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, HTMLMotionProps, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'

interface ParallaxScrollProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  offset?: number
  className?: string
  disabled?: boolean
}

const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  offset = 0,
  className,
  disabled = false,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'parallax-scroll',
      name: 'Parallax Scroll',
      type: 'scroll',
      duration: 0,
      easing: 'linear',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-parallax',
        staticFallback: true,
      },
      performance: {
        maxDuration: 0,
        targetFPS: 60,
        memoryLimit: 20,
        gpuAcceleration: true,
      },
    },
    'parallax-scroll'
  )

  // Calculate transform based on direction and speed
  const getTransform = () => {
    if (disabled || prefersReducedMotion) return 'translateY(0px)'

    const progress = scrollYProgress.get()
    const distance = (progress - 0.5) * 200 * speed

    switch (direction) {
      case 'up':
        return `translateY(${distance + offset}px)`
      case 'down':
        return `translateY(${-distance + offset}px)`
      case 'left':
        return `translateX(${distance + offset}px)`
      case 'right':
        return `translateX(${-distance + offset}px)`
      default:
        return `translateY(${distance + offset}px)`
    }
  }

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [offset, offset - 200 * speed]
  )
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [offset, offset - 200 * speed]
  )

  // Reduced motion fallback
  if (prefersReducedMotion || disabled) {
    return (
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: direction === 'up' || direction === 'down' ? y : 0,
        x: direction === 'left' || direction === 'right' ? x : 0,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

// Parallax container for multiple elements
interface ParallaxContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  className,
  disabled = false,
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion || disabled) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'ease-out' }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

// Parallax background image
interface ParallaxBackgroundProps extends HTMLMotionProps<'div'> {
  image: string
  alt: string
  speed?: number
  height?: string
  className?: string
  disabled?: boolean
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  image,
  alt,
  speed = 0.5,
  height = '50vh',
  className,
  disabled = false,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  if (prefersReducedMotion || disabled) {
    return (
      <div
        ref={ref}
        className={`relative overflow-hidden ${className}`}
        style={{ height }}
        {...rest}
      >
        <img src={image} alt={alt} className='w-full h-full object-cover' />
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
      {...rest}
    >
      <motion.img
        src={image}
        alt={alt}
        className='w-full h-full object-cover'
        style={{
          y: y,
          scale: 1.1, // Slight scale to prevent edge showing
        }}
      />
      <div className='absolute inset-0 bg-black/20' />
    </motion.div>
  )
}

// Parallax text with different speeds
interface ParallaxTextProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  speed?: number
  direction?: 'up' | 'down'
  className?: string
  disabled?: boolean
}

export const ParallaxText: React.FC<ParallaxTextProps> = ({
  children,
  speed = 0.3,
  direction = 'up',
  className,
  disabled = false,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? ['0%', '-50%'] : ['0%', '50%']
  )

  if (prefersReducedMotion || disabled) {
    return (
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }} {...rest}>
      {children}
    </motion.div>
  )
}

// Parallax reveal animation
interface ParallaxRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number
  delay?: number
  className?: string
  disabled?: boolean
}

export const ParallaxReveal: React.FC<ParallaxRevealProps> = ({
  children,
  direction = 'up',
  distance = 50,
  delay = 0,
  className,
  disabled = false,
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion || disabled) {
    return (
      <div className={className} {...rest}>
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
      case 'fade':
        return { opacity: 0 }
      default:
        return { y: distance, opacity: 0 }
    }
  }

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 }
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 }
      case 'fade':
        return { opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'ease-out',
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

// Parallax section with multiple layers
interface ParallaxSectionProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  backgroundImage?: string
  backgroundSpeed?: number
  foregroundSpeed?: number
  className?: string
  disabled?: boolean
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  backgroundImage,
  backgroundSpeed = 0.5,
  foregroundSpeed = 0.2,
  className,
  disabled = false,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  if (prefersReducedMotion || disabled) {
    return (
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      {...rest}
    >
      {/* Background layer */}
      {backgroundImage && (
        <motion.div className='absolute inset-0' style={{ y: backgroundY }}>
          <img
            src={backgroundImage}
            alt=''
            className='w-full h-full object-cover'
            style={{ transform: 'scale(1.1)' }}
          />
        </motion.div>
      )}

      {/* Foreground content */}
      <motion.div className='relative z-10' style={{ y: foregroundY }}>
        {children}
      </motion.div>
    </motion.div>
  )
}

export default ParallaxScroll
