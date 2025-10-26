/**
 * Animation registry for centralized configuration
 * Manages all animations and their configurations
 */

import {
  AnimationConfig,
  ReducedMotionConfig,
  PerformanceConfig,
} from './types'

export interface AnimationRegistry {
  [key: string]: AnimationConfig
}

export interface RegistryConfig {
  defaultDuration: number
  defaultEasing: string
  performanceThreshold: number
  reducedMotionFallback: boolean
}

class AnimationRegistryClass {
  private registry: AnimationRegistry = {}
  private config: RegistryConfig = {
    defaultDuration: 500,
    defaultEasing: 'ease-out',
    performanceThreshold: 45,
    reducedMotionFallback: true,
  }

  constructor(config?: Partial<RegistryConfig>) {
    this.config = { ...this.config, ...config }
    this.initializeDefaultAnimations()
  }

  /**
   * Initialize default animations
   */
  private initializeDefaultAnimations(): void {
    // Fade animations
    this.register('fade-in', {
      id: 'fade-in',
      name: 'Fade In',
      type: 'transition',
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
    })

    this.register('fade-out', {
      id: 'fade-out',
      name: 'Fade Out',
      type: 'transition',
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
    })

    // Slide animations
    this.register('slide-in-up', {
      id: 'slide-in-up',
      name: 'Slide In Up',
      type: 'transition',
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
    })

    this.register('slide-in-down', {
      id: 'slide-in-down',
      name: 'Slide In Down',
      type: 'transition',
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
    })

    // Scale animations
    this.register('scale-in', {
      id: 'scale-in',
      name: 'Scale In',
      type: 'interaction',
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
    })

    this.register('scale-out', {
      id: 'scale-out',
      name: 'Scale Out',
      type: 'interaction',
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
    })

    // Hover animations
    this.register('hover-scale', {
      id: 'hover-scale',
      name: 'Hover Scale',
      type: 'interaction',
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
    })

    this.register('hover-glow', {
      id: 'hover-glow',
      name: 'Hover Glow',
      type: 'interaction',
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
    })

    // Loading animations
    this.register('spinner', {
      id: 'spinner',
      name: 'Spinner',
      type: 'loading',
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
    })

    this.register('pulse', {
      id: 'pulse',
      name: 'Pulse',
      type: 'loading',
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
    })

    // Scroll animations
    this.register('parallax', {
      id: 'parallax',
      name: 'Parallax',
      type: 'scroll',
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
    })

    this.register('reveal', {
      id: 'reveal',
      name: 'Reveal',
      type: 'scroll',
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
    })
  }

  /**
   * Register a new animation
   */
  public register(id: string, config: AnimationConfig): void {
    this.registry[id] = config
  }

  /**
   * Get animation configuration
   */
  public get(id: string): AnimationConfig | undefined {
    return this.registry[id]
  }

  /**
   * Get all registered animations
   */
  public getAll(): AnimationRegistry {
    return { ...this.registry }
  }

  /**
   * Get animations by type
   */
  public getByType(type: AnimationConfig['type']): AnimationConfig[] {
    return Object.values(this.registry).filter(
      animation => animation.type === type
    )
  }

  /**
   * Check if animation exists
   */
  public has(id: string): boolean {
    return id in this.registry
  }

  /**
   * Remove animation
   */
  public remove(id: string): boolean {
    if (this.has(id)) {
      delete this.registry[id]
      return true
    }
    return false
  }

  /**
   * Clear all animations
   */
  public clear(): void {
    this.registry = {}
  }

  /**
   * Get animation count
   */
  public getCount(): number {
    return Object.keys(this.registry).length
  }

  /**
   * Validate animation configuration
   */
  public validate(id: string): string[] {
    const animation = this.get(id)
    if (!animation) {
      return [`Animation "${id}" not found`]
    }

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
   * Get performance-optimized animation
   */
  public getOptimized(
    id: string,
    deviceTier: 'high' | 'medium' | 'low' = 'high'
  ): AnimationConfig | undefined {
    const animation = this.get(id)
    if (!animation) return undefined

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
        memoryLimit: Math.round(
          animation.performance.memoryLimit * performanceMultiplier[deviceTier]
        ),
      },
    }
  }

  /**
   * Get reduced motion version
   */
  public getReducedMotion(id: string): AnimationConfig | undefined {
    const animation = this.get(id)
    if (!animation) return undefined

    if (!animation.reducedMotion.enabled) {
      return animation
    }

    return {
      ...animation,
      duration: 0,
      easing: 'linear',
      reducedMotion: {
        ...animation.reducedMotion,
        alternativeAnimation: `${animation.id}-reduced`,
      },
    }
  }

  /**
   * Search animations by name
   */
  public search(query: string): AnimationConfig[] {
    const lowercaseQuery = query.toLowerCase()
    return Object.values(this.registry).filter(
      animation =>
        animation.name.toLowerCase().includes(lowercaseQuery) ||
        animation.id.toLowerCase().includes(lowercaseQuery)
    )
  }

  /**
   * Export registry as JSON
   */
  public export(): string {
    return JSON.stringify(this.registry, null, 2)
  }

  /**
   * Import registry from JSON
   */
  public import(json: string): boolean {
    try {
      const imported = JSON.parse(json)
      this.registry = { ...this.registry, ...imported }
      return true
    } catch (error) {
      console.error('Failed to import animation registry:', error)
      return false
    }
  }
}

// Global animation registry instance
let globalAnimationRegistry: AnimationRegistryClass | null = null

/**
 * Get or create global animation registry
 */
export function getAnimationRegistry(
  config?: Partial<RegistryConfig>
): AnimationRegistryClass {
  if (!globalAnimationRegistry) {
    globalAnimationRegistry = new AnimationRegistryClass(config)
  }
  return globalAnimationRegistry
}

/**
 * Hook for animation registry
 */
export function useAnimationRegistry() {
  const [registry] = useState(() => getAnimationRegistry())
  const [animations, setAnimations] = useState(registry.getAll())

  const register = useCallback(
    (id: string, config: AnimationConfig) => {
      registry.register(id, config)
      setAnimations(registry.getAll())
    },
    [registry]
  )

  const get = useCallback(
    (id: string) => {
      return registry.get(id)
    },
    [registry]
  )

  const remove = useCallback(
    (id: string) => {
      const removed = registry.remove(id)
      if (removed) {
        setAnimations(registry.getAll())
      }
      return removed
    },
    [registry]
  )

  const search = useCallback(
    (query: string) => {
      return registry.search(query)
    },
    [registry]
  )

  return {
    animations,
    register,
    get,
    remove,
    search,
    getCount: () => registry.getCount(),
    validate: (id: string) => registry.validate(id),
    getOptimized: (id: string, deviceTier?: 'high' | 'medium' | 'low') =>
      registry.getOptimized(id, deviceTier),
    getReducedMotion: (id: string) => registry.getReducedMotion(id),
  }
}

/**
 * Cleanup global animation registry
 */
export function cleanupAnimationRegistry(): void {
  if (globalAnimationRegistry) {
    globalAnimationRegistry.clear()
    globalAnimationRegistry = null
  }
}

export default {
  getAnimationRegistry,
  useAnimationRegistry,
  cleanupAnimationRegistry,
}
