/**
 * Cloudflare R2 utility functions for fetching and managing assets
 */

import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

interface R2Config {
  accountId: string
  accessKeyId: string
  secretAccessKey: string
  bucketName: string
  publicUrl: string
}

/**
 * Get R2 configuration from environment variables
 */
export function getR2Config(): R2Config {
  const config = {
    accountId: process.env.CLOUDFLARE_R2_ACCOUNT_ID || '',
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
    bucketName:
      process.env.CLOUDFLARE_R2_BUCKET_NAME || 'bestitconsulting-assets',
    publicUrl: process.env.CLOUDFLARE_R2_PUBLIC_URL || '',
  }

  // Validate required configuration
  if (!config.accountId || !config.accessKeyId || !config.secretAccessKey) {
    throw new Error(
      'Missing required R2 configuration. Please check your environment variables.'
    )
  }

  return config
}

/**
 * Generate a signed URL for R2 asset access
 * This is a simplified version - in production, you'd want to use AWS SDK
 */
export function getR2AssetUrl(assetKey: string): string {
  const config = getR2Config()

  // For public assets, construct the public URL
  if (config.publicUrl) {
    return `${config.publicUrl}/${assetKey}`
  }

  // Fallback to direct R2 URL (requires public access)
  return `https://${config.bucketName}.${config.accountId}.r2.cloudflarestorage.com/${assetKey}`
}

/**
 * Get video URL from R2 bucket
 */
export function getR2VideoUrl(videoKey: string): string {
  return getR2AssetUrl(videoKey)
}

/**
 * Check if R2 is properly configured
 */
export function isR2Configured(): boolean {
  try {
    getR2Config()
    return true
  } catch {
    return false
  }
}

/**
 * Get demo video URL (jimeng-5.mp4)
 */
export function getDemoVideoUrl(): string {
  return getR2VideoUrl('jimeng-5.mp4')
}

/**
 * List all assets in the R2 bucket using AWS SDK
 */
export async function listR2Assets(): Promise<string[]> {
  const config = getR2Config()

  console.log('R2 Config:', {
    accountId: config.accountId,
    bucketName: config.bucketName,
    hasAccessKey: !!config.accessKeyId,
    hasSecretKey: !!config.secretAccessKey,
    publicUrl: config.publicUrl,
  })

  try {
    // Create S3 client for R2
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    })

    console.log('S3 Client created, listing objects...')

    // List all objects in the bucket
    const command = new ListObjectsV2Command({
      Bucket: config.bucketName,
    })

    const response = await s3Client.send(command)
    // console.log('S3 Response:', response)

    // Extract object keys (filenames) from the response
    const assetFilenames =
      response.Contents?.map(obj => obj.Key || '').filter(key => key) || []

    return assetFilenames
  } catch (error: any) {
    console.error('Error listing R2 assets:', error)
    console.error('Error details:', {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      statusCode: error?.$metadata?.httpStatusCode,
    })

    // Fallback to hardcoded list if AWS SDK fails
    console.log('Falling back to hardcoded asset list')
    return ['jimeng-5.mp4', 'jimeng-5-poster.jpg']
  }
}

/**
 * Add a new asset to the known assets list
 * This is a helper function for testing
 */
export function addKnownAsset(filename: string): void {
  // This would typically update a database or configuration
  // For now, just log it
  console.log(`Adding asset: ${filename}`)
}

/**
 * Test if an asset exists in R2 bucket
 * This is a helper function to discover assets
 */
export async function testAssetExists(filename: string): Promise<boolean> {
  try {
    const url = getR2AssetUrl(filename)
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Get asset type based on file extension
 */
export function getAssetType(
  filename: string
): 'image' | 'video' | 'document' | 'other' {
  const ext = filename.toLowerCase().split('.').pop()

  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
    return 'image'
  }

  if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(ext || '')) {
    return 'video'
  }

  if (['pdf', 'doc', 'docx', 'txt'].includes(ext || '')) {
    return 'document'
  }

  return 'other'
}

/**
 * Get asset metadata
 */
export function getAssetMetadata(filename: string) {
  const type = getAssetType(filename)
  const url = getR2AssetUrl(filename)

  return {
    filename,
    type,
    url,
    isVideo: type === 'video',
    isImage: type === 'image',
    isDocument: type === 'document',
  }
}
