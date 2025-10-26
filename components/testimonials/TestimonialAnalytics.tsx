/**
 * Testimonial analytics component
 * Displays analytics and insights for testimonials
 */

'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  TrendingUp,
  Star,
  Users,
  Calendar,
  Award,
  Filter,
  Download,
} from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialAnalyticsProps {
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
  showCharts?: boolean
  showTrends?: boolean
  showInsights?: boolean
  showExport?: boolean
}

export const TestimonialAnalytics: React.FC<TestimonialAnalyticsProps> = ({
  testimonials,
  className = '',
  showCharts = true,
  showTrends = true,
  showInsights = true,
  showExport = true,
}) => {
  const [analytics, setAnalytics] = useState({
    total: 0,
    averageRating: 0,
    featuredCount: 0,
    categories: [] as Array<{
      name: string
      count: number
      percentage: number
    }>,
    ratingDistribution: [] as Array<{
      rating: number
      count: number
      percentage: number
    }>,
    monthlyTrends: [] as Array<{ month: string; count: number }>,
    topCompanies: [] as Array<{ company: string; count: number }>,
    insights: [] as string[],
  })

  const [selectedTimeRange, setSelectedTimeRange] = useState<
    'all' | '3m' | '6m' | '1y'
  >('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const analyticsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(analyticsRef, { once: true, amount: 0.1 })
  const { preferences } = useAccessibility()

  // Calculate analytics
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
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count)

    // Rating distribution
    const ratingMap = new Map<number, number>()
    testimonials.forEach(t => {
      ratingMap.set(t.rating, (ratingMap.get(t.rating) || 0) + 1)
    })
    const ratingDistribution = Array.from(ratingMap.entries())
      .map(([rating, count]) => ({
        rating,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.rating - a.rating)

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

    // Generate insights
    const insights = []
    if (averageRating >= 4.5) insights.push('Excellent average rating!')
    if (featuredCount > 0)
      insights.push(`${featuredCount} featured testimonials`)
    if (categories.length > 3)
      insights.push(`Diverse feedback across ${categories.length} categories`)
    if (topCompanies.length > 0)
      insights.push(`Strong representation from ${topCompanies[0].company}`)

    setAnalytics({
      total,
      averageRating,
      featuredCount,
      categories,
      ratingDistribution,
      monthlyTrends,
      topCompanies,
      insights,
    })
  }, [testimonials])

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
    <div ref={analyticsRef} className={cn('w-full', className)}>
      <motion.div
        className='space-y-6'
        variants={containerVariants}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Overview cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <motion.div variants={itemVariants}>
            <Card className='h-full'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Total Testimonials
                    </p>
                    <motion.p className='text-3xl font-bold text-foreground'>
                      <AnimatedCounter value={analytics.total} />
                    </motion.p>
                  </div>
                  <Users className='h-8 w-8 text-primary' />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className='h-full'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Average Rating
                    </p>
                    <motion.p className='text-3xl font-bold text-foreground'>
                      <AnimatedCounter
                        value={analytics.averageRating}
                        duration={1.5}
                      />
                    </motion.p>
                    <div className='flex items-center gap-1 mt-1'>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-4 w-4',
                            i < Math.floor(analytics.averageRating)
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

          <motion.div variants={itemVariants}>
            <Card className='h-full'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-muted-foreground'>Featured</p>
                    <motion.p className='text-3xl font-bold text-foreground'>
                      <AnimatedCounter value={analytics.featuredCount} />
                    </motion.p>
                  </div>
                  <Award className='h-8 w-8 text-primary' />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className='h-full'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-muted-foreground'>Categories</p>
                    <motion.p className='text-3xl font-bold text-foreground'>
                      <AnimatedCounter value={analytics.categories.length} />
                    </motion.p>
                  </div>
                  <BarChart3 className='h-8 w-8 text-primary' />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts and detailed analytics */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Rating distribution */}
          {showCharts && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Star className='h-5 w-5' />
                    Rating Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {analytics.ratingDistribution.map((rating, index) => (
                      <div key={rating.rating} className='space-y-2'>
                        <div className='flex items-center justify-between'>
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
                            {rating.count} ({rating.percentage}%)
                          </span>
                        </div>
                        <div className='w-full bg-muted rounded-full h-2'>
                          <motion.div
                            className='bg-primary h-2 rounded-full'
                            initial={{ width: 0 }}
                            animate={{ width: `${rating.percentage}%` }}
                            transition={{
                              delay: index * 0.1 + 0.5,
                              duration: 0.8,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Category distribution */}
          {showCharts && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <BarChart3 className='h-5 w-5' />
                    Category Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {analytics.categories.map((category, index) => (
                      <div key={category.name} className='space-y-2'>
                        <div className='flex items-center justify-between'>
                          <Badge variant='secondary'>{category.name}</Badge>
                          <span className='text-sm text-muted-foreground'>
                            {category.count} ({category.percentage}%)
                          </span>
                        </div>
                        <div className='w-full bg-muted rounded-full h-2'>
                          <motion.div
                            className='bg-primary h-2 rounded-full'
                            initial={{ width: 0 }}
                            animate={{ width: `${category.percentage}%` }}
                            transition={{
                              delay: index * 0.1 + 0.5,
                              duration: 0.8,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Top companies */}
        {showTrends && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <TrendingUp className='h-5 w-5' />
                  Top Companies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {analytics.topCompanies.map((company, index) => (
                    <motion.div
                      key={company.company}
                      className='flex items-center justify-between p-3 rounded-lg bg-muted/50'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <span className='font-medium'>{company.company}</span>
                      <Badge variant='secondary'>
                        {company.count} testimonials
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Insights */}
        {showInsights && analytics.insights.length > 0 && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Award className='h-5 w-5' />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {analytics.insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      className='flex items-center gap-2 p-3 rounded-lg bg-primary/10'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <Award className='h-4 w-4 text-primary' />
                      <span className='text-sm font-medium'>{insight}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Export analytics */}
        {showExport && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Download className='h-5 w-5' />
                  Export Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  <Button variant='outline' size='sm'>
                    <Download className='h-4 w-4 mr-2' />
                    Export CSV
                  </Button>
                  <Button variant='outline' size='sm'>
                    <BarChart3 className='h-4 w-4 mr-2' />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default TestimonialAnalytics
