import { cosmic, hasStatus } from '@/lib/cosmic'
import { TeamMember } from '@/types'
import TeamMemberCard from '@/components/TeamMemberCard'

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

export const metadata = {
  title: 'Our Team - AVA Lite',
  description: 'Meet the creative team behind AVA Lite',
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="mb-6">Meet Our Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The creative minds behind AVA Lite's mission to document and empower Africa's 
            creative generation
          </p>
        </div>

        {teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No team members available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}