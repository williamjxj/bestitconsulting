/**
 * Testimonial system component
 * Provides comprehensive testimonial management system
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

interface TestimonialSystemProps {
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
  showSidebar?: boolean
  showToolbar?: boolean
  showFilters?: boolean
  showActions?: boolean
  showMedia?: boolean
  showSocial?: boolean
  showAnalytics?: boolean
  showNotifications?: boolean
  showWebhooks?: boolean
  showAPI?: boolean
  showSecurity?: boolean
  showModeration?: boolean
  showAdmin?: boolean
  onSystemAction?: (action: string, data: any) => void
}

export const TestimonialSystem: React.FC<TestimonialSystemProps> = ({
  testimonials,
  className = '',
  showHeader = true,
  showSidebar = true,
  showToolbar = true,
  showFilters = true,
  showActions = true,
  showMedia = true,
  showSocial = true,
  showAnalytics = true,
  showNotifications = true,
  showWebhooks = true,
  showAPI = true,
  showSecurity = true,
  showModeration = true,
  showAdmin = true,
  onSystemAction,
}) => {
  const [systemSettings, setSystemSettings] = useState({
    viewMode: 'grid' as 'list' | 'grid' | 'table' | 'card',
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
  const [isPlaying, setIsPlaying] = useState(systemSettings.autoPlay)
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

        onSystemAction?.(action, { testimonialId, ...data })
      } catch (error) {
        console.error('Testimonial action failed:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [onSystemAction]
  )

  // Handle bulk action
  const handleBulkAction = useCallback(
    async (action: string, data?: any) => {
      setIsLoading(true)

      try {
        await new Promise(resolve => setTimeout(resolve, 1000))

        onSystemAction?.(action, {
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
    [selectedTestimonials, onSystemAction]
  )

  // Handle settings update
  const handleSettingsUpdate = useCallback((key: string, value: any) => {
    setSystemSettings(prev => ({
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
    if (!isPlaying || !systemSettings.autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filteredTestimonials.length)
    }, systemSettings.autoPlayInterval)
  }, [
    isPlaying,
    systemSettings.autoPlay,
    systemSettings.autoPlayInterval,
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
    <div className={cn('w-full h-screen flex', className)}>
      <motion.div
        className='flex-1 flex flex-col'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* System header */}
        {showHeader && (
          <motion.div variants={itemVariants}>
            <div className='flex items-center justify-between p-4 bg-background border-b'>
              <div className='flex items-center gap-4'>
                <h1 className='text-2xl font-bold'>Testimonial System</h1>
                <Badge variant='outline'>
                  {filteredTestimonials.length} items
                </Badge>
              </div>

              <div className='flex items-center gap-2'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className='h-4 w-4 mr-2' />
                  Filters
                </Button>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className='h-4 w-4 mr-2' />
                  Settings
                </Button>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => setShowExport(!showExport)}
                >
                  <Download className='h-4 w-4 mr-2' />
                  Export
                </Button>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => setShowImport(!showImport)}
                >
                  <Upload className='h-4 w-4 mr-2' />
                  Import
                </Button>
                <Button size='sm'>
                  <Plus className='h-4 w-4 mr-2' />
                  Add
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* System toolbar */}
        {showToolbar && (
          <motion.div variants={itemVariants}>
            <div className='flex items-center justify-between p-4 bg-muted/50 border-b'>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <Button
                    size='sm'
                    variant={
                      systemSettings.viewMode === 'list' ? 'default' : 'outline'
                    }
                    onClick={() => handleSettingsUpdate('viewMode', 'list')}
                  >
                    <List className='h-4 w-4' />
                  </Button>
                  <Button
                    size='sm'
                    variant={
                      systemSettings.viewMode === 'grid' ? 'default' : 'outline'
                    }
                    onClick={() => handleSettingsUpdate('viewMode', 'grid')}
                  >
                    <Grid className='h-4 w-4' />
                  </Button>
                </div>

                <div className='flex items-center gap-2'>
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

                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() =>
                      handleFilterChange(
                        'sortOrder',
                        filters.sortOrder === 'asc' ? 'desc' : 'asc'
                      )
                    }
                  >
                    {filters.sortOrder === 'asc' ? '↑' : '↓'}
                  </Button>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                {selectedTestimonials.length > 0 && (
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-muted-foreground'>
                      {selectedTestimonials.length} selected
                    </span>
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
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* System filters */}
        {showFilters && (
          <motion.div variants={itemVariants}>
            <div className='p-4 bg-muted/50 border-b'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
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

                <select
                  value={filters.category}
                  onChange={e => handleFilterChange('category', e.target.value)}
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
              </div>
            </div>
          </motion.div>
        )}

        {/* System content */}
        <div className='flex-1 flex overflow-hidden'>
          {/* Sidebar */}
          {showSidebar && (
            <motion.div variants={itemVariants}>
              <div className='w-64 bg-muted/50 border-r p-4'>
                <div className='space-y-4'>
                  <div>
                    <h3 className='font-medium mb-2'>Quick Stats</h3>
                    <div className='space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span>Total</span>
                        <span className='font-medium'>
                          {testimonials.length}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Approved</span>
                        <span className='font-medium text-green-600'>
                          {
                            testimonials.filter(t => t.status === 'approved')
                              .length
                          }
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Pending</span>
                        <span className='font-medium text-yellow-600'>
                          {
                            testimonials.filter(t => t.status === 'pending')
                              .length
                          }
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Featured</span>
                        <span className='font-medium text-blue-600'>
                          {testimonials.filter(t => t.featured).length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className='font-medium mb-2'>Categories</h3>
                    <div className='space-y-1 text-sm'>
                      {['Customer', 'Client', 'Partner'].map(category => (
                        <div
                          key={category}
                          className='flex items-center justify-between'
                        >
                          <span>{category}</span>
                          <Badge variant='outline'>
                            {
                              testimonials.filter(
                                t => t.category === category.toLowerCase()
                              ).length
                            }
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className='font-medium mb-2'>Actions</h3>
                    <div className='space-y-1'>
                      <Button
                        size='sm'
                        variant='outline'
                        className='w-full justify-start'
                      >
                        <Download className='h-4 w-4 mr-2' />
                        Export
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        className='w-full justify-start'
                      >
                        <Upload className='h-4 w-4 mr-2' />
                        Import
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        className='w-full justify-start'
                      >
                        <RefreshCw className='h-4 w-4 mr-2' />
                        Sync
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        className='w-full justify-start'
                      >
                        <Archive className='h-4 w-4 mr-2' />
                        Backup
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Main content */}
          <div className='flex-1 overflow-auto'>
            <motion.div variants={itemVariants}>
              <div className='p-6'>
                {systemSettings.viewMode === 'grid' ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {filteredTestimonials.map((testimonial, index) => (
                      <motion.div
                        key={testimonial.id}
                        className='border rounded-lg p-6 bg-background hover:shadow-lg transition-shadow'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {/* Testimonial header */}
                        <div className='flex items-center justify-between mb-4'>
                          <div className='flex items-center gap-3'>
                            {systemSettings.showAvatars && (
                              <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                                <span className='text-lg font-bold text-primary'>
                                  {testimonial.name.charAt(0)}
                                </span>
                              </div>
                            )}
                            <div>
                              <h4 className='font-medium'>
                                {testimonial.name}
                              </h4>
                              {systemSettings.showCompanies && (
                                <p className='text-sm text-muted-foreground'>
                                  {testimonial.role} at {testimonial.company}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className='flex items-center gap-2'>
                            {getStatusIcon(testimonial.status || 'pending')}
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
                          </div>
                        </div>

                        {/* Rating */}
                        {systemSettings.showRatings && (
                          <div className='flex items-center gap-1 mb-4'>
                            {renderStars(testimonial.rating)}
                            <span className='text-sm text-muted-foreground ml-2'>
                              {testimonial.rating}/5
                            </span>
                          </div>
                        )}

                        {/* Content */}
                        <p className='text-muted-foreground mb-4 leading-relaxed'>
                          "{testimonial.content}"
                        </p>

                        {/* Media */}
                        {showMedia &&
                          (testimonial.videoUrl ||
                            testimonial.audioUrl ||
                            testimonial.images) && (
                            <div className='mb-4'>
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
                                <div className='p-4 bg-muted rounded-lg'>
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
                                  <div className='grid grid-cols-2 gap-2'>
                                    {testimonial.images
                                      .slice(0, 4)
                                      .map((image, imgIndex) => (
                                        <img
                                          key={imgIndex}
                                          src={image}
                                          alt={`${testimonial.name} testimonial`}
                                          className='w-full h-24 object-cover rounded-lg'
                                        />
                                      ))}
                                  </div>
                                )}
                            </div>
                          )}

                        {/* Tags */}
                        {systemSettings.showTags &&
                          testimonial.tags &&
                          testimonial.tags.length > 0 && (
                            <div className='flex flex-wrap gap-1 mb-4'>
                              {testimonial.tags.map((tag, tagIndex) => (
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
                            <div className='flex items-center gap-4'>
                              <Button
                                size='sm'
                                variant='outline'
                                className='flex items-center gap-1'
                              >
                                <ThumbsUp className='h-4 w-4' />
                                {testimonial.likes || 0}
                              </Button>
                              <Button
                                size='sm'
                                variant='outline'
                                className='flex items-center gap-1'
                              >
                                <Share className='h-4 w-4' />
                                {testimonial.shares || 0}
                              </Button>
                              <Button
                                size='sm'
                                variant='outline'
                                className='flex items-center gap-1'
                              >
                                <Eye className='h-4 w-4' />
                                {testimonial.views || 0}
                              </Button>
                            </div>

                            <div className='flex items-center gap-2'>
                              <Button size='sm' variant='outline'>
                                <Bookmark className='h-4 w-4' />
                              </Button>
                              <Button size='sm' variant='outline'>
                                <Share className='h-4 w-4' />
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Date */}
                        {systemSettings.showDates && testimonial.date && (
                          <p className='text-xs text-muted-foreground mt-4'>
                            {new Date(testimonial.date).toLocaleDateString()}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className='space-y-4'>
                    {filteredTestimonials.map((testimonial, index) => (
                      <motion.div
                        key={testimonial.id}
                        className='flex items-center justify-between p-4 border rounded-lg bg-background hover:shadow-lg transition-shadow'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className='flex items-center gap-4'>
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

                          {systemSettings.showAvatars && (
                            <div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
                              <span className='text-sm font-bold text-primary'>
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                          )}

                          <div className='flex-1'>
                            <div className='flex items-center gap-3 mb-2'>
                              <h4 className='font-medium'>
                                {testimonial.name}
                              </h4>
                              {systemSettings.showCompanies && (
                                <span className='text-sm text-muted-foreground'>
                                  {testimonial.role} at {testimonial.company}
                                </span>
                              )}
                              {getStatusIcon(testimonial.status || 'pending')}
                            </div>

                            {systemSettings.showRatings && (
                              <div className='flex items-center gap-1 mb-2'>
                                {renderStars(testimonial.rating)}
                                <span className='text-sm text-muted-foreground ml-2'>
                                  {testimonial.rating}/5
                                </span>
                              </div>
                            )}

                            <p className='text-sm text-muted-foreground'>
                              {testimonial.content.substring(0, 100)}...
                            </p>
                          </div>
                        </div>

                        <div className='flex items-center gap-2'>
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
        </div>
      </motion.div>
    </div>
  )
}

export default TestimonialSystem
