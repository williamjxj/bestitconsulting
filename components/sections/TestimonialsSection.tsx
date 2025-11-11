/**
 * TestimonialsSection component with Magic UI marquee layout
 * Displays client testimonials in an infinite scrolling marquee
 */

'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Marquee } from '@/components/ui/marquee'
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

// Helper function to get initials from a name
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  const [imageError, setImageError] = React.useState(false)
  const initials = getInitials(name)
  const showInitials = !img || imageError

  return (
    <figure
      className={cn(
        'relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border-[1px] p-4',
        // light styles - matching Magic UI demo (thin gray border)
        'bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles - matching Magic UI demo
        'dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
      style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
    >
      <div className='flex flex-row items-center gap-2'>
        {showInitials ? (
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white dark:bg-blue-500'>
            {initials}
          </div>
        ) : (
          <img
            className='rounded-full'
            width='32'
            height='32'
            alt=''
            src={img}
            onError={() => setImageError(true)}
          />
        )}
        <div className='flex flex-col'>
          <figcaption className='text-sm font-medium dark:text-white'>
            {name}
          </figcaption>
          <p className='text-xs font-medium dark:text-white/40'>{username}</p>
        </div>
      </div>
      <blockquote className='mt-2 text-sm'>{body}</blockquote>
    </figure>
  )
}

export function TestimonialsSection({
  testimonials = defaultTestimonials,
  title = 'What Our Clients Say',
  description = "Don't just take our word for it. Here's what our clients have to say about working with us.",
  autoPlay,
  autoPlayInterval,
  className = '',
}: TestimonialsSectionProps) {
  // Transform testimonials to marquee format
  const reviews = testimonials.map(testimonial => ({
    name: testimonial.name,
    username: `@${testimonial.company.toLowerCase().replace(/\s+/g, '')}`,
    body: testimonial.content,
    img: testimonial.avatar || '', // Empty string will trigger initials display
  }))

  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2))
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2))

  return (
    <section
      className={`py-20 bg-gradient-to-br from-blue-50 to-cyan-50 ${className}`}
    >
      <div className='container mx-auto px-4'>
        <div className='mb-12'>
          <div className='relative max-w-4xl mx-auto lg:pr-72'>
            <div className='pointer-events-none absolute inset-y-0 right-0 hidden lg:flex items-center justify-center overflow-visible z-0'>
              <Image
                src='/optimized/gemini-thanks.png'
                alt='Thank you note'
                width={500}
                height={360}
                className='h-[216%] w-auto object-contain opacity-90 drop-shadow-lg rotate-[30deg] -translate-y-[10px]'
                style={{ filter: 'brightness(1.2)' }}
                priority
              />
            </div>
            <div className='relative z-10 flex flex-col items-center gap-4 text-center lg:items-start lg:text-left'>
              <div className='flex flex-col lg:flex-row lg:items-center gap-4 justify-center lg:justify-start'>
                <h2 className='text-4xl font-bold text-gray-900 text-center lg:text-left'>
                  {title}
                </h2>
                <div className='flex-shrink-0 lg:ml-4'>
                  <AvatarCirclesDemo />
                </div>
              </div>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto lg:mx-0'>
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Marquee Testimonials */}
        <div className='relative z-10 flex w-full flex-col items-center justify-center overflow-hidden'>
          <Marquee pauseOnHover className='[--duration:40s]'>
            {firstRow.map(review => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className='[--duration:40s]'>
            {secondRow.map(review => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className='pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950 dark:to-transparent'></div>
          <div className='pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-cyan-50 to-transparent dark:from-cyan-950 dark:to-transparent'></div>
        </div>
      </div>
    </section>
  )
}
