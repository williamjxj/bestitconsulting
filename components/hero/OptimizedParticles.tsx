/**
 * Performance-optimized particle system
 * Uses efficient rendering and memory management for smooth animations
 */

'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'
import { getDeviceCapabilities } from '@/lib/animations/utils'

interface OptimizedParticle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
}

interface OptimizedParticlesProps {
  particleCount?: number
  particleSize?: number
  particleColor?: string
  emissionRate?: number
  maxParticles?: number
  className?: string
  children?: React.ReactNode
  respectReducedMotion?: boolean
  performanceMode?: 'high' | 'medium' | 'low'
}

export const OptimizedParticles: React.FC<OptimizedParticlesProps> = ({
  particleCount = 100,
  particleSize = 2,
  particleColor = '#3B82F6',
  emissionRate = 10,
  maxParticles = 200,
  className = '',
  children,
  respectReducedMotion = true,
  performanceMode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const particlesRef = useRef<OptimizedParticle[]>([])
  const lastEmissionRef = useRef<number>(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const { preferences } = useAccessibility()

  // Get device capabilities for performance optimization
  const deviceCapabilities = getDeviceCapabilities()
  const actualPerformanceMode = performanceMode || deviceCapabilities.tier

  // Adjust settings based on performance mode
  const optimizedSettings = {
    high: {
      particleCount: particleCount,
      emissionRate: emissionRate,
      maxParticles: maxParticles,
      updateRate: 60,
    },
    medium: {
      particleCount: Math.floor(particleCount * 0.7),
      emissionRate: Math.floor(emissionRate * 0.7),
      maxParticles: Math.floor(maxParticles * 0.7),
      updateRate: 45,
    },
    low: {
      particleCount: Math.floor(particleCount * 0.4),
      emissionRate: Math.floor(emissionRate * 0.4),
      maxParticles: Math.floor(maxParticles * 0.4),
      updateRate: 30,
    },
  }[actualPerformanceMode]

  // Create particle
  const createParticle = useCallback(
    (x: number, y: number): OptimizedParticle => {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.5 + Math.random() * 1.5
      const life = 2000 + Math.random() * 3000

      return {
        id: Math.random(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: particleSize + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.4,
        life,
        maxLife: life,
      }
    },
    [particleSize]
  )

  // Update particles
  const updateParticles = useCallback(
    (deltaTime: number) => {
      if (!containerRef.current) return

      const container = containerRef.current
      const particles = particlesRef.current

      // Emit new particles
      const now = Date.now()
      if (
        now - lastEmissionRef.current >
        1000 / optimizedSettings.emissionRate
      ) {
        if (particles.length < optimizedSettings.maxParticles) {
          const x = Math.random() * container.clientWidth
          const y = Math.random() * container.clientHeight
          particles.push(createParticle(x, y))
        }
        lastEmissionRef.current = now
      }

      // Update existing particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Update life
        particle.life -= deltaTime

        // Update opacity based on life
        particle.opacity = (particle.life / particle.maxLife) * 0.7

        // Remove dead particles
        if (particle.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        // Keep particles in bounds with wrapping
        if (particle.x < 0) particle.x = container.clientWidth
        if (particle.x > container.clientWidth) particle.x = 0
        if (particle.y < 0) particle.y = container.clientHeight
        if (particle.y > container.clientHeight) particle.y = 0
      }
    },
    [createParticle, optimizedSettings]
  )

  // Render particles to canvas
  const renderParticles = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const container = containerRef.current
    const particles = particlesRef.current

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set canvas size
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    // Render particles
    particles.forEach(particle => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      ctx.fillStyle = particleColor
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })
  }, [particleColor])

  // Animation loop
  const animate = useCallback(
    (currentTime: number) => {
      if (respectReducedMotion && preferences.reducedMotion) return

      const deltaTime = currentTime - (animationRef.current || currentTime)
      updateParticles(deltaTime)
      renderParticles()

      animationRef.current = requestAnimationFrame(animate)
    },
    [
      updateParticles,
      renderParticles,
      respectReducedMotion,
      preferences.reducedMotion,
    ]
  )

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particles: OptimizedParticle[] = []

    // Create initial particles
    for (let i = 0; i < optimizedSettings.particleCount; i++) {
      const x = Math.random() * container.clientWidth
      const y = Math.random() * container.clientHeight
      particles.push(createParticle(x, y))
    }

    particlesRef.current = particles
    setIsLoaded(true)
  }, [createParticle, optimizedSettings.particleCount])

  // Start animation
  useEffect(() => {
    if (!isLoaded) return

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isLoaded, animate])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return

      const container = containerRef.current
      const canvas = canvasRef.current

      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fallback for reduced motion
  if (respectReducedMotion && preferences.reducedMotion) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-900/20 to-indigo-900/20' />
        <div className='absolute inset-0 z-10'>{children}</div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className='absolute inset-0 w-full h-full'
        style={{ zIndex: 1 }}
      />
      <div className='absolute inset-0 z-10'>{children}</div>
    </div>
  )
}

export default OptimizedParticles
