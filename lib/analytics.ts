/**
 * Analytics Integration
 *
 * Comprehensive analytics tracking for the BestIT Consulting website
 * Tracks user interactions, performance metrics, and business KPIs
 */

export interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

export interface UserProperties {
  user_id?: string
  session_id: string
  device_type: 'mobile' | 'tablet' | 'desktop'
  browser: string
  os: string
  country?: string
  language: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export interface PageViewEvent {
  page_title: string
  page_location: string
  page_path: string
  content_group1?: string
  content_group2?: string
  custom_map?: Record<string, any>
}

export interface PerformanceEvent {
  page_load_time: number
  dom_content_loaded: number
  first_contentful_paint: number
  largest_contentful_paint: number
  cumulative_layout_shift: number
  first_input_delay: number
  total_blocking_time: number
  fps: number
  memory_usage: number
}

export interface ConversionEvent {
  conversion_type:
    | 'contact_form'
    | 'phone_call'
    | 'email_click'
    | 'download'
    | 'demo_request'
  conversion_value?: number
  conversion_currency?: string
  lead_source: string
  lead_quality: 'hot' | 'warm' | 'cold'
  contact_method: string
}

export class AnalyticsTracker {
  private static instance: AnalyticsTracker
  private isInitialized = false
  private sessionId: string
  private userId?: string
  private userProperties: UserProperties
  private eventQueue: AnalyticsEvent[] = []
  private isOnline = true

  private constructor() {
    this.sessionId = this.generateSessionId()
    this.userProperties = this.getUserProperties()
    this.setupOnlineDetection()
    this.setupPageVisibility()
  }

  public static getInstance(): AnalyticsTracker {
    if (!AnalyticsTracker.instance) {
      AnalyticsTracker.instance = new AnalyticsTracker()
    }
    return AnalyticsTracker.instance
  }

  /**
   * Initialize analytics tracking
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Initialize Google Analytics
      await this.initializeGoogleAnalytics()

      // Initialize custom analytics
      await this.initializeCustomAnalytics()

      // Send queued events
      await this.flushEventQueue()

      this.isInitialized = true
      console.log('📊 Analytics initialized successfully')
    } catch (error) {
      console.error('❌ Analytics initialization failed:', error)
    }
  }

  /**
   * Track page view
   */
  public trackPageView(pageData: PageViewEvent): void {
    const event: AnalyticsEvent = {
      event: 'page_view',
      category: 'navigation',
      action: 'page_view',
      label: pageData.page_title,
      custom_parameters: {
        page_location: pageData.page_location,
        page_path: pageData.page_path,
        content_group1: pageData.content_group1,
        content_group2: pageData.content_group2,
        ...pageData.custom_map,
      },
    }

    this.trackEvent(event)

    // Track in Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag(
        'config',
        process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
        {
          page_title: pageData.page_title,
          page_location: pageData.page_location,
          page_path: pageData.page_path,
        }
      )
    }
  }

  /**
   * Track user interaction
   */
  public trackInteraction(
    category: string,
    action: string,
    label?: string,
    value?: number,
    customParameters?: Record<string, any>
  ): void {
    const event: AnalyticsEvent = {
      event: 'interaction',
      category,
      action,
      label,
      value,
      custom_parameters: customParameters,
    }

    this.trackEvent(event)
  }

  /**
   * Track performance metrics
   */
  public trackPerformance(metrics: PerformanceEvent): void {
    const event: AnalyticsEvent = {
      event: 'performance',
      category: 'performance',
      action: 'metrics',
      custom_parameters: {
        page_load_time: metrics.page_load_time,
        dom_content_loaded: metrics.dom_content_loaded,
        first_contentful_paint: metrics.first_contentful_paint,
        largest_contentful_paint: metrics.largest_contentful_paint,
        cumulative_layout_shift: metrics.cumulative_layout_shift,
        first_input_delay: metrics.first_input_delay,
        total_blocking_time: metrics.total_blocking_time,
        fps: metrics.fps,
        memory_usage: metrics.memory_usage,
      },
    }

    this.trackEvent(event)

    // Track in Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag('event', 'performance_metrics', {
        page_load_time: metrics.page_load_time,
        dom_content_loaded: metrics.dom_content_loaded,
        first_contentful_paint: metrics.first_contentful_paint,
        largest_contentful_paint: metrics.largest_contentful_paint,
        cumulative_layout_shift: metrics.cumulative_layout_shift,
        first_input_delay: metrics.first_input_delay,
        total_blocking_time: metrics.total_blocking_time,
        fps: metrics.fps,
        memory_usage: metrics.memory_usage,
      })
    }
  }

  /**
   * Track conversion
   */
  public trackConversion(conversion: ConversionEvent): void {
    const event: AnalyticsEvent = {
      event: 'conversion',
      category: 'conversion',
      action: conversion.conversion_type,
      label: conversion.lead_source,
      value: conversion.conversion_value,
      custom_parameters: {
        conversion_type: conversion.conversion_type,
        conversion_value: conversion.conversion_value,
        conversion_currency: conversion.conversion_currency,
        lead_source: conversion.lead_source,
        lead_quality: conversion.lead_quality,
        contact_method: conversion.contact_method,
      },
    }

    this.trackEvent(event)

    // Track in Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag('event', 'conversion', {
        event_category: 'conversion',
        event_label: conversion.conversion_type,
        value: conversion.conversion_value,
        currency: conversion.conversion_currency,
        lead_source: conversion.lead_source,
        lead_quality: conversion.lead_quality,
        contact_method: conversion.contact_method,
      })
    }
  }

  /**
   * Track error
   */
  public trackError(error: Error, context?: string): void {
    const event: AnalyticsEvent = {
      event: 'error',
      category: 'error',
      action: 'javascript_error',
      label: error.message,
      custom_parameters: {
        error_message: error.message,
        error_stack: error.stack,
        error_context: context,
        user_agent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      },
    }

    this.trackEvent(event)

    // Track in Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        error_context: context,
      })
    }
  }

  /**
   * Track business metrics
   */
  public trackBusinessMetric(
    metric: string,
    value: number,
    category: string = 'business'
  ): void {
    const event: AnalyticsEvent = {
      event: 'business_metric',
      category,
      action: metric,
      value,
      custom_parameters: {
        metric_name: metric,
        metric_value: value,
        timestamp: new Date().toISOString(),
      },
    }

    this.trackEvent(event)
  }

  /**
   * Track user engagement
   */
  public trackEngagement(
    engagementType: 'scroll' | 'click' | 'hover' | 'focus' | 'form_interaction',
    element: string,
    value?: number
  ): void {
    const event: AnalyticsEvent = {
      event: 'engagement',
      category: 'user_engagement',
      action: engagementType,
      label: element,
      value,
      custom_parameters: {
        engagement_type: engagementType,
        element: element,
        timestamp: new Date().toISOString(),
      },
    }

    this.trackEvent(event)
  }

  /**
   * Track A/B test
   */
  public trackABTest(
    testName: string,
    variant: string,
    conversion?: boolean
  ): void {
    const event: AnalyticsEvent = {
      event: 'ab_test',
      category: 'experimentation',
      action: testName,
      label: variant,
      value: conversion ? 1 : 0,
      custom_parameters: {
        test_name: testName,
        variant: variant,
        conversion: conversion,
        timestamp: new Date().toISOString(),
      },
    }

    this.trackEvent(event)
  }

  /**
   * Get analytics data
   */
  public getAnalyticsData(): {
    sessionId: string
    userId?: string
    userProperties: UserProperties
    eventCount: number
    isOnline: boolean
  } {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      userProperties: this.userProperties,
      eventCount: this.eventQueue.length,
      isOnline: this.isOnline,
    }
  }

  /**
   * Initialize Google Analytics
   */
  private async initializeGoogleAnalytics(): Promise<void> {
    if (typeof window === 'undefined') return

    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    if (!measurementId) {
      console.warn('⚠️ Google Analytics measurement ID not found')
      return
    }

    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    // Initialize gtag
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).gtag = function () {
      ;(window as any).dataLayer.push(arguments)
    }
    ;(window as any).gtag('js', new Date())
    ;(window as any).gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        user_id: this.userId,
        session_id: this.sessionId,
        device_type: this.userProperties.device_type,
        browser: this.userProperties.browser,
        os: this.userProperties.os,
        country: this.userProperties.country,
        language: this.userProperties.language,
      },
    })
  }

  /**
   * Initialize custom analytics
   */
  private async initializeCustomAnalytics(): Promise<void> {
    // Set up custom analytics endpoints
    this.setupCustomEndpoints()
  }

  /**
   * Set up custom analytics endpoints
   */
  private setupCustomEndpoints(): void {
    // Custom analytics API endpoints
    const endpoints = {
      events: '/api/analytics/events',
      performance: '/api/analytics/performance',
      conversions: '/api/analytics/conversions',
    }

    // Store endpoints for later use
    ;(this as any).endpoints = endpoints
  }

  /**
   * Track event
   */
  private trackEvent(event: AnalyticsEvent): void {
    // Add user properties to event
    const enrichedEvent = {
      ...event,
      custom_parameters: {
        ...event.custom_parameters,
        session_id: this.sessionId,
        user_id: this.userId,
        device_type: this.userProperties.device_type,
        browser: this.userProperties.browser,
        os: this.userProperties.os,
        country: this.userProperties.country,
        language: this.userProperties.language,
        referrer: this.userProperties.referrer,
        utm_source: this.userProperties.utm_source,
        utm_medium: this.userProperties.utm_medium,
        utm_campaign: this.userProperties.utm_campaign,
        timestamp: new Date().toISOString(),
      },
    }

    // Add to queue
    this.eventQueue.push(enrichedEvent)

    // Send immediately if online
    if (this.isOnline) {
      this.sendEvent(enrichedEvent)
    }
  }

  /**
   * Send event to analytics service
   */
  private async sendEvent(event: AnalyticsEvent): Promise<void> {
    try {
      // Send to custom analytics endpoint
      await fetch('/api/analytics/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })
    } catch (error) {
      console.error('❌ Failed to send analytics event:', error)
    }
  }

  /**
   * Flush event queue
   */
  private async flushEventQueue(): Promise<void> {
    if (this.eventQueue.length === 0) return

    const events = [...this.eventQueue]
    this.eventQueue = []

    try {
      await fetch('/api/analytics/events/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events }),
      })
    } catch (error) {
      console.error('❌ Failed to flush analytics queue:', error)
      // Re-queue events for retry
      this.eventQueue.unshift(...events)
    }
  }

  /**
   * Set up online detection
   */
  private setupOnlineDetection(): void {
    if (typeof window === 'undefined') return

    this.isOnline = navigator.onLine

    window.addEventListener('online', () => {
      this.isOnline = true
      this.flushEventQueue()
    })

    window.addEventListener('offline', () => {
      this.isOnline = false
    })
  }

  /**
   * Set up page visibility detection
   */
  private setupPageVisibility(): void {
    if (typeof window === 'undefined') return

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.flushEventQueue()
      }
    })
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Get user properties
   */
  private getUserProperties(): UserProperties {
    if (typeof window === 'undefined') {
      return {
        session_id: this.sessionId,
        device_type: 'desktop',
        browser: 'unknown',
        os: 'unknown',
        language: 'en',
      }
    }

    const userAgent = navigator.userAgent
    const deviceType = this.getDeviceType()
    const browser = this.getBrowser(userAgent)
    const os = this.getOS(userAgent)
    const language = navigator.language || 'en'
    const referrer = document.referrer || undefined

    // Parse UTM parameters
    const urlParams = new URLSearchParams(window.location.search)
    const utmSource = urlParams.get('utm_source') || undefined
    const utmMedium = urlParams.get('utm_medium') || undefined
    const utmCampaign = urlParams.get('utm_campaign') || undefined

    return {
      session_id: this.sessionId,
      device_type: deviceType,
      browser,
      os,
      language,
      referrer,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
    }
  }

  /**
   * Get device type
   */
  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  /**
   * Get browser name
   */
  private getBrowser(userAgent: string): string {
    if (userAgent.includes('Chrome')) return 'Chrome'
    if (userAgent.includes('Firefox')) return 'Firefox'
    if (userAgent.includes('Safari')) return 'Safari'
    if (userAgent.includes('Edge')) return 'Edge'
    if (userAgent.includes('Opera')) return 'Opera'
    return 'Unknown'
  }

  /**
   * Get operating system
   */
  private getOS(userAgent: string): string {
    if (userAgent.includes('Windows')) return 'Windows'
    if (userAgent.includes('Mac')) return 'macOS'
    if (userAgent.includes('Linux')) return 'Linux'
    if (userAgent.includes('Android')) return 'Android'
    if (userAgent.includes('iOS')) return 'iOS'
    return 'Unknown'
  }
}

// Export singleton instance
export const analytics = AnalyticsTracker.getInstance()

// Auto-initialize in production
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  analytics.initialize()
}
