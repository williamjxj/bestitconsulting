/**
 * Performance Testing Utilities
 *
 * Comprehensive performance testing suite for the BestIT Consulting website
 * Includes synthetic testing, regression testing, and performance benchmarking
 */

import { PerformanceMetrics } from './component-api'

export interface PerformanceTestConfig {
  timeout: number
  retries: number
  thresholds: {
    fcp: number
    lcp: number
    cls: number
    tbt: number
    fid: number
    fps: number
    loadTime: number
    memoryUsage: number
  }
  networkConditions: {
    slow: number
    fast: number
    offline: boolean
  }
  viewportSizes: Array<{ width: number; height: number; name: string }>
}

export interface PerformanceTestResult {
  testName: string
  passed: boolean
  score: number
  metrics: PerformanceMetrics
  violations: string[]
  recommendations: string[]
  duration: number
  timestamp: number
}

export interface PerformanceTestSuite {
  name: string
  tests: PerformanceTestResult[]
  overallScore: number
  passed: boolean
  duration: number
}

export class PerformanceTester {
  private config: PerformanceTestConfig
  private observers: PerformanceObserver[] = []

  constructor(config: Partial<PerformanceTestConfig> = {}) {
    this.config = {
      timeout: 30000,
      retries: 3,
      thresholds: {
        fcp: 1800,
        lcp: 2500,
        cls: 0.1,
        tbt: 200,
        fid: 100,
        fps: 50,
        loadTime: 3000,
        memoryUsage: 100,
      },
      networkConditions: {
        slow: 0.5,
        fast: 10,
        offline: false,
      },
      viewportSizes: [
        { width: 375, height: 667, name: 'mobile' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 1920, height: 1080, name: 'desktop' },
      ],
      ...config,
    }
  }

  /**
   * Run comprehensive performance test suite
   */
  async runTestSuite(): Promise<PerformanceTestSuite> {
    const startTime = performance.now()
    const tests: PerformanceTestResult[] = []

    console.log('🚀 Starting Performance Test Suite...')

    // Core Web Vitals tests
    tests.push(await this.testCoreWebVitals())
    tests.push(await this.testResourceLoading())
    tests.push(await this.testAnimationPerformance())
    tests.push(await this.testMemoryUsage())
    tests.push(await this.testNetworkPerformance())
    tests.push(await this.testAccessibilityPerformance())

    // Viewport-specific tests
    for (const viewport of this.config.viewportSizes) {
      tests.push(await this.testViewportPerformance(viewport))
    }

    const duration = performance.now() - startTime
    const overallScore = this.calculateOverallScore(tests)
    const passed = tests.every(test => test.passed)

    const suite: PerformanceTestSuite = {
      name: 'Performance Test Suite',
      tests,
      overallScore,
      passed,
      duration,
    }

    console.log('✅ Performance Test Suite Complete:', suite)
    return suite
  }

  /**
   * Test Core Web Vitals
   */
  async testCoreWebVitals(): Promise<PerformanceTestResult> {
    const startTime = performance.now()
    const testName = 'Core Web Vitals'

    try {
      const metrics = await this.measureCoreWebVitals()
      const violations: string[] = []
      const recommendations: string[] = []

      // FCP test
      if (metrics.fcp > this.config.thresholds.fcp) {
        violations.push(
          `FCP is ${metrics.fcp}ms (threshold: ${this.config.thresholds.fcp}ms)`
        )
        recommendations.push(
          'Optimize critical rendering path, reduce server response time'
        )
      }

      // LCP test
      if (metrics.lcp > this.config.thresholds.lcp) {
        violations.push(
          `LCP is ${metrics.lcp}ms (threshold: ${this.config.thresholds.lcp}ms)`
        )
        recommendations.push('Optimize images, lazy load offscreen elements')
      }

      // CLS test
      if (metrics.cls > this.config.thresholds.cls) {
        violations.push(
          `CLS is ${metrics.cls} (threshold: ${this.config.thresholds.cls})`
        )
        recommendations.push(
          'Reserve space for dynamic content, avoid layout shifts'
        )
      }

      // TBT test
      if (metrics.tbt > this.config.thresholds.tbt) {
        violations.push(
          `TBT is ${metrics.tbt}ms (threshold: ${this.config.thresholds.tbt}ms)`
        )
        recommendations.push(
          'Break up long tasks, optimize JavaScript execution'
        )
      }

      // FID test
      if (metrics.fid > this.config.thresholds.fid) {
        violations.push(
          `FID is ${metrics.fid}ms (threshold: ${this.config.thresholds.fid}ms)`
        )
        recommendations.push(
          'Reduce JavaScript bundle size, optimize input handlers'
        )
      }

      const passed = violations.length === 0
      const score = this.calculateTestScore(metrics, this.config.thresholds)

      return {
        testName,
        passed,
        score,
        metrics,
        violations,
        recommendations,
        duration: performance.now() - startTime,
        timestamp: Date.now(),
      }
    } catch (error) {
      console.error('❌ Core Web Vitals test failed:', error)
      return this.createFailedTest(testName, startTime, error as Error)
    }
  }

  /**
   * Test resource loading performance
   */
  async testResourceLoading(): Promise<PerformanceTestResult> {
    const startTime = performance.now()
    const testName = 'Resource Loading'

    try {
      const metrics = await this.measureResourceLoading()
      const violations: string[] = []
      const recommendations: string[] = []

      // Check for slow resources
      const slowResources =
        metrics.resources?.filter(r => r.duration > 1000) || []
      if (slowResources.length > 0) {
        violations.push(
          `${slowResources.length} resources took longer than 1s to load`
        )
        recommendations.push(
          'Optimize resource loading, implement lazy loading'
        )
      }

      // Check for large resources
      const largeResources =
        metrics.resources?.filter(r => r.size > 1024 * 1024) || [] // 1MB
      if (largeResources.length > 0) {
        violations.push(
          `${largeResources.length} resources are larger than 1MB`
        )
        recommendations.push(
          'Compress images, optimize assets, use modern formats'
        )
      }

      const passed = violations.length === 0
      const score = this.calculateResourceScore(metrics)

      return {
        testName,
        passed,
        score,
        metrics: {
          loadTime: metrics.loadTime,
          fcp: metrics.fcp,
          lcp: metrics.lcp,
          cls: metrics.cls,
          tbt: metrics.tbt,
          fid: metrics.fid,
          fps: metrics.fps,
          memoryUsage: metrics.memoryUsage,
          scrollLatency: metrics.scrollLatency,
        },
        violations,
        recommendations,
        duration: performance.now() - startTime,
        timestamp: Date.now(),
      }
    } catch (error) {
      console.error('❌ Resource loading test failed:', error)
      return this.createFailedTest(testName, startTime, error as Error)
    }
  }

  /**
   * Test animation performance
   */
  async testAnimationPerformance(): Promise<PerformanceTestResult> {
    const startTime = performance.now()
    const testName = 'Animation Performance'

    try {
      const metrics = await this.measureAnimationPerformance()
      const violations: string[] = []
      const recommendations: string[] = []

      // FPS test
      if (metrics.fps < this.config.thresholds.fps) {
        violations.push(
          `FPS is ${metrics.fps} (threshold: ${this.config.thresholds.fps})`
        )
        recommendations.push(
          'Optimize animations, reduce complex CSS, use GPU acceleration'
        )
      }

      // Check for janky animations
      if (metrics.animationJank && metrics.animationJank > 0.1) {
        violations.push(`Animation jank detected: ${metrics.animationJank}`)
        recommendations.push(
          'Use transform and opacity for animations, avoid layout thrashing'
        )
      }

      const passed = violations.length === 0
      const score = this.calculateAnimationScore(metrics)

      return {
        testName,
        passed,
        score,
        metrics: {
          loadTime: metrics.loadTime,
          fcp: metrics.fcp,
          lcp: metrics.lcp,
          cls: metrics.cls,
          tbt: metrics.tbt,
          fid: metrics.fid,
          fps: metrics.fps,
          memoryUsage: metrics.memoryUsage,
          scrollLatency: metrics.scrollLatency,
        },
        violations,
        recommendations,
        duration: performance.now() - startTime,
        timestamp: Date.now(),
      }
    } catch (error) {
      console.error('❌ Animation performance test failed:', error)
      return this.createFailedTest(testName, startTime, error as Error)
    }
  }

  /**
   * Test memory usage
   */
  async testMemoryUsage(): Promise<PerformanceTestResult> {
    const startTime = performance.now()
    const testName = 'Memory Usage'

    try {
      const metrics = await this.measureMemoryUsage()
      const violations: string[] = []
      const recommendations: string[] = []

      // Memory usage test
      if (metrics.memoryUsage > this.config.thresholds.memoryUsage) {
        violations.push(
          `Memory usage is ${metrics.memoryUsage}MB (threshold: ${this.config.thresholds.memoryUsage}MB)`
        )
        recommendations.push(
          'Optimize memory usage, implement cleanup, reduce bundle size'
        )
      }

      // Check for memory leaks
      if (metrics.memoryLeak && metrics.memoryLeak > 0.1) {
        violations.push(`Potential memory leak detected: ${metrics.memoryLeak}`)
        recommendations.push(
          'Review event listeners, clean up subscriptions, check for circular references'
        )
      }

      const passed = violations.length === 0
      const score = this.calculateMemoryScore(metrics)

      return {
        testName,
        passed,
        score,
        metrics: {
          loadTime: metrics.loadTime,
          fcp: metrics.fcp,
          lcp: metrics.lcp,
          cls: metrics.cls,
          tbt: metrics.tbt,
          fid: metrics.fid,
          fps: metrics.fps,
          memoryUsage: metrics.memoryUsage,
          scrollLatency: metrics.scrollLatency,
        },
        violations,
        recommendations,
        duration: performance.now() - startTime,
        timestamp: Date.now(),
      }
    } catch (error) {
      console.error('❌ Memory usage test failed:', error)
      return this.createFailedTest(testName, startTime, error as Error)
    }
  }

  /**
   * Test network performance
   */
  async testNetworkPerformance(): Promise<PerformanceTestResult> {
    const startTime = performance.now()
    const testName = 'Network Performance'

    try {
      const metrics = await this.measureNetworkPerformance()
      const violations: string[] = []
      const recommendations: string[] = []

      // Network latency test
      if (metrics.networkLatency && metrics.networkLatency > 1000) {
        violations.push(
          `Network latency is ${metrics.networkLatency}ms (threshold: 1000ms)`
        )
        recommendations.push(
          'Optimize network requests, implement caching, use CDN'
        )
      }

      // Connection speed test
      if (metrics.connectionSpeed && metrics.connectionSpeed < 1) {
        violations.push(
          `Connection speed is ${metrics.connectionSpeed}Mbps (threshold: 1Mbps)`
        )
        recommendations.push(
          'Optimize for slow connections, implement progressive loading'
        )
      }

      const passed = violations.length === 0
      const score = this.calculateNetworkScore(metrics)

      return {
        testName,
        passed,
        score,
        metrics: {
          loadTime: metrics.loadTime,
          fcp: metrics.fcp,
          lcp: metrics.lcp,
          cls: metrics.cls,
          tbt: metrics.tbt,
          fid: metrics.fid,
          fps: metrics.fps,
          memoryUsage: metrics.memoryUsage,
          scrollLatency: metrics.scrollLatency,
        },
        violations,
        recommendations,
        duration: performance.now() - startTime,
        timestamp: Date.now(),
      }
    } catch (error) {
      console.error('❌ Network performance test failed:', error)
      return this.createFailedTest(testName, startTime, error as Error)
    }
  }

  /**
   * Test accessibility performance
   */
  async testAccessibilityPerformance(): Promise<PerformanceTestResult> {
    const startTime = performance.now()
    const testName = 'Accessibility Performance'

    try {
      const metrics = await this.measureAccessibilityPerformance()
      const violations: string[] = []
      const recommendations: string[] = []

      // Screen reader performance test
      if (metrics.screenReaderLatency && metrics.screenReaderLatency > 500) {
        violations.push(
          `Screen reader latency is ${metrics.screenReaderLatency}ms (threshold: 500ms)`
        )
        recommendations.push('Optimize ARIA attributes, reduce DOM complexity')
      }

      // Keyboard navigation test
      if (metrics.keyboardLatency && metrics.keyboardLatency > 100) {
        violations.push(
          `Keyboard navigation latency is ${metrics.keyboardLatency}ms (threshold: 100ms)`
        )
        recommendations.push(
          'Optimize focus management, reduce event handler complexity'
        )
      }

      const passed = violations.length === 0
      const score = this.calculateAccessibilityScore(metrics)

      return {
        testName,
        passed,
        score,
        metrics: {
          loadTime: metrics.loadTime,
          fcp: metrics.fcp,
          lcp: metrics.lcp,
          cls: metrics.cls,
          tbt: metrics.tbt,
          fid: metrics.fid,
          fps: metrics.fps,
          memoryUsage: metrics.memoryUsage,
          scrollLatency: metrics.scrollLatency,
        },
        violations,
        recommendations,
        duration: performance.now() - startTime,
        timestamp: Date.now(),
      }
    } catch (error) {
      console.error('❌ Accessibility performance test failed:', error)
      return this.createFailedTest(testName, startTime, error as Error)
    }
  }

  /**
   * Test viewport-specific performance
   */
  async testViewportPerformance(viewport: {
    width: number
    height: number
    name: string
  }): Promise<PerformanceTestResult> {
    const startTime = performance.now()
    const testName = `Viewport Performance (${viewport.name})`

    try {
      // Set viewport size
      window.resizeTo(viewport.width, viewport.height)

      // Wait for resize to complete
      await new Promise(resolve => setTimeout(resolve, 100))

      const metrics = await this.measureCoreWebVitals()
      const violations: string[] = []
      const recommendations: string[] = []

      // Viewport-specific thresholds
      const viewportThresholds = {
        mobile: { fcp: 2000, lcp: 3000 },
        tablet: { fcp: 1900, lcp: 2800 },
        desktop: { fcp: 1800, lcp: 2500 },
      }

      const thresholds =
        viewportThresholds[viewport.name as keyof typeof viewportThresholds] ||
        viewportThresholds.desktop

      if (metrics.fcp > thresholds.fcp) {
        violations.push(
          `FCP is ${metrics.fcp}ms (${viewport.name} threshold: ${thresholds.fcp}ms)`
        )
        recommendations.push(
          `Optimize for ${viewport.name} viewport, reduce critical resources`
        )
      }

      if (metrics.lcp > thresholds.lcp) {
        violations.push(
          `LCP is ${metrics.lcp}ms (${viewport.name} threshold: ${thresholds.lcp}ms)`
        )
        recommendations.push(`Optimize images for ${viewport.name} viewport`)
      }

      const passed = violations.length === 0
      const score = this.calculateTestScore(metrics, {
        ...this.config.thresholds,
        ...thresholds,
      })

      return {
        testName,
        passed,
        score,
        metrics,
        violations,
        recommendations,
        duration: performance.now() - startTime,
        timestamp: Date.now(),
      }
    } catch (error) {
      console.error(
        `❌ Viewport performance test failed (${viewport.name}):`,
        error
      )
      return this.createFailedTest(testName, startTime, error as Error)
    }
  }

  /**
   * Measure Core Web Vitals
   */
  private async measureCoreWebVitals(): Promise<PerformanceMetrics> {
    return new Promise(resolve => {
      const metrics: PerformanceMetrics = {
        loadTime: performance.now(),
        fcp: 0,
        lcp: 0,
        cls: 0,
        tbt: 0,
        fid: 0,
        fps: 0,
        memoryUsage: 0,
        scrollLatency: 0,
      }

      // FCP and LCP observer
      const paintObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            metrics.fcp = entry.startTime
          }
          if (entry.name === 'largest-contentful-paint') {
            metrics.lcp = entry.startTime
          }
        }
      })

      paintObserver.observe({
        entryTypes: ['paint', 'largest-contentful-paint'],
      })
      this.observers.push(paintObserver)

      // CLS observer
      const clsObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (
            entry.entryType === 'layout-shift' &&
            !(entry as any).hadRecentInput
          ) {
            metrics.cls += (entry as any).value
          }
        }
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      this.observers.push(clsObserver)

      // FID observer
      const fidObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'first-input') {
            metrics.fid = (entry as any).duration
          }
        }
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
      this.observers.push(fidObserver)

      // Long tasks observer (for TBT)
      const longTaskObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'longtask') {
            metrics.tbt += (entry as any).duration
          }
        }
      })
      longTaskObserver.observe({ entryTypes: ['longtask'] })
      this.observers.push(longTaskObserver)

      // FPS monitoring
      let frameCount = 0
      let lastTime = performance.now()

      const measureFPS = () => {
        frameCount++
        const now = performance.now()

        if (now - lastTime >= 1000) {
          metrics.fps = Math.round((frameCount * 1000) / (now - lastTime))
          frameCount = 0
          lastTime = now
        }

        if (frameCount < 100) {
          // Stop after 100 frames
          requestAnimationFrame(measureFPS)
        } else {
          resolve(metrics)
        }
      }

      requestAnimationFrame(measureFPS)

      // Memory usage
      if ((performance as any).memory) {
        metrics.memoryUsage =
          (performance as any).memory.usedJSHeapSize / (1024 * 1024)
      }

      // Timeout fallback
      setTimeout(() => {
        resolve(metrics)
      }, this.config.timeout)
    })
  }

  /**
   * Measure resource loading performance
   */
  private async measureResourceLoading(): Promise<
    PerformanceMetrics & { resources?: any[] }
  > {
    const metrics = await this.measureCoreWebVitals()
    const resources: any[] = []

    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          const resourceEntry = entry as PerformanceResourceTiming
          resources.push({
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

    return { ...metrics, resources }
  }

  /**
   * Measure animation performance
   */
  private async measureAnimationPerformance(): Promise<
    PerformanceMetrics & { animationJank?: number }
  > {
    const metrics = await this.measureCoreWebVitals()
    let animationJank = 0

    // Measure animation jank
    let lastFrameTime = performance.now()
    let jankCount = 0
    let frameCount = 0

    const measureJank = () => {
      const currentTime = performance.now()
      const deltaTime = currentTime - lastFrameTime

      if (deltaTime > 16.67) {
        // More than one frame (60fps)
        jankCount++
      }

      frameCount++
      lastFrameTime = currentTime

      if (frameCount < 100) {
        requestAnimationFrame(measureJank)
      } else {
        animationJank = jankCount / frameCount
      }
    }

    requestAnimationFrame(measureJank)

    return { ...metrics, animationJank }
  }

  /**
   * Measure memory usage
   */
  private async measureMemoryUsage(): Promise<
    PerformanceMetrics & { memoryLeak?: number }
  > {
    const metrics = await this.measureCoreWebVitals()
    let memoryLeak = 0

    if ((performance as any).memory) {
      const initialMemory = (performance as any).memory.usedJSHeapSize

      // Wait and measure again
      await new Promise(resolve => setTimeout(resolve, 1000))

      const finalMemory = (performance as any).memory.usedJSHeapSize
      memoryLeak = (finalMemory - initialMemory) / (1024 * 1024) // MB
    }

    return { ...metrics, memoryLeak }
  }

  /**
   * Measure network performance
   */
  private async measureNetworkPerformance(): Promise<
    PerformanceMetrics & { networkLatency?: number; connectionSpeed?: number }
  > {
    const metrics = await this.measureCoreWebVitals()
    let networkLatency = 0
    let connectionSpeed = 0

    // Measure network latency
    const startTime = performance.now()
    try {
      await fetch('/api/health', { method: 'HEAD' })
      networkLatency = performance.now() - startTime
    } catch (error) {
      console.warn('Network latency test failed:', error)
    }

    // Get connection speed
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      connectionSpeed = connection.downlink || 0
    }

    return { ...metrics, networkLatency, connectionSpeed }
  }

  /**
   * Measure accessibility performance
   */
  private async measureAccessibilityPerformance(): Promise<
    PerformanceMetrics & {
      screenReaderLatency?: number
      keyboardLatency?: number
    }
  > {
    const metrics = await this.measureCoreWebVitals()
    let screenReaderLatency = 0
    let keyboardLatency = 0

    // Measure screen reader latency (simplified)
    const startTime = performance.now()
    const testElement = document.createElement('div')
    testElement.setAttribute('aria-label', 'test')
    testElement.style.position = 'absolute'
    testElement.style.left = '-9999px'
    document.body.appendChild(testElement)

    // Simulate screen reader processing
    await new Promise(resolve => setTimeout(resolve, 100))
    screenReaderLatency = performance.now() - startTime

    document.body.removeChild(testElement)

    // Measure keyboard latency
    const keyboardStartTime = performance.now()
    const keyboardEvent = new KeyboardEvent('keydown', { key: 'Tab' })
    document.dispatchEvent(keyboardEvent)
    keyboardLatency = performance.now() - keyboardStartTime

    return { ...metrics, screenReaderLatency, keyboardLatency }
  }

  /**
   * Calculate test score
   */
  private calculateTestScore(
    metrics: PerformanceMetrics,
    thresholds: any
  ): number {
    let score = 100

    if (metrics.fcp > thresholds.fcp) score -= 15
    if (metrics.lcp > thresholds.lcp) score -= 20
    if (metrics.cls > thresholds.cls) score -= 15
    if (metrics.tbt > thresholds.tbt) score -= 15
    if (metrics.fid > thresholds.fid) score -= 10
    if (metrics.fps < thresholds.fps) score -= 10
    if (metrics.loadTime > thresholds.loadTime) score -= 15

    return Math.max(0, score)
  }

  /**
   * Calculate resource score
   */
  private calculateResourceScore(metrics: any): number {
    let score = 100

    if (metrics.resources) {
      const slowResources = metrics.resources.filter(
        (r: any) => r.duration > 1000
      )
      const largeResources = metrics.resources.filter(
        (r: any) => r.size > 1024 * 1024
      )

      score -= slowResources.length * 5
      score -= largeResources.length * 10
    }

    return Math.max(0, score)
  }

  /**
   * Calculate animation score
   */
  private calculateAnimationScore(metrics: any): number {
    let score = 100

    if (metrics.fps < this.config.thresholds.fps) score -= 20
    if (metrics.animationJank > 0.1) score -= 30

    return Math.max(0, score)
  }

  /**
   * Calculate memory score
   */
  private calculateMemoryScore(metrics: any): number {
    let score = 100

    if (metrics.memoryUsage > this.config.thresholds.memoryUsage) score -= 30
    if (metrics.memoryLeak > 0.1) score -= 40

    return Math.max(0, score)
  }

  /**
   * Calculate network score
   */
  private calculateNetworkScore(metrics: any): number {
    let score = 100

    if (metrics.networkLatency > 1000) score -= 25
    if (metrics.connectionSpeed < 1) score -= 15

    return Math.max(0, score)
  }

  /**
   * Calculate accessibility score
   */
  private calculateAccessibilityScore(metrics: any): number {
    let score = 100

    if (metrics.screenReaderLatency > 500) score -= 30
    if (metrics.keyboardLatency > 100) score -= 20

    return Math.max(0, score)
  }

  /**
   * Calculate overall score
   */
  private calculateOverallScore(tests: PerformanceTestResult[]): number {
    if (tests.length === 0) return 0

    const totalScore = tests.reduce((sum, test) => sum + test.score, 0)
    return Math.round(totalScore / tests.length)
  }

  /**
   * Create failed test result
   */
  private createFailedTest(
    testName: string,
    startTime: number,
    error: Error
  ): PerformanceTestResult {
    return {
      testName,
      passed: false,
      score: 0,
      metrics: {
        loadTime: 0,
        fcp: 0,
        lcp: 0,
        cls: 0,
        tbt: 0,
        fid: 0,
        fps: 0,
        memoryUsage: 0,
        scrollLatency: 0,
      },
      violations: [`Test failed: ${error.message}`],
      recommendations: ['Fix the underlying issue and retry the test'],
      duration: performance.now() - startTime,
      timestamp: Date.now(),
    }
  }

  /**
   * Cleanup observers
   */
  public cleanup(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Export singleton instance
export const performanceTester = new PerformanceTester()

// Auto-run tests in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Run tests after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceTester.runTestSuite().then(suite => {
        console.log('🎯 Performance Test Results:', suite)
      })
    }, 2000)
  })
}
