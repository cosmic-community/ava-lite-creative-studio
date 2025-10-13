import { Service } from '@/types'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const serviceImage = service.metadata?.service_image

  return (
    <div className="card">
      {serviceImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={`${serviceImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={service.metadata?.service_name || service.title}
            width="400"
            height="250"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3">
          {service.metadata?.service_name || service.title}
        </h3>
        
          {service.metadata?.description && (
            <div 
              className="prose prose-sm mb-4 text-gray-600" /* Changed: Medium gray text */
              dangerouslySetInnerHTML={{ __html: service.metadata.description }}
            />
          )}
        
          {service.metadata?.pricing_info && (
              <div className="mt-4 pt-4 border-t border-gray-200"> {/* Changed: Light border */}
                <p className="text-sm text-gray-500">{service.metadata.pricing_info}</p>
              </div>
          )}
      </div>
    </div>
  )
}