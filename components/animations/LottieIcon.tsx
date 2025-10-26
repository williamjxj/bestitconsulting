/**
 * Lottie animation component for icons
 * Provides lightweight vector animations with performance optimization
 */

'use client'

import React, { useRef, useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import { LottieAnimation, LottieConfig } from '@/lib/animations/lottie'
import { useAccessibility } from '@/hooks/useAccessibility'

export interface LottieIconProps {
  animationId: string
  className?: string
  style?: React.CSSProperties
  size?: number | string
  color?: string
  loop?: boolean
  autoplay?: boolean
  speed?: number
  direction?: 1 | -1
  segments?: [number, number]
  onComplete?: () => void
  onLoopComplete?: () => void
  onEnterFrame?: () => void
  config?: LottieConfig
  fallback?: React.ReactNode
  respectReducedMotion?: boolean
}

export const LottieIcon: React.FC<LottieIconProps> = ({
  animationId,
  className = '',
  style = {},
  size = 24,
  color,
  loop = true,
  autoplay = true,
  speed = 1,
  direction = 1,
  segments,
  onComplete,
  onLoopComplete,
  onEnterFrame,
  config,
  fallback,
  respectReducedMotion = true,
}) => {
  const lottieRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [animationData, setAnimationData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const { preferences, createAccessibleAnimation } = useAccessibility()

  // Load animation data
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        // Import the animation registry
        const { getLottieAnimation } = await import('@/lib/animations/lottie')
        const animation = getLottieAnimation(animationId)

        if (!animation) {
          setError(`Animation "${animationId}" not found`)
          return
        }

        // Load animation data
        const response = await fetch(animation.path)
        if (!response.ok) {
          throw new Error(`Failed to load animation: ${response.statusText}`)
        }

        const data = await response.json()
        setAnimationData(data)
        setIsLoaded(true)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load animation'
        )
      }
    }

    loadAnimation()
  }, [animationId])

  // Handle reduced motion
  const shouldUseFallback = respectReducedMotion && preferences.reducedMotion

  if (shouldUseFallback && fallback) {
    return <>{fallback}</>
  }

  if (error) {
    console.warn(`Lottie animation error: ${error}`)
    return fallback || <div className='w-6 h-6 bg-gray-300 rounded' />
  }

  if (!isLoaded || !animationData) {
    return (
      <div
        className={`animate-pulse bg-gray-200 rounded ${className}`}
        style={{ width: size, height: size, ...style }}
      />
    )
  }

  const handleComplete = () => {
    onComplete?.()
  }

  const handleLoopComplete = () => {
    onLoopComplete?.()
  }

  const handleEnterFrame = () => {
    onEnterFrame?.()
  }

  const lottieConfig = {
    loop: config?.loop ?? loop,
    autoplay: config?.autoplay ?? autoplay,
    speed: config?.speed ?? speed,
    direction: config?.direction ?? direction,
    segments: config?.segments ?? segments,
    onComplete: handleComplete,
    onLoopComplete: handleLoopComplete,
    onEnterFrame: handleEnterFrame,
  }

  const containerStyle = {
    width: size,
    height: size,
    ...style,
  }

  return (
    <div className={className} style={containerStyle}>
      <Lottie
        ref={lottieRef}
        animationData={animationData}
        {...lottieConfig}
        style={{
          width: '100%',
          height: '100%',
          filter: color ? `hue-rotate(${color})` : undefined,
        }}
      />
    </div>
  )
}

/**
 * Preload Lottie animations for better performance
 */
export const preloadLottieAnimations = async (
  animationIds: string[]
): Promise<void> => {
  const { preloadLottieAnimations: preload } = await import(
    '@/lib/animations/lottie'
  )
  await preload(animationIds)
}

/**
 * Create Lottie icon with preset configuration
 */
export const createLottieIcon = (
  animationId: string,
  presetConfig: Partial<LottieIconProps> = {}
) => {
  return function PresetLottieIcon(props: Partial<LottieIconProps>) {
    return <LottieIcon animationId={animationId} {...presetConfig} {...props} />
  }
}

/**
 * Common Lottie icon presets
 */
export const LottieIconPresets = {
  Loading: createLottieIcon('loading', {
    size: 32,
    loop: true,
    autoplay: true,
  }),
  Success: createLottieIcon('success', {
    size: 24,
    loop: false,
    autoplay: false,
  }),
  Error: createLottieIcon('error', { size: 24, loop: false, autoplay: false }),
  Rocket: createLottieIcon('rocket', {
    size: 32,
    loop: false,
    autoplay: false,
  }),
  Code: createLottieIcon('code', {
    size: 24,
    loop: true,
    autoplay: true,
    speed: 0.5,
  }),
  Cloud: createLottieIcon('cloud', { size: 24, loop: true, autoplay: true }),
  Shield: createLottieIcon('shield', { size: 24, loop: true, autoplay: true }),
  Users: createLottieIcon('users', { size: 24, loop: true, autoplay: true }),
}

export default LottieIcon
