/**
 * Framer Motion Animation Variants
 *
 * Comprehensive animation variants for the BestIT Consulting design system
 * Implements high-performance animations with accessibility compliance
 */

import { Variants } from 'framer-motion'
import { animationConfig } from './design-system'

// Core Animation Variants
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationConfig.duration.normal / 1000,
      ease: animationConfig.easing.easeOut,
    },
  },
}

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: { duration: 0 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationConfig.duration.normal / 1000,
      ease: animationConfig.easing.easeOut,
    },
  },
}

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
    transition: { duration: 0 },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: animationConfig.duration.normal / 1000,
      ease: animationConfig.easing.easeOut,
    },
  },
}

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
    transition: { duration: 0 },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: animationConfig.duration.normal / 1000,
      ease: animationConfig.easing.easeOut,
    },
  },
}

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: animationConfig.duration.fast / 1000,
      ease: animationConfig.easing.easeOut,
    },
  },
}

// Container Animations
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerFade: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: { duration: 0 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationConfig.duration.normal / 1000,
      ease: animationConfig.easing.easeOut,
    },
  },
}

// Hover Animations
export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: animationConfig.triggers.hover.scale,
    transition: {
      duration: animationConfig.triggers.hover.duration / 1000,
      ease: animationConfig.easing.easeOut,
    },
  },
}

export const hoverLift: Variants = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: {
      duration: animationConfig.duration.fast / 1000,
      ease: animationConfig.easing.easeOut,
    },
  },
}

// Focus Animations
export const focusRing: Variants = {
  rest: { scale: 1 },
  focus: {
    scale: animationConfig.triggers.focus.scale,
    transition: {
      duration: animationConfig.triggers.focus.duration / 1000,
      ease: animationConfig.easing.easeOut,
    },
  },
}

// Loading Animations
export const loadingPulse: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: animationConfig.easing.easeInOut,
    },
  },
}

export const loadingSpin: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Counter Animation
export const counterAnimation = {
  from: 0,
  to: (end: number) => end,
  duration: 2,
  ease: animationConfig.easing.easeOut,
}

// Accessibility-Aware Animation Helper
export const getAnimationVariants = (
  variant: Variants,
  respectReducedMotion = true
): Variants => {
  if (respectReducedMotion && typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0 },
        },
      }
    }
  }

  return variant
}

// Mobile-optimized animation variants
export const mobileFadeInUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

export const mobileSlideInLeft: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

export const mobileScaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
}

// Mobile-specific hover effects (reduced intensity)
export const mobileHoverScale: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
}

// Mobile stagger container (faster stagger)
export const mobileStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

// Mobile animation helper
export const getMobileAnimationVariants = (
  baseVariant: Variants,
  isMobile: boolean
): Variants => {
  if (!isMobile) return baseVariant

  // Return simplified mobile variants
  if (baseVariant === fadeInUp) return mobileFadeInUp
  if (baseVariant === slideInLeft) return mobileSlideInLeft
  if (baseVariant === scaleIn) return mobileScaleIn
  if (baseVariant === hoverScale) return mobileHoverScale
  if (baseVariant === staggerContainer) return mobileStaggerContainer

  // Default mobile fallback
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  }
}

// Performance-Optimized Animation Helper
export const getOptimizedVariants = (variant: Variants): Variants => {
  return {
    ...variant,
    visible: {
      ...variant.visible,
      transition: {
        ...variant.visible?.transition,
        // Use transform and opacity for GPU acceleration
        type: 'tween',
      },
    },
  }
}

// Scroll Trigger Configuration
export const scrollTriggerConfig = {
  threshold: animationConfig.triggers.scroll.threshold,
  once: animationConfig.triggers.scroll.once,
  rootMargin: animationConfig.triggers.scroll.rootMargin,
}

// Animation Presets
export const animationPresets = {
  hero: fadeInUp,
  card: scaleIn,
  text: fadeInUp,
  image: slideInLeft,
  button: scaleIn,
  counter: counterAnimation,
  loading: loadingPulse,
} as const

export type AnimationPreset = keyof typeof animationPresets
