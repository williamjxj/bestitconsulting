/**
 * Animation utilities and constants for Technology Showcase
 *
 * Provides animation configurations, performance optimizations,
 * and utility functions for smooth scrolling effects.
 */

// Animation configuration
export const animationConfig = {
  duration: 300,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  threshold: 0.5,
  scrollDebounce: 16, // 60fps
} as const

// Responsive animation configurations
export const responsiveConfig = {
  mobile: {
    duration: 250,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    threshold: 0.3,
  },
  tablet: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    threshold: 0.4,
  },
  desktop: {
    duration: 350,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    threshold: 0.5,
  },
} as const

// Performance monitoring
export interface PerformanceMetrics {
  renderTime: number
  animationFPS: number
  scrollLatency: number
  memoryUsage: number
}

// Animation classes for Tailwind
export function getAnimationClasses(progress: number): string {
  const baseClasses = 'transition-all duration-300 ease-out'

  if (progress < 0.1) {
    return `${baseClasses} opacity-0 scale-95`
  } else if (progress < 0.5) {
    return `${baseClasses} opacity-50 scale-98`
  } else if (progress < 0.9) {
    return `${baseClasses} opacity-75 scale-99`
  } else {
    return `${baseClasses} opacity-100 scale-100`
  }
}

// Scroll-based animation utilities
export function getScrollProgress(
  element: HTMLElement,
  container: HTMLElement
): number {
  const elementRect = element.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()

  const elementCenter = elementRect.left + elementRect.width / 2
  const containerCenter = containerRect.left + containerRect.width / 2

  const distance = Math.abs(elementCenter - containerCenter)
  const maxDistance = containerRect.width / 2

  return Math.max(0, Math.min(1, 1 - distance / maxDistance))
}

// Performance optimization utilities
export function optimizeForPerformance(element: HTMLElement): void {
  // Enable GPU acceleration
  element.style.willChange = 'transform'
  element.style.transform = 'translateZ(0)'

  // Add performance hints
  element.style.contain = 'layout style paint'
}

export function cleanupPerformanceOptimizations(element: HTMLElement): void {
  element.style.willChange = 'auto'
  element.style.contain = 'none'
}

// Reduced motion detection
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// FPS monitoring
export class FPSMonitor {
  private frameCount = 0
  private lastTime = 0
  private fps = 0

  update(): number {
    const now = performance.now()
    this.frameCount++

    if (now - this.lastTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime))
      this.frameCount = 0
      this.lastTime = now
    }

    return this.fps
  }

  getFPS(): number {
    return this.fps
  }
}

// Animation frame scheduler
export class AnimationScheduler {
  private rafId: number | null = null
  private callback: () => void

  constructor(callback: () => void) {
    this.callback = callback
  }

  start(): void {
    if (this.rafId !== null) return

    const animate = () => {
      this.callback()
      this.rafId = requestAnimationFrame(animate)
    }

    this.rafId = requestAnimationFrame(animate)
  }

  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }
}

// Scroll event debouncer
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  let timeout: NodeJS.Timeout | null = null

  return ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as T
}

// Intersection Observer utilities
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options,
  }

  return new IntersectionObserver(callback, defaultOptions)
}

// Memory management
export function cleanupEventListeners(
  element: HTMLElement,
  eventType: string,
  handler: EventListener
): void {
  element.removeEventListener(eventType, handler)
}

// Error handling for animations
export function handleAnimationError(error: Error, context: string): void {
  console.error(`Animation error in ${context}:`, error)

  // Fallback: disable animations
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--animation-duration', '0ms')
  }
}
