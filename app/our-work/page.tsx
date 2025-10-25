'use client'

import Layout from '@/components/Layout'
import BookmarkList from '@/components/bookmark-list'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Rocket,
  CheckCircle,
  Code2,
  Target,
  Globe,
  ArrowRight,
  Users,
} from 'lucide-react'
import Link from 'next/link'

export default function OurWorkPage() {
  return (
    <Layout>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
        {/* Hero Section */}
        <section className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 md:py-32'>
          {/* Background decoration */}
          <div className='absolute inset-0 overflow-hidden'>
            <div className='absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-500/10 to-transparent rounded-full animate-pulse-slow'></div>
            <div className='absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-cyan-400/10 to-transparent rounded-full animate-pulse-slow'></div>
          </div>

          <div className='max-w-7xl mx-auto px-4 relative z-10'>
            <div className='text-center mb-20'>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6'>
                <Rocket className='h-4 w-4 text-cyan-400' />
                <span className='text-sm font-medium text-cyan-100'>
                  Live Projects Portfolio
                </span>
              </div>
              <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent'>
                Our Work
              </h1>
              <p className='text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed mb-8'>
                Discover our portfolio of cutting-edge digital solutions, from
                AI-powered applications to enterprise-grade platforms that drive
                business transformation.
              </p>
              <div className='flex flex-wrap justify-center gap-6 text-sm text-blue-200/80'>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='h-4 w-4 text-green-400' />
                  <span>9+ Live Projects</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='h-4 w-4 text-green-400' />
                  <span>Multiple Industries</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='h-4 w-4 text-green-400' />
                  <span>Modern Tech Stack</span>
                </div>
              </div>
            </div>

            <div className='grid lg:grid-cols-4 gap-8 items-start'>
              {/* Left side - Key Features */}
              <div className='lg:col-span-1 space-y-6'>
                <Card className='border-0 bg-white/10 backdrop-blur-sm shadow-2xl'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-3 text-lg text-white'>
                      <div className='p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500'>
                        <Code2 className='h-4 w-4' />
                      </div>
                      Technologies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3 text-sm text-blue-100'>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-green-400'></div>
                      <span>Next.js & React</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-blue-400'></div>
                      <span>TypeScript</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-purple-400'></div>
                      <span>AI Integration</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-yellow-400'></div>
                      <span>Cloud Deployment</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-pink-400'></div>
                      <span>Modern UI/UX</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className='border-0 bg-white/10 backdrop-blur-sm shadow-2xl'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-3 text-lg text-white'>
                      <div className='p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500'>
                        <Target className='h-4 w-4' />
                      </div>
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3 text-sm text-blue-100'>
                    <div className='flex justify-between items-center'>
                      <span>Business Solutions</span>
                      <span className='text-cyan-400 font-medium'>3</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>AI Applications</span>
                      <span className='text-yellow-400 font-medium'>2</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>Development Tools</span>
                      <span className='text-green-400 font-medium'>2</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>E-commerce & Media</span>
                      <span className='text-purple-400 font-medium'>2</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className='border-0 bg-white/10 backdrop-blur-sm shadow-2xl'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-3 text-lg text-white'>
                      <div className='p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500'>
                        <Globe className='h-4 w-4' />
                      </div>
                      Live Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3 text-sm text-blue-100'>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-green-400 animate-pulse'></div>
                      <span>All projects online</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-blue-400'></div>
                      <span>Interactive demos</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-yellow-400'></div>
                      <span>Regular updates</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right side - Project List */}
              <div className='lg:col-span-3'>
                <div className='mb-8'>
                  <h2 className='text-3xl font-bold text-white mb-4'>
                    Live Projects Portfolio
                  </h2>
                  <p className='text-blue-200/80 text-lg'>
                    Click on any project below to explore the live
                    implementation. Each project showcases our expertise in
                    different technologies and industries.
                  </p>
                </div>
                <BookmarkList />
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className='py-20 px-4 bg-white'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                Why Choose Our Solutions?
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Every project in our portfolio represents our commitment to
                excellence, innovation, and client success.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
                <CardHeader className='text-center'>
                  <div className='w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4'>
                    <Code2 className='h-8 w-8 text-white' />
                  </div>
                  <CardTitle className='text-xl'>Modern Technology</CardTitle>
                </CardHeader>
                <CardContent className='text-center'>
                  <p className='text-gray-600'>
                    Built with the latest frameworks and best practices for
                    optimal performance and scalability.
                  </p>
                </CardContent>
              </Card>

              <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
                <CardHeader className='text-center'>
                  <div className='w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4'>
                    <Target className='h-8 w-8 text-white' />
                  </div>
                  <CardTitle className='text-xl'>Industry Focus</CardTitle>
                </CardHeader>
                <CardContent className='text-center'>
                  <p className='text-gray-600'>
                    Tailored solutions for diverse industries, from e-commerce
                    to AI applications and enterprise tools.
                  </p>
                </CardContent>
              </Card>

              <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
                <CardHeader className='text-center'>
                  <div className='w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4'>
                    <Rocket className='h-8 w-8 text-white' />
                  </div>
                  <CardTitle className='text-xl'>Live & Interactive</CardTitle>
                </CardHeader>
                <CardContent className='text-center'>
                  <p className='text-gray-600'>
                    All projects are live and fully functional, demonstrating
                    real-world applications and user experiences.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-4xl font-bold mb-6'>
              Ready to Build Your Next Project?
            </h2>
            <p className='text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto'>
              Let's discuss how we can create innovative solutions for your
              business, just like the projects showcased above.
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
                <Link href='/about'>
                  <Users className='mr-2 h-5 w-5' />
                  Learn About Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
