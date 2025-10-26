'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import {
  VisualState,
  VisualContextValue,
  ThemeConfig,
  AnimationState,
  PerformanceState,
  AccessibilityState,
  UserPreferences,
} from '../types'

// Initial state
const initialState: VisualState = {
  theme: {
    mode: 'auto',
    colors: {
      primary: 'hsl(221, 83%, 53%)',
      secondary: 'hsl(210, 40%, 98%)',
      accent: 'hsl(210, 40%, 96%)',
      background: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(222.2, 84%, 4.9%)',
      muted: 'hsl(210, 40%, 96%)',
      border: 'hsl(214.3, 31.8%, 91.4%)',
    },
    typography: {
      fontFamily: 'var(--font-geist-sans), ui-sans-serif, system-ui',
      fontSize: {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
    },
  },
  animations: {
    enabled: true,
    reducedMotion: false,
    performanceMode: 'high',
    activeAnimations: [],
  },
  performance: {
    metrics: {
      fps: 60,
      memoryUsage: 0,
      renderTime: 16,
      frameDrops: 0,
      timestamp: Date.now(),
    },
    budgets: {
      maxFPS: 60,
      maxMemoryMB: 50,
      maxRenderTime: 16,
      maxFrameDrops: 5,
    },
    alerts: [],
  },
  accessibility: {
    screenReader: false,
    highContrast: false,
    fontSize: 'medium',
    motionPreference: 'full',
  },
  userPreferences: {
    animationSpeed: 'normal',
    visualEffects: true,
    highContrast: false,
    fontSize: 16,
  },
}

// Action types
type VisualAction =
  | { type: 'UPDATE_THEME'; payload: Partial<ThemeConfig> }
  | { type: 'UPDATE_ANIMATIONS'; payload: Partial<AnimationState> }
  | { type: 'UPDATE_PERFORMANCE'; payload: Partial<PerformanceState> }
  | { type: 'UPDATE_ACCESSIBILITY'; payload: Partial<AccessibilityState> }
  | { type: 'UPDATE_USER_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'SET_REDUCED_MOTION'; payload: boolean }
  | { type: 'SET_HIGH_CONTRAST'; payload: boolean }
  | { type: 'SET_DARK_MODE'; payload: boolean }
  | { type: 'ADD_ACTIVE_ANIMATION'; payload: string }
  | { type: 'REMOVE_ACTIVE_ANIMATION'; payload: string }
  | { type: 'UPDATE_PERFORMANCE_METRICS'; payload: any }

// Reducer
function visualReducer(state: VisualState, action: VisualAction): VisualState {
  switch (action.type) {
    case 'UPDATE_THEME':
      return {
        ...state,
        theme: { ...state.theme, ...action.payload },
      }

    case 'UPDATE_ANIMATIONS':
      return {
        ...state,
        animations: { ...state.animations, ...action.payload },
      }

    case 'UPDATE_PERFORMANCE':
      return {
        ...state,
        performance: { ...state.performance, ...action.payload },
      }

    case 'UPDATE_ACCESSIBILITY':
      return {
        ...state,
        accessibility: { ...state.accessibility, ...action.payload },
      }

    case 'UPDATE_USER_PREFERENCES':
      return {
        ...state,
        userPreferences: { ...state.userPreferences, ...action.payload },
      }

    case 'SET_REDUCED_MOTION':
      return {
        ...state,
        animations: { ...state.animations, reducedMotion: action.payload },
        accessibility: {
          ...state.accessibility,
          motionPreference: action.payload ? 'reduced' : 'full',
        },
      }

    case 'SET_HIGH_CONTRAST':
      return {
        ...state,
        accessibility: { ...state.accessibility, highContrast: action.payload },
      }

    case 'SET_DARK_MODE':
      return {
        ...state,
        theme: { ...state.theme, mode: action.payload ? 'dark' : 'light' },
      }

    case 'ADD_ACTIVE_ANIMATION':
      return {
        ...state,
        animations: {
          ...state.animations,
          activeAnimations: [
            ...state.animations.activeAnimations,
            action.payload,
          ],
        },
      }

    case 'REMOVE_ACTIVE_ANIMATION':
      return {
        ...state,
        animations: {
          ...state.animations,
          activeAnimations: state.animations.activeAnimations.filter(
            id => id !== action.payload
          ),
        },
      }

    case 'UPDATE_PERFORMANCE_METRICS':
      return {
        ...state,
        performance: {
          ...state.performance,
          metrics: { ...state.performance.metrics, ...action.payload },
        },
      }

    default:
      return state
  }
}

// Context
const VisualContext = createContext<VisualContextValue | undefined>(undefined)

// Provider component
export function VisualProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(visualReducer, initialState)

  // Initialize accessibility preferences
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check for reduced motion preference
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )
    dispatch({
      type: 'SET_REDUCED_MOTION',
      payload: reducedMotionQuery.matches,
    })

    // Check for high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)')
    dispatch({ type: 'SET_HIGH_CONTRAST', payload: highContrastQuery.matches })

    // Check for dark mode preference
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    dispatch({ type: 'SET_DARK_MODE', payload: darkModeQuery.matches })

    // Listen for preference changes
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      dispatch({ type: 'SET_REDUCED_MOTION', payload: e.matches })
    }

    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      dispatch({ type: 'SET_HIGH_CONTRAST', payload: e.matches })
    }

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      dispatch({ type: 'SET_DARK_MODE', payload: e.matches })
    }

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
    highContrastQuery.addEventListener('change', handleHighContrastChange)
    darkModeQuery.addEventListener('change', handleDarkModeChange)

    return () => {
      reducedMotionQuery.removeEventListener(
        'change',
        handleReducedMotionChange
      )
      highContrastQuery.removeEventListener('change', handleHighContrastChange)
      darkModeQuery.removeEventListener('change', handleDarkModeChange)
    }
  }, [])

  // Context value
  const contextValue: VisualContextValue = {
    state,
    updateTheme: theme => dispatch({ type: 'UPDATE_THEME', payload: theme }),
    updateAnimations: animations =>
      dispatch({ type: 'UPDATE_ANIMATIONS', payload: animations }),
    updatePerformance: performance =>
      dispatch({ type: 'UPDATE_PERFORMANCE', payload: performance }),
    updateAccessibility: accessibility =>
      dispatch({ type: 'UPDATE_ACCESSIBILITY', payload: accessibility }),
    updateUserPreferences: preferences =>
      dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: preferences }),
  }

  return (
    <VisualContext.Provider value={contextValue}>
      {children}
    </VisualContext.Provider>
  )
}

// Hook to use visual context
export function useVisual() {
  const context = useContext(VisualContext)
  if (context === undefined) {
    throw new Error('useVisual must be used within a VisualProvider')
  }
  return context
}

// Specific hooks for common use cases
export function useTheme() {
  const { state, updateTheme } = useVisual()
  return { theme: state.theme, updateTheme }
}

export function useAnimations() {
  const { state, updateAnimations } = useVisual()
  return { animations: state.animations, updateAnimations }
}

export function usePerformance() {
  const { state, updatePerformance } = useVisual()
  return { performance: state.performance, updatePerformance }
}

export function useAccessibility() {
  const { state, updateAccessibility } = useVisual()
  return { accessibility: state.accessibility, updateAccessibility }
}

export function useUserPreferences() {
  const { state, updateUserPreferences } = useVisual()
  return { userPreferences: state.userPreferences, updateUserPreferences }
}
