/**
 * Performance monitoring utilities for visual enhancements
 * Tracks animation performance, memory usage, and Core Web Vitals
 */

export interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  renderTime: number
  frameDrops: number
  timestamp: number
}

export interface PerformanceBudget {
  maxFPS: number
  maxMemoryMB: number
  maxRenderTime: number
  maxFrameDrops: number
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = []
  private budget: PerformanceBudget
  private isMonitoring = false
  private frameCount = 0
  private lastTime = performance.now()
  private animationId: number | null = null

  constructor(
    budget: PerformanceBudget = {
      maxFPS: 60,
      maxMemoryMB: 50,
      maxRenderTime: 16,
      maxFrameDrops: 5,
    }
  ) {
    this.budget = budget
  }

  /**
   * Start monitoring performance metrics
   */
  startMonitoring(): void {
    if (this.isMonitoring) return

    this.isMonitoring = true
    this.measurePerformance()
  }

  /**
   * Stop monitoring performance metrics
   */
  stopMonitoring(): void {
    this.isMonitoring = false
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  /**
   * Get current performance metrics
   */
  getCurrentMetrics(): PerformanceMetrics {
    const now = performance.now()
    const fps = this.calculateFPS()
    const memoryUsage = this.getMemoryUsage()
    const renderTime = this.calculateRenderTime()
    const frameDrops = this.calculateFrameDrops()

    return {
      fps,
      memoryUsage,
      renderTime,
      frameDrops,
      timestamp: now,
    }
  }

  /**
   * Get performance history
   */
  getMetricsHistory(): PerformanceMetrics[] {
    return [...this.metrics]
  }

  /**
   * Check if performance is within budget
   */
  isWithinBudget(): boolean {
    const current = this.getCurrentMetrics()
    return (
      current.fps >= this.budget.maxFPS &&
      current.memoryUsage <= this.budget.maxMemoryMB &&
      current.renderTime <= this.budget.maxRenderTime &&
      current.frameDrops <= this.budget.maxFrameDrops
    )
  }

  /**
   * Get performance alerts
   */
  getAlerts(): string[] {
    const current = this.getCurrentMetrics()
    const alerts: string[] = []

    if (current.fps < this.budget.maxFPS) {
      alerts.push(
        `Low FPS: ${current.fps.toFixed(1)} (target: ${this.budget.maxFPS})`
      )
    }

    if (current.memoryUsage > this.budget.maxMemoryMB) {
      alerts.push(
        `High memory usage: ${current.memoryUsage.toFixed(1)}MB (limit: ${this.budget.maxMemoryMB}MB)`
      )
    }

    if (current.renderTime > this.budget.maxRenderTime) {
      alerts.push(
        `Slow render: ${current.renderTime.toFixed(1)}ms (limit: ${this.budget.maxRenderTime}ms)`
      )
    }

    if (current.frameDrops > this.budget.maxFrameDrops) {
      alerts.push(
        `Frame drops: ${current.frameDrops} (limit: ${this.budget.maxFrameDrops})`
      )
    }

    return alerts
  }

  private measurePerformance(): void {
    if (!this.isMonitoring) return

    const now = performance.now()
    const deltaTime = now - this.lastTime

    this.frameCount++

    if (deltaTime >= 1000) {
      const fps = (this.frameCount * 1000) / deltaTime
      const memoryUsage = this.getMemoryUsage()
      const renderTime = this.calculateRenderTime()
      const frameDrops = this.calculateFrameDrops()

      this.metrics.push({
        fps,
        memoryUsage,
        renderTime,
        frameDrops,
        timestamp: now,
      })

      // Keep only last 100 measurements
      if (this.metrics.length > 100) {
        this.metrics.shift()
      }

      this.frameCount = 0
      this.lastTime = now
    }

    this.animationId = requestAnimationFrame(() => this.measurePerformance())
  }

  private calculateFPS(): number {
    if (this.metrics.length === 0) return 60
    const recent = this.metrics.slice(-10)
    return recent.reduce((sum, m) => sum + m.fps, 0) / recent.length
  }

  private getMemoryUsage(): number {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      return memory.usedJSHeapSize / (1024 * 1024) // Convert to MB
    }
    return 0
  }

  private calculateRenderTime(): number {
    // Simplified render time calculation
    // In a real implementation, you'd measure actual render times
    return 16 // Assume 60fps = 16ms per frame
  }

  private calculateFrameDrops(): number {
    if (this.metrics.length < 2) return 0

    const recent = this.metrics.slice(-10)
    let drops = 0

    for (let i = 1; i < recent.length; i++) {
      const prev = recent[i - 1]
      const curr = recent[i]
      const timeDiff = curr.timestamp - prev.timestamp

      // If time between frames is > 20ms, consider it a frame drop
      if (timeDiff > 20) {
        drops++
      }
    }

    return drops
  }
}

/**
 * Hook for monitoring animation performance
 */
export function usePerformanceMonitor(budget?: PerformanceBudget) {
  const monitor = new PerformanceMonitor(budget)

  return {
    startMonitoring: () => monitor.startMonitoring(),
    stopMonitoring: () => monitor.stopMonitoring(),
    getCurrentMetrics: () => monitor.getCurrentMetrics(),
    getMetricsHistory: () => monitor.getMetricsHistory(),
    isWithinBudget: () => monitor.isWithinBudget(),
    getAlerts: () => monitor.getAlerts(),
  }
}

/**
 * Performance optimization utilities
 */
export const performanceUtils = {
  /**
   * Debounce function for performance optimization
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  },

  /**
   * Throttle function for performance optimization
   */
  throttle<T extends (...args: any[]) => any>(
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
  },

  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },

  /**
   * Get device performance tier
   */
  getDevicePerformanceTier(): 'high' | 'medium' | 'low' {
    if (typeof window === 'undefined') return 'medium'

    const connection = (navigator as any).connection
    const memory = (performance as any).memory

    // High tier: Good connection and memory
    if (
      (!connection || connection.effectiveType === '4g') &&
      (!memory || memory.jsHeapSizeLimit > 1000000000) // > 1GB
    ) {
      return 'high'
    }

    // Low tier: Poor connection or limited memory
    if (
      connection?.effectiveType === '2g' ||
      (memory && memory.jsHeapSizeLimit < 500000000) // < 500MB
    ) {
      return 'low'
    }

    return 'medium'
  },
}
