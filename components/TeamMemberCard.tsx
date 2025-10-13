import { TeamMember } from '@/types'

interface TeamMemberCardProps {
  member: TeamMember
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const photo = member.metadata?.photo

  return (
    <div className="card">
      {photo && (
        <div className="aspect-square overflow-hidden">
          <img
            src={`${photo.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={member.metadata?.full_name || member.title}
            width="400"
            height="400"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-1">
          {member.metadata?.full_name || member.title}
        </h3>
        
        {member.metadata?.role && (
          <p className="text-primary font-medium mb-3">{member.metadata.role}</p>
        )}
        
        {member.metadata?.bio && (
          <div 
            className="prose prose-sm text-gray-700 mb-4"
            dangerouslySetInnerHTML={{ __html: member.metadata.bio }}
          />
        )}
        
        {member.metadata?.instagram_handle && (
          <a 
            href={`https://instagram.com/${member.metadata.instagram_handle.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary transition-colors text-sm"
          >
            {member.metadata.instagram_handle}
          </a>
        )}
      </div>
    </div>
  )
}