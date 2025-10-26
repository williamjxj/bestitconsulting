/**
 * Interactive particle system with mouse interaction
 * Creates particles that respond to user interaction
 */

'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/hooks/useAccessibility'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  direction: number
  opacity: number
  targetX: number
  targetY: number
  originalX: number
  originalY: number
}

interface InteractiveParticlesProps {
  particleCount?: number
  particleSize?: number
  particleColor?: string
  interactionRadius?: number
  interactionStrength?: number
  className?: string
  children?: React.ReactNode
  respectReducedMotion?: boolean
}

export const InteractiveParticles: React.FC<InteractiveParticlesProps> = ({
  particleCount = 50,
  particleSize = 3,
  particleColor = '#3B82F6',
  interactionRadius = 100,
  interactionStrength = 0.5,
  className = '',
  children,
  respectReducedMotion = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const { prefersReducedMotion } = useAccessibility()

  // Initialize particles
  const initializeParticles = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * container.clientWidth,
        y: Math.random() * container.clientHeight,
        size: particleSize + Math.random() * 2,
        speed: 0.5 + Math.random() * 1,
        direction: Math.random() * Math.PI * 2,
        opacity: 0.3 + Math.random() * 0.4,
        targetX: 0,
        targetY: 0,
        originalX: 0,
        originalY: 0,
      })
    }

    particlesRef.current = particles
  }, [particleCount, particleSize])

  // Update particles
  const updateParticles = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particles = particlesRef.current
    const mouseX = mousePosition.x
    const mouseY = mousePosition.y

    particles.forEach(particle => {
      // Calculate distance to mouse
      const dx = mouseX - particle.x
      const dy = mouseY - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Apply interaction force
      if (distance < interactionRadius && isHovering) {
        const force = (interactionRadius - distance) / interactionRadius
        const angle = Math.atan2(dy, dx)

        particle.targetX =
          particle.x + Math.cos(angle) * force * interactionStrength * 50
        particle.targetY =
          particle.y + Math.sin(angle) * force * interactionStrength * 50
      } else {
        // Return to original position
        particle.targetX = particle.originalX
        particle.targetY = particle.originalY
      }

      // Update position with easing
      particle.x += (particle.targetX - particle.x) * 0.1
      particle.y += (particle.targetY - particle.y) * 0.1

      // Keep particles in bounds
      if (particle.x < 0) particle.x = container.clientWidth
      if (particle.x > container.clientWidth) particle.x = 0
      if (particle.y < 0) particle.y = container.clientHeight
      if (particle.y > container.clientHeight) particle.y = 0
    })
  }, [mousePosition, isHovering, interactionRadius, interactionStrength])

  // Animation loop
  const animate = useCallback(() => {
    if (respectReducedMotion && prefersReducedMotion) return

    updateParticles()
    animationRef.current = requestAnimationFrame(animate)
  }, [updateParticles, respectReducedMotion, prefersReducedMotion])

  // Mouse event handlers
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  // Initialize and start animation
  useEffect(() => {
    initializeParticles()
    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initializeParticles, animate])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      initializeParticles()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [initializeParticles])

  // Render particles
  const renderParticles = () => {
    if (respectReducedMotion && prefersReducedMotion) {
      return null
    }

    return particlesRef.current.map(particle => (
      <motion.div
        key={particle.id}
        className='absolute rounded-full'
        style={{
          left: particle.x,
          top: particle.y,
          width: particle.size,
          height: particle.size,
          backgroundColor: particleColor,
          opacity: particle.opacity,
        }}
        animate={{
          scale: isHovering ? [1, 1.2, 1] : 1,
          opacity: isHovering ? particle.opacity * 1.5 : particle.opacity,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      />
    ))
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderParticles()}

      {/* Connection lines between nearby particles */}
      {!respectReducedMotion && !prefersReducedMotion && (
        <svg className='absolute inset-0 w-full h-full pointer-events-none'>
          {particlesRef.current.map(particle => {
            const nearbyParticles = particlesRef.current.filter(other => {
              if (other.id === particle.id) return false
              const dx = other.x - particle.x
              const dy = other.y - particle.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              return distance < 100
            })

            return nearbyParticles.map(nearby => (
              <line
                key={`${particle.id}-${nearby.id}`}
                x1={particle.x}
                y1={particle.y}
                x2={nearby.x}
                y2={nearby.y}
                stroke={particleColor}
                strokeWidth='1'
                opacity={isHovering ? 0.3 : 0.1}
                className='transition-opacity duration-300'
              />
            ))
          })}
        </svg>
      )}

      <div className='absolute inset-0 z-10'>{children}</div>
    </div>
  )
}

export default InteractiveParticles
