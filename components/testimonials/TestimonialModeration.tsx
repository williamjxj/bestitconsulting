/**
 * Testimonial moderation component
 * Provides moderation tools for testimonials
 */

'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Flag,
  User,
  Calendar,
  Star,
  MessageSquare,
} from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialModerationProps {
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
    moderation?: {
      flagged: boolean
      reason?: string
      moderator?: string
      date?: string
    }
  }>
  className?: string
  showFilters?: boolean
  showActions?: boolean
  showHistory?: boolean
  onModerationAction?: (
    testimonialId: string,
    action: string,
    reason?: string
  ) => void
}

export const TestimonialModeration: React.FC<TestimonialModerationProps> = ({
  testimonials,
  className = '',
  showFilters = true,
  showActions = true,
  showHistory = true,
  onModerationAction,
}) => {
  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedTestimonial, setSelectedTestimonial] = useState<string | null>(
    null
  )
  const [moderationReason, setModerationReason] = useState('')
  const [isModerating, setIsModerating] = useState(false)

  const { preferences } = useAccessibility()

  // Filter testimonials
  useEffect(() => {
    let filtered = [...testimonials]

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(t => t.status === selectedStatus)
    }

    setFilteredTestimonials(filtered)
  }, [testimonials, selectedStatus])

  // Handle moderation action
  const handleModerationAction = useCallback(
    async (
      testimonialId: string,
      action: 'approve' | 'reject' | 'flag' | 'unflag',
      reason?: string
    ) => {
      setIsModerating(true)

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        onModerationAction?.(testimonialId, action, reason)

        // Update local state
        setFilteredTestimonials(prev =>
          prev.map(t =>
            t.id === testimonialId
              ? {
                  ...t,
                  status:
                    action === 'approve'
                      ? 'approved'
                      : action === 'reject'
                        ? 'rejected'
                        : t.status,
                  moderation: {
                    ...t.moderation,
                    flagged: action === 'flag',
                    reason: reason || t.moderation?.reason,
                    moderator: 'Current User',
                    date: new Date().toISOString(),
                  },
                }
              : t
          )
        )
      } catch (error) {
        console.error('Moderation action failed:', error)
      } finally {
        setIsModerating(false)
      }
    },
    [onModerationAction]
  )

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
        return <AlertTriangle className='h-4 w-4 text-yellow-500' />
      default:
        return <Eye className='h-4 w-4 text-gray-500' />
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
        {/* Filters */}
        {showFilters && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Shield className='h-5 w-5' />
                  Moderation Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {[
                    { key: 'all', label: 'All', count: testimonials.length },
                    {
                      key: 'pending',
                      label: 'Pending',
                      count: testimonials.filter(t => t.status === 'pending')
                        .length,
                    },
                    {
                      key: 'approved',
                      label: 'Approved',
                      count: testimonials.filter(t => t.status === 'approved')
                        .length,
                    },
                    {
                      key: 'rejected',
                      label: 'Rejected',
                      count: testimonials.filter(t => t.status === 'rejected')
                        .length,
                    },
                    {
                      key: 'flagged',
                      label: 'Flagged',
                      count: testimonials.filter(t => t.status === 'flagged')
                        .length,
                    },
                  ].map(({ key, label, count }) => (
                    <Button
                      key={key}
                      variant={selectedStatus === key ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => setSelectedStatus(key)}
                      className='flex items-center gap-2'
                    >
                      {label}
                      <Badge variant='secondary' className='ml-1'>
                        {count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Testimonials list */}
        <div className='space-y-4'>
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className='relative'
            >
              <Card
                className={cn(
                  'transition-all duration-300',
                  selectedTestimonial === testimonial.id &&
                    'ring-2 ring-primary/20',
                  testimonial.status === 'flagged' && 'border-yellow-500/50',
                  testimonial.status === 'rejected' && 'border-red-500/50'
                )}
              >
                <CardContent className='p-6'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      {/* Header */}
                      <div className='flex items-center gap-3 mb-4'>
                        {getStatusIcon(testimonial.status || 'pending')}
                        <div className='flex-1'>
                          <h4 className='font-semibold'>{testimonial.name}</h4>
                          <p className='text-sm text-muted-foreground'>
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                        <Badge
                          className={getStatusColor(
                            testimonial.status || 'pending'
                          )}
                        >
                          {testimonial.status || 'pending'}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className='mb-4'>
                        <p className='text-muted-foreground leading-relaxed'>
                          "{testimonial.content}"
                        </p>
                      </div>

                      {/* Rating */}
                      <div className='flex items-center gap-2 mb-4'>
                        <div className='flex items-center gap-1'>
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'h-4 w-4',
                                i < testimonial.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              )}
                            />
                          ))}
                        </div>
                        <span className='text-sm text-muted-foreground'>
                          {testimonial.rating}/5
                        </span>
                      </div>

                      {/* Moderation info */}
                      {testimonial.moderation && (
                        <div className='bg-muted/50 p-3 rounded-lg mb-4'>
                          <div className='flex items-center gap-2 mb-2'>
                            <Flag className='h-4 w-4 text-yellow-500' />
                            <span className='text-sm font-medium'>
                              Moderation Details
                            </span>
                          </div>
                          {testimonial.moderation.reason && (
                            <p className='text-sm text-muted-foreground mb-2'>
                              Reason: {testimonial.moderation.reason}
                            </p>
                          )}
                          <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                            <span>
                              Moderator: {testimonial.moderation.moderator}
                            </span>
                            <span>Date: {testimonial.moderation.date}</span>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      {showActions && (
                        <div className='flex items-center gap-2'>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() =>
                              handleModerationAction(testimonial.id, 'approve')
                            }
                            disabled={
                              isModerating || testimonial.status === 'approved'
                            }
                            className='text-green-600 hover:text-green-700'
                          >
                            <CheckCircle className='h-4 w-4 mr-1' />
                            Approve
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() =>
                              handleModerationAction(
                                testimonial.id,
                                'reject',
                                moderationReason
                              )
                            }
                            disabled={
                              isModerating || testimonial.status === 'rejected'
                            }
                            className='text-red-600 hover:text-red-700'
                          >
                            <XCircle className='h-4 w-4 mr-1' />
                            Reject
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() =>
                              handleModerationAction(
                                testimonial.id,
                                'flag',
                                moderationReason
                              )
                            }
                            disabled={
                              isModerating || testimonial.status === 'flagged'
                            }
                            className='text-yellow-600 hover:text-yellow-700'
                          >
                            <Flag className='h-4 w-4 mr-1' />
                            Flag
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() =>
                              setSelectedTestimonial(
                                selectedTestimonial === testimonial.id
                                  ? null
                                  : testimonial.id
                              )
                            }
                            className='text-blue-600 hover:text-blue-700'
                          >
                            <Eye className='h-4 w-4 mr-1' />
                            {selectedTestimonial === testimonial.id
                              ? 'Hide'
                              : 'View'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Moderation reason input */}
        {showActions && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <MessageSquare className='h-5 w-5' />
                  Moderation Reason
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <textarea
                    placeholder='Enter reason for moderation action...'
                    value={moderationReason}
                    onChange={e => setModerationReason(e.target.value)}
                    className='w-full p-3 border border-input rounded-lg bg-background text-sm resize-none'
                    rows={3}
                  />
                  <div className='flex items-center gap-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => setModerationReason('')}
                    >
                      Clear
                    </Button>
                    <Button
                      size='sm'
                      onClick={() => {
                        // Apply reason to selected testimonial
                        if (selectedTestimonial) {
                          handleModerationAction(
                            selectedTestimonial,
                            'flag',
                            moderationReason
                          )
                        }
                      }}
                      disabled={!selectedTestimonial || !moderationReason}
                    >
                      Apply Reason
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Moderation history */}
        {showHistory && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Calendar className='h-5 w-5' />
                  Moderation History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {testimonials
                    .filter(t => t.moderation)
                    .slice(0, 5)
                    .map((testimonial, index) => (
                      <motion.div
                        key={testimonial.id}
                        className='flex items-center justify-between p-3 border rounded-lg'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className='flex items-center gap-3'>
                          {getStatusIcon(testimonial.status || 'pending')}
                          <div>
                            <h4 className='font-medium'>{testimonial.name}</h4>
                            <p className='text-sm text-muted-foreground'>
                              {testimonial.moderation?.reason}
                            </p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <p className='text-sm font-medium'>
                            {testimonial.moderation?.moderator}
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            {testimonial.moderation?.date}
                          </p>
                        </div>
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

export default TestimonialModeration
