/**
 * Testimonial grid component
 * Displays testimonials in a responsive grid layout
 */

'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Quote, Filter } from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialGridProps {
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
  }>
  columns?: number
  gap?: string
  className?: string
  enableFilter?: boolean
  enableSort?: boolean
  onTestimonialSelect?: (testimonial: any) => void
}

export const TestimonialGrid: React.FC<TestimonialGridProps> = ({
  testimonials,
  columns = 3,
  gap = 'gap-6',
  className = '',
  enableFilter = true,
  enableSort = true,
  onTestimonialSelect,
}) => {
  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'date'>('rating')
  const [selectedTestimonial, setSelectedTestimonial] = useState<string | null>(
    null
  )
  const gridRef = useRef<HTMLDivElement>(null)
  const { preferences } = useAccessibility()

  const isInView = useInView(gridRef, { once: true, amount: 0.1 })

  // Get unique categories
  const categories = [
    'all',
    ...new Set(testimonials.map(t => t.category).filter(Boolean)),
  ]

  // Filter and sort testimonials
  useEffect(() => {
    let filtered = [...testimonials]

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory)
    }

    // Sort testimonials
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'name':
          return a.name.localeCompare(b.name)
        case 'date':
          return b.id.localeCompare(a.id) // Using ID as date proxy
        default:
          return 0
      }
    })

    setFilteredTestimonials(filtered)
  }, [testimonials, selectedCategory, sortBy])

  // Handle testimonial selection
  const handleTestimonialSelect = useCallback(
    (testimonial: any) => {
      setSelectedTestimonial(testimonial.id)
      onTestimonialSelect?.(testimonial)
    },
    [onTestimonialSelect]
  )

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
    hidden: { opacity: 0, y: 50, scale: 0.95 },
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

  return (
    <div className={cn('w-full', className)}>
      {/* Filters and controls */}
      {(enableFilter || enableSort) && (
        <motion.div
          className='mb-8 flex flex-wrap items-center gap-4'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Category filter */}
          {enableFilter && (
            <div className='flex items-center gap-2'>
              <Filter className='h-4 w-4 text-muted-foreground' />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className='rounded-md border border-input bg-background px-3 py-1 text-sm'
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sort options */}
          {enableSort && (
            <div className='flex items-center gap-2'>
              <span className='text-sm text-muted-foreground'>Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className='rounded-md border border-input bg-background px-3 py-1 text-sm'
              >
                <option value='rating'>Rating</option>
                <option value='name'>Name</option>
                <option value='date'>Date</option>
              </select>
            </div>
          )}
        </motion.div>
      )}

      {/* Grid */}
      <motion.div
        ref={gridRef}
        className={cn(
          'grid',
          `grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`,
          gap
        )}
        variants={containerVariants}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        {filteredTestimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            variants={itemVariants}
            className='h-full'
          >
            <Card
              className={cn(
                'relative h-full cursor-pointer transition-all duration-300',
                'bg-gradient-to-br from-card to-card/80',
                'border border-border/50',
                'hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5',
                'hover:scale-105',
                selectedTestimonial === testimonial.id &&
                  'ring-2 ring-primary/20 shadow-primary/10'
              )}
              onClick={() => handleTestimonialSelect(testimonial)}
            >
              <CardContent className='p-6'>
                {/* Quote icon */}
                <motion.div
                  className='absolute top-4 right-4 text-primary/20'
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Quote className='h-6 w-6' />
                </motion.div>

                {/* Rating */}
                <motion.div
                  className='flex items-center gap-1 mb-4'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {renderStars(testimonial.rating)}
                </motion.div>

                {/* Content */}
                <motion.div
                  className='mb-6'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <p className='text-muted-foreground leading-relaxed line-clamp-4'>
                    "{testimonial.content}"
                  </p>
                </motion.div>

                {/* Author */}
                <motion.div
                  className='flex items-center gap-3'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <Avatar className='h-10 w-10'>
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback className='bg-primary/10 text-primary font-semibold'>
                      {testimonial.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className='flex-1 min-w-0'>
                    <h4 className='font-semibold text-foreground truncate'>
                      {testimonial.name}
                    </h4>
                    <p className='text-sm text-muted-foreground truncate'>
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
                    transition={{ delay: index * 0.1 + 0.6 }}
                  >
                    <Badge variant='secondary' className='text-xs'>
                      {testimonial.category}
                    </Badge>
                  </motion.div>
                )}

                {/* Featured indicator */}
                {testimonial.featured && (
                  <motion.div
                    className='absolute top-2 left-2'
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.7 }}
                  >
                    <Badge className='bg-yellow-500 text-yellow-900'>
                      Featured
                    </Badge>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* No results message */}
      {filteredTestimonials.length === 0 && (
        <motion.div
          className='text-center py-12'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className='text-muted-foreground'>
            No testimonials found for the selected criteria.
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default TestimonialGrid
