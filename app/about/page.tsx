'use client'

import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import { brandClasses } from '@/lib/branding'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import {
  Users,
  Award,
  Target,
  Globe,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  Briefcase,
  Lightbulb,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import DisplayCards from '@/components/ui/display-cards'

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: '/placeholder.svg',
    bio: '15+ years in tech leadership, former Google engineer',
    expertise: ['Strategy', 'Leadership', 'Innovation'],
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    image: '/placeholder.svg',
    bio: 'Full-stack architect with expertise in cloud solutions',
    expertise: ['Architecture', 'Cloud', 'DevOps'],
  },
  {
    name: 'Emily Rodriguez',
    role: 'Lead Designer',
    image: '/placeholder.svg',
    bio: 'UX/UI specialist focused on user-centered design',
    expertise: ['Design', 'UX', 'Branding'],
  },
  {
    name: 'David Kim',
    role: 'Senior Developer',
    image: '/placeholder.svg',
    bio: 'React and Node.js expert with mobile development skills',
    expertise: ['Frontend', 'Mobile', 'JavaScript'],
  },
]

const values = [
  {
    icon: Target,
    title: 'Client-First Approach',
    description:
      'We prioritize your business goals and deliver solutions that drive real results.',
  },
  {
    icon: Shield,
    title: 'Quality & Security',
    description:
      'Enterprise-grade security and quality standards in every project we deliver.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'Cutting-edge technologies and creative solutions for modern challenges.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description:
      'Transparent communication and partnership throughout the entire process.',
  },
]

const stats = [
  { number: '500+', label: 'Projects Completed', icon: Briefcase },
  { number: '98%', label: 'Client Satisfaction', icon: Star },
  { number: '10+', label: 'Years Experience', icon: Award },
  { number: '24/7', label: 'Support Available', icon: Zap },
]

// Component for animated headline with GSAP stagger
const AnimatedHeadline = ({
  text,
  className,
}: {
  text: string
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  useEffect(() => {
    if (!shouldAnimate || !containerRef.current) return

    const words = text.split(' ')
    const chars = words.map(word => word.split(''))

    // Create GSAP timeline
    const tl = gsap.timeline()

    // Animate each character
    chars.forEach((wordChars, wordIndex) => {
      wordChars.forEach((char, charIndex) => {
        const charElement = containerRef.current?.querySelector(
          `[data-char="${wordIndex}-${charIndex}"]`
        )
        if (charElement) {
          tl.fromTo(
            charElement,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
            wordIndex * 0.1 + charIndex * 0.05
          )
        }
      })
    })
  }, [shouldAnimate, text])

  if (!shouldAnimate) {
    return <div className={className}>{text}</div>
  }

  return (
    <div className={className} ref={containerRef}>
      {text.split(' ').map((word, wordIndex) => (
        <div key={wordIndex} className='inline-block overflow-hidden mr-2'>
          {word.split('').map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              data-char={`${wordIndex}-${charIndex}`}
              className={`inline-block ${
                wordIndex === 0
                  ? 'text-white'
                  : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-400 bg-[length:200%_100%] animate-text-shimmer'
              }`}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function AboutPage() {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  return (
    <Layout>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 md:py-32'>
        {/* Animated background elements */}
        <div className='absolute inset-0'>
          <div className='absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-500/20 to-transparent rounded-full animate-pulse-slow'></div>
          <div className='absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-cyan-400/15 to-transparent rounded-full animate-float'></div>
        </div>

        <div className='container mx-auto px-4 relative z-10'>
          <div className='grid lg:grid-cols-2 gap-4 items-center'>
            <motion.div
              className='text-center lg:text-left'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600/20 rounded-full mb-8 border border-blue-500/30'>
                <span>About Us</span>
              </div>
              <h1 className='text-4xl lg:text-6xl font-bold mb-6'>
                <AnimatedHeadline
                  text='About Best IT Consulting'
                  className='text-4xl lg:text-6xl font-bold leading-tight'
                />
              </h1>
              <motion.p
                className='text-xl text-blue-100/90 mb-8 leading-relaxed max-w-3xl mx-auto'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We're a team of passionate technologists dedicated to
                transforming businesses through innovative digital solutions.
                With over a decade of experience, we've helped hundreds of
                companies scale, innovate, and succeed in the digital era.
              </motion.p>
              <motion.div
                className='flex flex-col sm:flex-row gap-6 justify-center mb-12'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button
                  size='lg'
                  className='group text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                >
                  Our Services
                  <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  className='text-lg px-8 py-4 bg-white/10 border-white/20 hover:bg-white/20'
                >
                  View Portfolio
                </Button>
              </motion.div>
            </motion.div>

            {/* Display Cards as Background Element */}
            <motion.div
              className='hidden lg:flex justify-center items-center relative'
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className='relative w-80 h-80 flex items-center justify-center'>
                <DisplayCards
                  cards={[
                    {
                      icon: <Briefcase className='size-4 text-blue-300' />,
                      title: '500+ Projects',
                      description: 'Successfully delivered',
                      date: '2024',
                      iconClassName: 'text-blue-400',
                      titleClassName: 'text-blue-400',
                      className:
                        "[grid-area:stack] hover:-translate-y-8 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
                    },
                    {
                      icon: <Users className='size-4 text-green-300' />,
                      title: '50+ Clients',
                      description: 'Happy customers worldwide',
                      date: '2024',
                      iconClassName: 'text-green-400',
                      titleClassName: 'text-green-400',
                      className:
                        "[grid-area:stack] translate-x-8 translate-y-6 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
                    },
                    {
                      icon: <Award className='size-4 text-purple-300' />,
                      title: '10+ Years',
                      description: 'Industry experience',
                      date: 'Since 2014',
                      iconClassName: 'text-purple-400',
                      titleClassName: 'text-purple-400',
                      className:
                        '[grid-area:stack] translate-x-16 translate-y-12 hover:translate-y-8',
                    },
                  ]}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-white'>
        <div className={brandClasses.container}>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className='text-center'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <stat.icon className='h-8 w-8 text-blue-600' />
                </div>
                <div className='text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>
                  {stat.number}
                </div>
                <div className='text-gray-600 font-medium'>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className='py-16 lg:py-24 bg-gray-50'>
        <div className={brandClasses.container}>
          <div className='grid lg:grid-cols-2 gap-12 lg:gap-16'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className='w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6'>
                <Target className='h-6 w-6 text-white' />
              </div>
              <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>
                Our Mission
              </h2>
              <p className='text-lg text-gray-600 leading-relaxed mb-6'>
                To empower businesses with cutting-edge technology solutions
                that drive growth, efficiency, and innovation. We believe
                technology should be an enabler, not a barrier, to your success.
              </p>
              <ul className='space-y-3'>
                {[
                  'Deliver exceptional value through technology',
                  'Build lasting partnerships with our clients',
                  'Foster innovation and continuous improvement',
                  'Maintain the highest standards of quality',
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    className='flex items-center space-x-3'
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className='h-5 w-5 text-green-500 flex-shrink-0' />
                    <span className='text-gray-600'>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className='w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6'>
                <Globe className='h-6 w-6 text-white' />
              </div>
              <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>
                Our Vision
              </h2>
              <p className='text-lg text-gray-600 leading-relaxed mb-6'>
                To be the leading technology consulting firm that transforms how
                businesses operate in the digital world. We envision a future
                where every company has access to world-class technology
                solutions.
              </p>
              <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
                <h3 className='font-semibold text-gray-900 mb-3'>
                  Our Commitment
                </h3>
                <p className='text-gray-600'>
                  We're committed to staying at the forefront of technology
                  trends, investing in our team's growth, and continuously
                  improving our processes to deliver exceptional results for our
                  clients.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-16 lg:py-24 bg-white'>
        <div className={brandClasses.container}>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>
              Our Core Values
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              These principles guide everything we do and shape how we work with
              our clients and each other.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className='text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={shouldAnimate ? { y: -5 } : undefined}
              >
                <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <value.icon className='h-8 w-8 text-blue-600' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                  {value.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-16 lg:py-24 bg-gray-50'>
        <div className={brandClasses.container}>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>
              Meet Our Team
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Our diverse team of experts brings together decades of experience
              in technology, design, and business strategy.
            </p>
          </motion.div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className='bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={shouldAnimate ? { y: -5 } : undefined}
              >
                <div className='w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <Users className='h-10 w-10 text-gray-400' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 text-center mb-2'>
                  {member.name}
                </h3>
                <p className='text-blue-600 font-medium text-center mb-3'>
                  {member.role}
                </p>
                <p className='text-gray-600 text-sm text-center mb-4'>
                  {member.bio}
                </p>
                <div className='flex flex-wrap gap-2 justify-center'>
                  {member.expertise.map(skill => (
                    <span
                      key={skill}
                      className='px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-indigo-600'>
        <div className={brandClasses.container}>
          <motion.div
            className='text-center text-white'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl lg:text-4xl font-bold mb-6'>
              Ready to Work With Us?
            </h2>
            <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
              Let's discuss how we can help transform your business with
              innovative technology solutions.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                size='lg'
                className='bg-white text-blue-600 hover:bg-gray-100'
              >
                Start Your Project
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='border-white text-white hover:bg-white hover:text-blue-600'
              >
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
