/**
 * Testimonial video component
 * Displays video testimonials with enhanced controls
 */

'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Star,
  Quote,
} from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialVideoProps {
  testimonial: {
    id: string
    name: string
    role: string
    company: string
    content: string
    rating: number
    avatar?: string
    category?: string
    featured?: boolean
    videoUrl?: string
    videoThumbnail?: string
    duration?: number
  }
  className?: string
  autoPlay?: boolean
  showControls?: boolean
  showTranscript?: boolean
  onVideoEnd?: () => void
}

export const TestimonialVideo: React.FC<TestimonialVideoProps> = ({
  testimonial,
  className = '',
  autoPlay = false,
  showControls = true,
  showTranscript = true,
  onVideoEnd,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(testimonial.duration || 0)
  const [showTranscriptText, setShowTranscriptText] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  // Video event handlers
  const handlePlay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }, [])

  const handlePause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  const handleToggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }, [isMuted])

  const handleSeek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  const handleFullscreen = useCallback(() => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [isFullscreen])

  const handleRestart = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      setCurrentTime(0)
    }
  }, [])

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleDurationChange = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onVideoEnd?.()
    }

    const handleLoadedData = () => {
      setIsLoading(false)
    }

    const handlePlayEvent = () => setIsPlaying(true)
    const handlePauseEvent = () => setIsPlaying(false)

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('durationchange', handleDurationChange)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('play', handlePlayEvent)
    video.addEventListener('pause', handlePauseEvent)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('durationchange', handleDurationChange)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('play', handlePlayEvent)
      video.removeEventListener('pause', handlePauseEvent)
    }
  }, [onVideoEnd])

  // Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Render stars
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'h-4 w-4',
          i < testimonial.rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        )}
      />
    ))
  }

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <Card className='overflow-hidden'>
        <CardContent className='p-0'>
          {/* Video container */}
          <div className='relative aspect-video bg-black'>
            {/* Video element */}
            <video
              ref={videoRef}
              className='w-full h-full object-cover'
              poster={testimonial.videoThumbnail}
              muted={isMuted}
              playsInline
              preload='metadata'
            >
              {testimonial.videoUrl && (
                <source src={testimonial.videoUrl} type='video/mp4' />
              )}
            </video>

            {/* Loading overlay */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  className='absolute inset-0 bg-black/50 flex items-center justify-center'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white' />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Play button overlay */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  className='absolute inset-0 bg-black/30 flex items-center justify-center'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button
                    size='lg'
                    className='rounded-full h-16 w-16'
                    onClick={handlePlay}
                    aria-label='Play video'
                  >
                    <Play className='h-6 w-6' />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Video controls */}
            {showControls && (
              <motion.div
                className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {/* Progress bar */}
                <div className='mb-4'>
                  <div className='relative h-1 bg-white/20 rounded-full'>
                    <motion.div
                      className='absolute top-0 left-0 h-full bg-primary rounded-full'
                      style={{
                        width: `${(currentTime / duration) * 100}%`,
                      }}
                    />
                    <input
                      type='range'
                      min='0'
                      max={duration}
                      value={currentTime}
                      onChange={e => handleSeek(Number(e.target.value))}
                      className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    />
                  </div>
                </div>

                {/* Control buttons */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={isPlaying ? handlePause : handlePlay}
                      className='text-white hover:bg-white/20'
                    >
                      {isPlaying ? (
                        <Pause className='h-4 w-4' />
                      ) : (
                        <Play className='h-4 w-4' />
                      )}
                    </Button>

                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={handleToggleMute}
                      className='text-white hover:bg-white/20'
                    >
                      {isMuted ? (
                        <VolumeX className='h-4 w-4' />
                      ) : (
                        <Volume2 className='h-4 w-4' />
                      )}
                    </Button>

                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={handleRestart}
                      className='text-white hover:bg-white/20'
                    >
                      <RotateCcw className='h-4 w-4' />
                    </Button>

                    <span className='text-white text-sm'>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => setShowTranscriptText(!showTranscriptText)}
                      className='text-white hover:bg-white/20'
                    >
                      <Quote className='h-4 w-4' />
                    </Button>

                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={handleFullscreen}
                      className='text-white hover:bg-white/20'
                    >
                      {isFullscreen ? (
                        <Minimize className='h-4 w-4' />
                      ) : (
                        <Maximize className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Video info */}
          <div className='p-6'>
            {/* Rating */}
            <motion.div
              className='flex items-center gap-1 mb-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {renderStars()}
            </motion.div>

            {/* Content */}
            <motion.div
              className='mb-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className='text-muted-foreground leading-relaxed'>
                "{testimonial.content}"
              </p>
            </motion.div>

            {/* Author */}
            <motion.div
              className='flex items-center gap-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Avatar className='h-12 w-12'>
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback className='bg-primary/10 text-primary font-semibold'>
                  {testimonial.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              <div className='flex-1'>
                <h4 className='font-semibold text-foreground'>
                  {testimonial.name}
                </h4>
                <p className='text-sm text-muted-foreground'>
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </motion.div>

            {/* Category badge */}
            {testimonial.category && (
              <motion.div
                className='mt-4'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Badge variant='secondary' className='text-xs'>
                  {testimonial.category}
                </Badge>
              </motion.div>
            )}

            {/* Featured indicator */}
            {testimonial.featured && (
              <motion.div
                className='absolute top-4 right-4'
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Badge className='bg-yellow-500 text-yellow-900'>
                  Featured
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Transcript */}
          {showTranscript && showTranscriptText && (
            <motion.div
              className='border-t p-6 bg-muted/50'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className='font-semibold mb-3'>Transcript</h4>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                {testimonial.content}
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TestimonialVideo
