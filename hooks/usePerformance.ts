/**
 * Performance monitoring hooks
 * React hooks for monitoring and optimizing performance
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  PerformanceMonitor,
  PerformanceMetrics,
  PerformanceBudget,
} from '../lib/performance'
import { UsePerformanceReturn } from '../lib/types'

/**
 * Hook for monitoring animation performance
 */
export function usePerformanceMonitor(
  budget?: PerformanceBudget,
  enabled: boolean = true
): UsePerformanceReturn {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 16,
    frameDrops: 0,
    timestamp: Date.now(),
  })

  const [alerts, setAlerts] = useState<any[]>([])
  const monitorRef = useRef<PerformanceMonitor | null>(null)

  useEffect(() => {
    if (!enabled) return

    const monitor = new PerformanceMonitor(budget)
    monitorRef.current = monitor

    const updateMetrics = () => {
      const currentMetrics = monitor.getCurrentMetrics()
      setMetrics(currentMetrics)

      const currentAlerts = monitor.getAlerts()
      setAlerts(currentAlerts)
    }

    monitor.startMonitoring()
    const interval = setInterval(updateMetrics, 1000)

    return () => {
      monitor.stopMonitoring()
      clearInterval(interval)
    }
  }, [budget, enabled])

  const isWithinBudget = useCallback(() => {
    return monitorRef.current?.isWithinBudget() ?? true
  }, [])

  const startMonitoring = useCallback(() => {
    monitorRef.current?.startMonitoring()
  }, [])

  const stopMonitoring = useCallback(() => {
    monitorRef.current?.stopMonitoring()
  }, [])

  return {
    metrics,
    isWithinBudget,
    alerts,
    startMonitoring,
    stopMonitoring,
  }
}

/**
 * Hook for monitoring component performance
 */
export function useComponentPerformance(
  componentId: string,
  enabled: boolean = true
) {
  const [renderTime, setRenderTime] = useState(0)
  const [renderCount, setRenderCount] = useState(0)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (!enabled) return

    startTimeRef.current = performance.now()
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    const endTime = performance.now()
    const duration = endTime - startTimeRef.current

    setRenderTime(duration)
    setRenderCount(prev => prev + 1)

    // Log performance data in development
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `Component ${componentId} render time: ${duration.toFixed(2)}ms`
      )
    }
  }, [enabled, componentId])

  return {
    renderTime,
    renderCount,
    averageRenderTime: renderCount > 0 ? renderTime / renderCount : 0,
  }
}

/**
 * Hook for monitoring animation performance
 */
export function useAnimationPerformance(
  animationId: string,
  enabled: boolean = true
) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationMetrics, setAnimationMetrics] = useState({
    startTime: 0,
    endTime: 0,
    duration: 0,
    fps: 60,
    frameDrops: 0,
  })

  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const animationIdRef = useRef<number | null>(null)

  const startAnimation = useCallback(() => {
    if (!enabled) return

    setIsAnimating(true)
    setAnimationMetrics(prev => ({
      ...prev,
      startTime: performance.now(),
    }))

    frameCountRef.current = 0
    lastTimeRef.current = performance.now()

    const measureFPS = () => {
      // Use ref to check animation state instead of state variable
      if (!animationIdRef.current) return

      frameCountRef.current++
      const currentTime = performance.now()
      const deltaTime = currentTime - lastTimeRef.current

      if (deltaTime >= 1000) {
        const fps = (frameCountRef.current * 1000) / deltaTime
        setAnimationMetrics(prev => ({
          ...prev,
          fps,
          frameDrops: Math.max(0, 60 - fps),
        }))

        frameCountRef.current = 0
        lastTimeRef.current = currentTime
      }

      animationIdRef.current = requestAnimationFrame(measureFPS)
    }

    animationIdRef.current = requestAnimationFrame(measureFPS)
  }, [enabled])

  const stopAnimation = useCallback(() => {
    setIsAnimating(false)
    setAnimationMetrics(prev => ({
      ...prev,
      endTime: performance.now(),
      duration: performance.now() - prev.startTime,
    }))

    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current)
      animationIdRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  return {
    isAnimating,
    animationMetrics,
    startAnimation,
    stopAnimation,
  }
}

/**
 * Hook for monitoring memory usage
 */
export function useMemoryUsage(enabled: boolean = true) {
  const [memoryUsage, setMemoryUsage] = useState(0)
  const [memoryLimit, setMemoryLimit] = useState(0)

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        setMemoryUsage(memory.usedJSHeapSize / (1024 * 1024)) // Convert to MB
        setMemoryLimit(memory.jsHeapSizeLimit / (1024 * 1024)) // Convert to MB
      }
    }

    updateMemoryUsage()
    const interval = setInterval(updateMemoryUsage, 1000)

    return () => clearInterval(interval)
  }, [enabled])

  return {
    memoryUsage,
    memoryLimit,
    memoryUsagePercentage:
      memoryLimit > 0 ? (memoryUsage / memoryLimit) * 100 : 0,
  }
}

/**
 * Hook for monitoring FPS
 */
export function useFPS(enabled: boolean = true) {
  const [fps, setFps] = useState(60)
  const [frameDrops, setFrameDrops] = useState(0)

  useEffect(() => {
    if (!enabled) return

    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      const deltaTime = currentTime - lastTime

      if (deltaTime >= 1000) {
        const currentFPS = (frameCount * 1000) / deltaTime
        setFps(currentFPS)
        setFrameDrops(Math.max(0, 60 - currentFPS))

        frameCount = 0
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    animationId = requestAnimationFrame(measureFPS)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [enabled])

  return {
    fps,
    frameDrops,
    isSmooth: fps >= 55,
    isLaggy: fps < 30,
  }
}

/**
 * Hook for performance optimization
 */
export function usePerformanceOptimization(
  componentId: string,
  options: {
    maxRenderTime?: number
    maxMemoryUsage?: number
    throttleUpdates?: boolean
  } = {}
) {
  const {
    maxRenderTime = 16,
    maxMemoryUsage = 50,
    throttleUpdates = true,
  } = options

  const [shouldOptimize, setShouldOptimize] = useState(false)
  const [optimizationLevel, setOptimizationLevel] = useState<
    'none' | 'light' | 'heavy'
  >('none')

  const { renderTime } = useComponentPerformance(componentId)
  const { memoryUsage } = useMemoryUsage()
  const { fps } = useFPS()

  useEffect(() => {
    const needsOptimization =
      renderTime > maxRenderTime || memoryUsage > maxMemoryUsage || fps < 30

    setShouldOptimize(needsOptimization)

    if (needsOptimization) {
      if (
        renderTime > maxRenderTime * 2 ||
        memoryUsage > maxMemoryUsage * 1.5
      ) {
        setOptimizationLevel('heavy')
      } else {
        setOptimizationLevel('light')
      }
    } else {
      setOptimizationLevel('none')
    }
  }, [renderTime, memoryUsage, fps, maxRenderTime, maxMemoryUsage])

  const getOptimizedProps = useCallback(
    (baseProps: any) => {
      if (optimizationLevel === 'none') return baseProps

      const optimizedProps = { ...baseProps }

      if (optimizationLevel === 'light') {
        // Light optimization: reduce animation duration
        if (optimizedProps.duration) {
          optimizedProps.duration = Math.round(optimizedProps.duration * 0.8)
        }
      } else if (optimizationLevel === 'heavy') {
        // Heavy optimization: disable animations, reduce quality
        optimizedProps.duration = 0
        optimizedProps.quality = 'low'
      }

      return optimizedProps
    },
    [optimizationLevel]
  )

  return {
    shouldOptimize,
    optimizationLevel,
    getOptimizedProps,
    metrics: {
      renderTime,
      memoryUsage,
      fps,
    },
  }
}

/**
 * Hook for device performance detection
 */
export function useDevicePerformance() {
  const [deviceTier, setDeviceTier] = useState<'high' | 'medium' | 'low'>(
    'medium'
  )
  const [connectionType, setConnectionType] = useState<string>('unknown')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Detect device performance tier
    const detectDeviceTier = () => {
      const connection = (navigator as any).connection
      const memory = (performance as any).memory
      const hardwareConcurrency = navigator.hardwareConcurrency || 1

      let tier: 'high' | 'medium' | 'low' = 'medium'

      // High tier: Good connection, memory, and CPU
      if (
        (!connection || connection.effectiveType === '4g') &&
        (!memory || memory.jsHeapSizeLimit > 1000000000) &&
        hardwareConcurrency >= 4
      ) {
        tier = 'high'
      }
      // Low tier: Poor connection or limited resources
      else if (
        connection?.effectiveType === '2g' ||
        (memory && memory.jsHeapSizeLimit < 500000000) ||
        hardwareConcurrency < 2
      ) {
        tier = 'low'
      }

      setDeviceTier(tier)
    }

    // Detect connection type
    const detectConnection = () => {
      const connection = (navigator as any).connection
      if (connection) {
        setConnectionType(connection.effectiveType || 'unknown')
      }
    }

    detectDeviceTier()
    detectConnection()

    // Listen for connection changes
    const connection = (navigator as any).connection
    if (connection) {
      connection.addEventListener('change', detectConnection)
      return () => connection.removeEventListener('change', detectConnection)
    }
  }, [])

  return {
    deviceTier,
    connectionType,
    isHighPerformance: deviceTier === 'high',
    isLowPerformance: deviceTier === 'low',
  }
}
