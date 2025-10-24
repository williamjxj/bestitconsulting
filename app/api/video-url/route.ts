import { NextResponse } from 'next/server'
import { getDemoVideoUrl, isR2Configured } from '@/lib/r2-utils'

export async function GET() {
  try {
    if (!isR2Configured()) {
      return NextResponse.json({ error: 'R2 not configured' }, { status: 500 })
    }

    const videoUrl = getDemoVideoUrl()

    return NextResponse.json({
      videoUrl,
      configured: true,
    })
  } catch (error) {
    console.error('Error getting video URL:', error)
    return NextResponse.json(
      { error: 'Failed to get video URL' },
      { status: 500 }
    )
  }
}
