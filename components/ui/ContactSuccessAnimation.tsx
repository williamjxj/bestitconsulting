'use client'

import React, { useState, useEffect } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Check,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  ArrowRight,
  Clock,
  User,
  MessageSquare,
  Star,
  Zap,
  Shield,
} from 'lucide-react'

interface ContactSuccessAnimationProps extends HTMLMotionProps<'div'> {
  onClose?: () => void
  onNewMessage?: () => void
  responseTime?: string
  nextSteps?: string[]
  className?: string
}

const ContactSuccessAnimation: React.FC<ContactSuccessAnimationProps> = ({
  onClose,
  onNewMessage,
  responseTime = '24 hours',
  nextSteps = [
    "We'll review your message",
    'Our team will prepare a response',
    "You'll receive a detailed reply",
    "We'll schedule a consultation if needed",
  ],
  className,
  ...rest
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'contact-success',
      name: 'Contact Success',
      type: 'interaction',
      duration: 800,
      easing: 'easeOut',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-success',
        staticFallback: true,
      },
      performance: {
        maxDuration: 800,
        targetFPS: 60,
        memoryLimit: 15,
        gpuAcceleration: true,
      },
    },
    'contact-success'
  )

  // Animate through steps
  useEffect(() => {
    if (prefersReducedMotion) return

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= nextSteps.length - 1) {
          setIsComplete(true)
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(stepInterval)
  }, [nextSteps.length, prefersReducedMotion])

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`text-center py-8 ${className}`} {...(rest as any)}>
        <div className='w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'>
          <Check className='h-10 w-10 text-white' />
        </div>
        <h3 className='text-2xl font-bold text-green-700 mb-2'>
          Message Sent Successfully!
        </h3>
        <p className='text-gray-600 mb-4'>
          We'll get back to you within {responseTime}.
        </p>

        <div className='space-y-2 mb-6'>
          {nextSteps.map((step, index) => (
            <div
              key={index}
              className='flex items-center gap-2 text-sm text-gray-600'
            >
              <Check className='h-4 w-4 text-green-500' />
              {step}
            </div>
          ))}
        </div>

        <div className='flex gap-2 justify-center'>
          <Button onClick={onNewMessage} variant='outline'>
            Send Another Message
          </Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  }

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
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

  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.3,
        ease: 'easeIn' as const,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={`text-center py-8 relative overflow-hidden ${className}`}
      {...(rest as any)}
    >
      {/* Background sparkles */}
      <motion.div
        variants={sparkleVariants}
        initial='hidden'
        animate='visible'
        className='absolute top-4 right-4'
      >
        <Sparkles className='h-6 w-6 text-yellow-400 animate-pulse' />
      </motion.div>
      <motion.div
        variants={sparkleVariants}
        initial='hidden'
        animate='visible'
        transition={{ delay: 0.2 }}
        className='absolute top-8 left-4'
      >
        <Sparkles className='h-4 w-4 text-blue-400 animate-pulse' />
      </motion.div>
      <motion.div
        variants={sparkleVariants}
        initial='hidden'
        animate='visible'
        transition={{ delay: 0.4 }}
        className='absolute bottom-4 right-8'
      >
        <Sparkles className='h-5 w-5 text-green-400 animate-pulse' />
      </motion.div>

      {/* Success icon */}
      <motion.div variants={iconVariants} className='relative mb-6'>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          }}
          className='w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg'
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Check className='h-12 w-12 text-white' />
          </motion.div>
        </motion.div>

        {/* Ripple effect */}
        <motion.div
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          className='absolute inset-0 bg-green-400 rounded-full'
        />
      </motion.div>

      {/* Success message */}
      <motion.div variants={stepVariants} className='mb-6'>
        <h3 className='text-3xl font-bold text-green-700 mb-2'>
          Message Sent Successfully!
        </h3>
        <p className='text-gray-600 text-lg'>
          We'll get back to you within{' '}
          <span className='font-semibold text-blue-600'>{responseTime}</span>
        </p>
      </motion.div>

      {/* Next steps */}
      <motion.div variants={stepVariants} className='mb-8'>
        <h4 className='text-lg font-semibold text-gray-800 mb-4'>
          What happens next?
        </h4>
        <div className='space-y-3 max-w-md mx-auto'>
          {nextSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: index <= currentStep ? 1 : 0.5,
                x: 0,
              }}
              transition={{ delay: index * 0.2, duration: 0.4 }}
              className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                index <= currentStep ? 'text-gray-800' : 'text-gray-400'
              }`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: index <= currentStep ? 1 : 0,
                  backgroundColor: index <= currentStep ? '#10B981' : '#E5E7EB',
                }}
                transition={{ delay: index * 0.2, duration: 0.3 }}
                className='w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0'
              >
                {index <= currentStep && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.1, duration: 0.2 }}
                  >
                    <Check className='h-3 w-3 text-white' />
                  </motion.div>
                )}
              </motion.div>
              <span className={index <= currentStep ? 'font-medium' : ''}>
                {step}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact info */}
      <motion.div
        variants={stepVariants}
        className='bg-gray-50 rounded-lg p-4 mb-6 max-w-md mx-auto'
      >
        <h5 className='font-semibold text-gray-800 mb-2'>
          Need immediate assistance?
        </h5>
        <div className='flex items-center justify-center gap-4 text-sm text-gray-600'>
          <div className='flex items-center gap-1'>
            <Mail className='h-4 w-4' />
            <span>contact@bestitconsulting.com</span>
          </div>
          <div className='flex items-center gap-1'>
            <Phone className='h-4 w-4' />
            <span>+1 (236) 992-3846</span>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        variants={buttonVariants}
        className='flex gap-3 justify-center'
      >
        <motion.div whileHover='hover' whileTap='tap' variants={buttonVariants}>
          <Button
            onClick={onNewMessage}
            variant='outline'
            className='flex items-center gap-2'
          >
            <MessageSquare className='h-4 w-4' />
            Send Another Message
          </Button>
        </motion.div>

        <motion.div whileHover='hover' whileTap='tap' variants={buttonVariants}>
          <Button onClick={onClose} className='flex items-center gap-2'>
            <motion.div
              whileHover={{ x: 5 }}
              className='flex items-center gap-2'
            >
              Close
              <ArrowRight className='h-4 w-4' />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className='flex items-center justify-center gap-6 mt-6 text-xs text-gray-500'
      >
        <div className='flex items-center gap-1'>
          <Shield className='h-3 w-3' />
          <span>Secure</span>
        </div>
        <div className='flex items-center gap-1'>
          <Zap className='h-3 w-3' />
          <span>Fast Response</span>
        </div>
        <div className='flex items-center gap-1'>
          <Star className='h-3 w-3' />
          <span>Trusted</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ContactSuccessAnimation
