/**
 * Type definitions for animation system
 * Centralized types for all animation-related functionality
 */

export interface AnimationConfig {
  id: string
  name: string
  type: 'transition' | 'interaction' | 'scroll' | 'loading'
  duration: number
  easing: string | number[]
  delay?: number
  iterations?: number
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
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

export interface PerformanceMetrics {
  fps: number
  frameTime: number
  memoryUsage: number
  animationCount: number
  isThrottled: boolean
}

export interface AnimationPerformance {
  id: string
  startTime: number
  endTime?: number
  duration: number
  frameCount: number
  averageFPS: number
  memoryPeak: number
}

export interface AccessibilityConfig {
  ariaLabel?: string
  ariaDescription?: string
  keyboardAccessible: boolean
  screenReaderFriendly: boolean
  reducedMotionAlternative?: string
}

export interface MotionPreference {
  reducedMotion: boolean
  highContrast: boolean
  colorScheme: 'light' | 'dark' | 'auto'
  screenReader: boolean
}

export interface AnimationRegistry {
  [key: string]: AnimationConfig
}

export interface RegistryConfig {
  defaultDuration: number
  defaultEasing: string
  performanceThreshold: number
  reducedMotionFallback: boolean
}

export interface GSAPConfig {
  duration: number
  ease: string
  delay?: number
  stagger?: number
  onComplete?: () => void
  onStart?: () => void
}

export interface GSAPTimelineConfig extends GSAPConfig {
  paused?: boolean
  repeat?: number
  yoyo?: boolean
}

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

export interface WebGLConfig {
  width: number
  height: number
  antialias?: boolean
  alpha?: boolean
  powerPreference?: 'high-performance' | 'low-power' | 'default'
}

export interface ParticleSystemConfig {
  count: number
  size: number
  color: string
  speed: number
  opacity: number
}

export interface WebGLScene {
  scene: any // THREE.Scene
  camera: any // THREE.Camera
  renderer: any // THREE.WebGLRenderer
  animationId?: number
}

export interface UseAnimationReturn {
  isAnimating: boolean
  animationProgress: number
  startAnimation: () => void
  stopAnimation: () => void
  pauseAnimation: () => void
  resumeAnimation: () => void
}

export interface AnimationHookConfig {
  duration?: number
  easing?: string
  delay?: number
  onComplete?: () => void
  onStart?: () => void
  respectReducedMotion?: boolean
}

export interface ResponsiveAnimationConfig {
  mobile?: AnimationConfig
  tablet?: AnimationConfig
  desktop?: AnimationConfig
}

export interface AccessibilityManager {
  config: AccessibilityConfig
  preferences: MotionPreference
  isAccessible: boolean
  announceToScreenReader: (message: string) => void
  createAccessibleAnimation: (animation: any, fallback?: any) => any
  shouldReduceMotion: () => boolean
  shouldUseHighContrast: () => boolean
  shouldUseDarkMode: () => boolean
  updatePreferences: () => void
}

export interface PerformanceMonitor {
  getMetrics(): PerformanceMetrics
  startAnimation(id: string): void
  endAnimation(id: string): void
  getAnimationPerformance(id: string): AnimationPerformance | undefined
  getAllAnimationPerformance(): AnimationPerformance[]
  isPerformanceOptimal(): boolean
  getRecommendations(): string[]
  cleanup(): void
}

export interface AnimationRegistryClass {
  register(id: string, config: AnimationConfig): void
  get(id: string): AnimationConfig | undefined
  getAll(): AnimationRegistry
  getByType(type: AnimationConfig['type']): AnimationConfig[]
  has(id: string): boolean
  remove(id: string): boolean
  clear(): void
  getCount(): number
  validate(id: string): string[]
  getOptimized(
    id: string,
    deviceTier?: 'high' | 'medium' | 'low'
  ): AnimationConfig | undefined
  getReducedMotion(id: string): AnimationConfig | undefined
  search(query: string): AnimationConfig[]
  export(): string
  import(json: string): boolean
}

// Animation event types
export type AnimationEventType =
  | 'start'
  | 'end'
  | 'complete'
  | 'loop'
  | 'pause'
  | 'resume'
  | 'cancel'

export interface AnimationEvent {
  type: AnimationEventType
  animationId: string
  timestamp: number
  data?: any
}

// Animation state types
export type AnimationState =
  | 'idle'
  | 'running'
  | 'paused'
  | 'completed'
  | 'cancelled'
  | 'error'

export interface AnimationStateData {
  state: AnimationState
  progress: number
  startTime: number
  endTime?: number
  duration: number
  error?: string
}

// Device tier types
export type DeviceTier = 'high' | 'medium' | 'low'

export interface DeviceCapabilities {
  tier: DeviceTier
  supportsWebGL: boolean
  supportsWebGL2: boolean
  maxTextureSize: number
  memoryLimit: number
  preferredFPS: number
}

// Animation presets
export interface AnimationPreset {
  id: string
  name: string
  config: AnimationConfig
  category: string
  tags: string[]
  description: string
}

export interface AnimationPresetCategory {
  id: string
  name: string
  description: string
  presets: AnimationPreset[]
}

// Export all types
export type {
  AnimationConfig,
  ReducedMotionConfig,
  PerformanceConfig,
  PerformanceMetrics,
  AnimationPerformance,
  AccessibilityConfig,
  MotionPreference,
  AnimationRegistry,
  RegistryConfig,
  GSAPConfig,
  GSAPTimelineConfig,
  LottieAnimation,
  LottieConfig,
  WebGLConfig,
  ParticleSystemConfig,
  WebGLScene,
  UseAnimationReturn,
  AnimationHookConfig,
  ResponsiveAnimationConfig,
  AccessibilityManager,
  PerformanceMonitor,
  AnimationRegistryClass,
  AnimationEventType,
  AnimationEvent,
  AnimationState,
  AnimationStateData,
  DeviceTier,
  DeviceCapabilities,
  AnimationPreset,
  AnimationPresetCategory,
}
