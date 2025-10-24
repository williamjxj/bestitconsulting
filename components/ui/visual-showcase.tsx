'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import { ScrollTrigger } from '@/components/animations/ScrollTrigger'
import { FadeIn, SlideIn } from '@/components/animations'
import { cn } from '@/lib/utils'

interface ShowcaseItem {
  title: string
  description: string
  image: string
  category: string
  featured?: boolean
}

interface VisualShowcaseProps {
  items: ShowcaseItem[]
  title?: string
  description?: string
  className?: string
}

export function VisualShowcase({
  items,
  title = 'Our Journey',
  description = "Key milestones in our company's growth and success",
  className,
}: VisualShowcaseProps) {
  const [activeItem, setActiveItem] = useState(0)
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  return (
    <section className={cn('py-20', className)}>
      <div className='max-w-7xl mx-auto px-4'>
        <ScrollTrigger animation='fade' direction='up' duration={0.8}>
          <div className='text-center mb-16'>
            <FadeIn delay={0.2} duration={0.6}>
              <h2 className='text-4xl font-bold text-gray-900 mb-4'>{title}</h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                {description}
              </p>
            </FadeIn>
          </div>
        </ScrollTrigger>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Content */}
          <ScrollTrigger animation='slide' direction='left' duration={0.8}>
            <div className='space-y-6'>
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    activeItem === index
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                  onClick={() => setActiveItem(index)}
                  whileHover={shouldAnimate ? { scale: 1.02 } : undefined}
                  whileTap={shouldAnimate ? { scale: 0.98 } : undefined}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className='flex items-center space-x-4'>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        activeItem === index ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                    <span className='text-sm font-medium text-gray-500'>
                      {item.category}
                    </span>
                    {item.featured && (
                      <span className='px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full'>
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className='text-xl font-semibold text-gray-900 mt-3 mb-2'>
                    {item.title}
                  </h3>

                  <p className='text-gray-600 leading-relaxed'>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </ScrollTrigger>

          {/* Visual */}
          <ScrollTrigger animation='slide' direction='right' duration={0.8}>
            <div className='relative'>
              <motion.div
                className='aspect-square rounded-2xl overflow-hidden shadow-2xl'
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className='w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center'>
                  <div className='text-center text-white'>
                    <div className='text-6xl font-bold mb-4'>
                      {items[activeItem]?.title.charAt(0) || 'A'}
                    </div>
                    <div className='text-xl font-medium'>
                      {items[activeItem]?.category || 'Category'}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating elements */}
              {shouldAnimate && (
                <>
                  <motion.div
                    className='absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full'
                    animate={{
                      y: [-10, 10, -10],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <motion.div
                    className='absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full'
                    animate={{
                      y: [10, -10, 10],
                      rotate: [360, 0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1,
                    }}
                  />
                </>
              )}
            </div>
          </ScrollTrigger>
        </div>
      </div>
    </section>
  )
}
