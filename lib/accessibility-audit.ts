/**
 * Accessibility audit utilities for animation components
 */

import { useReducedMotion } from './accessibility'
import { getDeviceType } from './mobile-optimization'

export interface AccessibilityAuditResult {
  score: number
  issues: AccessibilityIssue[]
  recommendations: string[]
}

export interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info'
  message: string
  element?: string
  fix?: string
}

export function auditAnimationAccessibility(
  options: {
    reducedMotion?: boolean
    deviceType?: 'mobile' | 'tablet' | 'desktop'
  } = {}
): AccessibilityAuditResult {
  const { reducedMotion, deviceType } = options

  // Use provided values or fallback to checking media query directly
  const motionPreference =
    reducedMotion ??
    (typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false)
  const device =
    deviceType ??
    (typeof window !== 'undefined'
      ? window.innerWidth < 768
        ? 'mobile'
        : window.innerWidth < 1024
          ? 'tablet'
          : 'desktop'
      : 'desktop')

  const issues: AccessibilityIssue[] = []
  const recommendations: string[] = []

  // Check for reduced motion support
  if (!motionPreference) {
    issues.push({
      type: 'warning',
      message: 'Animations may not respect user preferences for reduced motion',
      fix: 'Ensure all animations respect prefers-reduced-motion media query',
    })
  }

  // Check for mobile optimization
  if (deviceType === 'mobile') {
    issues.push({
      type: 'info',
      message:
        'Mobile device detected - animations should be optimized for performance',
      fix: 'Use lighter animations and reduce complexity on mobile devices',
    })
  }

  // Check for proper ARIA attributes
  const animatedElements = document.querySelectorAll('[data-animated]')
  animatedElements.forEach((element, index) => {
    if (
      !element.getAttribute('aria-label') &&
      !element.getAttribute('aria-labelledby')
    ) {
      issues.push({
        type: 'warning',
        message: `Animated element ${index + 1} lacks accessible label`,
        element: element.tagName,
        fix: 'Add aria-label or aria-labelledby attribute',
      })
    }
  })

  // Check for proper focus management
  const focusableElements = document.querySelectorAll(
    'button, a, input, textarea, select'
  )
  focusableElements.forEach((element, index) => {
    if (
      element.hasAttribute('data-animated') &&
      !element.getAttribute('tabindex')
    ) {
      issues.push({
        type: 'error',
        message: `Animated focusable element ${index + 1} may interfere with keyboard navigation`,
        element: element.tagName,
        fix: 'Ensure animated elements do not interfere with focus management',
      })
    }
  })

  // Check for proper color contrast
  const textElements = document.querySelectorAll(
    'p, h1, h2, h3, h4, h5, h6, span'
  )
  textElements.forEach((element, index) => {
    const computedStyle = window.getComputedStyle(element)
    const color = computedStyle.color
    const backgroundColor = computedStyle.backgroundColor

    if (color && backgroundColor) {
      const contrast = calculateContrast(color, backgroundColor)
      if (contrast < 4.5) {
        issues.push({
          type: 'error',
          message: `Text element ${index + 1} has insufficient color contrast (${contrast.toFixed(2)})`,
          element: element.tagName,
          fix: 'Increase color contrast to meet WCAG 2.1 AA standards',
        })
      }
    }
  })

  // Generate recommendations
  if (issues.length === 0) {
    recommendations.push('All accessibility checks passed!')
  } else {
    recommendations.push('Review and fix all identified accessibility issues')
    recommendations.push('Test with screen readers and keyboard navigation')
    recommendations.push('Ensure all animations have proper fallbacks')
  }

  const score = Math.max(
    0,
    100 -
      issues.filter(issue => issue.type === 'error').length * 20 -
      issues.filter(issue => issue.type === 'warning').length * 10
  )

  return {
    score,
    issues,
    recommendations,
  }
}

export function auditAnimationPerformance(): AccessibilityAuditResult {
  const issues: AccessibilityIssue[] = []
  const recommendations: string[] = []

  // Check for excessive animations
  const animatedElements = document.querySelectorAll('[data-animated]')
  if (animatedElements.length > 20) {
    issues.push({
      type: 'warning',
      message: 'High number of animated elements may impact performance',
      fix: 'Consider reducing the number of simultaneous animations',
    })
  }

  // Check for complex animations
  const complexAnimations = document.querySelectorAll(
    '[data-complex-animation]'
  )
  if (complexAnimations.length > 5) {
    issues.push({
      type: 'warning',
      message: 'Multiple complex animations may impact performance',
      fix: 'Consider simplifying or staggering complex animations',
    })
  }

  // Check for proper animation timing
  const fastAnimations = document.querySelectorAll('[data-animation-duration]')
  fastAnimations.forEach((element, index) => {
    const duration = parseFloat(
      element.getAttribute('data-animation-duration') || '0'
    )
    if (duration < 0.1) {
      issues.push({
        type: 'warning',
        message: `Animation ${index + 1} is too fast and may cause seizures`,
        element: element.tagName,
        fix: 'Ensure animations are not too fast (minimum 0.1s)',
      })
    }
  })

  const score = Math.max(0, 100 - issues.length * 15)

  return {
    score,
    issues,
    recommendations: [
      'Monitor animation performance on different devices',
      'Use requestAnimationFrame for smooth animations',
      'Consider using CSS transforms instead of changing layout properties',
    ],
  }
}

function calculateContrast(color1: string, color2: string): number {
  // Simplified contrast calculation
  // In a real implementation, you would parse the colors and calculate luminance
  return 4.5 // Placeholder value
}
