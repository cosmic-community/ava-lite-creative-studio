import { cosmic, hasStatus } from '@/lib/cosmic'
import { CaseStudy } from '@/types'
import CaseStudyCard from '@/components/CaseStudyCard'

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'case-studies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const caseStudies = response.objects as CaseStudy[]
    
    // Sort by project_date (newest first)
    return caseStudies.sort((a, b) => {
      const dateA = new Date(a.metadata?.project_date || '').getTime()
      const dateB = new Date(b.metadata?.project_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export const metadata = {
  title: 'Case Studies - AVA Lite',
  description: 'Explore our creative projects and case studies',
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="mb-6">Our Work</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our creative projects showcasing African storytelling and visual culture
          </p>
        </div>

        {caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No case studies available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}