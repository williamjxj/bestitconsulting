/**
 * Design System Configuration
 *
 * Centralized configuration for the BestIT Consulting design system
 * Implements modern high-contrast design principles with accessibility compliance
 */

// Color Palette Configuration
export const colorPalette = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  accent: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
    950: '#422006',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
} as const

// Typography Configuration
export const typographyConfig = {
  fontFamily: {
    primary: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    secondary: ['ui-serif', 'Georgia', 'serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
  },
  fontSize: {
    xs: ['12px', '16px'],
    sm: ['14px', '20px'],
    base: ['16px', '24px'],
    lg: ['18px', '28px'],
    xl: ['20px', '28px'],
    '2xl': ['24px', '32px'],
    '3xl': ['30px', '36px'],
    '4xl': ['36px', '40px'],
    '5xl': ['48px', '1'],
    '6xl': ['60px', '1'],
    '7xl': ['72px', '1'],
    '8xl': ['96px', '1'],
    '9xl': ['128px', '1'],
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const

// Spacing Configuration (8px base unit)
export const spacingConfig = {
  baseUnit: 8,
  scale: {
    xs: '4px', // 0.5 * baseUnit
    sm: '8px', // 1 * baseUnit
    md: '16px', // 2 * baseUnit
    lg: '24px', // 3 * baseUnit
    xl: '32px', // 4 * baseUnit
    '2xl': '48px', // 6 * baseUnit
    '3xl': '64px', // 8 * baseUnit
    '4xl': '96px', // 12 * baseUnit
    '5xl': '128px', // 16 * baseUnit
  },
  sections: {
    small: '48px',
    medium: '80px',
    large: '120px',
    xlarge: '160px',
  },
  components: {
    padding: {
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    margin: {
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
  },
} as const

// Animation Configuration
export const animationConfig = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 800,
  },
  easing: {
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    easeInCubic: [0.55, 0.055, 0.675, 0.19],
    easeOutCubic: [0.215, 0.61, 0.355, 1],
    easeInOutCubic: [0.645, 0.045, 0.355, 1],
  },
  triggers: {
    scroll: {
      threshold: 0.2,
      once: true,
      rootMargin: '0px 0px -50px 0px',
    },
    hover: {
      scale: 1.05,
      duration: 200,
    },
    focus: {
      scale: 1.02,
      duration: 150,
    },
  },
  preferences: {
    respectReducedMotion: true,
    fallbackDuration: 0,
    fallbackEasing: 'ease',
  },
} as const

// Breakpoint Configuration
export const breakpointConfig = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1920,
} as const

// Component Library Configuration
export const componentLibrary = {
  buttons: {
    variants: {
      primary: {
        background: 'primary-500',
        color: 'white',
        hover: 'primary-600',
        focus: 'primary-700',
      },
      secondary: {
        background: 'neutral-100',
        color: 'neutral-900',
        hover: 'neutral-200',
        focus: 'neutral-300',
      },
      outline: {
        background: 'transparent',
        color: 'primary-500',
        border: 'primary-500',
        hover: 'primary-50',
        focus: 'primary-100',
      },
    },
    sizes: {
      sm: { padding: '8px 16px', fontSize: '14px' },
      md: { padding: '12px 24px', fontSize: '16px' },
      lg: { padding: '16px 32px', fontSize: '18px' },
    },
  },
  cards: {
    variants: {
      default: {
        background: 'white',
        border: 'neutral-200',
        shadow: 'sm',
      },
      elevated: {
        background: 'white',
        border: 'neutral-200',
        shadow: 'lg',
      },
      outlined: {
        background: 'transparent',
        border: 'neutral-300',
        shadow: 'none',
      },
    },
  },
} as const

// Accessibility Configuration
export const accessibilityConfig = {
  contrast: {
    minimum: 4.5, // WCAG AA
    enhanced: 7.0, // WCAG AAA
  },
  motion: {
    respectReducedMotion: true,
    fallbackDuration: 0,
  },
  focus: {
    visible: true,
    ringColor: 'primary-500',
    ringWidth: '2px',
  },
  screenReader: {
    skipLinks: true,
    landmarks: true,
    headings: true,
  },
} as const

// Performance Configuration
export const performanceConfig = {
  animations: {
    enableGPUAcceleration: true,
    respectReducedMotion: true,
    optimizeForMobile: true,
    lazyLoadThreshold: 0.2,
  },
  images: {
    enableWebP: true,
    enableAvif: true,
    lazyLoading: true,
    placeholder: 'blur',
  },
  fonts: {
    preload: true,
    display: 'swap',
    fallback: true,
  },
} as const

// Design System Export
export const designSystem = {
  colors: colorPalette,
  typography: typographyConfig,
  spacing: spacingConfig,
  animations: animationConfig,
  breakpoints: breakpointConfig,
  components: componentLibrary,
  accessibility: accessibilityConfig,
  performance: performanceConfig,
} as const

export type DesignSystem = typeof designSystem
export type ColorPalette = typeof colorPalette
export type TypographyConfig = typeof typographyConfig
export type SpacingConfig = typeof spacingConfig
export type AnimationConfig = typeof animationConfig
export type BreakpointConfig = typeof breakpointConfig
export type ComponentLibrary = typeof componentLibrary
export type AccessibilityConfig = typeof accessibilityConfig
export type PerformanceConfig = typeof performanceConfig
