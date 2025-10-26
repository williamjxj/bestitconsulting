/**
 * Testimonial notifications component
 * Provides notification system for testimonials
 */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Bell,
  BellOff,
  Settings,
  CheckCircle,
  AlertTriangle,
  Star,
  User,
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  Shield,
  Zap,
} from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialNotificationsProps {
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
  showSettings?: boolean
  showHistory?: boolean
  showTemplates?: boolean
  onNotificationAction?: (action: string, data: any) => void
}

export const TestimonialNotifications: React.FC<
  TestimonialNotificationsProps
> = ({
  testimonials,
  className = '',
  showSettings = true,
  showHistory = true,
  showTemplates = true,
  onNotificationAction,
}) => {
  const [notifications, setNotifications] = useState({
    enabled: true,
    settings: {
      newTestimonial: true,
      ratingChange: true,
      featuredToggle: true,
      moderationRequired: true,
      weeklySummary: true,
      monthlyReport: false,
    },
    channels: {
      email: true,
      sms: false,
      push: true,
      webhook: false,
    },
    frequency: 'immediate',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00',
    },
  })

  const [notificationHistory, setNotificationHistory] = useState([
    {
      id: '1',
      type: 'new_testimonial',
      title: 'New Testimonial Received',
      message: 'John Doe from Acme Corp left a 5-star review',
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'high',
    },
    {
      id: '2',
      type: 'rating_change',
      title: 'Rating Updated',
      message: 'Jane Smith updated their rating from 4 to 5 stars',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: true,
      priority: 'medium',
    },
    {
      id: '3',
      type: 'moderation_required',
      title: 'Moderation Required',
      message: 'A new testimonial requires moderation',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: false,
      priority: 'high',
    },
  ])

  const [selectedNotification, setSelectedNotification] = useState<
    string | null
  >(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const { preferences } = useAccessibility()

  // Handle notification toggle
  const handleNotificationToggle = useCallback(
    async (type: string, value: boolean) => {
      setIsUpdating(true)

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))

        setNotifications(prev => ({
          ...prev,
          settings: {
            ...prev.settings,
            [type]: value,
          },
        }))

        onNotificationAction?.('settings_update', { type, value })
      } catch (error) {
        console.error('Notification toggle failed:', error)
      } finally {
        setIsUpdating(false)
      }
    },
    [onNotificationAction]
  )

  // Handle channel toggle
  const handleChannelToggle = useCallback(
    async (channel: string, value: boolean) => {
      setIsUpdating(true)

      try {
        await new Promise(resolve => setTimeout(resolve, 500))

        setNotifications(prev => ({
          ...prev,
          channels: {
            ...prev.channels,
            [channel]: value,
          },
        }))

        onNotificationAction?.('channel_update', { channel, value })
      } catch (error) {
        console.error('Channel toggle failed:', error)
      } finally {
        setIsUpdating(false)
      }
    },
    [onNotificationAction]
  )

  // Mark notification as read
  const markAsRead = useCallback((notificationId: string) => {
    setNotificationHistory(prev =>
      prev.map(n => (n.id === notificationId ? { ...n, read: true } : n))
    )
  }, [])

  // Get notification icon
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_testimonial':
        return <User className='h-4 w-4 text-blue-500' />
      case 'rating_change':
        return <Star className='h-4 w-4 text-yellow-500' />
      case 'moderation_required':
        return <Shield className='h-4 w-4 text-red-500' />
      case 'featured_toggle':
        return <Zap className='h-4 w-4 text-purple-500' />
      default:
        return <Bell className='h-4 w-4 text-gray-500' />
    }
  }

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-700 border-red-500/20'
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20'
      case 'low':
        return 'bg-green-500/10 text-green-700 border-green-500/20'
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
        {/* Notification settings */}
        {showSettings && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Settings className='h-5 w-5' />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  {/* Global toggle */}
                  <div className='flex items-center justify-between p-4 border rounded-lg'>
                    <div className='flex items-center gap-3'>
                      <Bell className='h-5 w-5' />
                      <div>
                        <h4 className='font-medium'>Enable Notifications</h4>
                        <p className='text-sm text-muted-foreground'>
                          Receive notifications for testimonial activities
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={notifications.enabled ? 'default' : 'outline'}
                      size='sm'
                      onClick={() =>
                        setNotifications(prev => ({
                          ...prev,
                          enabled: !prev.enabled,
                        }))
                      }
                      disabled={isUpdating}
                    >
                      {notifications.enabled ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>

                  {/* Notification types */}
                  <div className='space-y-4'>
                    <h4 className='font-medium'>Notification Types</h4>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {[
                        {
                          key: 'newTestimonial',
                          label: 'New Testimonial',
                          description: 'When a new testimonial is received',
                        },
                        {
                          key: 'ratingChange',
                          label: 'Rating Change',
                          description: 'When a rating is updated',
                        },
                        {
                          key: 'featuredToggle',
                          label: 'Featured Toggle',
                          description: 'When testimonials are featured',
                        },
                        {
                          key: 'moderationRequired',
                          label: 'Moderation Required',
                          description: 'When moderation is needed',
                        },
                        {
                          key: 'weeklySummary',
                          label: 'Weekly Summary',
                          description: 'Weekly testimonial summary',
                        },
                        {
                          key: 'monthlyReport',
                          label: 'Monthly Report',
                          description: 'Monthly analytics report',
                        },
                      ].map(({ key, label, description }) => (
                        <div
                          key={key}
                          className='flex items-center justify-between p-3 border rounded-lg'
                        >
                          <div>
                            <h5 className='font-medium'>{label}</h5>
                            <p className='text-sm text-muted-foreground'>
                              {description}
                            </p>
                          </div>
                          <Button
                            variant={
                              notifications.settings[
                                key as keyof typeof notifications.settings
                              ]
                                ? 'default'
                                : 'outline'
                            }
                            size='sm'
                            onClick={() =>
                              handleNotificationToggle(
                                key,
                                !notifications.settings[
                                  key as keyof typeof notifications.settings
                                ]
                              )
                            }
                            disabled={isUpdating}
                          >
                            {notifications.settings[
                              key as keyof typeof notifications.settings
                            ]
                              ? 'On'
                              : 'Off'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notification channels */}
                  <div className='space-y-4'>
                    <h4 className='font-medium'>Notification Channels</h4>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {[
                        {
                          key: 'email',
                          label: 'Email',
                          description: 'Send notifications via email',
                          icon: Mail,
                        },
                        {
                          key: 'sms',
                          label: 'SMS',
                          description: 'Send notifications via SMS',
                          icon: Phone,
                        },
                        {
                          key: 'push',
                          label: 'Push',
                          description: 'Send push notifications',
                          icon: Bell,
                        },
                        {
                          key: 'webhook',
                          label: 'Webhook',
                          description: 'Send to webhook URL',
                          icon: Zap,
                        },
                      ].map(({ key, label, description, icon: Icon }) => (
                        <div
                          key={key}
                          className='flex items-center justify-between p-3 border rounded-lg'
                        >
                          <div className='flex items-center gap-3'>
                            <Icon className='h-4 w-4' />
                            <div>
                              <h5 className='font-medium'>{label}</h5>
                              <p className='text-sm text-muted-foreground'>
                                {description}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant={
                              notifications.channels[
                                key as keyof typeof notifications.channels
                              ]
                                ? 'default'
                                : 'outline'
                            }
                            size='sm'
                            onClick={() =>
                              handleChannelToggle(
                                key,
                                !notifications.channels[
                                  key as keyof typeof notifications.channels
                                ]
                              )
                            }
                            disabled={isUpdating}
                          >
                            {notifications.channels[
                              key as keyof typeof notifications.channels
                            ]
                              ? 'On'
                              : 'Off'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Notification history */}
        {showHistory && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <MessageSquare className='h-5 w-5' />
                  Notification History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {notificationHistory.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      className={cn(
                        'flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-200',
                        'hover:bg-muted/50',
                        !notification.read && 'bg-blue-50 border-blue-200',
                        selectedNotification === notification.id &&
                          'ring-2 ring-primary/20'
                      )}
                      onClick={() => {
                        setSelectedNotification(
                          selectedNotification === notification.id
                            ? null
                            : notification.id
                        )
                        if (!notification.read) {
                          markAsRead(notification.id)
                        }
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className='flex items-center gap-3'>
                        {getNotificationIcon(notification.type)}
                        <div>
                          <h4 className='font-medium'>{notification.title}</h4>
                          <p className='text-sm text-muted-foreground'>
                            {notification.message}
                          </p>
                          <p className='text-xs text-muted-foreground mt-1'>
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Badge
                          className={getPriorityColor(notification.priority)}
                        >
                          {notification.priority}
                        </Badge>
                        {!notification.read && (
                          <div className='h-2 w-2 bg-blue-500 rounded-full' />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Notification templates */}
        {showTemplates && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Mail className='h-5 w-5' />
                  Notification Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {[
                    {
                      type: 'new_testimonial',
                      title: 'New Testimonial Template',
                      subject: 'New testimonial from {{name}}',
                      body: 'You have received a new {{rating}}-star testimonial from {{name}} at {{company}}.',
                    },
                    {
                      type: 'rating_change',
                      title: 'Rating Change Template',
                      subject: 'Rating updated by {{name}}',
                      body: '{{name}} has updated their rating from {{oldRating}} to {{newRating}} stars.',
                    },
                    {
                      type: 'moderation_required',
                      title: 'Moderation Required Template',
                      subject: 'Testimonial requires moderation',
                      body: 'A new testimonial from {{name}} requires moderation before it can be published.',
                    },
                  ].map((template, index) => (
                    <motion.div
                      key={template.type}
                      className='p-4 border rounded-lg'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className='font-medium mb-2'>{template.title}</h4>
                      <div className='space-y-2'>
                        <div>
                          <label className='text-sm font-medium'>
                            Subject:
                          </label>
                          <p className='text-sm text-muted-foreground'>
                            {template.subject}
                          </p>
                        </div>
                        <div>
                          <label className='text-sm font-medium'>Body:</label>
                          <p className='text-sm text-muted-foreground'>
                            {template.body}
                          </p>
                        </div>
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

export default TestimonialNotifications
