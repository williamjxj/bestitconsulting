/**
 * Cloudflare R2 utility functions for fetching and managing assets
 */

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
