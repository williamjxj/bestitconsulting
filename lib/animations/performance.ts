/**
 * Animation performance monitoring system
 * Tracks and optimizes animation performance across the application
 */

'use client'

import { useEffect, useRef, useState } from 'react'

export interface PerformanceMetrics {
  fps: number
  frameTime: number
  memoryUsage: number
  animationCount: number
  isThrottled: boolean
}

export interface PerformanceConfig {
  targetFPS: number
  maxMemoryUsage: number
  throttleThreshold: number
  monitoringInterval: number
}

export interface AnimationPerformance {
  id: string
  startTime: number
  endTime?: number
  duration: number
  frameCount: number
  averageFPS: number
  memoryPeak: number
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fps: 60,
    frameTime: 16.67,
    memoryUsage: 0,
    animationCount: 0,
    isThrottled: false,
  }

  private config: PerformanceConfig = {
    targetFPS: 60,
    maxMemoryUsage: 50,
    throttleThreshold: 45,
    monitoringInterval: 1000,
  }

  private animations: Map<string, AnimationPerformance> = new Map()
  private monitoringInterval: NodeJS.Timeout | null = null
  private frameCount = 0
  private lastTime = performance.now()

  constructor(config?: Partial<PerformanceConfig>) {
    this.config = { ...this.config, ...config }
    this.startMonitoring()
  }

  /**
   * Start performance monitoring
   */
  private startMonitoring(): void {
    this.monitoringInterval = setInterval(() => {
      this.updateMetrics()
    }, this.config.monitoringInterval)
  }

  /**
   * Stop performance monitoring
   */
  public stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
      this.monitoringInterval = null
    }
  }

  /**
   * Update performance metrics
   */
  private updateMetrics(): void {
    const currentTime = performance.now()
    const deltaTime = currentTime - this.lastTime
    const fps = 1000 / deltaTime

    this.metrics.fps = fps
    this.metrics.frameTime = deltaTime
    this.metrics.memoryUsage = this.getMemoryUsage()
    this.metrics.animationCount = this.animations.size
    this.metrics.isThrottled = fps < this.config.throttleThreshold

    this.lastTime = currentTime
    this.frameCount++
  }

  /**
   * Get memory usage (if available)
   */
  private getMemoryUsage(): number {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      return memory.usedJSHeapSize / 1024 / 1024 // Convert to MB
    }
    return 0
  }

  /**
   * Start tracking an animation
   */
  public startAnimation(id: string): void {
    this.animations.set(id, {
      id,
      startTime: performance.now(),
      duration: 0,
      frameCount: 0,
      averageFPS: 0,
      memoryPeak: 0,
    })
  }

  /**
   * End tracking an animation
   */
  public endAnimation(id: string): void {
    const animation = this.animations.get(id)
    if (animation) {
      animation.endTime = performance.now()
      animation.duration = animation.endTime - animation.startTime
      animation.averageFPS = animation.frameCount / (animation.duration / 1000)
      animation.memoryPeak = this.getMemoryUsage()
    }
  }

  /**
   * Get current metrics
   */
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  /**
   * Get animation performance data
   */
  public getAnimationPerformance(id: string): AnimationPerformance | undefined {
    return this.animations.get(id)
  }

  /**
   * Get all animation performance data
   */
  public getAllAnimationPerformance(): AnimationPerformance[] {
    return Array.from(this.animations.values())
  }

  /**
   * Check if performance is optimal
   */
  public isPerformanceOptimal(): boolean {
    return (
      this.metrics.fps >= this.config.targetFPS &&
      this.metrics.memoryUsage <= this.config.maxMemoryUsage &&
      !this.metrics.isThrottled
    )
  }

  /**
   * Get performance recommendations
   */
  public getRecommendations(): string[] {
    const recommendations: string[] = []

    if (this.metrics.fps < this.config.targetFPS) {
      recommendations.push(
        'Consider reducing animation complexity or using GPU acceleration'
      )
    }

    if (this.metrics.memoryUsage > this.config.maxMemoryUsage) {
      recommendations.push(
        'Memory usage is high. Consider cleaning up unused animations'
      )
    }

    if (this.metrics.animationCount > 10) {
      recommendations.push(
        'Too many concurrent animations. Consider staggering or reducing count'
      )
    }

    if (this.metrics.isThrottled) {
      recommendations.push(
        'Performance is throttled. Consider reducing animation load'
      )
    }

    return recommendations
  }

  /**
   * Cleanup performance data
   */
  public cleanup(): void {
    this.stopMonitoring()
    this.animations.clear()
  }
}

// Global performance monitor instance
let globalPerformanceMonitor: PerformanceMonitor | null = null

/**
 * Get or create global performance monitor
 */
export function getPerformanceMonitor(
  config?: Partial<PerformanceConfig>
): PerformanceMonitor {
  if (!globalPerformanceMonitor) {
    globalPerformanceMonitor = new PerformanceMonitor(config)
  }
  return globalPerformanceMonitor
}

/**
 * Hook for monitoring animation performance
 */
export function useAnimationPerformance(animationId: string) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isOptimal, setIsOptimal] = useState(true)
  const monitor = useRef<PerformanceMonitor | null>(null)

  useEffect(() => {
    monitor.current = getPerformanceMonitor()

    const updateMetrics = () => {
      if (monitor.current) {
        const currentMetrics = monitor.current.getMetrics()
        setMetrics(currentMetrics)
        setIsOptimal(monitor.current.isPerformanceOptimal())
      }
    }

    const interval = setInterval(updateMetrics, 1000)
    return () => clearInterval(interval)
  }, [])

  const startAnimation = () => {
    monitor.current?.startAnimation(animationId)
  }

  const endAnimation = () => {
    monitor.current?.endAnimation(animationId)
  }

  const getPerformanceData = () => {
    return monitor.current?.getAnimationPerformance(animationId)
  }

  return {
    metrics,
    isOptimal,
    startAnimation,
    endAnimation,
    getPerformanceData,
  }
}

/**
 * Create performance-optimized animation
 */
export function createOptimizedAnimation<T>(
  animationFn: () => T,
  config: {
    maxDuration?: number
    targetFPS?: number
    onPerformanceIssue?: (metrics: PerformanceMetrics) => void
  } = {}
): T {
  const monitor = getPerformanceMonitor()
  const startTime = performance.now()

  const result = animationFn()

  const endTime = performance.now()
  const duration = endTime - startTime

  // Check performance constraints
  if (config.maxDuration && duration > config.maxDuration) {
    console.warn(
      `Animation exceeded max duration: ${duration}ms > ${config.maxDuration}ms`
    )
  }

  const metrics = monitor.getMetrics()
  if (config.targetFPS && metrics.fps < config.targetFPS) {
    config.onPerformanceIssue?.(metrics)
  }

  return result
}

/**
 * Throttle animation based on performance
 */
export function throttleAnimation<T extends (...args: any[]) => any>(
  animationFn: T,
  config: {
    minInterval?: number
    maxCallsPerSecond?: number
  } = {}
): T {
  const { minInterval = 16, maxCallsPerSecond = 60 } = config
  let lastCall = 0
  let callCount = 0
  let resetTime = performance.now()

  return ((...args: Parameters<T>) => {
    const now = performance.now()

    // Reset call count every second
    if (now - resetTime >= 1000) {
      callCount = 0
      resetTime = now
    }

    // Check rate limiting
    if (callCount >= maxCallsPerSecond) {
      return
    }

    // Check minimum interval
    if (now - lastCall < minInterval) {
      return
    }

    lastCall = now
    callCount++

    return animationFn(...args)
  }) as T
}

/**
 * Create performance-aware animation with automatic optimization
 */
export function createPerformanceAwareAnimation(
  animationFn: () => void,
  config: {
    performanceThreshold?: number
    fallbackAnimation?: () => void
    monitoringInterval?: number
  } = {}
) {
  const monitor = getPerformanceMonitor()
  const {
    performanceThreshold = 45,
    fallbackAnimation,
    monitoringInterval = 100,
  } = config

  let animationId: string | null = null
  let isRunning = false

  const start = () => {
    if (isRunning) return

    animationId = `animation_${Date.now()}`
    monitor.startAnimation(animationId)
    isRunning = true

    const animate = () => {
      if (!isRunning) return

      const metrics = monitor.getMetrics()

      if (metrics.fps < performanceThreshold && fallbackAnimation) {
        fallbackAnimation()
      } else {
        animationFn()
      }

      if (isRunning) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  const stop = () => {
    if (!isRunning || !animationId) return

    isRunning = false
    monitor.endAnimation(animationId)
    animationId = null
  }

  return { start, stop }
}

/**
 * Cleanup global performance monitor
 */
export function cleanupPerformanceMonitoring(): void {
  if (globalPerformanceMonitor) {
    globalPerformanceMonitor.cleanup()
    globalPerformanceMonitor = null
  }
}

export default {
  getPerformanceMonitor,
  useAnimationPerformance,
  createOptimizedAnimation,
  throttleAnimation,
  createPerformanceAwareAnimation,
  cleanupPerformanceMonitoring,
}
