/**
 * Testimonial integration component
 * Provides integration with external services and APIs
 */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ExternalLink,
  Code,
  Database,
  Zap,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialIntegrationProps {
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
  showAPIs?: boolean
  showWebhooks?: boolean
  showEmbed?: boolean
  showSecurity?: boolean
}

export const TestimonialIntegration: React.FC<TestimonialIntegrationProps> = ({
  testimonials,
  className = '',
  showAPIs = true,
  showWebhooks = true,
  showEmbed = true,
  showSecurity = true,
}) => {
  const [integrations, setIntegrations] = useState({
    apis: [] as Array<{
      name: string
      status: 'connected' | 'disconnected' | 'error'
      description: string
    }>,
    webhooks: [] as Array<{
      name: string
      status: 'active' | 'inactive' | 'error'
      description: string
    }>,
    embeds: [] as Array<{
      name: string
      status: 'active' | 'inactive' | 'error'
      description: string
    }>,
    security: {
      encryption: 'enabled',
      authentication: 'oauth2',
      rateLimit: '1000/hour',
      dataRetention: '2 years',
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(
    null
  )
  const { preferences } = useAccessibility()

  // Initialize integrations
  useEffect(() => {
    setIntegrations({
      apis: [
        {
          name: 'Google Reviews',
          status: 'connected',
          description: 'Sync testimonials from Google Reviews',
        },
        {
          name: 'Trustpilot',
          status: 'connected',
          description: 'Import reviews from Trustpilot',
        },
        {
          name: 'Yelp',
          status: 'disconnected',
          description: 'Connect to Yelp for business reviews',
        },
        {
          name: 'Facebook',
          status: 'error',
          description: 'Facebook reviews integration',
        },
        {
          name: 'Custom API',
          status: 'disconnected',
          description: 'Connect to your custom testimonial API',
        },
      ],
      webhooks: [
        {
          name: 'New Testimonial',
          status: 'active',
          description: 'Notify when new testimonials are added',
        },
        {
          name: 'Rating Update',
          status: 'active',
          description: 'Alert when ratings change',
        },
        {
          name: 'Featured Toggle',
          status: 'inactive',
          description: 'Notify when testimonials are featured',
        },
        {
          name: 'Category Change',
          status: 'error',
          description: 'Alert when categories are updated',
        },
      ],
      embeds: [
        {
          name: 'Website Widget',
          status: 'active',
          description: 'Embed testimonials on your website',
        },
        {
          name: 'Social Media',
          status: 'active',
          description: 'Share testimonials on social platforms',
        },
        {
          name: 'Email Signature',
          status: 'inactive',
          description: 'Include testimonials in email signatures',
        },
        {
          name: 'PDF Export',
          status: 'active',
          description: 'Generate PDF reports with testimonials',
        },
      ],
      security: {
        encryption: 'enabled',
        authentication: 'oauth2',
        rateLimit: '1000/hour',
        dataRetention: '2 years',
      },
    })
  }, [])

  // Handle integration toggle
  const handleIntegrationToggle = useCallback(
    async (type: string, name: string) => {
      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        setIntegrations(prev => ({
          ...prev,
          [type]: prev[type as keyof typeof prev].map((item: any) =>
            item.name === name
              ? {
                  ...item,
                  status:
                    item.status === 'active' || item.status === 'connected'
                      ? 'inactive'
                      : 'active',
                }
              : item
          ),
        }))
      } catch (error) {
        console.error('Integration toggle failed:', error)
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return <CheckCircle className='h-4 w-4 text-green-500' />
      case 'disconnected':
      case 'inactive':
        return <AlertCircle className='h-4 w-4 text-yellow-500' />
      case 'error':
        return <AlertCircle className='h-4 w-4 text-red-500' />
      default:
        return <AlertCircle className='h-4 w-4 text-gray-500' />
    }
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return 'bg-green-500/10 text-green-700 border-green-500/20'
      case 'disconnected':
      case 'inactive':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20'
      case 'error':
        return 'bg-red-500/10 text-red-700 border-red-500/20'
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
        {/* API Integrations */}
        {showAPIs && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Code className='h-5 w-5' />
                  API Integrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {integrations.apis.map((api, index) => (
                    <motion.div
                      key={api.name}
                      className='flex items-center justify-between p-4 border rounded-lg'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className='flex items-center gap-3'>
                        {getStatusIcon(api.status)}
                        <div>
                          <h4 className='font-medium'>{api.name}</h4>
                          <p className='text-sm text-muted-foreground'>
                            {api.description}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Badge className={getStatusColor(api.status)}>
                          {api.status}
                        </Badge>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() =>
                            handleIntegrationToggle('apis', api.name)
                          }
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className='h-4 w-4 animate-spin' />
                          ) : (
                            'Toggle'
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Webhooks */}
        {showWebhooks && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Zap className='h-5 w-5' />
                  Webhooks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {integrations.webhooks.map((webhook, index) => (
                    <motion.div
                      key={webhook.name}
                      className='flex items-center justify-between p-4 border rounded-lg'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className='flex items-center gap-3'>
                        {getStatusIcon(webhook.status)}
                        <div>
                          <h4 className='font-medium'>{webhook.name}</h4>
                          <p className='text-sm text-muted-foreground'>
                            {webhook.description}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Badge className={getStatusColor(webhook.status)}>
                          {webhook.status}
                        </Badge>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() =>
                            handleIntegrationToggle('webhooks', webhook.name)
                          }
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className='h-4 w-4 animate-spin' />
                          ) : (
                            'Toggle'
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Embed Options */}
        {showEmbed && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <ExternalLink className='h-5 w-5' />
                  Embed Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {integrations.embeds.map((embed, index) => (
                    <motion.div
                      key={embed.name}
                      className='flex items-center justify-between p-4 border rounded-lg'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className='flex items-center gap-3'>
                        {getStatusIcon(embed.status)}
                        <div>
                          <h4 className='font-medium'>{embed.name}</h4>
                          <p className='text-sm text-muted-foreground'>
                            {embed.description}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Badge className={getStatusColor(embed.status)}>
                          {embed.status}
                        </Badge>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() =>
                            handleIntegrationToggle('embeds', embed.name)
                          }
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className='h-4 w-4 animate-spin' />
                          ) : (
                            'Toggle'
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Security Settings */}
        {showSecurity && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Shield className='h-5 w-5' />
                  Security & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between p-3 border rounded-lg'>
                      <div className='flex items-center gap-2'>
                        <Shield className='h-4 w-4 text-green-500' />
                        <span className='font-medium'>Encryption</span>
                      </div>
                      <Badge className='bg-green-500/10 text-green-700 border-green-500/20'>
                        {integrations.security.encryption}
                      </Badge>
                    </div>
                    <div className='flex items-center justify-between p-3 border rounded-lg'>
                      <div className='flex items-center gap-2'>
                        <Database className='h-4 w-4 text-blue-500' />
                        <span className='font-medium'>Authentication</span>
                      </div>
                      <Badge className='bg-blue-500/10 text-blue-700 border-blue-500/20'>
                        {integrations.security.authentication}
                      </Badge>
                    </div>
                  </div>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between p-3 border rounded-lg'>
                      <div className='flex items-center gap-2'>
                        <Zap className='h-4 w-4 text-yellow-500' />
                        <span className='font-medium'>Rate Limit</span>
                      </div>
                      <Badge className='bg-yellow-500/10 text-yellow-700 border-yellow-500/20'>
                        {integrations.security.rateLimit}
                      </Badge>
                    </div>
                    <div className='flex items-center justify-between p-3 border rounded-lg'>
                      <div className='flex items-center gap-2'>
                        <Database className='h-4 w-4 text-purple-500' />
                        <span className='font-medium'>Data Retention</span>
                      </div>
                      <Badge className='bg-purple-500/10 text-purple-700 border-purple-500/20'>
                        {integrations.security.dataRetention}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Integration Code Examples */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Code className='h-5 w-5' />
                Integration Examples
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <h4 className='font-medium mb-2'>API Endpoint</h4>
                  <div className='bg-muted p-3 rounded-lg font-mono text-sm'>
                    GET /api/testimonials?limit=10&rating=5
                  </div>
                </div>
                <div>
                  <h4 className='font-medium mb-2'>Webhook URL</h4>
                  <div className='bg-muted p-3 rounded-lg font-mono text-sm'>
                    POST /api/webhooks/testimonials
                  </div>
                </div>
                <div>
                  <h4 className='font-medium mb-2'>Embed Code</h4>
                  <div className='bg-muted p-3 rounded-lg font-mono text-sm'>
                    {`<script src="https://your-domain.com/widget.js"></script>`}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default TestimonialIntegration
