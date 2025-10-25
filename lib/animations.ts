/**
 * Animation configuration and utilities
 * Centralized system for managing all animation behaviors and settings
 */

export interface AnimationConfig {
  id: string
  name: string
  type: 'fade' | 'slide' | 'scale' | 'rotate' | 'custom'
  duration: number
  delay: number
  easing: string
  direction: 'up' | 'down' | 'left' | 'right' | 'in' | 'out'
  stagger: number
  threshold: number
  reducedMotion: boolean
  mobileOptimized: boolean
}

export interface AnimationVariant {
  id: string
  name: string
  initial: Record<string, any>
  animate: Record<string, any>
  exit: Record<string, any>
  transition: {
    duration: number
    ease: string
  }
  responsive: {
    mobile: Record<string, any>
    tablet: Record<string, any>
    desktop: Record<string, any>
  }
}

export interface ComponentAnimation {
  componentId: string
  animationId: string
  variantId: string
  trigger: 'mount' | 'scroll' | 'hover' | 'click' | 'focus'
  conditions: AnimationCondition[]
  fallback: {
    type: 'static' | 'simplified' | 'disabled'
    config: Record<string, any>
  }
}

export interface AnimationCondition {
  type: 'device' | 'prefers-reduced-motion' | 'battery' | 'connection'
  value: any
  operator: 'equals' | 'greater-than' | 'less-than' | 'contains'
}

export interface VisualEnhancement {
  id: string
  type: 'particle' | 'gradient' | 'shadow' | 'blur' | 'custom'
  intensity: number
  color: string
  position: {
    x: number
    y: number
    z?: number
  }
  responsive: {
    mobile: Record<string, any>
    tablet: Record<string, any>
    desktop: Record<string, any>
  }
  performance: {
    optimizeForMobile: boolean
    reduceOnLowBattery: boolean
    respectReducedMotion: boolean
  }
}

export interface PerformanceMetrics {
  id: string
  componentId: string
  fps: number
  renderTime: number
  memoryUsage: number
  batteryImpact: number
  accessibilityScore: number
  timestamp: string
}

// Default animation configurations
export const DEFAULT_ANIMATIONS: Record<string, AnimationConfig> = {
  fadeIn: {
    id: 'fadeIn',
    name: 'Fade In',
    type: 'fade',
    duration: 600,
    delay: 0,
    easing: 'easeOut',
    direction: 'in',
    stagger: 0,
    threshold: 0.1,
    reducedMotion: true,
    mobileOptimized: true,
  },
  slideUp: {
    id: 'slideUp',
    name: 'Slide Up',
    type: 'slide',
    duration: 600,
    delay: 0,
    easing: 'easeOut',
    direction: 'up',
    stagger: 100,
    threshold: 0.1,
    reducedMotion: true,
    mobileOptimized: true,
  },
  scaleIn: {
    id: 'scaleIn',
    name: 'Scale In',
    type: 'scale',
    duration: 400,
    delay: 0,
    easing: 'easeOut',
    direction: 'in',
    stagger: 0,
    threshold: 0.1,
    reducedMotion: true,
    mobileOptimized: true,
  },
}

// Default animation variants
export const DEFAULT_VARIANTS: Record<string, AnimationVariant> = {
  fadeIn: {
    id: 'fadeIn',
    name: 'Fade In',
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
    responsive: {
      mobile: { duration: 0.3 },
      tablet: { duration: 0.4 },
      desktop: { duration: 0.6 },
    },
  },
  slideUp: {
    id: 'slideUp',
    name: 'Slide Up',
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
    responsive: {
      mobile: { duration: 0.3, y: 10 },
      tablet: { duration: 0.4, y: 15 },
      desktop: { duration: 0.6, y: 20 },
    },
  },
  scaleIn: {
    id: 'scaleIn',
    name: 'Scale In',
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
    responsive: {
      mobile: { duration: 0.2 },
      tablet: { duration: 0.3 },
      desktop: { duration: 0.4 },
    },
  },
}

// Animation utility functions
export function getAnimationConfig(
  animationId: string,
  overrides?: Partial<AnimationConfig>
): AnimationConfig {
  const baseConfig = DEFAULT_ANIMATIONS[animationId]
  if (!baseConfig) {
    throw new Error(`Animation config not found: ${animationId}`)
  }
  return { ...baseConfig, ...overrides }
}

export function getAnimationVariant(
  variantId: string,
  overrides?: Partial<AnimationVariant>
): AnimationVariant {
  const baseVariant = DEFAULT_VARIANTS[variantId]
  if (!baseVariant) {
    throw new Error(`Animation variant not found: ${variantId}`)
  }
  return { ...baseVariant, ...overrides }
}

export function validateAnimationConfig(config: AnimationConfig): boolean {
  return (
    config.duration >= 100 &&
    config.duration <= 2000 &&
    config.delay >= 0 &&
    config.threshold >= 0 &&
    config.threshold <= 1
  )
}

export function getResponsiveConfig(
  variant: AnimationVariant,
  breakpoint: 'mobile' | 'tablet' | 'desktop'
): Record<string, any> {
  return variant.responsive[breakpoint] || {}
}

export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

export function getOptimizedConfig(
  config: AnimationConfig,
  variant: AnimationVariant
): { config: AnimationConfig; variant: AnimationVariant } {
  const reducedMotion = shouldReduceMotion()
  const mobile = isMobile()

  const optimizedConfig = { ...config }
  const optimizedVariant = { ...variant }

  if (reducedMotion) {
    optimizedConfig.duration = Math.min(config.duration, 200)
    optimizedConfig.easing = 'linear'
  }

  if (mobile) {
    optimizedConfig.duration = Math.min(config.duration, 400)
    optimizedConfig.stagger = Math.min(config.stagger, 50)
  }

  return { config: optimizedConfig, variant: optimizedVariant }
}
