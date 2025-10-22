/**
 * Performance Monitoring and Optimization Utilities
 *
 * Provides performance monitoring, optimization, and analytics for the BestIT Consulting design system
 * Implements performance best practices and monitoring
 */

import { performanceConfig } from './design-system'

// Performance metrics interface
export interface PerformanceMetrics {
  fps: number
  renderTime: number
  memoryUsage: number
  animationPerformance: number
  scrollPerformance: number
  loadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
}

// Performance monitor class
export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fps: 0,
    renderTime: 0,
    memoryUsage: 0,
    animationPerformance: 0,
    scrollPerformance: 0,
    loadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
  }

  private frameCount = 0
  private lastTime = 0
  private observers: PerformanceObserver[] = []

  constructor() {
    this.initializeObservers()
    this.startFPSMonitoring()
  }

  private initializeObservers(): void {
    // FCP and LCP observer
    if ('PerformanceObserver' in window) {
      const paintObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.firstContentfulPaint = entry.startTime
          }
          if (entry.name === 'largest-contentful-paint') {
            this.metrics.largestContentfulPaint = entry.startTime
          }
        }
      })

      paintObserver.observe({ entryTypes: ['paint'] })
      this.observers.push(paintObserver)

      // CLS observer
      const clsObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (
            entry.entryType === 'layout-shift' &&
            !(entry as any).hadRecentInput
          ) {
            this.metrics.cumulativeLayoutShift += (entry as any).value
          }
        }
      })

      clsObserver.observe({ entryTypes: ['layout-shift'] })
      this.observers.push(clsObserver)
    }
  }

  private startFPSMonitoring(): void {
    const measureFPS = () => {
      const now = performance.now()
      this.frameCount++

      if (now - this.lastTime >= 1000) {
        this.metrics.fps = Math.round(
          (this.frameCount * 1000) / (now - this.lastTime)
        )
        this.frameCount = 0
        this.lastTime = now
      }

      requestAnimationFrame(measureFPS)
    }

    requestAnimationFrame(measureFPS)
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  getScore(): number {
    const metrics = this.getMetrics()
    let score = 100

    // FPS scoring (target: 60fps)
    if (metrics.fps < 30) score -= 30
    else if (metrics.fps < 45) score -= 20
    else if (metrics.fps < 60) score -= 10

    // Load time scoring (target: <3s)
    if (metrics.loadTime > 5000) score -= 25
    else if (metrics.loadTime > 3000) score -= 15
    else if (metrics.loadTime > 2000) score -= 10

    // CLS scoring (target: <0.1)
    if (metrics.cumulativeLayoutShift > 0.25) score -= 20
    else if (metrics.cumulativeLayoutShift > 0.1) score -= 10

    return Math.max(0, score)
  }

  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect())
  }
}

// Animation performance optimizer
export class AnimationOptimizer {
  private static instance: AnimationOptimizer
  private isReducedMotion = false
  private isLowEndDevice = false
  private isMobile = false

  private constructor() {
    this.detectCapabilities()
  }

  static getInstance(): AnimationOptimizer {
    if (!AnimationOptimizer.instance) {
      AnimationOptimizer.instance = new AnimationOptimizer()
    }
    return AnimationOptimizer.instance
  }

  private detectCapabilities(): void {
    // Detect reduced motion preference
    this.isReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Detect mobile device
    this.isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )

    // Detect low-end device (simplified heuristic)
    this.isLowEndDevice =
      navigator.hardwareConcurrency <= 2 ||
      navigator.deviceMemory <= 4 ||
      this.isMobile
  }

  shouldReduceAnimations(): boolean {
    return this.isReducedMotion || this.isLowEndDevice
  }

  // Mobile-specific optimizations
  getMobileOptimizations(): {
    reduceAnimations: boolean
    useGPUAcceleration: boolean
    optimizeImages: boolean
    lazyLoadThreshold: number
  } {
    return {
      reduceAnimations: this.isMobile || this.isLowEndDevice,
      useGPUAcceleration: !this.isLowEndDevice,
      optimizeImages: this.isMobile,
      lazyLoadThreshold: this.isMobile ? 0.1 : 0.2,
    }
  }

  // Mobile animation performance monitoring
  monitorMobileAnimations(): void {
    if (!this.isMobile) return

    // Monitor animation frame rate on mobile
    let frameCount = 0
    let lastTime = performance.now()

    const checkFrameRate = () => {
      frameCount++
      const now = performance.now()

      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime))

        // Reduce animations if FPS drops below 30
        if (fps < 30) {
          this.isLowEndDevice = true
          this.optimizeForMobile()
        }

        frameCount = 0
        lastTime = now
      }

      requestAnimationFrame(checkFrameRate)
    }

    requestAnimationFrame(checkFrameRate)
  }

  private optimizeForMobile(): void {
    // Disable complex animations on mobile
    document.documentElement.style.setProperty(
      '--animation-duration-fast',
      '0.1s'
    )
    document.documentElement.style.setProperty(
      '--animation-duration-normal',
      '0.2s'
    )
    document.documentElement.style.setProperty(
      '--animation-duration-slow',
      '0.3s'
    )
  }

  // Mobile performance benchmarks
  getMobileBenchmarks(): {
    targetFPS: number
    targetTouchLatency: number
    targetMemoryUsage: number
    targetLoadTime: number
  } {
    return {
      targetFPS: this.isMobile ? 30 : 60,
      targetTouchLatency: 100, // 100ms max
      targetMemoryUsage: 50, // 50MB max
      targetLoadTime: 3000, // 3s max
    }
  }

  // Run mobile performance benchmarks
  async runMobileBenchmarks(): Promise<{
    fps: number
    touchLatency: number
    memoryUsage: number
    loadTime: number
    score: number
  }> {
    const benchmarks = this.getMobileBenchmarks()

    // Measure FPS
    let fps = 0
    let frameCount = 0
    let lastTime = performance.now()

    const measureFPS = () => {
      frameCount++
      const now = performance.now()

      if (now - lastTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (now - lastTime))
        frameCount = 0
        lastTime = now
      } else {
        requestAnimationFrame(measureFPS)
      }
    }

    measureFPS()

    // Measure touch latency
    let touchLatency = 0
    const touchStart = performance.now()
    document.addEventListener(
      'touchstart',
      () => {
        touchLatency = performance.now() - touchStart
      },
      { once: true }
    )

    // Measure memory usage
    const memoryUsage =
      (performance as any).memory?.usedJSHeapSize / (1024 * 1024) || 0

    // Measure load time
    const loadTime = performance.now()

    // Calculate score
    const fpsScore = Math.min(100, (fps / benchmarks.targetFPS) * 100)
    const touchScore = Math.min(
      100,
      (benchmarks.targetTouchLatency / touchLatency) * 100
    )
    const memoryScore = Math.min(
      100,
      (benchmarks.targetMemoryUsage / memoryUsage) * 100
    )
    const loadScore = Math.min(
      100,
      (benchmarks.targetLoadTime / loadTime) * 100
    )

    const score = Math.round(
      (fpsScore + touchScore + memoryScore + loadScore) / 4
    )

    return {
      fps,
      touchLatency,
      memoryUsage,
      loadTime,
      score,
    }
  }

  getOptimizedDuration(baseDuration: number): number {
    if (this.shouldReduceAnimations()) {
      return Math.min(baseDuration * 0.5, 200) // Max 200ms for reduced motion
    }
    return baseDuration
  }

  getOptimizedEasing(): string {
    if (this.shouldReduceAnimations()) {
      return 'ease' // Simpler easing for reduced motion
    }
    return 'cubic-bezier(0.4, 0, 0.2, 1)' // Smooth easing for capable devices
  }
}

// Image optimization utilities
export function optimizeImageLoading(element: HTMLImageElement): void {
  // Enable lazy loading
  element.loading = 'lazy'

  // Add loading placeholder
  element.style.backgroundColor = '#f3f4f6'
  element.style.transition = 'opacity 0.3s ease'

  // Handle load event
  element.addEventListener('load', () => {
    element.style.opacity = '1'
  })

  // Handle error event
  element.addEventListener('error', () => {
    element.style.opacity = '0.5'
    element.alt = 'Image failed to load'
  })
}

// Bundle size monitoring
export function getBundleSize(): number {
  if (typeof window === 'undefined') return 0

  const scripts = document.querySelectorAll('script[src]')
  let totalSize = 0

  scripts.forEach(script => {
    const src = script.getAttribute('src')
    if (src && !src.startsWith('data:')) {
      // This is a simplified approach - in reality, you'd need to fetch and measure
      totalSize += 10000 // Placeholder
    }
  })

  return totalSize
}

// Memory usage monitoring
export function getMemoryUsage(): number {
  if ('memory' in performance) {
    return (performance as any).memory.usedJSHeapSize / 1024 / 1024 // MB
  }
  return 0
}

// Performance budget checker
export function checkPerformanceBudget(): {
  passed: boolean
  violations: string[]
  recommendations: string[]
} {
  const monitor = new PerformanceMonitor()
  const metrics = monitor.getMetrics()
  const violations: string[] = []
  const recommendations: string[] = []

  // FPS budget (target: 60fps)
  if (metrics.fps < 60) {
    violations.push(`FPS is ${metrics.fps}, target is 60fps`)
    recommendations.push('Optimize animations and reduce complexity')
  }

  // Load time budget (target: <3s)
  if (metrics.loadTime > 3000) {
    violations.push(`Load time is ${metrics.loadTime}ms, target is <3000ms`)
    recommendations.push(
      'Optimize images, reduce bundle size, enable compression'
    )
  }

  // CLS budget (target: <0.1)
  if (metrics.cumulativeLayoutShift > 0.1) {
    violations.push(`CLS is ${metrics.cumulativeLayoutShift}, target is <0.1`)
    recommendations.push(
      'Reserve space for dynamic content, avoid layout shifts'
    )
  }

  // Memory budget (target: <50MB)
  if (metrics.memoryUsage > 50) {
    violations.push(`Memory usage is ${metrics.memoryUsage}MB, target is <50MB`)
    recommendations.push('Implement memory cleanup, reduce object creation')
  }

  return {
    passed: violations.length === 0,
    violations,
    recommendations,
  }
}

// Performance reporting
export function reportPerformanceMetrics(metrics: PerformanceMetrics): void {
  // Send to analytics service
  if (typeof window !== 'undefined' && 'gtag' in window) {
    ;(window as any).gtag('event', 'performance_metrics', {
      fps: metrics.fps,
      load_time: metrics.loadTime,
      cls: metrics.cumulativeLayoutShift,
    })
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Performance Metrics:', metrics)
  }
}

// Performance optimization utilities
export function enableGPUAcceleration(element: HTMLElement): void {
  element.style.willChange = 'transform'
  element.style.transform = 'translateZ(0)'
}

export function disableGPUAcceleration(element: HTMLElement): void {
  element.style.willChange = 'auto'
  element.style.transform = 'none'
}

export function optimizeForMobile(element: HTMLElement): void {
  // Reduce animations on mobile
  if (window.innerWidth < 768) {
    element.style.transition = 'none'
  }
}

// Lazy loading utilities
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  }

  return new IntersectionObserver(callback, defaultOptions)
}

export function lazyLoadImages(): void {
  const images = document.querySelectorAll('img[data-src]')

  const imageObserver = createIntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        img.src = img.dataset.src!
        img.removeAttribute('data-src')
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach(img => imageObserver.observe(img))
}

// Performance testing utilities
export function runPerformanceTest(
  testName: string,
  testFunction: () => void
): number {
  const startTime = performance.now()
  testFunction()
  const endTime = performance.now()
  const duration = endTime - startTime

  console.log(`${testName} took ${duration.toFixed(2)}ms`)
  return duration
}

// Cleanup utilities
export function cleanupPerformanceOptimizations(element: HTMLElement): void {
  element.style.willChange = 'auto'
  element.style.transform = 'none'
  element.style.transition = ''
}
