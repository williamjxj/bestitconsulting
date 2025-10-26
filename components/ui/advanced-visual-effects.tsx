'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import { cn } from '@/lib/utils'

interface ParticleSystemProps {
  particleCount?: number
  className?: string
}

export function ParticleSystem({
  particleCount = 50,
  className,
}: ParticleSystemProps) {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }>
  >([])

  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  useEffect(() => {
    if (!shouldAnimate) return

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }))

    setParticles(newParticles)

    const animate = () => {
      setParticles(prev =>
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
        }))
      )
    }

    const interval = setInterval(animate, 50)
    return () => clearInterval(interval)
  }, [particleCount, shouldAnimate])

  if (!shouldAnimate) {
    return <div className={cn('w-full h-full', className)} />
  }

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className='absolute bg-blue-400 rounded-full'
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [
              particle.opacity,
              particle.opacity * 0.3,
              particle.opacity,
            ],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
      ))}
    </div>
  )
}

interface GradientMeshProps {
  className?: string
  variant?: 'default' | 'tech' | 'creative'
}

export function GradientMesh({
  className,
  variant = 'default',
}: GradientMeshProps) {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  const gradients = {
    default: 'from-blue-500 via-purple-500 to-pink-500',
    tech: 'from-cyan-500 via-blue-500 to-indigo-500',
    creative: 'from-pink-500 via-purple-500 to-cyan-500',
  }

  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      <motion.div
        className={cn(
          'absolute inset-0 bg-gradient-to-br',
          gradients[variant],
          'opacity-20'
        )}
        animate={
          shouldAnimate
            ? {
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }
            : {}
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className={cn(
          'absolute inset-0 bg-gradient-to-tl',
          gradients[variant],
          'opacity-10'
        )}
        animate={
          shouldAnimate
            ? {
                scale: [1.1, 1, 1.1],
                rotate: [360, 180, 0],
              }
            : {}
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

interface FloatingElementsProps {
  className?: string
  elementCount?: number
}

export function FloatingElements({
  className,
  elementCount = 8,
}: FloatingElementsProps) {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  const elements = Array.from({ length: elementCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 10,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }))

  if (!shouldAnimate) {
    return <div className={cn('w-full h-full', className)} />
  }

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {elements.map(element => (
        <motion.div
          key={element.id}
          className='absolute bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-30'
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
        />
      ))}
    </div>
  )
}

interface MorphingShapeProps {
  className?: string
  variant?: 'circle' | 'square' | 'triangle' | 'hexagon'
}

export function MorphingShape({
  className,
  variant = 'circle',
}: MorphingShapeProps) {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    triangle: 'transform rotate-45',
    hexagon: 'transform rotate-12',
  }

  return (
    <motion.div
      className={cn(
        'w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500',
        shapes[variant],
        className
      )}
      animate={
        shouldAnimate
          ? {
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              borderRadius: ['50%', '20%', '50%'],
            }
          : {}
      }
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      }}
    />
  )
}

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  duration?: number
  delay?: number
  className?: string
}

export function ScrollReveal({
  children,
  direction = 'up',
  distance = 50,
  duration = 0.6,
  delay = 0,
  className,
}: ScrollRevealProps) {
  const { scrollYProgress } = useScroll()
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance },
  }

  const initial = directionMap[direction]
  const final = { y: 0, x: 0 }

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...initial }}
      whileInView={{ opacity: 1, ...final }}
      transition={{ duration, delay }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  )
}

interface GlowEffectProps {
  children: React.ReactNode
  color?: string
  intensity?: number
  className?: string
}

export function GlowEffect({
  children,
  color = 'blue',
  intensity = 1,
  className,
}: GlowEffectProps) {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  const colorMap = {
    blue: 'shadow-blue-500/50',
    purple: 'shadow-purple-500/50',
    pink: 'shadow-pink-500/50',
    green: 'shadow-green-500/50',
    orange: 'shadow-orange-500/50',
  }

  return (
    <motion.div
      className={cn(
        'relative',
        shouldAnimate &&
          `shadow-2xl ${colorMap[color as keyof typeof colorMap]}`,
        className
      )}
      animate={
        shouldAnimate
          ? {
              boxShadow: [
                `0 0 ${20 * intensity}px ${color}50`,
                `0 0 ${40 * intensity}px ${color}80`,
                `0 0 ${20 * intensity}px ${color}50`,
              ],
            }
          : {}
      }
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      }}
    >
      {children}
    </motion.div>
  )
}
