'use client'

import React, { useState, useEffect } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  UserPlus,
  Mail,
  Phone,
  Download,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Users,
  Target,
  Zap,
  Star,
  Award,
  Clock,
  Sparkles,
} from 'lucide-react'

interface LeadGenerationAnimationProps extends HTMLMotionProps<'div'> {
  leads: Array<{
    id: string
    name: string
    email: string
    company: string
    source: string
    status: 'new' | 'contacted' | 'qualified' | 'converted'
    value: number
    timestamp: Date
  }>
  onLeadClick?: (leadId: string) => void
  onLeadConvert?: (leadId: string) => void
  className?: string
}

const LeadGenerationAnimation: React.FC<LeadGenerationAnimationProps> = ({
  leads,
  onLeadClick,
  onLeadConvert,
  className,
  ...rest
}) => {
  const [animatedLeads, setAnimatedLeads] = useState(leads)
  const [newLead, setNewLead] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'lead-generation',
      name: 'Lead Generation',
      type: 'interaction',
      duration: 600,
      easing: 'ease-out',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-leads',
        staticFallback: true,
      },
      performance: {
        maxDuration: 600,
        targetFPS: 60,
        memoryLimit: 15,
        gpuAcceleration: true,
      },
    },
    'lead-generation'
  )

  // Simulate new lead generation
  useEffect(() => {
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        // 30% chance of new lead
        setIsGenerating(true)
        setTimeout(() => {
          const newLeadId = `lead-${Date.now()}`
          setNewLead(newLeadId)
          setIsGenerating(false)

          // Add new lead to list
          setTimeout(() => {
            setAnimatedLeads(prev => [
              {
                id: newLeadId,
                name: `Lead ${prev.length + 1}`,
                email: `lead${prev.length + 1}@example.com`,
                company: `Company ${prev.length + 1}`,
                source: 'Website',
                status: 'new',
                value: Math.floor(Math.random() * 10000) + 1000,
                timestamp: new Date(),
              },
              ...prev,
            ])
            setNewLead(null)
          }, 1000)
        }, 2000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'qualified':
        return 'bg-green-100 text-green-800'
      case 'converted':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <UserPlus className='h-4 w-4' />
      case 'contacted':
        return <Mail className='h-4 w-4' />
      case 'qualified':
        return <Target className='h-4 w-4' />
      case 'converted':
        return <CheckCircle className='h-4 w-4' />
      default:
        return <Users className='h-4 w-4' />
    }
  }

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`space-y-4 ${className}`} {...rest}>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold'>Recent Leads</h3>
          <Badge variant='secondary' className='bg-green-100 text-green-800'>
            {leads.length} leads
          </Badge>
        </div>

        <div className='space-y-2'>
          {leads.map(lead => (
            <div
              key={lead.id}
              className='bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer'
              onClick={() => onLeadClick?.(lead.id)}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center'>
                    <UserPlus className='h-5 w-5 text-gray-600' />
                  </div>
                  <div>
                    <div className='font-medium'>{lead.name}</div>
                    <div className='text-sm text-gray-600'>{lead.company}</div>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status}
                  </Badge>
                  <span className='text-sm font-medium'>
                    ${lead.value.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
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

  const leadVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  }

  const newLeadVariants = {
    hidden: { opacity: 0, scale: 0, y: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'ease-out',
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      y: -50,
      transition: {
        duration: 0.3,
        ease: 'ease-in',
      },
    },
  }

  const generatingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'ease-out',
      },
    },
    exit: {
      opacity: 0,
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
      className={`space-y-4 ${className}`}
      {...rest}
    >
      {/* Header */}
      <motion.div
        variants={containerVariants}
        className='flex items-center justify-between'
      >
        <div className='flex items-center gap-2'>
          <motion.div
            animate={{ rotate: isGenerating ? 360 : 0 }}
            transition={{
              duration: 1,
              repeat: isGenerating ? Infinity : 0,
              ease: 'linear',
            }}
          >
            <Users className='h-5 w-5 text-blue-500' />
          </motion.div>
          <h3 className='text-lg font-semibold'>Recent Leads</h3>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Badge variant='secondary' className='bg-green-100 text-green-800'>
            {animatedLeads.length} leads
          </Badge>
        </motion.div>
      </motion.div>

      {/* Generating indicator */}
      {isGenerating && (
        <motion.div
          variants={generatingVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='bg-blue-50 border border-blue-200 rounded-lg p-4 text-center'
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2'
          >
            <Sparkles className='h-4 w-4 text-white' />
          </motion.div>
          <p className='text-sm text-blue-700'>Generating new lead...</p>
        </motion.div>
      )}

      {/* New lead notification */}
      {newLead && (
        <motion.div
          variants={newLeadVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='bg-green-50 border border-green-200 rounded-lg p-4'
        >
          <div className='flex items-center gap-2 mb-2'>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              <CheckCircle className='h-5 w-5 text-green-500' />
            </motion.div>
            <span className='font-semibold text-green-800'>
              New Lead Generated!
            </span>
          </div>
          <p className='text-sm text-green-700'>
            A new lead has been added to your pipeline.
          </p>
        </motion.div>
      )}

      {/* Leads list */}
      <div className='space-y-2'>
        {animatedLeads.map((lead, index) => (
          <motion.div
            key={lead.id}
            variants={leadVariants}
            whileHover='hover'
            whileTap='tap'
            className='bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer relative overflow-hidden'
            onClick={() => onLeadClick?.(lead.id)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Status indicator */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`absolute top-0 left-0 h-1 ${
                lead.status === 'new'
                  ? 'bg-blue-500'
                  : lead.status === 'contacted'
                    ? 'bg-yellow-500'
                    : lead.status === 'qualified'
                      ? 'bg-green-500'
                      : 'bg-purple-500'
              }`}
            />

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center'
                >
                  <motion.div
                    animate={{
                      rotate: lead.status === 'new' ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{
                      duration: 1,
                      repeat: lead.status === 'new' ? Infinity : 0,
                    }}
                  >
                    {getStatusIcon(lead.status)}
                  </motion.div>
                </motion.div>
                <div>
                  <div className='font-medium'>{lead.name}</div>
                  <div className='text-sm text-gray-600'>{lead.company}</div>
                  <div className='text-xs text-gray-500'>{lead.email}</div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status}
                  </Badge>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className='text-sm font-medium text-gray-900'
                >
                  ${lead.value.toLocaleString()}
                </motion.div>
              </div>
            </div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className='absolute top-2 right-2 flex gap-1'
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-all'
                onClick={e => {
                  e.stopPropagation()
                  onLeadConvert?.(lead.id)
                }}
              >
                <TrendingUp className='h-4 w-4 text-green-500' />
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Summary stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className='grid grid-cols-2 md:grid-cols-4 gap-4'
      >
        <div className='bg-white p-3 rounded-lg shadow-sm border text-center'>
          <div className='text-2xl font-bold text-blue-600'>
            {animatedLeads.filter(lead => lead.status === 'new').length}
          </div>
          <div className='text-xs text-gray-600'>New</div>
        </div>
        <div className='bg-white p-3 rounded-lg shadow-sm border text-center'>
          <div className='text-2xl font-bold text-yellow-600'>
            {animatedLeads.filter(lead => lead.status === 'contacted').length}
          </div>
          <div className='text-xs text-gray-600'>Contacted</div>
        </div>
        <div className='bg-white p-3 rounded-lg shadow-sm border text-center'>
          <div className='text-2xl font-bold text-green-600'>
            {animatedLeads.filter(lead => lead.status === 'qualified').length}
          </div>
          <div className='text-xs text-gray-600'>Qualified</div>
        </div>
        <div className='bg-white p-3 rounded-lg shadow-sm border text-center'>
          <div className='text-2xl font-bold text-purple-600'>
            {animatedLeads.filter(lead => lead.status === 'converted').length}
          </div>
          <div className='text-xs text-gray-600'>Converted</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LeadGenerationAnimation
