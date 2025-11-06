/**
 * Animation Utilities and Presets
 *
 * Centralized animation configuration for consistent timing, easing, and performance
 * across all animated components in the UI Animation Consolidation feature.
 */

export const animationPresets = {
  fadeInUp: {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  fadeInDown: {
    initial: { y: -60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  slideInLeft: {
    initial: { x: -60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  slideInRight: {
    initial: { x: 60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  scaleOut: {
    initial: { scale: 1, opacity: 1 },
    animate: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  bounceIn: {
    initial: { scale: 0.3, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: {
      duration: 0.6,
      ease: [0.68, -0.55, 0.265, 1.55],
      type: 'spring',
      stiffness: 400,
      damping: 17,
    },
  },
  slideUp: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  slideDown: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  rotateIn: {
    initial: { rotate: -180, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  flipIn: {
    initial: { rotateY: -90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerItem = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
}

export const hoverAnimations = {
  scale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  },
  lift: {
    whileHover: { y: -5 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  },
  glow: {
    whileHover: {
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
      transition: { duration: 0.3 },
    },
  },
  rotate: {
    whileHover: { rotate: 5 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  },
}

export const loadingAnimations = {
  spin: {
    animate: { rotate: 360 },
    transition: { duration: 1, repeat: Infinity, ease: 'linear' },
  },
  pulse: {
    animate: { scale: [1, 1.1, 1] },
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
  bounce: {
    animate: { y: [0, -10, 0] },
    transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
  },
  fade: {
    animate: { opacity: [0.5, 1, 0.5] },
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const scrollAnimations = {
  reveal: {
    initial: { y: 60, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  slideIn: {
    initial: { x: -60, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

export const counterAnimations = {
  countUp: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
}

export const pageTransitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  slide: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.1, opacity: 0 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
}

// Animation configuration types
export interface AnimationConfig {
  id: string
  name: string
  type: 'scroll' | 'hover' | 'click' | 'stagger' | 'counter'
  duration: number
  delay: number
  easing: number[]
  threshold: number
  staggerDelay: number
  reducedMotion: boolean
  performance: 'low' | 'medium' | 'high'
}

// Default animation configurations
export const defaultAnimations: AnimationConfig[] = [
  {
    id: 'fade-in-up',
    name: 'Fade In Up',
    type: 'scroll',
    duration: 800,
    delay: 0,
    easing: [0.4, 0, 0.2, 1] as const,
    threshold: 0.2,
    staggerDelay: 100,
    reducedMotion: true,
    performance: 'low',
  },
  {
    id: 'scale-hover',
    name: 'Scale Hover',
    type: 'hover',
    duration: 300,
    delay: 0,
    easing: [0.4, 0, 0.2, 1] as const,
    threshold: 0.5,
    staggerDelay: 0,
    reducedMotion: true,
    performance: 'low',
  },
  {
    id: 'stagger-reveal',
    name: 'Stagger Reveal',
    type: 'stagger',
    duration: 600,
    delay: 0,
    easing: [0.4, 0, 0.2, 1] as const,
    threshold: 0.2,
    staggerDelay: 100,
    reducedMotion: true,
    performance: 'medium',
  },
  {
    id: 'counter-animation',
    name: 'Counter Animation',
    type: 'counter',
    duration: 2000,
    delay: 0,
    easing: [0.4, 0, 0.2, 1] as const,
    threshold: 0.2,
    staggerDelay: 0,
    reducedMotion: true,
    performance: 'low',
  },
]

// Utility functions
export const getAnimationConfig = (id: string): AnimationConfig | undefined => {
  return defaultAnimations.find(config => config.id === id)
}

export const createCustomAnimation = (
  type: AnimationConfig['type'],
  duration: number = 600,
  delay: number = 0,
  easing: number[] = [0.4, 0, 0.2, 1]
): AnimationConfig => {
  return {
    id: `custom-${type}-${Date.now()}`,
    name: `Custom ${type}`,
    type,
    duration,
    delay,
    easing,
    threshold: 0.2,
    staggerDelay: 100,
    reducedMotion: true,
    performance: duration > 1000 ? 'high' : duration > 500 ? 'medium' : 'low',
  }
}

// Performance optimization utilities
export const optimizeForPerformance = (
  config: AnimationConfig
): AnimationConfig => {
  return {
    ...config,
    duration: Math.min(config.duration, 800), // Cap at 800ms
    performance:
      config.duration > 600 ? 'high' : config.duration > 300 ? 'medium' : 'low',
  }
}

// Reduced motion utilities
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const getReducedMotionAnimation = (
  config: AnimationConfig
): AnimationConfig => {
  return {
    ...config,
    duration: Math.min(config.duration, 200), // Much shorter for reduced motion
    reducedMotion: true,
    performance: 'low',
  }
}

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Intersection Observer utility
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver => {
  return new IntersectionObserver(callback, options)
}

// FPS Monitor
export class FPSMonitor {
  private frameCount = 0
  private lastTime = 0
  private fps = 0
  private callback?: (fps: number) => void

  constructor(callback?: (fps: number) => void) {
    this.callback = callback
  }

  start() {
    const measure = (time: number) => {
      this.frameCount++

      if (time - this.lastTime >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (time - this.lastTime))
        this.frameCount = 0
        this.lastTime = time
        this.callback?.(this.fps)
      }

      requestAnimationFrame(measure)
    }

    requestAnimationFrame(measure)
  }

  getFPS(): number {
    return this.fps
  }
}

// Animation classes utility
export const getAnimationClasses = (animation: string): string => {
  const classMap: Record<string, string> = {
    fadeInUp: 'animate-fade-in-up',
    fadeInDown: 'animate-fade-in-down',
    slideInLeft: 'animate-slide-in-left',
    slideInRight: 'animate-slide-in-right',
    scaleIn: 'animate-scale-in',
    bounceIn: 'animate-bounce-in',
  }

  return classMap[animation] || 'animate-fade-in-up'
}

// Performance cleanup utility
export const cleanupPerformanceOptimizations = (): void => {
  // Clean up any performance monitoring
  if (typeof window !== 'undefined') {
    // Remove any global performance observers
    const observers = (window as any).__performanceObservers || []
    observers.forEach((observer: any) => observer?.disconnect?.())
    delete (window as any).__performanceObservers
  }
}
