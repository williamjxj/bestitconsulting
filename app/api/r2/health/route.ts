import { NextResponse } from 'next/server'
import { validateR2Config } from '@/lib/r2-media'

export async function GET() {
  try {
    const configData = {
      baseUrl: process.env.R2_BASE_URL || '',
      moreUrl: process.env.R2_MORE_URL || '',
      accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
      bucketName: process.env.R2_BUCKET_NAME || '',
    }

    const isConfigured = validateR2Config(configData)
    const startTime = Date.now()

    // Test bucket accessibility
    let isHealthy = false
    let responseTime = 0

    if (isConfigured) {
      try {
        const testUrl = `${configData.baseUrl}/health-check`
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

    const lastChecked = new Date()

    if (isHealthy) {
      return NextResponse.json({
        status: 'healthy',
        bucketUrl: configData.baseUrl,
        lastChecked: lastChecked.toISOString(),
        responseTime,
      })
    } else {
      return NextResponse.json(
        {
          status: 'unhealthy',
          error: isConfigured
            ? 'Bucket not accessible'
            : 'R2 configuration missing',
          lastChecked: lastChecked.toISOString(),
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
