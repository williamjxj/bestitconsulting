/**
 * TestimonialsSection component with animated testimonials carousel
 * Displays client testimonials with smooth animations and transitions
 */

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/animations/FadeIn'
import { SlideIn } from '@/components/animations/SlideIn'
import { ScaleIn } from '@/components/animations/ScaleIn'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
  featured?: boolean
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[]
  title?: string
  description?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechStart Inc.',
    content:
      'BestIT transformed our infrastructure and helped us scale from startup to enterprise. Outstanding work!',
    rating: 5,
    avatar: '/api/placeholder/60/60',
    featured: true,
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    role: 'VP Engineering',
    company: 'DataFlow',
    content:
      'Their cloud migration strategy saved us 40% in infrastructure costs while improving performance.',
    rating: 5,
    avatar: '/api/placeholder/60/60',
  },
  {
    id: 'emily-rodriguez',
    name: 'Emily Rodriguez',
    role: 'Founder',
    company: 'InnovateLab',
    content:
      'The team delivered our MVP in record time. Professional, skilled, and reliable partners.',
    rating: 5,
    avatar: '/api/placeholder/60/60',
  },
  {
    id: 'david-kim',
    name: 'David Kim',
    role: 'Product Manager',
    company: 'ScaleUp',
    content:
      'Exceptional quality and attention to detail. They understood our vision and brought it to life perfectly.',
    rating: 5,
    avatar: '/api/placeholder/60/60',
  },
  {
    id: 'lisa-wang',
    name: 'Lisa Wang',
    role: 'CEO',
    company: 'NextGen Solutions',
    content:
      "BestIT's expertise in modern technologies helped us stay ahead of the competition.",
    rating: 5,
    avatar: '/api/placeholder/60/60',
  },
]

export function TestimonialsSection({
  testimonials = defaultTestimonials,
  title = 'What Our Clients Say',
  description = "Don't just take our word for it. Here's what our clients have to say about working with us.",
  autoPlay = true,
  autoPlayInterval = 5000,
  className = '',
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || reducedMotion) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, autoPlayInterval, testimonials.length, reducedMotion])

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className='container mx-auto px-4'>
        <FadeIn delay={0.2} duration={0.8}>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>{title}</h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              {description}
            </p>
          </div>
        </FadeIn>

        <div className='max-w-4xl mx-auto'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className='text-center p-8'>
                <CardHeader>
                  <div className='flex justify-center mb-4'>
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        className='w-5 h-5 text-yellow-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </motion.svg>
                    ))}
                  </div>

                  <CardDescription className='text-lg italic mb-6'>
                    "{currentTestimonial.content}"
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className='flex items-center justify-center gap-4'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold'>
                      {currentTestimonial.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </div>
                    <div className='text-left'>
                      <div className='font-semibold text-lg'>
                        {currentTestimonial.name}
                      </div>
                      <div className='text-muted-foreground'>
                        {currentTestimonial.role}, {currentTestimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className='flex items-center justify-center gap-4 mt-8'>
            <Button
              variant='outline'
              size='sm'
              onClick={prevTestimonial}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(autoPlay)}
              animated={!reducedMotion}
            >
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </Button>

            <div className='flex gap-2'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary scale-125'
                      : 'bg-muted hover:bg-muted-foreground/50'
                  }`}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(autoPlay)}
                />
              ))}
            </div>

            <Button
              variant='outline'
              size='sm'
              onClick={nextTestimonial}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(autoPlay)}
              animated={!reducedMotion}
            >
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </Button>
          </div>
        </div>

        <FadeIn delay={1.0} duration={0.8}>
          <div className='text-center mt-12'>
            <Button size='lg' asChild>
              <a href='/testimonials'>
                Read More Testimonials
                <svg
                  className='w-4 h-4 ml-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
