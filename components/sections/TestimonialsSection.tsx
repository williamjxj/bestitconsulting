/**
 * TestimonialsSection component with animated testimonials carousel
 * Displays client testimonials with smooth animations and transitions
 */

'use client'

import React from 'react'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
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
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechCorp',
    content:
      'Best IT Consulting provided exceptional service and helped us modernize our infrastructure.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Mike Chen',
    role: 'CTO',
    company: 'StartupXYZ',
    content:
      'Their expertise in cloud migration saved us months of work and countless headaches.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'IT Director',
    company: 'Enterprise Inc',
    content:
      'Professional, reliable, and always available when we need them. Highly recommended!',
    rating: 5,
  },
]

export function TestimonialsSection({
  testimonials = defaultTestimonials,
  title = 'What Our Clients Say',
  description = "Don't just take our word for it. Here's what our clients have to say about working with us.",
  className = '',
}: TestimonialsSectionProps) {
  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>{title}</h2>
          {/* Avatar line under the title (MagicUI-style) */}
          <div className='flex items-center justify-center mb-6'>
            <div className='flex -space-x-3'>
              {[
                'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=96&h=96&fit=crop&crop=faces&auto=format',
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces&auto=format',
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=faces&auto=format',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces&auto=format',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces&auto=format',
                'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=96&h=96&fit=crop&crop=faces&auto=format',
              ].map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt=''
                  width={44}
                  height={44}
                  className='h-11 w-11 rounded-full ring-2 ring-white shadow-md object-cover'
                  aria-hidden
                />
              ))}
            </div>
            <span className='ml-4 text-sm font-medium text-muted-foreground whitespace-nowrap'>
              + 120 happy clients
            </span>
          </div>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            {description}
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {testimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className='bg-card p-6 rounded-lg shadow-sm border'
            >
              <div className='flex items-center mb-4'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4'>
                  <span className='text-primary font-semibold text-lg'>
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className='font-semibold'>{testimonial.name}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
              <p className='text-muted-foreground mb-4'>
                {testimonial.content}
              </p>
              <div className='flex items-center'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className='text-yellow-400'>
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
