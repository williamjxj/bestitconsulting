/**
 * Mobile Testing Utilities
 *
 * Provides testing utilities and helpers for mobile-specific functionality
 * Implements mobile device simulation and testing tools
 */

import { useResponsive } from './breakpoints'
import { getMobileAccessibilityConfig } from './accessibility'

// Mobile device simulation
export function simulateMobileDevice(): void {
  // Override user agent for mobile simulation
  Object.defineProperty(navigator, 'userAgent', {
    value:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    configurable: true,
  })

  // Simulate touch events
  Object.defineProperty(navigator, 'maxTouchPoints', {
    value: 5,
    configurable: true,
  })

  // Simulate mobile viewport
  Object.defineProperty(window, 'innerWidth', {
    value: 375,
    configurable: true,
  })

  Object.defineProperty(window, 'innerHeight', {
    value: 667,
    configurable: true,
  })
}

// Mobile performance testing
export function testMobilePerformance(): Promise<{
  renderTime: number
  animationFPS: number
  touchLatency: number
  memoryUsage: number
}> {
  return new Promise(resolve => {
    const startTime = performance.now()
    let frameCount = 0
    let lastTime = startTime
    let touchLatency = 0

    // Test touch latency
    const touchStart = performance.now()
    document.addEventListener(
      'touchstart',
      () => {
        touchLatency = performance.now() - touchStart
      },
      { once: true }
    )

    // Test animation FPS
    const measureFPS = () => {
      frameCount++
      const now = performance.now()

      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime))
        const renderTime = now - startTime

        // Get memory usage if available
        const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0

        resolve({
          renderTime,
          animationFPS: fps,
          touchLatency,
          memoryUsage,
        })
      } else {
        requestAnimationFrame(measureFPS)
      }
    }

    requestAnimationFrame(measureFPS)
  })
}

// Mobile accessibility testing
export function testMobileAccessibility(): {
  touchTargets: number
  gestureSupport: boolean
  screenReaderSupport: boolean
  keyboardNavigation: boolean
} {
  const config = getMobileAccessibilityConfig()
  const interactiveElements = document.querySelectorAll(
    'button, input, select, textarea, a[href]'
  )

  // Test touch target sizes
  let validTouchTargets = 0
  interactiveElements.forEach(element => {
    const rect = element.getBoundingClientRect()
    if (
      rect.width >= config.touchTargetSize &&
      rect.height >= config.touchTargetSize
    ) {
      validTouchTargets++
    }
  })

  // Test gesture support
  const gestureSupport = 'ontouchstart' in window

  // Test screen reader support
  const screenReaderSupport = Array.from(interactiveElements).every(element => {
    return (
      element.getAttribute('aria-label') ||
      element.textContent?.trim() ||
      element.getAttribute('aria-labelledby')
    )
  })

  // Test keyboard navigation
  const keyboardNavigation = Array.from(interactiveElements).every(element => {
    return element.getAttribute('tabindex') !== '-1'
  })

  return {
    touchTargets: validTouchTargets,
    gestureSupport,
    screenReaderSupport,
    keyboardNavigation,
  }
}

// Mobile responsive testing
export function testMobileResponsive(): {
  breakpoints: Record<string, boolean>
  viewport: { width: number; height: number }
  deviceType: string
} {
  const { isMobile, isTablet, isDesktop, isWide, width } = useResponsive()

  return {
    breakpoints: {
      mobile: isMobile,
      tablet: isTablet,
      desktop: isDesktop,
      wide: isWide,
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    deviceType: isMobile
      ? 'mobile'
      : isTablet
        ? 'tablet'
        : isDesktop
          ? 'desktop'
          : 'wide',
  }
}

// Mobile animation testing
export function testMobileAnimations(): Promise<{
  animationPerformance: number
  reducedMotion: boolean
  animationCount: number
}> {
  return new Promise(resolve => {
    const startTime = performance.now()
    let animationCount = 0
    let frameCount = 0
    let lastTime = startTime

    // Count animations
    const animatedElements = document.querySelectorAll(
      '[style*="animation"], [style*="transition"]'
    )
    animationCount = animatedElements.length

    // Test reduced motion
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Measure animation performance
    const measurePerformance = () => {
      frameCount++
      const now = performance.now()

      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime))
        const animationPerformance = fps

        resolve({
          animationPerformance,
          reducedMotion,
          animationCount,
        })
      } else {
        requestAnimationFrame(measurePerformance)
      }
    }

    requestAnimationFrame(measurePerformance)
  })
}

// Mobile testing suite
export async function runMobileTestSuite(): Promise<{
  performance: any
  accessibility: any
  responsive: any
  animations: any
  overall: number
}> {
  const [performance, animations] = await Promise.all([
    testMobilePerformance(),
    testMobileAnimations(),
  ])

  const accessibility = testMobileAccessibility()
  const responsive = testMobileResponsive()

  // Calculate overall score
  const performanceScore = Math.min(100, (performance.animationFPS / 60) * 100)
  const accessibilityScore = Math.min(
    100,
    (accessibility.touchTargets / accessibility.touchTargets) * 100
  )
  const responsiveScore = responsive.breakpoints.mobile ? 100 : 80
  const animationScore = animations.reducedMotion
    ? 100
    : Math.min(100, (animations.animationPerformance / 60) * 100)

  const overall = Math.round(
    (performanceScore + accessibilityScore + responsiveScore + animationScore) /
      4
  )

  return {
    performance,
    accessibility,
    responsive,
    animations,
    overall,
  }
}

// Mobile testing helpers
export function createMobileTestEnvironment(): () => void {
  const originalUserAgent = navigator.userAgent
  const originalInnerWidth = window.innerWidth
  const originalInnerHeight = window.innerHeight

  // Set mobile environment
  simulateMobileDevice()

  // Return cleanup function
  return () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    })

    Object.defineProperty(window, 'innerWidth', {
      value: originalInnerWidth,
      configurable: true,
    })

    Object.defineProperty(window, 'innerHeight', {
      value: originalInnerHeight,
      configurable: true,
    })
  }
}

// Mobile testing assertions
export function assertMobileAccessibility(): void {
  const test = testMobileAccessibility()

  if (!test.gestureSupport) {
    throw new Error('Mobile gesture support not detected')
  }

  if (!test.screenReaderSupport) {
    throw new Error('Screen reader support incomplete')
  }

  if (!test.keyboardNavigation) {
    throw new Error('Keyboard navigation not properly implemented')
  }
}

export function assertMobilePerformance(): void {
  testMobilePerformance().then(performance => {
    if (performance.animationFPS < 30) {
      throw new Error('Mobile animation performance below threshold')
    }

    if (performance.touchLatency > 100) {
      throw new Error('Mobile touch latency too high')
    }
  })
}

export function assertMobileResponsive(): void {
  const test = testMobileResponsive()

  if (!test.breakpoints.mobile && window.innerWidth < 768) {
    throw new Error('Mobile breakpoint not properly detected')
  }

  if (test.viewport.width < 320) {
    throw new Error('Viewport width too small for mobile')
  }
}
