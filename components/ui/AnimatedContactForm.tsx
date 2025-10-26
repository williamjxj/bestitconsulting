'use client'

import React, { useState, useRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Send,
  Check,
  AlertCircle,
  User,
  Mail,
  Phone,
  MessageSquare,
  Loader2,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
} from 'lucide-react'

interface AnimatedContactFormProps extends HTMLMotionProps<'form'> {
  onSubmit?: (data: FormData) => void
  onFieldFocus?: (fieldName: string) => void
  onFieldBlur?: (fieldName: string) => void
  className?: string
}

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  budget: string
  timeline: string
  services: string[]
}

const AnimatedContactForm: React.FC<AnimatedContactFormProps> = ({
  onSubmit,
  onFieldFocus,
  onFieldBlur,
  className,
  ...rest
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    budget: '',
    timeline: '',
    services: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'contact-form',
      name: 'Contact Form',
      type: 'interaction',
      duration: 500,
      easing: 'ease-out',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-form',
        staticFallback: true,
      },
      performance: {
        maxDuration: 500,
        targetFPS: 60,
        memoryLimit: 12,
        gpuAcceleration: true,
      },
    },
    'contact-form'
  )

  const serviceOptions = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Digital Marketing',
    'Consulting',
    'Maintenance & Support',
  ]

  const budgetOptions = [
    'Under $5,000',
    '$5,000 - $15,000',
    '$15,000 - $50,000',
    '$50,000 - $100,000',
    'Over $100,000',
  ]

  const timelineOptions = [
    'ASAP',
    'Within 1 month',
    '1-3 months',
    '3-6 months',
    '6+ months',
  ]

  const handleInputChange = (
    field: keyof FormData,
    value: string | string[]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleFieldFocus = (fieldName: string) => {
    setFocusedField(fieldName)
    if (onFieldFocus) {
      onFieldFocus(fieldName)
    }
  }

  const handleFieldBlur = (fieldName: string) => {
    setFocusedField(null)
    if (onFieldBlur) {
      onFieldBlur(fieldName)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      if (onSubmit) {
        onSubmit(formData as any)
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }))
  }

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`space-y-6 ${className}`}
        {...rest}
      >
        {/* Basic Information */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>Name *</label>
            <input
              type='text'
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              onFocus={() => handleFieldFocus('name')}
              onBlur={() => handleFieldBlur('name')}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Your full name'
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Email *</label>
            <input
              type='email'
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              onFocus={() => handleFieldFocus('email')}
              onBlur={() => handleFieldBlur('email')}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='your@email.com'
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>Phone</label>
            <input
              type='tel'
              value={formData.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
              onFocus={() => handleFieldFocus('phone')}
              onBlur={() => handleFieldBlur('phone')}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='+1 (236) 992-3846'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Company</label>
            <input
              type='text'
              value={formData.company}
              onChange={e => handleInputChange('company', e.target.value)}
              onFocus={() => handleFieldFocus('company')}
              onBlur={() => handleFieldBlur('company')}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Your company name'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium mb-2'>Subject</label>
          <input
            type='text'
            value={formData.subject}
            onChange={e => handleInputChange('subject', e.target.value)}
            onFocus={() => handleFieldFocus('subject')}
            onBlur={() => handleFieldBlur('subject')}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder="What's this about?"
          />
        </div>

        <div>
          <label className='block text-sm font-medium mb-2'>Message *</label>
          <textarea
            value={formData.message}
            onChange={e => handleInputChange('message', e.target.value)}
            onFocus={() => handleFieldFocus('message')}
            onBlur={() => handleFieldBlur('message')}
            rows={4}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='Tell us about your project...'
          />
          {errors.message && (
            <p className='text-red-500 text-sm mt-1'>{errors.message}</p>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>Budget</label>
            <select
              value={formData.budget}
              onChange={e => handleInputChange('budget', e.target.value)}
              onFocus={() => handleFieldFocus('budget')}
              onBlur={() => handleFieldBlur('budget')}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              <option value=''>Select budget range</option>
              {budgetOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>Timeline</label>
            <select
              value={formData.timeline}
              onChange={e => handleInputChange('timeline', e.target.value)}
              onFocus={() => handleFieldFocus('timeline')}
              onBlur={() => handleFieldBlur('timeline')}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              <option value=''>Select timeline</option>
              {timelineOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium mb-2'>
            Services Needed
          </label>
          <div className='flex flex-wrap gap-2'>
            {serviceOptions.map(service => (
              <button
                key={service}
                type='button'
                onClick={() => handleServiceToggle(service)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  formData.services.includes(service)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        <Button type='submit' disabled={isSubmitting} className='w-full'>
          {isSubmitting ? (
            <>
              <Loader2 className='h-4 w-4 mr-2 animate-spin' />
              Sending...
            </>
          ) : (
            <>
              <Send className='h-4 w-4 mr-2' />
              Send Message
            </>
          )}
        </Button>
      </form>
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

  const fieldVariants = {
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

  const inputVariants = {
    hidden: { scale: 1 },
    focused: {
      scale: 1.02,
      transition: { duration: 0.2 },
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

  const successVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'ease-out',
      },
    },
  }

  if (isSubmitted) {
    return (
      <motion.div
        variants={successVariants}
        initial='hidden'
        animate='visible'
        className={`text-center py-12 ${className}`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className='w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
        >
          <Check className='h-10 w-10 text-white' />
        </motion.div>
        <h3 className='text-2xl font-bold text-green-700 mb-2'>
          Message Sent!
        </h3>
        <p className='text-gray-600'>We'll get back to you within 24 hours.</p>
      </motion.div>
    )
  }

  return (
    <motion.form
      ref={formRef}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      {...rest}
    >
      {/* Basic Information */}
      <motion.div
        variants={fieldVariants}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
      >
        <motion.div
          variants={inputVariants}
          animate={focusedField === 'name' ? 'focused' : 'hidden'}
        >
          <label className='flex text-sm font-medium mb-2 items-center'>
            <User className='h-4 w-4 mr-2 text-gray-500' />
            Name *
          </label>
          <input
            type='text'
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
            onFocus={() => handleFieldFocus('name')}
            onBlur={() => handleFieldBlur('name')}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            placeholder='Your full name'
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-red-500 text-sm mt-1 flex items-center'
            >
              <AlertCircle className='h-4 w-4 mr-1' />
              {errors.name}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          variants={inputVariants}
          animate={focusedField === 'email' ? 'focused' : 'hidden'}
        >
          <label className='flex text-sm font-medium mb-2 items-center'>
            <Mail className='h-4 w-4 mr-2 text-gray-500' />
            Email *
          </label>
          <input
            type='email'
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            onFocus={() => handleFieldFocus('email')}
            onBlur={() => handleFieldBlur('email')}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            placeholder='your@email.com'
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-red-500 text-sm mt-1 flex items-center'
            >
              <AlertCircle className='h-4 w-4 mr-1' />
              {errors.email}
            </motion.p>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        variants={fieldVariants}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
      >
        <motion.div
          variants={inputVariants}
          animate={focusedField === 'phone' ? 'focused' : 'hidden'}
        >
          <label className='flex text-sm font-medium mb-2 items-center'>
            <Phone className='h-4 w-4 mr-2 text-gray-500' />
            Phone
          </label>
          <input
            type='tel'
            value={formData.phone}
            onChange={e => handleInputChange('phone', e.target.value)}
            onFocus={() => handleFieldFocus('phone')}
            onBlur={() => handleFieldBlur('phone')}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            placeholder='+1 (236) 992-3846'
          />
        </motion.div>

        <motion.div
          variants={inputVariants}
          animate={focusedField === 'company' ? 'focused' : 'hidden'}
        >
          <label className='block text-sm font-medium mb-2'>Company</label>
          <input
            type='text'
            value={formData.company}
            onChange={e => handleInputChange('company', e.target.value)}
            onFocus={() => handleFieldFocus('company')}
            onBlur={() => handleFieldBlur('company')}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            placeholder='Your company name'
          />
        </motion.div>
      </motion.div>

      <motion.div variants={fieldVariants}>
        <motion.div
          variants={inputVariants}
          animate={focusedField === 'subject' ? 'focused' : 'hidden'}
        >
          <label className='block text-sm font-medium mb-2'>Subject</label>
          <input
            type='text'
            value={formData.subject}
            onChange={e => handleInputChange('subject', e.target.value)}
            onFocus={() => handleFieldFocus('subject')}
            onBlur={() => handleFieldBlur('subject')}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            placeholder="What's this about?"
          />
        </motion.div>
      </motion.div>

      <motion.div variants={fieldVariants}>
        <motion.div
          variants={inputVariants}
          animate={focusedField === 'message' ? 'focused' : 'hidden'}
        >
          <label className='flex text-sm font-medium mb-2 items-center'>
            <MessageSquare className='h-4 w-4 mr-2 text-gray-500' />
            Message *
          </label>
          <textarea
            value={formData.message}
            onChange={e => handleInputChange('message', e.target.value)}
            onFocus={() => handleFieldFocus('message')}
            onBlur={() => handleFieldBlur('message')}
            rows={4}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
            placeholder='Tell us about your project...'
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-red-500 text-sm mt-1 flex items-center'
            >
              <AlertCircle className='h-4 w-4 mr-1' />
              {errors.message}
            </motion.p>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        variants={fieldVariants}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
      >
        <motion.div
          variants={inputVariants}
          animate={focusedField === 'budget' ? 'focused' : 'hidden'}
        >
          <label className='block text-sm font-medium mb-2'>Budget</label>
          <select
            value={formData.budget}
            onChange={e => handleInputChange('budget', e.target.value)}
            onFocus={() => handleFieldFocus('budget')}
            onBlur={() => handleFieldBlur('budget')}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
          >
            <option value=''>Select budget range</option>
            {budgetOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div
          variants={inputVariants}
          animate={focusedField === 'timeline' ? 'focused' : 'hidden'}
        >
          <label className='block text-sm font-medium mb-2'>Timeline</label>
          <select
            value={formData.timeline}
            onChange={e => handleInputChange('timeline', e.target.value)}
            onFocus={() => handleFieldFocus('timeline')}
            onBlur={() => handleFieldBlur('timeline')}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
          >
            <option value=''>Select timeline</option>
            {timelineOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </motion.div>
      </motion.div>

      <motion.div variants={fieldVariants}>
        <label className='block text-sm font-medium mb-2'>
          Services Needed
        </label>
        <div className='flex flex-wrap gap-2'>
          {serviceOptions.map((service, index) => (
            <motion.button
              key={service}
              type='button'
              onClick={() => handleServiceToggle(service)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-200 flex items-center gap-1 ${
                formData.services.includes(service)
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {formData.services.includes(service) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className='h-3 w-3' />
                </motion.div>
              )}
              {service}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={buttonVariants}>
        <Button
          type='submit'
          disabled={isSubmitting}
          className='w-full relative overflow-hidden'
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className='mr-2'
              >
                <Loader2 className='h-4 w-4' />
              </motion.div>
              Sending...
            </>
          ) : (
            <>
              <motion.div whileHover={{ x: 5 }} className='mr-2'>
                <Send className='h-4 w-4' />
              </motion.div>
              Send Message
              <motion.div whileHover={{ x: 5 }} className='ml-2'>
                <ArrowRight className='h-4 w-4' />
              </motion.div>
            </>
          )}
        </Button>
      </motion.div>

      {/* Security badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className='flex items-center justify-center gap-4 text-sm text-gray-500'
      >
        <div className='flex items-center gap-1'>
          <Shield className='h-4 w-4' />
          Secure Form
        </div>
        <div className='flex items-center gap-1'>
          <Zap className='h-4 w-4' />
          Fast Response
        </div>
      </motion.div>
    </motion.form>
  )
}

export default AnimatedContactForm
