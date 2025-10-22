/**
 * Accessibility Utilities
 *
 * Provides accessibility helpers and utilities for the BestIT Consulting design system
 * Implements WCAG 2.1 AA compliance and inclusive design principles
 */

import { accessibilityConfig } from './design-system'

// Reduced motion detection
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// High contrast mode detection
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false

  return window.matchMedia('(prefers-contrast: high)').matches
}

// Color scheme preference detection
export function prefersColorScheme(): 'light' | 'dark' | 'no-preference' {
  if (typeof window === 'undefined') return 'no-preference'

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  return mediaQuery.matches ? 'dark' : 'light'
}

// Focus management utilities
export class FocusManager {
  private focusableElements: HTMLElement[] = []
  private currentIndex = 0

  constructor(container: HTMLElement) {
    this.focusableElements = this.getFocusableElements(container)
  }

  private getFocusableElements(container: HTMLElement): HTMLElement[] {
    const selector = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ')

    return Array.from(container.querySelectorAll(selector))
  }

  focusNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.focusableElements.length
    this.focusableElements[this.currentIndex]?.focus()
  }

  focusPrevious(): void {
    this.currentIndex =
      this.currentIndex === 0
        ? this.focusableElements.length - 1
        : this.currentIndex - 1
    this.focusableElements[this.currentIndex]?.focus()
  }

  focusFirst(): void {
    this.currentIndex = 0
    this.focusableElements[0]?.focus()
  }

  focusLast(): void {
    this.currentIndex = this.focusableElements.length - 1
    this.focusableElements[this.currentIndex]?.focus()
  }
}

// Keyboard navigation handler
export function createKeyboardNavigation(
  container: HTMLElement,
  options: {
    onEnter?: () => void
    onEscape?: () => void
    onArrowUp?: () => void
    onArrowDown?: () => void
    onArrowLeft?: () => void
    onArrowRight?: () => void
  } = {}
) {
  const focusManager = new FocusManager(container)

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        options.onEnter?.()
        break
      case 'Escape':
        event.preventDefault()
        options.onEscape?.()
        break
      case 'ArrowUp':
        event.preventDefault()
        focusManager.focusPrevious()
        options.onArrowUp?.()
        break
      case 'ArrowDown':
        event.preventDefault()
        focusManager.focusNext()
        options.onArrowDown?.()
        break
      case 'ArrowLeft':
        event.preventDefault()
        focusManager.focusPrevious()
        options.onArrowLeft?.()
        break
      case 'ArrowRight':
        event.preventDefault()
        focusManager.focusNext()
        options.onArrowRight?.()
        break
      case 'Tab':
        // Let default tab behavior handle focus
        break
    }
  }

  container.addEventListener('keydown', handleKeyDown)

  return () => {
    container.removeEventListener('keydown', handleKeyDown)
  }
}

// Screen reader utilities
export function announceToScreenReader(message: string): void {
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

// Skip link utilities
export function createSkipLink(
  targetId: string,
  label: string = 'Skip to main content'
): HTMLElement {
  const skipLink = document.createElement('a')
  skipLink.href = `#${targetId}`
  skipLink.textContent = label
  skipLink.className =
    'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-md focus:shadow-lg'

  return skipLink
}

// Color contrast utilities
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    const rgb = hexToRgb(color)
    if (!rgb) return 0

    const { r, g, b } = rgb
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

// Accessibility validation
export function validateAccessibility(element: HTMLElement): {
  hasValidHeadingStructure: boolean
  hasAltText: boolean
  hasSufficientContrast: boolean
  hasKeyboardNavigation: boolean
  hasScreenReaderSupport: boolean
} {
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const images = element.querySelectorAll('img')
  const interactiveElements = element.querySelectorAll(
    'button, input, select, textarea, a[href]'
  )

  // Check heading structure
  const headingLevels = Array.from(headings).map(h =>
    parseInt(h.tagName.charAt(1))
  )
  const hasValidHeadingStructure = headingLevels.every(
    (level, index) => index === 0 || level <= headingLevels[index - 1] + 1
  )

  // Check alt text
  const hasAltText = Array.from(images).every(
    img => img.getAttribute('alt') !== null && img.getAttribute('alt') !== ''
  )

  // Check contrast (simplified - would need actual color values)
  const hasSufficientContrast = true // Placeholder

  // Check keyboard navigation
  const hasKeyboardNavigation = Array.from(interactiveElements).every(
    el => el.getAttribute('tabindex') !== '-1'
  )

  // Check screen reader support
  const hasScreenReaderSupport = Array.from(interactiveElements).every(
    el =>
      el.getAttribute('aria-label') ||
      el.textContent?.trim() ||
      el.getAttribute('aria-labelledby')
  )

  return {
    hasValidHeadingStructure,
    hasAltText,
    hasSufficientContrast,
    hasKeyboardNavigation,
    hasScreenReaderSupport,
  }
}

// ARIA utilities
export function setAriaExpanded(element: HTMLElement, expanded: boolean): void {
  element.setAttribute('aria-expanded', expanded.toString())
}

export function setAriaSelected(element: HTMLElement, selected: boolean): void {
  element.setAttribute('aria-selected', selected.toString())
}

export function setAriaPressed(element: HTMLElement, pressed: boolean): void {
  element.setAttribute('aria-pressed', pressed.toString())
}

// Focus trap utilities
export function createFocusTrap(container: HTMLElement): () => void {
  const focusableElements = container.querySelectorAll(
    'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
  )

  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement

  const handleTabKey = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }

  container.addEventListener('keydown', handleTabKey)
  firstElement?.focus()

  return () => {
    container.removeEventListener('keydown', handleTabKey)
  }
}

// Accessibility testing utilities
export function runAccessibilityAudit(element: HTMLElement): {
  score: number
  issues: string[]
  recommendations: string[]
} {
  const validation = validateAccessibility(element)
  const issues: string[] = []
  const recommendations: string[] = []

  if (!validation.hasValidHeadingStructure) {
    issues.push(
      'Invalid heading structure - headings should be in logical order'
    )
    recommendations.push('Ensure headings follow H1 > H2 > H3 hierarchy')
  }

  if (!validation.hasAltText) {
    issues.push('Images missing alt text')
    recommendations.push('Add descriptive alt text to all images')
  }

  if (!validation.hasKeyboardNavigation) {
    issues.push('Some interactive elements are not keyboard accessible')
    recommendations.push(
      'Ensure all interactive elements can be reached via keyboard'
    )
  }

  if (!validation.hasScreenReaderSupport) {
    issues.push('Some interactive elements lack screen reader support')
    recommendations.push(
      'Add aria-label or aria-labelledby to interactive elements'
    )
  }

  const score = Math.max(0, 100 - issues.length * 20)

  return {
    score,
    issues,
    recommendations,
  }
}

// Mobile-specific accessibility features
export function getMobileAccessibilityConfig(): {
  touchTargetSize: number
  focusRingSize: number
  gestureThreshold: number
  swipeThreshold: number
} {
  return {
    touchTargetSize: 44, // Minimum 44px touch target (iOS/Android guidelines)
    focusRingSize: 2,
    gestureThreshold: 10, // Minimum 10px movement for gesture recognition
    swipeThreshold: 50, // Minimum 50px for swipe gesture
  }
}

// Mobile touch accessibility
export function enhanceTouchAccessibility(element: HTMLElement): void {
  const config = getMobileAccessibilityConfig()

  // Ensure minimum touch target size
  element.style.minHeight = `${config.touchTargetSize}px`
  element.style.minWidth = `${config.touchTargetSize}px`

  // Add touch feedback
  element.addEventListener('touchstart', () => {
    element.style.opacity = '0.7'
  })

  element.addEventListener('touchend', () => {
    element.style.opacity = '1'
  })

  // Prevent double-tap zoom on buttons
  element.addEventListener('touchend', e => {
    e.preventDefault()
  })
}

// Mobile gesture support
export function addGestureSupport(
  element: HTMLElement,
  callbacks: {
    onSwipeLeft?: () => void
    onSwipeRight?: () => void
    onSwipeUp?: () => void
    onSwipeDown?: () => void
    onTap?: () => void
  }
): () => void {
  const config = getMobileAccessibilityConfig()
  let startX = 0
  let startY = 0
  let startTime = 0

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    startX = touch.clientX
    startY = touch.clientY
    startTime = Date.now()
  }

  const handleTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches[0]
    const endX = touch.clientX
    const endY = touch.clientY
    const endTime = Date.now()

    const deltaX = endX - startX
    const deltaY = endY - startY
    const deltaTime = endTime - startTime

    // Check for tap (quick, small movement)
    if (
      deltaTime < 300 &&
      Math.abs(deltaX) < config.gestureThreshold &&
      Math.abs(deltaY) < config.gestureThreshold
    ) {
      callbacks.onTap?.()
      return
    }

    // Check for swipe gestures
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > config.swipeThreshold) {
        if (deltaX > 0) {
          callbacks.onSwipeRight?.()
        } else {
          callbacks.onSwipeLeft?.()
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > config.swipeThreshold) {
        if (deltaY > 0) {
          callbacks.onSwipeDown?.()
        } else {
          callbacks.onSwipeUp?.()
        }
      }
    }
  }

  element.addEventListener('touchstart', handleTouchStart)
  element.addEventListener('touchend', handleTouchEnd)

  // Return cleanup function
  return () => {
    element.removeEventListener('touchstart', handleTouchStart)
    element.removeEventListener('touchend', handleTouchEnd)
  }
}

// Mobile screen reader optimizations
export function optimizeForMobileScreenReader(element: HTMLElement): void {
  // Add mobile-specific ARIA attributes
  element.setAttribute('role', 'button')
  element.setAttribute('tabindex', '0')

  // Add mobile-friendly labels
  if (!element.getAttribute('aria-label') && !element.textContent?.trim()) {
    element.setAttribute('aria-label', 'Interactive element')
  }

  // Ensure proper focus management
  element.addEventListener('focus', () => {
    element.style.outline = '2px solid var(--primary-500)'
    element.style.outlineOffset = '2px'
  })

  element.addEventListener('blur', () => {
    element.style.outline = 'none'
    element.style.outlineOffset = '0px'
  })
}
