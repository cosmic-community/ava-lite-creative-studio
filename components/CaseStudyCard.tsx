import { CaseStudy } from '@/types'
import Link from 'next/link'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  featured?: boolean
}

export default function CaseStudyCard({ caseStudy, featured = false }: CaseStudyCardProps) {
  const featuredImage = caseStudy.metadata?.featured_image

  return (
    <Link href={`/case-studies/${caseStudy.slug}`} className="block">
      <div className={`card ${featured ? 'lg:flex lg:flex-row' : ''}`}>
        {featuredImage && (
          <div className={`overflow-hidden ${featured ? 'lg:w-1/2' : 'aspect-video'}`}>
            <img
              src={`${featuredImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={caseStudy.metadata?.project_name || caseStudy.title}
              width="400"
              height="300"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className={`p-6 ${featured ? 'lg:w-1/2 lg:flex lg:flex-col lg:justify-center' : ''}`}>
            {caseStudy.metadata?.client_context && (
              <p className="text-sm text-accent font-medium mb-2"> {/* Changed: Orange accent color */}
                {caseStudy.metadata.client_context}
              </p>
            )}
          
          <h3 className={`font-bold mb-3 ${featured ? 'text-3xl' : 'text-2xl'}`}>
            {caseStudy.metadata?.project_name || caseStudy.title}
          </h3>
          
            {caseStudy.metadata?.overview && (
              <div 
                className="prose prose-sm text-gray-400 mb-4 line-clamp-3" {/* Changed: Gray text */}
                dangerouslySetInnerHTML={{ __html: caseStudy.metadata.overview }}
              />
            )}
          
            {caseStudy.metadata?.project_date && (
              <p className="text-sm text-gray-500">
                {new Date(caseStudy.metadata.project_date).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            )}
          
            <div className="mt-4">
              <span className="text-accent font-medium hover:text-orange-600 transition-colors"> {/* Changed: Orange accent */}
                View Case Study →
              </span>
            </div>
        </div>
      </div>
    </Link>
  )
}