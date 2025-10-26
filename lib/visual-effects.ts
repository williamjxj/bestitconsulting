/**
 * Visual effect utilities
 * Provides reusable visual effects and helpers
 */

import {
  VisualEffect,
  EffectTrigger,
  AccessibilityConfig,
  AnimationConfig,
} from './types'

// Predefined visual effects
export const visualEffectPresets = {
  // Parallax effects
  parallaxSlow: {
    id: 'parallax-slow',
    name: 'Slow Parallax',
    type: 'parallax' as const,
    component: 'ParallaxScroll',
    trigger: {
      type: 'scroll' as const,
      threshold: 0.1,
      once: false,
    },
    animation: {
      id: 'parallax',
      name: 'Parallax',
      type: 'scroll' as const,
      duration: 0,
      easing: 'linear',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'parallax-static',
        staticFallback: true,
      },
      performance: {
        maxDuration: 0,
        targetFPS: 60,
        memoryLimit: 20,
        gpuAcceleration: true,
      },
    },
    accessibility: {
      ariaLabel: 'Parallax scrolling effect',
      ariaDescription: 'Content moves at different speeds while scrolling',
      keyboardAccessible: true,
      screenReaderFriendly: true,
      reducedMotionAlternative: 'Static content positioning',
    },
  },

  parallaxFast: {
    id: 'parallax-fast',
    name: 'Fast Parallax',
    type: 'parallax' as const,
    component: 'ParallaxScroll',
    trigger: {
      type: 'scroll' as const,
      threshold: 0.1,
      once: false,
    },
    animation: {
      id: 'parallax-fast',
      name: 'Fast Parallax',
      type: 'scroll' as const,
      duration: 0,
      easing: 'linear',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'parallax-fast-static',
        staticFallback: true,
      },
      performance: {
        maxDuration: 0,
        targetFPS: 60,
        memoryLimit: 25,
        gpuAcceleration: true,
      },
    },
    accessibility: {
      ariaLabel: 'Fast parallax scrolling effect',
      ariaDescription: 'Content moves quickly while scrolling',
      keyboardAccessible: true,
      screenReaderFriendly: true,
      reducedMotionAlternative: 'Static content positioning',
    },
  },

  // Reveal effects
  revealUp: {
    id: 'reveal-up',
    name: 'Reveal Up',
    type: 'reveal' as const,
    component: 'RevealScroll',
    trigger: {
      type: 'scroll' as const,
      threshold: 0.2,
      once: true,
    },
    animation: {
      id: 'reveal-up',
      name: 'Reveal Up',
      type: 'scroll' as const,
      duration: 800,
      easing: [0.4, 0, 0.2, 1],
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'reveal-up-static',
        staticFallback: true,
      },
      performance: {
        maxDuration: 800,
        targetFPS: 60,
        memoryLimit: 15,
        gpuAcceleration: true,
      },
    },
    accessibility: {
      ariaLabel: 'Content reveal animation',
      ariaDescription: 'Content appears from below when scrolled into view',
      keyboardAccessible: true,
      screenReaderFriendly: true,
      reducedMotionAlternative: 'Content appears immediately',
    },
  },

  revealDown: {
    id: 'reveal-down',
    name: 'Reveal Down',
    type: 'reveal' as const,
    component: 'RevealScroll',
    trigger: {
      type: 'scroll' as const,
      threshold: 0.2,
      once: true,
    },
    animation: {
      id: 'reveal-down',
      name: 'Reveal Down',
      type: 'scroll' as const,
      duration: 800,
      easing: [0.4, 0, 0.2, 1],
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'reveal-down-static',
        staticFallback: true,
      },
      performance: {
        maxDuration: 800,
        targetFPS: 60,
        memoryLimit: 15,
        gpuAcceleration: true,
      },
    },
    accessibility: {
      ariaLabel: 'Content reveal animation',
      ariaDescription: 'Content appears from above when scrolled into view',
      keyboardAccessible: true,
      screenReaderFriendly: true,
      reducedMotionAlternative: 'Content appears immediately',
    },
  },

  // Hover effects
  hoverLift: {
    id: 'hover-lift',
    name: 'Hover Lift',
    type: 'hover' as const,
    component: 'HoverEffect',
    trigger: {
      type: 'hover' as const,
      delay: 0,
      once: false,
    },
    animation: {
      id: 'hover-lift',
      name: 'Hover Lift',
      type: 'interaction' as const,
      duration: 300,
      easing: 'eubic-bezier(0.4, 0, 0.2, 1)',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'hover-lift-static',
        staticFallback: true,
      },
      performance: {
        maxDuration: 300,
        targetFPS: 60,
        memoryLimit: 10,
        gpuAcceleration: true,
      },
    },
    accessibility: {
      ariaLabel: 'Hover lift effect',
      ariaDescription: 'Element lifts up when hovered',
      keyboardAccessible: true,
      screenReaderFriendly: true,
      reducedMotionAlternative: 'Static hover state',
    },
  },

  hoverGlow: {
    id: 'hover-glow',
    name: 'Hover Glow',
    type: 'hover' as const,
    component: 'HoverEffect',
    trigger: {
      type: 'hover' as const,
      delay: 0,
      once: false,
    },
    animation: {
      id: 'hover-glow',
      name: 'Hover Glow',
      type: 'interaction' as const,
      duration: 400,
      easing: 'easeOut',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'hover-glow-static',
        staticFallback: true,
      },
      performance: {
        maxDuration: 400,
        targetFPS: 60,
        memoryLimit: 12,
        gpuAcceleration: true,
      },
    },
    accessibility: {
      ariaLabel: 'Hover glow effect',
      ariaDescription: 'Element glows when hovered',
      keyboardAccessible: true,
      screenReaderFriendly: true,
      reducedMotionAlternative: 'Static hover state',
    },
  },

  // Focus effects
  focusRing: {
    id: 'focus-ring',
    name: 'Focus Ring',
    type: 'focus' as const,
    component: 'FocusEffect',
    trigger: {
      type: 'focus' as const,
      delay: 0,
      once: false,
    },
    animation: {
      id: 'focus-ring',
      name: 'Focus Ring',
      type: 'interaction' as const,
      duration: 200,
      easing: 'easeOut',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'focus-ring-static',
        staticFallback: true,
      },
      performance: {
        maxDuration: 200,
        targetFPS: 60,
        memoryLimit: 8,
        gpuAcceleration: true,
      },
    },
    accessibility: {
      ariaLabel: 'Focus ring effect',
      ariaDescription: 'Visual focus indicator appears when element is focused',
      keyboardAccessible: true,
      screenReaderFriendly: true,
      reducedMotionAlternative: 'Static focus indicator',
    },
  },

  // Loading effects
  skeleton: {
    id: 'skeleton',
    name: 'Skeleton Loading',
    type: 'loading' as const,
    component: 'SkeletonLoader',
    trigger: {
      type: 'load' as const,
      delay: 0,
      once: true,
    },
    animation: {
      id: 'skeleton',
      name: 'Skeleton Loading',
      type: 'loading' as const,
      duration: 1500,
      easing: 'ease-in-out',
      iterations: -1,
      direction: 'alternate' as const,
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'skeleton-static',
        staticFallback: true,
      },
      performance: {
        maxDuration: 1500,
        targetFPS: 60,
        memoryLimit: 8,
        gpuAcceleration: true,
      },
    },
    accessibility: {
      ariaLabel: 'Loading skeleton',
      ariaDescription: 'Content is loading, please wait',
      keyboardAccessible: true,
      screenReaderFriendly: true,
      reducedMotionAlternative: 'Static loading indicator',
    },
  },
}

/**
 * Visual effect configuration utilities
 */
export class VisualEffectConfigurator {
  /**
   * Create a custom visual effect
   */
  static createEffect(
    id: string,
    name: string,
    type: VisualEffect['type'],
    component: string,
    trigger: EffectTrigger,
    animation: AnimationConfig,
    accessibility: AccessibilityConfig
  ): VisualEffect {
    return {
      id,
      name,
      type,
      component,
      trigger,
      animation,
      accessibility,
    }
  }

  /**
   * Get visual effect by ID
   */
  static getEffect(id: string): VisualEffect | undefined {
    return Object.values(visualEffectPresets).find(preset => preset.id === id)
  }

  /**
   * Get effects by type
   */
  static getEffectsByType(type: VisualEffect['type']): VisualEffect[] {
    return Object.values(visualEffectPresets).filter(
      preset => preset.type === type
    )
  }

  /**
   * Create reduced motion version of effect
   */
  static createReducedMotionVersion(effect: VisualEffect): VisualEffect {
    return {
      ...effect,
      animation: {
        ...effect.animation,
        duration: 0,
        easing: 'linear',
        reducedMotion: {
          enabled: true,
          alternativeAnimation: `${effect.id}-reduced`,
          staticFallback: true,
        },
      },
      accessibility: {
        ...effect.accessibility,
        reducedMotionAlternative:
          effect.accessibility.reducedMotionAlternative || 'Static alternative',
      },
    }
  }

  /**
   * Validate visual effect configuration
   */
  static validateEffect(effect: VisualEffect): string[] {
    const errors: string[] = []

    if (!effect.id) {
      errors.push('Effect ID is required')
    }

    if (!effect.name) {
      errors.push('Effect name is required')
    }

    if (!effect.component) {
      errors.push('Component is required')
    }

    if (!effect.trigger) {
      errors.push('Trigger configuration is required')
    }

    if (!effect.animation) {
      errors.push('Animation configuration is required')
    }

    if (!effect.accessibility) {
      errors.push('Accessibility configuration is required')
    }

    if (!effect.accessibility.keyboardAccessible) {
      errors.push('Effect must be keyboard accessible')
    }

    if (!effect.accessibility.screenReaderFriendly) {
      errors.push('Effect must be screen reader friendly')
    }

    return errors
  }

  /**
   * Get effect by trigger type
   */
  static getEffectsByTrigger(
    triggerType: EffectTrigger['type']
  ): VisualEffect[] {
    return Object.values(visualEffectPresets).filter(
      preset => preset.trigger.type === triggerType
    )
  }

  /**
   * Create accessibility-compliant effect
   */
  static createAccessibleEffect(
    baseEffect: VisualEffect,
    accessibilityOverrides: Partial<AccessibilityConfig> = {}
  ): VisualEffect {
    return {
      ...baseEffect,
      accessibility: {
        ...baseEffect.accessibility,
        ...accessibilityOverrides,
      },
    }
  }
}

/**
 * Visual effect performance utilities
 */
export const visualEffectPerformance = {
  /**
   * Check if effect should be throttled based on performance
   */
  shouldThrottleEffect(
    effect: VisualEffect,
    fps: number,
    memoryUsage: number,
    deviceTier: 'high' | 'medium' | 'low'
  ): boolean {
    const thresholds = {
      high: { fps: 50, memory: 40 },
      medium: { fps: 45, memory: 30 },
      low: { fps: 30, memory: 20 },
    }

    const threshold = thresholds[deviceTier]
    const isPerformanceIntensive =
      effect.type === 'parallax' || effect.type === 'loading'

    return (
      fps < threshold.fps ||
      memoryUsage > threshold.memory ||
      (isPerformanceIntensive && deviceTier === 'low')
    )
  },

  /**
   * Get effect complexity score
   */
  getEffectComplexity(effect: VisualEffect): number {
    let complexity = 0

    // Base complexity by type
    const typeComplexity = {
      parallax: 3,
      reveal: 2,
      hover: 1,
      focus: 1,
      loading: 1,
    }

    complexity += typeComplexity[effect.type]

    // Animation duration factor
    complexity += effect.animation.duration / 1000

    // Trigger complexity
    if (effect.trigger.type === 'scroll') {
      complexity += 1
    }

    // GPU acceleration bonus
    if (effect.animation.performance.gpuAcceleration) {
      complexity -= 0.5
    }

    return Math.max(0, complexity)
  },

  /**
   * Get optimal effect for device tier
   */
  getOptimalEffectForDevice(
    effect: VisualEffect,
    deviceTier: 'high' | 'medium' | 'low'
  ): VisualEffect {
    if (deviceTier === 'high') return effect

    const performanceMultiplier = {
      medium: 0.8,
      low: 0.6,
    }

    const multiplier = performanceMultiplier[deviceTier]

    return {
      ...effect,
      animation: {
        ...effect.animation,
        duration: Math.round(effect.animation.duration * multiplier),
        performance: {
          ...effect.animation.performance,
          targetFPS: deviceTier === 'low' ? 30 : 60,
          memoryLimit: effect.animation.performance.memoryLimit * multiplier,
        },
      },
    }
  },
}

/**
 * Visual effect timing utilities
 */
export const visualEffectTiming = {
  /**
   * Calculate effect delay based on scroll position
   */
  calculateScrollDelay(
    scrollPosition: number,
    elementPosition: number,
    viewportHeight: number
  ): number {
    const distanceFromViewport = Math.abs(scrollPosition - elementPosition)
    const normalizedDistance = distanceFromViewport / viewportHeight

    // Delay increases with distance from viewport
    return Math.min(normalizedDistance * 200, 500)
  },

  /**
   * Calculate stagger delay for multiple elements
   */
  calculateStaggerDelay(
    index: number,
    totalElements: number,
    baseDelay: number = 100
  ): number {
    const staggerRatio = index / (totalElements - 1)
    return Math.round(staggerRatio * baseDelay)
  },

  /**
   * Get effect progress based on trigger
   */
  getEffectProgress(effect: VisualEffect, triggerData: any): number {
    switch (effect.trigger.type) {
      case 'scroll':
        return Math.min(triggerData.scrollProgress || 0, 1)
      case 'hover':
        return triggerData.isHovered ? 1 : 0
      case 'focus':
        return triggerData.isFocused ? 1 : 0
      case 'click':
        return triggerData.isClicked ? 1 : 0
      case 'load':
        return triggerData.isLoaded ? 1 : 0
      default:
        return 0
    }
  },
}
