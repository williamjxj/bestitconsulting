'use client'
import React, { useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  ArrowRight,
  Heart,
  Target,
  Users,
  Zap,
  TrendingUp,
  Award,
  Code,
  Globe,
  Sparkles,
  Coffee,
  Rocket,
  Star,
  CheckCircle2,
} from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'

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

export default function AboutPage() {
  const { scrollYProgress } = useScroll()

  const teamMembers = [
    {
      name: 'William Jiang',
      role: 'Co-Founder & Lead Engineer',
      image: '👨‍💻',
      bio: '20+ years building scalable systems for FedEx, WebMD, and Credit Suisse',
      expertise: ['Full-Stack', 'AI/ML', 'Cloud Architecture'],
      quote: 'Code should solve problems, not create them.',
    },
    {
      name: 'Sarah Chen',
      role: 'VP of Engineering',
      image: '👩‍💻',
      bio: 'Former Tech Lead at Amazon, shipped products used by millions',
      expertise: ['React', 'DevOps', 'Team Leadership'],
      quote: 'Great software is built by great teams.',
    },
    {
      name: 'David Kumar',
      role: 'AI Solutions Architect',
      image: '👨‍🔬',
      bio: 'PhD in Machine Learning, previously at Google Brain',
      expertise: ['LLMs', 'RAG', 'NLP'],
      quote: 'AI should augment humans, not replace them.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Strategy Lead',
      image: '👩‍💼',
      bio: 'Helped 50+ startups achieve product-market fit',
      expertise: ['UX Design', 'Product', 'Strategy'],
      quote: "Users don't care about your tech stack.",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: 'Client Success First',
      description: "Your success is our success. We don't win unless you win.",
      color: 'red',
    },
    {
      icon: Zap,
      title: 'Move Fast, Break Nothing',
      description:
        'Speed matters, but not at the expense of quality. We ship fast AND right.',
      color: 'yellow',
    },
    {
      icon: Users,
      title: 'Radical Transparency',
      description:
        'No surprises. Ever. We communicate early, often, and honestly.',
      color: 'blue',
    },
    {
      icon: Rocket,
      title: 'Continuous Innovation',
      description:
        'We stay ahead so you stay ahead. Constant learning is our superpower.',
      color: 'purple',
    },
  ]

  const milestones = [
    { year: '2000', event: 'William starts at FedEx Singapore', icon: Globe },
    {
      year: '2007',
      event: 'Building e-commerce at Best Buy Canada',
      icon: Code,
    },
    { year: '2014', event: 'Leading frontend at WebMD NYC', icon: TrendingUp },
    { year: '2021', event: 'AI/ML pipelines at Xperi', icon: Sparkles },
    { year: '2024', event: 'Founded BestIT Consulting', icon: Rocket },
    { year: '2025', event: 'Serving 50+ enterprise clients', icon: Award },
  ]

  return (
    <div className='min-h-screen bg-slate-50'>
      <motion.div
        className='fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left'
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero */}
      <section className='relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.3),transparent_50%)]' />
        </div>

        <div className='container mx-auto px-6 relative z-10'>
          <div className='max-w-4xl'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full mb-8 backdrop-blur-sm'
            >
              <Heart className='w-4 h-4' />
              <span className='text-sm font-medium'>Our Story</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='text-5xl md:text-7xl font-bold text-white mb-6 leading-tight'
            >
              We're Not Your Typical
              <span className='block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>
                Consulting Firm
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className='text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed'
            >
              We're engineers who've shipped real products at FedEx, WebMD,
              Credit Suisse, and HSBC. Now we're helping companies like yours
              build faster with AI.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-24 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto'>
            <ScrollReveal>
              <div className='text-center mb-16'>
                <Target className='w-16 h-16 text-blue-600 mx-auto mb-6' />
                <h2 className='text-4xl md:text-5xl font-bold text-slate-900 mb-6'>
                  Our Mission
                </h2>
                <p className='text-2xl text-slate-700 leading-relaxed'>
                  To democratize AI-powered development so every business can
                  ship production code at the speed of Silicon Valley
                  startups—without the Silicon Valley price tag.
                </p>
              </div>
            </ScrollReveal>

            <div className='grid md:grid-cols-3 gap-8 mt-16'>
              <StaggerChildren>
                {[
                  { num: '50+', label: 'Enterprise Clients' },
                  { num: '20+', label: 'Years Experience' },
                  { num: '10x', label: 'Average Speed Gain' },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className='text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl'
                  >
                    <div className='text-5xl font-bold text-blue-600 mb-2'>
                      {stat.num}
                    </div>
                    <div className='text-slate-600'>{stat.label}</div>
                  </div>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className='py-24 bg-gradient-to-br from-slate-50 to-blue-50'>
        <div className='container mx-auto px-6'>
          <ScrollReveal>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-slate-900 mb-6'>
                What We Stand For
              </h2>
              <p className='text-xl text-slate-600'>
                These aren't just words on a wall. They're how we work every
                single day.
              </p>
            </div>
          </ScrollReveal>

          <div className='grid md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
            <StaggerChildren staggerDelay={0.15}>
              {values.map((value, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className='bg-white p-8 rounded-2xl shadow-lg'
                >
                  <div
                    className={`p-4 bg-${value.color}-100 rounded-xl w-fit mb-6`}
                  >
                    <value.icon className={`w-8 h-8 text-${value.color}-600`} />
                  </div>
                  <h3 className='text-2xl font-bold text-slate-900 mb-4'>
                    {value.title}
                  </h3>
                  <p className='text-slate-600 leading-relaxed'>
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className='py-24 bg-white'>
        <div className='container mx-auto px-6'>
          <ScrollReveal>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-slate-900 mb-6'>
                Meet the Team
              </h2>
              <p className='text-xl text-slate-600'>
                Battle-tested engineers from companies you know and trust
              </p>
            </div>
          </ScrollReveal>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto'>
            <StaggerChildren staggerDelay={0.1}>
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8 }}
                  className='bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all'
                >
                  <div className='text-6xl mb-4 text-center'>
                    {member.image}
                  </div>
                  <h3 className='text-xl font-bold text-slate-900 mb-1 text-center'>
                    {member.name}
                  </h3>
                  <p className='text-blue-600 text-sm mb-4 text-center font-medium'>
                    {member.role}
                  </p>
                  <p className='text-slate-600 text-sm mb-4 leading-relaxed'>
                    {member.bio}
                  </p>

                  <div className='flex flex-wrap gap-2 mb-4'>
                    {member.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className='px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full'
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className='pt-4 border-t border-slate-200'>
                    <p className='text-slate-500 text-sm italic'>
                      "{member.quote}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className='py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'>
        <div className='container mx-auto px-6'>
          <ScrollReveal>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
                Our Journey
              </h2>
              <p className='text-xl text-slate-300'>
                From Singapore to Vancouver, building systems used by millions
              </p>
            </div>
          </ScrollReveal>

          <div className='max-w-4xl mx-auto'>
            <StaggerChildren staggerDelay={0.1}>
              {milestones.map((milestone, idx) => (
                <div key={idx} className='flex gap-6 items-start mb-8 relative'>
                  {idx < milestones.length - 1 && (
                    <div className='absolute left-8 top-20 bottom-0 w-0.5 bg-blue-500/30' />
                  )}

                  <div className='flex-shrink-0 relative z-10'>
                    <div className='w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                      <milestone.icon className='w-8 h-8 text-white' />
                    </div>
                  </div>

                  <div className='flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10'>
                    <div className='text-blue-400 font-bold text-lg mb-2'>
                      {milestone.year}
                    </div>
                    <div className='text-white text-xl'>{milestone.event}</div>
                  </div>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-24 bg-gradient-to-br from-blue-600 to-purple-700'>
        <div className='container mx-auto px-6'>
          <ScrollReveal>
            <div className='max-w-3xl mx-auto text-center'>
              <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
                Want to Work With Us?
              </h2>
              <p className='text-xl text-blue-100 mb-8'>
                We're always looking for interesting problems to solve and great
                teams to work with
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-10 py-5 bg-white text-blue-600 rounded-lg font-bold text-lg shadow-2xl inline-flex items-center gap-3'
              >
                Start a Conversation
                <ArrowRight className='w-6 h-6' />
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
