/**
 * R2 Media Utilities
 *
 * Utilities for working with Cloudflare R2 media assets,
 * including optimization, error handling, and fallback mechanisms.
 */

// R2 Media Configuration
export interface R2MediaConfig {
  baseUrl: string
  moreUrl: string
  accessKeyId: string
  secretAccessKey: string
  bucketName: string
}

// Media Asset Interface
export interface MediaAsset {
  id: string
  filename: string
  url: string
  type: 'image' | 'video'
  category: 'team' | 'company' | 'general'
  format: string
  size: number
  dimensions: {
    width: number
    height: number
    aspectRatio: number
  }
  optimization: {
    quality: number
    formats: string[]
    sizes: number[]
    lazy: boolean
    placeholder?: string
  }
  fallback: {
    enabled: boolean
    type: 'placeholder' | 'error' | 'retry'
    placeholderUrl?: string
    errorMessage?: string
    retryAttempts?: number
    retryDelay?: number
  }
  metadata: {
    alt?: string
    title?: string
    description?: string
    tags?: string[]
    author?: string
    license?: string
  }
  createdAt: Date
  updatedAt: Date
}

// Get R2 configuration from environment
export const getR2Config = (): R2MediaConfig | null => {
  const config = {
    baseUrl: process.env.NEXT_PUBLIC_R2_BASE_URL || '',
    moreUrl: process.env.NEXT_PUBLIC_R2_MORE_URL || '',
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    bucketName: process.env.R2_BUCKET_NAME || '',
  }

  // Return null if configuration is incomplete
  if (
    !config.baseUrl ||
    !config.accessKeyId ||
    !config.secretAccessKey ||
    !config.bucketName
  ) {
    return null
  }

  return config
}

// Generate optimized image URL
export const getOptimizedImageUrl = (
  assetId: string,
  options: {
    width?: number
    height?: number
    format?: 'webp' | 'avif' | 'jpg' | 'png'
    quality?: number
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
  } = {}
): string => {
  const config = getR2Config()
  if (!config) return ''

  const {
    width,
    height,
    format = 'webp',
    quality = 80,
    fit = 'cover',
  } = options

  const params = new URLSearchParams()

  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())
  params.append('f', format)
  params.append('q', quality.toString())
  params.append('fit', fit)

  return `${config.baseUrl}/media/${assetId}?${params.toString()}`
}

// Generate responsive image URLs
export const getResponsiveImageUrls = (
  assetId: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): { src: string; width: number; format: string }[] => {
  return sizes.map(size => ({
    src: getOptimizedImageUrl(assetId, { width: size, format: 'webp' }),
    width: size,
    format: 'webp',
  }))
}

// Generate srcset string for responsive images
export const getSrcSet = (
  assetId: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): string => {
  const urls = getResponsiveImageUrls(assetId, sizes)
  return urls.map(({ src, width }) => `${src} ${width}w`).join(', ')
}

// Check if image format is supported
export const isFormatSupported = (format: string): boolean => {
  if (typeof window === 'undefined') return true

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) return false

  try {
    canvas.toDataURL(`image/${format}`)
    return true
  } catch {
    return false
  }
}

// Get best supported format
export const getBestSupportedFormat = (): string => {
  if (isFormatSupported('avif')) return 'avif'
  if (isFormatSupported('webp')) return 'webp'
  return 'jpg'
}

// Generate placeholder image
export const generatePlaceholder = (
  width: number,
  height: number,
  color: string = '#f3f4f6'
): string => {
  // Only generate placeholder on client side
  if (typeof window === 'undefined') {
    return ''
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  ctx.fillStyle = color
  ctx.fillRect(0, 0, width, height)

  return canvas.toDataURL('image/jpeg', 0.1)
}

// Lazy load image with intersection observer
export const lazyLoadImage = (
  img: HTMLImageElement,
  src: string,
  placeholder?: string
): (() => void) => {
  if (placeholder) {
    img.src = placeholder
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = src
          observer.unobserve(img)
        }
      })
    },
    { rootMargin: '50px' }
  )

  observer.observe(img)

  return () => observer.disconnect()
}

// Error handling for media loading
export const handleMediaError = (
  error: Error,
  fallback: {
    type: 'placeholder' | 'error' | 'retry'
    placeholderUrl?: string
    errorMessage?: string
    retryAttempts?: number
    retryDelay?: number
  }
): Promise<string> => {
  console.error('Media loading error:', error)

  switch (fallback.type) {
    case 'placeholder':
      return Promise.resolve(
        fallback.placeholderUrl || generatePlaceholder(300, 200)
      )

    case 'error':
      return Promise.reject(
        new Error(fallback.errorMessage || 'Failed to load media')
      )

    case 'retry':
      const attempts = fallback.retryAttempts || 3
      const delay = fallback.retryDelay || 1000

      return new Promise((resolve, reject) => {
        let attempt = 0

        const retry = () => {
          attempt++
          if (attempt > attempts) {
            reject(new Error(`Failed to load media after ${attempts} attempts`))
            return
          }

          setTimeout(() => {
            resolve('retry')
          }, delay)
        }

        retry()
      })

    default:
      return Promise.reject(error)
  }
}

// Preload critical images
export const preloadCriticalImages = (urls: string[]): Promise<void[]> => {
  const promises = urls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => reject(new Error(`Failed to preload image: ${url}`))
      img.src = url
    })
  })

  return Promise.all(promises)
}

// Check if image is cached
export const isImageCached = (url: string): boolean => {
  const img = new Image()
  img.src = url
  return img.complete
}

// Get image dimensions
export const getImageDimensions = (
  url: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      })
    }
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
    img.src = url
  })
}

// Calculate aspect ratio
export const calculateAspectRatio = (width: number, height: number): number => {
  return width / height
}

// Get responsive image sizes
export const getResponsiveSizes = (maxWidth: number): number[] => {
  const sizes = [320, 640, 768, 1024, 1280, 1920]
  return sizes.filter(size => size <= maxWidth)
}

// Generate blur placeholder
export const generateBlurPlaceholder = (
  width: number,
  height: number
): string => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // Create a simple gradient for blur effect
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#f3f4f6')
  gradient.addColorStop(1, '#e5e7eb')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  return canvas.toDataURL('image/jpeg', 0.1)
}

// Media optimization utilities
export const optimizeMediaForDevice = (asset: MediaAsset): MediaAsset => {
  const optimized = { ...asset }

  // Adjust quality based on device capabilities
  if (typeof window !== 'undefined') {
    const connection = (navigator as any).connection
    if (connection && connection.effectiveType === 'slow-2g') {
      optimized.optimization.quality = Math.min(
        optimized.optimization.quality,
        60
      )
    }

    // Adjust format based on support
    const bestFormat = getBestSupportedFormat()
    if (!optimized.optimization.formats.includes(bestFormat)) {
      optimized.optimization.formats.unshift(bestFormat)
    }
  }

  return optimized
}

// Cache management
export const clearMediaCache = (): void => {
  if (typeof window !== 'undefined' && 'caches' in window) {
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        if (cacheName.includes('r2-media')) {
          caches.delete(cacheName)
        }
      })
    })
  }
}

// Performance monitoring for media loading
export const monitorMediaPerformance = (url: string): Promise<number> => {
  const startTime = performance.now()

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const endTime = performance.now()
      resolve(endTime - startTime)
    }
    img.onerror = () => reject(new Error(`Failed to load media: ${url}`))
    img.src = url
  })
}

// Media loading statistics
export const getMediaLoadingStats = () => {
  const stats = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageLoadTime: 0,
    cacheHitRate: 0,
  }

  // This would be implemented with actual tracking
  return stats
}

// Additional utility functions for R2 media
export const buildR2Url = (assetId: string, options?: any): string => {
  const config = getR2Config()
  if (!config || !assetId) return ''
  return `${config.baseUrl.replace(/\/$/, '')}/media/${assetId}`
}

export const getFallbackUrl = (category?: string): string => {
  return '/api/placeholder/300/200'
}

export const validateR2Config = (config: R2MediaConfig): boolean => {
  return !!(
    config.baseUrl &&
    config.accessKeyId &&
    config.secretAccessKey &&
    config.bucketName
  )
}

export const getMediaAssets = async (): Promise<MediaAsset[]> => {
  // This would fetch from R2 API
  return []
}
