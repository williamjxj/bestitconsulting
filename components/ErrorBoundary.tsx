'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  resetOnPropsChange?: boolean
  resetKeys?: Array<string | number>
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  errorId: string
  retryCount: number
}

/**
 * ErrorBoundary Component
 *
 * A comprehensive error boundary that catches JavaScript errors anywhere in the component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * Includes performance monitoring and user-friendly error reporting.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private retryTimeout: NodeJS.Timeout | null = null

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
      retryCount: 0,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error details
    console.error('🚨 ErrorBoundary caught an error:', error, errorInfo)

    // Update state with error details
    this.setState({
      error,
      errorInfo,
    })

    // Call custom error handler
    this.props.onError?.(error, errorInfo)

    // Send error to monitoring service
    this.reportError(error, errorInfo)

    // Track error in analytics
    this.trackError(error)
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    const { resetKeys, resetOnPropsChange } = this.props
    const { hasError } = this.state

    // Reset error boundary if resetKeys change
    if (hasError && resetKeys && prevProps.resetKeys) {
      const hasResetKeyChanged = resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      )
      if (hasResetKeyChanged) {
        this.resetErrorBoundary()
      }
    }

    // Reset error boundary if resetOnPropsChange is true
    if (
      hasError &&
      resetOnPropsChange &&
      prevProps.children !== this.props.children
    ) {
      this.resetErrorBoundary()
    }
  }

  componentWillUnmount(): void {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout)
    }
  }

  /**
   * Reset the error boundary state
   */
  private resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
      retryCount: 0,
    })
  }

  /**
   * Handle retry with exponential backoff
   */
  private handleRetry = (): void => {
    const { retryCount } = this.state
    const maxRetries = 3

    if (retryCount >= maxRetries) {
      console.warn('🚨 Maximum retry attempts reached')
      return
    }

    // Exponential backoff: 1s, 2s, 4s
    const delay = Math.pow(2, retryCount) * 1000

    this.retryTimeout = setTimeout(() => {
      this.setState(prevState => ({
        retryCount: prevState.retryCount + 1,
      }))
      this.resetErrorBoundary()
    }, delay)
  }

  /**
   * Report error to monitoring service
   */
  private reportError = (error: Error, errorInfo: ErrorInfo): void => {
    const errorReport = {
      errorId: this.state.errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      retryCount: this.state.retryCount,
    }

    // Send to error reporting service
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag('event', 'error_boundary', {
        error_id: errorReport.errorId,
        error_message: errorReport.message,
        error_stack: errorReport.stack,
        component_stack: errorReport.componentStack,
        retry_count: errorReport.retryCount,
      })
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('📊 Error Report:', errorReport)
    }
  }

  /**
   * Track error in analytics
   */
  private trackError = (error: Error): void => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_map: {
          error_id: this.state.errorId,
          retry_count: this.state.retryCount,
        },
      })
    }
  }

  /**
   * Handle navigation to home
   */
  private handleGoHome = (): void => {
    window.location.href = '/'
  }

  /**
   * Handle reload page
   */
  private handleReload = (): void => {
    window.location.reload()
  }

  /**
   * Handle report bug
   */
  private handleReportBug = (): void => {
    const { error, errorInfo } = this.state
    const bugReport = {
      errorId: this.state.errorId,
      message: error?.message || 'Unknown error',
      stack: error?.stack || 'No stack trace',
      componentStack: errorInfo?.componentStack || 'No component stack',
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    }

    // Create mailto link with error details
    const subject = `Bug Report - Error ID: ${this.state.errorId}`
    const body = `Error Details:\n\n${JSON.stringify(bugReport, null, 2)}`
    const mailtoLink = `mailto:support@bestitconsulting.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.open(mailtoLink, '_blank')
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4'
        >
          <div className='max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center'>
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className='w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6'
            >
              <AlertTriangle className='h-10 w-10 text-red-500' />
            </motion.div>

            {/* Error Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className='text-3xl font-bold text-gray-900 mb-4'
            >
              Oops! Something went wrong
            </motion.h1>

            {/* Error Message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className='text-gray-600 mb-6'
            >
              We're sorry, but something unexpected happened. Our team has been
              notified and is working to fix the issue.
            </motion.p>

            {/* Error ID */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className='bg-gray-100 rounded-lg p-4 mb-6'
            >
              <p className='text-sm text-gray-500 mb-2'>Error ID:</p>
              <p className='font-mono text-sm text-gray-700'>
                {this.state.errorId}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className='flex flex-col sm:flex-row gap-4 justify-center'
            >
              <button
                onClick={this.handleRetry}
                disabled={this.state.retryCount >= 3}
                className='inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <RefreshCw className='h-5 w-5 mr-2' />
                Try Again
                {this.state.retryCount > 0 && (
                  <span className='ml-2 text-sm'>
                    ({this.state.retryCount}/3)
                  </span>
                )}
              </button>

              <button
                onClick={this.handleGoHome}
                className='inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
              >
                <Home className='h-5 w-5 mr-2' />
                Go Home
              </button>

              <button
                onClick={this.handleReload}
                className='inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
              >
                <RefreshCw className='h-5 w-5 mr-2' />
                Reload Page
              </button>
            </motion.div>

            {/* Report Bug Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className='mt-6'
            >
              <button
                onClick={this.handleReportBug}
                className='inline-flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-700 transition-colors'
              >
                <Bug className='h-4 w-4 mr-2' />
                Report this issue
              </button>
            </motion.div>

            {/* Development Error Details */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className='mt-8 p-4 bg-red-50 rounded-lg text-left'
              >
                <h3 className='text-sm font-semibold text-red-800 mb-2'>
                  Development Error Details:
                </h3>
                <pre className='text-xs text-red-700 whitespace-pre-wrap overflow-auto'>
                  {this.state.error.stack}
                </pre>
                {this.state.errorInfo && (
                  <pre className='text-xs text-red-700 whitespace-pre-wrap overflow-auto mt-2'>
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )
    }

    return this.props.children
  }
}

/**
 * Hook for using error boundary functionality
 */
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  const captureError = React.useCallback((error: Error) => {
    setError(error)
  }, [])

  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  return {
    captureError,
    resetError,
  }
}

/**
 * Higher-order component for error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`

  return WrappedComponent
}

export default ErrorBoundary
