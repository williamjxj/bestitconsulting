import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Layout from '@/components/Layout'
import {
  Globe,
  Users,
  Award,
  Target,
  Rocket,
  Shield,
  Heart,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Code2,
  Database,
  Cloud,
} from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      icon: <Rocket className='h-8 w-8 text-blue-500' />,
      title: 'Innovation',
      description:
        'We stay ahead of technology trends and continuously explore new solutions to deliver cutting-edge results.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Shield className='h-8 w-8 text-green-500' />,
      title: 'Quality',
      description:
        'Our commitment to excellence ensures every project meets the highest standards of performance and reliability.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Heart className='h-8 w-8 text-red-500' />,
      title: 'Client Focus',
      description:
        'Your success is our priority. We build lasting partnerships based on trust, transparency, and results.',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      icon: <Lightbulb className='h-8 w-8 text-yellow-500' />,
      title: 'Collaboration',
      description:
        'We work closely with your team, fostering open communication and shared ownership of project outcomes.',
      gradient: 'from-yellow-500 to-orange-500',
    },
  ]

  const milestones = [
    {
      year: '2014',
      event: 'Company Founded',
      description:
        'Started with a vision to transform businesses through technology',
    },
    {
      year: '2016',
      event: 'First Major Client',
      description:
        'Successfully delivered enterprise solution for Fortune 500 company',
    },
    {
      year: '2018',
      event: 'Team Expansion',
      description: 'Grew to 20+ developers and expanded service offerings',
    },
    {
      year: '2020',
      event: 'Remote Excellence',
      description: 'Seamlessly transitioned to remote-first operations',
    },
    {
      year: '2022',
      event: 'AI Integration',
      description: 'Pioneered AI-powered solutions for client applications',
    },
    {
      year: '2024',
      event: '500+ Projects',
      description: 'Reached milestone of 500 successful project deliveries',
    },
  ]

  const certifications = [
    'AWS Certified Solutions Architect',
    'Google Cloud Professional',
    'Microsoft Azure Expert',
    'PMP Certified',
    'Scrum Master Certified',
    'ISO 27001 Compliant',
  ]

  return (
    <Layout>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
        {/* Enhanced Hero Section */}
        <section className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 md:py-32'>
          {/* Animated background elements */}
          <div className='absolute inset-0'>
            <div className='absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-500/20 to-transparent rounded-full animate-pulse-slow'></div>
            <div className='absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-cyan-400/15 to-transparent rounded-full animate-float'></div>
          </div>

          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-4xl mx-auto text-center'>
              <div className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600/20 rounded-full mb-8 border border-blue-500/30'>
                <Globe className='h-4 w-4 text-cyan-300' />
                <span>Established 2014 • 500+ Projects Delivered</span>
              </div>

              <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8'>
                <span className='block'>About</span>
                <span className='block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-400'>
                  BestIT Consulting
                </span>
              </h1>

              <p className='text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto mb-12 leading-relaxed'>
                A solo software company dedicated to transforming businesses
                through innovative software solutions and strategic digital
                transformation.
              </p>

              <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
                <Button
                  size='lg'
                  className='group text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                  asChild
                >
                  <Link href='/contact'>
                    <Users className='mr-2 h-5 w-5' />
                    Get In Touch
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='text-lg px-8 py-4 bg-white/10 border-white/20 hover:bg-white/20'
                  asChild
                >
                  <Link href='/portfolio'>
                    <Award className='mr-2 h-5 w-5' />
                    Our Work
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className='py-20 px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
              <div>
                <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                  Our Story
                </h2>
                <p className='text-lg text-gray-600 mb-6 leading-relaxed'>
                  Founded in 2014, BestIT Consulting emerged from a simple yet
                  powerful vision: to bridge the gap between complex technology
                  and business success. As a solo software company, we focus on
                  delivering personalized, high-quality solutions tailored to
                  each client's unique needs.
                </p>
                <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
                  Today, we're proud to have delivered over 500 successful
                  projects, helping businesses across Canada and beyond leverage
                  technology to achieve their goals and stay competitive in an
                  ever-evolving digital landscape.
                </p>

                <div className='grid grid-cols-2 gap-6'>
                  <div className='text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl'>
                    <div className='text-3xl font-bold text-blue-600 mb-2'>
                      10+
                    </div>
                    <div className='text-gray-600 font-medium'>
                      Years Experience
                    </div>
                  </div>
                  <div className='text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl'>
                    <div className='text-3xl font-bold text-green-600 mb-2'>
                      500+
                    </div>
                    <div className='text-gray-600 font-medium'>
                      Projects Delivered
                    </div>
                  </div>
                </div>
              </div>

              <div className='relative'>
                <div className='aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 flex items-center justify-center relative'>
                  <Image
                    src='https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-492514758-612x612.webp'
                    alt='Business people working together in modern office'
                    fill
                    className='rounded-xl opacity-80 object-cover'
                  />
                </div>
                <div className='absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg'>
                  <div className='flex items-center gap-2'>
                    <CheckCircle className='h-5 w-5 text-green-500' />
                    <span className='font-medium text-gray-900'>
                      ISO 27001 Certified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className='py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden'>
          {/* Animated background elements */}
          <div className='absolute inset-0'>
            <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse-slow'></div>
            <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float'></div>
          </div>

          <div className='max-w-6xl mx-auto relative z-10'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up'>
                Our Values
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200'>
                These core principles guide everything we do, from client
                relationships to technical decisions
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {values.map((value, index) => (
                <Card
                  key={index}
                  className='values-card group relative border-0 bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-6 hover:scale-105 overflow-hidden animate-fade-in-up'
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  {/* Animated gradient background with shimmer */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-15 transition-all duration-700`}
                  ></div>

                  {/* Glow effect on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 -z-10 scale-110`}
                  ></div>

                  {/* Shimmer overlay */}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer'></div>

                  <CardHeader className='text-center pb-4 relative z-10'>
                    <div className='relative mb-6'>
                      {/* Icon container with enhanced effects */}
                      <div
                        className={`icon-container w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br ${value.gradient} p-1 group-hover:scale-115 transition-all duration-700 group-hover:rotate-6 shadow-2xl`}
                      >
                        <div className='w-full h-full bg-white rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-white/95 group-hover:to-white/80 transition-all duration-700 shadow-inner'>
                          <div className='group-hover:scale-125 transition-transform duration-700 group-hover:animate-scale-bounce'>
                            {value.icon}
                          </div>
                        </div>
                      </div>

                      {/* Enhanced floating particles effect */}
                      <div className='absolute -top-3 -right-3 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-particle-float animation-delay-300 shadow-lg'></div>
                      <div className='absolute -bottom-3 -left-3 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-particle-float animation-delay-500 shadow-lg'></div>
                      <div className='absolute top-1/2 -right-2 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-particle-float animation-delay-700 shadow-lg'></div>

                      {/* Rotating border effect */}
                      <div
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-rotate-slow`}
                        style={{
                          background: `conic-gradient(from 0deg, transparent, ${value.gradient.includes('blue') ? '#3b82f6' : value.gradient.includes('green') ? '#10b981' : value.gradient.includes('red') ? '#ef4444' : '#f59e0b'}, transparent)`,
                          padding: '2px',
                        }}
                      ></div>
                    </div>

                    <CardTitle className='text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-700 group-hover:scale-105'>
                      {value.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className='relative z-10'>
                    <p className='text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-all duration-500 group-hover:scale-105'>
                      {value.description}
                    </p>
                  </CardContent>

                  {/* Animated border effect with gradient */}
                  <div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-100 transition-all duration-700`}
                    style={{
                      background: `linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)`,
                      backgroundSize: '200% 200%',
                      animation: 'shimmer 3s infinite',
                    }}
                  ></div>

                  {/* Corner accent */}
                  <div
                    className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-${value.gradient.split('-')[1]}-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className='py-20 px-4'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                Our Journey
              </h2>
              <p className='text-xl text-gray-600'>
                Key milestones that shaped our company
              </p>
            </div>

            <div className='relative'>
              <div className='absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500'></div>

              <div className='space-y-8'>
                {milestones.map((milestone, index) => (
                  <div key={index} className='relative flex items-start gap-8'>
                    <div className='flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg'>
                      {milestone.year.slice(-2)}
                    </div>
                    <div className='flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'>
                      <div className='flex items-center gap-2 mb-2'>
                        <h3 className='text-xl font-bold text-gray-900'>
                          {milestone.event}
                        </h3>
                        <Badge
                          variant='outline'
                          className='text-blue-600 border-blue-600'
                        >
                          {milestone.year}
                        </Badge>
                      </div>
                      <p className='text-gray-600'>{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Solo Founder Section */}
        <section className='py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-4xl font-bold text-gray-900 mb-6'>
              Meet the Founder
            </h2>
            <p className='text-xl text-gray-600 mb-12 max-w-3xl mx-auto'>
              BestIT Consulting is a solo software company founded and operated
              by William Jiang, a passionate developer with expertise in modern
              web technologies and digital transformation.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
              <div className='text-left'>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  William Jiang
                </h3>
                <p className='text-lg text-gray-600 mb-6'>
                  Founder & Lead Developer with 10+ years of experience in
                  software development, cloud architecture, and digital
                  transformation. Specializing in modern web technologies and
                  helping businesses leverage technology for growth.
                </p>
                <div className='flex flex-wrap gap-3'>
                  {[
                    'Full-Stack Development',
                    'Cloud Architecture',
                    'Digital Transformation',
                    'Business Strategy',
                  ].map((skill, index) => (
                    <Badge key={index} variant='secondary' className='text-sm'>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className='relative'>
                <div className='aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 flex items-center justify-center'>
                  <Image
                    src='/placeholder.svg'
                    alt='William Jiang, Founder'
                    width={300}
                    height={300}
                    className='rounded-xl opacity-80'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications & Expertise */}
        <section className='py-20 px-4 bg-white'>
          <div className='max-w-6xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
              <div>
                <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                  Certifications & Expertise
                </h2>
                <p className='text-lg text-gray-600 mb-8'>
                  I maintain industry-leading certifications and stay current
                  with the latest technologies and best practices.
                </p>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg'
                    >
                      <CheckCircle className='h-5 w-5 text-green-500 flex-shrink-0' />
                      <span className='font-medium text-gray-900'>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='space-y-6'>
                <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                  Technology Stack
                </h3>

                <div className='space-y-4'>
                  <div className='flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg'>
                    <Code2 className='h-8 w-8 text-blue-500' />
                    <div>
                      <h4 className='font-bold text-gray-900'>
                        Frontend Development
                      </h4>
                      <p className='text-gray-600 text-sm'>
                        React, Next.js, Vue.js, TypeScript, Tailwind CSS
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg'>
                    <Database className='h-8 w-8 text-green-500' />
                    <div>
                      <h4 className='font-bold text-gray-900'>
                        Backend Development
                      </h4>
                      <p className='text-gray-600 text-sm'>
                        Node.js, Python, .NET, PostgreSQL, MongoDB
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg'>
                    <Cloud className='h-8 w-8 text-purple-500' />
                    <div>
                      <h4 className='font-bold text-gray-900'>
                        Cloud & DevOps
                      </h4>
                      <p className='text-gray-600 text-sm'>
                        AWS, Azure, GCP, Docker, Kubernetes, CI/CD
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-4xl font-bold mb-6'>Ready to Work Together?</h2>
            <p className='text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto'>
              Let's discuss how my expertise can help transform your business
              and achieve your digital goals.
            </p>

            <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
              <Button
                size='lg'
                className='text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                asChild
              >
                <Link href='/contact'>
                  <Rocket className='mr-2 h-5 w-5' />
                  Start Your Project
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='text-lg px-8 py-4 bg-white/10 border-white/20 hover:bg-white/20'
                asChild
              >
                <Link href='/services'>
                  <Target className='mr-2 h-5 w-5' />
                  Our Services
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
