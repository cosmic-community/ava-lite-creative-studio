import { cosmic, hasStatus } from '@/lib/cosmic'
import { Service, TeamMember, Testimonial, CaseStudy } from '@/types'
import ServiceCard from '@/components/ServiceCard'
import TeamMemberCard from '@/components/TeamMemberCard'
import TestimonialCard from '@/components/TestimonialCard'
import CaseStudyCard from '@/components/CaseStudyCard'
import Link from 'next/link'

async function getFeaturedServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'services',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Service[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as TeamMember[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'testimonials',
        'metadata.featured_homepage': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Testimonial[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

async function getLatestCaseStudy(): Promise<CaseStudy | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'case-studies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const caseStudies = response.objects as CaseStudy[]
    
    if (caseStudies.length === 0) {
      return null
    }
    
    // Sort by project_date (newest first)
    const sorted = caseStudies.sort((a, b) => {
      const dateA = new Date(a.metadata?.project_date || '').getTime()
      const dateB = new Date(b.metadata?.project_date || '').getTime()
      return dateB - dateA
    })
    
    return sorted[0] || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function HomePage() {
  const [services, teamMembers, testimonials, latestCaseStudy] = await Promise.all([
    getFeaturedServices(),
    getTeamMembers(),
    getFeaturedTestimonials(),
    getLatestCaseStudy(),
  ])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">
              Documenting Africa's Creative Generation
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600">
              AVA Lite is a digital-first creative platform built to empower artists across Botswana, Africa, and the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="btn btn-primary">
                Our Services
              </Link>
              <Link href="/first-light" className="btn btn-secondary">
                FIRST LIGHT Exhibition
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About AVA Lite Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">🌍 About AVA Lite</h2>
            <div className="space-y-6 text-lg text-gray-700">
              <p>
                AVA Lite is a digital-first creative platform built to empower artists across Botswana, Africa, and the world.
                We provide a home where artistic stories can shine — connecting local talent with global audiences through digital experiences, exhibitions, and community-driven initiatives.
              </p>
              <p>
                We believe creativity is an economy.
                And artists deserve a platform designed to elevate their work, celebrate their individuality, and unlock real opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Mission */}
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Mission</h3>
              <p className="text-gray-700">
                To empower creatives through exposure, innovation, and collaboration — bridging the gap between digital and physical art spaces and giving artists the visibility, support, and tools needed to thrive.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center">
              <div className="text-4xl mb-4">👁</div>
              <h3 className="text-2xl font-bold mb-4">Vision</h3>
              <p className="text-gray-700">
                To build Africa's leading digital creative empire — a globally recognized ecosystem where artists can showcase, monetize, and grow their creative careers from anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join AVA Lite Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">💛 Why Join AVA Lite?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <span className="text-accent text-xl">→</span>
                <div>
                  <h4 className="font-bold mb-1">Visibility & Reach</h4>
                  <p className="text-gray-600">Your art goes beyond borders</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-accent text-xl">→</span>
                <div>
                  <h4 className="font-bold mb-1">Digital & Physical Opportunities</h4>
                  <p className="text-gray-600">Exhibit locally and globally</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-accent text-xl">→</span>
                <div>
                  <h4 className="font-bold mb-1">Professional Growth</h4>
                  <p className="text-gray-600">Tools, promotion, analytics & exposure</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-accent text-xl">→</span>
                <div>
                  <h4 className="font-bold mb-1">A Powerful Creative Network</h4>
                  <p className="text-gray-600">Film, fashion, music, photography & more</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:col-span-2">
                <span className="text-accent text-xl">→</span>
                <div>
                  <h4 className="font-bold mb-1">Authentic Support</h4>
                  <p className="text-gray-600">We champion your growth, not just your work</p>
                </div>
              </div>
            </div>
            <p className="text-center mt-8 text-lg font-medium text-gray-800">
              When you join AVA Lite, you join a movement — a community shaping the future of African creativity.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      {services.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional creative services tailored for African artists, brands, and organizations
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/services" className="btn btn-primary">
                View All Services
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Case Study */}
      {latestCaseStudy && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="mb-4">Featured Project</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our latest work showcasing African creativity and storytelling
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <CaseStudyCard caseStudy={latestCaseStudy} featured />
            </div>
            <div className="text-center mt-12">
              <Link href="/case-studies" className="btn btn-primary">
                View All Projects
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="mb-4">Meet The Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The creatives behind AVA Lite's mission
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/team" className="btn btn-primary">
                View Full Team
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="mb-4">What Creatives Say</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Feedback from artists and creatives we've worked with
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-accent text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-white">Ready to Work Together?</h2>
            <p className="text-xl mb-8 text-white opacity-90">
              Whether you're an artist looking to get featured or a brand seeking creative direction, 
              we're here to help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://instagram.com/avalite2025" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn bg-white text-accent hover:bg-gray-100"
              >
                DM us on Instagram
              </a>
              <Link href="/services" className="btn bg-black text-white hover:bg-gray-900">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}