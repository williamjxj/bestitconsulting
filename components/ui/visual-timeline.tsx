'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import { ScrollTrigger } from '@/components/animations/ScrollTrigger'
import { FadeIn, SlideIn } from '@/components/animations'
import { cn } from '@/lib/utils'
import {
  Rocket,
  Target,
  Globe,
  Code2,
  Award,
  Users,
  Shield,
  Heart,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Database,
  Cloud,
} from 'lucide-react'

interface TimelineItem {
  year: string
  title: string
  description: string
  icon: string
  color: string
  gradient: string
}

const iconMap = {
  Rocket,
  Target,
  Globe,
  Code2,
  Award,
  Users,
  Shield,
  Heart,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Database,
  Cloud,
}

interface VisualTimelineProps {
  items: TimelineItem[]
  className?: string
}

export function VisualTimeline({ items, className }: VisualTimelineProps) {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  return (
    <div className={cn('relative', className)}>
      {/* Timeline line */}
      <div className='absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200' />

      <div className='space-y-12'>
        {items.map((item, index) => (
          <ScrollTrigger
            key={index}
            animation='fade'
            direction='up'
            duration={0.8}
          >
            <motion.div
              className='relative flex items-start space-x-8'
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Timeline dot */}
              <div className='relative z-10 flex-shrink-0'>
                <motion.div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
                  whileHover={shouldAnimate ? { scale: 1.1 } : undefined}
                  transition={{ duration: 0.2 }}
                >
                  {(() => {
                    const IconComponent =
                      iconMap[item.icon as keyof typeof iconMap]
                    return IconComponent ? (
                      <IconComponent className='h-8 w-8 text-white' />
                    ) : null
                  })()}
                </motion.div>
                {shouldAnimate && (
                  <motion.div
                    className='absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-0'
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>

              {/* Content */}
              <div className='flex-1 min-w-0'>
                <motion.div
                  className='bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'
                  whileHover={shouldAnimate ? { y: -5 } : undefined}
                  transition={{ duration: 0.2 }}
                >
                  <div className='flex items-center space-x-4 mb-4'>
                    <span className={`text-2xl font-bold ${item.color}`}>
                      {item.year}
                    </span>
                    <div className='h-px bg-gray-200 flex-1' />
                  </div>

                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    {item.title}
                  </h3>

                  <p className='text-gray-600 leading-relaxed'>
                    {item.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </ScrollTrigger>
        ))}
      </div>
    </div>
  )
}
