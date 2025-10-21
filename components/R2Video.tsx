'use client'

import { useState, useEffect, useRef } from 'react'
import { buildR2Url, getFallbackUrl } from '@/lib/r2-media'
import { getLoadingTimeout } from '@/lib/media-config'
import { Skeleton } from '@/components/ui/skeleton'

interface R2VideoProps {
  src: string
  poster?: string
  alt: string
  width?: number
  height?: number
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  fallback?: string
  className?: string
  category?: 'team' | 'company' | 'general'
  onLoad?: () => void
  onError?: () => void
}

export default function R2Video({
  src,
  poster,
  alt,
  width = 400,
  height = 300,
  autoplay = false,
  muted = true,
  loop = false,
  controls = true,
  fallback,
  className = '',
  category = 'general',
  onLoad,
  onError,
}: R2VideoProps) {
  const [videoSrc, setVideoSrc] = useState(buildR2Url(src))
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const fallbackUrl = fallback || getFallbackUrl(category)
  const loadingTimeout = getLoadingTimeout('video')

  // Reset state when src changes
  useEffect(() => {
    setVideoSrc(buildR2Url(src))
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
        setVideoSrc(buildR2Url(src))
      }, delay)
    } else {
      // Use fallback after max retries
      setHasError(true)
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

  // Handle video events
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => handleLoad()
    const handleVideoError = () => handleError()

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleVideoError)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleVideoError)
    }
  }, [videoSrc, handleLoad, handleError])

  if (hasError) {
    return (
      <div
        className={`relative flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}
        style={{ width, height }}
      >
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
              d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
            />
          </svg>
          <p className='text-sm'>Video unavailable</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <Skeleton className='absolute inset-0' style={{ width, height }} />
      )}

      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        width={width}
        height={height}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        controls={controls}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
        }}
        aria-label={alt}
      />
    </div>
  )
}
