/**
 * Performance Monitoring Dashboard
 *
 * Comprehensive performance monitoring and analytics for the BestIT Consulting website
 * Tracks Core Web Vitals, user interactions, and system performance metrics
 */

import { PerformanceMetrics } from './component-api'

export interface PerformanceDashboardConfig {
  enableRealUserMonitoring: boolean
  enableSyntheticMonitoring: boolean
  enableCoreWebVitals: boolean
  enableResourceTiming: boolean
  enableUserTiming: boolean
  enableMemoryMonitoring: boolean
  enableNetworkMonitoring: boolean
  enableAnimationMonitoring: boolean
  reportingInterval: number
  maxMetricsHistory: number
}

export interface PerformanceReport {
  timestamp: number
  metrics: PerformanceMetrics
  userAgent: string
  connectionType: string
  deviceType: string
  viewport: {
    width: number
    height: number
  }
  location: {
    pathname: string
    search: string
    hash: string
  }
  performance: {
    score: number
    grade: 'A' | 'B' | 'C' | 'D' | 'F'
    recommendations: string[]
  }
}

export class PerformanceDashboard {
  private static instance: PerformanceDashboard
  private config: PerformanceDashboardConfig
  private metrics: PerformanceMetrics[] = []
  private observers: PerformanceObserver[] = []
  private isMonitoring = false
  private reportQueue: PerformanceReport[] = []

  private constructor(config: Partial<PerformanceDashboardConfig> = {}) {
    this.config = {
      enableRealUserMonitoring: true,
      enableSyntheticMonitoring: true,
      enableCoreWebVitals: true,
      enableResourceTiming: true,
      enableUserTiming: true,
      enableMemoryMonitoring: true,
      enableNetworkMonitoring: true,
      enableAnimationMonitoring: true,
      reportingInterval: 30000, // 30 seconds
      maxMetricsHistory: 100,
      ...config,
    }
  }

  public static getInstance(
    config?: Partial<PerformanceDashboardConfig>
  ): PerformanceDashboard {
    if (!PerformanceDashboard.instance) {
      PerformanceDashboard.instance = new PerformanceDashboard(config)
    }
    return PerformanceDashboard.instance
  }

  /**
   * Start comprehensive performance monitoring
   */
  public startMonitoring(): void {
    if (this.isMonitoring) return

    this.isMonitoring = true
    console.log('🚀 Performance Dashboard: Starting comprehensive monitoring')

    // Core Web Vitals monitoring
    if (this.config.enableCoreWebVitals) {
      this.observeCoreWebVitals()
    }

    // Resource timing monitoring
    if (this.config.enableResourceTiming) {
      this.observeResourceTiming()
    }

    // User timing monitoring
    if (this.config.enableUserTiming) {
      this.observeUserTiming()
    }

    // Memory monitoring
    if (this.config.enableMemoryMonitoring) {
      this.observeMemoryUsage()
    }

    // Network monitoring
    if (this.config.enableNetworkMonitoring) {
      this.observeNetworkPerformance()
    }

    // Animation monitoring
    if (this.config.enableAnimationMonitoring) {
      this.observeAnimationPerformance()
    }

    // Start periodic reporting
    this.startPeriodicReporting()
  }

  /**
   * Stop performance monitoring
   */
  public stopMonitoring(): void {
    if (!this.isMonitoring) return

    this.isMonitoring = false
    console.log('🛑 Performance Dashboard: Stopping monitoring')

    // Disconnect all observers
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []

    // Send final report
    this.sendFinalReport()
  }

  /**
   * Get current performance metrics
   */
  public getCurrentMetrics(): PerformanceMetrics | null {
    if (this.metrics.length === 0) return null
    return this.metrics[this.metrics.length - 1]
  }

  /**
   * Get performance history
   */
  public getMetricsHistory(): PerformanceMetrics[] {
    return [...this.metrics]
  }

  /**
   * Get performance score and recommendations
   */
  public getPerformanceAnalysis(): {
    score: number
    grade: 'A' | 'B' | 'C' | 'D' | 'F'
    recommendations: string[]
    issues: string[]
  } {
    const currentMetrics = this.getCurrentMetrics()
    if (!currentMetrics) {
      return {
        score: 0,
        grade: 'F',
        recommendations: ['Start monitoring to get performance insights'],
        issues: ['No performance data available'],
      }
    }

    const issues: string[] = []
    const recommendations: string[] = []
    let score = 100

    // FCP analysis
    if (currentMetrics.fcp > 1800) {
      issues.push(`FCP is ${currentMetrics.fcp}ms (target: <1800ms)`)
      recommendations.push(
        'Optimize critical rendering path, reduce server response time'
      )
      score -= 15
    }

    // LCP analysis
    if (currentMetrics.lcp > 2500) {
      issues.push(`LCP is ${currentMetrics.lcp}ms (target: <2500ms)`)
      recommendations.push('Optimize images, lazy load offscreen elements')
      score -= 20
    }

    // CLS analysis
    if (currentMetrics.cls > 0.1) {
      issues.push(`CLS is ${currentMetrics.cls} (target: <0.1)`)
      recommendations.push(
        'Reserve space for dynamic content, avoid layout shifts'
      )
      score -= 15
    }

    // TBT analysis
    if (currentMetrics.tbt > 200) {
      issues.push(`TBT is ${currentMetrics.tbt}ms (target: <200ms)`)
      recommendations.push('Break up long tasks, optimize JavaScript execution')
      score -= 15
    }

    // FID analysis
    if (currentMetrics.fid > 100) {
      issues.push(`FID is ${currentMetrics.fid}ms (target: <100ms)`)
      recommendations.push(
        'Reduce JavaScript bundle size, optimize input handlers'
      )
      score -= 10
    }

    // FPS analysis
    if (currentMetrics.fps < 50) {
      issues.push(`FPS is ${currentMetrics.fps} (target: >50)`)
      recommendations.push(
        'Optimize animations, reduce complex CSS, use GPU acceleration'
      )
      score -= 10
    }

    // Load time analysis
    if (currentMetrics.loadTime > 3000) {
      issues.push(`Load time is ${currentMetrics.loadTime}ms (target: <3000ms)`)
      recommendations.push(
        'Optimize images, reduce bundle size, enable compression'
      )
      score -= 15
    }

    // Determine grade
    let grade: 'A' | 'B' | 'C' | 'D' | 'F'
    if (score >= 90) grade = 'A'
    else if (score >= 80) grade = 'B'
    else if (score >= 70) grade = 'C'
    else if (score >= 60) grade = 'D'
    else grade = 'F'

    return {
      score: Math.max(0, score),
      grade,
      recommendations,
      issues,
    }
  }

  /**
   * Observe Core Web Vitals
   */
  private observeCoreWebVitals(): void {
    if (!('PerformanceObserver' in window)) return

    // FCP and LCP observer
    const paintObserver = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.updateMetric('fcp', entry.startTime)
        }
        if (entry.name === 'largest-contentful-paint') {
          this.updateMetric('lcp', entry.startTime)
        }
      }
    })

    paintObserver.observe({ entryTypes: ['paint', 'largest-contentful-paint'] })
    this.observers.push(paintObserver)

    // CLS observer
    const clsObserver = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (
          entry.entryType === 'layout-shift' &&
          !(entry as any).hadRecentInput
        ) {
          this.updateMetric('cls', (entry as any).value, true)
        }
      }
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })
    this.observers.push(clsObserver)

    // FID observer
    const fidObserver = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'first-input') {
          this.updateMetric('fid', (entry as any).duration)
        }
      }
    })
    fidObserver.observe({ entryTypes: ['first-input'] })
    this.observers.push(fidObserver)

    // Long tasks observer (for TBT)
    const longTaskObserver = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'longtask') {
          this.updateMetric('tbt', (entry as any).duration, true)
        }
      }
    })
    longTaskObserver.observe({ entryTypes: ['longtask'] })
    this.observers.push(longTaskObserver)
  }

  /**
   * Observe resource timing
   */
  private observeResourceTiming(): void {
    if (!('PerformanceObserver' in window)) return

    const resourceObserver = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const resourceEntry = entry as PerformanceResourceTiming
        console.log('📊 Resource loaded:', {
          name: resourceEntry.name,
          duration: resourceEntry.duration,
          size: resourceEntry.transferSize,
          type: resourceEntry.initiatorType,
        })
      }
    })

    resourceObserver.observe({ entryTypes: ['resource'] })
    this.observers.push(resourceObserver)
  }

  /**
   * Observe user timing
   */
  private observeUserTiming(): void {
    if (!('PerformanceObserver' in window)) return

    const userTimingObserver = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        console.log('⏱️ User timing:', {
          name: entry.name,
          duration: entry.duration,
          startTime: entry.startTime,
        })
      }
    })

    userTimingObserver.observe({ entryTypes: ['measure', 'mark'] })
    this.observers.push(userTimingObserver)
  }

  /**
   * Observe memory usage
   */
  private observeMemoryUsage(): void {
    if (!(performance as any).memory) return

    const checkMemory = () => {
      const memory = (performance as any).memory
      this.updateMetric('memoryUsage', memory.usedJSHeapSize / (1024 * 1024)) // Convert to MB
    }

    // Check memory every 5 seconds
    const memoryInterval = setInterval(checkMemory, 5000)

    // Store interval ID for cleanup
    ;(this as any).memoryInterval = memoryInterval
  }

  /**
   * Observe network performance
   */
  private observeNetworkPerformance(): void {
    if (!('connection' in navigator)) return

    const connection = (navigator as any).connection
    if (connection) {
      console.log('🌐 Network info:', {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
      })
    }
  }

  /**
   * Observe animation performance
   */
  private observeAnimationPerformance(): void {
    let frameCount = 0
    let lastTime = performance.now()

    const measureFPS = () => {
      frameCount++
      const now = performance.now()

      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime))
        this.updateMetric('fps', fps)
        frameCount = 0
        lastTime = now
      }

      if (this.isMonitoring) {
        requestAnimationFrame(measureFPS)
      }
    }

    requestAnimationFrame(measureFPS)
  }

  /**
   * Update performance metric
   */
  private updateMetric(
    key: keyof PerformanceMetrics,
    value: number,
    isAccumulative = false
  ): void {
    const currentMetrics = this.getCurrentMetrics() || {
      loadTime: 0,
      fcp: 0,
      lcp: 0,
      cls: 0,
      tbt: 0,
      fid: 0,
      fps: 0,
      memoryUsage: 0,
      scrollLatency: 0,
    }

    if (isAccumulative) {
      currentMetrics[key] = (currentMetrics[key] as number) + value
    } else {
      currentMetrics[key] = value
    }

    this.metrics.push({ ...currentMetrics })

    // Keep only recent metrics
    if (this.metrics.length > this.config.maxMetricsHistory) {
      this.metrics.shift()
    }
  }

  /**
   * Start periodic reporting
   */
  private startPeriodicReporting(): void {
    const reportInterval = setInterval(() => {
      if (this.isMonitoring) {
        this.generateReport()
      } else {
        clearInterval(reportInterval)
      }
    }, this.config.reportingInterval)
  }

  /**
   * Generate performance report
   */
  private generateReport(): void {
    const currentMetrics = this.getCurrentMetrics()
    if (!currentMetrics) return

    const analysis = this.getPerformanceAnalysis()
    const connection = (navigator as any).connection

    const report: PerformanceReport = {
      timestamp: Date.now(),
      metrics: currentMetrics,
      userAgent: navigator.userAgent,
      connectionType: connection?.effectiveType || 'unknown',
      deviceType: this.getDeviceType(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      location: {
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
      },
      performance: {
        score: analysis.score,
        grade: analysis.grade,
        recommendations: analysis.recommendations,
      },
    }

    this.reportQueue.push(report)
    this.sendReport(report)
  }

  /**
   * Send performance report
   */
  private sendReport(report: PerformanceReport): void {
    // Send to analytics service
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag('event', 'performance_report', {
        score: report.performance.score,
        grade: report.performance.grade,
        fcp: report.metrics.fcp,
        lcp: report.metrics.lcp,
        cls: report.metrics.cls,
        tbt: report.metrics.tbt,
        fid: report.metrics.fid,
        fps: report.metrics.fps,
        load_time: report.metrics.loadTime,
        memory_usage: report.metrics.memoryUsage,
        device_type: report.deviceType,
        connection_type: report.connectionType,
      })
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Performance Report:', report)
    }
  }

  /**
   * Send final report
   */
  private sendFinalReport(): void {
    if (this.reportQueue.length > 0) {
      const finalReport = this.reportQueue[this.reportQueue.length - 1]
      this.sendReport(finalReport)
    }
  }

  /**
   * Get device type
   */
  private getDeviceType(): string {
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  /**
   * Get performance dashboard data
   */
  public getDashboardData(): {
    currentMetrics: PerformanceMetrics | null
    analysis: ReturnType<PerformanceDashboard['getPerformanceAnalysis']>
    history: PerformanceMetrics[]
    reports: PerformanceReport[]
  } {
    return {
      currentMetrics: this.getCurrentMetrics(),
      analysis: this.getPerformanceAnalysis(),
      history: this.getMetricsHistory(),
      reports: this.reportQueue,
    }
  }
}

// Export singleton instance
export const performanceDashboard = PerformanceDashboard.getInstance()

// Auto-start monitoring in production
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  performanceDashboard.startMonitoring()
}
