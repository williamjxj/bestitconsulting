/**
 * Enhanced particle background with WebGL effects
 * Advanced particle system with Three.js for better performance and visual quality
 */

'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  createWebGLScene,
  createParticleSystem,
  createGradientBackground,
  animateWebGLScene,
  cleanupWebGLScene,
  isWebGLAvailable,
} from '@/lib/animations/webgl'
import { useAccessibility } from '@/hooks/useAccessibility'
import { getDeviceCapabilities } from '@/lib/animations/utils'

interface EnhancedParticleBackgroundProps {
  particleCount?: number
  particleSize?: number
  particleColor?: string
  backgroundColor?: string
  className?: string
  children?: React.ReactNode
  respectReducedMotion?: boolean
  performanceMode?: 'high' | 'medium' | 'low'
}

export const EnhancedParticleBackground: React.FC<
  EnhancedParticleBackgroundProps
> = ({
  particleCount = 1000,
  particleSize = 2,
  particleColor = '#3B82F6',
  backgroundColor = 'transparent',
  className = '',
  children,
  respectReducedMotion = true,
  performanceMode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<any>(null)
  const animationIdRef = useRef<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { prefersReducedMotion } = useAccessibility()

  // Get device capabilities for performance optimization
  const deviceCapabilities = getDeviceCapabilities()
  const actualPerformanceMode = performanceMode || deviceCapabilities.tier

  // Adjust particle count based on performance mode
  const adjustedParticleCount = {
    high: particleCount,
    medium: Math.floor(particleCount * 0.6),
    low: Math.floor(particleCount * 0.3),
  }[actualPerformanceMode]

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    // Check if WebGL is available
    if (!isWebGLAvailable()) {
      console.warn('WebGL not available, falling back to CSS animations')
      setIsLoaded(true)
      return
    }

    // Check for reduced motion
    if (respectReducedMotion && prefersReducedMotion) {
      setIsLoaded(true)
      return
    }

    try {
      // Create WebGL scene
      const scene = createWebGLScene({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
        antialias: actualPerformanceMode === 'high',
        alpha: true,
        powerPreference: 'high-performance',
      })

      // Create gradient background
      const background = createGradientBackground(scene.scene)

      // Create particle system
      const particles = createParticleSystem(
        {
          count: adjustedParticleCount,
          size: particleSize,
          color: particleColor,
          speed: 1,
          opacity: 0.6,
        },
        scene.scene
      )

      // Store scene reference
      sceneRef.current = scene

      // Start animation
      const animate = () => {
        animateWebGLScene(scene.scene, scene.camera, scene.renderer, [
          particles,
          background,
        ])
      }

      animationIdRef.current = requestAnimationFrame(animate)
      setIsLoaded(true)

      // Handle resize
      const handleResize = () => {
        if (!containerRef.current || !scene.renderer) return

        const width = containerRef.current.clientWidth
        const height = containerRef.current.clientHeight

        // @ts-expect-error - Three.js Camera properties
        scene.camera.aspect = width / height
        // @ts-expect-error - Three.js Camera methods
        scene.camera.updateProjectionMatrix()
        scene.renderer.setSize(width, height)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current)
        }
        cleanupWebGLScene(scene)
      }
    } catch (err) {
      console.error('Failed to initialize WebGL scene:', err)
      setError(
        err instanceof Error ? err.message : 'Failed to initialize WebGL'
      )
      setIsLoaded(true)
    }
  }, [
    particleCount,
    particleSize,
    particleColor,
    actualPerformanceMode,
    respectReducedMotion,
    prefersReducedMotion,
  ])

  // Fallback for reduced motion or WebGL unavailable
  if (respectReducedMotion && prefersReducedMotion) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        style={{ backgroundColor }}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-blue-900/20 to-indigo-900/20' />
        {children}
      </div>
    )
  }

  if (error || !isWebGLAvailable()) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        style={{ backgroundColor }}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-blue-900/20 to-indigo-900/20' />
        <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse' />
        {children}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ backgroundColor }}
    >
      <canvas
        ref={canvasRef}
        className='absolute inset-0 w-full h-full'
        style={{ zIndex: 1 }}
      />
      <div className='absolute inset-0 z-10'>{children}</div>
    </div>
  )
}

export default EnhancedParticleBackground
