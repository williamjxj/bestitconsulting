/**
 * Animation utilities and helper functions
 * Common utilities for animation management and optimization
 */

import { AnimationConfig, DeviceTier, DeviceCapabilities } from './types'

/**
 * Get device capabilities based on user agent and performance
 */
export function getDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    return {
      tier: 'high',
      supportsWebGL: false,
      supportsWebGL2: false,
      maxTextureSize: 0,
      memoryLimit: 0,
      preferredFPS: 60,
    }
  }

  const canvas = document.createElement('canvas')
  const gl =
    canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  const gl2 = canvas.getContext('webgl2')

  const supportsWebGL = !!gl
  const supportsWebGL2 = !!gl2

  let maxTextureSize = 0
  if (gl) {
    maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
  }

  // Estimate device tier based on capabilities
  let tier: DeviceTier = 'high'
  if (!supportsWebGL || maxTextureSize < 2048) {
    tier = 'low'
  } else if (maxTextureSize < 4096 || !supportsWebGL2) {
    tier = 'medium'
  }

  // Estimate memory limit based on device tier
  const memoryLimit = {
    high: 100,
    medium: 50,
    low: 25,
  }[tier]

  const preferredFPS = {
    high: 60,
    medium: 45,
    low: 30,
  }[tier]

  return {
    tier,
    supportsWebGL,
    supportsWebGL2,
    maxTextureSize,
    memoryLimit,
    preferredFPS,
  }
}

/**
 * Get optimized animation configuration for device
 */
export function getOptimizedAnimationConfig(
  baseConfig: AnimationConfig,
  deviceTier?: DeviceTier
): AnimationConfig {
  const capabilities = getDeviceCapabilities()
  const tier = deviceTier || capabilities.tier

  const performanceMultiplier = {
    high: 1,
    medium: 0.8,
    low: 0.6,
  }

  const multiplier = performanceMultiplier[tier]

  return {
    ...baseConfig,
    duration: Math.round(baseConfig.duration * multiplier),
    performance: {
      ...baseConfig.performance,
      targetFPS: capabilities.preferredFPS,
      memoryLimit: Math.round(baseConfig.performance.memoryLimit * multiplier),
    },
  }
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if user prefers high contrast
 */
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-contrast: high)').matches
}

/**
 * Check if user prefers dark color scheme
 */
export function prefersDarkColorScheme(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Get user's motion preference
 */
export function getMotionPreference(): 'full' | 'reduced' | 'none' {
  if (prefersReducedMotion()) {
    return 'reduced'
  }
  return 'full'
}

/**
 * Create reduced motion version of animation
 */
export function createReducedMotionVersion(
  animation: AnimationConfig
): AnimationConfig {
  return {
    ...animation,
    duration: 0,
    easing: 'linear',
    reducedMotion: {
      ...animation.reducedMotion,
      alternativeAnimation: `${animation.id}-reduced`,
    },
  }
}

/**
 * Calculate stagger delay for multiple elements
 */
export function calculateStaggerDelay(
  index: number,
  baseDelay: number = 100
): number {
  return index * baseDelay
}

/**
 * Calculate total animation duration including delays
 */
export function calculateTotalDuration(
  duration: number,
  delay: number = 0,
  iterations: number = 1
): number {
  return delay + duration * iterations
}

/**
 * Get animation progress (0-1) at given time
 */
export function getAnimationProgress(
  elapsedTime: number,
  duration: number,
  delay: number = 0
): number {
  if (elapsedTime < delay) return 0
  if (elapsedTime >= delay + duration) return 1

  return (elapsedTime - delay) / duration
}

/**
 * Easing functions
 */
export const easingFunctions = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => 1 - (1 - t) * (1 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t)),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => 1 - (1 - t) * (1 - t) * (1 - t),
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - 4 * (1 - t) * (1 - t) * (1 - t),
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1 - (1 - t) * (1 - t) * (1 - t) * (1 - t),
  easeInOutQuart: (t: number) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (1 - t) * (1 - t) * (1 - t) * (1 - t),
  easeInQuint: (t: number) => t * t * t * t * t,
  easeOutQuint: (t: number) =>
    1 - (1 - t) * (1 - t) * (1 - t) * (1 - t) * (1 - t),
  easeInOutQuint: (t: number) =>
    t < 0.5
      ? 16 * t * t * t * t * t
      : 1 - 16 * (1 - t) * (1 - t) * (1 - t) * (1 - t) * (1 - t),
  easeInSine: (t: number) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t: number) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeInExpo: (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutExpo: (t: number) => {
    if (t === 0) return 0
    if (t === 1) return 1
    return t < 0.5
      ? Math.pow(2, 20 * t - 10) / 2
      : (2 - Math.pow(2, -20 * t + 10)) / 2
  },
  easeInCirc: (t: number) => 1 - Math.sqrt(1 - t * t),
  easeOutCirc: (t: number) => Math.sqrt(1 - (1 - t) * (1 - t)),
  easeInOutCirc: (t: number) =>
    t < 0.5
      ? (1 - Math.sqrt(1 - 4 * t * t)) / 2
      : (Math.sqrt(1 - 4 * (1 - t) * (1 - t)) + 1) / 2,
  easeInBack: (t: number) => 2.7 * t * t * t - 1.7 * t * t,
  easeOutBack: (t: number) =>
    1 + 2.7 * (t - 1) * (t - 1) * (t - 1) + 1.7 * (t - 1) * (t - 1),
  easeInOutBack: (t: number) =>
    t < 0.5
      ? (2 * t * t * (2 * 2.7 - 1)) / 2
      : ((2 * t - 2) * (2 * t - 2) * (2 * 2.7 + 1) + 2) / 2,
  easeInElastic: (t: number) =>
    t === 0
      ? 0
      : t === 1
        ? 1
        : -Math.pow(2, 10 * t - 10) *
          Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3)),
  easeOutElastic: (t: number) =>
    t === 0
      ? 0
      : t === 1
        ? 1
        : Math.pow(2, -10 * t) *
            Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) +
          1,
  easeInOutElastic: (t: number) => {
    if (t === 0) return 0
    if (t === 1) return 1
    return t < 0.5
      ? -(
          Math.pow(2, 20 * t - 10) *
          Math.sin((20 * t - 11.125) * ((2 * Math.PI) / 4.5))
        ) / 2
      : (Math.pow(2, -20 * t + 10) *
          Math.sin((20 * t - 11.125) * ((2 * Math.PI) / 4.5))) /
          2 +
          1
  },
  easeInBounce: (t: number) => 1 - easingFunctions.easeOutBounce(1 - t),
  easeOutBounce: (t: number) => {
    const n1 = 7.5625
    const d1 = 2.75
    if (t < 1 / d1) return n1 * t * t
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375
    return n1 * (t -= 2.625 / d1) * t + 0.984375
  },
  easeInOutBounce: (t: number) =>
    t < 0.5
      ? (1 - easingFunctions.easeOutBounce(1 - 2 * t)) / 2
      : (1 + easingFunctions.easeOutBounce(2 * t - 1)) / 2,
}

/**
 * Get easing function by name
 */
export function getEasingFunction(name: string): (t: number) => number {
  return (
    easingFunctions[name as keyof typeof easingFunctions] ||
    easingFunctions.linear
  )
}

/**
 * Create CSS animation string
 */
export function createCSSAnimation(
  name: string,
  duration: number,
  easing: string,
  delay: number = 0,
  iterations: number = 1,
  direction: string = 'normal',
  fillMode: string = 'both'
): string {
  return `${name} ${duration}ms ${easing} ${delay}ms ${iterations} ${direction} ${fillMode}`
}

/**
 * Create keyframes for CSS animations
 */
export function createKeyframes(
  name: string,
  keyframes: Record<string, any>
): string {
  const keyframeString = Object.entries(keyframes)
    .map(([percentage, styles]) => {
      const styleString = Object.entries(styles)
        .map(([property, value]) => `${property}: ${value}`)
        .join('; ')
      return `${percentage} { ${styleString} }`
    })
    .join(' ')

  return `@keyframes ${name} { ${keyframeString} }`
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Get element's position relative to viewport
 */
export function getElementPosition(element: HTMLElement): {
  top: number
  left: number
  bottom: number
  right: number
  width: number
  height: number
  centerX: number
  centerY: number
} {
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top,
    left: rect.left,
    bottom: rect.bottom,
    right: rect.right,
    width: rect.width,
    height: rect.height,
    centerX: rect.left + rect.width / 2,
    centerY: rect.top + rect.height / 2,
  }
}

/**
 * Generate unique ID for animations
 */
export function generateAnimationId(prefix: string = 'animation'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Validate animation configuration
 */
export function validateAnimationConfig(config: AnimationConfig): string[] {
  const errors: string[] = []

  if (!config.id) {
    errors.push('Animation ID is required')
  }

  if (!config.name) {
    errors.push('Animation name is required')
  }

  if (config.duration < 0) {
    errors.push('Duration must be non-negative')
  }

  if (config.duration > 5000) {
    errors.push('Duration should not exceed 5000ms for performance')
  }

  if (config.delay && config.delay < 0) {
    errors.push('Delay must be non-negative')
  }

  if (config.iterations && config.iterations < -1) {
    errors.push('Iterations must be -1 (infinite) or positive')
  }

  return errors
}

/**
 * Create animation from preset
 */
export function createAnimationFromPreset(
  presetId: string,
  overrides: Partial<AnimationConfig> = {}
): AnimationConfig {
  // This would typically load from a preset registry
  // For now, return a basic configuration
  const baseConfig: AnimationConfig = {
    id: presetId,
    name: `Preset ${presetId}`,
    type: 'transition',
    duration: 500,
    easing: 'ease-out',
    reducedMotion: {
      enabled: true,
      alternativeAnimation: `${presetId}-static`,
      staticFallback: true,
    },
    performance: {
      maxDuration: 500,
      targetFPS: 60,
      memoryLimit: 10,
      gpuAcceleration: true,
    },
  }

  return { ...baseConfig, ...overrides }
}

const animationUtils = {
  getDeviceCapabilities,
  getOptimizedAnimationConfig,
  prefersReducedMotion,
  prefersHighContrast,
  prefersDarkColorScheme,
  getMotionPreference,
  createReducedMotionVersion,
  calculateStaggerDelay,
  calculateTotalDuration,
  getAnimationProgress,
  easingFunctions,
  getEasingFunction,
  createCSSAnimation,
  createKeyframes,
  debounce,
  throttle,
  isInViewport,
  getElementPosition,
  generateAnimationId,
  validateAnimationConfig,
  createAnimationFromPreset,
}

export default animationUtils
