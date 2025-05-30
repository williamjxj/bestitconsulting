import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Layout from '@/components/Layout'
import {
  Code2,
  Globe,
  Users,
  Award,
  Cloud,
  Shield,
  Database,
  Smartphone,
} from 'lucide-react'

export default function HomePage() {
  const services = [
    {
      icon: <Code2 className='h-12 w-12' />,
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
      icon: <Cloud className='h-12 w-12' />,
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
      icon: <Users className='h-12 w-12' />,
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
      icon: <Award className='h-12 w-12' />,
      title: 'Enterprise Solutions',
      description:
        'Large-scale enterprise applications with robust architecture and security.',
      features: [
        'Enterprise Architecture',
        'Legacy System Modernization',
        'Integration Solutions',
        'Security Implementation',
        'Performance Optimization',
        'Compliance & Governance',
      ],
      technologies: [
        '.NET Core',
        'Spring Boot',
        'Angular',
        'Vue.js',
        'Oracle',
        'SQL Server',
        'Redis',
        'RabbitMQ',
      ],
    },
    {
      icon: <Smartphone className='h-12 w-12' />,
      title: 'Mobile Development',
      description:
        'Native and cross-platform mobile applications for iOS and Android.',
      features: [
        'Native iOS Development',
        'Native Android Development',
        'Cross-platform Solutions',
        'Mobile UI/UX Design',
        'App Store Optimization',
        'Mobile Analytics',
      ],
      technologies: [
        'React Native',
        'Flutter',
        'Swift',
        'Kotlin',
        'Xamarin',
        'Firebase',
        'App Store',
        'Google Play',
      ],
    },
    {
      icon: <Shield className='h-12 w-12' />,
      title: 'Security Solutions',
      description:
        'Comprehensive security services to protect your applications and data.',
      features: [
        'Security Audits',
        'Penetration Testing',
        'Vulnerability Assessment',
        'Security Architecture',
        'Compliance Management',
        'Incident Response',
      ],
      technologies: [
        'OAuth',
        'JWT',
        'SSL/TLS',
        'OWASP',
        'Encryption',
        'Multi-factor Auth',
        'GDPR',
        'HIPAA',
      ],
    },
    {
      icon: <Database className='h-12 w-12' />,
      title: 'Data & Analytics',
      description:
        'Data engineering, analytics, and business intelligence solutions.',
      features: [
        'Data Pipeline Development',
        'Business Intelligence',
        'Real-time Analytics',
        'Data Visualization',
        'Machine Learning Integration',
        'Data Governance',
      ],
      technologies: [
        'Python',
        'R',
        'Tableau',
        'Power BI',
        'Apache Spark',
        'Elasticsearch',
        'TensorFlow',
        'PyTorch',
      ],
    },
    {
      icon: <Globe className='h-12 w-12' />,
      title: 'DevOps & Infrastructure',
      description:
        'DevOps practices and infrastructure automation for reliable deployments.',
      features: [
        'CI/CD Pipeline Setup',
        'Infrastructure as Code',
        'Monitoring & Alerting',
        'Automated Testing',
        'Release Management',
        'Performance Monitoring',
      ],
      technologies: [
        'Jenkins',
        'GitLab CI',
        'GitHub Actions',
        'Ansible',
        'Terraform',
        'Prometheus',
        'Grafana',
        'ELK Stack',
      ],
    },
  ]

  return (
    <Layout>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            Our Services
          </h1>
          <p className='text-xl text-gray-600 max-w-4xl mx-auto'>
            We offer comprehensive software development services designed to
            help your business thrive in today's digital landscape. Our expert
            team delivers customized solutions that address your specific
            challenges and objectives.
          </p>
        </div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {services.map((service, index) => (
            <Card key={index} className='p-6 hover:shadow-lg transition-shadow'>
              <CardHeader className='pb-4'>
                <div className='text-blue-600 mb-4'>{service.icon}</div>
                <CardTitle className='text-2xl mb-3'>{service.title}</CardTitle>
                <CardDescription className='text-base'>
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className='pt-0'>
                <div className='mb-6'>
                  <h4 className='font-semibold text-gray-900 mb-3'>
                    Key Features:
                  </h4>
                  <ul className='space-y-2'>
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className='flex items-start'>
                        <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0'></div>
                        <span className='text-gray-600'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className='font-semibold text-gray-900 mb-3'>
                    Technologies:
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {service.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant='secondary'
                        className='text-xs'
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className='mt-20 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Ready to Get Started?
          </h2>
          <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
            Let's discuss your project requirements and how our services can
            help you achieve your goals.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='/contact'
              className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors'
            >
              Start Your Project
            </a>
            <a
              href='/portfolio'
              className='inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors'
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
