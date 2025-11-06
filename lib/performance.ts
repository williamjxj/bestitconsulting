/**
 * Performance Monitoring and Optimization
 *
 * Utilities for monitoring animation performance and optimizing
 * for smooth 60fps animations across all devices.
 */

// Performance monitoring utilities
export const monitorAnimationPerformance = (
  element: HTMLElement,
  animationName: string
) => {
  const startTime = performance.now()

  const observer = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'measure' && entry.name.includes(animationName)) {
        const duration = entry.duration
        const fps = 1000 / duration

        console.log(
          `Animation "${animationName}": ${duration.toFixed(2)}ms (${fps.toFixed(1)}fps)`
        )

        // Warn if performance is below 60fps
        if (fps < 60) {
          console.warn(
            `Animation "${animationName}" performance below 60fps: ${fps.toFixed(1)}fps`
          )
        }

        // Track performance metrics
        trackPerformanceMetrics(animationName, duration, fps)
      }
    }
  })

  observer.observe({ entryTypes: ['measure'] })

  return () => {
    observer.disconnect()
    const endTime = performance.now()
    performance.mark(`${animationName}-end`)
    performance.measure(
      animationName,
      `${animationName}-start`,
      `${animationName}-end`
    )
  }
}

// Track performance metrics
const performanceMetrics: Record<
  string,
  { duration: number; fps: number; count: number }
> = {}

export const trackPerformanceMetrics = (
  animationName: string,
  duration: number,
  fps: number
) => {
  if (!performanceMetrics[animationName]) {
    performanceMetrics[animationName] = { duration: 0, fps: 0, count: 0 }
  }

  const metrics = performanceMetrics[animationName]
  metrics.duration =
    (metrics.duration * metrics.count + duration) / (metrics.count + 1)
  metrics.fps = (metrics.fps * metrics.count + fps) / (metrics.count + 1)
  metrics.count++
}

// Get performance metrics
export const getPerformanceMetrics = () => performanceMetrics

// Clear performance metrics
export const clearPerformanceMetrics = () => {
  Object.keys(performanceMetrics).forEach(key => {
    delete performanceMetrics[key]
  })
}

// Performance optimization utilities
export const optimizeForPerformance = (config: any) => {
  // Reduce animation duration for better performance
  const optimizedConfig = { ...config }

  if (optimizedConfig.duration > 800) {
    optimizedConfig.duration = 800
  }

  // Use GPU-accelerated properties
  if (optimizedConfig.transform) {
    optimizedConfig.willChange = 'transform, opacity'
  }

  return optimizedConfig
}

// Check if device can handle complex animations
export const canHandleComplexAnimations = (): boolean => {
  // Check for hardware acceleration support
  const canvas = document.createElement('canvas')
  const gl =
    canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

  if (!gl) return false

  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false
  }

  // Check for low-end device indicators
  const memory = (navigator as any).deviceMemory
  if (memory && memory < 4) {
    return false
  }

  // Check for slow connection
  const connection = (navigator as any).connection
  if (connection && connection.effectiveType === 'slow-2g') {
    return false
  }

  return true
}

// Get appropriate animation complexity based on device capabilities
export const getAnimationComplexity = (): 'low' | 'medium' | 'high' => {
  if (!canHandleComplexAnimations()) {
    return 'low'
  }

  const memory = (navigator as any).deviceMemory
  if (memory && memory < 8) {
    return 'medium'
  }

  return 'high'
}

// Performance-optimized animation variants
export const getPerformanceOptimizedVariants = (
  complexity: 'low' | 'medium' | 'high'
) => {
  const baseVariants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
    },
    slideIn: {
      initial: { x: -20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: 0.3 },
    },
    scaleIn: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.3 },
    },
  }

  if (complexity === 'low') {
    return {
      ...baseVariants,
      staggerContainer: {
        animate: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
          },
        },
      },
      staggerItem: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
      },
    }
  }

  if (complexity === 'medium') {
    return {
      ...baseVariants,
      staggerContainer: {
        animate: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
          },
        },
      },
      staggerItem: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.4 },
      },
    }
  }

  // High complexity - full animations
  return {
    ...baseVariants,
    staggerContainer: {
      animate: {
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.15,
        },
      },
    },
    staggerItem: {
      initial: { y: 40, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.6 },
    },
  }
}

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
      usage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
    }
  }
  return null
}

// Frame rate monitoring
export const monitorFrameRate = (callback: (fps: number) => void) => {
  let lastTime = performance.now()
  let frameCount = 0

  const measureFrameRate = () => {
    frameCount++
    const currentTime = performance.now()

    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
      callback(fps)

      frameCount = 0
      lastTime = currentTime
    }

    requestAnimationFrame(measureFrameRate)
  }

  requestAnimationFrame(measureFrameRate)
}

// Animation throttling for low-end devices
export const throttleAnimations = (
  element: HTMLElement,
  threshold: number = 16.67
) => {
  let lastTime = 0

  const throttledAnimation = (callback: () => void) => {
    const currentTime = performance.now()

    if (currentTime - lastTime >= threshold) {
      callback()
      lastTime = currentTime
    }
  }

  return throttledAnimation
}

// Lazy loading for animations
export const lazyLoadAnimations = (
  element: HTMLElement,
  animationCallback: () => void
) => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animationCallback()
          observer.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '50px' }
  )

  observer.observe(element)

  return () => observer.disconnect()
}

// Preload critical animations
export const preloadCriticalAnimations = () => {
  // Preload animation styles
  const style = document.createElement('style')
  style.textContent = `
    .preload-animations {
      will-change: transform, opacity;
      transform: translateZ(0);
    }
  `
  document.head.appendChild(style)

  // Remove after animations are loaded
  setTimeout(() => {
    document.head.removeChild(style)
  }, 1000)
}

// Performance budget monitoring
export const monitorPerformanceBudget = (budget: {
  maxDuration: number
  maxFPS: number
  maxMemory: number
}) => {
  const violations: string[] = []

  // Check animation duration
  Object.entries(getPerformanceMetrics()).forEach(([name, metrics]) => {
    if (metrics.duration > budget.maxDuration) {
      violations.push(
        `Animation "${name}" exceeds duration budget: ${metrics.duration}ms > ${budget.maxDuration}ms`
      )
    }

    if (metrics.fps < budget.maxFPS) {
      violations.push(
        `Animation "${name}" below FPS budget: ${metrics.fps}fps < ${budget.maxFPS}fps`
      )
    }
  })

  // Check memory usage
  const memory = monitorMemoryUsage()
  if (memory && memory.usage > budget.maxMemory) {
    violations.push(
      `Memory usage exceeds budget: ${memory.usage.toFixed(1)}% > ${budget.maxMemory}%`
    )
  }

  return violations
}

// Performance optimization recommendations
export const getOptimizationRecommendations = () => {
  const recommendations: string[] = []
  const metrics = getPerformanceMetrics()
  const memory = monitorMemoryUsage()

  // Check for performance issues
  Object.entries(metrics).forEach(([name, metrics]) => {
    if (metrics.fps < 60) {
      recommendations.push(
        `Optimize animation "${name}": reduce complexity or duration`
      )
    }

    if (metrics.duration > 800) {
      recommendations.push(
        `Reduce duration for animation "${name}": ${metrics.duration}ms is too long`
      )
    }
  })

  // Check memory usage
  if (memory && memory.usage > 80) {
    recommendations.push(
      'High memory usage detected: consider reducing animation complexity'
    )
  }

  // Check for too many simultaneous animations
  const activeAnimations = document.querySelectorAll(
    '[data-animating="true"]'
  ).length
  if (activeAnimations > 10) {
    recommendations.push(
      'Too many simultaneous animations: consider staggering or reducing count'
    )
  }

  return recommendations
}

// Performance testing utilities
export const testPerformance = async (testFunction: () => void) => {
  const startTime = performance.now()
  const startMemory = monitorMemoryUsage()

  testFunction()

  const endTime = performance.now()
  const endMemory = monitorMemoryUsage()

  return {
    duration: endTime - startTime,
    memoryDelta:
      startMemory && endMemory ? endMemory.used - startMemory.used : 0,
    fps: 1000 / (endTime - startTime),
  }
}
