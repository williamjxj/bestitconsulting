import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { ExternalLink, Github } from "lucide-react";

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      client: "Online Retail Chain",
      description:
        "A comprehensive e-commerce solution with advanced inventory management, payment processing, and real-time analytics. Built for scalability to handle millions of transactions.",
      image: "/placeholder.svg",
      technologies: [
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Stripe",
        "Redis",
        "AWS",
      ],
      category: "Web Application",
      industry: "Retail",
      results: [
        "40% increase in conversion rates",
        "60% improvement in page load speed",
        "500K+ users served monthly",
        "99.9% uptime achieved",
      ],
      features: [
        "Multi-vendor marketplace",
        "Real-time inventory tracking",
        "Advanced search & filtering",
        "Mobile-responsive design",
        "Integrated payment gateway",
        "Admin dashboard with analytics",
      ],
    },
    {
      id: 2,
      title: "Healthcare Management System",
      client: "Regional Healthcare Provider",
      description:
        "HIPAA-compliant patient management system with appointment scheduling, electronic health records, and telemedicine capabilities.",
      image: "/placeholder.svg",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Socket.io",
        "WebRTC",
        "AWS",
        "Docker",
      ],
      category: "Enterprise Software",
      industry: "Healthcare",
      results: [
        "70% reduction in appointment scheduling time",
        "50% increase in patient satisfaction",
        "30% improvement in staff efficiency",
        "100% HIPAA compliance achieved",
      ],
      features: [
        "Electronic Health Records (EHR)",
        "Appointment scheduling",
        "Telemedicine platform",
        "Patient portal",
        "Billing integration",
        "Reporting and analytics",
      ],
    },
    {
      id: 3,
      title: "Financial Trading Platform",
      client: "Investment Firm",
      description:
        "High-frequency trading platform with real-time market data, advanced charting, and risk management tools for professional traders.",
      image: "/placeholder.svg",
      technologies: [
        "Java",
        "Spring Boot",
        "React",
        "WebSocket",
        "Redis",
        "PostgreSQL",
        "Kafka",
      ],
      category: "Fintech",
      industry: "Finance",
      results: [
        "Sub-millisecond latency achieved",
        "$10M+ daily trading volume",
        "99.99% system availability",
        "25% reduction in operational costs",
      ],
      features: [
        "Real-time market data feed",
        "Advanced charting tools",
        "Risk management system",
        "Order management",
        "Portfolio analytics",
        "Compliance reporting",
      ],
    },
    {
      id: 4,
      title: "Mobile Banking App",
      client: "Community Bank",
      description:
        "Secure mobile banking application with biometric authentication, instant transfers, and comprehensive account management features.",
      image: "/placeholder.svg",
      technologies: [
        "React Native",
        "Python",
        "FastAPI",
        "PostgreSQL",
        "AWS",
        "Biometric Auth",
      ],
      category: "Mobile Application",
      industry: "Banking",
      results: [
        "300K+ active monthly users",
        "95% customer satisfaction rate",
        "80% reduction in branch visits",
        "Zero security incidents",
      ],
      features: [
        "Biometric authentication",
        "Instant money transfers",
        "Bill payment system",
        "Account management",
        "Transaction history",
        "Customer support chat",
      ],
    },
    {
      id: 5,
      title: "Supply Chain Management",
      client: "Manufacturing Company",
      description:
        "End-to-end supply chain management system with real-time tracking, inventory optimization, and predictive analytics.",
      image: "/placeholder.svg",
      technologies: [
        "Vue.js",
        "Python",
        "Django",
        "PostgreSQL",
        "Machine Learning",
        "IoT",
      ],
      category: "Enterprise Software",
      industry: "Manufacturing",
      results: [
        "35% reduction in inventory costs",
        "50% improvement in delivery times",
        "90% reduction in stockouts",
        "25% increase in operational efficiency",
      ],
      features: [
        "Real-time tracking",
        "Inventory optimization",
        "Predictive analytics",
        "Supplier management",
        "Quality control",
        "Reporting dashboard",
      ],
    },
    {
      id: 6,
      title: "Learning Management System",
      client: "Educational Institution",
      description:
        "Comprehensive LMS with interactive course content, virtual classrooms, assessment tools, and progress tracking.",
      image: "/placeholder.svg",
      technologies: [
        "Angular",
        "Node.js",
        "MongoDB",
        "WebRTC",
        "Socket.io",
        "AWS S3",
      ],
      category: "EdTech",
      industry: "Education",
      results: [
        "15K+ students enrolled",
        "90% course completion rate",
        "40% improvement in learning outcomes",
        "24/7 platform availability",
      ],
      features: [
        "Interactive course content",
        "Virtual classrooms",
        "Assessment tools",
        "Progress tracking",
        "Discussion forums",
        "Mobile accessibility",
      ],
    },
  ];

  const categories = [
    "All",
    "Web Application",
    "Mobile Application",
    "Enterprise Software",
    "Fintech",
    "EdTech",
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Explore our successful projects and see how we've helped businesses
            across industries achieve their technology goals. Each case study
            demonstrates our commitment to delivering innovative, high-quality
            solutions.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button key={category} variant="outline" className="mb-2">
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <Card key={project.id} className="overflow-hidden">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Project Image */}
                <div
                  className={`relative ${
                    index % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div className="aspect-video relative rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-2xl font-bold text-center">
                        {project.title}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div
                  className={`space-y-6 ${
                    index % 2 === 1 ? "lg:col-start-1" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline">{project.category}</Badge>
                      <Badge variant="secondary">{project.industry}</Badge>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">
                      {project.client}
                    </p>
                    <p className="text-gray-600">{project.description}</p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Technologies Used:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Key Features:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Results Achieved:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600 font-medium">
                            {result}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Case Study
                    </Button>
                    <Button variant="outline">
                      <Github className="mr-2 h-4 w-4" />
                      View Demo
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how we can help you achieve
            similar success stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Your Project
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
