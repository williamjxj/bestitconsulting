import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Layout from '@/components/Layout'
import {
  MapPin,
  Globe,
  Users,
  Award,
  Clock,
  Target,
  Rocket,
  Shield,
  Heart,
  Lightbulb,
  CheckCircle,
  Star,
  ArrowRight,
  Code2,
  Database,
  Cloud,
} from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      bio: '15+ years in software development and business strategy. Former tech lead at major Silicon Valley companies.',
      image: '/placeholder.svg',
      skills: ['Strategic Planning', 'Team Leadership', 'Business Development'],
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO',
      bio: 'Full-stack architect with expertise in scalable systems and cloud infrastructure. PhD in Computer Science.',
      image: '/placeholder.svg',
      skills: [
        'System Architecture',
        'Cloud Computing',
        'Technical Leadership',
      ],
    },
    {
      name: 'Emily Wang',
      role: 'Lead Developer',
      bio: 'Frontend specialist with a passion for user experience and modern web technologies.',
      image: '/placeholder.svg',
      skills: ['React/Next.js', 'UI/UX Design', 'TypeScript'],
    },
    {
      name: 'David Kim',
      role: 'Senior Backend Engineer',
      bio: 'Backend systems expert with experience in high-performance applications and database optimization.',
      image: '/placeholder.svg',
      skills: ['Node.js', 'Python', 'Database Design'],
    },
  ]

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
                We're a team of passionate technologists dedicated to
                transforming businesses through innovative software solutions
                and strategic digital transformation.
              </p>

              <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
                <Button
                  size='lg'
                  className='group text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                  asChild
                >
                  <Link href='/contact'>
                    <Users className='mr-2 h-5 w-5' />
                    Meet Our Team
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
                  and business success. What started as a small team of
                  passionate developers has grown into a full-service digital
                  transformation partner.
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
                      50+
                    </div>
                    <div className='text-gray-600 font-medium'>
                      Team Members
                    </div>
                  </div>
                </div>
              </div>

              <div className='relative'>
                <div className='aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 flex items-center justify-center'>
                  <Image
                    src='/placeholder.svg'
                    alt='Team collaboration'
                    width={400}
                    height={400}
                    className='rounded-xl opacity-80'
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
        <section className='py-20 px-4 bg-white/50'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                Our Values
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                These core principles guide everything we do, from client
                relationships to technical decisions
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {values.map((value, index) => (
                <Card
                  key={index}
                  className='group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white'
                >
                  <CardHeader className='text-center pb-4'>
                    <div
                      className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${value.gradient} p-0.5 mb-4`}
                    >
                      <div className='w-full h-full bg-white rounded-lg flex items-center justify-center'>
                        {value.icon}
                      </div>
                    </div>
                    <CardTitle className='text-xl font-bold text-gray-900'>
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-gray-600 text-center leading-relaxed'>
                      {value.description}
                    </p>
                  </CardContent>
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

        {/* Team Section */}
        <section className='py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                Meet Our Team
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Our diverse team of experts brings together decades of
                experience in software development, design, and business
                strategy
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className='group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white'
                >
                  <CardHeader className='text-center pb-4'>
                    <div className='w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5 mb-4'>
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
                        className='w-full h-full rounded-full object-cover'
                      />
                    </div>
                    <CardTitle className='text-lg font-bold text-gray-900'>
                      {member.name}
                    </CardTitle>
                    <CardDescription className='text-blue-600 font-medium'>
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                      {member.bio}
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {member.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant='secondary'
                          className='text-xs'
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                  Our team maintains industry-leading certifications and stays
                  current with the latest technologies and best practices.
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
              Let's discuss how our expertise can help transform your business
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
