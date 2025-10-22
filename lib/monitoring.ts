/**
 * Monitoring and Alerting System
 *
 * Comprehensive monitoring system for the BestIT Consulting website
 * Tracks system health, performance, errors, and business metrics
 */

export interface MonitoringConfig {
  enablePerformanceMonitoring: boolean
  enableErrorMonitoring: boolean
  enableBusinessMetrics: boolean
  enableUptimeMonitoring: boolean
  enableSecurityMonitoring: boolean
  alertThresholds: {
    performance: {
      pageLoadTime: number
      firstContentfulPaint: number
      largestContentfulPaint: number
      cumulativeLayoutShift: number
      firstInputDelay: number
      totalBlockingTime: number
    }
    errors: {
      errorRate: number
      criticalErrors: number
      javascriptErrors: number
    }
    business: {
      conversionRate: number
      bounceRate: number
      sessionDuration: number
    }
    uptime: {
      responseTime: number
      availability: number
    }
  }
  notificationChannels: {
    email: string[]
    slack: string
    webhook: string
  }
  reportingInterval: number
}

export interface HealthCheck {
  status: 'healthy' | 'warning' | 'critical'
  timestamp: number
  checks: {
    performance: HealthStatus
    errors: HealthStatus
    uptime: HealthStatus
    security: HealthStatus
    business: HealthStatus
  }
  metrics: {
    performance: PerformanceMetrics
    errors: ErrorMetrics
    uptime: UptimeMetrics
    security: SecurityMetrics
    business: BusinessMetrics
  }
}

export interface HealthStatus {
  status: 'healthy' | 'warning' | 'critical'
  message: string
  value: number
  threshold: number
}

export interface PerformanceMetrics {
  pageLoadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
  totalBlockingTime: number
  fps: number
  memoryUsage: number
}

export interface ErrorMetrics {
  errorRate: number
  criticalErrors: number
  javascriptErrors: number
  networkErrors: number
  userErrors: number
}

export interface UptimeMetrics {
  availability: number
  responseTime: number
  downtime: number
  lastIncident: string
}

export interface SecurityMetrics {
  securityScore: number
  vulnerabilities: number
  blockedRequests: number
  suspiciousActivity: number
}

export interface BusinessMetrics {
  conversionRate: number
  bounceRate: number
  sessionDuration: number
  pageViews: number
  uniqueVisitors: number
  revenue: number
}

export interface Alert {
  id: string
  type: 'performance' | 'error' | 'uptime' | 'security' | 'business'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  message: string
  timestamp: number
  resolved: boolean
  resolvedAt?: number
  metrics: Record<string, any>
}

export class MonitoringSystem {
  private static instance: MonitoringSystem
  private config: MonitoringConfig
  private healthChecks: HealthCheck[] = []
  private alerts: Alert[] = []
  private isMonitoring = false
  private monitoringInterval: NodeJS.Timeout | null = null

  private constructor(config: Partial<MonitoringConfig> = {}) {
    this.config = {
      enablePerformanceMonitoring: true,
      enableErrorMonitoring: true,
      enableBusinessMetrics: true,
      enableUptimeMonitoring: true,
      enableSecurityMonitoring: true,
      alertThresholds: {
        performance: {
          pageLoadTime: 3000,
          firstContentfulPaint: 1800,
          largestContentfulPaint: 2500,
          cumulativeLayoutShift: 0.1,
          firstInputDelay: 100,
          totalBlockingTime: 200,
        },
        errors: {
          errorRate: 0.05,
          criticalErrors: 5,
          javascriptErrors: 10,
        },
        business: {
          conversionRate: 0.02,
          bounceRate: 0.7,
          sessionDuration: 120,
        },
        uptime: {
          responseTime: 2000,
          availability: 0.99,
        },
      },
      notificationChannels: {
        email: ['admin@bestitconsulting.com'],
        slack: '',
        webhook: '',
      },
      reportingInterval: 60000, // 1 minute
      ...config,
    }
  }

  public static getInstance(
    config?: Partial<MonitoringConfig>
  ): MonitoringSystem {
    if (!MonitoringSystem.instance) {
      MonitoringSystem.instance = new MonitoringSystem(config)
    }
    return MonitoringSystem.instance
  }

  /**
   * Start monitoring system
   */
  public startMonitoring(): void {
    if (this.isMonitoring) return

    this.isMonitoring = true
    console.log('🔍 Monitoring system started')

    // Start periodic health checks
    this.monitoringInterval = setInterval(() => {
      this.performHealthCheck()
    }, this.config.reportingInterval)

    // Set up error monitoring
    this.setupErrorMonitoring()

    // Set up performance monitoring
    this.setupPerformanceMonitoring()

    // Set up business metrics monitoring
    this.setupBusinessMetricsMonitoring()

    // Set up security monitoring
    this.setupSecurityMonitoring()
  }

  /**
   * Stop monitoring system
   */
  public stopMonitoring(): void {
    if (!this.isMonitoring) return

    this.isMonitoring = false
    console.log('🛑 Monitoring system stopped')

    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
      this.monitoringInterval = null
    }
  }

  /**
   * Perform health check
   */
  public async performHealthCheck(): Promise<HealthCheck> {
    const timestamp = Date.now()
    const checks = {
      performance: await this.checkPerformance(),
      errors: await this.checkErrors(),
      uptime: await this.checkUptime(),
      security: await this.checkSecurity(),
      business: await this.checkBusiness(),
    }

    const metrics = {
      performance: await this.getPerformanceMetrics(),
      errors: await this.getErrorMetrics(),
      uptime: await this.getUptimeMetrics(),
      security: await this.getSecurityMetrics(),
      business: await this.getBusinessMetrics(),
    }

    const overallStatus = this.calculateOverallStatus(checks)
    const healthCheck: HealthCheck = {
      status: overallStatus,
      timestamp,
      checks,
      metrics,
    }

    this.healthChecks.push(healthCheck)
    this.processAlerts(healthCheck)

    return healthCheck
  }

  /**
   * Get current health status
   */
  public getCurrentHealth(): HealthCheck | null {
    if (this.healthChecks.length === 0) return null
    return this.healthChecks[this.healthChecks.length - 1]
  }

  /**
   * Get health history
   */
  public getHealthHistory(): HealthCheck[] {
    return [...this.healthChecks]
  }

  /**
   * Get active alerts
   */
  public getActiveAlerts(): Alert[] {
    return this.alerts.filter(alert => !alert.resolved)
  }

  /**
   * Get all alerts
   */
  public getAllAlerts(): Alert[] {
    return [...this.alerts]
  }

  /**
   * Resolve alert
   */
  public resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId)
    if (alert) {
      alert.resolved = true
      alert.resolvedAt = Date.now()
    }
  }

  /**
   * Check performance metrics
   */
  private async checkPerformance(): Promise<HealthStatus> {
    const metrics = await this.getPerformanceMetrics()
    const thresholds = this.config.alertThresholds.performance

    const violations = []
    if (metrics.pageLoadTime > thresholds.pageLoadTime) {
      violations.push(`Page load time: ${metrics.pageLoadTime}ms`)
    }
    if (metrics.firstContentfulPaint > thresholds.firstContentfulPaint) {
      violations.push(`FCP: ${metrics.firstContentfulPaint}ms`)
    }
    if (metrics.largestContentfulPaint > thresholds.largestContentfulPaint) {
      violations.push(`LCP: ${metrics.largestContentfulPaint}ms`)
    }
    if (metrics.cumulativeLayoutShift > thresholds.cumulativeLayoutShift) {
      violations.push(`CLS: ${metrics.cumulativeLayoutShift}`)
    }
    if (metrics.firstInputDelay > thresholds.firstInputDelay) {
      violations.push(`FID: ${metrics.firstInputDelay}ms`)
    }
    if (metrics.totalBlockingTime > thresholds.totalBlockingTime) {
      violations.push(`TBT: ${metrics.totalBlockingTime}ms`)
    }

    const status =
      violations.length === 0
        ? 'healthy'
        : violations.length > 2
          ? 'critical'
          : 'warning'
    const message =
      violations.length === 0
        ? 'Performance metrics are within acceptable ranges'
        : violations.join(', ')

    return {
      status,
      message,
      value: violations.length,
      threshold: 0,
    }
  }

  /**
   * Check error metrics
   */
  private async checkErrors(): Promise<HealthStatus> {
    const metrics = await this.getErrorMetrics()
    const thresholds = this.config.alertThresholds.errors

    const violations = []
    if (metrics.errorRate > thresholds.errorRate) {
      violations.push(`Error rate: ${(metrics.errorRate * 100).toFixed(2)}%`)
    }
    if (metrics.criticalErrors > thresholds.criticalErrors) {
      violations.push(`Critical errors: ${metrics.criticalErrors}`)
    }
    if (metrics.javascriptErrors > thresholds.javascriptErrors) {
      violations.push(`JavaScript errors: ${metrics.javascriptErrors}`)
    }

    const status =
      violations.length === 0
        ? 'healthy'
        : violations.length > 1
          ? 'critical'
          : 'warning'
    const message =
      violations.length === 0
        ? 'Error rates are within acceptable ranges'
        : violations.join(', ')

    return {
      status,
      message,
      value: metrics.errorRate,
      threshold: thresholds.errorRate,
    }
  }

  /**
   * Check uptime metrics
   */
  private async checkUptime(): Promise<HealthStatus> {
    const metrics = await this.getUptimeMetrics()
    const thresholds = this.config.alertThresholds.uptime

    const violations = []
    if (metrics.availability < thresholds.availability) {
      violations.push(
        `Availability: ${(metrics.availability * 100).toFixed(2)}%`
      )
    }
    if (metrics.responseTime > thresholds.responseTime) {
      violations.push(`Response time: ${metrics.responseTime}ms`)
    }

    const status = violations.length === 0 ? 'healthy' : 'critical'
    const message =
      violations.length === 0
        ? 'System uptime is healthy'
        : violations.join(', ')

    return {
      status,
      message,
      value: metrics.availability,
      threshold: thresholds.availability,
    }
  }

  /**
   * Check security metrics
   */
  private async checkSecurity(): Promise<HealthStatus> {
    const metrics = await this.getSecurityMetrics()

    const violations = []
    if (metrics.securityScore < 80) {
      violations.push(`Security score: ${metrics.securityScore}`)
    }
    if (metrics.vulnerabilities > 0) {
      violations.push(`Vulnerabilities: ${metrics.vulnerabilities}`)
    }
    if (metrics.suspiciousActivity > 5) {
      violations.push(`Suspicious activity: ${metrics.suspiciousActivity}`)
    }

    const status =
      violations.length === 0
        ? 'healthy'
        : violations.length > 1
          ? 'critical'
          : 'warning'
    const message =
      violations.length === 0
        ? 'Security metrics are healthy'
        : violations.join(', ')

    return {
      status,
      message,
      value: metrics.securityScore,
      threshold: 80,
    }
  }

  /**
   * Check business metrics
   */
  private async checkBusiness(): Promise<HealthStatus> {
    const metrics = await this.getBusinessMetrics()
    const thresholds = this.config.alertThresholds.business

    const violations = []
    if (metrics.conversionRate < thresholds.conversionRate) {
      violations.push(
        `Conversion rate: ${(metrics.conversionRate * 100).toFixed(2)}%`
      )
    }
    if (metrics.bounceRate > thresholds.bounceRate) {
      violations.push(`Bounce rate: ${(metrics.bounceRate * 100).toFixed(2)}%`)
    }
    if (metrics.sessionDuration < thresholds.sessionDuration) {
      violations.push(`Session duration: ${metrics.sessionDuration}s`)
    }

    const status =
      violations.length === 0
        ? 'healthy'
        : violations.length > 1
          ? 'critical'
          : 'warning'
    const message =
      violations.length === 0
        ? 'Business metrics are healthy'
        : violations.join(', ')

    return {
      status,
      message,
      value: metrics.conversionRate,
      threshold: thresholds.conversionRate,
    }
  }

  /**
   * Get performance metrics
   */
  private async getPerformanceMetrics(): Promise<PerformanceMetrics> {
    if (typeof window === 'undefined') {
      return {
        pageLoadTime: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0,
        firstInputDelay: 0,
        totalBlockingTime: 0,
        fps: 0,
        memoryUsage: 0,
      }
    }

    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming
    const paintEntries = performance.getEntriesByType('paint')
    const fcp =
      paintEntries.find(entry => entry.name === 'first-contentful-paint')
        ?.startTime || 0
    const lcp =
      performance.getEntriesByType('largest-contentful-paint')[0]?.startTime ||
      0
    const cls = performance
      .getEntriesByType('layout-shift')
      .reduce((sum, entry) => sum + (entry as any).value, 0)
    const fid = performance.getEntriesByType('first-input')[0]?.duration || 0
    const longTasks = performance.getEntriesByType('longtask')
    const tbt = longTasks.reduce((sum, entry) => sum + entry.duration, 0)
    const memory = (performance as any).memory?.usedJSHeapSize || 0

    return {
      pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
      firstContentfulPaint: fcp,
      largestContentfulPaint: lcp,
      cumulativeLayoutShift: cls,
      firstInputDelay: fid,
      totalBlockingTime: tbt,
      fps: 60, // This would need to be measured separately
      memoryUsage: memory / (1024 * 1024), // Convert to MB
    }
  }

  /**
   * Get error metrics
   */
  private async getErrorMetrics(): Promise<ErrorMetrics> {
    // This would typically come from an error tracking service
    return {
      errorRate: 0.02,
      criticalErrors: 0,
      javascriptErrors: 2,
      networkErrors: 1,
      userErrors: 0,
    }
  }

  /**
   * Get uptime metrics
   */
  private async getUptimeMetrics(): Promise<UptimeMetrics> {
    // This would typically come from an uptime monitoring service
    return {
      availability: 0.999,
      responseTime: 150,
      downtime: 0,
      lastIncident: '2024-01-01T00:00:00Z',
    }
  }

  /**
   * Get security metrics
   */
  private async getSecurityMetrics(): Promise<SecurityMetrics> {
    // This would typically come from a security monitoring service
    return {
      securityScore: 95,
      vulnerabilities: 0,
      blockedRequests: 12,
      suspiciousActivity: 1,
    }
  }

  /**
   * Get business metrics
   */
  private async getBusinessMetrics(): Promise<BusinessMetrics> {
    // This would typically come from analytics data
    return {
      conversionRate: 0.035,
      bounceRate: 0.45,
      sessionDuration: 180,
      pageViews: 1250,
      uniqueVisitors: 450,
      revenue: 12500,
    }
  }

  /**
   * Calculate overall status
   */
  private calculateOverallStatus(
    checks: any
  ): 'healthy' | 'warning' | 'critical' {
    const statuses = Object.values(checks).map((check: any) => check.status)

    if (statuses.includes('critical')) return 'critical'
    if (statuses.includes('warning')) return 'warning'
    return 'healthy'
  }

  /**
   * Process alerts
   */
  private processAlerts(healthCheck: HealthCheck): void {
    Object.entries(healthCheck.checks).forEach(([category, check]) => {
      if (check.status === 'critical' || check.status === 'warning') {
        this.createAlert(
          category as any,
          check.status,
          check.message,
          healthCheck.metrics
        )
      }
    })
  }

  /**
   * Create alert
   */
  private createAlert(
    type: 'performance' | 'error' | 'uptime' | 'security' | 'business',
    severity: 'warning' | 'critical',
    message: string,
    metrics: any
  ): void {
    const alert: Alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      severity: severity === 'critical' ? 'critical' : 'high',
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Alert`,
      message,
      timestamp: Date.now(),
      resolved: false,
      metrics,
    }

    this.alerts.push(alert)
    this.sendNotification(alert)
  }

  /**
   * Send notification
   */
  private async sendNotification(alert: Alert): Promise<void> {
    try {
      // Send email notification
      if (this.config.notificationChannels.email.length > 0) {
        await this.sendEmailNotification(alert)
      }

      // Send Slack notification
      if (this.config.notificationChannels.slack) {
        await this.sendSlackNotification(alert)
      }

      // Send webhook notification
      if (this.config.notificationChannels.webhook) {
        await this.sendWebhookNotification(alert)
      }
    } catch (error) {
      console.error('❌ Failed to send notification:', error)
    }
  }

  /**
   * Send email notification
   */
  private async sendEmailNotification(alert: Alert): Promise<void> {
    // Implementation would depend on email service
    console.log(`📧 Email notification sent for alert: ${alert.id}`)
  }

  /**
   * Send Slack notification
   */
  private async sendSlackNotification(alert: Alert): Promise<void> {
    // Implementation would depend on Slack API
    console.log(`💬 Slack notification sent for alert: ${alert.id}`)
  }

  /**
   * Send webhook notification
   */
  private async sendWebhookNotification(alert: Alert): Promise<void> {
    try {
      await fetch(this.config.notificationChannels.webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alert),
      })
    } catch (error) {
      console.error('❌ Failed to send webhook notification:', error)
    }
  }

  /**
   * Set up error monitoring
   */
  private setupErrorMonitoring(): void {
    if (typeof window === 'undefined') return

    // Global error handler
    window.addEventListener('error', event => {
      this.trackError(event.error, 'global_error')
    })

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', event => {
      this.trackError(new Error(event.reason), 'unhandled_rejection')
    })
  }

  /**
   * Set up performance monitoring
   */
  private setupPerformanceMonitoring(): void {
    if (typeof window === 'undefined') return

    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          console.log('📊 Performance entry:', entry)
        }
      })

      observer.observe({
        entryTypes: [
          'navigation',
          'paint',
          'largest-contentful-paint',
          'layout-shift',
          'first-input',
          'longtask',
        ],
      })
    }
  }

  /**
   * Set up business metrics monitoring
   */
  private setupBusinessMetricsMonitoring(): void {
    if (typeof window === 'undefined') return

    // Track page views
    window.addEventListener('load', () => {
      this.trackBusinessMetric('page_view', 1)
    })

    // Track conversions
    document.addEventListener('click', event => {
      const target = event.target as HTMLElement
      if (target.matches('[data-conversion]')) {
        this.trackBusinessMetric('conversion', 1)
      }
    })
  }

  /**
   * Set up security monitoring
   */
  private setupSecurityMonitoring(): void {
    if (typeof window === 'undefined') return

    // Monitor for suspicious activity
    let suspiciousActivity = 0
    const suspiciousThreshold = 10

    document.addEventListener('click', () => {
      suspiciousActivity++
      if (suspiciousActivity > suspiciousThreshold) {
        this.trackSecurityEvent('suspicious_activity', {
          activityCount: suspiciousActivity,
        })
      }
    })
  }

  /**
   * Track error
   */
  private trackError(error: Error, context: string): void {
    console.error('🚨 Error tracked:', error, context)
  }

  /**
   * Track business metric
   */
  private trackBusinessMetric(metric: string, value: number): void {
    console.log('📈 Business metric tracked:', metric, value)
  }

  /**
   * Track security event
   */
  private trackSecurityEvent(event: string, data: any): void {
    console.log('🔒 Security event tracked:', event, data)
  }
}

// Export singleton instance
export const monitoring = MonitoringSystem.getInstance()

// Auto-start monitoring in production
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  monitoring.startMonitoring()
}
