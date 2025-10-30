/**
 * TestimonialsSection component with thumbnail cards grid layout
 * Displays client testimonials as individual cards in a responsive grid
 */

'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote, CheckCircle } from 'lucide-react'
import { FadeIn } from '@/components/animations/FadeIn'
import { AvatarCirclesDemo } from '@/components/ui/AvatarCirclesDemo'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
  featured?: boolean
  keyResults: string[]
  industry: string
  year: string
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
    role: 'CEO',
    company: 'TechFlow Solutions',
    content:
      'BestIT Consulting transformed our entire digital infrastructure. Their expertise in cloud migration saved us 60% on operational costs while improving our system reliability dramatically. The team was professional, responsive, and delivered beyond our expectations.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format',
    featured: true,
    keyResults: [
      '60% cost reduction',
      '99.9% uptime achieved',
      '3x faster deployment',
    ],
    industry: 'Software',
    year: '2024',
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    role: 'CTO',
    company: 'HealthVital Medical',
    content:
      'The healthcare management system BestIT developed for us has revolutionized our patient care process. The HIPAA-compliant solution streamlined our operations and significantly improved patient satisfaction scores.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
    keyResults: [
      '30% faster check-ins',
      '25% higher satisfaction',
      '100% HIPAA compliance',
    ],
    industry: 'Healthcare',
    year: '2024',
  },
  {
    id: 'emily-rodriguez',
    name: 'Emily Rodriguez',
    role: 'Director of Operations',
    company: 'RetailMax Enterprise',
    content:
      'Our e-commerce platform built by BestIT has exceeded all performance expectations. The scalable architecture handles millions of transactions seamlessly, and the conversion rate improvements have significantly boosted our revenue.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format',
    keyResults: [
      '40% conversion increase',
      '500K+ monthly users',
      'Zero downtime',
    ],
    industry: 'Retail',
    year: '2023',
  },
  {
    id: 'david-kim',
    name: 'David Kim',
    role: 'VP of Technology',
    company: 'FinanceCore Bank',
    content:
      'The real-time analytics dashboard BestIT created for us has transformed how we make data-driven decisions. The insights have helped us identify new revenue opportunities and optimize our operations.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
    keyResults: [
      '50% faster insights',
      '35% revenue increase',
      'Real-time monitoring',
    ],
    industry: 'Finance',
    year: '2024',
  },
  {
    id: 'lisa-wang',
    name: 'Lisa Wang',
    role: 'Product Manager',
    company: 'InnovateTech',
    content:
      "The IoT fleet management system has revolutionized our logistics operations. BestIT's solution provides real-time tracking and predictive maintenance that has reduced costs and improved efficiency.",
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format',
    keyResults: [
      '45% fuel savings',
      '20% maintenance reduction',
      '99% tracking accuracy',
    ],
    industry: 'Logistics',
    year: '2023',
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'IT Director',
    company: 'EduTech Solutions',
    content:
      "BestIT's cloud migration platform made our transition seamless and secure. The team's expertise in educational technology helped us maintain compliance while modernizing our infrastructure.",
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format',
    keyResults: ['Zero data loss', '50% faster access', '100% compliance'],
    industry: 'Education',
    year: '2024',
  },
  {
    id: 'maria-garcia',
    name: 'Maria Garcia',
    role: 'Operations Manager',
    company: 'GreenEnergy Corp',
    content:
      'The renewable energy monitoring system BestIT developed has optimized our solar and wind farms. The predictive analytics help us maximize energy output and reduce maintenance costs significantly.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654d0b?w=150&h=150&fit=crop&crop=face&auto=format',
    keyResults: [
      '25% energy optimization',
      '30% maintenance savings',
      'Real-time monitoring',
    ],
    industry: 'Energy',
    year: '2023',
  },
  {
    id: 'robert-taylor',
    name: 'Robert Taylor',
    role: 'CEO',
    company: 'ManufacturingPlus',
    content:
      "BestIT's smart manufacturing solution has transformed our production line. The IoT integration and AI-powered analytics have increased our efficiency and reduced waste dramatically.",
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
    keyResults: [
      '35% efficiency gain',
      '40% waste reduction',
      'Predictive maintenance',
    ],
    industry: 'Manufacturing',
    year: '2024',
  },
  {
    id: 'jennifer-lee',
    name: 'Jennifer Lee',
    role: 'CTO',
    company: 'FinTech Innovations',
    content:
      'The blockchain-based payment system BestIT built for us has revolutionized our financial services. The secure, scalable solution has attracted new customers and increased transaction volume.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format',
    keyResults: [
      '200% transaction growth',
      'Zero security breaches',
      'Global scalability',
    ],
    industry: 'FinTech',
    year: '2023',
  },
]

export function TestimonialsSection({
  testimonials = defaultTestimonials,
  title = 'What Our Clients Say',
  description = "Don't just take our word for it. Here's what our clients have to say about working with us.",
  autoPlay,
  autoPlayInterval,
  className = '',
}: TestimonialsSectionProps) {
  return (
    <section
      className={`py-20 bg-gradient-to-br from-blue-50 to-cyan-50 ${className}`}
    >
      <div className='container mx-auto px-4'>
        <div className='mb-12'>
          <div className='grid lg:grid-cols-12 gap-8 items-center'>
            <div className='lg:col-span-7 text-center lg:text-left'>
              <h2 className='text-4xl font-bold text-gray-900 mb-4'>{title}</h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto lg:mx-0'>
                {description}
              </p>
            </div>
            <div className='lg:col-span-5'>
              <div className='flex justify-center lg:justify-end'>
                <AvatarCirclesDemo />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <FadeIn
                key={testimonial.id}
                direction='up'
                delay={index * 0.1}
                duration={0.6}
              >
                <Card className='h-full border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2'>
                  <CardContent className='p-6 h-full flex flex-col'>
                    {/* Header with Rating and Quote Icon */}
                    <div className='flex justify-between items-start mb-4'>
                      {/* Rating */}
                      <div className='flex gap-1'>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className='h-4 w-4 text-yellow-400 fill-current'
                          />
                        ))}
                      </div>

                      {/* Large Quote Icon */}
                      <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center'>
                        <Quote className='h-8 w-8 text-gray-400' />
                      </div>
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className='text-sm text-gray-700 mb-6 leading-relaxed flex-grow'>
                      "{testimonial.content}"
                    </blockquote>

                    {/* Key Results Section */}
                    <div className='mb-6'>
                      <h4 className='font-semibold text-sm text-gray-900 mb-3'>
                        Key Results:
                      </h4>
                      <ul className='space-y-2'>
                        {testimonial.keyResults.map((result, i) => (
                          <li
                            key={i}
                            className='flex items-center gap-2 text-xs text-gray-600'
                          >
                            <CheckCircle className='h-3 w-3 text-green-500 flex-shrink-0' />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Separator */}
                    <div className='border-t border-gray-100 mb-4'></div>

                    {/* Footer with Client Info and Tags */}
                    <div className='flex items-center justify-between'>
                      {/* Client Info */}
                      <div className='flex items-center gap-3 flex-1 min-w-0'>
                        <div className='relative flex-shrink-0'>
                          <div className='w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center'>
                            {testimonial.avatar ? (
                              <img
                                src={testimonial.avatar}
                                alt={`${testimonial.name} avatar`}
                                className='w-full h-full object-cover'
                                onError={e => {
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                  const fallback =
                                    target.nextElementSibling as HTMLElement
                                  if (fallback) fallback.style.display = 'flex'
                                }}
                              />
                            ) : null}
                            <div
                              className={`w-full h-full bg-gray-300 items-center justify-center text-gray-600 font-semibold text-xs ${
                                testimonial.avatar ? 'hidden' : 'flex'
                              }`}
                            >
                              {testimonial.name
                                .split(' ')
                                .map(n => n[0])
                                .join('')}
                            </div>
                          </div>
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='font-semibold text-sm text-gray-900 truncate'>
                            {testimonial.name}
                          </div>
                          <div className='text-xs text-gray-600 truncate'>
                            {testimonial.role}
                          </div>
                          <div className='text-xs text-blue-600 truncate'>
                            {testimonial.company}
                          </div>
                        </div>
                      </div>

                      {/* Industry Tag and Year */}
                      <div className='flex flex-col items-end gap-2 flex-shrink-0'>
                        <span className='px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full border'>
                          {testimonial.industry}
                        </span>
                        <span className='text-xs text-gray-500'>
                          {testimonial.year}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
