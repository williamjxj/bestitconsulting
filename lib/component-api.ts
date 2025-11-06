/**
 * Component API Contracts
 *
 * TypeScript interfaces for animated components and design system integration
 * Generated for UI/CSS Modernization feature
 */

import { ReactNode } from 'react'

// Animation Configuration Interfaces
export interface AnimationConfig {
  duration: number
  delay?: number
  easing: string
  repeat?: number
  yoyo?: boolean
}

export interface ScrollTriggerConfig {
  threshold: number
  once: boolean
  rootMargin?: string
}

export interface HoverAnimationConfig {
  scale?: number
  rotate?: number
  translateY?: number
  opacity?: number
}

// Component Props Interfaces
export interface AnimatedSectionProps {
  children: ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight'
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

export interface AnimatedCardProps {
  children: ReactNode
  hover?: HoverAnimationConfig
  delay?: number
  stagger?: number
  className?: string
}

export interface AnimatedCounterProps {
  end: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  className?: string
}

export interface AnimatedButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  hover?: HoverAnimationConfig
  onClick?: () => void
  disabled?: boolean
  className?: string
}

// Design System Interfaces
export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  neutral: {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }
  semantic: {
    success: string
    warning: string
    error: string
    info: string
  }
}

export interface TypographyScale {
  xs: string
  sm: string
  base: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
  '5xl': string
  '6xl': string
}

export interface SpacingScale {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
}

// Animation Hook Interfaces
export interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLElement>
  isInView: boolean
  hasAnimated: boolean
}

export interface UseCounterAnimationOptions {
  duration?: number
  delay?: number
  easing?: string
}

export interface UseCounterAnimationReturn {
  count: number
  isAnimating: boolean
  start: () => void
  reset: () => void
}

// Component Library Interfaces
export interface ComponentVariant {
  name: string
  styles: Record<string, string>
  usage: string
}

export interface ComponentProps {
  [key: string]: {
    type: 'string' | 'number' | 'boolean' | 'function'
    required: boolean
    defaultValue?: any
    description: string
  }
}

export interface AccessibilityConfig {
  ariaLabel?: string
  ariaDescribedBy?: string
  role?: string
  tabIndex?: number
  keyboardNavigation?: boolean
  screenReaderSupport?: boolean
}

// Performance Interfaces
export interface PerformanceConfig {
  enableGPUAcceleration: boolean
  respectReducedMotion: boolean
  optimizeForMobile: boolean
  lazyLoadThreshold: number
}

export interface AnimationPerformanceMetrics {
  fps: number
  duration: number
  memoryUsage: number
  renderTime: number
}

// Performance Metrics type alias
export type PerformanceMetrics = AnimationPerformanceMetrics

// Responsive Design Interfaces
export interface BreakpointConfig {
  mobile: number
  tablet: number
  desktop: number
  wide: number
}

export interface ResponsiveValue<T> {
  mobile: T
  tablet: T
  desktop: T
  wide: T
}

// Error Handling Interfaces
export interface AnimationError {
  code: string
  message: string
  component: string
  timestamp: Date
}

export interface FallbackConfig {
  enableFallbacks: boolean
  fallbackDuration: number
  fallbackEasing: string
}

// Integration Interfaces
export interface TailwindIntegration {
  generateClasses: (config: any) => string[]
  extendConfig: (config: any) => any
}

export interface FramerMotionIntegration {
  motionProps: Record<string, any>
  variants: Record<string, any>
  transition: Record<string, any>
}

export interface NextJSIntegration {
  imageOptimization: boolean
  fontOptimization: boolean
  bundleAnalysis: boolean
}
