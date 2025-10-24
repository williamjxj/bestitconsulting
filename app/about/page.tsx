'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { brandClasses } from '@/lib/branding'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import {
  Users,
  Award,
  Target,
  Globe,
  Code2,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  Briefcase,
  Lightbulb,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

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

export default function AboutPage() {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  return (
    <div className='min-h-screen bg-white'>
      <Header />

      {/* Hero Section */}
      <section className='pt-20 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50'>
        <div className={brandClasses.container}>
          <motion.div
            className='text-center max-w-4xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className='text-4xl lg:text-6xl font-bold text-gray-900 mb-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              About{' '}
              <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                BestIT Consulting
              </span>
            </motion.h1>
            <motion.p
              className='text-xl text-gray-600 mb-8 leading-relaxed'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We're a team of passionate technologists dedicated to transforming
              businesses through innovative digital solutions. With over a
              decade of experience, we've helped hundreds of companies scale,
              innovate, and succeed in the digital era.
            </motion.p>
            <motion.div
              className='flex flex-col sm:flex-row gap-4 justify-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                size='lg'
                className='bg-blue-600 hover:bg-blue-700 text-white'
              >
                Our Services
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='border-blue-600 text-blue-600 hover:bg-blue-50'
              >
                View Portfolio
              </Button>
            </motion.div>
          </motion.div>
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

      <Footer />
    </div>
  )
}
