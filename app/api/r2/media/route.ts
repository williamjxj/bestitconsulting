import { NextRequest, NextResponse } from 'next/server'
import { getMediaAssets, validateR2Config } from '@/lib/r2-media'

export async function GET(request: NextRequest) {
  try {
    // Validate R2 configuration
    const config = validateR2Config()
    if (!config.isConfigured) {
      return NextResponse.json(
        {
          error: 'R2_MEDIA_CONFIG_MISSING',
          message: 'R2 media configuration is not properly set up',
        },
        { status: 503 }
      )
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const type = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Validate parameters
    if (!category) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: 'Category parameter is required',
        },
        { status: 400 }
      )
    }

    if (!['team', 'company', 'general'].includes(category)) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: 'Invalid category. Must be one of: team, company, general',
        },
        { status: 400 }
      )
    }

    if (type && !['image', 'video'].includes(type)) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: 'Invalid type. Must be one of: image, video',
        },
        { status: 400 }
      )
    }

    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: 'Limit must be between 1 and 100',
        },
        { status: 400 }
      )
    }

    if (offset < 0) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: 'Offset must be non-negative',
        },
        { status: 400 }
      )
    }

    // Get media assets
    let assets = getMediaAssets(category)

    // Filter by type if specified
    if (type) {
      assets = assets.filter(asset => asset.type === type)
    }

    // Apply pagination
    const total = assets.length
    const paginatedAssets = assets.slice(offset, offset + limit)
    const hasMore = offset + limit < total

    return NextResponse.json({
      assets: paginatedAssets,
      total,
      hasMore,
      pagination: {
        limit,
        offset,
        total,
      },
    })
  } catch (error) {
    console.error('Media API error:', error)
    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: 'An internal error occurred while fetching media assets',
      },
      { status: 500 }
    )
  }
}
