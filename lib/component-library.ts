/**
 * Component Library Configuration
 *
 * Centralized configuration for reusable animated components
 * in the UI Animation Consolidation feature.
 */

import { AnimationConfig } from './animations'
import { DesignSystem } from './design-system'

// Component Library Interface
export interface ComponentLibrary {
  id: string
  name: string
  type: 'button' | 'card' | 'section' | 'text' | 'image' | 'counter'
  props: ComponentProps
  animations: AnimationConfig[]
  variants: ComponentVariant[]
  accessibility: AccessibilityConfig
  performance: PerformanceConfig
}

// Component Props Interface
export interface ComponentProps {
  children?: React.ReactNode
  className?: string
  variant?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  onHover?: () => void
}

// Component Variant
export interface ComponentVariant {
  name: string
  styles: React.CSSProperties
  animations: AnimationConfig[]
  accessibility: AccessibilityConfig
}

// Accessibility Configuration
export interface AccessibilityConfig {
  ariaLabel?: string
  ariaDescription?: string
  role?: string
  tabIndex?: number
  keyboardShortcuts?: KeyboardShortcut[]
}

// Keyboard Shortcut
export interface KeyboardShortcut {
  key: string
  handler: () => void
  description: string
}

// Performance Configuration
export interface PerformanceConfig {
  lazy: boolean
  preload: boolean
  gpuAcceleration: boolean
  reducedMotion: boolean
}

// Default Component Library
export const componentLibrary: ComponentLibrary[] = [
  {
    id: 'animated-button',
    name: 'Animated Button',
    type: 'button',
    props: {
      children: 'Button',
      className: '',
      variant: 'primary',
      size: 'md',
      disabled: false,
      loading: false,
      onClick: () => {},
      onHover: () => {},
    },
    animations: [
      {
        id: 'button-hover',
        name: 'Button Hover',
        type: 'hover',
        duration: 300,
        delay: 0,
        easing: [0.4, 0, 0.2, 1] as const,
        threshold: 0.5,
        staggerDelay: 0,
        reducedMotion: true,
        performance: 'low',
      },
      {
        id: 'button-click',
        name: 'Button Click',
        type: 'click',
        duration: 150,
        delay: 0,
        easing: [0.4, 0, 0.2, 1] as const,
        threshold: 0.5,
        staggerDelay: 0,
        reducedMotion: true,
        performance: 'low',
      },
    ],
    variants: [
      {
        name: 'primary',
        styles: {
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          border: 'none',
          borderRadius: '0.5rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        },
        animations: [
          {
            id: 'primary-hover',
            name: 'Primary Hover',
            type: 'hover',
            duration: 300,
            delay: 0,
            easing: [0.4, 0, 0.2, 1] as const,
            threshold: 0.5,
            staggerDelay: 0,
            reducedMotion: true,
            performance: 'low',
          },
        ],
        accessibility: {
          ariaLabel: 'Primary button',
          role: 'button',
          tabIndex: 0,
        },
      },
      {
        name: 'secondary',
        styles: {
          backgroundColor: '#8b5cf6',
          color: '#ffffff',
          border: 'none',
          borderRadius: '0.5rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        },
        animations: [
          {
            id: 'secondary-hover',
            name: 'Secondary Hover',
            type: 'hover',
            duration: 300,
            delay: 0,
            easing: [0.4, 0, 0.2, 1] as const,
            threshold: 0.5,
            staggerDelay: 0,
            reducedMotion: true,
            performance: 'low',
          },
        ],
        accessibility: {
          ariaLabel: 'Secondary button',
          role: 'button',
          tabIndex: 0,
        },
      },
    ],
    accessibility: {
      ariaLabel: 'Animated button',
      role: 'button',
      tabIndex: 0,
      keyboardShortcuts: [
        {
          key: 'Enter',
          handler: () => {},
          description: 'Activate button',
        },
        {
          key: ' ',
          handler: () => {},
          description: 'Activate button',
        },
      ],
    },
    performance: {
      lazy: false,
      preload: true,
      gpuAcceleration: true,
      reducedMotion: true,
    },
  },
  {
    id: 'animated-card',
    name: 'Animated Card',
    type: 'card',
    props: {
      children: 'Card content',
      className: '',
      variant: 'default',
      size: 'md',
      disabled: false,
      loading: false,
      onClick: () => {},
      onHover: () => {},
    },
    animations: [
      {
        id: 'card-hover',
        name: 'Card Hover',
        type: 'hover',
        duration: 300,
        delay: 0,
        easing: [0.4, 0, 0.2, 1] as const,
        threshold: 0.5,
        staggerDelay: 0,
        reducedMotion: true,
        performance: 'low',
      },
    ],
    variants: [
      {
        name: 'default',
        styles: {
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        },
        animations: [
          {
            id: 'default-hover',
            name: 'Default Hover',
            type: 'hover',
            duration: 300,
            delay: 0,
            easing: [0.4, 0, 0.2, 1] as const,
            threshold: 0.5,
            staggerDelay: 0,
            reducedMotion: true,
            performance: 'low',
          },
        ],
        accessibility: {
          ariaLabel: 'Card',
          role: 'button',
          tabIndex: 0,
        },
      },
      {
        name: 'elevated',
        styles: {
          backgroundColor: '#ffffff',
          border: 'none',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          boxShadow:
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        },
        animations: [
          {
            id: 'elevated-hover',
            name: 'Elevated Hover',
            type: 'hover',
            duration: 300,
            delay: 0,
            easing: [0.4, 0, 0.2, 1] as const,
            threshold: 0.5,
            staggerDelay: 0,
            reducedMotion: true,
            performance: 'low',
          },
        ],
        accessibility: {
          ariaLabel: 'Elevated card',
          role: 'button',
          tabIndex: 0,
        },
      },
    ],
    accessibility: {
      ariaLabel: 'Animated card',
      role: 'button',
      tabIndex: 0,
    },
    performance: {
      lazy: true,
      preload: false,
      gpuAcceleration: true,
      reducedMotion: true,
    },
  },
  {
    id: 'scroll-reveal',
    name: 'Scroll Reveal',
    type: 'section',
    props: {
      children: 'Content to reveal',
      className: '',
      variant: 'fadeInUp',
      size: 'md',
      disabled: false,
      loading: false,
      onClick: () => {},
      onHover: () => {},
    },
    animations: [
      {
        id: 'scroll-reveal',
        name: 'Scroll Reveal',
        type: 'scroll',
        duration: 800,
        delay: 0,
        easing: [0.4, 0, 0.2, 1] as const,
        threshold: 0.2,
        staggerDelay: 0,
        reducedMotion: true,
        performance: 'low',
      },
    ],
    variants: [
      {
        name: 'fadeInUp',
        styles: {
          opacity: 0,
          transform: 'translateY(60px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        animations: [
          {
            id: 'fade-in-up',
            name: 'Fade In Up',
            type: 'scroll',
            duration: 800,
            delay: 0,
            easing: [0.4, 0, 0.2, 1] as const,
            threshold: 0.2,
            staggerDelay: 0,
            reducedMotion: true,
            performance: 'low',
          },
        ],
        accessibility: {
          ariaLabel: 'Scroll reveal content',
          role: 'region',
        },
      },
      {
        name: 'slideInLeft',
        styles: {
          opacity: 0,
          transform: 'translateX(-60px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        animations: [
          {
            id: 'slide-in-left',
            name: 'Slide In Left',
            type: 'scroll',
            duration: 800,
            delay: 0,
            easing: [0.4, 0, 0.2, 1] as const,
            threshold: 0.2,
            staggerDelay: 0,
            reducedMotion: true,
            performance: 'low',
          },
        ],
        accessibility: {
          ariaLabel: 'Slide in content',
          role: 'region',
        },
      },
    ],
    accessibility: {
      ariaLabel: 'Scroll reveal section',
      role: 'region',
    },
    performance: {
      lazy: true,
      preload: false,
      gpuAcceleration: true,
      reducedMotion: true,
    },
  },
]

// Utility functions
export const getComponent = (id: string): ComponentLibrary | undefined => {
  return componentLibrary.find(component => component.id === id)
}

export const getComponentVariant = (
  componentId: string,
  variantName: string
): ComponentVariant | undefined => {
  const component = getComponent(componentId)
  if (!component) return undefined

  return component.variants.find(variant => variant.name === variantName)
}

export const getComponentAnimation = (
  componentId: string,
  animationId: string
): AnimationConfig | undefined => {
  const component = getComponent(componentId)
  if (!component) return undefined

  return component.animations.find(animation => animation.id === animationId)
}

export const createCustomComponent = (
  id: string,
  name: string,
  type: ComponentLibrary['type'],
  props: ComponentProps,
  animations: AnimationConfig[],
  variants: ComponentVariant[],
  accessibility: AccessibilityConfig,
  performance: PerformanceConfig
): ComponentLibrary => {
  return {
    id,
    name,
    type,
    props,
    animations,
    variants,
    accessibility,
    performance,
  }
}

export const validateComponent = (component: ComponentLibrary): string[] => {
  const errors: string[] = []

  if (!component.id) errors.push('Component ID is required')
  if (!component.name) errors.push('Component name is required')
  if (!component.type) errors.push('Component type is required')
  if (!component.props) errors.push('Component props are required')
  if (!component.animations || component.animations.length === 0) {
    errors.push('Component must have at least one animation')
  }
  if (!component.variants || component.variants.length === 0) {
    errors.push('Component must have at least one variant')
  }
  if (!component.accessibility)
    errors.push('Component accessibility config is required')
  if (!component.performance)
    errors.push('Component performance config is required')

  return errors
}

export const optimizeComponent = (
  component: ComponentLibrary
): ComponentLibrary => {
  const optimized = { ...component }

  // Optimize animations for performance
  optimized.animations = component.animations.map(animation => ({
    ...animation,
    duration: Math.min(animation.duration, 800),
    performance:
      animation.duration > 600
        ? 'high'
        : animation.duration > 300
          ? 'medium'
          : 'low',
  }))

  // Optimize performance config
  optimized.performance = {
    ...component.performance,
    lazy: true,
    gpuAcceleration: true,
    reducedMotion: true,
  }

  return optimized
}
