/**
 * Asset management utilities
 * Handles asset loading, caching, and optimization
 */

import { VisualAsset, AssetMetadata, ResponsiveSize } from './types'
import { AssetOptimizer, OptimizationConfig } from './asset-optimization'

export interface AssetManagerConfig {
  cacheSize: number
  preloadCritical: boolean
  lazyLoadThreshold: number
  optimizationConfig: OptimizationConfig
}

export interface AssetCache {
  [key: string]: {
    asset: VisualAsset
    loaded: boolean
    timestamp: number
    size: number
  }
}

export interface AssetLoadResult {
  success: boolean
  asset?: VisualAsset
  error?: string
  loadTime: number
  fromCache: boolean
}

/**
 * Asset manager class
 */
export class AssetManager {
  private config: AssetManagerConfig
  private cache: AssetCache = {}
  private optimizer: AssetOptimizer
  private loadingPromises: Map<string, Promise<AssetLoadResult>> = new Map()

  constructor(config: AssetManagerConfig) {
    this.config = config
    this.optimizer = new AssetOptimizer(config.optimizationConfig)
  }

  /**
   * Load an asset with caching and optimization
   */
  async loadAsset(
    assetId: string,
    src: string,
    metadata: Partial<AssetMetadata> = {}
  ): Promise<AssetLoadResult> {
    const startTime = performance.now()

    // Check cache first
    if (this.cache[assetId]) {
      const cached = this.cache[assetId]
      if (cached.loaded) {
        return {
          success: true,
          asset: cached.asset,
          loadTime: 0,
          fromCache: true,
        }
      }
    }

    // Check if already loading
    if (this.loadingPromises.has(assetId)) {
      return this.loadingPromises.get(assetId)!
    }

    // Create loading promise
    const loadPromise = this._loadAssetInternal(
      assetId,
      src,
      metadata,
      startTime
    )
    this.loadingPromises.set(assetId, loadPromise)

    try {
      const result = await loadPromise
      this.loadingPromises.delete(assetId)
      return result
    } catch (error) {
      this.loadingPromises.delete(assetId)
      throw error
    }
  }

  /**
   * Internal asset loading logic
   */
  private async _loadAssetInternal(
    assetId: string,
    src: string,
    metadata: Partial<AssetMetadata>,
    startTime: number
  ): Promise<AssetLoadResult> {
    try {
      // Create asset object
      const asset: VisualAsset = {
        id: assetId,
        type: this._detectAssetType(src),
        src,
        alt: metadata.title || 'Asset',
        width: 0,
        height: 0,
        formats: ['jpg', 'webp', 'avif'],
        sizes: this._generateResponsiveSizes(),
        loading: 'lazy',
        priority: false,
        metadata: {
          title: metadata.title,
          description: metadata.description,
          keywords: metadata.keywords,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }

      // Load and optimize asset
      const optimizedResult = await this.optimizer.optimizeAsset(asset)

      // Update asset with optimized data
      const optimizedAsset = {
        ...asset,
        width: optimizedResult.responsiveImages[0]?.width || 0,
        height: optimizedResult.responsiveImages[0]?.height || 0,
      }

      // Cache the asset
      this._cacheAsset(assetId, optimizedAsset)

      const loadTime = performance.now() - startTime

      return {
        success: true,
        asset: optimizedAsset,
        loadTime,
        fromCache: false,
      }
    } catch (error) {
      const loadTime = performance.now() - startTime
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        loadTime,
        fromCache: false,
      }
    }
  }

  /**
   * Preload critical assets
   */
  async preloadCriticalAssets(assets: VisualAsset[]): Promise<void> {
    const criticalAssets = assets.filter(asset => asset.priority)

    const preloadPromises = criticalAssets.map(asset =>
      this.loadAsset(asset.id, asset.src, asset.metadata)
    )

    await Promise.all(preloadPromises)
  }

  /**
   * Lazy load assets when they come into view
   */
  setupLazyLoading(selector: string = '[data-lazy-src]'): void {
    if (typeof window === 'undefined') return

    const elements = document.querySelectorAll(selector)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            const src = element.dataset.lazySrc
            const assetId = element.dataset.assetId

            if (src && assetId) {
              this.loadAsset(assetId, src).then(result => {
                if (result.success && result.asset) {
                  this._updateElementWithAsset(element, result.asset)
                }
              })

              observer.unobserve(element)
            }
          }
        })
      },
      { threshold: this.config.lazyLoadThreshold }
    )

    elements.forEach(element => observer.observe(element))
  }

  /**
   * Get cached asset
   */
  getCachedAsset(assetId: string): VisualAsset | null {
    const cached = this.cache[assetId]
    return cached?.loaded ? cached.asset : null
  }

  /**
   * Clear asset cache
   */
  clearCache(): void {
    this.cache = {}
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    size: number
    count: number
    memoryUsage: number
  } {
    const entries = Object.values(this.cache)
    const size = entries.reduce((total, entry) => total + entry.size, 0)
    const memoryUsage = entries.reduce((total, entry) => total + entry.size, 0)

    return {
      size,
      count: entries.length,
      memoryUsage,
    }
  }

  /**
   * Detect asset type from source
   */
  private _detectAssetType(src: string): VisualAsset['type'] {
    const extension = src.split('.').pop()?.toLowerCase()

    if (
      ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'].includes(extension || '')
    ) {
      return 'image'
    }

    if (['mp4', 'webm', 'ogg'].includes(extension || '')) {
      return 'video'
    }

    if (['svg'].includes(extension || '')) {
      return 'icon'
    }

    return 'graphic'
  }

  /**
   * Generate responsive sizes
   */
  private _generateResponsiveSizes(): ResponsiveSize[] {
    return [
      { breakpoint: 'sm', width: 640, height: 480 },
      { breakpoint: 'md', width: 768, height: 576 },
      { breakpoint: 'lg', width: 1024, height: 768 },
      { breakpoint: 'xl', width: 1280, height: 960 },
      { breakpoint: '2xl', width: 1536, height: 1152 },
    ]
  }

  /**
   * Cache an asset
   */
  private _cacheAsset(assetId: string, asset: VisualAsset): void {
    // Check cache size limit
    if (Object.keys(this.cache).length >= this.config.cacheSize) {
      this._evictOldestCacheEntry()
    }

    this.cache[assetId] = {
      asset,
      loaded: true,
      timestamp: Date.now(),
      size: this._estimateAssetSize(asset),
    }
  }

  /**
   * Evict oldest cache entry
   */
  private _evictOldestCacheEntry(): void {
    let oldestKey = ''
    let oldestTime = Date.now()

    for (const [key, entry] of Object.entries(this.cache)) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp
        oldestKey = key
      }
    }

    if (oldestKey) {
      delete this.cache[oldestKey]
    }
  }

  /**
   * Estimate asset size
   */
  private _estimateAssetSize(asset: VisualAsset): number {
    // Rough estimation based on dimensions and type
    const baseSize = asset.width * asset.height
    const typeMultiplier = {
      image: 1,
      video: 10,
      icon: 0.1,
      graphic: 2,
    }

    return baseSize * typeMultiplier[asset.type] * 0.001 // Convert to KB
  }

  /**
   * Update DOM element with loaded asset
   */
  private _updateElementWithAsset(
    element: HTMLElement,
    asset: VisualAsset
  ): void {
    if (element.tagName === 'IMG') {
      const img = element as HTMLImageElement
      img.src = asset.src
      img.alt = asset.alt
      img.width = asset.width
      img.height = asset.height
      img.loading = asset.loading
    }

    // Remove lazy loading attributes
    element.removeAttribute('data-lazy-src')
    element.removeAttribute('data-asset-id')
  }
}

/**
 * Asset loading utilities
 */
export const assetLoadingUtils = {
  /**
   * Create asset manager instance
   */
  createAssetManager(config: AssetManagerConfig): AssetManager {
    return new AssetManager(config)
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

    return errors
  },

  /**
   * Get optimal image format for browser
   */
  getOptimalFormat(): string {
    if (typeof window === 'undefined') return 'jpg'

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return 'jpg'

    try {
      // Test AVIF support
      const avifDataURL = canvas.toDataURL('image/avif')
      if (avifDataURL.includes('avif')) return 'avif'
    } catch {}

    try {
      // Test WebP support
      const webpDataURL = canvas.toDataURL('image/webp')
      if (webpDataURL.includes('webp')) return 'webp'
    } catch {}

    return 'jpg'
  },

  /**
   * Create responsive image srcSet
   */
  createSrcSet(baseSrc: string, sizes: ResponsiveSize[]): string {
    return sizes
      .map(size => {
        const src = baseSrc.replace(
          /\.[^/.]+$/,
          `_${size.width}x${size.height}.webp`
        )
        return `${src} ${size.width}w`
      })
      .join(', ')
  },

  /**
   * Create responsive image sizes attribute
   */
  createSizesAttribute(sizes: ResponsiveSize[]): string {
    return (
      sizes
        .map(size => `(max-width: ${size.width}px) ${size.width}px`)
        .join(', ') + ', 100vw'
    )
  },
}

/**
 * Asset performance monitoring
 */
export const assetPerformance = {
  /**
   * Monitor asset loading performance
   */
  monitorAssetLoading(assetId: string, startTime: number): void {
    const endTime = performance.now()
    const loadTime = endTime - startTime

    // Log performance data in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Asset ${assetId} loaded in ${loadTime.toFixed(2)}ms`)
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      // Analytics tracking would go here
    }
  },

  /**
   * Get asset loading metrics
   */
  getLoadingMetrics(assets: VisualAsset[]): {
    totalAssets: number
    loadedAssets: number
    averageLoadTime: number
    totalSize: number
  } {
    // This would be implemented with actual metrics collection
    return {
      totalAssets: assets.length,
      loadedAssets: 0,
      averageLoadTime: 0,
      totalSize: 0,
    }
  },
}
