'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { buildR2Url, getFallbackUrl } from '@/lib/r2-media'
import { getLoadingTimeout } from '@/lib/media-config'
import { Skeleton } from '@/components/ui/skeleton'

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
}: R2ImageProps) {
  const [imgSrc, setImgSrc] = useState(buildR2Url(src))
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const fallbackUrl = fallback || getFallbackUrl(category)
  const loadingTimeout = getLoadingTimeout('image')

  // Reset state when src changes
  useEffect(() => {
    setImgSrc(buildR2Url(src))
    setIsLoading(true)
    setHasError(false)
    setRetryCount(0)
  }, [src])

  const handleError = () => {
    if (retryCount < 3) {
      // Retry with exponential backoff
      const delay = Math.pow(2, retryCount) * 1000
      setTimeout(() => {
        setRetryCount(prev => prev + 1)
        setImgSrc(buildR2Url(src))
      }, delay)
    } else {
      // Use fallback after max retries
      setHasError(true)
      setImgSrc(fallbackUrl)
      setIsLoading(false)
      onError?.()
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    onLoad?.()
  }

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
