'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  ArrowRight,
  Zap,
  TrendingUp,
  Users,
  CheckCircle2,
  Star,
} from 'lucide-react'

// Animated Counter Component
const AnimatedCounter = ({
  end,
  duration = 2,
  suffix = '',
}: {
  end: number
  duration?: number
  suffix?: string
}) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true)
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min(
          (currentTime - startTime) / (duration * 1000),
          1
        )
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [inView, end, duration, hasAnimated])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

// Scroll Reveal Component
const ScrollReveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) => {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 60, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Stagger Children Component
const StaggerChildren = ({
  children,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode
  staggerDelay?: number
}) => {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

export default function UnleashdStyleDemo() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Scroll Progress Bar */}
      <motion.div
        className='fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left'
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section - Unleashd Style */}
      <section className='relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'>
        {/* Animated Background Pattern */}
        <motion.div
          className='absolute inset-0 opacity-10'
          style={{ y: backgroundY }}
        >
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_50%)]' />
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.3),transparent_50%)]' />
        </motion.div>

        <div className='container mx-auto px-6 relative z-10'>
          <div className='max-w-4xl'>
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full mb-8 backdrop-blur-sm'
            >
              <Zap className='w-4 h-4' />
              <span className='text-sm font-medium'>
                AI-Powered Development
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-5xl md:text-7xl font-bold text-white mb-6 leading-tight'
            >
              Still Wrestling with
              <span className='block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>
                Tech Debt & Slow Delivery?
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed'
            >
              We have something even better. AI-augmented teams that ship
              production code{' '}
              <span className='text-blue-400 font-semibold'>10x faster</span>{' '}
              while you sleep.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className='flex flex-wrap gap-4'
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                className='px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/50 transition-colors'
              >
                See How We Transform Teams
                <ArrowRight className='w-5 h-5' />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold backdrop-blur-sm border border-white/20 transition-colors'
              >
                Watch 3-Min Demo
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className='mt-12 flex items-center gap-8 text-slate-400'
            >
              <div className='flex -space-x-2'>
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-slate-900'
                  />
                ))}
              </div>
              <div>
                <div className='flex gap-1 mb-1'>
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star
                      key={i}
                      className='w-4 h-4 fill-yellow-500 text-yellow-500'
                    />
                  ))}
                </div>
                <p className='text-sm'>Trusted by 50+ enterprises</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className='absolute bottom-8 left-1/2 -translate-x-1/2'
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className='w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2'
          >
            <motion.div className='w-1.5 h-1.5 bg-white rounded-full' />
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className='py-24 bg-white'>
        <div className='container mx-auto px-6'>
          <ScrollReveal>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-slate-900 mb-6'>
                Sound Familiar?
              </h2>
              <p className='text-xl text-slate-600'>
                These are the challenges keeping CTOs awake at night
              </p>
            </div>
          </ScrollReveal>

          <StaggerChildren staggerDelay={0.15}>
            {[
              {
                icon: Users,
                title: "Can't Find Senior Developers",
                desc: 'Hiring takes 4-6 months. Projects are stalled. Competition is shipping.',
              },
              {
                icon: TrendingUp,
                title: 'Technical Debt Piling Up',
                desc: 'Legacy systems need modernization. Every sprint feels like maintenance.',
              },
              {
                icon: Zap,
                title: 'AI Promises Not Delivering',
                desc: 'You bought tools. They sit unused. No one knows how to integrate them.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className='bg-slate-50 p-8 rounded-2xl mb-6 hover:shadow-lg transition-shadow'
              >
                <div className='flex gap-6 items-start'>
                  <div className='p-4 bg-red-100 rounded-xl'>
                    <item.icon className='w-8 h-8 text-red-600' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-2xl font-bold text-slate-900 mb-3'>
                      {item.title}
                    </h3>
                    <p className='text-lg text-slate-600'>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Solution Section */}
      <section className='py-24 bg-gradient-to-br from-blue-50 to-purple-50'>
        <div className='container mx-auto px-6'>
          <ScrollReveal>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-slate-900 mb-6'>
                How We're Different
              </h2>
              <p className='text-xl text-slate-600'>
                We don't just code. We architect intelligent systems that scale.
              </p>
            </div>
          </ScrollReveal>

          <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            <StaggerChildren staggerDelay={0.2}>
              {[
                {
                  icon: Zap,
                  title: 'AI-Augmented Teams',
                  desc: 'Human expertise + AI automation = 10x productivity',
                  stat: '10',
                  statLabel: 'Faster Delivery',
                },
                {
                  icon: CheckCircle2,
                  title: 'Production-Ready Code',
                  desc: 'Not prototypes. Real systems handling millions of requests',
                  stat: '99',
                  statLabel: 'Uptime %',
                },
                {
                  icon: TrendingUp,
                  title: 'Predictable ROI',
                  desc: 'Track every dollar invested. See results in weeks, not years',
                  stat: '6',
                  statLabel: 'Weeks To Value',
                },
              ].map((item, idx) => (
                <ScrollReveal delay={idx * 0.15} key={idx}>
                  <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 h-full flex flex-col'>
                    <div className='p-4 bg-blue-100 rounded-xl w-fit mb-6'>
                      <item.icon className='w-8 h-8 text-blue-600' />
                    </div>
                    <h3 className='text-2xl font-bold text-slate-900 mb-4'>
                      {item.title}
                    </h3>
                    <p className='text-slate-600 mb-6 flex-1'>{item.desc}</p>
                    <div className='pt-6 border-t border-slate-200'>
                      <div className='text-4xl font-bold text-blue-600 mb-1'>
                        <AnimatedCounter end={parseInt(item.stat)} suffix='x' />
                      </div>
                      <div className='text-sm text-slate-500'>
                        {item.statLabel}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className='py-24 bg-slate-900'>
        <div className='container mx-auto px-6'>
          <ScrollReveal>
            <div className='max-w-4xl mx-auto'>
              <div className='flex gap-1 mb-6 justify-center'>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star
                    key={i}
                    className='w-6 h-6 fill-yellow-500 text-yellow-500'
                  />
                ))}
              </div>

              <blockquote className='text-center mb-8'>
                <p className='text-2xl md:text-3xl text-white font-medium leading-relaxed mb-8'>
                  "BestIT didn't just build our platform—they transformed how we
                  think about development. Our team now ships features{' '}
                  <span className='text-blue-400'>3x faster</span> than before."
                </p>
              </blockquote>

              <div className='flex items-center justify-center gap-4'>
                <div className='w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500' />
                <div className='text-left'>
                  <div className='text-white font-semibold text-lg'>
                    Sarah Chen
                  </div>
                  <div className='text-slate-400'>
                    VP Engineering, TechCorp Inc.
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-slate-800'>
                {[
                  { value: '70', label: 'Automation Rate', suffix: '%' },
                  { value: '3', label: 'Features Shipped', suffix: 'x' },
                  { value: '4', label: 'Hour Deploys', suffix: 'h' },
                ].map((metric, idx) => (
                  <div key={idx} className='text-center'>
                    <div className='text-4xl font-bold text-blue-400 mb-2'>
                      <AnimatedCounter
                        end={parseInt(metric.value)}
                        suffix={metric.suffix}
                      />
                    </div>
                    <div className='text-sm text-slate-400'>{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 bg-gradient-to-br from-blue-600 to-purple-700'>
        <div className='container mx-auto px-6'>
          <ScrollReveal>
            <div className='max-w-3xl mx-auto text-center'>
              <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
                Ready to 10x Your Development Speed?
              </h2>
              <p className='text-xl text-blue-100 mb-8'>
                Join 50+ companies already shipping faster with AI-augmented
                teams
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-10 py-5 bg-white text-blue-600 rounded-lg font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all inline-flex items-center gap-3'
              >
                Schedule a Free Consultation
                <ArrowRight className='w-6 h-6' />
              </motion.button>

              <p className='mt-6 text-blue-200 text-sm'>
                No credit card required • 30-minute discovery call • See real
                results
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
