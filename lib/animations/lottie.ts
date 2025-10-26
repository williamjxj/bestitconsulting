/**
 * Lottie animation registry and utilities
 * Provides centralized management of Lottie animations
 */

import { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react'

export interface LottieAnimation {
  id: string
  name: string
  path: string
  loop?: boolean
  autoplay?: boolean
  speed?: number
  direction?: 1 | -1
  segments?: [number, number]
}

export interface LottieConfig {
  loop?: boolean
  autoplay?: boolean
  speed?: number
  direction?: 1 | -1
  segments?: [number, number]
  onComplete?: () => void
  onLoopComplete?: () => void
  onEnterFrame?: () => void
}

export interface LottieRegistry {
  [key: string]: LottieAnimation
}

// Animation registry
const animationRegistry: LottieRegistry = {
  loading: {
    id: 'loading',
    name: 'Loading Spinner',
    path: '/animations/loading.json',
    loop: true,
    autoplay: true,
    speed: 1,
  },
  success: {
    id: 'success',
    name: 'Success Checkmark',
    path: '/animations/success.json',
    loop: false,
    autoplay: true,
    speed: 1,
  },
  error: {
    id: 'error',
    name: 'Error Alert',
    path: '/animations/error.json',
    loop: false,
    autoplay: true,
    speed: 1,
  },
  rocket: {
    id: 'rocket',
    name: 'Rocket Launch',
    path: '/animations/rocket.json',
    loop: false,
    autoplay: false,
    speed: 1,
  },
  code: {
    id: 'code',
    name: 'Code Animation',
    path: '/animations/code.json',
    loop: true,
    autoplay: true,
    speed: 0.5,
  },
  cloud: {
    id: 'cloud',
    name: 'Cloud Computing',
    path: '/animations/cloud.json',
    loop: true,
    autoplay: true,
    speed: 1,
  },
  shield: {
    id: 'shield',
    name: 'Security Shield',
    path: '/animations/shield.json',
    loop: true,
    autoplay: true,
    speed: 1,
  },
  users: {
    id: 'users',
    name: 'Team Collaboration',
    path: '/animations/users.json',
    loop: true,
    autoplay: true,
    speed: 1,
  },
}

/**
 * Get animation from registry
 */
export function getLottieAnimation(id: string): LottieAnimation | undefined {
  return animationRegistry[id]
}

/**
 * Register new animation
 */
export function registerLottieAnimation(animation: LottieAnimation): void {
  animationRegistry[animation.id] = animation
}

/**
 * Get all registered animations
 */
export function getAllLottieAnimations(): LottieAnimation[] {
  return Object.values(animationRegistry)
}

/**
 * Create Lottie animation component with enhanced features
 */
export function createLottieComponent(
  animationId: string,
  config?: LottieConfig
) {
  const animation = getLottieAnimation(animationId)

  if (!animation) {
    console.warn(`Lottie animation with id "${animationId}" not found`)
    return null
  }

  return function LottieComponent(props: {
    className?: string
    style?: React.CSSProperties
    onComplete?: () => void
    onLoopComplete?: () => void
    onEnterFrame?: () => void
  }) {
    const lottieRef = useRef<any>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const handleComplete = () => {
      config?.onComplete?.()
      props.onComplete?.()
    }

    const handleLoopComplete = () => {
      config?.onLoopComplete?.()
      props.onLoopComplete?.()
    }

    const handleEnterFrame = () => {
      config?.onEnterFrame?.()
      props.onEnterFrame?.()
    }

    useEffect(() => {
      if (lottieRef.current) {
        setIsLoaded(true)
      }
    }, [])

    return (
      <Lottie
        ref={lottieRef}
        animationData={animation}
        loop={config?.loop ?? animation.loop}
        autoplay={config?.autoplay ?? animation.autoplay}
        speed={config?.speed ?? animation.speed}
        direction={config?.direction ?? animation.direction}
        segments={config?.segments ?? animation.segments}
        onComplete={handleComplete}
        onLoopComplete={handleLoopComplete}
        onEnterFrame={handleEnterFrame}
        className={props.className}
        style={props.style}
      />
    )
  }
}

/**
 * Preload Lottie animations for better performance
 */
export function preloadLottieAnimations(animationIds: string[]): Promise<void[]> {
  const promises = animationIds.map(id => {
    const animation = getLottieAnimation(id)
    if (!animation) {
      return Promise.reject(new Error(`Animation ${id} not found`))
    }

    return fetch(animation.path)
      .then(response => response.json())
      .then(data => {
        // Cache the animation data
        animationRegistry[id] = { ...animation, data }
        return data
      })
  })

  return Promise.all(promises)
}

/**
 * Create responsive Lottie animation
 */
export function createResponsiveLottie(
  animationId: string,
  config?: LottieConfig & {
    mobile?: Partial<LottieConfig>
    tablet?: Partial<LottieConfig>
    desktop?: Partial<LottieConfig>
  }
) {
  const getResponsiveConfig = (): LottieConfig => {
    if (typeof window === 'undefined') return config || {}

    const width = window.innerWidth
    if (width < 768 && config?.mobile) {
      return { ...config, ...config.mobile }
    }
    if (width < 1024 && config?.tablet) {
      return { ...config, ...config.tablet }
    }
    if (config?.desktop) {
      return { ...config, ...config.desktop }
    }
    return config || {}
  }

  return createLottieComponent(animationId, getResponsiveConfig())
}

/**
 * Create accessibility-aware Lottie animation
 */
export function createAccessibleLottie(
  animationId: string,
  config?: LottieConfig & {
    respectReducedMotion?: boolean
    fallback?: React.ReactNode
  }
) {
  const shouldRespectReducedMotion = config?.respectReducedMotion ?? true

  if (shouldRespectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return function AccessibleLottieFallback(props: any) {
      return config?.fallback || <div>Animation disabled for accessibility</div>
    }
  }

  return createLottieComponent(animationId, config)
}

/**
 * Utility to check if Lottie is available
 */
export function isLottieAvailable(): boolean {
  return typeof Lottie !== 'undefined'
}

/**
 * Get animation metadata
 */
export function getAnimationMetadata(animationId: string) {
  const animation = getLottieAnimation(animationId)
  if (!animation) return null

  return {
    id: animation.id,
    name: animation.name,
    path: animation.path,
    hasLoop: animation.loop,
    hasAutoplay: animation.autoplay,
    speed: animation.speed,
  }
}

export default {
  getLottieAnimation,
  registerLottieAnimation,
  getAllLottieAnimations,
  createLottieComponent,
  preloadLottieAnimations,
  createResponsiveLottie,
  createAccessibleLottie,
  isLottieAvailable,
  getAnimationMetadata,
}
