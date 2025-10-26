/**
 * Animation configuration utilities
 * Provides reusable animation configurations and helpers
 */

import {
  AnimationConfig,
  ReducedMotionConfig,
  PerformanceConfig,
} from './types'

// Predefined animation configurations
export const animationPresets = {
  // Fade animations
  fadeIn: {
    id: 'fade-in',
    name: 'Fade In',
    type: 'transition' as const,
    duration: 500,
    easing: 'ease-out',
    reducedMotion: {
      enabled: true,
      alternativeAnimation: 'fade-in-static',
      staticFallback: true,
    },
    performance: {
      maxDuration: 500,
      targetFPS: 60,
      memoryLimit: 10,
      gpuAcceleration: true,
    },
  },

  fadeOut: {
    id: 'fade-out',
    name: 'Fade Out',
    type: 'transition' as const,
    duration: 300,
    easing: 'ease-in',
    reducedMotion: {
      enabled: true,
      alternativeAnimation: 'fade-out-static',
      staticFallback: true,
    },
    performance: {
      maxDuration: 300,
      targetFPS: 60,
      memoryLimit: 10,
      gpuAcceleration: true,
    },
  },

  // Slide animations
  slideInUp: {
    id: 'slide-in-up',
    name: 'Slide In Up',
    type: 'transition' as const,
    duration: 600,
    easing: [0.4, 0, 0.2, 1],
    reducedMotion: {
      enabled: true,
      alternativeAnimation: 'slide-in-up-static',
      staticFallback: true,
    },
    performance: {
      maxDuration: 600,
      targetFPS: 60,
      memoryLimit: 15,
      gpuAcceleration: true,
    },
  },

  slideInDown: {
    id: 'slide-in-down',
    name: 'Slide In Down',
    type: 'transition' as const,
    duration: 600,
    easing: [0.4, 0, 0.2, 1],
    reducedMotion: {
      enabled: true,
      alternativeAnimation: 'slide-in-down-static',
      staticFallback: true,
    },
    performance: {
      maxDuration: 600,
      targetFPS: 60,
      memoryLimit: 15,
      gpuAcceleration: true,
    },
  },

  // Scale animations
  scaleIn: {
    id: 'scale-in',
    name: 'Scale In',
    type: 'interaction' as const,
    duration: 400,
    easing: [0.34, 1.56, 0.64, 1],
    reducedMotion: {
      enabled: true,
      alternativeAnimation: 'scale-in-static',
      staticFallback: true,
    },
    performance: {
      maxDuration: 400,
      targetFPS: 60,
      memoryLimit: 12,
      gpuAcceleration: true,
    },
  },

  scaleOut: {
    id: 'scale-out',
    name: 'Scale Out',
    type: 'interaction' as const,
    duration: 300,
    easing: [0.4, 0, 0.2, 1],
    reducedMotion: {
      enabled: true,
      alternativeAnimation: 'scale-out-static',
      staticFallback: true,
    },
    performance: {
      maxDuration: 300,
      targetFPS: 60,
      memoryLimit: 12,
      gpuAcceleration: true,
    },
  },

  // Hover animations
  hoverScale: {
    id: 'hover-scale',
    name: 'Hover Scale',
    type: 'interaction' as const,
    duration: 200,
    easing: 'ease-out',
    reducedMotion: {
      enabled: true,
      alternativeAnimation: 'hover-scale-static',
      staticFallback: true,
    },
    performance: {
      maxDuration: 200,
      targetFPS: 60,
      memoryLimit: 8,
      gpuAcceleration: true,
    },
  },

  hoverGlow: {
    id: 'hover-glow',
    name: 'Hover Glow',
    type: 'interaction' as const,
    duration: 300,
    easing: 'ease-out',
    reducedMotion: {
      enabled: true,
      alternativeAnimation: 'hover-glow-static',
      staticFallback: true,
    },
    performance: {
      maxDuration: 300,
      targetFPS: 60,
      memoryLimit: 10,
      gpuAcceleration: true,
    },
  },

  // Loading animations
  spinner: {
    id: 'spinner',
    name: 'Spinner',
    type: 'loading' as const,
    duration: 1000,
    easing: 'linear',
    iterations: -1,
    reducedMotion: {
      enabled: true,
      alternativeAnimation: 'spinner-static',
      staticFallback: true,
    },
    performance: {
      maxDuration: 1000,
      targetFPS: 60,
      memoryLimit: 5,
      gpuAcceleration: true,
    },
  },

  pulse: {
    id: 'pulse',
    name: 'Pulse',
    type: 'loading' as const,
    duration: 1500,
    easing: 'ease-in-out',
    iterations: -1,
    direction: 'alternate',
    reducedMotion: {
      enabled: true,
      alternativeAnimation: 'pulse-static',
      staticFallback: true,
    },
    performance: {
      maxDuration: 1500,
      targetFPS: 60,
      memoryLimit: 8,
      gpuAcceleration: true,
    },
  },

  // Scroll animations
  parallax: {
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

  reveal: {
    id: 'reveal',
    name: 'Reveal',
    type: 'scroll' as const,
    duration: 800,
    easing: [0.4, 0, 0.2, 1],
    reducedMotion: {
      enabled: true,
      alternativeAnimation: 'reveal-static',
      staticFallback: true,
    },
    performance: {
      maxDuration: 800,
      targetFPS: 60,
      memoryLimit: 15,
      gpuAcceleration: true,
    },
  },
}

/**
 * Animation configuration utilities
 */
export class AnimationConfigurator {
  /**
   * Create a custom animation configuration
   */
  static createAnimation(
    id: string,
    name: string,
    type: AnimationConfig['type'],
    duration: number,
    easing: string = 'ease-out',
    options: Partial<AnimationConfig> = {}
  ): AnimationConfig {
    return {
      id,
      name,
      type,
      duration,
      easing,
      delay: 0,
      iterations: 1,
      direction: 'normal',
      fillMode: 'both',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: `${id}-static`,
        staticFallback: true,
      },
      performance: {
        maxDuration: duration,
        targetFPS: 60,
        memoryLimit: Math.min(duration / 10, 50),
        gpuAcceleration: true,
      },
      ...options,
    }
  }

  /**
   * Get animation configuration by ID
   */
  static getAnimation(id: string): AnimationConfig | undefined {
    return Object.values(animationPresets).find(preset => preset.id === id)
  }

  /**
   * Get animations by type
   */
  static getAnimationsByType(type: AnimationConfig['type']): AnimationConfig[] {
    return Object.values(animationPresets).filter(
      preset => preset.type === type
    )
  }

  /**
   * Create reduced motion version of animation
   */
  static createReducedMotionVersion(
    animation: AnimationConfig
  ): AnimationConfig {
    return {
      ...animation,
      duration: 0,
      easing: 'linear',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: `${animation.id}-reduced`,
        staticFallback: true,
      },
    }
  }

  /**
   * Create performance-optimized version of animation
   */
  static createPerformanceOptimizedVersion(
    animation: AnimationConfig,
    deviceTier: 'high' | 'medium' | 'low'
  ): AnimationConfig {
    const performanceMultiplier = {
      high: 1,
      medium: 0.8,
      low: 0.6,
    }

    return {
      ...animation,
      duration: Math.round(
        animation.duration * performanceMultiplier[deviceTier]
      ),
      performance: {
        ...animation.performance,
        targetFPS: deviceTier === 'low' ? 30 : 60,
        memoryLimit:
          animation.performance.memoryLimit * performanceMultiplier[deviceTier],
      },
    }
  }

  /**
   * Validate animation configuration
   */
  static validateAnimation(animation: AnimationConfig): string[] {
    const errors: string[] = []

    if (!animation.id) {
      errors.push('Animation ID is required')
    }

    if (!animation.name) {
      errors.push('Animation name is required')
    }

    if (animation.duration < 0) {
      errors.push('Duration must be non-negative')
    }

    if (animation.duration > 5000) {
      errors.push('Duration should not exceed 5000ms for performance')
    }

    if (animation.delay && animation.delay < 0) {
      errors.push('Delay must be non-negative')
    }

    if (animation.iterations && animation.iterations < -1) {
      errors.push('Iterations must be -1 (infinite) or positive')
    }

    return errors
  }

  /**
   * Get animation duration with performance considerations
   */
  static getOptimalDuration(
    baseDuration: number,
    deviceTier: 'high' | 'medium' | 'low',
    reducedMotion: boolean
  ): number {
    if (reducedMotion) return 0

    const multiplier = {
      high: 1,
      medium: 0.8,
      low: 0.6,
    }

    return Math.round(baseDuration * multiplier[deviceTier])
  }

  /**
   * Get animation easing based on type
   */
  static getOptimalEasing(
    type: AnimationConfig['type'],
    deviceTier: 'high' | 'medium' | 'low'
  ): string {
    const easingMap = {
      high: {
        transition: [0.4, 0, 0.2, 1],
        interaction: [0.34, 1.56, 0.64, 1],
        scroll: [0.4, 0, 0.2, 1],
        loading: 'linear',
      },
      medium: {
        transition: 'ease-out',
        interaction: 'ease-out',
        scroll: 'ease-out',
        loading: 'linear',
      },
      low: {
        transition: 'linear',
        interaction: 'linear',
        scroll: 'linear',
        loading: 'linear',
      },
    }

    return easingMap[deviceTier][type]
  }
}

/**
 * Animation timing utilities
 */
export const animationTiming = {
  /**
   * Calculate stagger delay for multiple elements
   */
  calculateStaggerDelay(index: number, baseDelay: number = 100): number {
    return index * baseDelay
  },

  /**
   * Calculate total animation duration including delays
   */
  calculateTotalDuration(
    duration: number,
    delay: number = 0,
    iterations: number = 1
  ): number {
    return delay + duration * iterations
  },

  /**
   * Get animation progress (0-1) at given time
   */
  getAnimationProgress(
    elapsedTime: number,
    duration: number,
    delay: number = 0
  ): number {
    if (elapsedTime < delay) return 0
    if (elapsedTime >= delay + duration) return 1

    return (elapsedTime - delay) / duration
  },
}

/**
 * Animation performance utilities
 */
export const animationPerformance = {
  /**
   * Check if animation should be throttled based on performance
   */
  shouldThrottleAnimation(
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
    return fps < threshold.fps || memoryUsage > threshold.memory
  },

  /**
   * Get animation complexity score
   */
  getAnimationComplexity(animation: AnimationConfig): number {
    let complexity = 0

    // Base complexity by type
    const typeComplexity = {
      transition: 1,
      interaction: 2,
      scroll: 3,
      loading: 1,
    }

    complexity += typeComplexity[animation.type]

    // Duration factor
    complexity += animation.duration / 1000

    // Iterations factor
    if (animation.iterations === -1) {
      complexity += 2
    } else if (animation.iterations > 1) {
      complexity += animation.iterations * 0.5
    }

    // GPU acceleration bonus
    if (animation.performance.gpuAcceleration) {
      complexity -= 0.5
    }

    return Math.max(0, complexity)
  },
}
