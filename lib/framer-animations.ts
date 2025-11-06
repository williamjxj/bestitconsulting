/**
 * Framer Motion Animation Presets
 *
 * Pre-configured Framer Motion animations for consistent behavior
 * across all animated components in the UI Animation Consolidation feature.
 */

import { Variants } from 'framer-motion'

// Base animation variants
export const fadeInUp: Variants = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -60, opacity: 0 },
}

export const fadeInDown: Variants = {
  initial: { y: -60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 60, opacity: 0 },
}

export const slideInLeft: Variants = {
  initial: { x: -60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 60, opacity: 0 },
}

export const slideInRight: Variants = {
  initial: { x: 60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
}

export const scaleIn: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 1.2, opacity: 0 },
}

export const rotateIn: Variants = {
  initial: { rotate: -180, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  exit: { rotate: 180, opacity: 0 },
}

// Stagger container variants
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -40, opacity: 0 },
}

// Hover animations
export const hoverScale: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
}

export const hoverLift: Variants = {
  initial: { y: 0 },
  hover: { y: -5 },
  tap: { y: 0 },
}

export const hoverGlow: Variants = {
  initial: { boxShadow: '0 0 0px rgba(59, 130, 246, 0)' },
  hover: { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
}

export const hoverRotate: Variants = {
  initial: { rotate: 0 },
  hover: { rotate: 5 },
  tap: { rotate: 0 },
}

// Loading animations
export const spin: Variants = {
  animate: { rotate: 360 },
}

export const pulse: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
  },
}

export const bounce: Variants = {
  animate: { y: [0, -10, 0] },
}

export const fade: Variants = {
  animate: { opacity: [0.5, 1, 0.5] },
}

// Scroll-triggered animations
export const scrollReveal: Variants = {
  initial: { y: 60, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  exit: { y: -60, opacity: 0 },
}

export const scrollSlideIn: Variants = {
  initial: { x: -60, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  exit: { x: 60, opacity: 0 },
}

export const scrollFadeIn: Variants = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  exit: { opacity: 0 },
}

export const scrollScaleIn: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  exit: { scale: 1.2, opacity: 0 },
}

// Page transition animations
export const pageFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const pageSlide: Variants = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
}

export const pageScale: Variants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 1.1, opacity: 0 },
}

// Counter animations
export const counterReveal: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

// Modal animations
export const modalBackdrop: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const modalContent: Variants = {
  initial: { scale: 0.8, opacity: 0, y: 50 },
  animate: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.8, opacity: 0, y: 50 },
}

// Dropdown animations
export const dropdown: Variants = {
  initial: { opacity: 0, y: -10, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 },
}

// Tooltip animations
export const tooltip: Variants = {
  initial: { opacity: 0, y: 5, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 5, scale: 0.95 },
}

// Notification animations
export const notification: Variants = {
  initial: { x: 300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 300, opacity: 0 },
}

// Progress bar animations
export const progressBar: Variants = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
}

// Accordion animations
export const accordionContent: Variants = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
}

// Tab animations
export const tabContent: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

// Card animations
export const cardHover: Variants = {
  initial: { y: 0, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  hover: {
    y: -5,
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
}

// Button animations
export const buttonPress: Variants = {
  initial: { scale: 1 },
  tap: { scale: 0.95 },
}

export const buttonHover: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
}

// Form animations
export const formField: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const formError: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

// Image animations
export const imageLoad: Variants = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

export const imageHover: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
}

// Text animations
export const textReveal: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const textTypewriter: Variants = {
  initial: { width: 0 },
  animate: { width: '100%' },
}

// List animations
export const listItem: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

// Grid animations
export const gridItem: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

// Common transition configurations
export const defaultTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
}

export const springTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 17,
}

export const smoothTransition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
}

export const fastTransition = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1],
}

export const slowTransition = {
  duration: 0.8,
  ease: [0.4, 0, 0.2, 1],
}

// Viewport configurations
export const defaultViewport = {
  once: true,
  margin: '-100px',
}

export const immediateViewport = {
  once: true,
  margin: '0px',
}

export const delayedViewport = {
  once: true,
  margin: '-200px',
}

// Utility functions for creating custom variants
export const createCustomVariant = (
  initial: any,
  animate: any,
  exit?: any
): Variants => ({
  initial,
  animate,
  ...(exit && { exit }),
})

export const createHoverVariant = (
  initial: any,
  hover: any,
  tap?: any
): Variants => ({
  initial,
  hover,
  ...(tap && { tap }),
})

export const createScrollVariant = (
  initial: any,
  whileInView: any,
  exit?: any
): Variants => ({
  initial,
  whileInView,
  ...(exit && { exit }),
})

// Performance-optimized variants for reduced motion
export const reducedMotionVariants = {
  fadeInUp: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scaleIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
}

// Check for reduced motion preference
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Get appropriate variants based on motion preference
export const getMotionVariants = (
  normalVariants: Variants,
  reducedVariants: Variants
): Variants => {
  return shouldReduceMotion() ? reducedVariants : normalVariants
}
