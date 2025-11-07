'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Code2,
  Users,
  Cloud,
  Shield,
  Server,
  BarChart2,
  CheckCircle,
  Target,
  Zap,
} from 'lucide-react'
import { ServiceCard } from '@/components/ServiceCard'
import { ServicesSection } from '@/components/sections/ServicesSection'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { ScrollTrigger } from '@/components/animations/ScrollTrigger'
import { FadeIn } from '@/components/animations/FadeIn'
import { SlideIn } from '@/components/animations/SlideIn'
import { AnimatedHeadline } from '@/components/animations/AnimatedHeadline'
import { PageHeader } from '@/components/ui/page-header'
import { Section } from '@/components/ui/section'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { R2Image, R2HeroImage } from '@/components/R2Image'
import { useR2Assets, R2_ASSET_MAPPINGS } from '@/hooks/useR2Assets'

export default function ServicesPage() {
  const breadcrumbs = [{ name: 'Home', href: '/' }, { name: 'Services' }]
  const { getImages, getAssetByFilename } = useR2Assets()

  // Get R2 assets for services page
  const heroImage = getAssetByFilename(R2_ASSET_MAPPINGS.services.hero)
  const teamImage = getAssetByFilename(R2_ASSET_MAPPINGS.services.team)

  // Refs for animated beam nodes
  const containerRef = useRef<HTMLDivElement>(null!)
  const node1Ref = useRef<HTMLDivElement>(null!)
  const node2Ref = useRef<HTMLDivElement>(null!)
  const node3Ref = useRef<HTMLDivElement>(null!)
  const node4Ref = useRef<HTMLDivElement>(null!)
  const centerNodeRef = useRef<HTMLDivElement>(null!)

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Analysis',
      description:
        'We analyze your business needs, technical requirements, and current infrastructure to create a comprehensive project roadmap.',
      icon: <Target className='h-8 w-8' />,
    },
    {
      step: '02',
      title: 'Strategy & Planning',
      description:
        'Our experts develop a detailed technical strategy and project plan with clear milestones and deliverables.',
      icon: <CheckCircle className='h-8 w-8' />,
    },
    {
      step: '03',
      title: 'Implementation',
      description:
        'We execute the project using agile methodologies, ensuring regular communication and feedback throughout the process.',
      icon: <Zap className='h-8 w-8' />,
    },
    {
      step: '04',
      title: 'Support & Optimization',
      description:
        'Ongoing support, monitoring, and optimization to ensure your solution continues to deliver maximum value.',
      icon: <Shield className='h-8 w-8' />,
    },
  ]

  return (
    <Layout>
      <div className='min-h-screen'>
        {/* Hero Section */}
        <section className='relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 md:py-32'>
          <div className='absolute inset-0 bg-black/20'></div>

          {/* Animated Beam Background */}
          <div className='absolute inset-0 overflow-hidden'>
            <div className='relative h-full w-full' ref={containerRef}>
              {/* Service nodes for animated beams */}
              <div
                className='absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-400/30 flex items-center justify-center'
                ref={node1Ref}
              >
                <Code2 className='h-8 w-8 text-blue-300' />
              </div>
              <div
                className='absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400/30 flex items-center justify-center'
                ref={node2Ref}
              >
                <Cloud className='h-8 w-8 text-cyan-300' />
              </div>
              <div
                className='absolute bottom-1/3 left-1/3 w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-400/30 flex items-center justify-center'
                ref={node3Ref}
              >
                <Shield className='h-8 w-8 text-purple-300' />
              </div>
              <div
                className='absolute bottom-1/4 right-1/3 w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-400/30 flex items-center justify-center'
                ref={node4Ref}
              >
                <Server className='h-8 w-8 text-green-300' />
              </div>
              <div
                className='absolute top-1/2 left-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-2 border-white/20 flex items-center justify-center'
                ref={centerNodeRef}
              >
                <Target className='h-10 w-10 text-white' />
              </div>

              {/* Animated Beams */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={node1Ref}
                toRef={centerNodeRef}
                curvature={50}
                duration={3}
                delay={0}
                gradientStartColor='#3b82f6'
                gradientStopColor='#8b5cf6'
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={node2Ref}
                toRef={centerNodeRef}
                curvature={-50}
                duration={3}
                delay={0.5}
                gradientStartColor='#06b6d4'
                gradientStopColor='#8b5cf6'
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={node3Ref}
                toRef={centerNodeRef}
                curvature={50}
                duration={3}
                delay={1}
                gradientStartColor='#a855f7'
                gradientStopColor='#8b5cf6'
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={node4Ref}
                toRef={centerNodeRef}
                curvature={-50}
                duration={3}
                delay={1.5}
                gradientStartColor='#10b981'
                gradientStopColor='#8b5cf6'
              />
            </div>
          </div>

          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-4xl mx-auto text-center'>
              <span className='inline-block px-4 py-2 text-sm font-medium bg-blue-600/20 rounded-full mb-6 border border-blue-500/30'>
                Our Services
              </span>
              <h1 className='text-4xl md:text-6xl font-bold leading-tight mb-6'>
                <AnimatedHeadline
                  text='Comprehensive IT Solutions for Your Business'
                  className='text-4xl md:text-6xl font-bold leading-tight'
                />
              </h1>
              <p className='text-xl text-blue-100 max-w-3xl mx-auto mb-10'>
                From full-stack development to cloud solutions and
                cybersecurity, we provide end-to-end technology services that
                drive digital transformation and business growth.
              </p>
              <Button size='lg' className='group' asChild>
                <Link href='/contact'>
                  Get Started Today
                  <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <ServicesSection
          title='What We Offer'
          description='We deliver cutting-edge technology services that help businesses scale, innovate, and succeed in the digital era.'
        />

        {/* Process Section */}
        <ScrollTrigger animation='fade' direction='up' duration={0.8}>
          <section className='py-20 bg-muted/30'>
            <div className='container mx-auto px-4'>
              <FadeIn delay={0.2} duration={0.8}>
                <div className='text-center mb-16'>
                  <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                    Our Process
                  </h2>
                  <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                    We follow a proven methodology to ensure successful project
                    delivery and client satisfaction.
                  </p>
                </div>
              </FadeIn>

              <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {processSteps.map((step, index) => (
                  <SlideIn
                    key={index}
                    direction='up'
                    delay={0.4 + index * 0.1}
                    duration={0.6}
                  >
                    <div className='text-center group'>
                      <div className='relative mb-6'>
                        <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300'>
                          <div className='text-white'>{step.icon}</div>
                        </div>
                        <span className='absolute -top-2 -right-2 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold'>
                          {step.step}
                        </span>
                      </div>
                      <h3 className='text-xl font-semibold mb-3'>
                        {step.title}
                      </h3>
                      <p className='text-muted-foreground'>
                        {step.description}
                      </p>
                    </div>
                  </SlideIn>
                ))}
              </div>
            </div>
          </section>
        </ScrollTrigger>

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
                <Link href='/portfolio'>View Case Studies</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
