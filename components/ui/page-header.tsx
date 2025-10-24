'use client'

import { motion } from 'framer-motion'
import { brandClasses } from '@/lib/branding'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import { FadeIn, SlideIn } from '@/components/animations'

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: Array<{ name: string; href?: string }>
  actions?: React.ReactNode
  background?: 'default' | 'gradient' | 'hero'
  className?: string
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  background = 'default',
  className = '',
}: PageHeaderProps) {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  const backgroundClasses = {
    default: 'bg-white',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    hero: 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white',
  }

  return (
    <section className={`${backgroundClasses[background]} ${className}`}>
      <div className={brandClasses.container}>
        <div className='py-12 lg:py-16'>
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <FadeIn delay={0.1} duration={0.6}>
              <nav className='mb-6'>
                <ol className='flex items-center space-x-2 text-sm'>
                  {breadcrumbs.map((crumb, index) => (
                    <li key={index} className='flex items-center'>
                      {index > 0 && (
                        <span className='mx-2 text-gray-400'>/</span>
                      )}
                      {crumb.href ? (
                        <a
                          href={crumb.href}
                          className={`${
                            background === 'hero'
                              ? 'text-blue-200 hover:text-white'
                              : 'text-gray-500 hover:text-gray-700'
                          } transition-colors duration-200`}
                        >
                          {crumb.name}
                        </a>
                      ) : (
                        <span
                          className={
                            background === 'hero'
                              ? 'text-white'
                              : 'text-gray-900'
                          }
                        >
                          {crumb.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </FadeIn>
          )}

          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
            <div className='flex-1'>
              {/* Title */}
              <SlideIn direction='up' delay={0.2} duration={0.6}>
                <h1
                  className={`${
                    background === 'hero'
                      ? 'text-4xl sm:text-5xl lg:text-6xl font-bold text-white'
                      : 'text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900'
                  } mb-4`}
                >
                  {title}
                </h1>
              </SlideIn>

              {/* Description */}
              {description && (
                <FadeIn delay={0.4} duration={0.8}>
                  <p
                    className={`text-xl ${
                      background === 'hero'
                        ? 'text-blue-100 max-w-3xl'
                        : 'text-gray-600 max-w-3xl'
                    } leading-relaxed`}
                  >
                    {description}
                  </p>
                </FadeIn>
              )}
            </div>

            {/* Actions */}
            {actions && (
              <FadeIn delay={0.6} duration={0.6}>
                <div className='mt-8 lg:mt-0 lg:ml-8'>{actions}</div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
