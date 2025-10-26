/**
 * Accessibility manager for reduced motion and screen reader support
 * Ensures animations respect user preferences and accessibility requirements
 */

'use client'

import { useEffect, useState, useCallback } from 'react'

export interface AccessibilityConfig {
  respectReducedMotion: boolean
  respectHighContrast: boolean
  respectColorScheme: boolean
  screenReaderSupport: boolean
  keyboardNavigation: boolean
}

export interface MotionPreference {
  reducedMotion: boolean
  highContrast: boolean
  colorScheme: 'light' | 'dark' | 'auto'
  screenReader: boolean
}

export interface AccessibilityManager {
  config: AccessibilityConfig
  preferences: MotionPreference
  isAccessible: boolean
  announceToScreenReader: (message: string) => void
  createAccessibleAnimation: (animation: any, fallback?: any) => any
  shouldReduceMotion: () => boolean
  shouldUseHighContrast: () => boolean
  shouldUseDarkMode: () => boolean
  updatePreferences: () => void
}

class AccessibilityManagerClass implements AccessibilityManager {
  public config: AccessibilityConfig
  public preferences: MotionPreference
  public isAccessible: boolean = true

  constructor(config: Partial<AccessibilityConfig> = {}) {
    this.config = {
      respectReducedMotion: true,
      respectHighContrast: true,
      respectColorScheme: true,
      screenReaderSupport: true,
      keyboardNavigation: true,
      ...config,
    }

    this.preferences = {
      reducedMotion: false,
      highContrast: false,
      colorScheme: 'auto',
      screenReader: false,
    }

    this.updatePreferences()
    this.setupEventListeners()
  }

  /**
   * Update accessibility preferences
   */
  public updatePreferences(): void {
    if (typeof window === 'undefined') return

    this.preferences = {
      reducedMotion: this.shouldReduceMotion(),
      highContrast: this.shouldUseHighContrast(),
      colorScheme: this.getColorScheme(),
      screenReader: this.detectScreenReader(),
    }

    this.isAccessible = this.checkAccessibility()
  }

  /**
   * Setup event listeners for preference changes
   */
  private setupEventListeners(): void {
    if (typeof window === 'undefined') return

    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-contrast: high)'),
      window.matchMedia('(prefers-color-scheme: dark)'),
    ]

    mediaQueries.forEach(mediaQuery => {
      mediaQuery.addEventListener('change', () => {
        this.updatePreferences()
      })
    })
  }

  /**
   * Check if reduced motion is preferred
   */
  public shouldReduceMotion(): boolean {
    if (!this.config.respectReducedMotion) return false
    if (typeof window === 'undefined') return false

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  /**
   * Check if high contrast is preferred
   */
  public shouldUseHighContrast(): boolean {
    if (!this.config.respectHighContrast) return false
    if (typeof window === 'undefined') return false

    return window.matchMedia('(prefers-contrast: high)').matches
  }

  /**
   * Check if dark mode is preferred
   */
  public shouldUseDarkMode(): boolean {
    if (!this.config.respectColorScheme) return false
    if (typeof window === 'undefined') return false

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  /**
   * Get color scheme preference
   */
  private getColorScheme(): 'light' | 'dark' | 'auto' {
    if (typeof window === 'undefined') return 'auto'

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }

    return 'auto'
  }

  /**
   * Detect screen reader usage
   */
  private detectScreenReader(): boolean {
    if (typeof window === 'undefined') return false

    // Check for common screen reader indicators
    const indicators = [
      'speechSynthesis' in window,
      'webkitSpeechSynthesis' in window,
      navigator.userAgent.includes('NVDA'),
      navigator.userAgent.includes('JAWS'),
      navigator.userAgent.includes('VoiceOver'),
      navigator.userAgent.includes('TalkBack'),
    ]

    return indicators.some(indicator => indicator)
  }

  /**
   * Check overall accessibility status
   */
  private checkAccessibility(): boolean {
    return (
      this.config.screenReaderSupport &&
      this.config.keyboardNavigation &&
      (!this.preferences.reducedMotion || this.config.respectReducedMotion)
    )
  }

  /**
   * Announce message to screen readers
   */
  public announceToScreenReader(message: string): void {
    if (!this.config.screenReaderSupport) return

    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message

    document.body.appendChild(announcement)

    // Remove after announcement
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement)
      }
    }, 1000)
  }

  /**
   * Create accessible animation with fallback
   */
  public createAccessibleAnimation(animation: any, fallback?: any): any {
    if (this.shouldReduceMotion() && fallback) {
      return fallback
    }

    return animation
  }

  /**
   * Get accessibility-aware animation config
   */
  public getAccessibleAnimationConfig(baseConfig: any): any {
    const config = { ...baseConfig }

    if (this.shouldReduceMotion()) {
      config.duration = 0
      config.ease = 'linear'
      config.reducedMotion = true
    }

    if (this.shouldUseHighContrast()) {
      config.contrast = 'high'
      config.borderWidth = 2
    }

    return config
  }

  /**
   * Create accessible animation props
   */
  public createAccessibleAnimationProps(
    element: string,
    animation: string,
    duration?: number
  ): Record<string, any> {
    const props: Record<string, any> = {
      'aria-label': `${element} animation: ${animation}`,
      role: 'img',
      'aria-live': 'polite',
    }

    if (duration) {
      props['aria-describedby'] = `Animation lasting ${duration}ms`
    }

    return props
  }

  /**
   * Handle animation focus management
   */
  public handleAnimationFocus(
    element: HTMLElement,
    animationState: 'start' | 'end' | 'running'
  ): void {
    switch (animationState) {
      case 'start':
        this.announceToScreenReader('Animation started')
        break
      case 'end':
        this.announceToScreenReader('Animation completed')
        break
      case 'running':
        // Don't announce during animation to avoid spam
        break
    }
  }

  /**
   * Create screen reader only text
   */
  public createScreenReaderText(text: string): string {
    return `<span class="sr-only">${text}</span>`
  }

  /**
   * Announce animation state changes
   */
  public announceAnimationState(
    element: string,
    state: 'started' | 'completed' | 'paused' | 'resumed'
  ): void {
    const message = `${element} animation ${state}`
    this.announceToScreenReader(message)
  }

  /**
   * Provide alternative content for animations
   */
  public provideAlternativeContent(animation: string, content: string): string {
    return `Alternative to ${animation}: ${content}`
  }
}

// Global accessibility manager instance
let globalAccessibilityManager: AccessibilityManagerClass | null = null

/**
 * Get or create global accessibility manager
 */
export function getAccessibilityManager(
  config?: Partial<AccessibilityConfig>
): AccessibilityManager {
  if (!globalAccessibilityManager) {
    globalAccessibilityManager = new AccessibilityManagerClass(config)
  }
  return globalAccessibilityManager
}

/**
 * Hook for accessibility preferences
 */
export function useAccessibility() {
  const [preferences, setPreferences] = useState<MotionPreference>({
    reducedMotion: false,
    highContrast: false,
    colorScheme: 'auto',
    screenReader: false,
  })

  const [isAccessible, setIsAccessible] = useState(true)

  useEffect(() => {
    const manager = getAccessibilityManager()

    const updatePreferences = () => {
      manager.updatePreferences()
      setPreferences(manager.preferences)
      setIsAccessible(manager.isAccessible)
    }

    updatePreferences()

    // Listen for preference changes
    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-contrast: high)'),
      window.matchMedia('(prefers-color-scheme: dark)'),
    ]

    mediaQueries.forEach(mediaQuery => {
      mediaQuery.addEventListener('change', updatePreferences)
    })

    return () => {
      mediaQueries.forEach(mediaQuery => {
        mediaQuery.removeEventListener('change', updatePreferences)
      })
    }
  }, [])

  const announceToScreenReader = useCallback((message: string) => {
    getAccessibilityManager().announceToScreenReader(message)
  }, [])

  const createAccessibleAnimation = useCallback(
    (animation: any, fallback?: any) => {
      return getAccessibilityManager().createAccessibleAnimation(
        animation,
        fallback
      )
    },
    []
  )

  return {
    preferences,
    isAccessible,
    announceToScreenReader,
    createAccessibleAnimation,
    shouldReduceMotion: () => preferences.reducedMotion,
    shouldUseHighContrast: () => preferences.highContrast,
    shouldUseDarkMode: () => preferences.colorScheme === 'dark',
  }
}

/**
 * Create accessible animation component
 */
export function createAccessibleAnimationComponent<
  T extends React.ComponentType<any>,
>(
  Component: T,
  config: {
    fallbackComponent?: React.ComponentType<any>
    screenReaderDescription?: string
    keyboardAccessible?: boolean
  } = {}
): T {
  const AccessibleComponent = React.forwardRef<any, React.ComponentProps<T>>(
    (props, ref) => {
      const { preferences, createAccessibleAnimation } = useAccessibility()

      const shouldUseFallback =
        preferences.reducedMotion && config.fallbackComponent

      if (shouldUseFallback) {
        const FallbackComponent = config.fallbackComponent!
        return React.createElement(FallbackComponent, { ...props, ref })
      }

      const accessibleProps = {
        ...props,
        'aria-label': props['aria-label'] || config.screenReaderDescription,
        tabIndex: config.keyboardAccessible ? 0 : props.tabIndex,
      }

      return React.createElement(Component, { ...accessibleProps, ref })
    }
  )

  AccessibleComponent.displayName = `Accessible${Component.displayName || Component.name}`

  return AccessibleComponent as T
}

/**
 * Cleanup global accessibility manager
 */
export function cleanupAccessibilityManager(): void {
  if (globalAccessibilityManager) {
    globalAccessibilityManager = null
  }
}

export default {
  getAccessibilityManager,
  useAccessibility,
  createAccessibleAnimationComponent,
  cleanupAccessibilityManager,
}
