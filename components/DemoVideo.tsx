'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
// Removed unused imports - now using API route

interface DemoVideoProps {
  className?: string
}

/**
 * Demo video component that fetches and displays video from R2 bucket
 */
export function DemoVideo({ className = '' }: DemoVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Fetch video URL from server-side API
    const fetchVideoUrl = async () => {
      try {
        const response = await fetch('/api/video-url')
        const data = await response.json()

        if (data.videoUrl) {
          setVideoUrl(data.videoUrl)
          setIsLoading(false)
          console.log('✅ Video URL loaded:', data.videoUrl)
        } else {
          console.error('❌ Failed to get video URL:', data.error)
          setHasError(true)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('❌ Error fetching video URL:', error)
        setHasError(true)
        setIsLoading(false)
      }
    }

    fetchVideoUrl()
  }, [])

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current) return

    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    if (!videoRef.current) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      videoRef.current.requestFullscreen()
    }
  }

  const handleVideoLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleVideoError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  // Show loading state
  if (isLoading && !hasError) {
    return (
      <div
        className={`relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl overflow-hidden aspect-video ${className}`}
      >
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <Loader2 className='h-8 w-8 text-blue-600 animate-spin mx-auto mb-4' />
            <p className='text-blue-700 font-medium'>Loading Demo Video</p>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (hasError || !videoUrl) {
    return (
      <div
        className={`relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl overflow-hidden aspect-video ${className}`}
      >
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <div className='w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform cursor-pointer'>
              <Play className='h-8 w-8 text-white ml-1' fill='currentColor' />
            </div>
            <p className='text-blue-700 font-medium'>Watch Demo Video</p>
            <p className='text-sm text-blue-600'>3 min overview</p>
            <p className='text-xs text-red-600 mt-2'>
              Video unavailable - R2 not configured
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative bg-black rounded-2xl overflow-hidden aspect-video group ${className}`}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className='w-full h-full object-cover'
        muted={isMuted}
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        poster={
          process.env.NEXT_PUBLIC_R2_BASE_URL
            ? `${process.env.NEXT_PUBLIC_R2_BASE_URL}/home-page/b11-v1.jpg`
            : undefined
        }
      />

      {/* Video Controls Overlay */}
      <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <Button
            size='lg'
            variant='secondary'
            className='w-16 h-16 rounded-full bg-white/90 hover:bg-white transition-all duration-200 hover:scale-110'
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className='h-6 w-6 text-gray-800' />
            ) : (
              <Play
                className='h-6 w-6 text-gray-800 ml-1'
                fill='currentColor'
              />
            )}
          </Button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className='absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <div className='flex items-center justify-between bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2'>
          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              variant='ghost'
              className='text-white hover:bg-white/20'
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className='h-4 w-4' />
              ) : (
                <Volume2 className='h-4 w-4' />
              )}
            </Button>
          </div>

          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              variant='ghost'
              className='text-white hover:bg-white/20'
              onClick={toggleFullscreen}
            >
              <Maximize className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>

      {/* Video Title Overlay */}
      <div className='absolute top-4 left-4'>
        <div className='bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2'>
          <p className='text-white text-sm font-medium'>Demo Video</p>
          <p className='text-white/80 text-xs'>3 min overview</p>
        </div>
      </div>
    </div>
  )
}
