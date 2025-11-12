/**
 * SpecializationsSection component
 * Displays industry specializations with card-based layout
 */

'use client'

import { ReactNode } from 'react'
import {
  Layers,
  Briefcase,
  DollarSign,
  Activity,
  Store,
  Package,
  Plane,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FadeIn } from '@/components/animations/FadeIn'
import { ScaleIn } from '@/components/animations/ScaleIn'
import { cn } from '@/lib/utils'

interface Specialization {
  id: string
  title: string
  description: string
  icon: ReactNode
  hoverGradient: string
  iconGradient: string
}

interface SpecializationsSectionProps {
  title?: string
  description?: string
  className?: string
}

const specializations: Specialization[] = [
  {
    id: 'technology-companies',
    title: 'Technology Companies',
    description:
      'We help you accelerate growth, reduce resource strain and deliver high-quality software more cost-effectively. Our services include AI consulting, Full-Stack Software Development & Outsourcing Services.',
    icon: <Layers className='h-8 w-8 text-white' />,
    hoverGradient: 'from-blue-50 to-cyan-50',
    iconGradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'small-medium-businesses',
    title: 'Small & Medium Businesses',
    description:
      'We enable small and mid-sized companies to update legacy systems with AI, improving service levels, reducing costs and creating better performance.',
    icon: <Briefcase className='h-8 w-8 text-white' />,
    hoverGradient: 'from-purple-50 to-pink-50',
    iconGradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'banking-finance',
    title: 'Banking & Finance',
    description:
      'We support you in offering reliable, secure and client-focused services that build trust, deepen engagement and strengthen your competitive position.',
    icon: <DollarSign className='h-8 w-8 text-white' />,
    hoverGradient: 'from-emerald-50 to-teal-50',
    iconGradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'healthcare-media',
    title: 'Healthcare & Media',
    description:
      'We partner with you to deliver engaging, compliant and impactful services that improve user experience, drive growth and enhance your reputation.',
    icon: <Activity className='h-8 w-8 text-white' />,
    hoverGradient: 'from-red-50 to-rose-50',
    iconGradient: 'from-red-500 to-rose-500',
  },
  {
    id: 'retail-ecommerce',
    title: 'Retail & E-Commerce',
    description:
      "We help you create compelling customer experiences, increase conversion and grow your brand's digital success.",
    icon: <Store className='h-8 w-8 text-white' />,
    hoverGradient: 'from-amber-50 to-orange-50',
    iconGradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'logistics-transportation',
    title: 'Logistics & Transportation',
    description:
      'We assist you in improving visibility, agility and responsiveness across your operations so you can deliver with precision and respond quickly to market demands.',
    icon: <Package className='h-8 w-8 text-white' />,
    hoverGradient: 'from-indigo-50 to-blue-50',
    iconGradient: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'hospitality-entertainment',
    title: 'Hospitality & Entertainment',
    description:
      'We support enterprises in these dynamic sectors to elevate customer engagement, streamline operations and stay ahead in fast-moving consumer markets.',
    icon: <Plane className='h-8 w-8 text-white' />,
    hoverGradient: 'from-violet-50 to-purple-50',
    iconGradient: 'from-violet-500 to-purple-500',
  },
]

export function SpecializationsSection({
  title = 'What Industries We Specialise In',
  description = 'At Best IT Consulting, we deliver tailored solutions across diverse industries — helping you transform your business, not just your technology. Here are the sectors we serve and how we bring value:',
  className = '',
}: SpecializationsSectionProps) {
  return (
    <section className={`py-20 bg-muted/30 ${className}`}>
      <div className='container mx-auto px-4'>
        <FadeIn delay={0.2} duration={0.8}>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>{title}</h2>
            <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
              {description}
            </p>
          </div>
        </FadeIn>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {specializations.map((specialization, index) => (
            <ScaleIn
              key={specialization.id}
              delay={0.4 + index * 0.1}
              duration={0.6}
              className='h-full'
            >
              <div className='group h-full'>
                <div
                  className={cn(
                    'rounded-xl text-card-foreground h-full border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 ease-out group-hover:scale-105 relative overflow-hidden',
                    `before:absolute before:inset-0 before:bg-gradient-to-br ${specialization.hoverGradient} before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100 before:z-0`
                  )}
                >
                  <div className='relative z-10'>
                    <CardHeader className='p-6 pb-4'>
                      <div className='flex items-start mb-4'>
                        <div
                          className={cn(
                            'p-3 rounded-2xl bg-gradient-to-r flex-shrink-0',
                            specialization.iconGradient,
                            'shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3'
                          )}
                        >
                          {specialization.icon}
                        </div>
                        <div className='ml-4 flex-1'>
                          <CardTitle className='tracking-tight text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 leading-tight'>
                            {specialization.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className='p-6 pt-0'>
                      <CardDescription className='text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-base'>
                        {specialization.description}
                      </CardDescription>
                    </CardContent>
                  </div>
                </div>
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  )
}
