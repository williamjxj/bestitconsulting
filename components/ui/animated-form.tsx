'use client'

import { useState, useRef } from 'react'
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
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  placeholder: string
  required?: boolean
  options?: Array<{ value: string; label: string }>
}

interface AnimatedFormProps {
  fields: FormField[]
  onSubmit: (data: Record<string, string>) => Promise<void>
  submitText?: string
  className?: string
}

export function AnimatedForm({
  fields,
  onSubmit,
  submitText = 'Send Message',
  className,
}: AnimatedFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`
      }
      if (
        field.type === 'email' &&
        formData[field.name] &&
        !/\S+@\S+\.\S+/.test(formData[field.name])
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
      await onSubmit(formData)
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
        {fields.map((field, index) => (
          <motion.div
            key={field.name}
            className='space-y-2'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <label className='block text-sm font-medium text-gray-700'>
              {field.label}
              {field.required && <span className='text-red-500 ml-1'>*</span>}
            </label>

            <div className='relative'>
              {field.type === 'textarea' ? (
                <motion.textarea
                  value={formData[field.name] || ''}
                  onChange={e => handleInputChange(field.name, e.target.value)}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  placeholder={field.placeholder}
                  rows={4}
                  className={cn(
                    'w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-none',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                    errors[field.name]
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300',
                    focusedField === field.name && shouldAnimate
                      ? 'transform scale-105 shadow-lg'
                      : ''
                  )}
                />
              ) : field.type === 'select' ? (
                <motion.select
                  value={formData[field.name] || ''}
                  onChange={e => handleInputChange(field.name, e.target.value)}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  className={cn(
                    'w-full px-4 py-3 border rounded-lg transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                    errors[field.name]
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300',
                    focusedField === field.name && shouldAnimate
                      ? 'transform scale-105 shadow-lg'
                      : ''
                  )}
                >
                  <option value=''>{field.placeholder}</option>
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </motion.select>
              ) : (
                <motion.input
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={e => handleInputChange(field.name, e.target.value)}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  placeholder={field.placeholder}
                  className={cn(
                    'w-full px-4 py-3 border rounded-lg transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                    errors[field.name]
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300',
                    focusedField === field.name && shouldAnimate
                      ? 'transform scale-105 shadow-lg'
                      : ''
                  )}
                />
              )}

              {/* Focus indicator */}
              {focusedField === field.name && shouldAnimate && (
                <motion.div
                  className='absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </div>

            {/* Error message */}
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
