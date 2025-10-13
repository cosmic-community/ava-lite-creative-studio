import { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-secondary rounded-lg p-6">
      <div className="mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      
      {testimonial.metadata?.quote && (
        <p className="text-gray-300 text-lg mb-4 italic">
          "{testimonial.metadata.quote}"
        </p>
      )}
      
      <div className="border-t border-gray-600 pt-4">
        {testimonial.metadata?.author_name && (
          <p className="text-white font-semibold">
            {testimonial.metadata.author_name}
          </p>
        )}
        
        {testimonial.metadata?.author_title && (
          <p className="text-gray-400 text-sm">
            {testimonial.metadata.author_title}
          </p>
        )}
        
        {testimonial.metadata?.location && (
          <p className="text-gray-400 text-sm">
            {testimonial.metadata.location}
          </p>
        )}
      </div>
    </div>
  )
}