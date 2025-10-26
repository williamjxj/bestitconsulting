'use client'

import React, { useState } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Download,
  FileText,
  Check,
  Clock,
  User,
  Calendar,
  ArrowDown,
  Sparkles,
  Shield,
  Zap,
} from 'lucide-react'

interface CaseStudyDownloadProps extends HTMLMotionProps<'div'> {
  caseStudy: {
    id: string
    title: string
    description: string
    fileSize: string
    downloadCount: number
    lastUpdated: string
    author: string
    tags: string[]
    featured?: boolean
    premium?: boolean
  }
  onDownload?: (caseStudyId: string) => void
  onPreview?: (caseStudyId: string) => void
  className?: string
}

const CaseStudyDownload: React.FC<CaseStudyDownloadProps> = ({
  caseStudy,
  onDownload,
  onPreview,
  className,
  ...rest
}) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloaded, setIsDownloaded] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'case-study-download',
      name: 'Case Study Download',
      type: 'interaction',
      duration: 600,
      easing: 'ease-out',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-download',
        staticFallback: true,
      },
      performance: {
        maxDuration: 600,
        targetFPS: 60,
        memoryLimit: 10,
        gpuAcceleration: true,
      },
    },
    'case-study-download'
  )

  const handleDownload = async () => {
    if (isDownloading || isDownloaded) return

    setIsDownloading(true)
    setDownloadProgress(0)

    // Simulate download progress
    const progressInterval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsDownloading(false)
          setIsDownloaded(true)
          if (onDownload) {
            onDownload(caseStudy.id)
          }
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Reset after 3 seconds
    setTimeout(() => {
      setIsDownloaded(false)
      setDownloadProgress(0)
    }, 3000)
  }

  const handlePreview = () => {
    if (onPreview) {
      onPreview(caseStudy.id)
    }
  }

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div
        className={`bg-white rounded-lg shadow-lg border p-6 ${className}`}
        {...rest}
      >
        <div className='flex items-start justify-between mb-4'>
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-2'>
              <FileText className='h-5 w-5 text-blue-500' />
              <h3 className='text-lg font-semibold'>{caseStudy.title}</h3>
              {caseStudy.featured && (
                <Badge
                  variant='secondary'
                  className='bg-yellow-100 text-yellow-800'
                >
                  Featured
                </Badge>
              )}
              {caseStudy.premium && (
                <Badge
                  variant='secondary'
                  className='bg-purple-100 text-purple-800'
                >
                  Premium
                </Badge>
              )}
            </div>
            <p className='text-gray-600 mb-3'>{caseStudy.description}</p>
          </div>
        </div>

        <div className='flex flex-wrap gap-2 mb-4'>
          {caseStudy.tags.map(tag => (
            <Badge key={tag} variant='outline' className='text-xs'>
              {tag}
            </Badge>
          ))}
        </div>

        <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1'>
              <User className='h-4 w-4' />
              {caseStudy.author}
            </div>
            <div className='flex items-center gap-1'>
              <Calendar className='h-4 w-4' />
              {caseStudy.lastUpdated}
            </div>
            <div className='flex items-center gap-1'>
              <Download className='h-4 w-4' />
              {caseStudy.downloadCount} downloads
            </div>
          </div>
          <div className='text-sm font-medium'>{caseStudy.fileSize}</div>
        </div>

        <div className='flex gap-2'>
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className='flex-1'
          >
            {isDownloading ? (
              <>
                <Clock className='h-4 w-4 mr-2 animate-spin' />
                Downloading... {Math.round(downloadProgress)}%
              </>
            ) : isDownloaded ? (
              <>
                <Check className='h-4 w-4 mr-2' />
                Downloaded
              </>
            ) : (
              <>
                <Download className='h-4 w-4 mr-2' />
                Download PDF
              </>
            )}
          </Button>
          <Button onClick={handlePreview} variant='outline'>
            Preview
          </Button>
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: optimizedConfig.duration / 1000,
        staggerChildren: 0.1,
        ease: optimizedConfig.easing,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${downloadProgress}%`,
      transition: {
        duration: 0.3,
        ease: 'ease-out',
      },
    },
  }

  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'ease-out',
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.3,
        ease: 'ease-in',
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={`bg-white rounded-lg shadow-lg border p-6 relative overflow-hidden ${className}`}
      {...rest}
    >
      {/* Background decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        className='absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50'
      />

      {/* Featured sparkles */}
      {caseStudy.featured && (
        <motion.div
          variants={sparkleVariants}
          initial='hidden'
          animate='visible'
          className='absolute top-4 right-4'
        >
          <Sparkles className='h-6 w-6 text-yellow-400 animate-pulse' />
        </motion.div>
      )}

      <div className='relative z-10'>
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className='flex items-start justify-between mb-4'
        >
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-2'>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FileText className='h-5 w-5 text-blue-500' />
              </motion.div>
              <h3 className='text-lg font-semibold'>{caseStudy.title}</h3>
              {caseStudy.featured && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Badge
                    variant='secondary'
                    className='bg-yellow-100 text-yellow-800'
                  >
                    Featured
                  </Badge>
                </motion.div>
              )}
              {caseStudy.premium && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <Badge
                    variant='secondary'
                    className='bg-purple-100 text-purple-800'
                  >
                    Premium
                  </Badge>
                </motion.div>
              )}
            </div>
            <p className='text-gray-600 mb-3'>{caseStudy.description}</p>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          variants={itemVariants}
          className='flex flex-wrap gap-2 mb-4'
        >
          {caseStudy.tags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
            >
              <Badge variant='outline' className='text-xs'>
                {tag}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* Metadata */}
        <motion.div
          variants={itemVariants}
          className='flex items-center justify-between text-sm text-gray-500 mb-4'
        >
          <div className='flex items-center gap-4'>
            <motion.div
              className='flex items-center gap-1'
              whileHover={{ scale: 1.05 }}
            >
              <User className='h-4 w-4' />
              {caseStudy.author}
            </motion.div>
            <motion.div
              className='flex items-center gap-1'
              whileHover={{ scale: 1.05 }}
            >
              <Calendar className='h-4 w-4' />
              {caseStudy.lastUpdated}
            </motion.div>
            <motion.div
              className='flex items-center gap-1'
              whileHover={{ scale: 1.05 }}
            >
              <Download className='h-4 w-4' />
              {caseStudy.downloadCount} downloads
            </motion.div>
          </div>
          <motion.div
            className='text-sm font-medium'
            whileHover={{ scale: 1.05 }}
          >
            {caseStudy.fileSize}
          </motion.div>
        </motion.div>

        {/* Download progress */}
        {isDownloading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='mb-4'
          >
            <div className='flex items-center justify-between text-sm text-gray-600 mb-2'>
              <span>Downloading...</span>
              <span>{Math.round(downloadProgress)}%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
              <motion.div
                variants={progressVariants}
                animate='visible'
                className='h-full bg-blue-500 rounded-full relative'
              >
                <motion.div
                  animate={{ x: ['0%', '100%', '0%'] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30'
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div variants={itemVariants} className='flex gap-2'>
          <motion.div
            variants={buttonVariants}
            whileHover='hover'
            whileTap='tap'
            className='flex-1'
          >
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className='w-full relative overflow-hidden'
            >
              {isDownloading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className='mr-2'
                  >
                    <Clock className='h-4 w-4' />
                  </motion.div>
                  Downloading... {Math.round(downloadProgress)}%
                </>
              ) : isDownloaded ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className='mr-2'
                  >
                    <Check className='h-4 w-4' />
                  </motion.div>
                  Downloaded
                </>
              ) : (
                <>
                  <motion.div whileHover={{ y: -2 }} className='mr-2'>
                    <Download className='h-4 w-4' />
                  </motion.div>
                  Download PDF
                </>
              )}
            </Button>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover='hover'
            whileTap='tap'
          >
            <Button onClick={handlePreview} variant='outline'>
              Preview
            </Button>
          </motion.div>
        </motion.div>

        {/* Success animation */}
        {isDownloaded && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className='absolute inset-0 bg-green-50 border-2 border-green-200 rounded-lg flex items-center justify-center'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className='text-center'
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2'
              >
                <Check className='h-8 w-8 text-white' />
              </motion.div>
              <p className='text-green-700 font-semibold'>Download Complete!</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default CaseStudyDownload
