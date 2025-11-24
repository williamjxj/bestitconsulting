'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import { ScrollTrigger } from '@/components/animations/ScrollTrigger'
import { FadeIn, SlideIn } from '@/components/animations'
import { cn } from '@/lib/utils'
import { CheckCircle, AlertCircle, Send, Loader2 } from 'lucide-react'

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'multiselect'
  placeholder: string
  required?: boolean
  options?: Array<{ value: string; label: string }>
  width?: 'full' | 'half'
  readOnly?: boolean
}

interface AnimatedFormProps {
  fields: FormField[]
  onSubmit: (data: Record<string, string>) => Promise<void>
  submitText?: string
  className?: string
  initialValues?: Record<string, string>
}

export function AnimatedForm({
  fields,
  onSubmit,
  submitText = 'Send Message',
  className,
  initialValues,
}: AnimatedFormProps) {
  const [formData, setFormData] = useState<Record<string, string | string[]>>(
    () => initialValues || {}
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const reducedMotion = useReducedMotion()
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [shouldAnimate, setShouldAnimate] = useState(false)

  // Only compute device type and animation preference on client after hydration
  useEffect(() => {
    const currentDeviceType = getDeviceType()
    setDeviceType(currentDeviceType)
    setShouldAnimate(!reducedMotion && currentDeviceType !== 'mobile')
  }, [reducedMotion])

  // Update formData when initialValues changes
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      setFormData(prev => ({ ...prev, ...initialValues }))
    }
  }, [initialValues])

  const handleInputChange = (name: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleMultiselectChange = (name: string, value: string) => {
    setFormData(prev => {
      const currentValues = (prev[name] as string[]) || []
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value]
      return { ...prev, [name]: newValues }
    })
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    fields.forEach(field => {
      const value = formData[field.name]
      if (field.required) {
        if (field.type === 'multiselect') {
          if (!value || (Array.isArray(value) && value.length === 0)) {
            newErrors[field.name] = `${field.label} is required`
          }
        } else {
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            newErrors[field.name] = `${field.label} is required`
          }
        }
      }
      if (
        field.type === 'email' &&
        value &&
        typeof value === 'string' &&
        !/\S+@\S+\.\S+/.test(value)
      ) {
        newErrors[field.name] = 'Please enter a valid email address'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Convert multiselect arrays to comma-separated strings for API
      const submitData: Record<string, string> = {}
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          submitData[key] = value.join(', ')
        } else {
          submitData[key] = value || ''
        }
      })

      await onSubmit(submitData)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        className='text-center py-12'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CheckCircle className='h-8 w-8 text-green-600' />
        </motion.div>
        <h3 className='text-2xl font-semibold text-gray-900 mb-2'>
          Message Sent Successfully!
        </h3>
        <p className='text-gray-600'>
          Thank you for your message. We'll get back to you within 24 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <ScrollTrigger animation='fade' direction='up' duration={0.8}>
      <motion.form
        onSubmit={handleSubmit}
        className={cn('space-y-6', className)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className='space-y-6'>
          {/* Name field - full width */}
          {fields
            .filter(f => f.name === 'name')
            .map((field, index) => (
              <motion.div
                key={field.name}
                className='space-y-2 w-full'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <label className='block text-sm font-medium text-gray-700'>
                  {field.label}
                  {field.required && (
                    <span className='text-red-500 ml-1'>*</span>
                  )}
                </label>
                <div className='relative'>
                  <motion.input
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={e =>
                      handleInputChange(field.name, e.target.value)
                    }
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    placeholder={field.placeholder}
                    className={cn(
                      'w-full px-4 py-3 border rounded-lg transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500',
                      errors[field.name]
                        ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500'
                        : 'border-gray-300'
                    )}
                  />
                </div>
                <AnimatePresence>
                  {errors[field.name] && (
                    <motion.div
                      className='flex items-center space-x-2 text-red-600 text-sm'
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AlertCircle className='h-4 w-4' />
                      <span>{errors[field.name]}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

          {/* Email and Phone - same row */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {fields
              .filter(f => f.name === 'email' || f.name === 'phone')
              .map((field, index) => (
                <motion.div
                  key={field.name}
                  className='space-y-2'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: (index + 1) * 0.1 }}
                >
                  <label className='block text-sm font-medium text-gray-700'>
                    {field.label}
                    {field.required && (
                      <span className='text-red-500 ml-1'>*</span>
                    )}
                  </label>
                  <div className='relative'>
                    <motion.input
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={e =>
                        handleInputChange(field.name, e.target.value)
                      }
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      placeholder={field.placeholder}
                      className={cn(
                        'w-full px-4 py-3 border rounded-lg transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500',
                        errors[field.name]
                          ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500'
                          : 'border-gray-300'
                      )}
                    />
                  </div>
                  <AnimatePresence>
                    {errors[field.name] && (
                      <motion.div
                        className='flex items-center space-x-2 text-red-600 text-sm'
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <AlertCircle className='h-4 w-4' />
                        <span>{errors[field.name]}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
          </div>

          {/* Company field - full width */}
          {fields
            .filter(f => f.name === 'company')
            .map((field, index) => (
              <motion.div
                key={field.name}
                className='space-y-2 w-full'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: (index + 3) * 0.1 }}
              >
                <label className='block text-sm font-medium text-gray-700'>
                  {field.label}
                  {field.required && (
                    <span className='text-red-500 ml-1'>*</span>
                  )}
                </label>
                <div className='relative'>
                  <motion.input
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={e =>
                      handleInputChange(field.name, e.target.value)
                    }
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    placeholder={field.placeholder}
                    className={cn(
                      'w-full px-4 py-3 border rounded-lg transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500',
                      errors[field.name]
                        ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500'
                        : 'border-gray-300'
                    )}
                  />
                </div>
                <AnimatePresence>
                  {errors[field.name] && (
                    <motion.div
                      className='flex items-center space-x-2 text-red-600 text-sm'
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AlertCircle className='h-4 w-4' />
                      <span>{errors[field.name]}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

          {/* Subject, Service and Message fields - full width */}
          {fields
            .filter(f => f.name === 'subject' || f.name === 'service' || f.name === 'message')
            .map((field, index) => (
              <motion.div
                key={field.name}
                className='space-y-2 w-full'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: (index + 4) * 0.1 }}
              >
                <label className='block text-sm font-medium text-gray-700'>
                  {field.label}
                  {field.required && (
                    <span className='text-red-500 ml-1'>*</span>
                  )}
                </label>

                <div className='relative'>
                  {field.type === 'textarea' ? (
                    <motion.textarea
                      value={formData[field.name] || ''}
                      onChange={e =>
                        handleInputChange(field.name, e.target.value)
                      }
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      placeholder={field.placeholder}
                      rows={4}
                      className={cn(
                        'w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-none',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500',
                        errors[field.name]
                          ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500'
                          : 'border-gray-300'
                      )}
                    />
                  ) : field.type === 'select' ? (
                    <motion.select
                      value={formData[field.name] || ''}
                      onChange={e =>
                        handleInputChange(field.name, e.target.value)
                      }
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        'w-full px-4 py-3 border rounded-lg transition-all duration-200 bg-white',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500',
                        errors[field.name]
                          ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500'
                          : 'border-gray-300'
                      )}
                    >
                      <option value=''>{field.placeholder}</option>
                      {field.options?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </motion.select>
                  ) : field.type === 'multiselect' ? (
                    <div className='space-y-2'>
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                        {field.options?.map(option => {
                          const isSelected =
                            (formData[field.name] as string[])?.includes(
                              option.value
                            ) || false
                          return (
                            <motion.label
                              key={option.value}
                              className={cn(
                                'flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all duration-200',
                                'hover:bg-blue-50 hover:border-blue-300',
                                isSelected
                                  ? 'bg-blue-100 border-blue-500 text-blue-900'
                                  : 'bg-white border-gray-300 text-gray-700'
                              )}
                            >
                              <input
                                type='checkbox'
                                checked={isSelected}
                                onChange={() =>
                                  handleMultiselectChange(
                                    field.name,
                                    option.value
                                  )
                                }
                                onFocus={() => setFocusedField(field.name)}
                                onBlur={() => setFocusedField(null)}
                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                              />
                              <span className='text-sm font-medium'>
                                {option.label}
                              </span>
                            </motion.label>
                          )
                        })}
                      </div>
                      {(formData[field.name] as string[])?.length > 0 && (
                        <div className='text-sm text-gray-600'>
                          Selected:{' '}
                          {(formData[field.name] as string[]).join(', ')}
                        </div>
                      )}
                    </div>
                  ) : (
                    <motion.input
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={e =>
                        handleInputChange(field.name, e.target.value)
                      }
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      placeholder={field.placeholder}
                      readOnly={field.readOnly}
                      className={cn(
                        'w-full px-4 py-3 border rounded-lg transition-all duration-200',
                        field.readOnly
                          ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                          : 'bg-white',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500',
                        errors[field.name]
                          ? 'border-red-300 focus:ring-red-500/50 focus:border-red-500'
                          : 'border-gray-300',
                        field.readOnly && 'focus:ring-0 focus:border-gray-300'
                      )}
                    />
                  )}
                </div>

                <AnimatePresence>
                  {errors[field.name] && (
                    <motion.div
                      className='flex items-center space-x-2 text-red-600 text-sm'
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AlertCircle className='h-4 w-4' />
                      <span>{errors[field.name]}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
        </div>

        <motion.div
          className='pt-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: fields.length * 0.1 }}
        >
          <motion.button
            type='submit'
            disabled={isSubmitting}
            className={cn(
              'w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 px-6 rounded-lg',
              'transition-all duration-200 flex items-center justify-center space-x-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              shouldAnimate && 'hover:scale-105 hover:shadow-lg'
            )}
            whileHover={shouldAnimate ? { scale: 1.02 } : undefined}
            whileTap={shouldAnimate ? { scale: 0.98 } : undefined}
          >
            {isSubmitting ? (
              <>
                <Loader2 className='h-5 w-5 animate-spin' />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className='h-5 w-5' />
                <span>{submitText}</span>
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </ScrollTrigger>
  )
}
