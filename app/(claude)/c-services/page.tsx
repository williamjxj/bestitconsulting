'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  ArrowRight,
  Code,
  Cloud,
  Users,
  Wrench,
  BarChart3,
  Shield,
  CheckCircle2,
  Zap,
  TrendingUp,
  Target,
  Sparkles,
  Layers,
  Database,
  Lock,
  Gauge,
  Award,
} from 'lucide-react'

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

// Service Card Component
const ServiceCard = ({
  service,
  index,
  onSelect,
}: {
  service: any
  index: number
  onSelect: (service: any) => void
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 cursor-pointer h-full flex flex-col'
      onClick={() => onSelect(service)}
    >
      <div
        className={`p-4 rounded-xl w-fit mb-6 transition-colors ${
          isHovered ? 'bg-blue-600' : 'bg-blue-100'
        }`}
      >
        <service.icon
          className={`w-8 h-8 transition-colors ${
            isHovered ? 'text-white' : 'text-blue-600'
          }`}
        />
      </div>

      <h3 className='text-2xl font-bold text-slate-900 mb-4'>
        {service.title}
      </h3>
      <p className='text-slate-600 mb-6 flex-1'>{service.description}</p>

      <div className='space-y-3 mb-6'>
        {service.highlights.map((highlight: any, idx: number) => (
          <div key={idx} className='flex items-center gap-2'>
            <CheckCircle2 className='w-5 h-5 text-green-500 flex-shrink-0' />
            <span className='text-sm text-slate-700'>{highlight}</span>
          </div>
        ))}
      </div>

      <motion.div
        className='flex items-center gap-2 text-blue-600 font-semibold mt-auto'
        animate={{ x: isHovered ? 5 : 0 }}
      >
        Learn More <ArrowRight className='w-5 h-5' />
      </motion.div>
    </motion.div>
  )
}

// Service Detail Modal
const ServiceDetail = ({
  service,
  onClose,
}: {
  service: any
  onClose: () => void
}) => {
  if (!service) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6'
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className='bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'
        onClick={e => e.stopPropagation()}
      >
        <div className='p-8 md:p-12'>
          <div className='flex items-start justify-between mb-8'>
            <div>
              <div className='p-4 bg-blue-100 rounded-xl w-fit mb-4'>
                <service.icon className='w-10 h-10 text-blue-600' />
              </div>
              <h2 className='text-4xl font-bold text-slate-900 mb-4'>
                {service.title}
              </h2>
              <p className='text-xl text-slate-600'>
                {service.fullDescription}
              </p>
            </div>
            <button
              onClick={onClose}
              className='text-slate-400 hover:text-slate-600 text-3xl font-light'
            >
              ×
            </button>
          </div>

          <div className='grid md:grid-cols-2 gap-8 mb-8'>
            <div>
              <h3 className='text-2xl font-bold text-slate-900 mb-4'>
                Key Features
              </h3>
              <div className='space-y-3'>
                {service.features.map((feature: any, idx: number) => (
                  <div key={idx} className='flex items-start gap-3'>
                    <CheckCircle2 className='w-6 h-6 text-green-500 flex-shrink-0 mt-0.5' />
                    <span className='text-slate-700'>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className='text-2xl font-bold text-slate-900 mb-4'>
                Technologies
              </h3>
              <div className='flex flex-wrap gap-2'>
                {service.technologies.map((tech: any, idx: number) => (
                  <span
                    key={idx}
                    className='px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8'>
            <h3 className='text-2xl font-bold text-slate-900 mb-4'>
              Why Choose Us?
            </h3>
            <div className='grid md:grid-cols-3 gap-6'>
              {service.benefits.map((benefit: any, idx: number) => (
                <div key={idx} className='text-center'>
                  <div className='text-3xl font-bold text-blue-600 mb-2'>
                    {benefit.stat}
                  </div>
                  <div className='text-sm text-slate-600'>{benefit.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-8 flex gap-4'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold'
            >
              Start Your Project
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-6 py-4 border-2 border-slate-300 hover:border-slate-400 text-slate-700 rounded-lg font-semibold'
            >
              Schedule Consultation
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ServicesPage() {
  const { scrollYProgress } = useScroll()
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      description:
        'Build lightning-fast web and mobile apps that users love. From idea to production in weeks, not months.',
      fullDescription:
        "We don't just write code—we architect scalable, maintainable systems that grow with your business. Our full-stack expertise means faster delivery, fewer bugs, and happier users.",
      highlights: [
        'Production-ready in 4-6 weeks',
        'Modern React & Next.js frontends',
        'Scalable Node.js backends',
      ],
      features: [
        'Frontend Development (React, Next.js, TypeScript)',
        'Backend Development (Node.js, Python, Java)',
        'Database Design & Optimization (PostgreSQL, MongoDB)',
        'RESTful & GraphQL API Development',
        'Performance Optimization & Code Audits',
        'Comprehensive Testing & QA',
      ],
      technologies: [
        'React',
        'Next.js',
        'Node.js',
        'TypeScript',
        'PostgreSQL',
        'MongoDB',
        'TailwindCSS',
      ],
      benefits: [
        { stat: '10x', label: 'Faster Development' },
        { stat: '99.9%', label: 'Uptime' },
        { stat: '4-6 wks', label: 'To Production' },
      ],
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description:
        'Stop worrying about server crashes. Auto-scaling cloud infrastructure that handles traffic spikes automatically.',
      fullDescription:
        'From AWS to GCP, we architect cloud-native solutions that scale with your business. Sleep better knowing your infrastructure can handle anything.',
      highlights: [
        '99.99% uptime guarantee',
        '40% average cost reduction',
        'Auto-scaling during spikes',
      ],
      features: [
        'Cloud Migration Strategy & Execution',
        'Serverless Architecture (Lambda, Cloud Functions)',
        'Kubernetes & Container Orchestration',
        'Auto-scaling & Load Balancing',
        'Real-time Monitoring & Alerting',
        'Cost Optimization & Right-sizing',
      ],
      technologies: [
        'AWS',
        'GCP',
        'Azure',
        'Kubernetes',
        'Docker',
        'Terraform',
        'CloudFormation',
      ],
      benefits: [
        { stat: '40%', label: 'Cost Savings' },
        { stat: '99.99%', label: 'Uptime SLA' },
        { stat: 'Auto', label: 'Scaling' },
      ],
    },
    {
      icon: Users,
      title: 'Team Augmentation',
      description:
        'Need senior developers yesterday? Get AI-augmented teams that integrate seamlessly with your existing workflows.',
      fullDescription:
        'Stop the endless hiring cycle. Our battle-tested developers ramp up in days, not months, and deliver production code from day one.',
      highlights: [
        'Senior developers only',
        'Integrate in 48 hours',
        'No long-term contracts',
      ],
      features: [
        'Pre-vetted Senior Developers',
        'Agile Project Management',
        '24/7 Development Coverage',
        'Seamless Team Integration',
        'Quality Assurance & Code Reviews',
        'Knowledge Transfer & Documentation',
      ],
      technologies: [
        'React',
        'Node.js',
        'Python',
        'Java',
        'AWS',
        'Kubernetes',
        'CI/CD',
      ],
      benefits: [
        { stat: '48hrs', label: 'Onboarding Time' },
        { stat: 'Senior', label: 'Developers Only' },
        { stat: 'Flexible', label: 'Contracts' },
      ],
    },
    {
      icon: Wrench,
      title: 'DevOps & Infrastructure',
      description:
        'Deploy 10x faster with automated CI/CD pipelines. From commit to production in minutes, not days.',
      fullDescription:
        'Transform your deployment process from nerve-wracking to boring (in a good way). Automated testing, deployment, and monitoring mean you ship with confidence.',
      highlights: [
        'Automated CI/CD pipelines',
        'Infrastructure as Code',
        'Zero-downtime deployments',
      ],
      features: [
        'CI/CD Pipeline Design & Implementation',
        'Infrastructure as Code (Terraform, Ansible)',
        'Container Orchestration (Kubernetes, Docker)',
        'Monitoring & Alerting (Prometheus, Grafana)',
        'Security & Compliance Automation',
        'Disaster Recovery & Backup Solutions',
      ],
      technologies: [
        'Jenkins',
        'GitLab CI',
        'GitHub Actions',
        'Terraform',
        'Ansible',
        'Prometheus',
        'Grafana',
      ],
      benefits: [
        { stat: '10x', label: 'Faster Deploys' },
        { stat: 'Zero', label: 'Downtime' },
        { stat: '100%', label: 'Automated' },
      ],
    },
    {
      icon: BarChart3,
      title: 'Data & Analytics',
      description:
        'Turn your data into decisions. Real-time dashboards and AI-powered insights that actually drive business growth.',
      fullDescription:
        'Your data has stories to tell. We build analytics systems that surface insights automatically, so you can focus on action instead of spreadsheets.',
      highlights: [
        'Real-time dashboards',
        'Predictive analytics',
        'AI-powered insights',
      ],
      features: [
        'Data Warehouse Architecture',
        'Business Intelligence Dashboards',
        'Big Data Processing (Kafka, Spark)',
        'Machine Learning Model Development',
        'Interactive Data Visualization',
        'Predictive Analytics & Forecasting',
      ],
      technologies: [
        'Python',
        'TensorFlow',
        'Apache Kafka',
        'Spark',
        'Tableau',
        'Power BI',
        'Looker',
      ],
      benefits: [
        { stat: 'Real-time', label: 'Insights' },
        { stat: 'AI', label: 'Powered' },
        { stat: 'Custom', label: 'Models' },
      ],
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description:
        'Sleep soundly knowing your systems are fortress-grade secure. Proactive threat detection before problems happen.',
      fullDescription:
        "Security isn't a checkbox—it's a culture. We build defense-in-depth strategies that protect your business, data, and reputation.",
      highlights: [
        'Proactive threat detection',
        'Compliance ready (SOC 2, GDPR)',
        '24/7 security monitoring',
      ],
      features: [
        'Comprehensive Security Audits',
        'Penetration Testing & Vulnerability Assessment',
        'Compliance Management (SOC 2, GDPR, HIPAA)',
        'Real-time Threat Detection & Response',
        'Security Training & Awareness Programs',
        'Incident Response Planning',
      ],
      technologies: [
        'AWS Security',
        'OWASP',
        'Snyk',
        'HashiCorp Vault',
        'Splunk',
        'Cloudflare',
      ],
      benefits: [
        { stat: '24/7', label: 'Monitoring' },
        { stat: 'SOC 2', label: 'Certified' },
        { stat: '< 15min', label: 'Response Time' },
      ],
    },
  ]

  const processSteps = [
    {
      icon: Target,
      number: '01',
      title: 'Discovery & Analysis',
      description:
        'We dive deep into your business challenges, technical requirements, and growth goals to create a comprehensive roadmap.',
      duration: '1-2 weeks',
    },
    {
      icon: Sparkles,
      number: '02',
      title: 'Strategy & Planning',
      description:
        'Our architects design the perfect tech stack and project plan with clear milestones, timelines, and success metrics.',
      duration: '1 week',
    },
    {
      icon: Layers,
      number: '03',
      title: 'Agile Implementation',
      description:
        "We build in 2-week sprints with regular demos, feedback loops, and course corrections to ensure we're always on track.",
      duration: '4-12 weeks',
    },
    {
      icon: TrendingUp,
      number: '04',
      title: 'Launch & Optimization',
      description:
        'Smooth deployment, user training, and ongoing monitoring to ensure your solution delivers maximum ROI from day one.',
      duration: 'Ongoing',
    },
  ]

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Scroll Progress Bar */}
      <motion.div
        className='fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left'
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <section className='relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.3),transparent_50%)]' />
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(147,51,234,0.3),transparent_50%)]' />
        </div>

        <div className='container mx-auto px-6 relative z-10'>
          <div className='max-w-4xl'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full mb-8 backdrop-blur-sm'
            >
              <Sparkles className='w-4 h-4' />
              <span className='text-sm font-medium'>
                Enterprise-Grade Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-5xl md:text-7xl font-bold text-white mb-6 leading-tight'
            >
              Services That Drive
              <span className='block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>
                Real Business Growth
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed'
            >
              From full-stack development to AI automation, we deliver
              end-to-end solutions that transform your business in weeks, not
              years.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/50 transition-colors'
            >
              Explore Our Services
              <ArrowRight className='w-5 h-5' />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className='py-24 bg-white'>
        <div className='container mx-auto px-6'>
          <ScrollReveal>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-slate-900 mb-6'>
                What We Offer
              </h2>
              <p className='text-xl text-slate-600'>
                Comprehensive technology services designed to accelerate your
                digital transformation
              </p>
            </div>
          </ScrollReveal>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
            <StaggerChildren staggerDelay={0.1}>
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  service={service}
                  index={index}
                  onSelect={setSelectedService}
                />
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className='py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'>
        <div className='container mx-auto px-6'>
          <ScrollReveal>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
                Our Proven Process
              </h2>
              <p className='text-xl text-slate-300'>
                A systematic approach that ensures on-time delivery and
                exceptional results
              </p>
            </div>
          </ScrollReveal>

          <div className='max-w-5xl mx-auto'>
            <StaggerChildren staggerDelay={0.15}>
              {processSteps.map((step, index) => (
                <div key={index} className='relative mb-12 last:mb-0'>
                  {index < processSteps.length - 1 && (
                    <div className='absolute left-8 top-24 bottom-0 w-0.5 bg-blue-500/30' />
                  )}

                  <div className='flex gap-6 items-start relative'>
                    <div className='flex-shrink-0'>
                      <div className='w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative z-10'>
                        <step.icon className='w-8 h-8 text-white' />
                      </div>
                    </div>

                    <div className='flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10'>
                      <div className='flex items-start justify-between mb-4'>
                        <div>
                          <span className='text-blue-400 font-mono text-sm mb-2 block'>
                            {step.number}
                          </span>
                          <h3 className='text-2xl font-bold text-white mb-3'>
                            {step.title}
                          </h3>
                        </div>
                        <span className='text-blue-300 text-sm font-medium px-3 py-1 bg-blue-500/20 rounded-full'>
                          {step.duration}
                        </span>
                      </div>
                      <p className='text-slate-300 text-lg leading-relaxed'>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className='py-24 bg-white'>
        <div className='container mx-auto px-6'>
          <ScrollReveal>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-slate-900 mb-6'>
                Why Teams Choose BestIT
              </h2>
              <p className='text-xl text-slate-600'>
                We're not just another consulting firm—we're your technical
                co-founder
              </p>
            </div>
          </ScrollReveal>

          <div className='grid md:grid-cols-4 gap-8 max-w-6xl mx-auto'>
            <StaggerChildren staggerDelay={0.1}>
              {[
                {
                  icon: Zap,
                  value: '10x',
                  label: 'Faster Development',
                  color: 'blue',
                },
                {
                  icon: Award,
                  value: '20+',
                  label: 'Years Experience',
                  color: 'purple',
                },
                {
                  icon: Gauge,
                  value: '99.9%',
                  label: 'Uptime Guarantee',
                  color: 'green',
                },
                {
                  icon: Users,
                  value: '50+',
                  label: 'Happy Clients',
                  color: 'orange',
                },
              ].map((stat, idx) => (
                <ScrollReveal delay={idx * 0.1} key={idx}>
                  <div className='text-center p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:shadow-lg transition-all'>
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}
                    >
                      <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                    </div>
                    <div className='text-4xl font-bold text-slate-900 mb-2'>
                      {stat.value}
                    </div>
                    <div className='text-slate-600'>{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 bg-gradient-to-br from-blue-600 to-purple-700'>
        <div className='container mx-auto px-6'>
          <ScrollReveal>
            <div className='max-w-3xl mx-auto text-center'>
              <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
                Ready to Transform Your Business?
              </h2>
              <p className='text-xl text-blue-100 mb-8'>
                Let's discuss how our expert team can help you achieve your
                technology goals
              </p>

              <div className='flex flex-wrap gap-4 justify-center'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-10 py-5 bg-white text-blue-600 rounded-lg font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all inline-flex items-center gap-3'
                >
                  Start Your Project
                  <ArrowRight className='w-6 h-6' />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-10 py-5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold text-lg backdrop-blur-sm border border-white/20 transition-all'
                >
                  Schedule Consultation
                </motion.button>
              </div>

              <p className='mt-6 text-blue-200 text-sm'>
                No credit card required • 30-minute discovery call • Custom
                proposal within 48 hours
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetail
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  )
}
