/**
 * Testimonial widget component
 * Provides embeddable testimonial widgets
 */

'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Code,
  Copy,
  ExternalLink,
  Settings,
  Eye,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialWidgetProps {
  testimonials: Array<{
    id: string
    name: string
    role: string
    company: string
    content: string
    rating: number
    avatar?: string
    category?: string
    featured?: boolean
    date?: string
  }>
  className?: string
  showPreview?: boolean
  showCode?: boolean
  showSettings?: boolean
  onWidgetAction?: (action: string, data: any) => void
}

export const TestimonialWidget: React.FC<TestimonialWidgetProps> = ({
  testimonials,
  className = '',
  showPreview = true,
  showCode = true,
  showSettings = true,
  onWidgetAction,
}) => {
  const [widgetSettings, setWidgetSettings] = useState({
    type: 'carousel' as 'carousel' | 'grid' | 'single' | 'slider',
    theme: 'light' as 'light' | 'dark' | 'auto',
    size: 'medium' as 'small' | 'medium' | 'large',
    showRating: true,
    showAvatar: true,
    showCompany: true,
    autoPlay: true,
    autoPlayInterval: 5000,
    maxItems: 5,
    featuredOnly: false,
  })

  const [widgetCode, setWidgetCode] = useState('')
  const [isPlaying, setIsPlaying] = useState(widgetSettings.autoPlay)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  const widgetRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  // Generate widget code
  useEffect(() => {
    const code = `<!-- Testimonial Widget -->
<div id="testimonial-widget"
     data-type="${widgetSettings.type}"
     data-theme="${widgetSettings.theme}"
     data-size="${widgetSettings.size}"
     data-rating="${widgetSettings.showRating}"
     data-avatar="${widgetSettings.showAvatar}"
     data-company="${widgetSettings.showCompany}"
     data-autoplay="${widgetSettings.autoPlay}"
     data-interval="${widgetSettings.autoPlayInterval}"
     data-max="${widgetSettings.maxItems}"
     data-featured="${widgetSettings.featuredOnly}">
</div>

<script src="https://your-domain.com/widget.js"></script>`

    setWidgetCode(code)
  }, [widgetSettings])

  // Handle settings update
  const handleSettingsUpdate = useCallback(
    (key: string, value: any) => {
      setWidgetSettings(prev => ({
        ...prev,
        [key]: value,
      }))

      onWidgetAction?.('settings_updated', { key, value })
    },
    [onWidgetAction]
  )

  // Handle copy code
  const handleCopyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(widgetCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }, [widgetCode])

  // Handle navigation
  const handlePrevious = useCallback(() => {
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    )
  }, [testimonials.length])

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  // Handle play/pause
  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying || !widgetSettings.autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, widgetSettings.autoPlayInterval)

    return () => clearInterval(interval)
  }, [
    isPlaying,
    widgetSettings.autoPlay,
    widgetSettings.autoPlayInterval,
    testimonials.length,
  ])

  // Filter testimonials
  const filteredTestimonials = testimonials
    .filter(t => !widgetSettings.featuredOnly || t.featured)
    .slice(0, widgetSettings.maxItems)

  // Render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'h-4 w-4',
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        )}
      />
    ))
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className={cn('w-full', className)}>
      <motion.div
        className='space-y-6'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Widget settings */}
        {showSettings && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Settings className='h-5 w-5' />
                  Widget Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <div>
                      <label className='text-sm font-medium'>Widget Type</label>
                      <select
                        value={widgetSettings.type}
                        onChange={e =>
                          handleSettingsUpdate('type', e.target.value)
                        }
                        className='w-full mt-2 p-2 border border-input rounded-md bg-background'
                      >
                        <option value='carousel'>Carousel</option>
                        <option value='grid'>Grid</option>
                        <option value='single'>Single</option>
                        <option value='slider'>Slider</option>
                      </select>
                    </div>
                    <div>
                      <label className='text-sm font-medium'>Theme</label>
                      <select
                        value={widgetSettings.theme}
                        onChange={e =>
                          handleSettingsUpdate('theme', e.target.value)
                        }
                        className='w-full mt-2 p-2 border border-input rounded-md bg-background'
                      >
                        <option value='light'>Light</option>
                        <option value='dark'>Dark</option>
                        <option value='auto'>Auto</option>
                      </select>
                    </div>
                    <div>
                      <label className='text-sm font-medium'>Size</label>
                      <select
                        value={widgetSettings.size}
                        onChange={e =>
                          handleSettingsUpdate('size', e.target.value)
                        }
                        className='w-full mt-2 p-2 border border-input rounded-md bg-background'
                      >
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='large'>Large</option>
                      </select>
                    </div>
                  </div>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium'>Show Rating</h4>
                        <p className='text-sm text-muted-foreground'>
                          Display star ratings
                        </p>
                      </div>
                      <Button
                        variant={
                          widgetSettings.showRating ? 'default' : 'outline'
                        }
                        size='sm'
                        onClick={() =>
                          handleSettingsUpdate(
                            'showRating',
                            !widgetSettings.showRating
                          )
                        }
                      >
                        {widgetSettings.showRating ? 'On' : 'Off'}
                      </Button>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium'>Show Avatar</h4>
                        <p className='text-sm text-muted-foreground'>
                          Display user avatars
                        </p>
                      </div>
                      <Button
                        variant={
                          widgetSettings.showAvatar ? 'default' : 'outline'
                        }
                        size='sm'
                        onClick={() =>
                          handleSettingsUpdate(
                            'showAvatar',
                            !widgetSettings.showAvatar
                          )
                        }
                      >
                        {widgetSettings.showAvatar ? 'On' : 'Off'}
                      </Button>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium'>Show Company</h4>
                        <p className='text-sm text-muted-foreground'>
                          Display company names
                        </p>
                      </div>
                      <Button
                        variant={
                          widgetSettings.showCompany ? 'default' : 'outline'
                        }
                        size='sm'
                        onClick={() =>
                          handleSettingsUpdate(
                            'showCompany',
                            !widgetSettings.showCompany
                          )
                        }
                      >
                        {widgetSettings.showCompany ? 'On' : 'Off'}
                      </Button>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='font-medium'>Auto Play</h4>
                        <p className='text-sm text-muted-foreground'>
                          Automatically cycle through testimonials
                        </p>
                      </div>
                      <Button
                        variant={
                          widgetSettings.autoPlay ? 'default' : 'outline'
                        }
                        size='sm'
                        onClick={() =>
                          handleSettingsUpdate(
                            'autoPlay',
                            !widgetSettings.autoPlay
                          )
                        }
                      >
                        {widgetSettings.autoPlay ? 'On' : 'Off'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Widget preview */}
        {showPreview && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Eye className='h-5 w-5' />
                  Widget Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {/* Preview controls */}
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={handlePrevious}
                        disabled={filteredTestimonials.length <= 1}
                      >
                        <ChevronLeft className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={handleNext}
                        disabled={filteredTestimonials.length <= 1}
                      >
                        <ChevronRight className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={handlePlayPause}
                        disabled={filteredTestimonials.length <= 1}
                      >
                        {isPlaying ? (
                          <Pause className='h-4 w-4' />
                        ) : (
                          <Play className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Badge variant='outline'>
                        {currentIndex + 1} of {filteredTestimonials.length}
                      </Badge>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => setShowPreviewModal(true)}
                      >
                        <ExternalLink className='h-4 w-4 mr-2' />
                        Full Preview
                      </Button>
                    </div>
                  </div>

                  {/* Widget preview */}
                  <div
                    ref={widgetRef}
                    className={cn(
                      'border rounded-lg p-6 bg-background',
                      widgetSettings.theme === 'dark' &&
                        'bg-gray-900 text-white',
                      widgetSettings.size === 'small' && 'max-w-sm',
                      widgetSettings.size === 'medium' && 'max-w-md',
                      widgetSettings.size === 'large' && 'max-w-lg'
                    )}
                  >
                    {filteredTestimonials.length > 0 && (
                      <div className='text-center'>
                        {/* Avatar */}
                        {widgetSettings.showAvatar && (
                          <div className='w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center'>
                            <span className='text-2xl font-bold text-primary'>
                              {filteredTestimonials[currentIndex].name.charAt(
                                0
                              )}
                            </span>
                          </div>
                        )}

                        {/* Rating */}
                        {widgetSettings.showRating && (
                          <div className='flex items-center justify-center gap-1 mb-4'>
                            {renderStars(
                              filteredTestimonials[currentIndex].rating
                            )}
                          </div>
                        )}

                        {/* Content */}
                        <p className='text-muted-foreground mb-4 italic'>
                          "{filteredTestimonials[currentIndex].content}"
                        </p>

                        {/* Author */}
                        <div>
                          <h4 className='font-semibold'>
                            {filteredTestimonials[currentIndex].name}
                          </h4>
                          {widgetSettings.showCompany && (
                            <p className='text-sm text-muted-foreground'>
                              {filteredTestimonials[currentIndex].role} at{' '}
                              {filteredTestimonials[currentIndex].company}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Widget code */}
        {showCode && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Code className='h-5 w-5' />
                  Embed Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm text-muted-foreground'>
                      Copy this code to embed the widget on your website
                    </p>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={handleCopyCode}
                      className='flex items-center gap-2'
                    >
                      {copied ? (
                        <CheckCircle className='h-4 w-4' />
                      ) : (
                        <Copy className='h-4 w-4' />
                      )}
                      {copied ? 'Copied!' : 'Copy Code'}
                    </Button>
                  </div>
                  <div className='bg-muted p-4 rounded-lg'>
                    <pre className='text-sm overflow-x-auto'>
                      <code>{widgetCode}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Full preview modal */}
        <AnimatePresence>
          {showPreviewModal && (
            <motion.div
              className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreviewModal(false)}
            >
              <motion.div
                className='bg-background rounded-lg p-6 max-w-2xl w-full mx-4'
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold'>Full Widget Preview</h3>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => setShowPreviewModal(false)}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>
                <div className='border rounded-lg p-6 bg-background'>
                  {/* Full widget preview content */}
                  <div className='text-center'>
                    {filteredTestimonials.length > 0 && (
                      <>
                        {widgetSettings.showAvatar && (
                          <div className='w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center'>
                            <span className='text-3xl font-bold text-primary'>
                              {filteredTestimonials[currentIndex].name.charAt(
                                0
                              )}
                            </span>
                          </div>
                        )}
                        {widgetSettings.showRating && (
                          <div className='flex items-center justify-center gap-1 mb-4'>
                            {renderStars(
                              filteredTestimonials[currentIndex].rating
                            )}
                          </div>
                        )}
                        <p className='text-lg text-muted-foreground mb-6 italic'>
                          "{filteredTestimonials[currentIndex].content}"
                        </p>
                        <div>
                          <h4 className='text-xl font-semibold'>
                            {filteredTestimonials[currentIndex].name}
                          </h4>
                          {widgetSettings.showCompany && (
                            <p className='text-muted-foreground'>
                              {filteredTestimonials[currentIndex].role} at{' '}
                              {filteredTestimonials[currentIndex].company}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default TestimonialWidget
