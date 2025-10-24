/**
 * Performance monitoring for animations
 * Tracks and optimizes animation performance across the application
 */

export interface PerformanceMetrics {
  fps: number
  renderTime: number
  memoryUsage: number
  batteryImpact: number
  accessibilityScore: number
  timestamp: string
}

export interface AnimationPerformanceConfig {
  targetFPS: number
  maxRenderTime: number
  maxMemoryUsage: number
  enableBatteryOptimization: boolean
  enableAccessibilityOptimization: boolean
}

// Default performance configuration
export const DEFAULT_PERFORMANCE_CONFIG: AnimationPerformanceConfig = {
  targetFPS: 60,
  maxRenderTime: 16.67, // 60fps = 16.67ms per frame
  maxMemoryUsage: 50 * 1024 * 1024, // 50MB
  enableBatteryOptimization: true,
  enableAccessibilityOptimization: true,
}

// Performance monitoring class
export class AnimationPerformanceMonitor {
  private config: AnimationPerformanceConfig
  private metrics: PerformanceMetrics[] = []
  private observers: Map<string, PerformanceObserver> = new Map()
  private frameCount = 0
  private lastTime = 0
  private isMonitoring = false

  constructor(config: AnimationPerformanceConfig = DEFAULT_PERFORMANCE_CONFIG) {
    this.config = config
  }

  // Start performance monitoring
  startMonitoring(): void {
    if (this.isMonitoring) return

    this.isMonitoring = true
    this.startFPSMonitoring()
    this.startMemoryMonitoring()
    this.startBatteryMonitoring()
  }

  // Stop performance monitoring
  stopMonitoring(): void {
    this.isMonitoring = false
    this.observers.forEach(observer => observer.disconnect())
    this.observers.clear()
  }

  // Start FPS monitoring
  private startFPSMonitoring(): void {
    const measureFPS = (currentTime: number) => {
      if (!this.isMonitoring) return

      this.frameCount++

      if (currentTime - this.lastTime >= 1000) {
        const fps = Math.round(
          (this.frameCount * 1000) / (currentTime - this.lastTime)
        )
        this.recordMetric('fps', fps)

        this.frameCount = 0
        this.lastTime = currentTime
      }

      requestAnimationFrame(measureFPS)
    }

    requestAnimationFrame(measureFPS)
  }

  // Start memory monitoring
  private startMemoryMonitoring(): void {
    if (typeof performance === 'undefined' || !(performance as any).memory) {
      return
    }

    const checkMemory = () => {
      if (!this.isMonitoring) return

      const memory = (performance as any).memory
      const memoryUsage = memory.usedJSHeapSize

      this.recordMetric('memoryUsage', memoryUsage)

      setTimeout(checkMemory, 1000)
    }

    checkMemory()
  }

  // Start battery monitoring
  private startBatteryMonitoring(): void {
    if (typeof navigator === 'undefined' || !('getBattery' in navigator)) {
      return
    }

    navigator
      .getBattery()
      .then((battery: any) => {
        const checkBattery = () => {
          if (!this.isMonitoring) return

          const batteryLevel = battery.level * 100
          this.recordMetric('batteryImpact', 100 - batteryLevel)

          setTimeout(checkBattery, 5000)
        }

        checkBattery()
      })
      .catch(() => {
        // Battery API not supported
      })
  }

  // Record a performance metric
  private recordMetric(key: keyof PerformanceMetrics, value: number): void {
    const metric: PerformanceMetrics = {
      fps: 0,
      renderTime: 0,
      memoryUsage: 0,
      batteryImpact: 0,
      accessibilityScore: 0,
      timestamp: new Date().toISOString(),
      [key]: value,
    }

    this.metrics.push(metric)

    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics.shift()
    }

    // Check for performance issues
    this.checkPerformanceIssues(metric)
  }

  // Check for performance issues
  private checkPerformanceIssues(metric: PerformanceMetrics): void {
    const issues: string[] = []

    if (metric.fps > 0 && metric.fps < this.config.targetFPS) {
      issues.push(`Low FPS: ${metric.fps}`)
    }

    if (metric.memoryUsage > this.config.maxMemoryUsage) {
      issues.push(
        `High memory usage: ${Math.round(metric.memoryUsage / 1024 / 1024)}MB`
      )
    }

    if (metric.batteryImpact > 50) {
      issues.push(`High battery impact: ${metric.batteryImpact}%`)
    }

    if (issues.length > 0) {
      console.warn('Animation performance issues detected:', issues)
      this.onPerformanceIssue(issues, metric)
    }
  }

  // Handle performance issues
  private onPerformanceIssue(
    issues: string[],
    metric: PerformanceMetrics
  ): void {
    // Emit performance issue event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('animation-performance-issue', {
          detail: { issues, metric },
        })
      )
    }
  }

  // Get current performance metrics
  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics]
  }

  // Get average performance metrics
  getAverageMetrics(): Partial<PerformanceMetrics> {
    if (this.metrics.length === 0) return {}

    const averages = this.metrics.reduce(
      (acc, metric) => {
        Object.keys(metric).forEach(key => {
          if (
            key !== 'timestamp' &&
            typeof metric[key as keyof PerformanceMetrics] === 'number'
          ) {
            acc[key] =
              (acc[key] || 0) +
              (metric[key as keyof PerformanceMetrics] as number)
          }
        })
        return acc
      },
      {} as Record<string, number>
    )

    Object.keys(averages).forEach(key => {
      averages[key] = averages[key] / this.metrics.length
    })

    return averages
  }

  // Get performance score (0-100)
  getPerformanceScore(): number {
    const averages = this.getAverageMetrics()
    let score = 100

    // FPS score
    if (averages.fps) {
      const fpsScore = Math.min(
        100,
        (averages.fps / this.config.targetFPS) * 100
      )
      score = Math.min(score, fpsScore)
    }

    // Memory score
    if (averages.memoryUsage) {
      const memoryScore = Math.max(
        0,
        100 - (averages.memoryUsage / this.config.maxMemoryUsage) * 100
      )
      score = Math.min(score, memoryScore)
    }

    // Battery score
    if (averages.batteryImpact) {
      const batteryScore = Math.max(0, 100 - averages.batteryImpact)
      score = Math.min(score, batteryScore)
    }

    return Math.round(score)
  }

  // Clear metrics
  clearMetrics(): void {
    this.metrics = []
  }
}

// Global performance monitor instance
export const performanceMonitor = new AnimationPerformanceMonitor()

// Performance optimization utilities
export function optimizeForPerformance(
  baseConfig: any,
  performanceScore: number
): any {
  if (performanceScore >= 80) {
    return baseConfig
  }

  if (performanceScore >= 60) {
    return {
      ...baseConfig,
      duration: Math.min(baseConfig.duration || 0.6, 0.4),
      stagger: Math.min(baseConfig.stagger || 100, 50),
    }
  }

  if (performanceScore >= 40) {
    return {
      ...baseConfig,
      duration: Math.min(baseConfig.duration || 0.6, 0.3),
      stagger: Math.min(baseConfig.stagger || 100, 25),
      easing: 'linear',
    }
  }

  // Very low performance - minimal animations
  return {
    ...baseConfig,
    duration: 0.1,
    stagger: 0,
    easing: 'linear',
    disableComplexAnimations: true,
  }
}

// Performance-aware animation configuration
export function getPerformanceAwareConfig(
  baseConfig: any,
  options: {
    enableOptimization?: boolean
    targetFPS?: number
    maxMemoryUsage?: number
  } = {}
): any {
  const {
    enableOptimization = true,
    targetFPS = 60,
    maxMemoryUsage = 50 * 1024 * 1024,
  } = options

  if (!enableOptimization) {
    return baseConfig
  }

  const performanceScore = performanceMonitor.getPerformanceScore()
  return optimizeForPerformance(baseConfig, performanceScore)
}

// Performance monitoring hooks
export function usePerformanceMonitoring(
  componentId: string,
  options: {
    enableMonitoring?: boolean
    onPerformanceIssue?: (issues: string[], metric: PerformanceMetrics) => void
  } = {}
) {
  const { enableMonitoring = true, onPerformanceIssue } = options

  if (enableMonitoring && typeof window !== 'undefined') {
    const handlePerformanceIssue = (event: CustomEvent) => {
      onPerformanceIssue?.(event.detail.issues, event.detail.metric)
    }

    window.addEventListener(
      'animation-performance-issue',
      handlePerformanceIssue as EventListener
    )

    return () => {
      window.removeEventListener(
        'animation-performance-issue',
        handlePerformanceIssue as EventListener
      )
    }
  }

  return () => {}
}

// Performance reporting
export function reportPerformanceMetrics(
  componentId: string,
  metrics: PerformanceMetrics
): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('animation-performance-report', {
        detail: { componentId, metrics },
      })
    )
  }
}
