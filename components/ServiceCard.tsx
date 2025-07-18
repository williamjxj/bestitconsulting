'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  technologies: string[]
  className?: string
}

export function ServiceCard({
  icon,
  title,
  description,
  features,
  technologies,
  className,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <Card
      className={cn(
        'group relative overflow-hidden h-full transition-all duration-300 border border-border/40 hover:border-blue-500/30',
        'bg-gradient-to-b from-card to-card/80 hover:to-card/90',
        'shadow-sm hover:shadow-lg hover:shadow-blue-500/10',
        'transform hover:-translate-y-1',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

      <div className='relative z-10 p-6'>
        <div className='flex items-start justify-between mb-6'>
          <div className='p-3 rounded-lg bg-blue-500/10 text-blue-400 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:scale-110'>
            <div className='w-10 h-10 flex items-center justify-center'>
              <div className='transition-transform duration-300 group-hover:rotate-12'>
                {icon}
              </div>
            </div>
          </div>
          <ChevronRight
            className={cn(
              'h-5 w-5 text-muted-foreground transition-transform duration-300',
              isHovered ? 'translate-x-1 text-blue-500' : ''
            )}
          />
        </div>

        <h3 className='text-xl font-bold mb-3 text-foreground'>{title}</h3>
        <p className='text-muted-foreground mb-6'>{description}</p>

        <div className='mb-6'>
          <h4 className='text-sm font-medium text-foreground/80 mb-3'>
            Key Features:
          </h4>
          <ul className='space-y-2'>
            {features.map((feature, i) => (
              <li key={i} className='flex items-start'>
                <svg
                  className='h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='text-sm'>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='mt-auto pt-4 border-t border-border/20'>
          <h4 className='text-sm font-medium text-foreground/80 mb-2'>
            Technologies:
          </h4>
          <div className='flex flex-wrap gap-2'>
            {technologies.map((tech, i) => (
              <Badge
                key={i}
                variant='secondary'
                className='text-xs font-normal bg-background/50 hover:bg-background/70 transition-colors'
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
