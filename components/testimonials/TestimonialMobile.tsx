/**
 * Testimonial mobile component
 * Provides mobile-optimized testimonial display and management
 */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Star,
  User,
  Calendar,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Share,
  Bookmark,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Filter,
  Search,
  Grid,
  List,
  Heart,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Zap,
  Shield,
  Database,
  BarChart3,
  Users,
  Bell,
  Mail,
  Webhook,
  Lock,
  Unlock,
  ExternalLink,
  Copy,
  Code,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Folder,
  Tag,
  Hash,
  AtSign,
  Phone,
  MapPin,
  Globe,
  Link,
  Send,
  Reply,
  Forward,
  Save,
  Loader2,
} from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialMobileProps {
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
    status?: 'pending' | 'approved' | 'rejected' | 'flagged'
    videoUrl?: string
    audioUrl?: string
    images?: string[]
    tags?: string[]
    likes?: number
    shares?: number
    views?: number
    comments?: number
    location?: string
    website?: string
    email?: string
    phone?: string
    social?: {
      twitter?: string
      linkedin?: string
      facebook?: string
      instagram?: string
    }
  }>
  className?: string
  showHeader?: boolean
  showFilters?: boolean
  showActions?: boolean
  showMedia?: boolean
  showSocial?: boolean
  onMobileAction?: (action: string, data: any) => void
}

export const TestimonialMobile: React.FC<TestimonialMobileProps> = ({
  testimonials,
  className = '',
  showHeader = true,
  showFilters = true,
  showActions = true,
  showMedia = true,
  showSocial = true,
  onMobileAction,
}) => {
  const [mobileSettings, setMobileSettings] = useState({
    viewMode: 'list' as 'list' | 'grid' | 'card',
    sortBy: 'date' as 'date' | 'rating' | 'name' | 'company' | 'category',
    sortOrder: 'desc' as 'asc' | 'desc',
    showRatings: true,
    showAvatars: true,
    showCompanies: true,
    showDates: true,
    showCategories: true,
    showTags: true,
    showSocial: true,
    showMedia: true,
    showLocation: true,
    showContact: true,
    autoPlay: true,
    autoPlayInterval: 5000,
    enableGestures: true,
    enableKeyboard: true,
    enableDragDrop: true,
    enableMultiSelect: true,
    enableBulkActions: true,
    enableExport: true,
    enableImport: true,
    enableSync: true,
    enableBackup: true,
    enableAnalytics: true,
    enableNotifications: true,
    enableWebhooks: true,
    enableAPI: true,
    enableSecurity: true,
    enableModeration: true,
    enableAdmin: true,
  })

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    rating: 'all',
    status: 'all',
    featured: 'all',
    dateRange: 'all',
    media: 'all',
    tags: [] as string[],
    location: 'all',
    company: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  })

  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials)
  const [selectedTestimonials, setSelectedTestimonials] = useState<string[]>([])
  const [selectedTestimonial, setSelectedTestimonial] = useState<string | null>(
    null
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(mobileSettings.autoPlay)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [showSync, setShowSync] = useState(false)
  const [showBackup, setShowBackup] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showWebhooks, setShowWebhooks] = useState(false)
  const [showAPI, setShowAPI] = useState(false)
  const [showSecurity, setShowSecurity] = useState(false)
  const [showModeration, setShowModeration] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)

  const { preferences } = useAccessibility()

  // Filter testimonials
  useEffect(() => {
    let filtered = [...testimonials]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        t =>
          t.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          t.company.toLowerCase().includes(filters.search.toLowerCase()) ||
          t.content.toLowerCase().includes(filters.search.toLowerCase()) ||
          (t.tags &&
            t.tags.some(tag =>
              tag.toLowerCase().includes(filters.search.toLowerCase())
            )) ||
          (t.location &&
            t.location.toLowerCase().includes(filters.search.toLowerCase())) ||
          (t.email &&
            t.email.toLowerCase().includes(filters.search.toLowerCase())) ||
          (t.phone &&
            t.phone.toLowerCase().includes(filters.search.toLowerCase()))
      )
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(t => t.category === filters.category)
    }

    // Rating filter
    if (filters.rating !== 'all') {
      filtered = filtered.filter(t => t.rating === parseInt(filters.rating))
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(t => t.status === filters.status)
    }

    // Featured filter
    if (filters.featured !== 'all') {
      filtered = filtered.filter(t =>
        filters.featured === 'yes' ? t.featured : !t.featured
      )
    }

    // Media filter
    if (filters.media !== 'all') {
      filtered = filtered.filter(t => {
        if (filters.media === 'video') return t.videoUrl
        if (filters.media === 'audio') return t.audioUrl
        if (filters.media === 'image') return t.images && t.images.length > 0
        return true
      })
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(
        t => t.tags && t.tags.some(tag => filters.tags.includes(tag))
      )
    }

    // Location filter
    if (filters.location !== 'all') {
      filtered = filtered.filter(
        t =>
          t.location &&
          t.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Company filter
    if (filters.company !== 'all') {
      filtered = filtered.filter(t =>
        t.company.toLowerCase().includes(filters.company.toLowerCase())
      )
    }

    // Sort testimonials
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (filters.sortBy) {
        case 'date':
          aValue = a.date || a.id
          bValue = b.date || b.id
          break
        case 'rating':
          aValue = a.rating
          bValue = b.rating
          break
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'company':
          aValue = a.company
          bValue = b.company
          break
        case 'category':
          aValue = a.category || ''
          bValue = b.category || ''
          break
        default:
          return 0
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredTestimonials(filtered)
  }, [testimonials, filters])

  // Handle testimonial action
  const handleTestimonialAction = useCallback(
    async (testimonialId: string, action: string, data?: any) => {
      setIsLoading(true)

      try {
        await new Promise(resolve => setTimeout(resolve, 500))

        onMobileAction?.(action, { testimonialId, ...data })
      } catch (error) {
        console.error('Testimonial action failed:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [onMobileAction]
  )

  // Handle bulk action
  const handleBulkAction = useCallback(
    async (action: string, data?: any) => {
      setIsLoading(true)

      try {
        await new Promise(resolve => setTimeout(resolve, 1000))

        onMobileAction?.(action, {
          testimonialIds: selectedTestimonials,
          ...data,
        })
        setSelectedTestimonials([])
      } catch (error) {
        console.error('Bulk action failed:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [selectedTestimonials, onMobileAction]
  )

  // Handle settings update
  const handleSettingsUpdate = useCallback((key: string, value: any) => {
    setMobileSettings(prev => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  // Handle filter change
  const handleFilterChange = useCallback((key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  // Handle testimonial selection
  const handleTestimonialSelect = useCallback((testimonialId: string) => {
    setSelectedTestimonials(prev =>
      prev.includes(testimonialId)
        ? prev.filter(id => id !== testimonialId)
        : [...prev, testimonialId]
    )
  }, [])

  // Handle navigation
  const handlePrevious = useCallback(() => {
    setCurrentIndex(
      prev =>
        (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length
    )
  }, [filteredTestimonials.length])

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % filteredTestimonials.length)
  }, [filteredTestimonials.length])

  // Handle play/pause
  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying || !mobileSettings.autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filteredTestimonials.length)
    }, mobileSettings.autoPlayInterval)
  }, [
    isPlaying,
    mobileSettings.autoPlay,
    mobileSettings.autoPlayInterval,
    filteredTestimonials.length,
  ])

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className='h-4 w-4 text-green-500' />
      case 'rejected':
        return <XCircle className='h-4 w-4 text-red-500' />
      case 'flagged':
        return <Flag className='h-4 w-4 text-yellow-500' />
      case 'pending':
        return <Clock className='h-4 w-4 text-yellow-500' />
      default:
        return <AlertTriangle className='h-4 w-4 text-gray-500' />
    }
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/10 text-green-700 border-green-500/20'
      case 'rejected':
        return 'bg-red-500/10 text-red-700 border-red-500/20'
      case 'flagged':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20'
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20'
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20'
    }
  }

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
    <div className={cn('w-full h-screen flex flex-col', className)}>
      <motion.div
        className='flex-1 flex flex-col'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Mobile header */}
        {showHeader && (
          <motion.div variants={itemVariants}>
            <div className='flex items-center justify-between p-4 bg-background border-b'>
              <div className='flex items-center gap-3'>
                <h1 className='text-xl font-bold'>Testimonials</h1>
                <Badge variant='outline' className='text-xs'>
                  {filteredTestimonials.length}
                </Badge>
              </div>

              <div className='flex items-center gap-2'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className='h-4 w-4' />
                </Button>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className='h-4 w-4' />
                </Button>
                <Button size='sm'>
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Mobile filters */}
        {showFilters && (
          <motion.div variants={itemVariants}>
            <div className='p-4 bg-muted/50 border-b'>
              <div className='space-y-3'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                  <input
                    type='text'
                    placeholder='Search testimonials...'
                    value={filters.search}
                    onChange={e => handleFilterChange('search', e.target.value)}
                    className='w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm'
                  />
                </div>

                <div className='grid grid-cols-2 gap-2'>
                  <select
                    value={filters.category}
                    onChange={e =>
                      handleFilterChange('category', e.target.value)
                    }
                    className='p-2 border border-input rounded-md bg-background text-sm'
                  >
                    <option value='all'>All Categories</option>
                    <option value='customer'>Customer</option>
                    <option value='client'>Client</option>
                    <option value='partner'>Partner</option>
                  </select>

                  <select
                    value={filters.rating}
                    onChange={e => handleFilterChange('rating', e.target.value)}
                    className='p-2 border border-input rounded-md bg-background text-sm'
                  >
                    <option value='all'>All Ratings</option>
                    <option value='5'>5 Stars</option>
                    <option value='4'>4 Stars</option>
                    <option value='3'>3 Stars</option>
                    <option value='2'>2 Stars</option>
                    <option value='1'>1 Star</option>
                  </select>
                </div>

                <div className='grid grid-cols-2 gap-2'>
                  <select
                    value={filters.status}
                    onChange={e => handleFilterChange('status', e.target.value)}
                    className='p-2 border border-input rounded-md bg-background text-sm'
                  >
                    <option value='all'>All Status</option>
                    <option value='pending'>Pending</option>
                    <option value='approved'>Approved</option>
                    <option value='rejected'>Rejected</option>
                    <option value='flagged'>Flagged</option>
                  </select>

                  <select
                    value={filters.sortBy}
                    onChange={e => handleFilterChange('sortBy', e.target.value)}
                    className='p-2 border border-input rounded-md bg-background text-sm'
                  >
                    <option value='date'>Date</option>
                    <option value='rating'>Rating</option>
                    <option value='name'>Name</option>
                    <option value='company'>Company</option>
                    <option value='category'>Category</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Mobile content */}
        <div className='flex-1 overflow-auto'>
          <motion.div variants={itemVariants}>
            <div className='p-4'>
              {mobileSettings.viewMode === 'grid' ? (
                <div className='grid grid-cols-2 gap-4'>
                  {filteredTestimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      className='border rounded-lg p-4 bg-background hover:shadow-lg transition-shadow'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Testimonial header */}
                      <div className='flex items-center justify-between mb-3'>
                        <div className='flex items-center gap-2'>
                          {mobileSettings.showAvatars && (
                            <div className='w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center'>
                              <span className='text-sm font-bold text-primary'>
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div>
                            <h4 className='font-medium text-sm'>
                              {testimonial.name}
                            </h4>
                            {mobileSettings.showCompanies && (
                              <p className='text-xs text-muted-foreground'>
                                {testimonial.role} at {testimonial.company}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className='flex items-center gap-1'>
                          {getStatusIcon(testimonial.status || 'pending')}
                          <input
                            type='checkbox'
                            checked={selectedTestimonials.includes(
                              testimonial.id
                            )}
                            onChange={() =>
                              handleTestimonialSelect(testimonial.id)
                            }
                            className='h-3 w-3'
                          />
                        </div>
                      </div>

                      {/* Rating */}
                      {mobileSettings.showRatings && (
                        <div className='flex items-center gap-1 mb-3'>
                          {renderStars(testimonial.rating)}
                          <span className='text-xs text-muted-foreground ml-1'>
                            {testimonial.rating}/5
                          </span>
                        </div>
                      )}

                      {/* Content */}
                      <p className='text-xs text-muted-foreground mb-3 leading-relaxed'>
                        "{testimonial.content.substring(0, 100)}..."
                      </p>

                      {/* Media */}
                      {showMedia &&
                        (testimonial.videoUrl ||
                          testimonial.audioUrl ||
                          testimonial.images) && (
                          <div className='mb-3'>
                            {testimonial.videoUrl && (
                              <div className='relative aspect-video bg-black rounded-lg overflow-hidden'>
                                <video
                                  className='w-full h-full object-cover'
                                  controls
                                  poster={testimonial.images?.[0]}
                                >
                                  <source
                                    src={testimonial.videoUrl}
                                    type='video/mp4'
                                  />
                                </video>
                              </div>
                            )}

                            {testimonial.audioUrl && (
                              <div className='p-2 bg-muted rounded-lg'>
                                <audio controls className='w-full'>
                                  <source
                                    src={testimonial.audioUrl}
                                    type='audio/mpeg'
                                  />
                                </audio>
                              </div>
                            )}

                            {testimonial.images &&
                              testimonial.images.length > 0 && (
                                <div className='grid grid-cols-2 gap-1'>
                                  {testimonial.images
                                    .slice(0, 4)
                                    .map((image, imgIndex) => (
                                      <img
                                        key={imgIndex}
                                        src={image}
                                        alt={`${testimonial.name} testimonial`}
                                        className='w-full h-16 object-cover rounded-lg'
                                      />
                                    ))}
                                </div>
                              )}
                          </div>
                        )}

                      {/* Tags */}
                      {mobileSettings.showTags &&
                        testimonial.tags &&
                        testimonial.tags.length > 0 && (
                          <div className='flex flex-wrap gap-1 mb-3'>
                            {testimonial.tags
                              .slice(0, 3)
                              .map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  variant='outline'
                                  className='text-xs'
                                >
                                  {tag}
                                </Badge>
                              ))}
                          </div>
                        )}

                      {/* Social actions */}
                      {showSocial && (
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-2'>
                            <Button
                              size='sm'
                              variant='outline'
                              className='flex items-center gap-1 text-xs'
                            >
                              <ThumbsUp className='h-3 w-3' />
                              {testimonial.likes || 0}
                            </Button>
                            <Button
                              size='sm'
                              variant='outline'
                              className='flex items-center gap-1 text-xs'
                            >
                              <Share className='h-3 w-3' />
                              {testimonial.shares || 0}
                            </Button>
                            <Button
                              size='sm'
                              variant='outline'
                              className='flex items-center gap-1 text-xs'
                            >
                              <Eye className='h-3 w-3' />
                              {testimonial.views || 0}
                            </Button>
                          </div>

                          <div className='flex items-center gap-1'>
                            <Button size='sm' variant='outline'>
                              <Bookmark className='h-3 w-3' />
                            </Button>
                            <Button size='sm' variant='outline'>
                              <Share className='h-3 w-3' />
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Date */}
                      {mobileSettings.showDates && testimonial.date && (
                        <p className='text-xs text-muted-foreground mt-3'>
                          {new Date(testimonial.date).toLocaleDateString()}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className='space-y-3'>
                  {filteredTestimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      className='flex items-center justify-between p-3 border rounded-lg bg-background hover:shadow-lg transition-shadow'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className='flex items-center gap-3'>
                        <input
                          type='checkbox'
                          checked={selectedTestimonials.includes(
                            testimonial.id
                          )}
                          onChange={() =>
                            handleTestimonialSelect(testimonial.id)
                          }
                          className='h-4 w-4'
                        />

                        {mobileSettings.showAvatars && (
                          <div className='w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center'>
                            <span className='text-sm font-bold text-primary'>
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                        )}

                        <div className='flex-1'>
                          <div className='flex items-center gap-2 mb-1'>
                            <h4 className='font-medium text-sm'>
                              {testimonial.name}
                            </h4>
                            {mobileSettings.showCompanies && (
                              <span className='text-xs text-muted-foreground'>
                                {testimonial.role} at {testimonial.company}
                              </span>
                            )}
                            {getStatusIcon(testimonial.status || 'pending')}
                          </div>

                          {mobileSettings.showRatings && (
                            <div className='flex items-center gap-1 mb-1'>
                              {renderStars(testimonial.rating)}
                              <span className='text-xs text-muted-foreground ml-1'>
                                {testimonial.rating}/5
                              </span>
                            </div>
                          )}

                          <p className='text-xs text-muted-foreground'>
                            {testimonial.content.substring(0, 80)}...
                          </p>
                        </div>
                      </div>

                      <div className='flex items-center gap-1'>
                        <Button size='sm' variant='outline'>
                          <Eye className='h-4 w-4' />
                        </Button>
                        <Button size='sm' variant='outline'>
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button size='sm' variant='outline'>
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Mobile actions */}
        {showActions && selectedTestimonials.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className='p-4 bg-muted/50 border-t'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  {selectedTestimonials.length} selected
                </span>
                <div className='flex items-center gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => handleBulkAction('approve')}
                  >
                    <CheckCircle className='h-4 w-4 mr-1' />
                    Approve
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => handleBulkAction('reject')}
                  >
                    <XCircle className='h-4 w-4 mr-1' />
                    Reject
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => handleBulkAction('delete')}
                  >
                    <Trash2 className='h-4 w-4 mr-1' />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default TestimonialMobile
