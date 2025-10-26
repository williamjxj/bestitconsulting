/**
 * Testimonial dashboard component
 * Provides a comprehensive dashboard for testimonial management
 */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3,
  TrendingUp,
  Users,
  Star,
  Calendar,
  Filter,
  Search,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Plus,
  MoreHorizontal,
} from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialDashboardProps {
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
  }>
  className?: string
  showStats?: boolean
  showFilters?: boolean
  showActions?: boolean
  showRecent?: boolean
  onDashboardAction?: (action: string, data: any) => void
}

export const TestimonialDashboard: React.FC<TestimonialDashboardProps> = ({
  testimonials,
  className = '',
  showStats = true,
  showFilters = true,
  showActions = true,
  showRecent = true,
  onDashboardAction,
}) => {
  const [dashboardStats, setDashboardStats] = useState({
    total: 0,
    averageRating: 0,
    featuredCount: 0,
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
    flaggedCount: 0,
    categories: [] as Array<{ name: string; count: number }>,
    monthlyTrends: [] as Array<{ month: string; count: number }>,
    topCompanies: [] as Array<{ company: string; count: number }>,
  })

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    rating: 'all',
    status: 'all',
    featured: 'all',
    dateRange: 'all',
  })

  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials)
  const [selectedTestimonials, setSelectedTestimonials] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { preferences } = useAccessibility()

  // Calculate dashboard stats
  useEffect(() => {
    if (!testimonials.length) return

    const total = testimonials.length
    const averageRating =
      testimonials.reduce((sum, t) => sum + t.rating, 0) / total
    const featuredCount = testimonials.filter(t => t.featured).length
    const pendingCount = testimonials.filter(t => t.status === 'pending').length
    const approvedCount = testimonials.filter(
      t => t.status === 'approved'
    ).length
    const rejectedCount = testimonials.filter(
      t => t.status === 'rejected'
    ).length
    const flaggedCount = testimonials.filter(t => t.status === 'flagged').length

    // Category distribution
    const categoryMap = new Map<string, number>()
    testimonials.forEach(t => {
      if (t.category) {
        categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + 1)
      }
    })
    const categories = Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)

    // Monthly trends (simplified)
    const monthlyMap = new Map<string, number>()
    testimonials.forEach(t => {
      const date = t.date ? new Date(t.date) : new Date()
      const month = date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
      monthlyMap.set(month, (monthlyMap.get(month) || 0) + 1)
    })
    const monthlyTrends = Array.from(monthlyMap.entries())
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())

    // Top companies
    const companyMap = new Map<string, number>()
    testimonials.forEach(t => {
      companyMap.set(t.company, (companyMap.get(t.company) || 0) + 1)
    })
    const topCompanies = Array.from(companyMap.entries())
      .map(([company, count]) => ({ company, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    setDashboardStats({
      total,
      averageRating,
      featuredCount,
      pendingCount,
      approvedCount,
      rejectedCount,
      flaggedCount,
      categories,
      monthlyTrends,
      topCompanies,
    })
  }, [testimonials])

  // Filter testimonials
  useEffect(() => {
    let filtered = [...testimonials]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        t =>
          t.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          t.company.toLowerCase().includes(filters.search.toLowerCase()) ||
          t.content.toLowerCase().includes(filters.search.toLowerCase())
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

    setFilteredTestimonials(filtered)
  }, [testimonials, filters])

  // Handle filter change
  const handleFilterChange = useCallback((key: string, value: string) => {
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

  // Handle bulk actions
  const handleBulkAction = useCallback(
    async (action: string) => {
      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        onDashboardAction?.(action, { testimonialIds: selectedTestimonials })
        setSelectedTestimonials([])
      } catch (error) {
        console.error('Bulk action failed:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [selectedTestimonials, onDashboardAction]
  )

  // Handle testimonial action
  const handleTestimonialAction = useCallback(
    async (testimonialId: string, action: string) => {
      setIsLoading(true)

      try {
        await new Promise(resolve => setTimeout(resolve, 500))

        onDashboardAction?.(action, { testimonialId })
      } catch (error) {
        console.error('Testimonial action failed:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [onDashboardAction]
  )

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
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20'
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
    <div className={cn('w-full', className)}>
      <motion.div
        className='space-y-6'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Dashboard stats */}
        {showStats && (
          <motion.div variants={itemVariants}>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <Card>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-muted-foreground'>
                        Total Testimonials
                      </p>
                      <p className='text-3xl font-bold'>
                        {dashboardStats.total}
                      </p>
                    </div>
                    <Users className='h-8 w-8 text-primary' />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-muted-foreground'>
                        Average Rating
                      </p>
                      <p className='text-3xl font-bold'>
                        {dashboardStats.averageRating.toFixed(1)}
                      </p>
                    </div>
                    <Star className='h-8 w-8 text-primary' />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-muted-foreground'>Featured</p>
                      <p className='text-3xl font-bold'>
                        {dashboardStats.featuredCount}
                      </p>
                    </div>
                    <TrendingUp className='h-8 w-8 text-primary' />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-muted-foreground'>Pending</p>
                      <p className='text-3xl font-bold'>
                        {dashboardStats.pendingCount}
                      </p>
                    </div>
                    <Calendar className='h-8 w-8 text-primary' />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Filters and actions */}
        {showFilters && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Filter className='h-5 w-5' />
                  Filters & Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {/* Search and filters */}
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
                    <div className='relative'>
                      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                      <input
                        type='text'
                        placeholder='Search testimonials...'
                        value={filters.search}
                        onChange={e =>
                          handleFilterChange('search', e.target.value)
                        }
                        className='w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm'
                      />
                    </div>

                    <select
                      value={filters.category}
                      onChange={e =>
                        handleFilterChange('category', e.target.value)
                      }
                      className='p-2 border border-input rounded-md bg-background text-sm'
                    >
                      <option value='all'>All Categories</option>
                      {dashboardStats.categories.map(category => (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={filters.rating}
                      onChange={e =>
                        handleFilterChange('rating', e.target.value)
                      }
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
                      onChange={e =>
                        handleFilterChange('status', e.target.value)
                      }
                      className='p-2 border border-input rounded-md bg-background text-sm'
                    >
                      <option value='all'>All Status</option>
                      <option value='pending'>Pending</option>
                      <option value='approved'>Approved</option>
                      <option value='rejected'>Rejected</option>
                      <option value='flagged'>Flagged</option>
                    </select>

                    <select
                      value={filters.featured}
                      onChange={e =>
                        handleFilterChange('featured', e.target.value)
                      }
                      className='p-2 border border-input rounded-md bg-background text-sm'
                    >
                      <option value='all'>All</option>
                      <option value='yes'>Featured</option>
                      <option value='no'>Not Featured</option>
                    </select>
                  </div>

                  {/* Bulk actions */}
                  {selectedTestimonials.length > 0 && (
                    <div className='flex items-center gap-2 p-3 bg-muted rounded-lg'>
                      <span className='text-sm font-medium'>
                        {selectedTestimonials.length} selected
                      </span>
                      <div className='flex gap-2'>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => handleBulkAction('approve')}
                          disabled={isLoading}
                        >
                          Approve
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => handleBulkAction('reject')}
                          disabled={isLoading}
                        >
                          Reject
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => handleBulkAction('feature')}
                          disabled={isLoading}
                        >
                          Feature
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => handleBulkAction('delete')}
                          disabled={isLoading}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Testimonials list */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <BarChart3 className='h-5 w-5' />
                  Testimonials ({filteredTestimonials.length})
                </div>
                <div className='flex items-center gap-2'>
                  <Button size='sm' variant='outline'>
                    <Download className='h-4 w-4 mr-2' />
                    Export
                  </Button>
                  <Button size='sm' variant='outline'>
                    <Upload className='h-4 w-4 mr-2' />
                    Import
                  </Button>
                  <Button size='sm'>
                    <Plus className='h-4 w-4 mr-2' />
                    Add
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {filteredTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className='flex items-center justify-between p-4 border rounded-lg'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className='flex items-center gap-4'>
                      <input
                        type='checkbox'
                        checked={selectedTestimonials.includes(testimonial.id)}
                        onChange={() => handleTestimonialSelect(testimonial.id)}
                        className='h-4 w-4'
                      />

                      <div className='flex-1'>
                        <div className='flex items-center gap-3 mb-2'>
                          <h4 className='font-medium'>{testimonial.name}</h4>
                          <Badge
                            className={getStatusColor(
                              testimonial.status || 'pending'
                            )}
                          >
                            {testimonial.status || 'pending'}
                          </Badge>
                          {testimonial.featured && (
                            <Badge variant='secondary'>Featured</Badge>
                          )}
                        </div>

                        <p className='text-sm text-muted-foreground mb-2'>
                          {testimonial.role} at {testimonial.company}
                        </p>

                        <div className='flex items-center gap-4'>
                          <div className='flex items-center gap-1'>
                            {renderStars(testimonial.rating)}
                          </div>
                          <span className='text-sm text-muted-foreground'>
                            {testimonial.content.substring(0, 100)}...
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='flex items-center gap-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() =>
                          handleTestimonialAction(testimonial.id, 'view')
                        }
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() =>
                          handleTestimonialAction(testimonial.id, 'edit')
                        }
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() =>
                          handleTestimonialAction(testimonial.id, 'delete')
                        }
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent activity */}
        {showRecent && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Calendar className='h-5 w-5' />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {testimonials.slice(0, 5).map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      className='flex items-center gap-3 p-3 border rounded-lg'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className='w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center'>
                        <span className='text-sm font-bold text-primary'>
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div className='flex-1'>
                        <p className='text-sm font-medium'>
                          {testimonial.name} left a {testimonial.rating}-star
                          review
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          {testimonial.date
                            ? new Date(testimonial.date).toLocaleString()
                            : 'Recently'}
                        </p>
                      </div>
                      <Badge
                        className={getStatusColor(
                          testimonial.status || 'pending'
                        )}
                      >
                        {testimonial.status || 'pending'}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default TestimonialDashboard
