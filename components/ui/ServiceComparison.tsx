'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAccessibility'
import { useOptimizedAnimation } from '../../hooks/useAnimations'
import { CheckCircle, XCircle, Star, Zap } from 'lucide-react'

interface ServiceComparisonProps extends HTMLMotionProps<'div'> {
  services: Array<{
    id: string
    name: string
    description: string
    price: string
    features: string[]
    popular?: boolean
    recommended?: boolean
  }>
  selectedService?: string
  onServiceSelect?: (serviceId: string) => void
  className?: string
}

const ServiceComparison: React.FC<ServiceComparisonProps> = ({
  services,
  selectedService,
  onServiceSelect,
  className,
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion()
  const { optimizedConfig } = useOptimizedAnimation(
    {
      id: 'service-comparison',
      name: 'Service Comparison',
      type: 'interaction',
      duration: 600,
      easing: 'ease-out',
      reducedMotion: {
        enabled: true,
        alternativeAnimation: 'static-comparison',
        staticFallback: true,
      },
      performance: {
        maxDuration: 600,
        targetFPS: 60,
        memoryLimit: 15,
        gpuAcceleration: true,
      },
    },
    'service-comparison'
  )

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`space-y-4 ${className}`} {...rest}>
        {services.map(service => (
          <div
            key={service.id}
            className={`p-6 rounded-xl border-2 transition-colors ${
              selectedService === service.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
            onClick={() => onServiceSelect?.(service.id)}
          >
            <h3 className='text-xl font-semibold mb-2'>{service.name}</h3>
            <p className='text-muted-foreground mb-4'>{service.description}</p>
            <div className='text-2xl font-bold text-blue-600 mb-4'>
              {service.price}
            </div>
            <ul className='space-y-2'>
              {service.features.map((feature, index) => (
                <li key={index} className='flex items-center'>
                  <CheckCircle className='h-4 w-4 text-green-500 mr-2' />
                  <span className='text-sm'>{feature}</span>
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

  const serviceVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: optimizedConfig.duration / 1000,
        ease: optimizedConfig.easing,
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
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
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          variants={serviceVariants}
          whileHover='hover'
          className={`
            relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300
            ${
              selectedService === service.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }
            ${service.popular ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}
            ${service.recommended ? 'ring-2 ring-green-400 ring-opacity-50' : ''}
          `}
          onClick={() => onServiceSelect?.(service.id)}
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {/* Popular/Recommended badges */}
          {service.popular && (
            <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
              <div className='bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center'>
                <Star className='h-3 w-3 mr-1' />
                Popular
              </div>
            </div>
          )}

          {service.recommended && (
            <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
              <div className='bg-green-400 text-green-900 px-3 py-1 rounded-full text-xs font-bold flex items-center'>
                <Zap className='h-3 w-3 mr-1' />
                Recommended
              </div>
            </div>
          )}

          {/* Service content */}
          <div className='text-center mb-6'>
            <h3 className='text-xl font-semibold mb-2'>{service.name}</h3>
            <p className='text-muted-foreground text-sm mb-4'>
              {service.description}
            </p>
            <div className='text-3xl font-bold text-blue-600'>
              {service.price}
            </div>
          </div>

          {/* Features list */}
          <ul className='space-y-3'>
            {service.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                className='flex items-center'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.1 + featureIndex * 0.05,
                  duration: 0.3,
                }}
              >
                <CheckCircle className='h-4 w-4 text-green-500 mr-3 flex-shrink-0' />
                <span className='text-sm'>{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* Selection indicator */}
          {selectedService === service.id && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
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

// Service comparison table
interface ServiceComparisonTableProps {
  services: Array<{
    id: string
    name: string
    features: Record<string, boolean | string>
  }>
  features: Array<{
    name: string
    description?: string
  }>
  className?: string
}

export const ServiceComparisonTable: React.FC<ServiceComparisonTableProps> = ({
  services,
  features,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={`overflow-x-auto ${className}`}>
        <table className='w-full border-collapse'>
          <thead>
            <tr>
              <th className='text-left p-4 border-b'>Feature</th>
              {services.map(service => (
                <th key={service.id} className='text-center p-4 border-b'>
                  {service.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index}>
                <td className='p-4 border-b'>
                  <div className='font-medium'>{feature.name}</div>
                  {feature.description && (
                    <div className='text-sm text-muted-foreground'>
                      {feature.description}
                    </div>
                  )}
                </td>
                {services.map(service => (
                  <td key={service.id} className='p-4 border-b text-center'>
                    {service.features[feature.name] ? (
                      <CheckCircle className='h-5 w-5 text-green-500 mx-auto' />
                    ) : (
                      <XCircle className='h-5 w-5 text-red-500 mx-auto' />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'ease-out' }}
      className={`overflow-x-auto ${className}`}
    >
      <table className='w-full border-collapse'>
        <thead>
          <tr>
            <th className='text-left p-4 border-b'>Feature</th>
            {services.map((service, index) => (
              <motion.th
                key={service.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className='text-center p-4 border-b'
              >
                {service.name}
              </motion.th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, featureIndex) => (
            <motion.tr
              key={featureIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: featureIndex * 0.05, duration: 0.3 }}
            >
              <td className='p-4 border-b'>
                <div className='font-medium'>{feature.name}</div>
                {feature.description && (
                  <div className='text-sm text-muted-foreground'>
                    {feature.description}
                  </div>
                )}
              </td>
              {services.map((service, serviceIndex) => (
                <motion.td
                  key={service.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: featureIndex * 0.05 + serviceIndex * 0.1,
                    duration: 0.3,
                  }}
                  className='p-4 border-b text-center'
                >
                  {service.features[feature.name] ? (
                    <CheckCircle className='h-5 w-5 text-green-500 mx-auto' />
                  ) : (
                    <XCircle className='h-5 w-5 text-red-500 mx-auto' />
                  )}
                </motion.td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}

export default ServiceComparison
