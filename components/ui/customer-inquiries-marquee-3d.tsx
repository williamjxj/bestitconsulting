'use client'

import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Marquee } from '@/components/ui/marquee'
import {
  Database,
  Search,
  Cloud,
  Smartphone,
  MessageSquare,
  BarChart,
  Lock,
  Cpu,
  Zap,
  TrendingUp,
  Video,
} from 'lucide-react'

interface CustomerInquiry {
  icon: React.ComponentType<{ className?: string }>
  question: string
  color: string
}

const customerInquiries: CustomerInquiry[] = [
  {
    icon: Database,
    question: 'Do you offer data pipeline setup and visualization?',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Search,
    question:
      'We want to add AI-based search and recommendations to our product.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cloud,
    question:
      'Can you help us migrate our legacy system to a modern cloud infrastructure?',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Smartphone,
    question:
      'We need a scalable mobile app with real-time transaction processing.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: MessageSquare,
    question:
      'Looking for AI chatbot integration for our customer support platform.',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: BarChart,
    question:
      'We want to add new features to our product using AI technologies, then replace our legacy system with a modern one.',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Zap,
    question:
      'We need a custom e-commerce solution with inventory management and analytics.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Cpu,
    question:
      'Looking for technical consulting to choose the right tech stack for our MVP.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Video,
    question:
      'Do you handle video processing and CDN integration for streaming platforms?',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Lock,
    question:
      'Can you implement multi-factor authentication and security auditing?',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    question: 'Our cloud costs are too high — can you help optimize them?',
    color: 'from-emerald-500 to-green-500',
  },
]

const InquiryCard = ({ icon: Icon, question, color }: CustomerInquiry) => {
  return (
    <figure
      className={cn(
        'relative h-full w-fit cursor-pointer overflow-hidden rounded-xl border p-4 sm:w-36',
        // light styles - matching Magic UI demo exactly
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles - matching Magic UI demo exactly
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <div className='flex flex-row items-center gap-2 mb-2'>
        <div
          className={cn(
            'w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-sm',
            color
          )}
        >
          <Icon className='w-4 h-4 text-white' />
        </div>
      </div>
      <blockquote className='mt-2 text-sm text-white leading-relaxed'>
        {question}
      </blockquote>
    </figure>
  )
}

export function CustomerInquiriesMarquee3D() {
  // Split inquiries into 4 rows for the 3D effect
  const firstRow = customerInquiries.slice(
    0,
    Math.ceil(customerInquiries.length / 4)
  )
  const secondRow = customerInquiries.slice(
    Math.ceil(customerInquiries.length / 4),
    Math.ceil(customerInquiries.length / 2)
  )
  const thirdRow = customerInquiries.slice(
    Math.ceil(customerInquiries.length / 2),
    Math.ceil((customerInquiries.length * 3) / 4)
  )
  const fourthRow = customerInquiries.slice(
    Math.ceil((customerInquiries.length * 3) / 4)
  )

  useEffect(() => {
    // Add CSS to pause all animations when hovering the container
    const style = document.createElement('style')
    style.textContent = `
      .marquee-container:hover .animate-marquee,
      .marquee-container:hover .animate-marquee-reverse,
      .marquee-container:hover .animate-marquee-vertical,
      .marquee-container:hover .animate-marquee-vertical-reverse {
        animation-play-state: paused !important;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className='marquee-container relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]'>
      <div
        className='flex flex-row items-center gap-4'
        style={{
          transform:
            'translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
        }}
      >
        <Marquee
          pauseOnHover
          vertical
          className='[--duration:40s] group-hover:[animation-play-state:paused]'
        >
          {firstRow.map((inquiry, index) => (
            <InquiryCard key={`first-${index}`} {...inquiry} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className='[--duration:40s] group-hover:[animation-play-state:paused]'
          vertical
        >
          {secondRow.map((inquiry, index) => (
            <InquiryCard key={`second-${index}`} {...inquiry} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className='[--duration:40s] group-hover:[animation-play-state:paused]'
          vertical
        >
          {thirdRow.map((inquiry, index) => (
            <InquiryCard key={`third-${index}`} {...inquiry} />
          ))}
        </Marquee>
        <Marquee
          pauseOnHover
          className='[--duration:40s] group-hover:[animation-play-state:paused]'
          vertical
        >
          {fourthRow.map((inquiry, index) => (
            <InquiryCard key={`fourth-${index}`} {...inquiry} />
          ))}
        </Marquee>
      </div>

      {/* Gradient overlays - matching Magic UI demo exactly */}
      <div className='from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b'></div>
      <div className='from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t'></div>
      <div className='from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r'></div>
      <div className='from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l'></div>
    </div>
  )
}
