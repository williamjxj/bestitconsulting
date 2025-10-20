/**
 * Component Interfaces for Technology Showcase Redesign
 *
 * These interfaces define the contracts for React components in the technology showcase.
 * All components must implement these interfaces to ensure type safety and consistency.
 */

import { ReactNode } from 'react'

// Base technology item interface
export interface TechnologyItem {
  id: string
  name: string
  icon: ReactNode
  color: string
  category: TechnologyCategory
  description?: string
}

// Technology category enum
export enum TechnologyCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  CLOUD_DEVOPS = 'cloud-devops',
}

// Technology category interface
export interface TechnologyCategoryData {
  id: TechnologyCategory
  name: string
  technologies: TechnologyItem[]
  order: number
}

// Scrolling state interface
export interface ScrollingState {
  currentCategory: TechnologyCategory
  scrollPosition: number
  isScrolling: boolean
  animationProgress: number
  reducedMotion: boolean
}

// TechnologyShowcase component props
export interface TechnologyShowcaseProps {
  categories: TechnologyCategoryData[]
  className?: string
  onCategoryChange?: (category: TechnologyCategory) => void
  enableAnimations?: boolean
}

// TechnologyCard component props
export interface TechnologyCardProps {
  technology: TechnologyItem
  isVisible: boolean
  animationDelay?: number
  className?: string
  onClick?: (technology: TechnologyItem) => void
}

// Scrolling hook interface
export interface UseScrollingReturn {
  currentCategory: TechnologyCategory
  scrollPosition: number
  isScrolling: boolean
  animationProgress: number
  scrollToCategory: (category: TechnologyCategory) => void
  scrollToNext: () => void
  scrollToPrevious: () => void
}

// Animation configuration interface
export interface AnimationConfig {
  duration: number
  easing: string
  delay: number
  threshold: number
}

// Responsive breakpoints interface
export interface ResponsiveConfig {
  mobile: AnimationConfig
  tablet: AnimationConfig
  desktop: AnimationConfig
}

// Component event handlers
export interface TechnologyShowcaseEvents {
  onCategoryChange: (category: TechnologyCategory) => void
  onTechnologyClick: (technology: TechnologyItem) => void
  onScrollStart: () => void
  onScrollEnd: () => void
  onAnimationComplete: () => void
}

// Accessibility props
export interface AccessibilityProps {
  'aria-label': string
  'aria-describedby'?: string
  'aria-live': 'polite' | 'assertive' | 'off'
  role: string
  tabIndex: number
}

// Performance monitoring interface
export interface PerformanceMetrics {
  renderTime: number
  animationFPS: number
  scrollLatency: number
  memoryUsage: number
}

// Error handling interface
export interface ErrorState {
  hasError: boolean
  error: Error | null
  retry: () => void
}
