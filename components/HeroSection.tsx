'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Code2,
  Globe,
  Users,
  Award,
  Sparkles,
  Zap,
  Rocket,
  CheckCircle,
  Cpu,
  Database,
} from 'lucide-react'
import Link from 'next/link'
import { FadeIn } from '@/components/animations/FadeIn'
import { SlideIn } from '@/components/animations/SlideIn'
import { ScaleIn } from '@/components/animations/ScaleIn'
// import { HeroVisual } from '@/components/ui/hero-visual'
// import { ProfessionalImage } from '@/components/ui/professional-image'
// import { AnimatedText } from '@/components/hero/AnimatedText'
// import { ParticleBackground } from '@/components/animations/ParticleBackground'
// import { EnhancedParticleBackground } from '@/components/hero/EnhancedParticleBackground'
// import { InteractiveParticles } from '@/components/hero/InteractiveParticles'
// import { OptimizedParticles } from '@/components/hero/OptimizedParticles'
// import { GradientBackground } from '@/components/hero/GradientBackground'
// import { AnimatedGradientText } from '@/components/hero/AnimatedGradientText'
// import { TypewriterHeadline } from '@/components/hero/TypewriterHeadline'
// import { ScrollTextReveal } from '@/components/hero/ScrollTextReveal'
// import { TextMorphing } from '@/components/hero/TextMorphing'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { ButtonHoverEffects } from '@/components/ui/ButtonHoverEffects'
// import LazyAnimation from '@/components/animations/LazyAnimation'

export function HeroSection() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white h-screen flex items-center'>
      {/* Enhanced animated background with particle system */}
      {/* <LazyAnimation
        component={EnhancedParticleBackground}
        particleCount={200}
        particleSize={0.05}
        particleColor='#3B82F6'
        className='absolute inset-0'
        threshold={0.1}
        rootMargin='100px'
      > */}
      <div className='absolute inset-0 overflow-hidden'>
        {/* Primary gradient orbs */}
        <div className='absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-500/20 to-transparent rounded-full animate-pulse-slow'></div>
        <div className='absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-cyan-400/15 to-transparent rounded-full animate-float'></div>

        {/* Secondary gradient layers */}
        <div
          className='absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-radial from-purple-500/10 to-transparent rounded-full animate-pulse-slow'
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className='absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-radial from-emerald-400/10 to-transparent rounded-full animate-float'
          style={{ animationDelay: '4s' }}
        ></div>

        {/* Enhanced floating geometric shapes */}
        <div
          className='absolute top-20 left-20 w-6 h-6 bg-cyan-300/40 rounded-full animate-float'
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className='absolute top-40 right-32 w-4 h-4 bg-blue-300/30 rounded-full animate-float'
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className='absolute top-60 left-1/2 w-8 h-8 bg-purple-300/25 rounded-full animate-float'
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className='absolute bottom-40 right-20 w-5 h-5 bg-emerald-300/35 rounded-full animate-float'
          style={{ animationDelay: '3s' }}
        ></div>
        <div
          className='absolute bottom-60 left-40 w-3 h-3 bg-pink-300/30 rounded-full animate-float'
          style={{ animationDelay: '4s' }}
        ></div>

        {/* Tech-themed floating icons */}
        <div
          className='absolute top-32 right-1/4 opacity-20 animate-float'
          style={{ animationDelay: '1s' }}
        >
          <Code2 className='h-8 w-8 text-cyan-300' />
        </div>
        <div
          className='absolute bottom-32 left-1/4 opacity-20 animate-float'
          style={{ animationDelay: '3s' }}
        >
          <Database className='h-6 w-6 text-blue-300' />
        </div>
        <div
          className='absolute top-1/2 right-20 opacity-20 animate-float'
          style={{ animationDelay: '5s' }}
        >
          <Cpu className='h-7 w-7 text-purple-300' />
        </div>

        {/* Animated mesh grid */}
        <div className='absolute inset-0 opacity-10'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              animation: 'gradient-shift 20s ease infinite',
            }}
          ></div>
        </div>

        {/* Noise texture overlay for depth */}
        <div className='absolute inset-0 opacity-[0.015] bg-gradient-to-br from-white to-transparent mix-blend-overlay'></div>
      </div>
      {/* </ParticleBackground> */}

      <div className='w-full px-4 sm:px-6 lg:px-8 relative z-10 pt-16 sm:pt-20'>
        <div className='w-full lg:max-w-7xl lg:mx-auto text-center'>
          {/* Enhanced trust badge */}
          <FadeIn delay={0.2} duration={0.8}>
            <div className='inline-flex items-center gap-3 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full mb-8 border border-blue-500/30 backdrop-blur-sm animate-scale-pulse'>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                <Sparkles className='h-4 w-4 text-cyan-300' />
              </div>
              <span>Trusted by 50+ Canadian enterprises</span>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className='w-1 h-1 bg-yellow-400 rounded-full'
                  ></div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Enhanced main headline with better typography */}
          <SlideIn direction='up' delay={0.4} duration={1.0}>
            <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 tracking-tight'>
              <span className='block mb-2'>Transform Your</span>
              <span className='block mb-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent'>
                Digital Future
              </span>
              <span className='block text-4xl md:text-5xl lg:text-6xl mt-4 text-blue-100'>
                with Expert IT Solutions
              </span>
            </h1>
          </SlideIn>

          {/* Enhanced subtitle with better spacing */}
          {/* <ScrollTextReveal
            text="We deliver cutting-edge software solutions that drive business growth and digital transformation for enterprises across Canada. From startup to scale."
            className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto mb-12 leading-relaxed"
            delay={1.2}
            staggerChildren={0.02}
          /> */}
          <p className='text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto mb-12 leading-relaxed'>
            We deliver cutting-edge software solutions that drive business
            growth and digital transformation for enterprises across Canada.
            From startup to scale.
          </p>

          {/* Enhanced CTA buttons */}
          <SlideIn direction='up' delay={1.4} duration={0.8}>
            <div className='flex flex-col sm:flex-row gap-6 justify-center items-center mb-16'>
              <AnimatedButton
                size='lg'
                className='group text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300'
                rippleColor='rgba(255, 255, 255, 0.3)'
                duration={0.6}
                asChild
              >
                <Link href='/contact?title=Get%20Free%20Consultation#contact-form'>
                  <Rocket className='mr-2 h-5 w-5' />
                  Get Free Consultation
                  <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                </Link>
              </AnimatedButton>
              <ButtonHoverEffects
                size='lg'
                variant='outline'
                className='text-lg px-8 py-4 bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-300'
                hoverScale={1.05}
                hoverBgColor='rgba(255, 255, 255, 0.2)'
                asChild
              >
                <Link href='/portfolio'>
                  <Zap className='mr-2 h-5 w-5' />
                  View Our Work
                </Link>
              </ButtonHoverEffects>
            </div>
          </SlideIn>

          {/* Enhanced stats with modern cards */}
          <FadeIn delay={1.6} duration={1.0}>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 w-full lg:max-w-7xl lg:mx-auto'>
              {[
                {
                  icon: <Award className='h-8 w-8 text-yellow-400' />,
                  number: '10+',
                  label: 'Years Experience',
                  accent: 'from-yellow-400 to-orange-500',
                },
                {
                  icon: <Globe className='h-8 w-8 text-green-400' />,
                  number: '500+',
                  label: 'Projects Delivered',
                  accent: 'from-green-400 to-emerald-500',
                },
                {
                  icon: <Users className='h-8 w-8 text-blue-400' />,
                  number: '50+',
                  label: 'Expert Team',
                  accent: 'from-blue-400 to-cyan-500',
                },
                {
                  icon: <CheckCircle className='h-8 w-8 text-purple-400' />,
                  number: '98%',
                  label: 'Client Satisfaction',
                  accent: 'from-purple-400 to-pink-500',
                },
              ].map((item, index) => (
                <ScaleIn key={index} delay={1.8 + index * 0.2} duration={0.6}>
                  <div className='group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl'>
                    <div className='mb-4'>
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} p-0.5 mx-auto`}
                      >
                        <div className='w-full h-full bg-slate-900/50 rounded-lg flex items-center justify-center'>
                          {item.icon}
                        </div>
                      </div>
                    </div>
                    <div className='text-2xl md:text-3xl font-bold mb-2'>
                      {item.number}
                    </div>
                    <div className='text-blue-100/80 text-sm md:text-base font-medium'>
                      {item.label}
                    </div>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
