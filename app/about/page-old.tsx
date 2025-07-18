import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Layout from '@/components/Layout'
import { MapPin, Globe, Users, Award, Clock, Target } from 'lucide-react'

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
      icon: <Target className='h-8 w-8' />,
      title: 'Excellence',
      description:
        'We strive for the highest quality in everything we do, from code to client communication.',
    },
    {
      icon: <Users className='h-8 w-8' />,
      title: 'Collaboration',
      description:
        'We work closely with our clients as partners, ensuring transparency and shared success.',
    },
    {
      icon: <Clock className='h-8 w-8' />,
      title: 'Reliability',
      description:
        'We deliver on our promises, meeting deadlines and maintaining consistent quality.',
    },
    {
      icon: <Award className='h-8 w-8' />,
      title: 'Innovation',
      description:
        'We stay at the forefront of technology to provide cutting-edge solutions.',
    },
  ]

  return (
    <Layout>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            About BestIT Consulting
          </h1>
          <p className='text-xl text-gray-600 max-w-4xl mx-auto'>
            We're a team of passionate software engineers and technology
            consultants dedicated to helping businesses transform their ideas
            into powerful digital solutions.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20'>
          <div>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>
              Our Mission
            </h2>
            <p className='text-lg text-gray-600 mb-6'>
              At BestIT Consulting, our mission is to bridge the gap between
              innovative technology and business success. We empower
              organizations of all sizes to leverage cutting-edge software
              solutions that drive growth, efficiency, and competitive
              advantage.
            </p>
            <p className='text-lg text-gray-600'>
              With headquarters in Vancouver, Canada and strategic presence in
              East Asia, we combine global talent with local expertise to
              deliver world-class software solutions that meet the highest
              international standards.
            </p>
          </div>
          <div>
            <Image
              src='/placeholder.svg'
              alt='Our Team'
              width={500}
              height={400}
              className='rounded-lg shadow-lg'
            />
          </div>
        </div>

        {/* Stats */}
        <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-12 mb-20'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            <div>
              <div className='text-4xl font-bold text-blue-600 mb-2'>150+</div>
              <div className='text-gray-600'>Projects Delivered</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-blue-600 mb-2'>50+</div>
              <div className='text-gray-600'>Happy Clients</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-blue-600 mb-2'>10+</div>
              <div className='text-gray-600'>Years Experience</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-blue-600 mb-2'>24/7</div>
              <div className='text-gray-600'>Support Coverage</div>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className='mb-20'>
          <h2 className='text-3xl font-bold text-gray-900 text-center mb-12'>
            Global Presence
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <Card className='p-6'>
              <CardHeader className='pb-4'>
                <div className='flex items-center mb-4'>
                  <MapPin className='h-6 w-6 text-blue-600 mr-3' />
                  <CardTitle className='text-xl'>Vancouver, Canada</CardTitle>
                </div>
                <CardDescription>
                  Headquarters & North American Operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600'>
                  Our main office in Vancouver serves as the hub for our North
                  American operations, providing strategic oversight and client
                  management for the region.
                </p>
              </CardContent>
            </Card>

            <Card className='p-6'>
              <CardHeader className='pb-4'>
                <div className='flex items-center mb-4'>
                  <Globe className='h-6 w-6 text-blue-600 mr-3' />
                  <CardTitle className='text-xl'>East Asia</CardTitle>
                </div>
                <CardDescription>
                  Development Center & Regional Office
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600'>
                  Our development center in East Asia provides round-the-clock
                  development capabilities and technical expertise, ensuring
                  24/7 project coverage and support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Values */}
        <div className='mb-20'>
          <h2 className='text-3xl font-bold text-gray-900 text-center mb-12'>
            Our Values
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, index) => (
              <Card key={index} className='text-center p-6'>
                <CardHeader className='pb-4'>
                  <div className='text-blue-600 mx-auto mb-4'>{value.icon}</div>
                  <CardTitle className='text-xl'>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-600'>{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className='mb-20'>
          <h2 className='text-3xl font-bold text-gray-900 text-center mb-12'>
            Meet Our Team
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {teamMembers.map((member, index) => (
              <Card key={index} className='overflow-hidden'>
                <div className='aspect-square relative'>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className='object-cover'
                  />
                </div>
                <CardHeader>
                  <CardTitle className='text-lg'>{member.name}</CardTitle>
                  <CardDescription className='text-blue-600 font-medium'>
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-gray-600 mb-4'>{member.bio}</p>
                  <div className='flex flex-wrap gap-1'>
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

        {/* Why Choose Us */}
        <div className='bg-gray-50 rounded-lg p-12'>
          <h2 className='text-3xl font-bold text-gray-900 text-center mb-8'>
            Why Choose BestIT Consulting?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                <Award className='h-8 w-8 text-blue-600' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Proven Expertise</h3>
              <p className='text-gray-600'>
                Our team has successfully delivered 150+ projects across various
                industries and technologies.
              </p>
            </div>
            <div className='text-center'>
              <div className='bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                <Globe className='h-8 w-8 text-blue-600' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Global Coverage</h3>
              <p className='text-gray-600'>
                With teams in North America and Asia, we provide 24/7
                development and support coverage.
              </p>
            </div>
            <div className='text-center'>
              <div className='bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                <Users className='h-8 w-8 text-blue-600' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Client-Focused</h3>
              <p className='text-gray-600'>
                We work as an extension of your team, ensuring transparent
                communication and shared success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
