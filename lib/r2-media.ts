/**
 * R2 Media Utilities
 *
 * Provides utilities for working with Cloudflare R2 media bucket
 * including URL construction, validation, and media asset management.
 */

export interface MediaAsset {
  id: string
  filename: string
  url: string
  type: 'image' | 'video'
  format: string
  size: number
  width?: number
  height?: number
  alt: string
  category: 'team' | 'company' | 'general'
  uploadedAt: Date
  isActive: boolean
}

export interface R2BucketConfig {
  baseUrl: string
  bucketName: string
  region: string
  isConfigured: boolean
  lastChecked: Date
  isHealthy: boolean
}

export interface MediaGallery {
  id: string
  title: string
  description?: string
  category: 'team' | 'company'
  assets: MediaAsset[]
  layout: 'grid' | 'carousel' | 'masonry'
  maxItems?: number
  isVisible: boolean
}

/**
 * Get the base URL for R2 media bucket from environment variables
 * @returns The base URL for R2 media bucket
 * @throws Error if NEXT_PUBLIC_R2_MORE_URL is not configured
 */
export function getR2BaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_R2_MORE_URL
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_R2_MORE_URL is not configured')
  }
  return baseUrl
}

/**
 * Build a complete R2 URL from a path
 * @param path - The path to append to the base URL
 * @returns Complete R2 URL
 */
export function buildR2Url(path: string): string {
  const baseUrl = getR2BaseUrl()
  // Ensure path doesn't start with slash to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${baseUrl}/${cleanPath}`
}

/**
 * Validate R2 bucket configuration
 * @returns R2BucketConfig object with validation status
 */
export function validateR2Config(): R2BucketConfig {
  const baseUrl = process.env.NEXT_PUBLIC_R2_MORE_URL
  const isConfigured = !!baseUrl && baseUrl.startsWith('https://')

  return {
    baseUrl: baseUrl || '',
    bucketName: extractBucketName(baseUrl || ''),
    region: 'auto', // R2 uses auto region
    isConfigured,
    lastChecked: new Date(),
    isHealthy: isConfigured,
  }
}

/**
 * Extract bucket name from R2 URL
 * @param url - R2 URL
 * @returns Bucket name
 */
function extractBucketName(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.split('.')[0]
  } catch {
    return ''
  }
}

/**
 * Get media assets by category
 * @param category - Media category filter
 * @returns Array of media assets
 */
export function getMediaAssets(category: string): MediaAsset[] {
  // Mock data for development - in production this would fetch from R2 bucket
  const mockAssets: MediaAsset[] = [
    {
      id: 'team-1',
      filename: 'team-member-1.jpg',
      url: buildR2Url('team/team-member-1.jpg'),
      type: 'image',
      format: 'jpg',
      size: 245760,
      width: 400,
      height: 400,
      alt: 'Team member 1',
      category: 'team',
      uploadedAt: new Date(),
      isActive: true,
    },
    {
      id: 'team-2',
      filename: 'team-member-2.jpg',
      url: buildR2Url('team/team-member-2.jpg'),
      type: 'image',
      format: 'jpg',
      size: 198432,
      width: 400,
      height: 400,
      alt: 'Team member 2',
      category: 'team',
      uploadedAt: new Date(),
      isActive: true,
    },
    {
      id: 'company-1',
      filename: 'office-space.jpg',
      url: buildR2Url('company/office-space.jpg'),
      type: 'image',
      format: 'jpg',
      size: 512000,
      width: 800,
      height: 600,
      alt: 'Our office space',
      category: 'company',
      uploadedAt: new Date(),
      isActive: true,
    },
  ]

  return mockAssets.filter(asset => asset.category === category)
}

/**
 * Create a media asset object
 * @param filename - Original filename
 * @param category - Media category
 * @param alt - Alternative text
 * @param type - Media type
 * @returns MediaAsset object
 */
export function createMediaAsset(
  filename: string,
  category: 'team' | 'company' | 'general',
  alt: string,
  type: 'image' | 'video' = 'image'
): MediaAsset {
  const id = `${category}-${filename.replace(/\.[^/.]+$/, '')}-${Date.now()}`

  return {
    id,
    filename,
    url: buildR2Url(`${category}/${filename}`),
    type,
    format: filename.split('.').pop() || '',
    size: 0, // Will be set when file is uploaded
    alt,
    category,
    uploadedAt: new Date(),
    isActive: true,
  }
}

/**
 * Check if a media asset is accessible
 * @param asset - Media asset to check
 * @returns Promise<boolean> - Whether asset is accessible
 */
export async function checkMediaAssetAccess(
  asset: MediaAsset
): Promise<boolean> {
  try {
    const response = await fetch(asset.url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Get fallback URL for media assets
 * @param category - Media category
 * @returns Fallback image URL
 */
export function getFallbackUrl(
  category: 'team' | 'company' | 'general'
): string {
  const fallbackMap = {
    team: '/placeholders/team-placeholder.jpg',
    company: '/placeholders/company-placeholder.jpg',
    general: '/placeholders/image-placeholder.jpg',
  }

  return fallbackMap[category] || '/placeholders/image-placeholder.jpg'
}

/**
 * Filter media assets by category and type
 * @param assets - Array of media assets
 * @param category - Category filter
 * @param type - Type filter (optional)
 * @returns Filtered assets
 */
export function filterMediaAssets(
  assets: MediaAsset[],
  category: string,
  type?: 'image' | 'video'
): MediaAsset[] {
  let filtered = assets.filter(asset => asset.category === category)

  if (type) {
    filtered = filtered.filter(asset => asset.type === type)
  }

  return filtered
}

/**
 * Search media assets by text
 * @param assets - Array of media assets
 * @param query - Search query
 * @returns Matching assets
 */
export function searchMediaAssets(
  assets: MediaAsset[],
  query: string
): MediaAsset[] {
  const searchTerm = query.toLowerCase()

  return assets.filter(
    asset =>
      asset.alt.toLowerCase().includes(searchTerm) ||
      asset.filename.toLowerCase().includes(searchTerm) ||
      asset.category.toLowerCase().includes(searchTerm)
  )
}

/**
 * Sort media assets by various criteria
 * @param assets - Array of media assets
 * @param sortBy - Sort criteria
 * @param order - Sort order
 * @returns Sorted assets
 */
export function sortMediaAssets(
  assets: MediaAsset[],
  sortBy: 'uploadedAt' | 'filename' | 'size' | 'category',
  order: 'asc' | 'desc' = 'desc'
): MediaAsset[] {
  return [...assets].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case 'uploadedAt':
        comparison = a.uploadedAt.getTime() - b.uploadedAt.getTime()
        break
      case 'filename':
        comparison = a.filename.localeCompare(b.filename)
        break
      case 'size':
        comparison = a.size - b.size
        break
      case 'category':
        comparison = a.category.localeCompare(b.category)
        break
    }

    return order === 'desc' ? -comparison : comparison
  })
}

/**
 * Get media asset statistics
 * @param assets - Array of media assets
 * @returns Statistics object
 */
export function getMediaAssetStats(assets: MediaAsset[]) {
  const total = assets.length
  const byType = assets.reduce(
    (acc, asset) => {
      acc[asset.type] = (acc[asset.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const byCategory = assets.reduce(
    (acc, asset) => {
      acc[asset.category] = (acc[asset.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const totalSize = assets.reduce((sum, asset) => sum + asset.size, 0)
  const activeCount = assets.filter(asset => asset.isActive).length

  return {
    total,
    active: activeCount,
    inactive: total - activeCount,
    byType,
    byCategory,
    totalSize,
    averageSize: total > 0 ? Math.round(totalSize / total) : 0,
  }
}

/**
 * Preload media assets for better performance
 * @param assets - Array of media assets to preload
 * @returns Promise that resolves when all assets are preloaded
 */
export async function preloadMediaAssets(assets: MediaAsset[]): Promise<void> {
  const preloadPromises = assets.map(asset => {
    return new Promise<void>(resolve => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => resolve() // Continue even if one fails
      img.src = asset.url
    })
  })

  await Promise.all(preloadPromises)
}

/**
 * Get optimized image URL with query parameters
 * @param url - Base image URL
 * @param width - Desired width
 * @param height - Desired height
 * @param quality - Image quality (1-100)
 * @returns Optimized URL
 */
export function getOptimizedImageUrl(
  url: string,
  width?: number,
  height?: number,
  quality: number = 80
): string {
  const params = new URLSearchParams()

  if (width) params.set('w', width.toString())
  if (height) params.set('h', height.toString())
  params.set('q', quality.toString())
  params.set('f', 'auto') // Auto format selection

  return `${url}?${params.toString()}`
}
