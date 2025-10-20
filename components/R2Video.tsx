'use client'

import { useState, useRef } from 'react'
import { Code2, Cloud, Play } from 'lucide-react'

interface R2VideoProps {
  src: string
  poster: string
}

export default function R2Video({ src, poster }: R2VideoProps) {
  const [videoError, setVideoError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = async () => {
    setIsPlaying(true)
    if (videoRef.current) {
      try {
        await videoRef.current.play()
      } catch (error) {
        console.error('Error playing video:', error)
      }
    }
  }

  return (
    <div className='relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl overflow-hidden aspect-video group'>
      {!videoError && (
        <>
          <video
            ref={videoRef}
            src={src}
            className='w-full h-full object-cover'
            controls={isPlaying}
            poster={poster}
            onError={() => {
              console.warn('R2 video failed to load:', src)
              setVideoError(true)
            }}
            onPlay={() => setIsPlaying(true)}
          >
            Your browser does not support the video tag.
          </video>
          {/* Play button overlay - only show when not playing */}
          {!isPlaying && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors'>
              <button
                onClick={handlePlay}
                className='w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-lg'
              >
                <Play
                  className='h-8 w-8 text-blue-600 ml-1'
                  fill='currentColor'
                />
              </button>
            </div>
          )}
        </>
      )}
      {/* Fallback content when video fails */}
      {videoError && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <div className='w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform cursor-pointer'>
              <Cloud className='h-8 w-8 text-white' />
            </div>
            <p className='text-blue-700 font-medium'>Video Not Available</p>
            <p className='text-sm text-blue-600'>R2 video failed to load</p>
          </div>
        </div>
      )}
      {/* Floating elements for visual appeal */}
      <div className='absolute top-4 right-4 w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center'>
        <Code2 className='h-6 w-6 text-blue-600' />
      </div>
      <div className='absolute bottom-4 left-4 w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center'>
        <Cloud className='h-6 w-6 text-green-600' />
      </div>
    </div>
  )
}
