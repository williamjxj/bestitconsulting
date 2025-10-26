'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { CheckCircle, XCircle, Star, Zap, Crown } from 'lucide-react'

interface PricingAnimationProps extends HTMLMotionProps<'div'> {
  plans: Array<{
    id: string
    name: string
    description: string
    price: string
    period: string
    features: Array<{
      name: string
      included: boolean
      description?: string
    }>
    popular?: boolean
    recommended?: boolean
    badge?: string
  }>
  selectedPlan?: string
  onPlanSelect?: (planId: string) => void
  billingPeriod?: 'monthly' | 'yearly'
  onBillingToggle?: () => void
  className?: string
}

const PricingAnimation: React.FC<PricingAnimationProps> = ({
  plans,
  selectedPlan,
  onPlanSelect,
  billingPeriod = 'monthly',
  onBillingToggle,
  className,
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion()
  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'pricing-animation',
      name: 'Pricing Animation',
      type: 'interaction',
      duration: 600,
      easing: 'ease-out',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-pricing',
        staticFallback: true,
      },
      performance: {
        maxDuration: 600,
        targetFPS: 60,
        memoryLimit: 15,
        gpuAcceleration: true,
      },
    },
    'pricing-animation'
  )

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div
        className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
        {...rest}
      >
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`p-6 rounded-xl border-2 transition-colors ${
              selectedPlan === plan.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            } ${plan.popular ? 'ring-2 ring-yellow-400' : ''}`}
            onClick={() => onPlanSelect?.(plan.id)}
          >
            <h3 className='text-xl font-semibold mb-2'>{plan.name}</h3>
            <p className='text-muted-foreground mb-4'>{plan.description}</p>
            <div className='text-3xl font-bold text-blue-600 mb-4'>
              {plan.price}
              <span className='text-sm font-normal text-muted-foreground'>
                /{plan.period}
              </span>
            </div>
            <ul className='space-y-2'>
              {plan.features.map((feature, index) => (
                <li key={index} className='flex items-center'>
                  {feature.included ? (
                    <CheckCircle className='h-4 w-4 text-green-500 mr-2' />
                  ) : (
                    <XCircle className='h-4 w-4 text-red-500 mr-2' />
                  )}
                  <span className='text-sm'>{feature.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        staggerChildren: 0.1,
        ease: optimizedConfig.easing,
      },
    },
  }

  const planVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3,
        ease: 'ease-out',
      },
    },
    selected: {
      scale: 1.05,
      boxShadow: '0 25px 50px rgba(59, 130, 246, 0.2)',
      borderColor: '#3B82F6',
    },
  }

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'ease-out',
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      {...rest}
    >
      {plans.map((plan, index) => (
        <motion.div
          key={plan.id}
          variants={planVariants}
          whileHover='hover'
          animate={selectedPlan === plan.id ? 'selected' : 'visible'}
          className={`
            relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300
            ${
              selectedPlan === plan.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }
            ${plan.popular ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}
            ${plan.recommended ? 'ring-2 ring-green-400 ring-opacity-50' : ''}
          `}
          onClick={() => onPlanSelect?.(plan.id)}
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {/* Badges */}
          {plan.popular && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: index * 0.1 + 0.3,
                duration: 0.5,
                ease: 'backOut',
              }}
              className='absolute -top-3 left-1/2 transform -translate-x-1/2'
            >
              <div className='bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center'>
                <Star className='h-3 w-3 mr-1' />
                Popular
              </div>
            </motion.div>
          )}

          {plan.recommended && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: index * 0.1 + 0.3,
                duration: 0.5,
                ease: 'backOut',
              }}
              className='absolute -top-3 left-1/2 transform -translate-x-1/2'
            >
              <div className='bg-green-400 text-green-900 px-3 py-1 rounded-full text-xs font-bold flex items-center'>
                <Zap className='h-3 w-3 mr-1' />
                Recommended
              </div>
            </motion.div>
          )}

          {plan.badge && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: index * 0.1 + 0.3,
                duration: 0.5,
                ease: 'backOut',
              }}
              className='absolute -top-3 left-1/2 transform -translate-x-1/2'
            >
              <div className='bg-purple-400 text-purple-900 px-3 py-1 rounded-full text-xs font-bold flex items-center'>
                <Crown className='h-3 w-3 mr-1' />
                {plan.badge}
              </div>
            </motion.div>
          )}

          {/* Plan content */}
          <div className='text-center mb-6'>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
              className='text-xl font-semibold mb-2'
            >
              {plan.name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
              className='text-muted-foreground text-sm mb-4'
            >
              {plan.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
              className='text-3xl font-bold text-blue-600'
            >
              {plan.price}
              <span className='text-sm font-normal text-muted-foreground'>
                /{plan.period}
              </span>
            </motion.div>
          </div>

          {/* Features list */}
          <motion.ul
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='space-y-3'
          >
            {plan.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                variants={featureVariants}
                className='flex items-center'
                style={{
                  animationDelay: `${index * 0.1 + featureIndex * 0.05}s`,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: index * 0.1 + featureIndex * 0.05 + 0.2,
                    duration: 0.2,
                  }}
                >
                  {feature.included ? (
                    <CheckCircle className='h-4 w-4 text-green-500 mr-3 flex-shrink-0' />
                  ) : (
                    <XCircle className='h-4 w-4 text-red-500 mr-3 flex-shrink-0' />
                  )}
                </motion.div>
                <div>
                  <span className='text-sm'>{feature.name}</span>
                  {feature.description && (
                    <div className='text-xs text-muted-foreground'>
                      {feature.description}
                    </div>
                  )}
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {/* Selection indicator */}
          {selectedPlan === plan.id && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
              className='absolute top-4 right-4'
            >
              <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center'>
                <CheckCircle className='h-4 w-4 text-white' />
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Billing toggle component
interface BillingToggleProps {
  billingPeriod: 'monthly' | 'yearly'
  onToggle: () => void
  className?: string
}

export const BillingToggle: React.FC<BillingToggleProps> = ({
  billingPeriod,
  onToggle,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div
        className={`flex items-center justify-center space-x-4 ${className}`}
      >
        <span
          className={`text-sm ${billingPeriod === 'monthly' ? 'font-semibold' : 'text-muted-foreground'}`}
        >
          Monthly
        </span>
        <button
          onClick={onToggle}
          className='relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span
          className={`text-sm ${billingPeriod === 'yearly' ? 'font-semibold' : 'text-muted-foreground'}`}
        >
          Yearly
        </span>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-center space-x-4 ${className}`}
    >
      <motion.span
        animate={{
          color: billingPeriod === 'monthly' ? '#1f2937' : '#9ca3af',
          fontWeight: billingPeriod === 'monthly' ? 600 : 400,
        }}
        transition={{ duration: 0.3 }}
        className='text-sm'
      >
        Monthly
      </motion.span>

      <motion.button
        onClick={onToggle}
        className='relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          animate={{
            x: billingPeriod === 'yearly' ? 24 : 4,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          className='inline-block h-4 w-4 rounded-full bg-white shadow-lg'
        />
      </motion.button>

      <motion.span
        animate={{
          color: billingPeriod === 'yearly' ? '#1f2937' : '#9ca3af',
          fontWeight: billingPeriod === 'yearly' ? 600 : 400,
        }}
        transition={{ duration: 0.3 }}
        className='text-sm'
      >
        Yearly
      </motion.span>
    </motion.div>
  )
}

export default PricingAnimation
