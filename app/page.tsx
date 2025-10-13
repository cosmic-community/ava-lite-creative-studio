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
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                AVA Lite connects emerging African creatives to the world through editorial features, 
                professional services, and authentic storytelling.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services" className="btn btn-primary"> {/* Changed: Orange button */}
                  Our Services
                </Link>
                <Link href="/case-studies" className="btn btn-secondary"> {/* Changed: Dark button */}
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </section>

      {/* Featured Services */}
      {services.length > 0 && (
          <section className="section-padding bg-secondary"> {/* Changed: Dark background */}
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="mb-4">Our Services</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto"> {/* Changed: Gray text */}
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
          <section className="section-padding bg-black"> {/* Changed: Black background */}
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="mb-4">Featured Project</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto"> {/* Changed: Gray text */}
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
          <section className="section-padding bg-secondary"> {/* Changed: Dark background */}
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="mb-4">Meet The Team</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto"> {/* Changed: Gray text */}
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
          <section className="section-padding bg-primary text-primary-foreground">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="mb-4 text-white">What Creatives Say</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
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
        <section className="section-padding bg-secondary"> {/* Changed: Dark background */}
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-6">Ready to Work Together?</h2>
              <p className="text-xl text-gray-400 mb-8"> {/* Changed: Gray text */}
                Whether you're an artist looking to get featured or a brand seeking creative direction, 
                we're here to help bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://instagram.com/avalite2025" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  DM us on Instagram
                </a>
                <Link href="/services" className="btn btn-secondary">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}