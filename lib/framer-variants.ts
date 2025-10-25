/**
 * Framer Motion animation variants
 * Predefined animation patterns for consistent behavior across components
 */

import { Variants } from 'framer-motion'

// Base animation variants
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

export const scaleInUp: Variants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: -20 },
}

export const slideInUp: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
}

export const slideInDown: Variants = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
}

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
}

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
}

// Stagger container variants
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerChildren: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

// Hover and interaction variants
export const hoverScale: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
}

export const hoverLift: Variants = {
  hover: { y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' },
  tap: { y: 0 },
}

export const hoverGlow: Variants = {
  hover: {
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
    transition: { duration: 0.3 },
  },
}

// Button animation variants
export const buttonHover: Variants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
}

export const buttonRipple: Variants = {
  tap: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.3 },
  },
}

// Card animation variants
export const cardHover: Variants = {
  hover: {
    y: -8,
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    transition: { duration: 0.3 },
  },
  tap: {
    y: -4,
    transition: { duration: 0.1 },
  },
}

// Navigation animation variants
export const navSlide: Variants = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' },
}

export const navItem: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

// Modal and overlay variants
export const modalOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: 20 },
}

// Loading animation variants
export const loadingSpinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export const loadingPulse: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Text animation variants
export const textReveal: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export const textSlide: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

// Parallax animation variants
export const parallaxUp: Variants = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
}

export const parallaxDown: Variants = {
  initial: { y: -50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
}

// Transition configurations
export const defaultTransition = {
  duration: 0.6,
  ease: 'easeOut',
}

export const fastTransition = {
  duration: 0.3,
  ease: 'easeOut',
}

export const slowTransition = {
  duration: 1.0,
  ease: 'easeOut',
}

export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

export const bounceTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 10,
}

// Responsive animation variants
export const getResponsiveVariants = (baseVariants: Variants) => ({
  ...baseVariants,
  animate: {
    ...baseVariants.animate,
    transition: {
      duration:
        typeof window !== 'undefined' && window.innerWidth < 768 ? 0.3 : 0.6,
    },
  },
})

// Reduced motion variants
export const getReducedMotionVariants = (baseVariants: Variants) => ({
  ...baseVariants,
  animate: {
    ...baseVariants.animate,
    transition: {
      duration: 0.1,
      ease: 'linear',
    },
  },
})
