"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Code2,
  Globe,
  Users,
  Award,
  MapPin,
  Star,
  ChevronRight,
  Menu,
  X,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react"

const languages = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      portfolio: "Portfolio",
      testimonials: "Testimonials",
      contact: "Contact",
    },
    hero: {
      title: "Elite Software Development Outsourcing",
      subtitle: "Transform your ideas into powerful software solutions with our world-class development team",
      description:
        "Professional full-stack engineers specializing in JavaScript, TypeScript, Python, Java, .NET and more. Delivering exceptional software projects from Vancouver to Asia.",
      cta: "Start Your Project",
      learnMore: "Learn More",
    },
    services: {
      title: "Our Expertise",
      subtitle: "Comprehensive software development services tailored to your needs",
    },
    about: {
      title: "About BestIT Consulting",
      description:
        "With headquarters in Vancouver, Canada and strategic presence in East Asia, we bridge global talent with local expertise to deliver world-class software solutions.",
    },
    portfolio: {
      title: "Featured Projects",
      subtitle: "Showcasing our proven track record of successful software deliveries",
    },
    testimonials: {
      title: "Client Success Stories",
      subtitle: "What our clients say about working with us",
    },
    contact: {
      title: "Ready to Start Your Project?",
      subtitle: "Get in touch with our team today",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      about: "À propos",
      portfolio: "Portfolio",
      testimonials: "Témoignages",
      contact: "Contact",
    },
    hero: {
      title: "Externalisation de Développement Logiciel d'Élite",
      subtitle:
        "Transformez vos idées en solutions logicielles puissantes avec notre équipe de développement de classe mondiale",
      description:
        "Ingénieurs full-stack professionnels spécialisés en JavaScript, TypeScript, Python, Java, .NET et plus. Livrant des projets logiciels exceptionnels de Vancouver à l'Asie.",
      cta: "Démarrer Votre Projet",
      learnMore: "En Savoir Plus",
    },
    services: {
      title: "Notre Expertise",
      subtitle: "Services de développement logiciel complets adaptés à vos besoins",
    },
    about: {
      title: "À propos de BestIT Consulting",
      description:
        "Avec notre siège social à Vancouver, Canada et une présence stratégique en Asie de l'Est, nous relions les talents mondiaux à l'expertise locale pour livrer des solutions logicielles de classe mondiale.",
    },
    portfolio: {
      title: "Projets en Vedette",
      subtitle: "Démonstration de notre historique prouvé de livraisons logicielles réussies",
    },
    testimonials: {
      title: "Histoires de Succès Clients",
      subtitle: "Ce que nos clients disent de travailler avec nous",
    },
    contact: {
      title: "Prêt à Démarrer Votre Projet?",
      subtitle: "Contactez notre équipe aujourd'hui",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      about: "Acerca de",
      portfolio: "Portafolio",
      testimonials: "Testimonios",
      contact: "Contacto",
    },
    hero: {
      title: "Externalización de Desarrollo de Software de Élite",
      subtitle:
        "Transforma tus ideas en soluciones de software poderosas con nuestro equipo de desarrollo de clase mundial",
      description:
        "Ingenieros full-stack profesionales especializados en JavaScript, TypeScript, Python, Java, .NET y más. Entregando proyectos de software excepcionales desde Vancouver hasta Asia.",
      cta: "Iniciar Tu Proyecto",
      learnMore: "Saber Más",
    },
    services: {
      title: "Nuestra Experiencia",
      subtitle: "Servicios integrales de desarrollo de software adaptados a tus necesidades",
    },
    about: {
      title: "Acerca de BestIT Consulting",
      description:
        "Con sede en Vancouver, Canadá y presencia estratégica en Asia Oriental, conectamos el talento global con la experiencia local para entregar soluciones de software de clase mundial.",
    },
    portfolio: {
      title: "Proyectos Destacados",
      subtitle: "Mostrando nuestro historial comprobado de entregas de software exitosas",
    },
    testimonials: {
      title: "Historias de Éxito de Clientes",
      subtitle: "Lo que nuestros clientes dicen sobre trabajar con nosotros",
    },
    contact: {
      title: "¿Listo para Iniciar Tu Proyecto?",
      subtitle: "Ponte en contacto con nuestro equipo hoy",
    },
  },
  cn: {
    nav: {
      home: "首页",
      services: "服务",
      about: "关于我们",
      portfolio: "项目案例",
      testimonials: "客户评价",
      contact: "联系我们",
    },
    hero: {
      title: "精英软件开发外包服务",
      subtitle: "与我们世界级的开发团队一起，将您的想法转化为强大的软件解决方案",
      description:
        "专业的全栈工程师，专精于JavaScript、TypeScript、Python、Java、.NET等技术。从温哥华到亚洲，交付卓越的软件项目。",
      cta: "开始您的项目",
      learnMore: "了解更多",
    },
    services: {
      title: "我们的专业技能",
      subtitle: "为您量身定制的全面软件开发服务",
    },
    about: {
      title: "关于BestIT咨询公司",
      description:
        "总部位于加拿大温哥华，在东亚设有战略分支机构，我们将全球人才与本地专业知识相结合，提供世界级的软件解决方案。",
    },
    portfolio: {
      title: "精选项目",
      subtitle: "展示我们成功交付软件项目的卓越记录",
    },
    testimonials: {
      title: "客户成功案例",
      subtitle: "客户对与我们合作的评价",
    },
    contact: {
      title: "准备开始您的项目了吗？",
      subtitle: "立即联系我们的团队",
    },
  },
}

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState<keyof typeof languages>("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = languages[currentLang]

  const services = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Full-Stack Development",
      description: "End-to-end web and mobile application development using modern technologies",
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "Python", "Java"],
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Cloud Solutions",
      description: "Scalable cloud architecture and deployment on AWS, Azure, and Google Cloud",
      technologies: ["AWS", "Azure", "Docker", "Kubernetes", "Microservices"],
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Augmentation",
      description: "Dedicated development teams to scale your existing projects",
      technologies: ["Agile", "Scrum", "DevOps", "CI/CD", "Quality Assurance"],
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Enterprise Solutions",
      description: "Large-scale enterprise applications with .NET, Java, and modern frameworks",
      technologies: [".NET Core", "Spring Boot", "Angular", "Vue.js", "PostgreSQL"],
    },
  ]

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-featured e-commerce solution with payment integration and inventory management",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      category: "Web Application",
    },
    {
      title: "Healthcare Management System",
      description: "HIPAA-compliant patient management system with real-time analytics",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      category: "Enterprise Software",
    },
    {
      title: "Financial Trading Platform",
      description: "Real-time trading platform with advanced charting and risk management",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Java", "Spring Boot", "Redis", "WebSocket"],
      category: "Fintech",
    },
    {
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["React Native", "Python", "FastAPI", "PostgreSQL"],
      category: "Mobile Application",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechStart Inc.",
      content:
        "BestIT Consulting delivered our MVP in record time. Their team's expertise in React and Node.js was exactly what we needed.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "Product Manager, Global Finance Corp",
      content:
        "The quality of code and attention to detail exceeded our expectations. They truly understand enterprise-level requirements.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emma Rodriguez",
      role: "Founder, HealthTech Solutions",
      content:
        "Working with BestIT was seamless. Their Vancouver and Asia teams provided 24/7 coverage for our critical project.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">BestIT</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {Object.entries(t.nav).map(([key, value]) => (
                  <a
                    key={key}
                    href={`#${key}`}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {value}
                  </a>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div className="hidden md:flex items-center space-x-2">
              {Object.keys(languages).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang as keyof typeof languages)}
                  className={`px-2 py-1 text-xs rounded ${
                    currentLang === lang ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 hover:text-blue-600">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {Object.entries(t.nav).map(([key, value]) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {value}
                </a>
              ))}
              <div className="flex space-x-2 px-3 py-2">
                {Object.keys(languages).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang as keyof typeof languages)
                      setMobileMenuOpen(false)
                    }}
                    className={`px-2 py-1 text-xs rounded ${
                      currentLang === lang ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">{t.hero.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{t.hero.subtitle}</p>
              <p className="text-lg text-gray-500 mb-8">{t.hero.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  {t.hero.cta}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  {t.hero.learnMore}
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Software Development Team"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.services.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.services.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-blue-600 mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t.about.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{t.about.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">Vancouver, Canada</h3>
                    <p className="text-gray-600">Headquarters</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Globe className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">East Asia</h3>
                    <p className="text-gray-600">Regional Office</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">150+</div>
                  <div className="text-gray-600">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">50+</div>
                  <div className="text-gray-600">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <div className="text-gray-600">Support Coverage</div>
                </div>
              </div>
            </div>
            <div>
              <img src="/placeholder.svg?height=400&width=500" alt="Global Team" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.portfolio.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.portfolio.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.testimonials.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.testimonials.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contact.title}</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">{t.contact.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 mr-4" />
                  <span>contact@bestitconsulting.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 mr-4" />
                  <span>+1 (604) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 mr-4" />
                  <span>Vancouver, BC, Canada</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    <Github className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <Card className="bg-white text-gray-900">
                <CardHeader>
                  <CardTitle>Start Your Project</CardTitle>
                  <CardDescription>Tell us about your project requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Web Application</option>
                      <option>Mobile App</option>
                      <option>Enterprise Software</option>
                      <option>Team Augmentation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">BestIT</h3>
              <p className="text-gray-400">Elite software development outsourcing from Vancouver to Asia.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Full-Stack Development</li>
                <li>Cloud Solutions</li>
                <li>Team Augmentation</li>
                <li>Enterprise Solutions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Technologies</h4>
              <ul className="space-y-2 text-gray-400">
                <li>JavaScript & TypeScript</li>
                <li>Python & Java</li>
                <li>.NET & Spring Boot</li>
                <li>React & Next.js</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Vancouver, BC, Canada</li>
                <li>contact@bestitconsulting.com</li>
                <li>+1 (604) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BestIT Consulting Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
