/**
 * Asset optimization utilities for visual enhancements
 * Handles image optimization, format conversion, and responsive loading
 */

import { VisualAsset, ResponsiveSize, AssetMetadata } from './types'

export interface OptimizationConfig {
  quality: number
  formats: string[]
  sizes: ResponsiveSize[]
  lazyLoading: boolean
  priority: boolean
}

export interface ImageOptimizationResult {
  originalSize: number
  optimizedSize: number
  compressionRatio: number
  formats: string[]
  responsiveImages: ResponsiveImage[]
}

export interface ResponsiveImage {
  src: string
  srcSet: string
  sizes: string
  format: string
  width: number
  height: number
}

/**
 * Asset optimization utilities class
 */
export class AssetOptimizer {
  private config: OptimizationConfig

  constructor(
    config: OptimizationConfig = {
      quality: 85,
      formats: ['webp', 'avif', 'jpg'],
      sizes: [
        { breakpoint: 'sm', width: 640, height: 480 },
        { breakpoint: 'md', width: 768, height: 576 },
        { breakpoint: 'lg', width: 1024, height: 768 },
        { breakpoint: 'xl', width: 1280, height: 960 },
        { breakpoint: '2xl', width: 1536, height: 1152 },
      ],
      lazyLoading: true,
      priority: false,
    }
  ) {
    this.config = config
  }

  /**
   * Optimize a visual asset
   */
  async optimizeAsset(asset: VisualAsset): Promise<ImageOptimizationResult> {
    const originalSize = await this.getAssetSize(asset.src)

    // Generate responsive images
    const responsiveImages = await this.generateResponsiveImages(asset)

    // Calculate compression ratio
    const optimizedSize = responsiveImages.reduce(
      (total, img) => total + img.width * img.height,
      0
    )
    const compressionRatio = optimizedSize / originalSize

    return {
      originalSize,
      optimizedSize,
      compressionRatio,
      formats: this.config.formats,
      responsiveImages,
    }
  }

  /**
   * Generate responsive images for different screen sizes
   */
  private async generateResponsiveImages(
    asset: VisualAsset
  ): Promise<ResponsiveImage[]> {
    const images: ResponsiveImage[] = []

    for (const size of this.config.sizes) {
      for (const format of this.config.formats) {
        const src = this.generateImageSrc(asset.src, size, format)
        const srcSet = this.generateSrcSet(asset.src, size, format)
        const sizes = this.generateSizes(size.breakpoint)

        images.push({
          src,
          srcSet,
          sizes,
          format,
          width: size.width,
          height: size.height,
        })
      }
    }

    return images
  }

  /**
   * Generate optimized image source URL
   */
  private generateImageSrc(
    originalSrc: string,
    size: ResponsiveSize,
    format: string
  ): string {
    // In a real implementation, this would integrate with an image optimization service
    // For now, we'll simulate the URL structure
    const baseUrl = originalSrc.replace(/\.[^/.]+$/, '')
    return `${baseUrl}_${size.width}x${size.height}.${format}`
  }

  /**
   * Generate srcSet for responsive images
   */
  private generateSrcSet(
    originalSrc: string,
    size: ResponsiveSize,
    format: string
  ): string {
    const srcSet: string[] = []

    // Generate different density versions
    const densities = [1, 1.5, 2, 3]

    for (const density of densities) {
      const width = Math.round(size.width * density)
      const height = Math.round(size.height * density)
      const src = this.generateImageSrc(
        originalSrc,
        { ...size, width, height },
        format
      )
      srcSet.push(`${src} ${density}x`)
    }

    return srcSet.join(', ')
  }

  /**
   * Generate sizes attribute for responsive images
   */
  private generateSizes(breakpoint: string): string {
    const sizeMap: Record<string, string> = {
      sm: '(max-width: 640px) 100vw',
      md: '(max-width: 768px) 100vw',
      lg: '(max-width: 1024px) 100vw',
      xl: '(max-width: 1280px) 100vw',
      '2xl': '100vw',
    }

    return sizeMap[breakpoint] || '100vw'
  }

  /**
   * Get asset file size
   */
  private async getAssetSize(src: string): Promise<number> {
    try {
      const response = await fetch(src, { method: 'HEAD' })
      const contentLength = response.headers.get('content-length')
      return contentLength ? parseInt(contentLength) : 0
    } catch {
      return 0
    }
  }

  /**
   * Check if browser supports specific image format
   */
  static supportsFormat(format: string): boolean {
    if (typeof window === 'undefined') return false

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return false

    try {
      const dataURL = canvas.toDataURL(`image/${format}`)
      return dataURL.includes(format)
    } catch {
      return false
    }
  }

  /**
   * Get optimal image format for current browser
   */
  static getOptimalFormat(): string {
    if (this.supportsFormat('avif')) return 'avif'
    if (this.supportsFormat('webp')) return 'webp'
    return 'jpg'
  }

  /**
   * Generate preload hints for critical images
   */
  static generatePreloadHints(assets: VisualAsset[]): string[] {
    return assets
      .filter(asset => asset.priority)
      .map(asset => {
        const format = this.getOptimalFormat()
        return `<link rel="preload" as="image" href="${asset.src}" type="image/${format}">`
      })
  }
}

/**
 * Image loading utilities
 */
export const imageLoadingUtils = {
  /**
   * Lazy load images with intersection observer
   */
  setupLazyLoading(selector: string = 'img[data-src]'): void {
    if (typeof window === 'undefined') return

    const images = document.querySelectorAll(selector)

    const imageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const src = img.dataset.src

          if (src) {
            img.src = src
            img.removeAttribute('data-src')
            imageObserver.unobserve(img)
          }
        }
      })
    })

    images.forEach(img => imageObserver.observe(img))
  },

  /**
   * Preload critical images
   */
  preloadImages(urls: string[]): Promise<void[]> {
    return Promise.all(
      urls.map(url => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => reject(new Error(`Failed to load ${url}`))
          img.src = url
        })
      })
    )
  },

  /**
   * Get image loading progress
   */
  getLoadingProgress(images: HTMLImageElement[]): number {
    const loaded = images.filter(img => img.complete).length
    return (loaded / images.length) * 100
  },
}

/**
 * Asset management utilities
 */
export const assetManagement = {
  /**
   * Create optimized asset metadata
   */
  createAssetMetadata(
    title: string,
    description: string,
    keywords: string[] = []
  ): AssetMetadata {
    return {
      title,
      description,
      keywords,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  },

  /**
   * Validate asset configuration
   */
  validateAsset(asset: VisualAsset): string[] {
    const errors: string[] = []

    if (!asset.id) {
      errors.push('Asset ID is required')
    }

    if (!asset.src) {
      errors.push('Asset source is required')
    }

    if (!asset.alt) {
      errors.push('Alt text is required for accessibility')
    }

    if (asset.width <= 0 || asset.height <= 0) {
      errors.push('Width and height must be positive numbers')
    }

    if (asset.formats.length === 0) {
      errors.push('At least one format must be specified')
    }

    if (asset.sizes.length === 0) {
      errors.push('At least one responsive size must be specified')
    }

    return errors
  },

  /**
   * Generate asset ID
   */
  generateAssetId(type: string, name: string): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8)
    return `${type}-${name}-${timestamp}-${random}`
  },

  /**
   * Get asset dimensions from file
   */
  async getAssetDimensions(
    src: string
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight })
      }
      img.onerror = () => {
        reject(new Error(`Failed to load image: ${src}`))
      }
      img.src = src
    })
  },
}

/**
 * Performance optimization for assets
 */
export const assetPerformance = {
  /**
   * Calculate optimal image quality based on device
   */
  getOptimalQuality(deviceTier: 'high' | 'medium' | 'low'): number {
    const qualityMap = {
      high: 90,
      medium: 80,
      low: 70,
    }
    return qualityMap[deviceTier]
  },

  /**
   * Get optimal image size based on viewport
   */
  getOptimalSize(viewportWidth: number, devicePixelRatio: number = 1): number {
    const effectiveWidth = viewportWidth * devicePixelRatio

    // Cap at 2x for performance
    const maxWidth = Math.min(effectiveWidth, 1920)

    // Round to nearest 100 for better caching
    return Math.round(maxWidth / 100) * 100
  },

  /**
   * Check if image should be prioritized
   */
  shouldPrioritizeImage(element: HTMLElement): boolean {
    // Prioritize images above the fold
    const rect = element.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    return rect.top < viewportHeight
  },
}
