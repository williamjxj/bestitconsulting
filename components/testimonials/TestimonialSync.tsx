/**
 * Testimonial sync component
 * Provides synchronization with external platforms
 */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Database,
  Cloud,
  Shield,
  Zap,
  Clock,
  User,
  Star,
  MessageSquare,
} from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialSyncProps {
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
  showPlatforms?: boolean
  showSchedule?: boolean
  showStatus?: boolean
  onSyncAction?: (action: string, data: any) => void
}

export const TestimonialSync: React.FC<TestimonialSyncProps> = ({
  testimonials,
  className = '',
  showPlatforms = true,
  showSchedule = true,
  showStatus = true,
  onSyncAction,
}) => {
  const [syncStatus, setSyncStatus] = useState({
    lastSync: new Date().toISOString(),
    nextSync: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    syncCount: 24,
    status: 'healthy' as 'healthy' | 'warning' | 'error',
  })

  const [platforms, setPlatforms] = useState([
    {
      id: 'google',
      name: 'Google Reviews',
      status: 'connected',
      lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      syncCount: 15,
      description: 'Sync testimonials from Google Reviews',
    },
    {
      id: 'trustpilot',
      name: 'Trustpilot',
      status: 'connected',
      lastSync: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      syncCount: 8,
      description: 'Import reviews from Trustpilot',
    },
    {
      id: 'yelp',
      name: 'Yelp',
      status: 'disconnected',
      lastSync: null,
      syncCount: 0,
      description: 'Connect to Yelp for business reviews',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      status: 'error',
      lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      syncCount: 3,
      description: 'Facebook reviews integration',
    },
  ])

  const [syncSettings, setSyncSettings] = useState({
    frequency: 'hourly' as 'realtime' | 'hourly' | 'daily' | 'weekly',
    autoSync: true,
    conflictResolution: 'newest' as 'newest' | 'oldest' | 'manual',
    syncDirection: 'bidirectional' as 'import' | 'export' | 'bidirectional',
    dataMapping: {
      name: 'name',
      rating: 'rating',
      content: 'content',
      date: 'date',
    },
  })

  const [syncHistory, setSyncHistory] = useState([
    {
      id: '1',
      platform: 'Google Reviews',
      action: 'import',
      count: 5,
      status: 'completed',
      timestamp: new Date().toISOString(),
      duration: '2.3s',
    },
    {
      id: '2',
      platform: 'Trustpilot',
      action: 'export',
      count: 3,
      status: 'completed',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      duration: '1.8s',
    },
    {
      id: '3',
      platform: 'Facebook',
      action: 'import',
      count: 0,
      status: 'failed',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      duration: '0s',
    },
  ])

  const [isSyncing, setIsSyncing] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  const { preferences } = useAccessibility()

  // Handle platform sync
  const handlePlatformSync = useCallback(
    async (platformId: string) => {
      setIsSyncing(true)

      try {
        // Simulate sync process
        await new Promise(resolve => setTimeout(resolve, 2000))

        const platform = platforms.find(p => p.id === platformId)
        if (platform) {
          const newSync = {
            id: Date.now().toString(),
            platform: platform.name,
            action: 'import',
            count: Math.floor(Math.random() * 10) + 1,
            status: 'completed',
            timestamp: new Date().toISOString(),
            duration: '2.1s',
          }

          setSyncHistory(prev => [newSync, ...prev])
          setSyncStatus(prev => ({
            ...prev,
            lastSync: new Date().toISOString(),
            syncCount: prev.syncCount + 1,
          }))

          onSyncAction?.('platform_synced', { platformId, sync: newSync })
        }
      } catch (error) {
        console.error('Platform sync failed:', error)
      } finally {
        setIsSyncing(false)
      }
    },
    [platforms, onSyncAction]
  )

  // Handle settings update
  const handleSettingsUpdate = useCallback(
    async (key: string, value: any) => {
      try {
        setSyncSettings(prev => ({
          ...prev,
          [key]: value,
        }))

        onSyncAction?.('settings_updated', { key, value })
      } catch (error) {
        console.error('Settings update failed:', error)
      }
    },
    [onSyncAction]
  )

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className='h-4 w-4 text-green-500' />
      case 'disconnected':
        return <AlertTriangle className='h-4 w-4 text-yellow-500' />
      case 'error':
        return <AlertTriangle className='h-4 w-4 text-red-500' />
      default:
        return <Clock className='h-4 w-4 text-gray-500' />
    }
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-500/10 text-green-700 border-green-500/20'
      case 'disconnected':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20'
      case 'error':
        return 'bg-red-500/10 text-red-700 border-red-500/20'
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20'
    }
  }

  // Get sync status icon
  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className='h-4 w-4 text-green-500' />
      case 'failed':
        return <AlertTriangle className='h-4 w-4 text-red-500' />
      case 'in_progress':
        return <RefreshCw className='h-4 w-4 text-blue-500 animate-spin' />
      default:
        return <Clock className='h-4 w-4 text-gray-500' />
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
        {/* Sync status */}
        {showStatus && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Database className='h-5 w-5' />
                  Sync Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div className='text-center'>
                    <div className='flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3'>
                      <CheckCircle className='h-6 w-6 text-green-600' />
                    </div>
                    <h3 className='font-semibold'>Last Sync</h3>
                    <p className='text-sm text-muted-foreground'>
                      {new Date(syncStatus.lastSync).toLocaleString()}
                    </p>
                  </div>
                  <div className='text-center'>
                    <div className='flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3'>
                      <Clock className='h-6 w-6 text-blue-600' />
                    </div>
                    <h3 className='font-semibold'>Next Sync</h3>
                    <p className='text-sm text-muted-foreground'>
                      {new Date(syncStatus.nextSync).toLocaleString()}
                    </p>
                  </div>
                  <div className='text-center'>
                    <div className='flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3'>
                      <RefreshCw className='h-6 w-6 text-purple-600' />
                    </div>
                    <h3 className='font-semibold'>Total Syncs</h3>
                    <p className='text-sm text-muted-foreground'>
                      {syncStatus.syncCount}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Platform connections */}
        {showPlatforms && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <ExternalLink className='h-5 w-5' />
                  Platform Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {platforms.map((platform, index) => (
                    <motion.div
                      key={platform.id}
                      className='flex items-center justify-between p-4 border rounded-lg'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className='flex items-center gap-3'>
                        {getStatusIcon(platform.status)}
                        <div>
                          <h4 className='font-medium'>{platform.name}</h4>
                          <p className='text-sm text-muted-foreground'>
                            {platform.description}
                          </p>
                          {platform.lastSync && (
                            <p className='text-xs text-muted-foreground'>
                              Last sync:{' '}
                              {new Date(platform.lastSync).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Badge className={getStatusColor(platform.status)}>
                          {platform.status}
                        </Badge>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => handlePlatformSync(platform.id)}
                          disabled={
                            isSyncing || platform.status === 'disconnected'
                          }
                        >
                          {isSyncing ? (
                            <RefreshCw className='h-4 w-4 animate-spin' />
                          ) : (
                            <RefreshCw className='h-4 w-4' />
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

        {/* Sync settings */}
        {showSchedule && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Clock className='h-5 w-5' />
                  Sync Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-4'>
                      <div>
                        <label className='text-sm font-medium'>
                          Sync Frequency
                        </label>
                        <select
                          value={syncSettings.frequency}
                          onChange={e =>
                            handleSettingsUpdate('frequency', e.target.value)
                          }
                          className='w-full mt-2 p-2 border border-input rounded-md bg-background'
                        >
                          <option value='realtime'>Real-time</option>
                          <option value='hourly'>Hourly</option>
                          <option value='daily'>Daily</option>
                          <option value='weekly'>Weekly</option>
                        </select>
                      </div>
                      <div>
                        <label className='text-sm font-medium'>
                          Conflict Resolution
                        </label>
                        <select
                          value={syncSettings.conflictResolution}
                          onChange={e =>
                            handleSettingsUpdate(
                              'conflictResolution',
                              e.target.value
                            )
                          }
                          className='w-full mt-2 p-2 border border-input rounded-md bg-background'
                        >
                          <option value='newest'>Use Newest</option>
                          <option value='oldest'>Use Oldest</option>
                          <option value='manual'>Manual Review</option>
                        </select>
                      </div>
                    </div>
                    <div className='space-y-4'>
                      <div>
                        <label className='text-sm font-medium'>
                          Sync Direction
                        </label>
                        <select
                          value={syncSettings.syncDirection}
                          onChange={e =>
                            handleSettingsUpdate(
                              'syncDirection',
                              e.target.value
                            )
                          }
                          className='w-full mt-2 p-2 border border-input rounded-md bg-background'
                        >
                          <option value='import'>Import Only</option>
                          <option value='export'>Export Only</option>
                          <option value='bidirectional'>Bidirectional</option>
                        </select>
                      </div>
                      <div className='flex items-center justify-between'>
                        <div>
                          <h4 className='font-medium'>Auto Sync</h4>
                          <p className='text-sm text-muted-foreground'>
                            Automatically sync when changes are detected
                          </p>
                        </div>
                        <Button
                          variant={
                            syncSettings.autoSync ? 'default' : 'outline'
                          }
                          size='sm'
                          onClick={() =>
                            handleSettingsUpdate(
                              'autoSync',
                              !syncSettings.autoSync
                            )
                          }
                        >
                          {syncSettings.autoSync ? 'On' : 'Off'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Sync history */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Clock className='h-5 w-5' />
                Sync History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {syncHistory.map((sync, index) => (
                  <motion.div
                    key={sync.id}
                    className='flex items-center justify-between p-4 border rounded-lg'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className='flex items-center gap-3'>
                      {getSyncStatusIcon(sync.status)}
                      <div>
                        <h4 className='font-medium'>
                          {sync.platform} - {sync.action}
                        </h4>
                        <p className='text-sm text-muted-foreground'>
                          {new Date(sync.timestamp).toLocaleString()} •{' '}
                          {sync.count} items • {sync.duration}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(sync.status)}>
                      {sync.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data mapping */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Database className='h-5 w-5' />
                Data Mapping
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <p className='text-sm text-muted-foreground'>
                  Map testimonial fields to external platform fields
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {Object.entries(syncSettings.dataMapping).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className='flex items-center justify-between p-3 border rounded-lg'
                      >
                        <div>
                          <h4 className='font-medium capitalize'>{key}</h4>
                          <p className='text-sm text-muted-foreground'>
                            Testimonial field
                          </p>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span className='text-sm text-muted-foreground'>
                            →
                          </span>
                          <Badge variant='outline'>{value}</Badge>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default TestimonialSync
