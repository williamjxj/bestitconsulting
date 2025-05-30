"use client";

import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function TestimonialsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Client Testimonials
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Hear what our clients say about working with BestIT Consulting
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  98%
                </div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  4.9/5
                </div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  50+
                </div>
                <div className="text-gray-600">Countries Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              What Our Clients Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <div className="bg-blue-500 text-white flex items-center justify-center h-full w-full rounded-full">
                        JS
                      </div>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        John Smith
                      </h3>
                      <p className="text-sm text-gray-600">
                        CEO, TechStart Inc
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {"★".repeat(5)}
                    </div>
                    <p className="text-gray-700">
                      "BestIT Consulting transformed our entire digital
                      infrastructure. Their expertise in cloud migration saved
                      us 40% in operational costs while improving performance
                      significantly."
                    </p>
                  </div>
                  <Badge variant="secondary">Cloud Migration</Badge>
                </CardContent>
              </Card>

              {/* Testimonial 2 */}
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <div className="bg-green-500 text-white flex items-center justify-center h-full w-full rounded-full">
                        MJ
                      </div>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Maria Johnson
                      </h3>
                      <p className="text-sm text-gray-600">
                        CTO, HealthTech Solutions
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {"★".repeat(5)}
                    </div>
                    <p className="text-gray-700">
                      "The AI solutions they developed for our healthcare
                      platform increased our diagnostic accuracy by 30%. Their
                      team's expertise in machine learning is unmatched."
                    </p>
                  </div>
                  <Badge variant="secondary">AI Development</Badge>
                </CardContent>
              </Card>

              {/* Testimonial 3 */}
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <div className="bg-purple-500 text-white flex items-center justify-center h-full w-full rounded-full">
                        DL
                      </div>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">David Lee</h3>
                      <p className="text-sm text-gray-600">
                        Founder, E-commerce Plus
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {"★".repeat(5)}
                    </div>
                    <p className="text-gray-700">
                      "Our custom e-commerce platform built by BestIT has
                      tripled our online sales. The mobile app they developed
                      has over 100K downloads in just 6 months."
                    </p>
                  </div>
                  <Badge variant="secondary">E-commerce Development</Badge>
                </CardContent>
              </Card>

              {/* Testimonial 4 */}
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <div className="bg-red-500 text-white flex items-center justify-center h-full w-full rounded-full">
                        SB
                      </div>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Sarah Brown
                      </h3>
                      <p className="text-sm text-gray-600">
                        VP IT, Global Finance Corp
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {"★".repeat(5)}
                    </div>
                    <p className="text-gray-700">
                      "Their cybersecurity assessment identified critical
                      vulnerabilities and their implementation of security
                      measures has given us peace of mind. Professional and
                      thorough."
                    </p>
                  </div>
                  <Badge variant="secondary">Cybersecurity</Badge>
                </CardContent>
              </Card>

              {/* Testimonial 5 */}
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <div className="bg-indigo-500 text-white flex items-center justify-center h-full w-full rounded-full">
                        RW
                      </div>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Robert Wilson
                      </h3>
                      <p className="text-sm text-gray-600">
                        Director, Manufacturing Inc
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {"★".repeat(5)}
                    </div>
                    <p className="text-gray-700">
                      "The IoT solutions they implemented in our factory floor
                      increased efficiency by 25%. Real-time monitoring and
                      predictive maintenance have revolutionized our
                      operations."
                    </p>
                  </div>
                  <Badge variant="secondary">IoT Solutions</Badge>
                </CardContent>
              </Card>

              {/* Testimonial 6 */}
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <div className="bg-pink-500 text-white flex items-center justify-center h-full w-full rounded-full">
                        LC
                      </div>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">Lisa Chen</h3>
                      <p className="text-sm text-gray-600">
                        Manager, Retail Chain
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {"★".repeat(5)}
                    </div>
                    <p className="text-gray-700">
                      "Their data analytics platform provided insights that
                      helped us optimize inventory management and reduce waste
                      by 35%. The ROI was evident within the first quarter."
                    </p>
                  </div>
                  <Badge variant="secondary">Data Analytics</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Featured Success Story
            </h2>
            <Card className="text-left">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Avatar className="h-16 w-16 mr-6">
                    <div className="bg-blue-600 text-white flex items-center justify-center h-full w-full rounded-full text-xl">
                      AT
                    </div>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Alex Thompson
                    </h3>
                    <p className="text-gray-600">CTO, FinanceForward</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">The Challenge</h4>
                  <p className="text-gray-700 mb-4">
                    "We needed to modernize our legacy banking system while
                    ensuring zero downtime and maintaining strict regulatory
                    compliance."
                  </p>

                  <h4 className="text-lg font-semibold mb-3">The Solution</h4>
                  <p className="text-gray-700 mb-4">
                    "BestIT Consulting designed a phased migration strategy
                    using microservices architecture and implemented a robust
                    testing framework."
                  </p>

                  <h4 className="text-lg font-semibold mb-3">The Results</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 p-4 rounded">
                      <div className="text-2xl font-bold text-blue-600">
                        99.9%
                      </div>
                      <div className="text-sm text-gray-600">
                        Uptime Achieved
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded">
                      <div className="text-2xl font-bold text-green-600">
                        60%
                      </div>
                      <div className="text-sm text-gray-600">
                        Performance Increase
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded">
                      <div className="text-2xl font-bold text-purple-600">
                        6 months
                      </div>
                      <div className="text-sm text-gray-600">
                        Ahead of Schedule
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex text-yellow-400 mb-4">{"★".repeat(5)}</div>
                <p className="text-gray-700 italic">
                  "Working with BestIT was a game-changer. Their expertise,
                  professionalism, and commitment to our success exceeded all
                  expectations. I wouldn't hesitate to work with them again."
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge>Digital Transformation</Badge>
                  <Badge>Microservices</Badge>
                  <Badge>Financial Services</Badge>
                  <Badge>System Modernization</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl mb-8">
              Let's discuss how we can help transform your business with
              innovative technology solutions.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Your Project
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
