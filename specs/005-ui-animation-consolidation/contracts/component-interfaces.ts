/**
 * Component Interface Contracts
 *
 * TypeScript interfaces for animated components in the UI Animation Consolidation feature.
 * These interfaces ensure type safety and consistency across all animated components.
 */

import { ReactNode, CSSProperties } from 'react'

// Base animation configuration
export interface AnimationConfig {
  id: string
  name: string
  type: 'scroll' | 'hover' | 'click' | 'stagger' | 'counter'
  duration: number
  delay: number
  easing: string
  threshold: number
  staggerDelay: number
  reducedMotion: boolean
  performance: 'low' | 'medium' | 'high'
}

// Scroll reveal component props
export interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  threshold?: number
  duration?: number
  easing?: string
  className?: string
  as?: keyof JSX.IntrinsicElements
}

// Stagger container component props
export interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  threshold?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
}

// Animated button component props
export interface AnimatedButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  onHover?: () => void
  className?: string
  animation?: AnimationConfig
  hover?: {
    scale?: number
    rotate?: number
    color?: string
  }
  click?: {
    scale?: number
    duration?: number
  }
}

// Animated card component props
export interface AnimatedCardProps {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'outlined' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  hover?: boolean
  disabled?: boolean
  onClick?: () => void
  onHover?: () => void
  className?: string
  animation?: AnimationConfig
  hover?: {
    scale?: number
    y?: number
    shadow?: string
  }
}

// Animated section component props
export interface AnimatedSectionProps {
  children: ReactNode
  variant?: 'fade' | 'slide' | 'scale' | 'stagger'
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  threshold?: number
  duration?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
}

// Animated text component props
export interface AnimatedTextProps {
  children: ReactNode
  variant?: 'fade' | 'slide' | 'typewriter' | 'split'
  delay?: number
  duration?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
  split?: boolean
  stagger?: number
}

// Animated image component props
export interface AnimatedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  variant?: 'fade' | 'scale' | 'slide' | 'parallax'
  delay?: number
  duration?: number
  className?: string
  loading?: 'lazy' | 'eager'
  placeholder?: string
  fallback?: string
  onLoad?: () => void
  onError?: () => void
}

// Animated counter component props
export interface AnimatedCounterProps {
  end: number
  start?: number
  duration?: number
  suffix?: string
  prefix?: string
  delay?: number
  threshold?: number
  className?: string
  format?: (value: number) => string
  onComplete?: () => void
}

// R2 Image component props
export interface R2ImageProps {
  assetId: string
  alt: string
  width?: number
  height?: number
  format?: 'webp' | 'avif' | 'jpg' | 'png'
  quality?: number
  sizes?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  className?: string
  style?: CSSProperties
  onLoad?: () => void
  onError?: () => void
}

// R2 Video component props
export interface R2VideoProps {
  assetId: string
  width?: number
  height?: number
  poster?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  className?: string
  style?: CSSProperties
  onLoad?: () => void
  onError?: () => void
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
}

// Design system configuration
export interface DesignSystemConfig {
  id: string
  name: string
  version: string
  colors: ColorPalette
  typography: TypographyConfig
  spacing: SpacingConfig
  breakpoints: BreakpointConfig
  animations: AnimationConfig[]
  components: ComponentConfig[]
}

// Color palette configuration
export interface ColorPalette {
  primary: ColorScale
  secondary: ColorScale
  neutral: ColorScale
  semantic: SemanticColors
  background: string
  foreground: string
}

// Color scale (50-950)
export interface ColorScale {
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
  950: string
}

// Semantic colors
export interface SemanticColors {
  success: string
  warning: string
  error: string
  info: string
}

// Typography configuration
export interface TypographyConfig {
  fontFamily: string
  fontSizes: FontSizeScale
  fontWeights: FontWeightScale
  lineHeights: LineHeightScale
  letterSpacing: LetterSpacingScale
}

// Font size scale
export interface FontSizeScale {
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
  '7xl': string
  '8xl': string
  '9xl': string
}

// Font weight scale
export interface FontWeightScale {
  thin: number
  extralight: number
  light: number
  normal: number
  medium: number
  semibold: number
  bold: number
  extrabold: number
  black: number
}

// Line height scale
export interface LineHeightScale {
  none: number
  tight: number
  snug: number
  normal: number
  relaxed: number
  loose: number
}

// Letter spacing scale
export interface LetterSpacingScale {
  tighter: string
  tight: string
  normal: string
  wide: string
  wider: string
  widest: string
}

// Spacing configuration
export interface SpacingConfig {
  baseUnit: number
  scale: number[]
  sections: SectionSpacing
}

// Section spacing
export interface SectionSpacing {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
  '3xl': number
  '4xl': number
  '5xl': number
}

// Breakpoint configuration
export interface BreakpointConfig {
  mobile: number
  tablet: number
  desktop: number
  wide: number
}

// Component configuration
export interface ComponentConfig {
  id: string
  name: string
  type: 'button' | 'card' | 'section' | 'text' | 'image' | 'counter'
  props: ComponentProps
  animations: AnimationConfig[]
  variants: ComponentVariant[]
  accessibility: AccessibilityConfig
  performance: PerformanceConfig
}

// Component props interface
export interface ComponentProps {
  children?: ReactNode
  className?: string
  variant?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  onHover?: () => void
}

// Component variant
export interface ComponentVariant {
  name: string
  styles: CSSProperties
  animations: AnimationConfig[]
  accessibility: AccessibilityConfig
}

// Accessibility configuration
export interface AccessibilityConfig {
  ariaLabel?: string
  ariaDescription?: string
  role?: string
  tabIndex?: number
  keyboardShortcuts?: KeyboardShortcut[]
}

// Keyboard shortcut
export interface KeyboardShortcut {
  key: string
  handler: () => void
  description: string
}

// Performance configuration
export interface PerformanceConfig {
  lazy: boolean
  preload: boolean
  gpuAcceleration: boolean
  reducedMotion: boolean
}

// Media asset interface
export interface MediaAsset {
  id: string
  filename: string
  url: string
  type: 'image' | 'video'
  category: 'team' | 'company' | 'general'
  format: string
  size: number
  dimensions: MediaDimensions
  optimization: OptimizationSettings
  fallback: FallbackConfig
  metadata: AssetMetadata
  createdAt: Date
  updatedAt: Date
}

// Media dimensions
export interface MediaDimensions {
  width: number
  height: number
  aspectRatio: number
}

// Optimization settings
export interface OptimizationSettings {
  quality: number
  formats: string[]
  sizes: number[]
  lazy: boolean
  placeholder?: string
}

// Fallback configuration
export interface FallbackConfig {
  enabled: boolean
  type: 'placeholder' | 'error' | 'retry'
  placeholderUrl?: string
  errorMessage?: string
  retryAttempts?: number
  retryDelay?: number
}

// Asset metadata
export interface AssetMetadata {
  alt?: string
  title?: string
  description?: string
  tags?: string[]
  author?: string
  license?: string
}

// API response interfaces
export interface MediaApiResponse {
  assets: MediaAsset[]
  total: number
  hasMore: boolean
  pagination: PaginationInfo
}

export interface PaginationInfo {
  limit: number
  offset: number
  total: number
}

export interface ErrorResponse {
  error: string
  message: string
  details?: Record<string, unknown>
}

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy' | 'error'
  bucketUrl?: string
  lastChecked: string
  responseTime?: number
  error?: string
}
