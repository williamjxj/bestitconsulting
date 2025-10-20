/**
 * Custom hook for managing scrolling behavior in Technology Showcase
 *
 * Provides scroll detection, state management, and performance optimization
 * for horizontal scrolling effects.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { debounce, createIntersectionObserver, FPSMonitor } from './animations'

export interface ScrollingState {
  currentCategory: string
  scrollPosition: number
  isScrolling: boolean
  animationProgress: number
  reducedMotion: boolean
}

export interface UseScrollingReturn {
  currentCategory: string
  scrollPosition: number
  isScrolling: boolean
  animationProgress: number
  scrollToCategory: (category: string) => void
  scrollToNext: () => void
  scrollToPrevious: () => void
  setIsHovered: (hovered: boolean) => void
}

export interface UseScrollingOptions {
  categories: string[]
  threshold?: number
  debounceMs?: number
  enablePerformanceMonitoring?: boolean
  autoplay?: boolean
  autoplaySpeed?: number
  pauseOnHover?: boolean
}

export function useScrolling({
  categories,
  threshold = 0.5,
  debounceMs = 16,
  enablePerformanceMonitoring = false,
  autoplay = false,
  autoplaySpeed = 3000,
  pauseOnHover = true,
}: UseScrollingOptions): UseScrollingReturn {
  const [currentCategory, setCurrentCategory] = useState(categories[0] || '')
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  const containerRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const fpsMonitorRef = useRef<FPSMonitor | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Initialize performance monitoring
  useEffect(() => {
    if (enablePerformanceMonitoring) {
      fpsMonitorRef.current = new FPSMonitor()
    }
  }, [enablePerformanceMonitoring])

  // Check for reduced motion preference
  useEffect(() => {
    const checkReducedMotion = () => {
      setReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )
    }

    checkReducedMotion()

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', checkReducedMotion)

    return () => {
      mediaQuery.removeEventListener('change', checkReducedMotion)
    }
  }, [])

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || reducedMotion || isHovered) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
        autoplayRef.current = null
      }
      return
    }

    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        const currentIndex = categories.indexOf(currentCategory)
        const nextIndex = (currentIndex + 1) % categories.length
        const nextCategory = categories[nextIndex]

        if (nextCategory) {
          scrollToCategory(nextCategory)
        }
      }, autoplaySpeed)
    }

    startAutoplay()

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
        autoplayRef.current = null
      }
    }
  }, [
    autoplay,
    reducedMotion,
    isHovered,
    currentCategory,
    categories,
    autoplaySpeed,
  ])

  // Debounced scroll handler
  const handleScroll = useCallback(
    debounce(() => {
      if (!containerRef.current) return

      const container = containerRef.current
      const scrollLeft = container.scrollLeft
      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth

      // Calculate scroll position (0 to 1)
      const progress = scrollLeft / (scrollWidth - clientWidth)
      setScrollPosition(progress)

      // Update animation progress
      setAnimationProgress(progress)

      // Determine current category based on scroll position
      const categoryIndex = Math.round(progress * (categories.length - 1))
      const newCategory = categories[categoryIndex] || categories[0]

      if (newCategory !== currentCategory) {
        setCurrentCategory(newCategory)
      }

      // Performance monitoring
      if (fpsMonitorRef.current) {
        const fps = fpsMonitorRef.current.update()
        if (fps < 30) {
          console.warn(`Low FPS detected: ${fps}`)
        }
      }
    }, debounceMs),
    [categories, currentCategory, debounceMs]
  )

  // Scroll start/end detection
  const handleScrollStart = useCallback(() => {
    setIsScrolling(true)

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  const handleScrollEnd = useCallback(() => {
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
    }, 150)
  }, [])

  // Setup scroll event listeners
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Add scroll event listeners
    container.addEventListener('scroll', handleScroll, { passive: true })
    container.addEventListener('scroll', handleScrollStart, { passive: true })
    container.addEventListener('scroll', handleScrollEnd, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScroll)
      container.removeEventListener('scroll', handleScrollStart)
      container.removeEventListener('scroll', handleScrollEnd)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll, handleScrollStart, handleScrollEnd])

  // Setup intersection observer for performance
  useEffect(() => {
    if (!containerRef.current) return

    const observer = createIntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Element is visible, enable animations
            entry.target.classList.add('animate-in')
          } else {
            // Element is not visible, disable animations
            entry.target.classList.remove('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    observerRef.current = observer

    // Observe all child elements
    const children = containerRef.current.querySelectorAll(
      '[data-technology-item]'
    )
    children.forEach(child => observer.observe(child))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [categories])

  // Navigation functions
  const scrollToCategory = useCallback(
    (category: string) => {
      if (!containerRef.current) return

      const categoryIndex = categories.indexOf(category)
      if (categoryIndex === -1) return

      const container = containerRef.current
      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth
      const maxScroll = scrollWidth - clientWidth

      const targetScroll = (categoryIndex / (categories.length - 1)) * maxScroll

      container.scrollTo({
        left: targetScroll,
        behavior: reducedMotion ? 'auto' : 'smooth',
      })
    },
    [categories, reducedMotion]
  )

  const scrollToNext = useCallback(() => {
    const currentIndex = categories.indexOf(currentCategory)
    const nextIndex = Math.min(currentIndex + 1, categories.length - 1)
    const nextCategory = categories[nextIndex]

    if (nextCategory) {
      scrollToCategory(nextCategory)
    }
  }, [currentCategory, categories, scrollToCategory])

  const scrollToPrevious = useCallback(() => {
    const currentIndex = categories.indexOf(currentCategory)
    const prevIndex = Math.max(currentIndex - 1, 0)
    const prevCategory = categories[prevIndex]

    if (prevCategory) {
      scrollToCategory(prevCategory)
    }
  }, [currentCategory, categories, scrollToCategory])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return {
    currentCategory,
    scrollPosition,
    isScrolling,
    animationProgress,
    scrollToCategory,
    scrollToNext,
    scrollToPrevious,
    setIsHovered,
  }
}

// Hook for container ref management
export function useScrollingContainer() {
  const containerRef = useRef<HTMLElement | null>(null)

  const setContainerRef = useCallback((element: HTMLElement | null) => {
    containerRef.current = element
  }, [])

  return { containerRef, setContainerRef }
}

// Hook for scroll performance monitoring
export function useScrollPerformance() {
  const [metrics, setMetrics] = useState({
    fps: 0,
    scrollLatency: 0,
    memoryUsage: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const monitor = new FPSMonitor()
    let lastScrollTime = 0

    const updateMetrics = () => {
      const now = performance.now()
      const fps = monitor.update()

      setMetrics(prev => ({
        ...prev,
        fps,
        scrollLatency: now - lastScrollTime,
        memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
      }))

      lastScrollTime = now
    }

    const rafId = requestAnimationFrame(updateMetrics)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])

  return metrics
}
