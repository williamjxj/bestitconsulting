/**
 * Mobile optimization utilities for animations
 * Ensures animations perform well on mobile devices
 */

import { Variants } from 'framer-motion'

// Device detection utilities
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.innerWidth < 768
  } catch (error) {
    return false
  }
}

export function isTablet(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.innerWidth >= 768 && window.innerWidth < 1024
  } catch (error) {
    return false
  }
}

export function isDesktop(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.innerWidth >= 1024
  } catch (error) {
    return false
  }
}

export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'
  try {
    if (isMobile()) return 'mobile'
    if (isTablet()) return 'tablet'
    return 'desktop'
  } catch (error) {
    return 'desktop'
  }
}

// Performance optimization utilities
export function hasHighRefreshRate(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return (window.screen as any)?.refreshRate >= 90
  } catch (error) {
    return false
  }
}

export function hasLowMemory(): boolean {
  if (typeof navigator === 'undefined' || !('deviceMemory' in navigator)) {
    return false
  }
  return (navigator as any).deviceMemory < 4
}

export function hasSlowCPU(): boolean {
  if (
    typeof navigator === 'undefined' ||
    !('hardwareConcurrency' in navigator)
  ) {
    return false
  }
  return navigator.hardwareConcurrency < 4
}

// Battery optimization
export function hasLowBattery(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !('getBattery' in navigator)) {
    return Promise.resolve(false)
  }

  return (navigator as any)
    .getBattery()
    .then((battery: any) => {
      return battery.level < 0.2
    })
    .catch(() => false)
}

// Connection optimization
export function hasSlowConnection(): boolean {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return false
  }

  const connection = (navigator as any).connection
  return (
    connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'
  )
}

// Get optimized animation configuration for mobile
export function getMobileOptimizedConfig(
  baseConfig: any,
  deviceType: 'mobile' | 'tablet' | 'desktop' = getDeviceType()
) {
  const optimizedConfig = { ...baseConfig }

  switch (deviceType) {
    case 'mobile':
      optimizedConfig.duration = Math.min(optimizedConfig.duration || 0.6, 0.3)
      optimizedConfig.stagger = Math.min(optimizedConfig.stagger || 100, 50)
      optimizedConfig.easing = 'easeOut'
      break
    case 'tablet':
      optimizedConfig.duration = Math.min(optimizedConfig.duration || 0.6, 0.4)
      optimizedConfig.stagger = Math.min(optimizedConfig.stagger || 100, 75)
      break
    case 'desktop':
      // Keep original config for desktop
      break
  }

  return optimizedConfig
}

// Create mobile-optimized animation variants
export function getMobileOptimizedVariants(
  baseVariants: Variants,
  deviceType: 'mobile' | 'tablet' | 'desktop' = getDeviceType()
): Variants {
  const optimizedVariants = { ...baseVariants }

  if (deviceType === 'mobile') {
    // Reduce animation complexity for mobile
    if (optimizedVariants.animate) {
      optimizedVariants.animate = {
        ...optimizedVariants.animate,
        transition: {
          duration: 0.3,
          ease: 'easeOut',
        },
      }
    }
  }

  return optimizedVariants
}

// Touch gesture optimization
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  } catch (error) {
    return false
  }
}

export function getTouchOptimizedConfig(
  baseConfig: any,
  isTouch: boolean = isTouchDevice()
) {
  if (!isTouch) return baseConfig

  return {
    ...baseConfig,
    // Reduce animation duration for touch devices
    duration: Math.min(baseConfig.duration || 0.6, 0.4),
    // Use touch-friendly easing
    easing: 'easeOut',
  }
}

// Memory optimization
export function getMemoryOptimizedConfig(
  baseConfig: any,
  lowMemory: boolean = hasLowMemory()
) {
  if (!lowMemory) return baseConfig

  return {
    ...baseConfig,
    // Reduce animation complexity for low memory devices
    duration: Math.min(baseConfig.duration || 0.6, 0.2),
    // Disable complex effects
    disableComplexAnimations: true,
  }
}

// CPU optimization
export function getCPUOptimizedConfig(
  baseConfig: any,
  slowCPU: boolean = hasSlowCPU()
) {
  if (!slowCPU) return baseConfig

  return {
    ...baseConfig,
    // Reduce animation duration for slow CPU
    duration: Math.min(baseConfig.duration || 0.6, 0.3),
    // Use simpler easing functions
    easing: 'linear',
  }
}

// Battery optimization
export function getBatteryOptimizedConfig(
  baseConfig: any,
  lowBattery: boolean = false
) {
  if (!lowBattery) return baseConfig

  return {
    ...baseConfig,
    // Reduce animation duration for low battery
    duration: Math.min(baseConfig.duration || 0.6, 0.2),
    // Disable energy-intensive animations
    disableEnergyIntensiveAnimations: true,
  }
}

// Connection optimization
export function getConnectionOptimizedConfig(
  baseConfig: any,
  slowConnection: boolean = hasSlowConnection()
) {
  if (!slowConnection) return baseConfig

  return {
    ...baseConfig,
    // Reduce animation duration for slow connections
    duration: Math.min(baseConfig.duration || 0.6, 0.3),
    // Disable network-dependent animations
    disableNetworkDependentAnimations: true,
  }
}

// Comprehensive mobile optimization
export function getComprehensiveMobileConfig(
  baseConfig: any,
  options: {
    deviceType?: 'mobile' | 'tablet' | 'desktop'
    lowMemory?: boolean
    slowCPU?: boolean
    lowBattery?: boolean
    slowConnection?: boolean
  } = {}
) {
  const {
    deviceType = getDeviceType(),
    lowMemory = hasLowMemory(),
    slowCPU = hasSlowCPU(),
    lowBattery = false,
    slowConnection = hasSlowConnection(),
  } = options

  let optimizedConfig = getMobileOptimizedConfig(baseConfig, deviceType)

  if (lowMemory) {
    optimizedConfig = getMemoryOptimizedConfig(optimizedConfig, true)
  }

  if (slowCPU) {
    optimizedConfig = getCPUOptimizedConfig(optimizedConfig, true)
  }

  if (lowBattery) {
    optimizedConfig = getBatteryOptimizedConfig(optimizedConfig, true)
  }

  if (slowConnection) {
    optimizedConfig = getConnectionOptimizedConfig(optimizedConfig, true)
  }

  return optimizedConfig
}

// Mobile-specific animation variants
export const mobileOptimizedVariants: Record<string, Variants> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: { opacity: 0, y: 10 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    exit: { opacity: 0, scale: 0.9 },
  },
}

// Touch gesture variants
export const touchOptimizedVariants: Record<string, Variants> = {
  tap: {
    tap: { scale: 0.95 },
    hover: { scale: 1.02 },
  },
  swipe: {
    drag: { x: 0, y: 0 },
    dragConstraints: { left: -100, right: 100, top: -100, bottom: 100 },
  },
  pinch: {
    scale: 1.1,
    transition: { duration: 0.3 },
  } as any,
}

// Performance monitoring for mobile
export function monitorMobilePerformance(
  callback: (metrics: {
    fps: number
    memoryUsage: number
    batteryLevel: number
    connectionSpeed: string
  }) => void
) {
  if (typeof window === 'undefined') return

  let frameCount = 0
  let lastTime = performance.now()

  function measureFPS() {
    frameCount++
    const currentTime = performance.now()

    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
      frameCount = 0
      lastTime = currentTime

      const metrics = {
        fps,
        memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
        batteryLevel: 0, // Would need battery API
        connectionSpeed:
          (navigator as any).connection?.effectiveType || 'unknown',
      }

      callback(metrics)
    }

    requestAnimationFrame(measureFPS)
  }

  measureFPS()
}

// Mobile-specific animation utilities
export function createMobileAnimation(
  baseVariants: Variants,
  options: {
    deviceType?: 'mobile' | 'tablet' | 'desktop'
    touchOptimized?: boolean
    performanceOptimized?: boolean
  } = {}
) {
  const {
    deviceType = getDeviceType(),
    touchOptimized = isTouchDevice(),
    performanceOptimized = hasLowMemory() || hasSlowCPU(),
  } = options

  let optimizedVariants = getMobileOptimizedVariants(baseVariants, deviceType)

  if (touchOptimized) {
    optimizedVariants = {
      ...optimizedVariants,
      ...touchOptimizedVariants,
    } as any
  }

  if (performanceOptimized) {
    optimizedVariants = {
      ...optimizedVariants,
      animate: {
        ...optimizedVariants.animate,
        transition: {
          duration: 0.2,
          ease: 'linear',
        },
      },
    }
  }

  return optimizedVariants
}
