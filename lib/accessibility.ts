/**
 * Accessibility utilities for visual enhancements
 * Ensures WCAG 2.1 AA compliance and screen reader support
 */

export interface AccessibilityConfig {
  ariaLabel?: string
  ariaDescription?: string
  keyboardAccessible: boolean
  screenReaderFriendly: boolean
  reducedMotionAlternative?: string
}

export interface ReducedMotionConfig {
  enabled: boolean
  alternativeAnimation?: string
  staticFallback?: boolean
}

/**
 * Accessibility utilities class
 */
export class AccessibilityUtils {
  /**
   * Check if user prefers reduced motion
   */
  static prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  /**
   * Check if user prefers high contrast
   */
  static prefersHighContrast(): boolean {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-contrast: high)').matches
  }

  /**
   * Check if user prefers dark color scheme
   */
  static prefersDarkColorScheme(): boolean {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  /**
   * Get user's motion preference
   */
  static getMotionPreference(): 'full' | 'reduced' | 'none' {
    if (this.prefersReducedMotion()) {
      return 'reduced'
    }
    return 'full'
  }

  /**
   * Generate ARIA label for animated elements
   */
  static generateAriaLabel(element: string, animation?: string): string {
    const baseLabel = `${element} animation`
    if (animation) {
      return `${baseLabel}: ${animation}`
    }
    return baseLabel
  }

  /**
   * Generate ARIA description for complex animations
   */
  static generateAriaDescription(animation: string, duration?: number): string {
    let description = `Animated ${animation}`
    if (duration) {
      description += ` lasting ${duration}ms`
    }
    return description
  }

  /**
   * Check if element is visible to screen readers
   */
  static isScreenReaderVisible(element: HTMLElement): boolean {
    const style = window.getComputedStyle(element)
    return (
      style.visibility !== 'hidden' &&
      style.display !== 'none' &&
      element.getAttribute('aria-hidden') !== 'true'
    )
  }

  /**
   * Announce to screen readers
   */
  static announceToScreenReader(
    message: string,
    priority: 'polite' | 'assertive' = 'polite'
  ): void {
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

  /**
   * Focus management for animations
   */
  static manageFocus(element: HTMLElement, shouldFocus: boolean): void {
    if (shouldFocus) {
      element.focus()
    } else {
      element.blur()
    }
  }

  /**
   * Keyboard navigation support
   */
  static handleKeyboardNavigation(
    event: KeyboardEvent,
    onEnter?: () => void,
    onEscape?: () => void,
    onArrow?: (direction: 'up' | 'down' | 'left' | 'right') => void
  ): void {
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
        onArrow?.('up')
        break
      case 'ArrowDown':
        event.preventDefault()
        onArrow?.('down')
        break
      case 'ArrowLeft':
        event.preventDefault()
        onArrow?.('left')
        break
      case 'ArrowRight':
        event.preventDefault()
        onArrow?.('right')
        break
    }
  }
}

/**
 * Accessibility hooks for React components
 */
export const accessibilityHooks = {
  /**
   * Hook for reduced motion preference
   */
  useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] =
      React.useState(false)

    React.useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    return prefersReducedMotion
  },

  /**
   * Hook for high contrast preference
   */
  useHighContrast(): boolean {
    const [prefersHighContrast, setPrefersHighContrast] = React.useState(false)

    React.useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-contrast: high)')
      setPrefersHighContrast(mediaQuery.matches)

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersHighContrast(e.matches)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    return prefersHighContrast
  },

  /**
   * Hook for dark color scheme preference
   */
  useDarkColorScheme(): boolean {
    const [prefersDark, setPrefersDark] = React.useState(false)

    React.useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      setPrefersDark(mediaQuery.matches)

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersDark(e.matches)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    return prefersDark
  },
}

/**
 * Animation accessibility utilities
 */
export const animationAccessibility = {
  /**
   * Get animation configuration based on accessibility preferences
   */
  getAccessibleAnimationConfig(
    baseConfig: any,
    reducedMotion: boolean,
    highContrast: boolean
  ): any {
    if (reducedMotion) {
      return {
        ...baseConfig,
        duration: 0,
        ease: 'linear',
        reducedMotion: true,
      }
    }

    if (highContrast) {
      return {
        ...baseConfig,
        contrast: 'high',
        borderWidth: 2,
      }
    }

    return baseConfig
  },

  /**
   * Create accessible animation props
   */
  createAccessibleAnimationProps(
    element: string,
    animation: string,
    duration?: number
  ): Record<string, any> {
    return {
      'aria-label': AccessibilityUtils.generateAriaLabel(element, animation),
      'aria-describedby': duration
        ? AccessibilityUtils.generateAriaDescription(animation, duration)
        : undefined,
      role: 'img',
      'aria-live': 'polite',
    }
  },

  /**
   * Handle animation focus management
   */
  handleAnimationFocus(
    element: HTMLElement,
    animationState: 'start' | 'end' | 'running'
  ): void {
    switch (animationState) {
      case 'start':
        AccessibilityUtils.announceToScreenReader('Animation started')
        break
      case 'end':
        AccessibilityUtils.announceToScreenReader('Animation completed')
        break
      case 'running':
        // Don't announce during animation to avoid spam
        break
    }
  },
}

/**
 * Screen reader utilities
 */
export const screenReaderUtils = {
  /**
   * Create screen reader only text
   */
  createScreenReaderText(text: string): string {
    return `<span class="sr-only">${text}</span>`
  },

  /**
   * Announce animation state changes
   */
  announceAnimationState(
    element: string,
    state: 'started' | 'completed' | 'paused' | 'resumed'
  ): void {
    const message = `${element} animation ${state}`
    AccessibilityUtils.announceToScreenReader(message)
  },

  /**
   * Provide alternative content for animations
   */
  provideAlternativeContent(animation: string, content: string): string {
    return `Alternative to ${animation}: ${content}`
  },
}

// Import React for hooks (this would be in a real implementation)
import React from 'react'

// Export individual hooks for easier importing
export const useReducedMotion = accessibilityHooks.useReducedMotion
export const useHighContrast = accessibilityHooks.useHighContrast
export const useDarkColorScheme = accessibilityHooks.useDarkColorScheme
