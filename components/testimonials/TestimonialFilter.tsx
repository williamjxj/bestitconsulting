/**
 * Testimonial filter component
 * Provides filtering and sorting options for testimonials
 */

'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Filter,
  SortAsc,
  SortDesc,
  Search,
  X,
  Star,
  Calendar,
  User,
  Building,
} from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialFilterProps {
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
  onFilterChange?: (filteredTestimonials: any[]) => void
  onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void
  className?: string
  showSearch?: boolean
  showCategories?: boolean
  showRatings?: boolean
  showSort?: boolean
  showFeatured?: boolean
}

export const TestimonialFilter: React.FC<TestimonialFilterProps> = ({
  testimonials,
  onFilterChange,
  onSortChange,
  className = '',
  showSearch = true,
  showCategories = true,
  showRatings = true,
  showSort = true,
  showFeatured = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'date' | 'company'>(
    'rating'
  )
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [isExpanded, setIsExpanded] = useState(false)

  const { preferences } = useAccessibility()

  // Get unique categories
  const categories = Array.from(
    new Set(testimonials.map(t => t.category).filter(Boolean))
  )

  // Get unique ratings
  const ratings = Array.from(new Set(testimonials.map(t => t.rating))).sort(
    (a, b) => b - a
  )

  // Filter and sort testimonials
  useEffect(() => {
    let filtered = [...testimonials]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        t =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(
        t => t.category && selectedCategories.includes(t.category)
      )
    }

    // Rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(t => selectedRatings.includes(t.rating))
    }

    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter(t => t.featured)
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'rating':
          aValue = a.rating
          bValue = b.rating
          break
        case 'date':
          aValue = a.date || a.id
          bValue = b.date || b.id
          break
        case 'company':
          aValue = a.company
          bValue = b.company
          break
        default:
          return 0
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    onFilterChange?.(filtered)
  }, [
    testimonials,
    searchQuery,
    selectedCategories,
    selectedRatings,
    showFeaturedOnly,
    sortBy,
    sortOrder,
    onFilterChange,
  ])

  // Handle category toggle
  const handleCategoryToggle = useCallback((category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }, [])

  // Handle rating toggle
  const handleRatingToggle = useCallback((rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    )
  }, [])

  // Handle sort change
  const handleSortChange = useCallback(
    (newSortBy: string) => {
      if (newSortBy === sortBy) {
        setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
      } else {
        setSortBy(newSortBy as any)
        setSortOrder('desc')
      }
      onSortChange?.(newSortBy, sortOrder)
    },
    [sortBy, sortOrder, onSortChange]
  )

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedCategories([])
    setSelectedRatings([])
    setShowFeaturedOnly(false)
    setSortBy('rating')
    setSortOrder('desc')
  }, [])

  // Get active filter count
  const activeFilterCount = [
    searchQuery,
    selectedCategories.length,
    selectedRatings.length,
    showFeaturedOnly,
  ].filter(Boolean).length

  return (
    <div className={cn('w-full', className)}>
      {/* Filter toggle button */}
      <Button
        variant='outline'
        onClick={() => setIsExpanded(!isExpanded)}
        className='mb-4'
      >
        <Filter className='h-4 w-4 mr-2' />
        Filters
        {activeFilterCount > 0 && (
          <Badge variant='secondary' className='ml-2'>
            {activeFilterCount}
          </Badge>
        )}
      </Button>

      {/* Filter panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='overflow-hidden'
          >
            <Card className='mb-6'>
              <CardContent className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                  {/* Search */}
                  {showSearch && (
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Search</label>
                      <div className='relative'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                        <input
                          type='text'
                          placeholder='Search testimonials...'
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          className='w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm'
                        />
                        {searchQuery && (
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => setSearchQuery('')}
                            className='absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0'
                          >
                            <X className='h-3 w-3' />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Categories */}
                  {showCategories && categories.length > 0 && (
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Categories</label>
                      <div className='flex flex-wrap gap-2'>
                        {categories.map(category => (
                          <Badge
                            key={category}
                            variant={
                              selectedCategories.includes(category)
                                ? 'default'
                                : 'outline'
                            }
                            className='cursor-pointer'
                            onClick={() => handleCategoryToggle(category)}
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ratings */}
                  {showRatings && ratings.length > 0 && (
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Ratings</label>
                      <div className='flex flex-wrap gap-2'>
                        {ratings.map(rating => (
                          <Badge
                            key={rating}
                            variant={
                              selectedRatings.includes(rating)
                                ? 'default'
                                : 'outline'
                            }
                            className='cursor-pointer'
                            onClick={() => handleRatingToggle(rating)}
                          >
                            <Star className='h-3 w-3 mr-1' />
                            {rating}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Featured */}
                  {showFeatured && (
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Featured</label>
                      <Button
                        variant={showFeaturedOnly ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                        className='w-full'
                      >
                        Featured Only
                      </Button>
                    </div>
                  )}
                </div>

                {/* Sort options */}
                {showSort && (
                  <div className='mt-6 pt-6 border-t'>
                    <div className='flex items-center gap-4'>
                      <span className='text-sm font-medium'>Sort by:</span>
                      <div className='flex gap-2'>
                        {[
                          { key: 'rating', label: 'Rating', icon: Star },
                          { key: 'name', label: 'Name', icon: User },
                          { key: 'company', label: 'Company', icon: Building },
                          { key: 'date', label: 'Date', icon: Calendar },
                        ].map(({ key, label, icon: Icon }) => (
                          <Button
                            key={key}
                            variant={sortBy === key ? 'default' : 'outline'}
                            size='sm'
                            onClick={() => handleSortChange(key)}
                            className='flex items-center gap-2'
                          >
                            <Icon className='h-4 w-4' />
                            {label}
                            {sortBy === key &&
                              (sortOrder === 'asc' ? (
                                <SortAsc className='h-4 w-4' />
                              ) : (
                                <SortDesc className='h-4 w-4' />
                              ))}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Clear filters */}
                {activeFilterCount > 0 && (
                  <div className='mt-6 pt-6 border-t'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={clearFilters}
                      className='w-full'
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TestimonialFilter
