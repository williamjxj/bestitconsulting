/**
 * Responsive Breakpoint Configuration
 *
 * Defines responsive breakpoints and utilities for the BestIT Consulting design system
 * Implements mobile-first responsive design strategy
 */

import { breakpointConfig } from './design-system'

// Breakpoint values
export const breakpoints = {
  mobile: breakpointConfig.mobile,
  tablet: breakpointConfig.tablet,
  desktop: breakpointConfig.desktop,
  wide: breakpointConfig.wide,
} as const

// Media query strings
export const mediaQueries = {
  mobile: `(min-width: ${breakpoints.mobile}px)`,
  tablet: `(min-width: ${breakpoints.tablet}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px)`,
  wide: `(min-width: ${breakpoints.wide}px)`,
  mobileOnly: `(max-width: ${breakpoints.tablet - 1}px)`,
  tabletOnly: `(min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  desktopOnly: `(min-width: ${breakpoints.desktop}px) and (max-width: ${breakpoints.wide - 1}px)`,
  wideOnly: `(min-width: ${breakpoints.wide}px)`,
} as const

// Responsive value helper
export function getResponsiveValue<T>(values: {
  mobile?: T
  tablet?: T
  desktop?: T
  wide?: T
}): T {
  if (typeof window === 'undefined') {
    return values.mobile || values.tablet || values.desktop || values.wide!
  }

  const width = window.innerWidth

  if (width >= breakpoints.wide && values.wide !== undefined) {
    return values.wide
  } else if (width >= breakpoints.desktop && values.desktop !== undefined) {
    return values.desktop
  } else if (width >= breakpoints.tablet && values.tablet !== undefined) {
    return values.tablet
  } else {
    return values.mobile || values.tablet || values.desktop || values.wide!
  }
}

// Tailwind breakpoint utilities
export const tailwindBreakpoints = {
  sm: `${breakpoints.tablet}px`,
  md: `${breakpoints.desktop}px`,
  lg: `${breakpoints.wide}px`,
} as const

// Device type detection
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' | 'wide' {
  if (typeof window === 'undefined') {
    return 'desktop'
  }

  const width = window.innerWidth

  if (width >= breakpoints.wide) {
    return 'wide'
  } else if (width >= breakpoints.desktop) {
    return 'desktop'
  } else if (width >= breakpoints.tablet) {
    return 'tablet'
  } else {
    return 'mobile'
  }
}

// Responsive hook for React
export function useResponsive() {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isWide: false,
      deviceType: 'desktop' as const,
      width: 1024,
    }
  }

  const width = window.innerWidth
  const isMobile = width < breakpoints.tablet
  const isTablet = width >= breakpoints.tablet && width < breakpoints.desktop
  const isDesktop = width >= breakpoints.desktop && width < breakpoints.wide
  const isWide = width >= breakpoints.wide

  return {
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    deviceType: getDeviceType(),
    width,
  }
}

// Container max-widths
export const containerMaxWidths = {
  mobile: '100%',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const

// Grid configurations
export const gridConfig = {
  mobile: {
    columns: 1,
    gap: '16px',
    padding: '16px',
  },
  tablet: {
    columns: 2,
    gap: '24px',
    padding: '24px',
  },
  desktop: {
    columns: 3,
    gap: '32px',
    padding: '32px',
  },
  wide: {
    columns: 4,
    gap: '40px',
    padding: '40px',
  },
} as const

// Typography responsive scales
export const responsiveTypography = {
  mobile: {
    h1: 'text-3xl',
    h2: 'text-2xl',
    h3: 'text-xl',
    h4: 'text-lg',
    body: 'text-base',
    small: 'text-sm',
  },
  tablet: {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    body: 'text-lg',
    small: 'text-base',
  },
  desktop: {
    h1: 'text-5xl',
    h2: 'text-4xl',
    h3: 'text-3xl',
    h4: 'text-2xl',
    body: 'text-xl',
    small: 'text-lg',
  },
  wide: {
    h1: 'text-6xl',
    h2: 'text-5xl',
    h3: 'text-4xl',
    h4: 'text-3xl',
    body: 'text-2xl',
    small: 'text-xl',
  },
} as const

// Animation responsive configurations
export const responsiveAnimations = {
  mobile: {
    duration: 0.2,
    easing: 'ease-out',
    threshold: 0.3,
  },
  tablet: {
    duration: 0.3,
    easing: 'ease-out',
    threshold: 0.4,
  },
  desktop: {
    duration: 0.4,
    easing: 'ease-out',
    threshold: 0.5,
  },
  wide: {
    duration: 0.5,
    easing: 'ease-out',
    threshold: 0.6,
  },
} as const

export type Breakpoint = keyof typeof breakpoints
export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'wide'
export type ResponsiveValue<T> = {
  mobile?: T
  tablet?: T
  desktop?: T
  wide?: T
}
