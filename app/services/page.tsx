import { cosmic, hasStatus } from '@/lib/cosmic'
import { Service } from '@/types'
import ServiceCard from '@/components/ServiceCard'

async function getServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'services' })
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

export const metadata = {
  title: 'Our Services - AVA Lite',
  description: 'Professional creative services for African artists, brands, and organizations',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional creative services tailored for African artists, brands, and organizations 
            connecting with youth culture
          </p>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services available at the moment.</p>
          </div>
        )}

        <div className="mt-16 bg-accent rounded-lg p-8 text-center">
          <h3 className="mb-4">Interested in Our Services?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact us to discuss your creative needs and get a custom quote for your project
          </p>
          <a 
            href="https://instagram.com/avalite2025" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}