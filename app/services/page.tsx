'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Shield,
  CheckCircle,
  Target,
  Zap,
} from 'lucide-react'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { SpecializationsSection } from '@/components/sections/SpecializationsSection'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { FadeIn } from '@/components/animations/FadeIn'
import { AnimatedHeadline } from '@/components/animations/AnimatedHeadline'
import { WorkflowSection } from '@/components/ui/workflow-section'
import { useI18n } from '@/lib/i18n'

export default function ServicesPage() {
  const { t } = useI18n()

  const processSteps = [
    {
      title: t('process.step1.title', 'services'),
      description: t('process.step1.description', 'services'),
      icon: <Target className='h-8 w-8' />,
    },
    {
      title: t('process.step2.title', 'services'),
      description: t('process.step2.description', 'services'),
      icon: <CheckCircle className='h-8 w-8' />,
    },
    {
      title: t('process.step3.title', 'services'),
      description: t('process.step3.description', 'services'),
      icon: <Zap className='h-8 w-8' />,
    },
    {
      title: t('process.step4.title', 'services'),
      description: t('process.step4.description', 'services'),
      icon: <Shield className='h-8 w-8' />,
    },
  ]

  return (
    <Layout>
      <div className='min-h-screen'>
        {/* Hero Section */}
        <section className='relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 md:py-32 overflow-hidden'>
          <Image
            src='/optimized/global.webp'
            alt='Global technology background'
            fill
            className='object-cover object-center opacity-20 pointer-events-none'
            priority={false}
          />
          <div className='absolute inset-0 bg-black/20'></div>

          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-4xl mx-auto text-center'>
              <span className='inline-block px-4 py-2 text-sm font-medium bg-blue-600/20 rounded-full mb-6 border border-blue-500/30'>
                {t('hero.badge', 'services')}
              </span>
              <h1 className='text-4xl md:text-6xl font-bold leading-tight mb-6'>
                <AnimatedHeadline
                  text={t('hero.title', 'services')}
                  className='text-4xl md:text-6xl font-bold leading-tight'
                />
              </h1>
              <p className='text-xl text-blue-100 max-w-3xl mx-auto mb-10'>
                {t('hero.description', 'services')}
              </p>
              <Button size='lg' className='group' asChild>
                <Link href='/contact?title=Get%20Started#contact-form'>
                  {t('hero.getStarted', 'services')}
                  <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <ServicesSection
          title={t('section.title', 'services')}
          description={t('section.description', 'services')}
        />

        {/* Specializations Section */}
        <SpecializationsSection />

        {/* Process Section */}
        <section className='py-20 bg-muted/30'>
          <div className='container mx-auto px-4'>
            <FadeIn delay={0.2} duration={0.8}>
              <div className='text-center mb-16'>
                <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                  {t('process.title', 'services')}
                </h2>
                <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                  {t('process.subtitle', 'services')}
                </p>
              </div>
            </FadeIn>

            <WorkflowSection steps={processSteps} />
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Ready to Transform Your Business?
            </h2>
            <p className='text-xl text-blue-100 max-w-2xl mx-auto mb-8'>
              Let's discuss how our expert team can help you achieve your
              technology goals and drive business growth.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                size='lg'
                className='bg-white text-blue-700 hover:bg-blue-50'
                asChild
              >
                <Link href='/contact?title=Schedule%20Consultation#contact-form'>
                  Schedule Consultation
                </Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='border-white/30 hover:bg-white/10'
                asChild
              >
                <Link href='/case-studies'>View Case Studies</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
