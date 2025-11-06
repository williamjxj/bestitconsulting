import { NextRequest, NextResponse } from 'next/server'
import { getMediaAssets, validateR2Config } from '@/lib/r2-media'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ assetId: string }> }
) {
  try {
    // Validate R2 configuration
    const configData = {
      baseUrl: process.env.R2_BASE_URL || '',
      moreUrl: process.env.R2_MORE_URL || '',
      accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
      bucketName: process.env.R2_BUCKET_NAME || '',
    }

    const isConfigured = validateR2Config(configData)
    if (!isConfigured) {
      return NextResponse.json(
        {
          error: 'R2_MEDIA_CONFIG_MISSING',
          message: 'R2 media configuration is not properly set up',
        },
        { status: 503 }
      )
    }

    const { assetId } = await params

    if (!assetId) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: 'Asset ID is required',
        },
        { status: 400 }
      )
    }

    // Get all media assets and find the specific one
    const allAssets = await getMediaAssets()

    const asset = allAssets.find(a => a.id === assetId)

    if (!asset) {
      return NextResponse.json(
        {
          error: 'NOT_FOUND',
          message: 'Media asset not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json(asset)
  } catch (error) {
    console.error('Media asset API error:', error)
    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: 'An internal error occurred while fetching media asset',
      },
      { status: 500 }
    )
  }
}
