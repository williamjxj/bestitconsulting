/**
 * Design System Configuration
 *
 * Centralized design system tokens extracted from (claude) folder
 * for consistent styling across all pages in the UI Animation Consolidation feature.
 */

// Color Palette Configuration
export const colorPalette = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  background: '#ffffff',
  foreground: '#0f172a',
}

// Typography Configuration
export const typography = {
  fontFamily: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem', // 72px
    '8xl': '6rem', // 96px
    '9xl': '8rem', // 128px
  },
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
}

// Spacing Configuration
export const spacing = {
  baseUnit: 8, // 8px base unit
  scale: [
    0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96,
  ],
  sections: {
    xs: 16, // 16px
    sm: 24, // 24px
    md: 32, // 32px
    lg: 48, // 48px
    xl: 64, // 64px
    '2xl': 80, // 80px
    '3xl': 96, // 96px
    '4xl': 128, // 128px
    '5xl': 160, // 160px
  },
}

// Breakpoint Configuration
export const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1920,
}

// Animation Configuration
export const animationTiming = {
  duration: {
    fast: 200, // 0.2s
    normal: 300, // 0.3s
    slow: 500, // 0.5s
    slower: 800, // 0.8s
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    cubicBezier: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  delay: {
    none: 0,
    short: 100,
    medium: 200,
    long: 400,
  },
}

// Component Configuration
export const components = {
  button: {
    sizes: {
      sm: {
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        borderRadius: '0.375rem',
      },
      md: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        borderRadius: '0.5rem',
      },
      lg: {
        padding: '1rem 2rem',
        fontSize: '1.125rem',
        borderRadius: '0.5rem',
      },
    },
    variants: {
      primary: {
        backgroundColor: colorPalette.primary[500],
        color: '#ffffff',
        border: 'none',
      },
      secondary: {
        backgroundColor: colorPalette.secondary[500],
        color: '#ffffff',
        border: 'none',
      },
      outline: {
        backgroundColor: 'transparent',
        color: colorPalette.primary[500],
        border: `1px solid ${colorPalette.primary[500]}`,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: colorPalette.primary[500],
        border: 'none',
      },
    },
  },
  card: {
    sizes: {
      sm: {
        padding: '1rem',
        borderRadius: '0.5rem',
      },
      md: {
        padding: '1.5rem',
        borderRadius: '0.75rem',
      },
      lg: {
        padding: '2rem',
        borderRadius: '1rem',
      },
    },
    variants: {
      default: {
        backgroundColor: '#ffffff',
        border: `1px solid ${colorPalette.neutral[200]}`,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      },
      elevated: {
        backgroundColor: '#ffffff',
        border: 'none',
        boxShadow:
          '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      outlined: {
        backgroundColor: 'transparent',
        border: `2px solid ${colorPalette.neutral[300]}`,
        boxShadow: 'none',
      },
      glass: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(4px)',
      },
    },
  },
  input: {
    sizes: {
      sm: {
        padding: '0.5rem 0.75rem',
        fontSize: '0.875rem',
        borderRadius: '0.375rem',
      },
      md: {
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        borderRadius: '0.5rem',
      },
      lg: {
        padding: '1rem 1.25rem',
        fontSize: '1.125rem',
        borderRadius: '0.5rem',
      },
    },
    variants: {
      default: {
        backgroundColor: '#ffffff',
        border: `1px solid ${colorPalette.neutral[300]}`,
        color: colorPalette.foreground,
      },
      error: {
        backgroundColor: '#ffffff',
        border: `1px solid ${colorPalette.semantic.error}`,
        color: colorPalette.foreground,
      },
      success: {
        backgroundColor: '#ffffff',
        border: `1px solid ${colorPalette.semantic.success}`,
        color: colorPalette.foreground,
      },
    },
  },
}

// Design System Interface
export interface DesignSystem {
  id: string
  name: string
  version: string
  colors: typeof colorPalette
  typography: typeof typography
  spacing: typeof spacing
  breakpoints: typeof breakpoints
  animations: typeof animationTiming
  components: typeof components
}

// Default Design System Configuration
export const defaultDesignSystem: DesignSystem = {
  id: 'bestit-modern',
  name: 'BestIT Modern',
  version: '1.0.0',
  colors: colorPalette,
  typography,
  spacing,
  breakpoints,
  animations: animationTiming,
  components,
}

// Utility functions
export const getColor = (colorPath: string): string => {
  const keys = colorPath.split('.')
  let value: any = colorPalette

  for (const key of keys) {
    value = value[key]
    if (value === undefined) {
      console.warn(`Color path "${colorPath}" not found`)
      return '#000000'
    }
  }

  return value
}

export const getSpacing = (size: keyof typeof spacing.sections): number => {
  return spacing.sections[size]
}

export const getBreakpoint = (size: keyof typeof breakpoints): number => {
  return breakpoints[size]
}

export const getTypography = (property: string, value: string): any => {
  const keys = property.split('.')
  let obj: any = typography

  for (const key of keys) {
    obj = obj[key]
    if (obj === undefined) {
      console.warn(`Typography property "${property}" not found`)
      return {}
    }
  }

  return obj[value] || obj
}

// Responsive utilities
export const getResponsiveValue = <T>(
  values: Partial<Record<keyof typeof breakpoints, T>>,
  defaultValue: T
): T => {
  if (typeof window === 'undefined') return defaultValue

  const width = window.innerWidth

  if (width >= breakpoints.wide && values.wide !== undefined) return values.wide
  if (width >= breakpoints.desktop && values.desktop !== undefined)
    return values.desktop
  if (width >= breakpoints.tablet && values.tablet !== undefined)
    return values.tablet
  if (width >= breakpoints.mobile && values.mobile !== undefined)
    return values.mobile

  return defaultValue
}

// Dark mode utilities
export const getDarkModeColors = () => ({
  primary: {
    50: '#172554',
    100: '#1e3a8a',
    200: '#1e40af',
    300: '#1d4ed8',
    400: '#2563eb',
    500: '#3b82f6',
    600: '#60a5fa',
    700: '#93c5fd',
    800: '#bfdbfe',
    900: '#dbeafe',
    950: '#eff6ff',
  },
  background: '#0f172a',
  foreground: '#f8fafc',
})

// High contrast utilities
export const getHighContrastColors = () => ({
  primary: '#000000',
  secondary: '#ffffff',
  background: '#ffffff',
  foreground: '#000000',
  border: '#000000',
})

// Export breakpoint configuration
export const breakpointConfig = breakpoints
