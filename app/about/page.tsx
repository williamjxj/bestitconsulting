'use client'

import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import { brandClasses } from '@/lib/branding'
import { useReducedMotion } from '@/lib/accessibility'
import { getDeviceType } from '@/lib/mobile-optimization'
import { AnimatedHeadline } from '@/components/animations/AnimatedHeadline'
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
  Building,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import DisplayCards from '@/components/ui/display-cards'
import {
  R2Image,
  R2ProfileImage,
  R2CardImage,
  R2HeroImage,
} from '@/components/R2Image'
import { useR2Assets, R2_ASSET_MAPPINGS } from '@/hooks/useR2Assets'

const founderInfo = {
  name: 'William Jiang',
  role: 'Founder & Lead Developer',
  image: '/william.jpg',
  bio: 'Full-stack developer with 10+ years of experience building scalable web applications and digital solutions.',
  expertise: [
    'Full-Stack Development',
    'AI/ML',
    'Cloud Architecture',
    'DevOps',
    'UI/UX Design',
  ],
  experience: '20+ years',
  education: 'Computer Science & Software Engineering',
  specialties: [
    'React/Next.js',
    'Node.js',
    'AI/ML',
    'Python',
    'AWS/GCP/Azure',
    'PostgreSQL/MongoDB',
  ],
}

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
  { number: '50+', label: 'Projects Completed', icon: Briefcase },
  { number: '98%', label: 'Client Satisfaction', icon: Star },
  { number: '20+', label: 'Years Experience', icon: Award },
  { number: '24/7', label: 'Support Available', icon: Zap },
]

export default function AboutPage() {
  const reducedMotion = useReducedMotion()
  const deviceType = getDeviceType()
  const shouldAnimate = !reducedMotion && deviceType !== 'mobile'

  const { getImages, getAssetByFilename } = useR2Assets()

  // Get R2 assets for about page
  const heroImage = getAssetByFilename(R2_ASSET_MAPPINGS.about.hero)
  const teamImage = getAssetByFilename(R2_ASSET_MAPPINGS.about.team)
  const officeImage = getAssetByFilename(R2_ASSET_MAPPINGS.about.office)
  const cultureImage = getAssetByFilename(R2_ASSET_MAPPINGS.about.culture)

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
                Best IT Consulting is a solo software consultancy focused on
                software outsourcing and AI technology consulting. We help
                organizations ship faster with modern web platforms, streamline
                operations through automation, and unlock value with practical
                AI—on time and within budget.
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
                      title: '50+ Projects',
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

      {/* Founder Section */}
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
              About the Founder
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Meet the developer behind Best IT Consulting and learn about the
              expertise that drives our success.
            </p>
          </motion.div>

          <div className='max-w-4xl mx-auto'>
            <motion.div
              className='bg-white rounded-2xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={shouldAnimate ? { y: -5 } : undefined}
            >
              <div className='grid lg:grid-cols-3 gap-8 items-center'>
                <div className='lg:col-span-1 text-center lg:text-left'>
                  <div className='w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto lg:mx-0 mb-6 flex items-center justify-center'>
                    <img
                      src={founderInfo.image}
                      alt={founderInfo.name}
                      className='w-28 h-28 rounded-full object-cover'
                    />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                    {founderInfo.name}
                  </h3>
                  <p className='text-blue-600 font-semibold text-lg mb-4'>
                    {founderInfo.role}
                  </p>
                  <div className='space-y-2 text-sm text-gray-600'>
                    <p>
                      <strong>Experience:</strong> {founderInfo.experience}
                    </p>
                    <p>
                      <strong>Education:</strong> {founderInfo.education}
                    </p>
                  </div>
                </div>

                <div className='lg:col-span-2'>
                  <p className='text-lg text-gray-600 leading-relaxed mb-6'>
                    {founderInfo.bio}
                  </p>

                  <div className='mb-6'>
                    <h4 className='text-lg font-semibold text-gray-900 mb-3'>
                      Core Expertise
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {founderInfo.expertise.map(skill => (
                        <span
                          key={skill}
                          className='px-4 py-2 bg-blue-100 text-blue-700 text-sm rounded-full font-medium'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className='text-lg font-semibold text-gray-900 mb-3'>
                      Technical Specialties
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {founderInfo.specialties.map(tech => (
                        <span
                          key={tech}
                          className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Philosophy & Approach Section */}
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
              How We Work
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Discover our delivery principles—focused on measurable outcomes,
              reduced risk, and lasting impact for your business.
            </p>
          </motion.div>

          <div className='grid lg:grid-cols-2 gap-12 lg:gap-16'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                Our Development Environment
              </h3>
              <p className='text-lg text-gray-600 leading-relaxed mb-6'>
                A modern, well-equipped environment designed for productivity
                and reliability. Our setup prioritizes security, performance,
                and uninterrupted delivery so your project stays on track.
              </p>
              <div className='space-y-4'>
                {[
                  'Dedicated workspace with dual monitors',
                  'High-speed internet and cloud infrastructure',
                  'Professional development tools and software',
                  'Quiet environment for deep focus work',
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    className='flex items-center space-x-3'
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className='h-5 w-5 text-green-500 flex-shrink-0' />
                    <span className='text-gray-600'>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {officeImage ? (
                <R2CardImage
                  src={officeImage.url}
                  alt='Development workspace'
                  className='w-full h-80 rounded-xl shadow-xl'
                  animation='scale'
                  delay={0.2}
                  hover={true}
                  overlay={true}
                  overlayContent={
                    <div className='text-white text-center'>
                      <div className='w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center'>
                        <Building className='w-6 h-6' />
                      </div>
                      <p className='text-sm font-medium'>Our Workspace</p>
                    </div>
                  }
                />
              ) : (
                <div className='w-full h-80 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center'>
                  <div className='text-center'>
                    <Building className='w-16 h-16 text-blue-400 mx-auto mb-4' />
                    <p className='text-gray-600'>Development Workspace</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Values & Commitment Section */}
      <section className='py-16 lg:py-24 bg-gray-50'>
        <div className={brandClasses.container}>
          <div className='grid lg:grid-cols-2 gap-12 lg:gap-16'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {cultureImage ? (
                <R2CardImage
                  src={cultureImage.url}
                  alt='Work values and commitment'
                  className='w-full h-80 rounded-xl shadow-xl'
                  animation='scale'
                  delay={0.2}
                  hover={true}
                  overlay={true}
                  overlayContent={
                    <div className='text-white text-center'>
                      <div className='w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center'>
                        <Users className='w-6 h-6' />
                      </div>
                      <p className='text-sm font-medium'>Our Values</p>
                    </div>
                  }
                />
              ) : (
                <div className='w-full h-80 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center'>
                  <div className='text-center'>
                    <Users className='w-16 h-16 text-green-400 mx-auto mb-4' />
                    <p className='text-gray-600'>Work Values</p>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                Our Work Values & Commitment
              </h3>
              <p className='text-lg text-gray-600 leading-relaxed mb-6'>
                Exceptional outcomes come from discipline, quality, and true
                partnership. We combine proven engineering practices with a
                consultative approach to deliver solutions that matter.
              </p>
              <div className='space-y-4'>
                {[
                  'Direct communication and transparency',
                  'Continuous learning and skill development',
                  'Flexible scheduling to meet your needs',
                  'Innovation and creative problem-solving',
                ].map((value, index) => (
                  <motion.div
                    key={value}
                    className='flex items-center space-x-3'
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className='h-5 w-5 text-green-500 flex-shrink-0' />
                    <span className='text-gray-600'>{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
              Ready to Work Together?
            </h2>
            <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
              Let's discuss how we can help transform your business with
              innovative technology solutions tailored to your needs.
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
