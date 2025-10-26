/**
 * TypeScript interfaces for visual enhancements
 * Defines all types used across the visual enhancement system
 */

import { ReactNode, CSSProperties } from 'react'
import { MotionStyle } from 'framer-motion'

// ============================================================================
// Core Visual Asset Types
// ============================================================================

export interface VisualAsset {
  id: string
  type: 'image' | 'video' | 'icon' | 'graphic'
  src: string
  alt: string
  width: number
  height: number
  formats: string[] // ['webp', 'avif', 'jpg']
  sizes: ResponsiveSize[]
  loading: 'lazy' | 'eager'
  priority: boolean
  metadata: AssetMetadata
}

export interface ResponsiveSize {
  breakpoint: string
  width: number
  height: number
}

export interface AssetMetadata {
  title?: string
  description?: string
  keywords?: string[]
  createdAt: Date
  updatedAt: Date
}

// ============================================================================
// Animation Configuration Types
// ============================================================================

export interface AnimationConfig {
  id: string
  name: string
  type: 'transition' | 'interaction' | 'scroll' | 'loading'
  duration: number
  easing: string | number[]
  delay?: number
  iterations?: number
  direction?: 'normal' | 'reverse' | 'alternate'
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both'
  reducedMotion: ReducedMotionConfig
  performance: PerformanceConfig
}

export interface ReducedMotionConfig {
  enabled: boolean
  alternativeAnimation?: string
  staticFallback?: boolean
}

export interface PerformanceConfig {
  maxDuration: number
  targetFPS: number
  memoryLimit: number
  gpuAcceleration: boolean
}

// ============================================================================
// Visual Effect Types
// ============================================================================

export interface VisualEffect {
  id: string
  name: string
  type: 'parallax' | 'reveal' | 'hover' | 'focus' | 'loading'
  component: string
  trigger: EffectTrigger
  animation: AnimationConfig
  accessibility: AccessibilityConfig
}

export interface EffectTrigger {
  type: 'scroll' | 'hover' | 'focus' | 'click' | 'load'
  threshold?: number
  delay?: number
  once?: boolean
}

export interface AccessibilityConfig {
  ariaLabel?: string
  ariaDescription?: string
  keyboardAccessible: boolean
  screenReaderFriendly: boolean
  reducedMotionAlternative?: string
}

// ============================================================================
// Interactive Element Types
// ============================================================================

export interface InteractiveElement {
  id: string
  type: 'gallery' | 'slider' | 'accordion' | 'modal' | 'tooltip'
  component: string
  props: Record<string, any>
  animations: AnimationConfig[]
  interactions: InteractionConfig[]
  accessibility: AccessibilityConfig
}

export interface InteractionConfig {
  trigger: string
  action: string
  feedback: string
  animation?: AnimationConfig
}

// ============================================================================
// State Management Types
// ============================================================================

export interface VisualState {
  theme: ThemeConfig
  animations: AnimationState
  performance: PerformanceState
  accessibility: AccessibilityState
  userPreferences: UserPreferences
}

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto'
  colors: ColorPalette
  typography: TypographyConfig
  spacing: SpacingConfig
}

export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  border: string
}

export interface TypographyConfig {
  fontFamily: string
  fontSize: {
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
  }
  fontWeight: {
    normal: number
    medium: number
    semibold: number
    bold: number
  }
}

export interface SpacingConfig {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

export interface AnimationState {
  enabled: boolean
  reducedMotion: boolean
  performanceMode: 'high' | 'medium' | 'low'
  activeAnimations: string[]
}

export interface PerformanceState {
  metrics: PerformanceMetrics
  budgets: PerformanceBudget
  alerts: PerformanceAlert[]
}

export interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  renderTime: number
  frameDrops: number
  timestamp: number
}

export interface PerformanceBudget {
  maxFPS: number
  maxMemoryMB: number
  maxRenderTime: number
  maxFrameDrops: number
}

export interface PerformanceAlert {
  id: string
  type: 'warning' | 'error' | 'info'
  message: string
  timestamp: number
  resolved: boolean
}

export interface AccessibilityState {
  screenReader: boolean
  highContrast: boolean
  fontSize: 'small' | 'medium' | 'large'
  motionPreference: 'full' | 'reduced' | 'none'
}

export interface UserPreferences {
  animationSpeed: 'slow' | 'normal' | 'fast'
  visualEffects: boolean
  highContrast: boolean
  fontSize: number
}

// ============================================================================
// Component Props Types
// ============================================================================

export interface AnimationProps {
  animation?: AnimationConfig
  delay?: number
  duration?: number
  easing?: string
  onComplete?: () => void
  onStart?: () => void
  children: ReactNode
}

export interface ScrollAnimationProps extends AnimationProps {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  className?: string
}

export interface HoverAnimationProps extends AnimationProps {
  hoverScale?: number
  hoverRotate?: number
  hoverColor?: string
  transitionDuration?: number
}

export interface ParallaxProps {
  speed: number
  direction: 'up' | 'down' | 'left' | 'right'
  offset?: number
  children: ReactNode
}

export interface RevealProps {
  direction: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number
  delay?: number
  stagger?: number
  children: ReactNode
}

export interface LoadingProps {
  type: 'spinner' | 'skeleton' | 'progress' | 'pulse'
  size?: 'small' | 'medium' | 'large'
  color?: string
  duration?: number
}

// ============================================================================
// Gallery and Interactive Types
// ============================================================================

export interface ImageGalleryProps {
  images: GalleryImage[]
  showThumbnails?: boolean
  showCaptions?: boolean
  autoplay?: boolean
  autoplayDelay?: number
  onImageSelect?: (index: number) => void
}

export interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  thumbnail?: string
}

export interface PortfolioCardProps {
  title: string
  description: string
  image: GalleryImage
  tags: string[]
  link?: string
  onHover?: () => void
  onClick?: () => void
}

export interface ServiceCardProps {
  title: string
  description: string
  icon: string
  features: string[]
  price?: string
  onSelect?: () => void
}

// ============================================================================
// Form and Interaction Types
// ============================================================================

export interface FormFieldProps {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  placeholder?: string
  required?: boolean
  validation?: ValidationRule[]
  onFocus?: () => void
  onBlur?: () => void
  onChange?: (value: string) => void
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern'
  value?: any
  message: string
}

export interface FormValidationProps {
  field: string
  errors: string[]
  isValid: boolean
  showErrors: boolean
}

export interface FormSuccessProps {
  message: string
  onClose?: () => void
  autoClose?: boolean
  duration?: number
}

// ============================================================================
// Performance and Monitoring Types
// ============================================================================

export interface PerformanceMonitorConfig {
  enabled: boolean
  sampleRate: number
  maxSamples: number
  alertThresholds: PerformanceBudget
}

export interface AnimationPerformanceMetrics {
  componentId: string
  animationType: string
  startTime: number
  endTime: number
  duration: number
  fps: number
  frameDrops: number
  memoryUsage: number
}

// ============================================================================
// Utility Types
// ============================================================================

export type AnimationEasing =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'easeOut'
  | 'ease-in-out'
  | 'cubic-bezier'
  | 'spring'

export type AnimationDirection =
  | 'normal'
  | 'reverse'
  | 'alternate'
  | 'alternate-reverse'

export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both'

export type DevicePerformanceTier = 'high' | 'medium' | 'low'

export type MotionPreference = 'full' | 'reduced' | 'none'

export type ColorScheme = 'light' | 'dark' | 'auto'

// ============================================================================
// Event Types
// ============================================================================

export interface AnimationEvent {
  type: 'start' | 'complete' | 'pause' | 'resume' | 'cancel'
  animationId: string
  timestamp: number
  duration?: number
}

export interface InteractionEvent {
  type: 'hover' | 'click' | 'focus' | 'blur' | 'scroll'
  elementId: string
  timestamp: number
  coordinates?: { x: number; y: number }
}

export interface PerformanceEvent {
  type: 'fps-drop' | 'memory-warning' | 'render-slow'
  metrics: PerformanceMetrics
  timestamp: number
  severity: 'low' | 'medium' | 'high'
}

// ============================================================================
// Context Types
// ============================================================================

export interface VisualContextValue {
  state: VisualState
  updateTheme: (theme: Partial<ThemeConfig>) => void
  updateAnimations: (animations: Partial<AnimationState>) => void
  updatePerformance: (performance: Partial<PerformanceState>) => void
  updateAccessibility: (accessibility: Partial<AccessibilityState>) => void
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void
}

// ============================================================================
// Hook Return Types
// ============================================================================

export interface UseAnimationReturn {
  isAnimating: boolean
  startAnimation: () => void
  stopAnimation: () => void
  pauseAnimation: () => void
  resumeAnimation: () => void
  animationProgress: number
}

export interface UsePerformanceReturn {
  metrics: PerformanceMetrics
  isWithinBudget: boolean
  alerts: PerformanceAlert[]
  startMonitoring: () => void
  stopMonitoring: () => void
}

export interface UseAccessibilityReturn {
  prefersReducedMotion: boolean
  prefersHighContrast: boolean
  prefersDarkColorScheme: boolean
  motionPreference: MotionPreference
  announceToScreenReader: (message: string) => void
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Utility type to convert MotionStyle to CSSProperties for compatibility
 */
export type MotionStyleToCSS = MotionStyle extends CSSProperties
  ? MotionStyle
  : CSSProperties

/**
 * Utility type to safely convert MotionStyle to CSSProperties
 */
export const motionStyleToCSS = (
  style: MotionStyle | undefined
): CSSProperties | undefined => {
  if (!style) return undefined
  return style as CSSProperties
}
