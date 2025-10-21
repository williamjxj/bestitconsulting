/**
 * Media Configuration
 *
 * Configuration constants and settings for R2 media integration
 */

export const MEDIA_CONFIG = {
  // File size limits (in bytes)
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_VIDEO_SIZE: 100 * 1024 * 1024, // 100MB

  // Supported file formats
  SUPPORTED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
  SUPPORTED_VIDEO_FORMATS: ['mp4', 'webm', 'mov'],

  // Image dimensions
  MIN_DIMENSIONS: { width: 100, height: 100 },
  MAX_DIMENSIONS: { width: 4000, height: 4000 },

  // Performance settings
  LOADING_TIMEOUT: 5000, // 5 seconds
  MAX_RETRY_ATTEMPTS: 3,
  LAZY_LOADING_THRESHOLD: 100, // pixels from viewport
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds

  // Gallery settings
  DEFAULT_GALLERY_LAYOUT: 'grid' as const,
  DEFAULT_MAX_ITEMS: 12,
  GRID_COLUMNS: {
    mobile: 2,
    tablet: 3,
    desktop: 4,
    large: 6,
  },

  // Loading states
  SKELETON_ANIMATION_DURATION: 2000, // 2 seconds
  FADE_IN_DURATION: 300, // 300ms

  // Error messages
  ERROR_MESSAGES: {
    CONFIG_MISSING: 'R2 media configuration is missing',
    BUCKET_INACCESSIBLE: 'R2 bucket is not accessible',
    INVALID_FORMAT: 'Unsupported media format',
    FILE_TOO_LARGE: 'File size exceeds maximum limit',
    LOADING_TIMEOUT: 'Media loading timeout',
    NETWORK_ERROR: 'Network error while loading media',
  },
} as const

export const MEDIA_CATEGORIES = {
  TEAM: 'team',
  COMPANY: 'company',
  GENERAL: 'general',
} as const

export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
} as const

export const GALLERY_LAYOUTS = {
  GRID: 'grid',
  CAROUSEL: 'carousel',
  MASONRY: 'masonry',
} as const

/**
 * Validate file format
 * @param filename - File name to validate
 * @param type - Media type (image or video)
 * @returns Whether format is supported
 */
export function validateFileFormat(
  filename: string,
  type: 'image' | 'video'
): boolean {
  const extension = filename.split('.').pop()?.toLowerCase()
  if (!extension) return false

  const supportedFormats =
    type === 'image'
      ? MEDIA_CONFIG.SUPPORTED_IMAGE_FORMATS
      : MEDIA_CONFIG.SUPPORTED_VIDEO_FORMATS

  return (supportedFormats as readonly string[]).includes(extension)
}

/**
 * Validate file size
 * @param size - File size in bytes
 * @param type - Media type (image or video)
 * @returns Whether size is within limits
 */
export function validateFileSize(
  size: number,
  type: 'image' | 'video'
): boolean {
  const maxSize =
    type === 'image' ? MEDIA_CONFIG.MAX_IMAGE_SIZE : MEDIA_CONFIG.MAX_VIDEO_SIZE

  return size <= maxSize
}

/**
 * Validate image dimensions
 * @param width - Image width
 * @param height - Image height
 * @returns Whether dimensions are within limits
 */
export function validateDimensions(width: number, height: number): boolean {
  return (
    width >= MEDIA_CONFIG.MIN_DIMENSIONS.width &&
    height >= MEDIA_CONFIG.MIN_DIMENSIONS.height &&
    width <= MEDIA_CONFIG.MAX_DIMENSIONS.width &&
    height <= MEDIA_CONFIG.MAX_DIMENSIONS.height
  )
}

/**
 * Get responsive grid columns based on screen size
 * @param screenSize - Screen size category
 * @returns Number of columns
 */
export function getGridColumns(
  screenSize: 'mobile' | 'tablet' | 'desktop' | 'large'
): number {
  return MEDIA_CONFIG.GRID_COLUMNS[screenSize]
}

/**
 * Get loading timeout for media type
 * @param type - Media type
 * @returns Timeout in milliseconds
 */
export function getLoadingTimeout(type: 'image' | 'video'): number {
  return type === 'image'
    ? MEDIA_CONFIG.LOADING_TIMEOUT
    : MEDIA_CONFIG.LOADING_TIMEOUT * 2 // Videos get longer timeout
}
