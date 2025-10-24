/**
 * ParticleBackground component
 * Creates animated particle system background for hero sections
 */

'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  direction: number
  opacity: number
}

interface ParticleBackgroundProps {
  particleCount?: number
  particleSize?: number
  particleSpeed?: number
  particleColor?: string
  backgroundColor?: string
  className?: string
  children?: React.ReactNode
  fallback?: React.ReactNode
}

export const ParticleBackground = ({
  particleCount = 50,
  particleSize = 2,
  particleSpeed = 1,
  particleColor = '#3B82F6',
  backgroundColor = 'transparent',
  className = '',
  children,
  fallback,
}: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const controls = useAnimation()
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()

  // Adjust particle count for mobile and reduced motion
  const adjustedParticleCount = reducedMotion
    ? 0
    : deviceType === 'mobile'
      ? Math.floor(particleCount / 2)
      : particleCount

  // Initialize particles
  const initializeParticles = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    particlesRef.current = []

    for (let i = 0; i < adjustedParticleCount; i++) {
      particlesRef.current.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * particleSize + 1,
        speed: Math.random() * particleSpeed + 0.5,
        direction: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }
  }

  // Update particles
  const updateParticles = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particlesRef.current.forEach(particle => {
      // Update position
      particle.x += Math.cos(particle.direction) * particle.speed
      particle.y += Math.sin(particle.direction) * particle.speed

      // Wrap around screen
      if (particle.x < 0) particle.x = canvas.width
      if (particle.x > canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = canvas.height
      if (particle.y > canvas.height) particle.y = 0

      // Draw particle
      ctx.save()
      ctx.globalAlpha = particle.opacity
      ctx.fillStyle = particleColor
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })

    if (!reducedMotion) {
      animationRef.current = requestAnimationFrame(updateParticles)
    }
  }

  // Handle resize
  const handleResize = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
    initializeParticles()
  }

  // Start animation
  useEffect(() => {
    if (reducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    initializeParticles()
    updateParticles()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [reducedMotion, adjustedParticleCount])

  // If reduced motion and fallback is provided, show fallback
  if (reducedMotion && fallback) {
    return <>{fallback}</>
  }

  // If reduced motion, show static background
  if (reducedMotion) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        style={{ backgroundColor }}
        aria-hidden='true'
      >
        {children}
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className='absolute inset-0 w-full h-full'
        style={{ backgroundColor }}
        aria-hidden='true'
      />
      {children}
    </div>
  )
}
