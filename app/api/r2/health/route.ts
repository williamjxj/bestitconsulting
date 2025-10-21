import { NextResponse } from 'next/server'
import { validateR2Config } from '@/lib/r2-media'

export async function GET() {
  try {
    const config = validateR2Config()
    const startTime = Date.now()

    // Test bucket accessibility
    let isHealthy = false
    let responseTime = 0

    if (config.isConfigured) {
      try {
        const testUrl = `${config.baseUrl}/health-check`
        const response = await fetch(testUrl, {
          method: 'HEAD',
          signal: AbortSignal.timeout(5000), // 5 second timeout
        })
        isHealthy = response.ok
        responseTime = Date.now() - startTime
      } catch (error) {
        console.error('R2 bucket health check failed:', error)
        isHealthy = false
        responseTime = Date.now() - startTime
      }
    }

    if (isHealthy) {
      return NextResponse.json({
        status: 'healthy',
        bucketUrl: config.baseUrl,
        lastChecked: config.lastChecked.toISOString(),
        responseTime,
      })
    } else {
      return NextResponse.json(
        {
          status: 'unhealthy',
          error: config.isConfigured
            ? 'Bucket not accessible'
            : 'R2 configuration missing',
          lastChecked: config.lastChecked.toISOString(),
        },
        { status: 503 }
      )
    }
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      {
        status: 'error',
        error: 'Health check failed',
        lastChecked: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
