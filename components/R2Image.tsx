'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { buildR2Url, getFallbackUrl } from '@/lib/r2-media'
import { getLoadingTimeout } from '@/lib/media-config'
import { Skeleton } from '@/components/ui/skeleton'
import { useResponsive } from '@/lib/breakpoints'

interface R2ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  fallback?: string
  className?: string
  category?: 'team' | 'company' | 'general'
  onLoad?: () => void
  onError?: () => void
  quality?: number
  sizes?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export default function R2Image({
  src,
  alt,
  width = 300,
  height = 200,
  priority = false,
  fallback,
  className = '',
  category = 'general',
  onLoad,
  onError,
  quality,
  sizes,
  placeholder = 'blur',
  blurDataURL,
}: R2ImageProps) {
  const [imgSrc, setImgSrc] = useState(buildR2Url(src))
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [webpSupported, setWebpSupported] = useState(false)
  const { isMobile } = useResponsive()

  const fallbackUrl = fallback || getFallbackUrl(category)
  const loadingTimeout = getLoadingTimeout('image')

  // Detect WebP support
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    }
    setWebpSupported(checkWebPSupport())
  }, [])

  // Generate optimized image URL with WebP support
  const getOptimizedUrl = useCallback(
    (originalSrc: string) => {
      const baseUrl = buildR2Url(originalSrc)
      if (webpSupported && !baseUrl.includes('.webp')) {
        // Add WebP format parameter if supported
        return `${baseUrl}?format=webp&quality=${quality || (isMobile ? 75 : 90)}`
      }
      return baseUrl
    },
    [webpSupported, quality, isMobile]
  )

  // Generate responsive sizes
  const getResponsiveSizes = useCallback(() => {
    if (sizes) return sizes

    if (isMobile) {
      return '(max-width: 768px) 100vw, 50vw'
    }
    return '(max-width: 1200px) 50vw, 33vw'
  }, [sizes, isMobile])

  // Generate blur data URL if not provided
  const getBlurDataURL = useCallback(() => {
    if (blurDataURL) return blurDataURL

    // Generate a simple blur placeholder
    const canvas = document.createElement('canvas')
    canvas.width = 8
    canvas.height = 6
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#f3f4f6'
      ctx.fillRect(0, 0, 8, 6)
    }
    return canvas.toDataURL('image/jpeg', 0.1)
  }, [blurDataURL])

  // Reset state when src changes
  useEffect(() => {
    setImgSrc(getOptimizedUrl(src))
    setIsLoading(true)
    setHasError(false)
    setRetryCount(0)
  }, [src, getOptimizedUrl])

  const handleError = useCallback(() => {
    if (retryCount < 3) {
      // Retry with exponential backoff
      const delay = Math.pow(2, retryCount) * 1000
      setTimeout(() => {
        setRetryCount(prev => prev + 1)
        setImgSrc(getOptimizedUrl(src))
      }, delay)
    } else {
      // Use fallback after max retries
      setHasError(true)
      setImgSrc(fallbackUrl)
      setIsLoading(false)
      onError?.()
    }
  }, [retryCount, getOptimizedUrl, src, fallbackUrl, onError])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    setHasError(false)
    onLoad?.()
  }, [onLoad])

  // Set loading timeout
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        if (isLoading) {
          handleError()
        }
      }, loadingTimeout)

      return () => clearTimeout(timeout)
    }
  }, [isLoading, loadingTimeout])

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <Skeleton className='absolute inset-0' style={{ width, height }} />
      )}

      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality || (isMobile ? 75 : 90)}
        sizes={getResponsiveSizes()}
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? getBlurDataURL() : undefined}
        onError={handleError}
        onLoad={handleLoad}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${hasError ? 'grayscale' : ''}`}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
        }}
      />

      {hasError && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800'>
          <div className='text-center text-gray-500 dark:text-gray-400'>
            <svg
              className='w-8 h-8 mx-auto mb-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            <p className='text-sm'>Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  )
}
