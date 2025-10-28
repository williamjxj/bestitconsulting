import { NextResponse } from 'next/server'
import { listR2Assets, getAssetMetadata, isR2Configured } from '@/lib/r2-utils'

export async function GET() {
  try {
    if (!isR2Configured()) {
      return NextResponse.json({ error: 'R2 not configured' }, { status: 500 })
    }

    // List all assets from R2 bucket using AWS SDK
    const assetFilenames = await listR2Assets()
    const assets = assetFilenames.map(filename => getAssetMetadata(filename))

    return NextResponse.json({
      assets,
      count: assets.length,
      configured: true,
    })
  } catch (error) {
    console.error('Error fetching R2 assets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch R2 assets' },
      { status: 500 }
    )
  }
}
