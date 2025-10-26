/**
 * Accessibility hooks
 * React hooks for managing accessibility features
 */

import { useState, useEffect, useCallback } from 'react'
import { AccessibilityUtils } from '../lib/accessibility'
import { UseAccessibilityReturn, MotionPreference } from '../lib/types'

/**
 * Hook for reduced motion preference
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

/**
 * Hook for high contrast preference
 */
export function useHighContrast(): boolean {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setPrefersHighContrast(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersHighContrast
}

/**
 * Hook for dark color scheme preference
 */
export function useDarkColorScheme(): boolean {
  const [prefersDark, setPrefersDark] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setPrefersDark(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersDark(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersDark
}

/**
 * Hook for motion preference
 */
export function useMotionPreference(): MotionPreference {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return 'reduced'
  }

  return 'full'
}

/**
 * Comprehensive accessibility hook
 */
export function useAccessibility(): UseAccessibilityReturn {
  const prefersReducedMotion = useReducedMotion()
  const prefersHighContrast = useHighContrast()
  const prefersDarkColorScheme = useDarkColorScheme()
  const motionPreference = useMotionPreference()

  const announceToScreenReader = useCallback((message: string) => {
    AccessibilityUtils.announceToScreenReader(message)
  }, [])

  return {
    prefersReducedMotion,
    prefersHighContrast,
    prefersDarkColorScheme,
    motionPreference,
    announceToScreenReader,
  }
}

/**
 * Hook for keyboard navigation
 */
export function useKeyboardNavigation(
  onEnter?: () => void,
  onEscape?: () => void,
  onArrow?: (direction: 'up' | 'down' | 'left' | 'right') => void
) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      AccessibilityUtils.handleKeyboardNavigation(
        event,
        onEnter,
        onEscape,
        onArrow
      )
    },
    [onEnter, onEscape, onArrow]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

/**
 * Hook for focus management
 */
export function useFocusManagement() {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null)
  const [focusHistory, setFocusHistory] = useState<HTMLElement[]>([])

  const focusElement = useCallback((element: HTMLElement) => {
    setFocusedElement(element)
    setFocusHistory(prev => [...prev, element])
    element.focus()
  }, [])

  const blurElement = useCallback(
    (element: HTMLElement) => {
      if (focusedElement === element) {
        setFocusedElement(null)
      }
      element.blur()
    },
    [focusedElement]
  )

  const focusPrevious = useCallback(() => {
    if (focusHistory.length > 1) {
      const previousElement = focusHistory[focusHistory.length - 2]
      focusElement(previousElement)
      setFocusHistory(prev => prev.slice(0, -1))
    }
  }, [focusHistory, focusElement])

  const clearFocus = useCallback(() => {
    setFocusedElement(null)
    setFocusHistory([])
  }, [])

  return {
    focusedElement,
    focusHistory,
    focusElement,
    blurElement,
    focusPrevious,
    clearFocus,
  }
}

/**
 * Hook for screen reader support
 */
export function useScreenReader() {
  const [isScreenReaderActive, setIsScreenReaderActive] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Detect screen reader by checking for specific attributes or behaviors
    const detectScreenReader = () => {
      const hasAriaLive = document.querySelector('[aria-live]')
      const hasScreenReaderClass = document.querySelector('.sr-only')
      const hasHighContrast = window.matchMedia(
        '(prefers-contrast: high)'
      ).matches

      setIsScreenReaderActive(
        !!(hasAriaLive || hasScreenReaderClass || hasHighContrast)
      )
    }

    detectScreenReader()

    // Listen for changes that might indicate screen reader usage
    const observer = new MutationObserver(() => {
      detectScreenReader()
    })

    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  const announce = useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      AccessibilityUtils.announceToScreenReader(message, priority)
    },
    []
  )

  const createScreenReaderText = useCallback((text: string) => {
    return `<span class="sr-only">${text}</span>`
  }, [])

  return {
    isScreenReaderActive,
    announce,
    createScreenReaderText,
  }
}

/**
 * Hook for accessibility testing
 */
export function useAccessibilityTesting() {
  const [violations, setViolations] = useState<any[]>([])
  const [isTesting, setIsTesting] = useState(false)

  const runAccessibilityTest = useCallback(async () => {
    setIsTesting(true)

    try {
      // In a real implementation, you would use a library like axe-core
      // For now, we'll simulate the test
      const mockViolations = [
        {
          id: 'color-contrast',
          impact: 'serious',
          description: 'Elements must have sufficient color contrast',
          nodes: [],
        },
      ]

      setViolations(mockViolations)
    } catch (error) {
      console.error('Accessibility test failed:', error)
    } finally {
      setIsTesting(false)
    }
  }, [])

  const clearViolations = useCallback(() => {
    setViolations([])
  }, [])

  return {
    violations,
    isTesting,
    runAccessibilityTest,
    clearViolations,
    hasViolations: violations.length > 0,
  }
}

/**
 * Hook for accessible animations
 */
export function useAccessibleAnimation(
  animationConfig: any,
  elementId: string
) {
  const { prefersReducedMotion, motionPreference } = useAccessibility()
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = useCallback(() => {
    if (prefersReducedMotion) {
      // Provide static alternative
      console.log(`Static alternative for ${elementId}`)
      return
    }

    setIsAnimating(true)
    // Start animation logic here
  }, [prefersReducedMotion, elementId])

  const stopAnimation = useCallback(() => {
    setIsAnimating(false)
    // Stop animation logic here
  }, [])

  const getAccessibleAnimationProps = useCallback(() => {
    const baseProps = {
      'aria-label': AccessibilityUtils.generateAriaLabel(
        elementId,
        'animation'
      ),
      'aria-describedby': `animation-description-${elementId}`,
      role: 'img',
    }

    if (prefersReducedMotion) {
      return {
        ...baseProps,
        'aria-label': `${elementId} static content`,
        'aria-describedby': `static-content-${elementId}`,
      }
    }

    return baseProps
  }, [elementId, prefersReducedMotion])

  return {
    isAnimating,
    startAnimation,
    stopAnimation,
    getAccessibleAnimationProps,
    shouldAnimate: !prefersReducedMotion,
    motionPreference,
  }
}

/**
 * Hook for accessible focus indicators
 */
export function useFocusIndicator() {
  const [showFocusIndicator, setShowFocusIndicator] = useState(false)
  const [focusStyle, setFocusStyle] = useState('')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        setShowFocusIndicator(true)
      }
    }

    const handleMouseDown = () => {
      setShowFocusIndicator(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  const getFocusStyle = useCallback(() => {
    if (!showFocusIndicator) return ''

    return `
      outline: 2px solid #0066cc;
      outline-offset: 2px;
      border-radius: 4px;
    `
  }, [showFocusIndicator])

  return {
    showFocusIndicator,
    getFocusStyle,
  }
}
