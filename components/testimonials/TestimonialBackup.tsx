/**
 * Testimonial backup component
 * Provides backup and restore functionality for testimonials
 */

'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Download,
  Upload,
  Database,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  HardDrive,
  Cloud,
  Archive,
  RefreshCw,
} from 'lucide-react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface TestimonialBackupProps {
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
  showSchedule?: boolean
  showStorage?: boolean
  showRestore?: boolean
  onBackupAction?: (action: string, data: any) => void
}

export const TestimonialBackup: React.FC<TestimonialBackupProps> = ({
  testimonials,
  className = '',
  showSchedule = true,
  showStorage = true,
  showRestore = true,
  onBackupAction,
}) => {
  const [backupStatus, setBackupStatus] = useState({
    lastBackup: new Date().toISOString(),
    nextBackup: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    backupCount: 12,
    totalSize: '2.4 MB',
    status: 'healthy' as 'healthy' | 'warning' | 'error',
  })

  const [backupSettings, setBackupSettings] = useState({
    frequency: 'daily' as 'hourly' | 'daily' | 'weekly' | 'monthly',
    retention: 30,
    compression: true,
    encryption: true,
    cloudSync: true,
    localStorage: true,
  })

  const [backupHistory, setBackupHistory] = useState([
    {
      id: '1',
      timestamp: new Date().toISOString(),
      size: '2.4 MB',
      status: 'completed',
      type: 'automatic',
      location: 'cloud',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      size: '2.3 MB',
      status: 'completed',
      type: 'automatic',
      location: 'local',
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      size: '2.2 MB',
      status: 'failed',
      type: 'manual',
      location: 'cloud',
    },
  ])

  const [isBackingUp, setIsBackingUp] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null)

  const { preferences } = useAccessibility()

  // Handle backup creation
  const handleCreateBackup = useCallback(async () => {
    setIsBackingUp(true)

    try {
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 2000))

      const newBackup = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        size: '2.4 MB',
        status: 'completed',
        type: 'manual',
        location: 'cloud',
      }

      setBackupHistory(prev => [newBackup, ...prev])
      setBackupStatus(prev => ({
        ...prev,
        lastBackup: new Date().toISOString(),
        backupCount: prev.backupCount + 1,
      }))

      onBackupAction?.('backup_created', newBackup)
    } catch (error) {
      console.error('Backup creation failed:', error)
    } finally {
      setIsBackingUp(false)
    }
  }, [onBackupAction])

  // Handle backup restore
  const handleRestoreBackup = useCallback(
    async (backupId: string) => {
      setIsRestoring(true)

      try {
        // Simulate restore process
        await new Promise(resolve => setTimeout(resolve, 1500))

        onBackupAction?.('backup_restored', { backupId })
      } catch (error) {
        console.error('Backup restore failed:', error)
      } finally {
        setIsRestoring(false)
      }
    },
    [onBackupAction]
  )

  // Handle settings update
  const handleSettingsUpdate = useCallback(
    async (key: string, value: any) => {
      try {
        setBackupSettings(prev => ({
          ...prev,
          [key]: value,
        }))

        onBackupAction?.('settings_updated', { key, value })
      } catch (error) {
        console.error('Settings update failed:', error)
      }
    },
    [onBackupAction]
  )

  // Get status icon
  const getStatusIcon = (status: string) => {
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

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-700 border-green-500/20'
      case 'failed':
        return 'bg-red-500/10 text-red-700 border-red-500/20'
      case 'in_progress':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20'
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
        {/* Backup status */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Database className='h-5 w-5' />
                Backup Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='text-center'>
                  <div className='flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3'>
                    <CheckCircle className='h-6 w-6 text-green-600' />
                  </div>
                  <h3 className='font-semibold'>Last Backup</h3>
                  <p className='text-sm text-muted-foreground'>
                    {new Date(backupStatus.lastBackup).toLocaleDateString()}
                  </p>
                </div>
                <div className='text-center'>
                  <div className='flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3'>
                    <Clock className='h-6 w-6 text-blue-600' />
                  </div>
                  <h3 className='font-semibold'>Next Backup</h3>
                  <p className='text-sm text-muted-foreground'>
                    {new Date(backupStatus.nextBackup).toLocaleDateString()}
                  </p>
                </div>
                <div className='text-center'>
                  <div className='flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3'>
                    <HardDrive className='h-6 w-6 text-purple-600' />
                  </div>
                  <h3 className='font-semibold'>Total Size</h3>
                  <p className='text-sm text-muted-foreground'>
                    {backupStatus.totalSize}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Backup actions */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Archive className='h-5 w-5' />
                Backup Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-wrap gap-4'>
                <Button
                  onClick={handleCreateBackup}
                  disabled={isBackingUp}
                  className='flex items-center gap-2'
                >
                  {isBackingUp ? (
                    <RefreshCw className='h-4 w-4 animate-spin' />
                  ) : (
                    <Download className='h-4 w-4' />
                  )}
                  {isBackingUp ? 'Creating Backup...' : 'Create Backup'}
                </Button>
                <Button
                  variant='outline'
                  onClick={() => setSelectedBackup('latest')}
                  className='flex items-center gap-2'
                >
                  <Upload className='h-4 w-4' />
                  Restore from Backup
                </Button>
                <Button
                  variant='outline'
                  onClick={() => onBackupAction?.('download_backup', {})}
                  className='flex items-center gap-2'
                >
                  <Download className='h-4 w-4' />
                  Download Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Backup settings */}
        {showSchedule && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Clock className='h-5 w-5' />
                  Backup Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-4'>
                      <div>
                        <label className='text-sm font-medium'>
                          Backup Frequency
                        </label>
                        <select
                          value={backupSettings.frequency}
                          onChange={e =>
                            handleSettingsUpdate('frequency', e.target.value)
                          }
                          className='w-full mt-2 p-2 border border-input rounded-md bg-background'
                        >
                          <option value='hourly'>Hourly</option>
                          <option value='daily'>Daily</option>
                          <option value='weekly'>Weekly</option>
                          <option value='monthly'>Monthly</option>
                        </select>
                      </div>
                      <div>
                        <label className='text-sm font-medium'>
                          Retention Period (days)
                        </label>
                        <input
                          type='number'
                          value={backupSettings.retention}
                          onChange={e =>
                            handleSettingsUpdate(
                              'retention',
                              parseInt(e.target.value)
                            )
                          }
                          className='w-full mt-2 p-2 border border-input rounded-md bg-background'
                          min='1'
                          max='365'
                        />
                      </div>
                    </div>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <h4 className='font-medium'>Compression</h4>
                          <p className='text-sm text-muted-foreground'>
                            Compress backups to save space
                          </p>
                        </div>
                        <Button
                          variant={
                            backupSettings.compression ? 'default' : 'outline'
                          }
                          size='sm'
                          onClick={() =>
                            handleSettingsUpdate(
                              'compression',
                              !backupSettings.compression
                            )
                          }
                        >
                          {backupSettings.compression ? 'On' : 'Off'}
                        </Button>
                      </div>
                      <div className='flex items-center justify-between'>
                        <div>
                          <h4 className='font-medium'>Encryption</h4>
                          <p className='text-sm text-muted-foreground'>
                            Encrypt backups for security
                          </p>
                        </div>
                        <Button
                          variant={
                            backupSettings.encryption ? 'default' : 'outline'
                          }
                          size='sm'
                          onClick={() =>
                            handleSettingsUpdate(
                              'encryption',
                              !backupSettings.encryption
                            )
                          }
                        >
                          {backupSettings.encryption ? 'On' : 'Off'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Storage options */}
        {showStorage && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <HardDrive className='h-5 w-5' />
                  Storage Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='flex items-center justify-between p-4 border rounded-lg'>
                    <div className='flex items-center gap-3'>
                      <HardDrive className='h-5 w-5 text-blue-500' />
                      <div>
                        <h4 className='font-medium'>Local Storage</h4>
                        <p className='text-sm text-muted-foreground'>
                          Store backups locally
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={
                        backupSettings.localStorage ? 'default' : 'outline'
                      }
                      size='sm'
                      onClick={() =>
                        handleSettingsUpdate(
                          'localStorage',
                          !backupSettings.localStorage
                        )
                      }
                    >
                      {backupSettings.localStorage ? 'On' : 'Off'}
                    </Button>
                  </div>
                  <div className='flex items-center justify-between p-4 border rounded-lg'>
                    <div className='flex items-center gap-3'>
                      <Cloud className='h-5 w-5 text-green-500' />
                      <div>
                        <h4 className='font-medium'>Cloud Storage</h4>
                        <p className='text-sm text-muted-foreground'>
                          Sync to cloud storage
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={backupSettings.cloudSync ? 'default' : 'outline'}
                      size='sm'
                      onClick={() =>
                        handleSettingsUpdate(
                          'cloudSync',
                          !backupSettings.cloudSync
                        )
                      }
                    >
                      {backupSettings.cloudSync ? 'On' : 'Off'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Backup history */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Clock className='h-5 w-5' />
                Backup History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {backupHistory.map((backup, index) => (
                  <motion.div
                    key={backup.id}
                    className='flex items-center justify-between p-4 border rounded-lg'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className='flex items-center gap-3'>
                      {getStatusIcon(backup.status)}
                      <div>
                        <h4 className='font-medium'>
                          {backup.type === 'automatic'
                            ? 'Automatic Backup'
                            : 'Manual Backup'}
                        </h4>
                        <p className='text-sm text-muted-foreground'>
                          {new Date(backup.timestamp).toLocaleString()} •{' '}
                          {backup.size}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Badge className={getStatusColor(backup.status)}>
                        {backup.status}
                      </Badge>
                      <Badge variant='outline'>{backup.location}</Badge>
                      {backup.status === 'completed' && (
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => handleRestoreBackup(backup.id)}
                          disabled={isRestoring}
                        >
                          {isRestoring ? (
                            <RefreshCw className='h-4 w-4 animate-spin' />
                          ) : (
                            <Upload className='h-4 w-4' />
                          )}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Restore options */}
        {showRestore && selectedBackup && (
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Upload className='h-5 w-5' />
                  Restore Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='p-4 border border-yellow-200 bg-yellow-50 rounded-lg'>
                    <div className='flex items-center gap-2 mb-2'>
                      <AlertTriangle className='h-4 w-4 text-yellow-600' />
                      <h4 className='font-medium text-yellow-800'>Warning</h4>
                    </div>
                    <p className='text-sm text-yellow-700'>
                      Restoring from a backup will replace all current
                      testimonials. This action cannot be undone.
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      onClick={() => handleRestoreBackup(selectedBackup)}
                      disabled={isRestoring}
                      className='bg-red-600 hover:bg-red-700'
                    >
                      {isRestoring ? (
                        <RefreshCw className='h-4 w-4 animate-spin mr-2' />
                      ) : (
                        <Upload className='h-4 w-4 mr-2' />
                      )}
                      {isRestoring ? 'Restoring...' : 'Confirm Restore'}
                    </Button>
                    <Button
                      variant='outline'
                      onClick={() => setSelectedBackup(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default TestimonialBackup
