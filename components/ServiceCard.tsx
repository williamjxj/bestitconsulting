'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'
import { ServiceCard3D } from '@/components/ui/ServiceCard3D'
import { CardDepthEffects } from '@/components/ui/CardDepthEffects'
import { CardLighting } from '@/components/ui/CardLighting'
import { CardTransitions } from '@/components/ui/CardTransitions'

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
    <CardTransitions
      delay={0.2}
      duration={0.6}
      className={cn('h-full', className)}
    >
      <CardDepthEffects depth={20} perspective={1000}>
        <CardLighting
          lightColor='rgba(59, 130, 246, 0.15)'
          lightIntensity={0.5}
        >
          <ServiceCard3D
            icon={icon}
            title={title}
            description={description}
            perspective={1000}
            rotationRange={10}
            className='h-full'
          />
        </CardLighting>
      </CardDepthEffects>
    </CardTransitions>
  )
}
