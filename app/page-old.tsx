import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Code2,
  Users,
  Cloud,
  Shield,
  Server,
  BarChart2,
  GitMerge,
  Cpu,
} from 'lucide-react'
import { HeroSection } from '@/components/HeroSection'
import { ServiceCard } from '@/components/ServiceCard'
import Layout from '@/components/Layout'
import Link from 'next/link'

export default function HomePage() {
  const services = [
    {
      icon: <Code2 className='h-6 w-6' />,
      title: 'Full-Stack Development',
      description:
        'End-to-end web and mobile application development using modern technologies and best practices.',
      features: [
        'Frontend Development (React, Vue, Angular)',
        'Backend Development (Node.js, Python, Java)',
        'Database Design & Optimization',
        'API Development & Integration',
        'Performance Optimization',
        'Code Review & Quality Assurance',
      ],
      technologies: [
        'React',
        'Next.js',
        'Node.js',
        'TypeScript',
        'Python',
        'Java',
        'PostgreSQL',
        'MongoDB',
      ],
    },
    {
      icon: <Cloud className='h-6 w-6' />,
      title: 'Cloud Solutions',
      description:
        'Scalable cloud architecture and deployment solutions for modern applications.',
      features: [
        'Cloud Migration Strategy',
        'Serverless Architecture',
        'Container Orchestration',
        'Auto-scaling Solutions',
        'Monitoring & Logging',
        'Cost Optimization',
      ],
      technologies: [
        'AWS',
        'Azure',
        'Google Cloud',
        'Docker',
        'Kubernetes',
        'Terraform',
        'CloudFormation',
      ],
    },
    {
      icon: <Users className='h-6 w-6' />,
      title: 'Team Augmentation',
      description:
        'Dedicated development teams to scale your existing projects and accelerate delivery.',
      features: [
        'Skilled Developer Teams',
        'Project Management',
        'Agile Methodologies',
        '24/7 Development Coverage',
        'Quality Assurance',
        'Knowledge Transfer',
      ],
      technologies: [
        'Agile',
        'Scrum',
        'DevOps',
        'CI/CD',
        'Git',
        'JIRA',
        'Slack',
        'GitHub',
      ],
    },
    {
      icon: <Server className='h-6 w-6' />,
      title: 'DevOps & Infrastructure',
      description:
        'Streamlined development workflows and robust infrastructure management.',
      features: [
        'CI/CD Pipeline Setup',
        'Infrastructure as Code',
        'Monitoring & Alerting',
        'Security & Compliance',
        'Performance Tuning',
        'Disaster Recovery',
      ],
      technologies: [
        'Docker',
        'Kubernetes',
        'Jenkins',
        'GitHub Actions',
        'Prometheus',
        'Grafana',
        'Ansible',
        'Terraform',
      ],
    },
    {
      icon: <BarChart2 className='h-6 w-6' />,
      title: 'Data & Analytics',
      description:
        'Data-driven insights and analytics solutions for your business.',
      features: [
        'Data Warehousing',
        'Business Intelligence',
        'Big Data Processing',
        'Machine Learning',
        'Data Visualization',
        'Predictive Analytics',
      ],
      technologies: [
        'Python',
        'SQL',
        'Spark',
        'Hadoop',
        'Tableau',
        'Power BI',
        'TensorFlow',
        'PyTorch',
      ],
    },
    {
      icon: <Shield className='h-6 w-6' />,
      title: 'Cybersecurity',
      description:
        'Comprehensive security solutions to protect your digital assets.',
      features: [
        'Security Audits',
        'Penetration Testing',
        'Compliance Management',
        'Threat Detection',
        'Incident Response',
        'Security Training',
      ],
      technologies: [
        'OWASP',
        'NIST',
        'ISO 27001',
        'GDPR',
        'SOC 2',
        'Penetration Testing',
        'SIEM',
        'PKI',
      ],
    },
  ]

  return (
    <Layout>
      <div className='min-h-screen'>
        <HeroSection />

        {/* Services Section */}
        <section className='py-20 bg-background'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <span className='inline-block px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4'>
                What We Offer
              </span>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Comprehensive IT Solutions for Your Business
              </h2>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                We deliver end-to-end technology services that drive digital
                transformation and business growth.
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>

            <div className='mt-16 text-center'>
              <Button size='lg' asChild>
                <Link href='/services' className='group'>
                  View All Services
                  <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className='py-20 bg-muted/50'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-16'>
              <span className='inline-block px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4'>
                Why Choose Us
              </span>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Your Trusted Technology Partner
              </h2>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                We go beyond software development to deliver real business value
                and innovation.
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {[
                {
                  icon: (
                    <Cpu className='h-8 w-8 text-blue-500 animate-pulse-slow' />
                  ),
                  title: 'Cutting-Edge Technology',
                  description:
                    'We leverage the latest technologies and frameworks to build future-proof solutions.',
                },
                {
                  icon: (
                    <GitMerge className='h-8 w-8 text-blue-500 animate-float' />
                  ),
                  title: 'Agile Development',
                  description:
                    'Our iterative approach ensures flexibility and faster time-to-market for your projects.',
                },
                {
                  icon: (
                    <Users className='h-8 w-8 text-blue-500 animate-scale-pulse' />
                  ),
                  title: 'Expert Team',
                  description:
                    'Work with certified professionals who are passionate about delivering excellence.',
                },
                {
                  icon: (
                    <Shield className='h-8 w-8 text-blue-500 animate-rotate-slow' />
                  ),
                  title: 'Security First',
                  description:
                    'We prioritize security and compliance in every solution we deliver.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className='bg-card p-6 rounded-xl border border-border/40 hover:border-blue-500/30 transition-all duration-300 hover-lift hover-glow group'
                >
                  <div className='w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg mb-4 group-hover:bg-blue-100 transition-colors duration-300'>
                    {item.icon}
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                  <p className='text-muted-foreground'>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Ready to Start Your Project?
            </h2>
            <p className='text-xl text-blue-100 max-w-2xl mx-auto mb-8'>
              Let&apos;s discuss how we can help you achieve your business goals
              with our expert software solutions.
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
