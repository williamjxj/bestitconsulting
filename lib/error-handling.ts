/**
 * Mobile-Specific Error Handling
 *
 * Provides error handling utilities optimized for mobile devices
 * Implements mobile-specific error recovery and user feedback
 */

import { useResponsive } from './breakpoints'
import { getMobileAccessibilityConfig } from './accessibility'

// Mobile error types
export interface MobileError {
  type: 'network' | 'performance' | 'touch' | 'gesture' | 'animation' | 'memory'
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  recovery?: () => void
  userMessage?: string
}

// Mobile error handler
export class MobileErrorHandler {
  private static instance: MobileErrorHandler
  private errorLog: MobileError[] = []
  private isMobile: boolean = false

  private constructor() {
    this.isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
  }

  static getInstance(): MobileErrorHandler {
    if (!MobileErrorHandler.instance) {
      MobileErrorHandler.instance = new MobileErrorHandler()
    }
    return MobileErrorHandler.instance
  }

  // Handle mobile-specific errors
  handleMobileError(error: MobileError): void {
    this.errorLog.push(error)

    // Log error for debugging
    console.error(`Mobile Error [${error.type}]: ${error.message}`)

    // Show user-friendly message
    if (error.userMessage) {
      this.showMobileErrorToast(error.userMessage, error.severity)
    }

    // Attempt recovery
    if (error.recovery) {
      try {
        error.recovery()
      } catch (recoveryError) {
        console.error('Error recovery failed:', recoveryError)
      }
    }
  }

  // Show mobile-optimized error toast
  private showMobileErrorToast(
    message: string,
    severity: MobileError['severity']
  ): void {
    const toast = document.createElement('div')
    const config = getMobileAccessibilityConfig()

    // Mobile-optimized styling
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${this.getSeverityColor(severity)};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 10000;
      max-width: 90vw;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      min-height: ${config.touchTargetSize}px;
      display: flex;
      align-items: center;
      justify-content: center;
    `

    toast.textContent = message
    document.body.appendChild(toast)

    // Auto-remove after delay
    setTimeout(
      () => {
        toast.style.opacity = '0'
        toast.style.transform = 'translateX(-50%) translateY(-20px)'
        setTimeout(() => {
          document.body.removeChild(toast)
        }, 300)
      },
      severity === 'critical' ? 5000 : 3000
    )
  }

  private getSeverityColor(severity: MobileError['severity']): string {
    switch (severity) {
      case 'low':
        return '#10b981'
      case 'medium':
        return '#f59e0b'
      case 'high':
        return '#ef4444'
      case 'critical':
        return '#dc2626'
      default:
        return '#6b7280'
    }
  }

  // Network error handling
  handleNetworkError(): void {
    this.handleMobileError({
      type: 'network',
      message: 'Network connection lost',
      severity: 'high',
      userMessage: 'Please check your internet connection',
      recovery: () => {
        // Attempt to reconnect
        if (navigator.onLine) {
          window.location.reload()
        }
      },
    })
  }

  // Performance error handling
  handlePerformanceError(): void {
    this.handleMobileError({
      type: 'performance',
      message: 'Performance degraded on mobile device',
      severity: 'medium',
      userMessage: 'Optimizing for better performance...',
      recovery: () => {
        // Reduce animations and complexity
        document.documentElement.style.setProperty(
          '--animation-duration-fast',
          '0.1s'
        )
        document.documentElement.style.setProperty(
          '--animation-duration-normal',
          '0.2s'
        )
        document.documentElement.style.setProperty(
          '--animation-duration-slow',
          '0.3s'
        )
      },
    })
  }

  // Touch error handling
  handleTouchError(): void {
    this.handleMobileError({
      type: 'touch',
      message: 'Touch interaction failed',
      severity: 'low',
      userMessage: 'Touch interaction not recognized',
      recovery: () => {
        // Add touch event listeners
        document.addEventListener('touchstart', this.handleTouchStart, {
          passive: true,
        })
        document.addEventListener('touchend', this.handleTouchEnd, {
          passive: true,
        })
      },
    })
  }

  // Gesture error handling
  handleGestureError(): void {
    this.handleMobileError({
      type: 'gesture',
      message: 'Gesture recognition failed',
      severity: 'low',
      userMessage: 'Gesture not recognized',
      recovery: () => {
        // Reset gesture recognition
        this.resetGestureRecognition()
      },
    })
  }

  // Animation error handling
  handleAnimationError(): void {
    this.handleMobileError({
      type: 'animation',
      message: 'Animation performance issue',
      severity: 'medium',
      userMessage: 'Reducing animations for better performance',
      recovery: () => {
        // Disable complex animations
        document.querySelectorAll('[style*="animation"]').forEach(element => {
          ;(element as HTMLElement).style.animation = 'none'
        })
      },
    })
  }

  // Memory error handling
  handleMemoryError(): void {
    this.handleMobileError({
      type: 'memory',
      message: 'Memory usage too high',
      severity: 'high',
      userMessage: 'Clearing cache to free up memory',
      recovery: () => {
        // Clear caches and reduce memory usage
        this.clearMemoryCache()
      },
    })
  }

  // Touch event handlers
  private handleTouchStart = (e: TouchEvent): void => {
    // Add visual feedback
    const target = e.target as HTMLElement
    if (target) {
      target.style.opacity = '0.7'
    }
  }

  private handleTouchEnd = (e: TouchEvent): void => {
    // Remove visual feedback
    const target = e.target as HTMLElement
    if (target) {
      target.style.opacity = '1'
    }
  }

  // Reset gesture recognition
  private resetGestureRecognition(): void {
    // Remove existing gesture listeners
    document.removeEventListener('touchstart', this.handleTouchStart)
    document.removeEventListener('touchend', this.handleTouchEnd)

    // Re-add gesture listeners
    document.addEventListener('touchstart', this.handleTouchStart, {
      passive: true,
    })
    document.addEventListener('touchend', this.handleTouchEnd, {
      passive: true,
    })
  }

  // Clear memory cache
  private clearMemoryCache(): void {
    // Clear image caches
    const images = document.querySelectorAll('img')
    images.forEach(img => {
      img.src = img.src // Force reload
    })

    // Clear animation caches
    document.querySelectorAll('[style*="animation"]').forEach(element => {
      ;(element as HTMLElement).style.animation = 'none'
    })

    // Force garbage collection if available
    if (window.gc) {
      window.gc()
    }
  }

  // Get error statistics
  getErrorStats(): {
    totalErrors: number
    errorsByType: Record<string, number>
    errorsBySeverity: Record<string, number>
  } {
    const errorsByType: Record<string, number> = {}
    const errorsBySeverity: Record<string, number> = {}

    this.errorLog.forEach(error => {
      errorsByType[error.type] = (errorsByType[error.type] || 0) + 1
      errorsBySeverity[error.severity] =
        (errorsBySeverity[error.severity] || 0) + 1
    })

    return {
      totalErrors: this.errorLog.length,
      errorsByType,
      errorsBySeverity,
    }
  }

  // Clear error log
  clearErrorLog(): void {
    this.errorLog = []
  }
}

// Mobile error monitoring
export function startMobileErrorMonitoring(): void {
  const errorHandler = MobileErrorHandler.getInstance()

  // Monitor network status
  window.addEventListener('online', () => {
    console.log('Network connection restored')
  })

  window.addEventListener('offline', () => {
    errorHandler.handleNetworkError()
  })

  // Monitor performance
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'longtask') {
          errorHandler.handlePerformanceError()
        }
      }
    })

    observer.observe({ entryTypes: ['longtask'] })
  }

  // Monitor memory usage
  if ((performance as any).memory) {
    setInterval(() => {
      const memory = (performance as any).memory
      const usedMemory = memory.usedJSHeapSize / (1024 * 1024) // MB

      if (usedMemory > 100) {
        // 100MB threshold
        errorHandler.handleMemoryError()
      }
    }, 5000)
  }

  // Monitor touch events
  document.addEventListener('touchstart', e => {
    if (e.touches.length > 1) {
      // Multi-touch detected
      errorHandler.handleTouchError()
    }
  })
}

// Mobile error recovery utilities
export function recoverFromMobileError(errorType: MobileError['type']): void {
  const errorHandler = MobileErrorHandler.getInstance()

  switch (errorType) {
    case 'network':
      errorHandler.handleNetworkError()
      break
    case 'performance':
      errorHandler.handlePerformanceError()
      break
    case 'touch':
      errorHandler.handleTouchError()
      break
    case 'gesture':
      errorHandler.handleGestureError()
      break
    case 'animation':
      errorHandler.handleAnimationError()
      break
    case 'memory':
      errorHandler.handleMemoryError()
      break
  }
}

// Mobile error reporting
export function reportMobileError(error: MobileError): void {
  const errorHandler = MobileErrorHandler.getInstance()
  errorHandler.handleMobileError(error)

  // Send to analytics if available
  if (typeof window !== 'undefined' && 'gtag' in window) {
    ;(window as any).gtag('event', 'mobile_error', {
      error_type: error.type,
      error_severity: error.severity,
      error_message: error.message,
    })
  }
}
