import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Code2,
  Users,
  Cloud,
  Shield,
  Play,
  Star,
  Quote,
  Building,
  Trophy,
} from 'lucide-react'
import { HeroSection } from '@/components/HeroSection'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { ScrollTrigger } from '@/components/animations/ScrollTrigger'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'
import { CredibilitySection } from '@/components/sections/CredibilitySection'
import TechnologyShowcase from '@/components/sections/TechnologyShowcase'
import { DemoVideo } from '@/components/DemoVideo'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'

export default function HomePage() {
  const features = [
    {
      icon: <Code2 className='h-8 w-8' />,
      title: 'Full-Stack Development',
      description:
        'Modern web and mobile applications built with cutting-edge technologies.',
    },
    {
      icon: <Cloud className='h-8 w-8' />,
      title: 'Cloud Solutions',
      description:
        'Scalable cloud architecture and deployment for maximum performance.',
    },
    {
      icon: <Shield className='h-8 w-8' />,
      title: 'Cybersecurity',
      description:
        'Comprehensive security solutions to protect your digital assets.',
    },
    {
      icon: <Users className='h-8 w-8' />,
      title: 'Team Augmentation',
      description: 'Expert developers to accelerate your project delivery.',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO, TechStart Inc.',
      content:
        'BestIT transformed our infrastructure and helped us scale from startup to enterprise. Outstanding work!',
      avatar: '/api/placeholder/60/60',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'VP Engineering, DataFlow',
      content:
        'Their cloud migration strategy saved us 40% in infrastructure costs while improving performance.',
      avatar: '/api/placeholder/60/60',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, InnovateLab',
      content:
        'The team delivered our MVP in record time. Professional, skilled, and reliable partners.',
      avatar: '/api/placeholder/60/60',
      rating: 5,
    },
  ]

  const stats = [
    {
      number: '500+',
      label: 'Projects Delivered',
      icon: <Trophy className='h-6 w-6' />,
    },
    {
      number: '50+',
      label: 'Enterprise Clients',
      icon: <Building className='h-6 w-6' />,
    },
    {
      number: '98%',
      label: 'Client Satisfaction',
      icon: <Star className='h-6 w-6' />,
    },
    {
      number: '24/7',
      label: 'Support Available',
      icon: <Shield className='h-6 w-6' />,
    },
  ]

  return (
    <Layout>
      <div className='min-h-screen'>
        <HeroSection />

        {/* Video/Demo Section */}
        <ScrollTrigger animation='fade' direction='up' duration={0.8}>
          <section className='py-12 bg-background'>
            <div className='container mx-auto px-4'>
              <div className='max-w-6xl mx-auto'>
                <div className='grid lg:grid-cols-2 gap-12 items-center'>
                  <ScrollTrigger
                    animation='slide'
                    direction='right'
                    delay={0.2}
                  >
                    <div>
                      <span className='inline-block px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4'>
                        See Us In Action
                      </span>
                      <h2 className='text-3xl md:text-4xl font-bold mb-6'>
                        Watch How We Transform
                        <span className='text-blue-600'> Businesses</span>
                      </h2>
                      <p className='text-lg text-muted-foreground mb-8'>
                        Discover how our innovative solutions have helped
                        companies streamline operations, reduce costs, and
                        accelerate growth through digital transformation.
                      </p>
                      <div className='flex gap-4'>
                        <Button size='lg' asChild>
                          <Link href='/contact'>
                            Start Your Journey
                            <ArrowRight className='ml-2 h-4 w-4' />
                          </Link>
                        </Button>
                        <Button size='lg' variant='outline' asChild>
                          <Link href='/portfolio'>View Case Studies</Link>
                        </Button>
                      </div>
                    </div>
                  </ScrollTrigger>

                  <ScrollTrigger animation='slide' direction='left' delay={0.4}>
                    <div className='relative'>
                      <DemoVideo />
                    </div>
                  </ScrollTrigger>
                </div>
              </div>
            </div>
          </section>
        </ScrollTrigger>

        {/* Features Overview */}
        <ScrollTrigger animation='fade' direction='up' duration={0.8}>
          <section className='py-12 bg-muted/30'>
            <div className='container mx-auto px-4'>
              <ScrollTrigger animation='slide' direction='up' delay={0.2}>
                <div className='text-center mb-16'>
                  <span className='inline-block px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4'>
                    Our Expertise
                  </span>
                  <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                    Comprehensive IT Solutions
                  </h2>
                  <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                    From concept to deployment, we provide end-to-end technology
                    services that drive innovation.
                  </p>
                </div>
              </ScrollTrigger>

              <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {features.map((feature, index) => (
                  <ScrollTrigger
                    key={index}
                    animation='scale'
                    delay={0.4 + index * 0.1}
                  >
                    <div
                      key={index}
                      className='group bg-card p-6 rounded-xl border border-border/40 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
                    >
                      <div className='w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors'>
                        <div className='text-blue-500 group-hover:scale-110 transition-transform'>
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className='text-xl font-semibold mb-2'>
                        {feature.title}
                      </h3>
                      <p className='text-muted-foreground'>
                        {feature.description}
                      </p>
                    </div>
                  </ScrollTrigger>
                ))}
              </div>

              <ScrollTrigger animation='fade' direction='up' delay={0.8}>
                <div className='text-center mt-12'>
                  <Button size='lg' asChild>
                    <Link href='/services' className='group'>
                      Explore All Services
                      <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                    </Link>
                  </Button>
                </div>
              </ScrollTrigger>
            </div>
          </section>
        </ScrollTrigger>

        {/* Credibility Section */}
        <CredibilitySection />

        {/* Stats Section */}
        <ScrollTrigger animation='fade' direction='up' duration={0.8}>
          <section className='py-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white'>
            <div className='container mx-auto px-4'>
              <ScrollTrigger animation='slide' direction='up' delay={0.2}>
                <div className='text-center mb-16'>
                  <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                    Proven Track Record
                  </h2>
                  <p className='text-xl text-blue-100 max-w-2xl mx-auto'>
                    Numbers that showcase our commitment to excellence and
                    client success.
                  </p>
                </div>
              </ScrollTrigger>

              <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
                {stats.map((stat, index) => (
                  <ScrollTrigger
                    key={index}
                    animation='scale'
                    delay={0.4 + index * 0.1}
                  >
                    <div className='text-center group'>
                      <div className='w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors'>
                        <div className='text-cyan-300'>{stat.icon}</div>
                      </div>
                      <AnimatedCounter
                        value={parseInt(stat.number.replace(/[^\d]/g, ''))}
                        duration={2}
                        delay={0.6 + index * 0.2}
                        suffix={
                          stat.number.includes('%')
                            ? '%'
                            : stat.number.includes('+')
                              ? '+'
                              : ''
                        }
                        className='text-3xl md:text-4xl font-bold mb-2'
                      >
                        <></>
                      </AnimatedCounter>
                      <div className='text-blue-100'>{stat.label}</div>
                    </div>
                  </ScrollTrigger>
                ))}
              </div>
            </div>
          </section>
        </ScrollTrigger>

        {/* Testimonials */}
        <TestimonialsSection
          testimonials={testimonials.map((testimonial, index) => ({
            id: `testimonial-${index}`,
            name: testimonial.name,
            role: testimonial.role,
            company: 'BestIT Consulting',
            content: testimonial.content,
            rating: testimonial.rating,
            avatar: testimonial.avatar,
            featured: index === 0,
          }))}
          title='What Our Clients Say'
          description="Don't just take our word for it. Here's what our clients have to say about working with us."
          autoPlay={true}
          autoPlayInterval={5000}
        />

        {/* Technology Showcase */}
        <TechnologyShowcase />

        {/* CTA Section */}
        <section className='py-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Ready to Start Your Project?
            </h2>
            <p className='text-xl text-blue-100 max-w-2xl mx-auto mb-8'>
              Let's discuss how we can help you achieve your business goals with
              our expert software solutions.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                size='lg'
                className='bg-white text-blue-700 hover:bg-blue-50'
                asChild
              >
                <Link href='/contact'>Get a Free Consultation</Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='border-white/30 hover:bg-white/10'
                asChild
              >
                <Link href='/portfolio'>View Our Work</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

    </Layout>
  )
}
