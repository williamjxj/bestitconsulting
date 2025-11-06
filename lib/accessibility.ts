/**
 * Accessibility Utilities for Animations
 *
 * Utilities for ensuring animations are accessible and respect user preferences
 * for reduced motion and other accessibility requirements.
 */

// Check if user prefers reduced motion
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Check if user prefers high contrast
export const shouldUseHighContrast = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-contrast: high)').matches
}

// Check if user prefers dark color scheme
export const shouldUseDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

// Get reduced motion animation variants
export const getReducedMotionVariants = () => ({
  fadeInUp: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 },
  },
  slideIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 },
  },
  scaleIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 },
  },
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
})

// Get high contrast color variants
export const getHighContrastColors = () => ({
  primary: shouldUseHighContrast() ? '#000000' : '#3b82f6',
  secondary: shouldUseHighContrast() ? '#ffffff' : '#8b5cf6',
  background: shouldUseHighContrast() ? '#ffffff' : '#ffffff',
  foreground: shouldUseHighContrast() ? '#000000' : '#1f2937',
  border: shouldUseHighContrast() ? '#000000' : '#e5e7eb',
  muted: shouldUseHighContrast() ? '#000000' : '#6b7280',
})

// Get dark mode color variants
export const getDarkModeColors = () => ({
  primary: shouldUseDarkMode() ? '#60a5fa' : '#3b82f6',
  secondary: shouldUseDarkMode() ? '#a78bfa' : '#8b5cf6',
  background: shouldUseDarkMode() ? '#111827' : '#ffffff',
  foreground: shouldUseDarkMode() ? '#f9fafb' : '#1f2937',
  border: shouldUseDarkMode() ? '#374151' : '#e5e7eb',
  muted: shouldUseDarkMode() ? '#9ca3af' : '#6b7280',
})

// Animation duration based on accessibility preferences
export const getAccessibleDuration = (baseDuration: number): number => {
  if (shouldReduceMotion()) {
    return Math.min(baseDuration, 200) // Much shorter for reduced motion
  }
  return baseDuration
}

// Animation easing based on accessibility preferences
export const getAccessibleEasing = (baseEasing: string): string => {
  if (shouldReduceMotion()) {
    return 'linear' // Linear easing for reduced motion
  }
  return baseEasing
}

// Focus management for animated elements
export const manageFocus = (element: HTMLElement | null) => {
  if (!element) return

  // Ensure element is focusable
  if (!element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '0')
  }

  // Focus the element
  element.focus()

  // Add focus styles
  element.classList.add('focus-visible')
}

// Remove focus from animated elements
export const removeFocus = (element: HTMLElement | null) => {
  if (!element) return

  element.blur()
  element.classList.remove('focus-visible')
}

// Keyboard navigation for animated components
export const handleKeyboardNavigation = (
  event: KeyboardEvent,
  onEnter?: () => void,
  onEscape?: () => void,
  onArrowUp?: () => void,
  onArrowDown?: () => void,
  onArrowLeft?: () => void,
  onArrowRight?: () => void
) => {
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
    case 'ArrowUp':
      event.preventDefault()
      onArrowUp?.()
      break
    case 'ArrowDown':
      event.preventDefault()
      onArrowDown?.()
      break
    case 'ArrowLeft':
      event.preventDefault()
      onArrowLeft?.()
      break
    case 'ArrowRight':
      event.preventDefault()
      onArrowRight?.()
      break
  }
}

// ARIA attributes for animated components
export const getAriaAttributes = (
  role: string,
  label?: string,
  description?: string,
  expanded?: boolean,
  selected?: boolean
) => ({
  role,
  ...(label && { 'aria-label': label }),
  ...(description && { 'aria-describedby': description }),
  ...(expanded !== undefined && { 'aria-expanded': expanded }),
  ...(selected !== undefined && { 'aria-selected': selected }),
})

// Screen reader announcements for animations
export const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Focus trap for modal animations
export const createFocusTrap = (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )

  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }
  }

  container.addEventListener('keydown', handleTabKey)

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleTabKey)
  }
}

// Reduced motion animation variants
export const reducedMotionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 },
  },
  slideIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 },
  },
  scaleIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 },
  },
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

// High contrast styles
export const getHighContrastStyles = () => ({
  border: shouldUseHighContrast() ? '2px solid #000000' : '1px solid #e5e7eb',
  outline: shouldUseHighContrast() ? '2px solid #000000' : 'none',
  color: shouldUseHighContrast() ? '#000000' : 'inherit',
  backgroundColor: shouldUseHighContrast() ? '#ffffff' : 'inherit',
})

// Dark mode styles
export const getDarkModeStyles = () => ({
  color: shouldUseDarkMode() ? '#f9fafb' : '#1f2937',
  backgroundColor: shouldUseDarkMode() ? '#111827' : '#ffffff',
  borderColor: shouldUseDarkMode() ? '#374151' : '#e5e7eb',
})

// Animation performance monitoring
export const monitorAnimationPerformance = (element: HTMLElement) => {
  const observer = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'measure' && entry.name.includes('animation')) {
        console.log(`Animation performance: ${entry.duration}ms`)

        // Warn if animation takes too long
        if (entry.duration > 16.67) {
          // 60fps threshold
          console.warn('Animation performance below 60fps')
        }
      }
    }
  })

  observer.observe({ entryTypes: ['measure'] })

  return () => observer.disconnect()
}

// Accessibility testing utilities
export const testAccessibility = () => {
  const results = {
    reducedMotion: shouldReduceMotion(),
    highContrast: shouldUseHighContrast(),
    darkMode: shouldUseDarkMode(),
    focusVisible: document.querySelector(':focus-visible') !== null,
    ariaLabels: document.querySelectorAll('[aria-label]').length,
    ariaDescribedBy: document.querySelectorAll('[aria-describedby]').length,
    keyboardNavigation: document.querySelectorAll('[tabindex]').length,
  }

  return results
}

// Utility to apply accessibility styles
export const applyAccessibilityStyles = (element: HTMLElement) => {
  const styles = {
    ...getHighContrastStyles(),
    ...getDarkModeStyles(),
  }

  Object.entries(styles).forEach(([property, value]) => {
    element.style.setProperty(property, value)
  })
}

// Utility to remove accessibility styles
export const removeAccessibilityStyles = (element: HTMLElement) => {
  const styles = Object.keys({
    ...getHighContrastStyles(),
    ...getDarkModeStyles(),
  })

  styles.forEach(property => {
    element.style.removeProperty(property)
  })
}

// Mobile accessibility configuration
export const getMobileAccessibilityConfig = () => ({
  touchTargetSize: 44, // Minimum touch target size in pixels
  gestureThreshold: 10, // Minimum gesture distance in pixels
  doubleTapDelay: 300, // Double tap delay in milliseconds
  swipeThreshold: 50, // Swipe threshold in pixels
  pinchThreshold: 10, // Pinch threshold in pixels
  rotationThreshold: 15, // Rotation threshold in degrees
  vibrationEnabled: true, // Enable haptic feedback
  soundEnabled: true, // Enable sound feedback
  voiceOverEnabled: false, // VoiceOver support
  talkBackEnabled: false, // TalkBack support
  switchControlEnabled: false, // Switch Control support
  assistiveTouchEnabled: false, // AssistiveTouch support
})
