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
            <p className="text-sm text-primary font-medium mb-2">
              {caseStudy.metadata.client_context}
            </p>
          )}
          
          <h3 className={`font-bold mb-3 ${featured ? 'text-3xl' : 'text-2xl'}`}>
            {caseStudy.metadata?.project_name || caseStudy.title}
          </h3>
          
          {caseStudy.metadata?.overview && (
            <div 
              className="prose prose-sm text-gray-700 mb-4 line-clamp-3"
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
            <span className="text-primary font-medium hover:text-secondary transition-colors">
              View Case Study →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}