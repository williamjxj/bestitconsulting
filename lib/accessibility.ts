/**
 * Accessibility utilities for animations
 * Ensures animations respect user preferences and accessibility guidelines
 */

import { Variants } from 'framer-motion'

// Check if user prefers reduced motion
export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false

  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch (error) {
    // Fallback for browsers that don't support matchMedia
    return false
  }
}

// Get animation configuration based on accessibility preferences
export function getAccessibleAnimationConfig(
  baseConfig: any,
  reducedMotion?: boolean
) {
  const motionPreference =
    reducedMotion ??
    (typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false)
  if (motionPreference) {
    return {
      duration: 0.1,
      ease: 'linear',
      ...baseConfig,
    }
  }
  return baseConfig
}

// Get accessible animation variants
export function getAccessibleVariants(
  baseVariants: Variants,
  reducedMotion?: boolean
): Variants {
  const motionPreference =
    reducedMotion ??
    (typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false)
  if (motionPreference) {
    return {
      ...baseVariants,
      animate: {
        ...baseVariants.animate,
        transition: {
          duration: 0.1,
          ease: 'linear',
        },
      },
    }
  }
  return baseVariants
}

// Check if device has low battery (mobile optimization)
export function hasLowBattery(): boolean {
  if (typeof navigator === 'undefined' || !('getBattery' in navigator)) {
    return false
  }

  return (navigator as any)
    .getBattery()
    .then((battery: any) => {
      return battery.level < 0.2
    })
    .catch(() => false)
}

// Check if device has slow connection
export function hasSlowConnection(): boolean {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return false
  }

  const connection = (navigator as any).connection
  return (
    connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'
  )
}

// Get optimized animation config based on device capabilities
export function getOptimizedAnimationConfig(
  baseConfig: any,
  options: {
    reducedMotion?: boolean
    lowBattery?: boolean
    slowConnection?: boolean
  } = {}
) {
  const {
    reducedMotion,
    lowBattery = false,
    slowConnection = hasSlowConnection(),
  } = options

  const motionPreference =
    reducedMotion ??
    (typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false)

  let optimizedConfig = { ...baseConfig }

  if (motionPreference) {
    optimizedConfig = {
      ...optimizedConfig,
      duration: 0.1,
      ease: 'linear',
    }
  } else if (lowBattery || slowConnection) {
    optimizedConfig = {
      ...optimizedConfig,
      duration: Math.min(optimizedConfig.duration || 0.6, 0.3),
    }
  }

  return optimizedConfig
}

// Create accessible transition variants
export function createAccessibleTransition(
  baseTransition: any,
  reducedMotion?: boolean
) {
  const motionPreference =
    reducedMotion ??
    (typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false)
  if (motionPreference) {
    return {
      duration: 0.1,
      ease: 'linear',
    }
  }
  return baseTransition
}

// Check if element is in viewport (for scroll-triggered animations)
export function isInViewport(
  element: Element,
  threshold: number = 0.1
): boolean {
  const rect = element.getBoundingClientRect()
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  return (
    rect.top <= windowHeight * (1 - threshold) &&
    rect.bottom >= windowHeight * threshold &&
    rect.left <= windowWidth &&
    rect.right >= 0
  )
}

// Create intersection observer for scroll-triggered animations
export function createScrollTrigger(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) {
  if (typeof window === 'undefined') return null

  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options,
  }

  return new IntersectionObserver(callback, defaultOptions)
}

// ARIA labels for animated elements
export function getAnimationAriaLabel(
  animationType: string,
  isAnimating: boolean
): string {
  const labels: Record<string, { animating: string; static: string }> = {
    fade: {
      animating: 'Content is fading in',
      static: 'Content is visible',
    },
    slide: {
      animating: 'Content is sliding into view',
      static: 'Content is in position',
    },
    scale: {
      animating: 'Content is scaling up',
      static: 'Content is at full size',
    },
    rotate: {
      animating: 'Content is rotating',
      static: 'Content is in final position',
    },
  }

  const labelSet = labels[animationType] || labels.fade
  return isAnimating ? labelSet.animating : labelSet.static
}

// Focus management for animated elements
export function manageFocusForAnimation(
  element: HTMLElement,
  shouldFocus: boolean = true
) {
  if (shouldFocus && element) {
    element.focus()
  }
}

// Keyboard navigation support for animated elements
export function handleKeyboardNavigation(
  event: KeyboardEvent,
  onEnter?: () => void,
  onEscape?: () => void
) {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      onEnter?.()
      break
    case 'Escape':
      event.preventDefault()
      onEscape?.()
      break
  }
}

// Screen reader announcements for animations
export function announceAnimation(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) {
  if (typeof window === 'undefined') return

  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Validate animation accessibility
export function validateAnimationAccessibility(
  element: HTMLElement,
  animationConfig: any
): string[] {
  const issues: string[] = []

  // Check for proper ARIA labels
  if (
    !element.getAttribute('aria-label') &&
    !element.getAttribute('aria-labelledby')
  ) {
    issues.push('Animated element should have ARIA label')
  }

  // Check for focus management
  if (element.tabIndex === -1 && !element.getAttribute('aria-hidden')) {
    issues.push('Focusable animated element should be properly managed')
  }

  // Check for reduced motion compliance
  const reducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  if (reducedMotion && animationConfig.duration > 0.1) {
    issues.push('Animation should respect reduced motion preference')
  }

  return issues
}

// Create accessible animation wrapper
export function createAccessibleAnimation(
  baseVariants: Variants,
  options: {
    reducedMotion?: boolean
    announceChanges?: boolean
    focusManagement?: boolean
  } = {}
) {
  const {
    reducedMotion,
    announceChanges = false,
    focusManagement = false,
  } = options

  const motionPreference =
    reducedMotion ??
    (typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false)

  const accessibleVariants = getAccessibleVariants(
    baseVariants,
    motionPreference
  )

  return {
    variants: accessibleVariants,
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
    onAnimationStart: () => {
      if (announceChanges) {
        announceAnimation('Animation started')
      }
    },
    onAnimationComplete: () => {
      if (announceChanges) {
        announceAnimation('Animation completed')
      }
      if (focusManagement) {
        // Focus management logic would go here
      }
    },
  }
}
