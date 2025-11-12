'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Bell,
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
  id: number
  icon: React.ComponentType<{ className?: string }>
  question: string
  color: string
}

const customerInquiries = [
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

export function CustomerInquiriesList() {
  const [notifications, setNotifications] = useState<CustomerInquiry[]>([])
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set())
  const [isHovered, setIsHovered] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    if (isHovered) return // Pause when hovered

    const interval = setInterval(() => {
      const newNotification: CustomerInquiry = {
        id: Date.now() + Math.random(),
        ...customerInquiries[indexRef.current],
      }
      setNotifications(prev => [newNotification, ...prev].slice(0, 6))
      indexRef.current = (indexRef.current + 1) % customerInquiries.length
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovered])

  const removeNotification = (id: number) => {
    setRemovingIds(prev => new Set(prev).add(id))
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
      setRemovingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }, 300)
  }

  return (
    <div className='w-full max-w-sm sm:max-w-md lg:max-w-lg ml-auto mr-0 lg:mr-8'>
      {notifications.length > 0 && (
        <div className='flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3'>
          <div className='relative'>
            <Bell className='w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90' />
            <span className='absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-red-500 rounded-full text-white text-[7px] sm:text-[8px] flex items-center justify-center font-bold animate-pulse'>
              ...
            </span>
          </div>
          <h2 className='text-[10px] sm:text-xs font-semibold text-white/90'>
            Contact Us
          </h2>
        </div>
      )}

      <div
        className='space-y-1.5 sm:space-y-2'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {notifications.map(notification => {
          const Icon = notification.icon
          const isRemoving = removingIds.has(notification.id)

          return (
            <div
              key={notification.id}
              className={`transform transition-all duration-300 ${
                isRemoving
                  ? 'opacity-0 scale-95 -translate-x-full'
                  : 'opacity-100 scale-100 translate-x-0'
              }`}
              style={{
                animation: isRemoving ? 'none' : 'slideIn 0.4s ease-out',
              }}
            >
              <div className='bg-white/10 backdrop-blur-sm rounded-md sm:rounded-lg p-2 sm:p-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer border border-white/10 hover:border-white/20'>
                <div className='flex items-start gap-1.5 sm:gap-2'>
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-gradient-to-br ${notification.color} flex items-center justify-center flex-shrink-0 shadow-sm`}
                  >
                    <Icon className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-white/90 text-[10px] sm:text-xs leading-relaxed'>
                      {notification.question}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
