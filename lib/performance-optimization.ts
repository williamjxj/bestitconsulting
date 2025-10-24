/**
 * Performance optimization utilities for animations and UI components
 */

import { useReducedMotion } from './accessibility'
import { getDeviceType } from './mobile-optimization'

export interface PerformanceConfig {
  enableAnimations: boolean
  reduceComplexity: boolean
  optimizeForMobile: boolean
  maxFPS: number
  enableGPUAcceleration: boolean
}

export function getPerformanceConfig(
  options: {
    reducedMotion?: boolean
    deviceType?: 'mobile' | 'tablet' | 'desktop'
  } = {}
): PerformanceConfig {
  const { reducedMotion, deviceType } = options

  const motionPreference = reducedMotion ?? useReducedMotion()
  const device = deviceType ?? getDeviceType()

  return {
    enableAnimations: !motionPreference,
    reduceComplexity: device === 'mobile' || motionPreference,
    optimizeForMobile: device === 'mobile',
    maxFPS: device === 'mobile' ? 30 : 60,
    enableGPUAcceleration: true,
  }
}

export function shouldUseGPUAcceleration(): boolean {
  const config = getPerformanceConfig()
  return config.enableGPUAcceleration && config.enableAnimations
}

export function getOptimizedAnimationDuration(baseDuration: number): number {
  const config = getPerformanceConfig()

  if (config.reduceComplexity) {
    return baseDuration * 0.7 // Reduce duration for better performance
  }

  return baseDuration
}

export function getOptimizedStaggerDelay(baseDelay: number): number {
  const config = getPerformanceConfig()

  if (config.reduceComplexity) {
    return baseDelay * 0.5 // Reduce stagger delay for better performance
  }

  return baseDelay
}

export function getOptimizedParticleCount(baseCount: number): number {
  const config = getPerformanceConfig()

  if (config.optimizeForMobile) {
    return Math.min(baseCount, 20) // Limit particles on mobile
  }

  if (config.reduceComplexity) {
    return Math.min(baseCount, 50) // Reduce particles for better performance
  }

  return baseCount
}

export function getOptimizedAnimationEasing(): string {
  const config = getPerformanceConfig()

  if (config.reduceComplexity) {
    return 'easeOut' // Simpler easing for better performance
  }

  return 'easeInOut' // More complex easing for better visual appeal
}

export function shouldUseIntersectionObserver(): boolean {
  const config = getPerformanceConfig()
  return config.enableAnimations && !config.reduceComplexity
}

export function getOptimizedTransformOrigin(): string {
  const config = getPerformanceConfig()

  if (config.optimizeForMobile) {
    return 'center' // Simpler transform origin for mobile
  }

  return 'center center' // More precise transform origin for desktop
}

export function getOptimizedWillChange(): string {
  const config = getPerformanceConfig()

  if (!config.enableAnimations) {
    return 'auto'
  }

  if (config.optimizeForMobile) {
    return 'transform' // Only optimize transform for mobile
  }

  return 'transform, opacity' // Optimize both transform and opacity for desktop
}

export function getOptimizedBackfaceVisibility(): string {
  const config = getPerformanceConfig()

  if (config.optimizeForMobile) {
    return 'hidden' // Hide backface for better mobile performance
  }

  return 'visible' // Show backface for better desktop experience
}

export function getOptimizedPerspective(): number {
  const config = getPerformanceConfig()

  if (config.optimizeForMobile) {
    return 1000 // Lower perspective for mobile
  }

  return 2000 // Higher perspective for desktop
}

export function shouldUseTransform3d(): boolean {
  const config = getPerformanceConfig()
  return config.enableAnimations && config.enableGPUAcceleration
}

export function getOptimizedAnimationDelay(baseDelay: number): number {
  const config = getPerformanceConfig()

  if (config.reduceComplexity) {
    return baseDelay * 0.5 // Reduce delay for better performance
  }

  return baseDelay
}
