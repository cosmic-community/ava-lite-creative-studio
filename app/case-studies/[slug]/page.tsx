// app/case-studies/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { CaseStudy } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'case-studies', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as CaseStudy
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    }
  }

  return {
    title: `${caseStudy.metadata?.project_name || caseStudy.title} - AVA Lite`,
    description: caseStudy.metadata?.challenge || 'View this case study from AVA Lite',
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)

  if (!caseStudy) {
    notFound()
  }

  const featuredImage = caseStudy.metadata?.featured_image
  const gallery = caseStudy.metadata?.project_gallery || []

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/case-studies" className="text-primary hover:text-secondary transition-colors">
            ← Back to Case Studies
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4">{caseStudy.metadata?.project_name || caseStudy.title}</h1>
          {caseStudy.metadata?.client_context && (
            <p className="text-xl text-gray-600">{caseStudy.metadata.client_context}</p>
          )}
          {caseStudy.metadata?.project_date && (
            <p className="text-gray-500 mt-2">
              {new Date(caseStudy.metadata.project_date).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </p>
          )}
        </div>

        {/* Featured Image */}
        {featuredImage && (
          <div className="mb-12 rounded-lg overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={caseStudy.metadata?.project_name || caseStudy.title}
              width="1200"
              height="600"
              className="w-full"
            />
          </div>
        )}

        {/* Overview */}
        {caseStudy.metadata?.overview && (
          <section className="mb-12 max-w-4xl">
            <h2 className="mb-4">Overview</h2>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: caseStudy.metadata.overview }}
            />
          </section>
        )}

        {/* Challenge, Solution, Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {caseStudy.metadata?.challenge && (
            <div className="bg-accent rounded-lg p-6">
              <h3 className="mb-4">Challenge</h3>
              <p className="text-gray-700">{caseStudy.metadata.challenge}</p>
            </div>
          )}

          {caseStudy.metadata?.solution && (
            <div className="bg-accent rounded-lg p-6">
              <h3 className="mb-4">Solution</h3>
              <p className="text-gray-700">{caseStudy.metadata.solution}</p>
            </div>
          )}

          {caseStudy.metadata?.results && (
            <div className="bg-accent rounded-lg p-6">
              <h3 className="mb-4">Results</h3>
              <p className="text-gray-700">{caseStudy.metadata.results}</p>
            </div>
          )}
        </div>

        {/* Project Gallery */}
        {gallery.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <img
                    src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                    alt={`Gallery image ${index + 1}`}
                    width="400"
                    height="300"
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h3 className="mb-4 text-white">Want to Work With Us?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get in touch to discuss your creative project
          </p>
          <a 
            href="https://instagram.com/avalite2025" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary bg-white text-primary hover:bg-gray-100"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}