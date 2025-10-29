/**
 * Best IT Consulting Branding System
 * Centralized brand configuration for consistent visual identity
 */

export const brandConfig = {
  // Primary Brand Colors
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main brand blue
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    secondary: {
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
    accent: {
      blue: '#3b82f6',
      cyan: '#06b6d4',
      purple: '#8b5cf6',
      emerald: '#10b981',
      orange: '#f59e0b',
      pink: '#ec4899',
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },

  // Typography System
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },

  // Spacing System
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },

  // Border Radius System
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Shadow System
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    glow: '0 0 20px rgb(59 130 246 / 0.3)',
  },

  // Animation System
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '750ms',
      slowest: '1000ms',
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // Layout System
  layout: {
    container: {
      maxWidth: '1280px',
      padding: '0 1rem',
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },

  // Component Variants
  components: {
    button: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
      outline:
        'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
      ghost: 'text-blue-600 hover:bg-blue-50',
    },
    card: {
      default: 'bg-white border border-gray-200 shadow-sm',
      elevated: 'bg-white shadow-lg border border-gray-100',
      glass: 'bg-white/80 backdrop-blur-sm border border-white/20',
    },
    input: {
      default:
        'border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
      error:
        'border border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500',
    },
  },
}

// Brand utility functions
export const getBrandColor = (color: string, shade: number = 500) => {
  const colorMap = brandConfig.colors as any
  return colorMap[color]?.[shade] || brandConfig.colors.primary[500]
}

export const getBrandSpacing = (size: keyof typeof brandConfig.spacing) => {
  return brandConfig.spacing[size]
}

export const getBrandShadow = (size: keyof typeof brandConfig.shadows) => {
  return brandConfig.shadows[size]
}

export const getBrandAnimation = (
  type: 'duration' | 'easing',
  value: string
) => {
  return brandConfig.animations[type][
    value as keyof (typeof brandConfig.animations)[typeof type]
  ]
}

// Brand theme classes
export const brandClasses = {
  // Layout
  container: 'w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-16 sm:py-20 lg:py-24',

  // Typography
  heading: {
    h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900',
    h2: 'text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900',
    h3: 'text-2xl sm:text-3xl font-semibold text-gray-900',
    h4: 'text-xl sm:text-2xl font-semibold text-gray-900',
    h5: 'text-lg sm:text-xl font-medium text-gray-900',
    h6: 'text-base sm:text-lg font-medium text-gray-900',
  },

  // Text
  text: {
    large: 'text-lg text-gray-600',
    base: 'text-base text-gray-600',
    small: 'text-sm text-gray-500',
    caption: 'text-xs text-gray-400',
  },

  // Buttons
  button: {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200',
    secondary:
      'bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium px-6 py-3 rounded-lg transition-colors duration-200',
    outline:
      'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium px-6 py-3 rounded-lg transition-all duration-200',
  },

  // Cards
  card: {
    default: 'bg-white rounded-xl shadow-sm border border-gray-200 p-6',
    elevated: 'bg-white rounded-xl shadow-lg border border-gray-100 p-6',
    glass: 'bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 p-6',
  },

  // Gradients
  gradient: {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200',
    accent: 'bg-gradient-to-r from-blue-500 to-purple-500',
    hero: 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900',
  },
}
