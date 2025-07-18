'use client'

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
} from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 md:py-32'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-white/10 to-transparent rounded-full animate-pulse-slow'></div>
        <div className='absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-cyan-400/20 to-transparent rounded-full animate-float'></div>

        {/* Floating geometric shapes */}
        <div
          className='absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-300/30 rounded-full animate-float'
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className='absolute top-3/4 right-1/4 w-6 h-6 bg-blue-300/20 rounded-full animate-float'
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className='absolute top-1/2 left-3/4 w-3 h-3 bg-indigo-300/40 rounded-full animate-float'
          style={{ animationDelay: '4s' }}
        ></div>

        {/* Animated grid lines */}
        <div className='absolute inset-0 opacity-10'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              animation: 'gradient-shift 15s ease infinite',
            }}
          ></div>
        </div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='max-w-4xl mx-auto text-center'>
          <span className='inline-flex items-center gap-2 px-3 py-1 text-sm font-medium bg-blue-600/20 rounded-full mb-6 border border-blue-500/30 animate-scale-pulse'>
            <Sparkles className='h-4 w-4 text-cyan-300' />
            Trusted by leading Canadian businesses
          </span>

          <h1 className='text-4xl md:text-6xl font-bold leading-tight mb-6'>
            Transform Your Digital Future with
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-300 animate-gradient'>
              {' '}
              BestIT Consulting
            </span>
          </h1>

          <p className='text-xl text-blue-100 max-w-2xl mx-auto mb-10 animate-slide-up'>
            We deliver cutting-edge software solutions that drive business
            growth and digital transformation for enterprises across Canada.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center mb-16'>
            <Button size='lg' className='group hover-glow' asChild>
              <Link href='/contact'>
                <Rocket className='mr-2 h-4 w-4' />
                Get Free Consultation
                <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
              </Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='bg-transparent border-white/20 hover:bg-white/10 hover-lift'
              asChild
            >
              <Link href='/portfolio'>
                <Zap className='mr-2 h-4 w-4' />
                View Our Work
              </Link>
            </Button>
          </div>

          <div className='mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto'>
            {[
              {
                icon: (
                  <Code2 className='h-8 w-8 mx-auto mb-3 text-cyan-300 animate-float' />
                ),
                label: '10+ Years Experience',
                delay: '0s',
              },
              {
                icon: (
                  <Globe className='h-8 w-8 mx-auto mb-3 text-cyan-300 animate-float' />
                ),
                label: '50+ Projects Delivered',
                delay: '1s',
              },
              {
                icon: (
                  <Users className='h-8 w-8 mx-auto mb-3 text-cyan-300 animate-float' />
                ),
                label: '30+ Expert Team',
                delay: '2s',
              },
              {
                icon: (
                  <Award className='h-8 w-8 mx-auto mb-3 text-cyan-300 animate-float' />
                ),
                label: '95% Client Retention',
                delay: '3s',
              },
            ].map((item, index) => (
              <div
                key={index}
                className='text-center hover-lift'
                style={{ animationDelay: item.delay }}
              >
                <div style={{ animationDelay: item.delay }}>{item.icon}</div>
                <p className='text-lg font-semibold'>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
