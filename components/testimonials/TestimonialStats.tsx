/**
 * Testimonial stats component
 * Displays statistics and metrics for testimonials
 */

'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Users, TrendingUp, Award } from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialStatsProps {
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
  className?: string
  showTrends?: boolean
  showCategories?: boolean
  showRatings?: boolean
}

export const TestimonialStats: React.FC<TestimonialStatsProps> = ({
  testimonials,
  className = '',
  showTrends = true,
  showCategories = true,
  showRatings = true,
}) => {
  const [stats, setStats] = useState({
    total: 0,
    averageRating: 0,
    featuredCount: 0,
    categories: [] as Array<{ name: string; count: number }>,
    ratingDistribution: [] as Array<{ rating: number; count: number }>,
  })

  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(statsRef, { once: true, amount: 0.1 })
  const { preferences } = useAccessibility()

  // Calculate stats
  useEffect(() => {
    if (!testimonials.length) return

    const total = testimonials.length
    const averageRating =
      testimonials.reduce((sum, t) => sum + t.rating, 0) / total
    const featuredCount = testimonials.filter(t => t.featured).length

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

    // Rating distribution
    const ratingMap = new Map<number, number>()
    testimonials.forEach(t => {
      ratingMap.set(t.rating, (ratingMap.get(t.rating) || 0) + 1)
    })
    const ratingDistribution = Array.from(ratingMap.entries())
      .map(([rating, count]) => ({ rating, count }))
      .sort((a, b) => b.rating - a.rating)

    setStats({
      total,
      averageRating,
      featuredCount,
      categories,
      ratingDistribution,
    })
  }, [testimonials])

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

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  // Animated counter component
  const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({
    value,
    duration = 1,
  }) => {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
      if (!isInView || preferences.reducedMotion) {
        setDisplayValue(value)
        return
      }

      const startTime = Date.now()
      const startValue = 0

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / (duration * 1000), 1)
        const currentValue = startValue + (value - startValue) * progress

        setDisplayValue(Math.floor(currentValue))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, [value, duration, isInView, preferences.reducedMotion])

    return <span>{displayValue}</span>
  }

  return (
    <div ref={statsRef} className={cn('w-full', className)}>
      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
        variants={containerVariants}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Total testimonials */}
        <motion.div variants={itemVariants}>
          <Card className='h-full'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Total Testimonials
                  </p>
                  <motion.p
                    className='text-3xl font-bold text-foreground'
                    variants={numberVariants}
                    initial='hidden'
                    animate={isInView ? 'visible' : 'hidden'}
                  >
                    <AnimatedCounter value={stats.total} />
                  </motion.p>
                </div>
                <Users className='h-8 w-8 text-primary' />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Average rating */}
        <motion.div variants={itemVariants}>
          <Card className='h-full'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Average Rating
                  </p>
                  <motion.p
                    className='text-3xl font-bold text-foreground'
                    variants={numberVariants}
                    initial='hidden'
                    animate={isInView ? 'visible' : 'hidden'}
                  >
                    <AnimatedCounter
                      value={stats.averageRating}
                      duration={1.5}
                    />
                  </motion.p>
                  <div className='flex items-center gap-1 mt-1'>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i < Math.floor(stats.averageRating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                </div>
                <Star className='h-8 w-8 text-primary' />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured count */}
        <motion.div variants={itemVariants}>
          <Card className='h-full'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>Featured</p>
                  <motion.p
                    className='text-3xl font-bold text-foreground'
                    variants={numberVariants}
                    initial='hidden'
                    animate={isInView ? 'visible' : 'hidden'}
                  >
                    <AnimatedCounter value={stats.featuredCount} />
                  </motion.p>
                </div>
                <Award className='h-8 w-8 text-primary' />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Categories count */}
        <motion.div variants={itemVariants}>
          <Card className='h-full'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>Categories</p>
                  <motion.p
                    className='text-3xl font-bold text-foreground'
                    variants={numberVariants}
                    initial='hidden'
                    animate={isInView ? 'visible' : 'hidden'}
                  >
                    <AnimatedCounter value={stats.categories.length} />
                  </motion.p>
                </div>
                <TrendingUp className='h-8 w-8 text-primary' />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Detailed stats */}
      {(showCategories || showRatings) && (
        <motion.div
          className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6'
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Category distribution */}
          {showCategories && stats.categories.length > 0 && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {stats.categories.map((category, index) => (
                      <motion.div
                        key={category.name}
                        className='flex items-center justify-between'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <Badge variant='secondary'>{category.name}</Badge>
                        <span className='text-sm text-muted-foreground'>
                          {category.count}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Rating distribution */}
          {showRatings && stats.ratingDistribution.length > 0 && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Rating Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {stats.ratingDistribution.map((rating, index) => (
                      <motion.div
                        key={rating.rating}
                        className='flex items-center justify-between'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <div className='flex items-center gap-2'>
                          <span className='text-sm font-medium'>
                            {rating.rating} stars
                          </span>
                          <div className='flex items-center gap-1'>
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  'h-3 w-3',
                                  i < rating.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <span className='text-sm text-muted-foreground'>
                          {rating.count}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default TestimonialStats
