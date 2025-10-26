/**
 * Testimonial search component
 * Provides advanced search functionality for testimonials
 */

'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Search,
  X,
  Filter,
  SortAsc,
  SortDesc,
  Star,
  Calendar,
  User,
  Building,
  Quote,
  Tag,
} from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialSearchProps {
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
    tags?: string[]
  }>
  onSearchResults?: (results: any[]) => void
  onSearchQuery?: (query: string) => void
  className?: string
  placeholder?: string
  showFilters?: boolean
  showSort?: boolean
  showSuggestions?: boolean
  maxSuggestions?: number
}

export const TestimonialSearch: React.FC<TestimonialSearchProps> = ({
  testimonials,
  onSearchResults,
  onSearchQuery,
  className = '',
  placeholder = 'Search testimonials...',
  showFilters = true,
  showSort = true,
  showSuggestions = true,
  maxSuggestions = 5,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showSuggestionsList, setShowSuggestionsList] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState(testimonials)
  const [sortBy, setSortBy] = useState<
    'relevance' | 'rating' | 'date' | 'name'
  >('relevance')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const searchRef = useRef<HTMLInputElement>(null)
  const { preferences } = useAccessibility()

  // Generate search suggestions
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSuggestions([])
      return
    }

    const query = searchQuery.toLowerCase()
    const suggestionSet = new Set<string>()

    // Add matching names
    testimonials.forEach(t => {
      if (t.name.toLowerCase().includes(query)) {
        suggestionSet.add(t.name)
      }
    })

    // Add matching companies
    testimonials.forEach(t => {
      if (t.company.toLowerCase().includes(query)) {
        suggestionSet.add(t.company)
      }
    })

    // Add matching categories
    testimonials.forEach(t => {
      if (t.category && t.category.toLowerCase().includes(query)) {
        suggestionSet.add(t.category)
      }
    })

    // Add matching tags
    testimonials.forEach(t => {
      if (t.tags) {
        t.tags.forEach(tag => {
          if (tag.toLowerCase().includes(query)) {
            suggestionSet.add(tag)
          }
        })
      }
    })

    setSuggestions(Array.from(suggestionSet).slice(0, maxSuggestions))
  }, [searchQuery, testimonials, maxSuggestions])

  // Perform search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(testimonials)
      onSearchResults?.(testimonials)
      return
    }

    setIsSearching(true)
    const query = searchQuery.toLowerCase()

    // Search in multiple fields
    const results = testimonials.filter(t => {
      const searchFields = [
        t.name,
        t.role,
        t.company,
        t.content,
        t.category,
        ...(t.tags || []),
      ]

      return searchFields.some(
        field => field && field.toLowerCase().includes(query)
      )
    })

    // Sort results
    results.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          // Simple relevance scoring
          const aScore = getRelevanceScore(a, query)
          const bScore = getRelevanceScore(b, query)
          return sortOrder === 'desc' ? bScore - aScore : aScore - bScore
        case 'rating':
          return sortOrder === 'desc'
            ? b.rating - a.rating
            : a.rating - b.rating
        case 'date':
          const aDate = a.date || a.id
          const bDate = b.date || b.id
          return sortOrder === 'desc'
            ? bDate.localeCompare(aDate)
            : aDate.localeCompare(bDate)
        case 'name':
          return sortOrder === 'desc'
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setSearchResults(results)
    onSearchResults?.(results)
    setIsSearching(false)
  }, [searchQuery, testimonials, sortBy, sortOrder, onSearchResults])

  // Calculate relevance score
  const getRelevanceScore = (testimonial: any, query: string) => {
    let score = 0
    const fields = [testimonial.name, testimonial.company, testimonial.content]

    fields.forEach(field => {
      if (field && field.toLowerCase().includes(query)) {
        score += 1
      }
    })

    // Boost score for exact matches
    if (testimonial.name.toLowerCase() === query) score += 2
    if (testimonial.company.toLowerCase() === query) score += 2

    return score
  }

  // Handle search input change
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value)
      onSearchQuery?.(value)
      setShowSuggestionsList(value.length > 0)
    },
    [onSearchQuery]
  )

  // Handle suggestion select
  const handleSuggestionSelect = useCallback((suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestionsList(false)
    searchRef.current?.focus()
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
    },
    [sortBy]
  )

  // Handle filter toggle
  const handleFilterToggle = useCallback((filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    )
  }, [])

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setShowSuggestionsList(false)
    setActiveFilters([])
    searchRef.current?.focus()
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestionsList(false)
    }
  }, [])

  return (
    <div className={cn('w-full', className)}>
      {/* Search input */}
      <div className='relative mb-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <input
            ref={searchRef}
            type='text'
            placeholder={placeholder}
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestionsList(searchQuery.length > 0)}
            className='w-full pl-10 pr-10 py-3 border border-input rounded-lg bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent'
          />
          {searchQuery && (
            <Button
              size='sm'
              variant='ghost'
              onClick={clearSearch}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0'
            >
              <X className='h-4 w-4' />
            </Button>
          )}
        </div>

        {/* Search suggestions */}
        <AnimatePresence>
          {showSuggestionsList && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className='absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-lg shadow-lg z-50'
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className='w-full px-4 py-2 text-left text-sm hover:bg-muted focus:bg-muted focus:outline-none first:rounded-t-lg last:rounded-b-lg'
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search results info */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground'>
            {isSearching ? 'Searching...' : `${searchResults.length} results`}
          </span>
          {searchQuery && (
            <Badge variant='secondary' className='text-xs'>
              "{searchQuery}"
            </Badge>
          )}
        </div>

        {/* Sort options */}
        {showSort && (
          <div className='flex items-center gap-2'>
            <span className='text-sm text-muted-foreground'>Sort by:</span>
            <select
              value={sortBy}
              onChange={e => handleSortChange(e.target.value)}
              className='text-sm border border-input rounded px-2 py-1 bg-background'
            >
              <option value='relevance'>Relevance</option>
              <option value='rating'>Rating</option>
              <option value='date'>Date</option>
              <option value='name'>Name</option>
            </select>
            <Button
              size='sm'
              variant='outline'
              onClick={() =>
                setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
              }
              className='h-8 w-8 p-0'
            >
              {sortOrder === 'asc' ? (
                <SortAsc className='h-4 w-4' />
              ) : (
                <SortDesc className='h-4 w-4' />
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className='flex flex-wrap gap-2 mb-4'>
          {activeFilters.map(filter => (
            <Badge
              key={filter}
              variant='secondary'
              className='cursor-pointer'
              onClick={() => handleFilterToggle(filter)}
            >
              {filter}
              <X className='h-3 w-3 ml-1' />
            </Badge>
          ))}
        </div>
      )}

      {/* Quick filters */}
      {showFilters && (
        <Card className='mb-6'>
          <CardContent className='p-4'>
            <div className='flex flex-wrap gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => handleFilterToggle('featured')}
                className={cn(
                  'flex items-center gap-2',
                  activeFilters.includes('featured') &&
                    'bg-primary text-primary-foreground'
                )}
              >
                <Star className='h-4 w-4' />
                Featured
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => handleFilterToggle('high-rating')}
                className={cn(
                  'flex items-center gap-2',
                  activeFilters.includes('high-rating') &&
                    'bg-primary text-primary-foreground'
                )}
              >
                <Star className='h-4 w-4' />5 Stars
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => handleFilterToggle('recent')}
                className={cn(
                  'flex items-center gap-2',
                  activeFilters.includes('recent') &&
                    'bg-primary text-primary-foreground'
                )}
              >
                <Calendar className='h-4 w-4' />
                Recent
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No results message */}
      {searchQuery && searchResults.length === 0 && !isSearching && (
        <motion.div
          className='text-center py-12'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Search className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
          <h3 className='text-lg font-semibold mb-2'>No results found</h3>
          <p className='text-muted-foreground mb-4'>
            Try adjusting your search terms or filters
          </p>
          <Button variant='outline' onClick={clearSearch}>
            Clear Search
          </Button>
        </motion.div>
      )}
    </div>
  )
}

export default TestimonialSearch
