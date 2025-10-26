/**
 * Animation hooks
 * React hooks for managing animations and visual effects
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { AnimationConfig, UseAnimationReturn } from '../lib/types'
import { useReducedMotion } from './useAccessibility'
import { usePerformanceOptimization } from './usePerformance'

/**
 * Hook for basic animation control
 */
export function useAnimation(
  animationConfig?: AnimationConfig,
  enabled: boolean = true
): UseAnimationReturn {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)

  const startAnimation = useCallback(() => {
    if (!enabled || prefersReducedMotion) return

    setIsAnimating(true)
    setAnimationProgress(0)
    startTimeRef.current = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current
      const duration = animationConfig?.duration || 500
      const progress = Math.min(elapsed / duration, 1)

      setAnimationProgress(progress)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        setAnimationProgress(1)
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [enabled, prefersReducedMotion, animationConfig])

  const stopAnimation = useCallback(() => {
    setIsAnimating(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  const pauseAnimation = useCallback(() => {
    // Pause logic would go here
    setIsAnimating(false)
  }, [])

  const resumeAnimation = useCallback(() => {
    // Resume logic would go here
    startAnimation()
  }, [startAnimation])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return {
    isAnimating,
    startAnimation,
    stopAnimation,
    pauseAnimation,
    resumeAnimation,
    animationProgress,
  }
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollAnimation(
  threshold: number = 0.1,
  triggerOnce: boolean = true
) {
  const [isInView, setIsInView] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const progress = entry.intersectionRatio
        setScrollProgress(progress)
        setIsInView(progress >= threshold)
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold])

  return {
    elementRef,
    isInView,
    scrollProgress,
    shouldAnimate: isInView || (triggerOnce && scrollProgress > 0),
  }
}

/**
 * Hook for hover animations
 */
export function useHoverAnimation(hoverConfig?: {
  scale?: number
  rotate?: number
  color?: string
  duration?: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [hoverProgress, setHoverProgress] = useState(0)

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  useEffect(() => {
    if (!isHovered) {
      setHoverProgress(0)
      return
    }

    const duration = hoverConfig?.duration || 300
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      setHoverProgress(progress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isHovered, hoverConfig])

  const getHoverStyle = useCallback(() => {
    if (!isHovered) return {}

    const scale = hoverConfig?.scale || 1.05
    const rotate = hoverConfig?.rotate || 0
    const color = hoverConfig?.color

    return {
      transform: `scale(${1 + (scale - 1) * hoverProgress}) rotate(${rotate * hoverProgress}deg)`,
      color: color,
      transition: `all ${hoverConfig?.duration || 300}ms ease-out`,
    }
  }, [isHovered, hoverProgress, hoverConfig])

  return {
    isHovered,
    hoverProgress,
    handleMouseEnter,
    handleMouseLeave,
    getHoverStyle,
  }
}

/**
 * Hook for staggered animations
 */
export function useStaggeredAnimation(
  itemCount: number,
  staggerDelay: number = 100
) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  const startStaggeredAnimation = useCallback(() => {
    setIsAnimating(true)
    setVisibleItems([])

    for (let i = 0; i < itemCount; i++) {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, i])
      }, i * staggerDelay)
    }

    // Mark animation as complete
    setTimeout(
      () => {
        setIsAnimating(false)
      },
      itemCount * staggerDelay + 500
    )
  }, [itemCount, staggerDelay])

  const resetAnimation = useCallback(() => {
    setVisibleItems([])
    setIsAnimating(false)
  }, [])

  return {
    visibleItems,
    isAnimating,
    startStaggeredAnimation,
    resetAnimation,
  }
}

/**
 * Hook for parallax scrolling
 */
export function useParallax(
  speed: number = 0.5,
  direction: 'up' | 'down' | 'left' | 'right' = 'up'
) {
  const [offset, setOffset] = useState(0)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementHeight = rect.height

      // Calculate parallax offset
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - elementTop) / (windowHeight + elementHeight)
        )
      )

      const newOffset = scrollProgress * speed * 100
      setOffset(newOffset)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  const getParallaxStyle = useCallback(() => {
    const transformMap = {
      up: `translateY(${offset}px)`,
      down: `translateY(${-offset}px)`,
      left: `translateX(${offset}px)`,
      right: `translateX(${-offset}px)`,
    }

    return {
      transform: transformMap[direction],
      willChange: 'transform',
    }
  }, [offset, direction])

  return {
    elementRef,
    offset,
    getParallaxStyle,
  }
}

/**
 * Hook for loading animations
 */
export function useLoadingAnimation(
  type: 'spinner' | 'skeleton' | 'progress' | 'pulse' = 'spinner',
  duration: number = 1000
) {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const animationRef = useRef<number | null>(null)

  const startLoading = useCallback(() => {
    setIsLoading(true)
    setProgress(0)

    const startTime = performance.now()
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progressValue = Math.min(elapsed / duration, 1)
      setProgress(progressValue)

      if (progressValue < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsLoading(false)
        setProgress(1)
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [duration])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  const getLoadingStyle = useCallback(() => {
    switch (type) {
      case 'spinner':
        return {
          animation: `spin ${duration}ms linear infinite`,
          transform: `rotate(${progress * 360}deg)`,
        }
      case 'pulse':
        return {
          animation: `pulse ${duration}ms ease-in-out infinite`,
          opacity: 0.5 + Math.sin(progress * Math.PI * 2) * 0.5,
        }
      case 'skeleton':
        return {
          background:
            'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: `skeleton ${duration}ms linear infinite`,
        }
      case 'progress':
        return {
          width: `${progress * 100}%`,
          transition: 'width 100ms ease-out',
        }
      default:
        return {}
    }
  }, [type, duration, progress])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return {
    isLoading,
    progress,
    startLoading,
    stopLoading,
    getLoadingStyle,
  }
}

/**
 * Hook for performance-optimized animations
 */
export function useOptimizedAnimation(
  animationConfig: AnimationConfig,
  componentId: string
) {
  const { shouldOptimize, optimizationLevel, getOptimizedProps } =
    usePerformanceOptimization(componentId)
  const prefersReducedMotion = useReducedMotion()

  const getOptimizedAnimationConfig = useCallback(() => {
    if (prefersReducedMotion) {
      return {
        ...animationConfig,
        duration: 0,
        easing: 'linear',
      }
    }

    if (shouldOptimize) {
      return getOptimizedProps(animationConfig)
    }

    return animationConfig
  }, [animationConfig, prefersReducedMotion, shouldOptimize, getOptimizedProps])

  return {
    optimizedConfig: getOptimizedAnimationConfig(),
    shouldOptimize,
    optimizationLevel,
  }
}

/**
 * Hook for animation sequences
 */
export function useAnimationSequence(
  animations: AnimationConfig[],
  loop: boolean = false
) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const playSequence = useCallback(() => {
    setIsPlaying(true)
    setIsComplete(false)
    setCurrentIndex(0)
  }, [])

  const pauseSequence = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const resumeSequence = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const resetSequence = useCallback(() => {
    setCurrentIndex(0)
    setIsPlaying(false)
    setIsComplete(false)
  }, [])

  // Auto-advance through animations
  useEffect(() => {
    if (!isPlaying || isComplete) return

    const currentAnimation = animations[currentIndex]
    if (!currentAnimation) return

    const duration = currentAnimation.duration || 500
    const timer = setTimeout(() => {
      const nextIndex = currentIndex + 1

      if (nextIndex >= animations.length) {
        if (loop) {
          setCurrentIndex(0)
        } else {
          setIsComplete(true)
          setIsPlaying(false)
        }
      } else {
        setCurrentIndex(nextIndex)
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [isPlaying, currentIndex, animations, loop, isComplete])

  return {
    currentAnimation: animations[currentIndex],
    currentIndex,
    isPlaying,
    isComplete,
    playSequence,
    pauseSequence,
    resumeSequence,
    resetSequence,
  }
}
