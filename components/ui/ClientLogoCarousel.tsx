'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ExternalLink,
} from 'lucide-react'

interface ClientLogoCarouselProps extends HTMLMotionProps<'div'> {
  clients: Array<{
    id: string
    name: string
    logo: string
    alt: string
    website?: string
    description?: string
    industry?: string
    featured?: boolean
  }>
  autoplay?: boolean
  autoplayDelay?: number
  showControls?: boolean
  showIndicators?: boolean
  itemsPerView?: number
  onClientClick?: (clientId: string) => void
  className?: string
}

const ClientLogoCarousel: React.FC<ClientLogoCarouselProps> = ({
  clients,
  autoplay = true,
  autoplayDelay = 4000,
  showControls = true,
  showIndicators = true,
  itemsPerView = 4,
  onClientClick,
  className,
  ...rest
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'client-carousel',
      name: 'Client Carousel',
      type: 'interaction',
      duration: 500,
      easing: 'easeOut',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-carousel',
        staticFallback: true,
      },
      performance: {
        maxDuration: 500,
        targetFPS: 60,
        memoryLimit: 12,
        gpuAcceleration: true,
      },
    },
    'client-carousel'
  )

  const maxIndex = Math.max(0, clients.length - itemsPerView)

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isHovered && !prefersReducedMotion) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % (maxIndex + 1))
      }, autoplayDelay)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, isHovered, autoplayDelay, maxIndex, prefersReducedMotion])

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % (maxIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + maxIndex + 1) % (maxIndex + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleClientClick = (clientId: string) => {
    if (onClientClick) {
      onClientClick(clientId)
    }
  }

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`space-y-4 ${className}`} {...(rest as any)}>
        {/* Client logos */}
        <div className='relative overflow-hidden'>
          <div
            className='flex transition-transform duration-300 ease-in-out'
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {clients.map(client => (
              <div
                key={client.id}
                className='flex-shrink-0 px-4'
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className='bg-white rounded-lg shadow-sm border p-6 h-32 flex items-center justify-center hover:shadow-md transition-shadow duration-200'>
                  <img
                    src={client.logo}
                    alt={client.alt}
                    className='max-h-16 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-200'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        {showControls && (
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              <Button onClick={prevSlide} variant='outline' size='sm'>
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button onClick={nextSlide} variant='outline' size='sm'>
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>

            <div className='flex items-center gap-2'>
              <Button onClick={togglePlayPause} variant='outline' size='sm'>
                {isPlaying ? (
                  <Pause className='h-4 w-4' />
                ) : (
                  <Play className='h-4 w-4' />
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Indicators */}
        {showIndicators && (
          <div className='flex justify-center gap-2'>
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        staggerChildren: 0.1,
        ease: optimizedConfig.easing,
      },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.2,
        ease: 'easeOut' as const,
      },
    },
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const slideTransition = {
    x: { type: 'spring' as const, stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  }

  const controlVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.9,
      transition: { duration: 0.1 },
    },
  }

  const indicatorVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    hover: {
      scale: 1.2,
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={`space-y-4 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...(rest as any)}
    >
      {/* Client logos */}
      <div className='relative overflow-hidden'>
        <motion.div
          key={currentIndex}
          custom={1}
          variants={slideVariants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={slideTransition}
          className='flex'
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              variants={logoVariants}
              whileHover='hover'
              className='flex-shrink-0 px-4'
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <motion.div
                className='bg-white rounded-lg shadow-sm border p-6 h-32 flex items-center justify-center cursor-pointer group relative overflow-hidden'
                onClick={() => handleClientClick(client.id)}
                whileHover={{
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  borderColor: '#3B82F6',
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Hover overlay */}
                <motion.div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200' />

                {/* Logo */}
                <motion.img
                  src={client.logo}
                  alt={client.alt}
                  className='relative z-10 max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300'
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Featured badge */}
                {client.featured && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className='absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full'
                  />
                )}

                {/* Hover info */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className='absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2 text-xs text-center opacity-0 group-hover:opacity-100'
                >
                  {client.name}
                  {client.industry && (
                    <div className='text-gray-300 text-xs'>
                      {client.industry}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      {showControls && (
        <motion.div
          variants={containerVariants}
          className='flex items-center justify-between'
        >
          <div className='flex gap-2'>
            <motion.div
              variants={controlVariants}
              whileHover='hover'
              whileTap='tap'
            >
              <Button onClick={prevSlide} variant='outline' size='sm'>
                <ChevronLeft className='h-4 w-4' />
              </Button>
            </motion.div>
            <motion.div
              variants={controlVariants}
              whileHover='hover'
              whileTap='tap'
            >
              <Button onClick={nextSlide} variant='outline' size='sm'>
                <ChevronRight className='h-4 w-4' />
              </Button>
            </motion.div>
          </div>

          <div className='flex items-center gap-2'>
            <motion.div
              variants={controlVariants}
              whileHover='hover'
              whileTap='tap'
            >
              <Button onClick={togglePlayPause} variant='outline' size='sm'>
                {isPlaying ? (
                  <Pause className='h-4 w-4' />
                ) : (
                  <Play className='h-4 w-4' />
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Indicators */}
      {showIndicators && (
        <motion.div
          variants={containerVariants}
          className='flex justify-center gap-2'
        >
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <motion.button
              key={index}
              variants={indicatorVariants}
              whileHover='hover'
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-blue-500 shadow-lg'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </motion.div>
      )}

      {/* Client count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className='text-center text-sm text-gray-500'
      >
        Trusted by {clients.length} clients worldwide
      </motion.div>
    </motion.div>
  )
}

export default ClientLogoCarousel
