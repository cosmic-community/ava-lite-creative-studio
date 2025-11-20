'use client'

import { useState } from 'react'

interface ExhibitionTier {
  id: string
  name: string
  price: number
  duration?: string
  description: string
  features: string[]
}

interface AddOn {
  id: string
  name: string
  price: number
  category: string
  description: string
}

interface Package {
  id: string
  name: string
  price: number
  description: string
  includes: string[]
}

// Video Showcase Tiers
const videoShowcaseTiers: ExhibitionTier[] = [
  {
    id: 'video_micro',
    name: 'Micro',
    price: 100,
    duration: '5 min',
    description: 'Perfect for quick showcases',
    features: [
      'Digital gallery display',
      'Social media feature',
      'Loop at physical exhibition'
    ]
  },
  {
    id: 'video_standard',
    name: 'Standard',
    price: 200,
    duration: '10–15 min',
    description: 'Enhanced digital presence',
    features: [
      'Digital gallery',
      'Social media',
      'Loop at physical exhibition',
      'Website archive'
    ]
  },
  {
    id: 'video_extended',
    name: 'Extended',
    price: 350,
    duration: '20–25 min',
    description: 'Extended showcase with artist feature',
    features: [
      'Digital gallery',
      'Social media',
      'Loop at physical exhibition',
      'Website archive',
      'Mini artist feature'
    ]
  },
  {
    id: 'video_full',
    name: 'Full Showcase',
    price: 550,
    duration: '30–40 min',
    description: 'Complete showcase experience',
    features: [
      'Digital gallery',
      'Social media',
      'Loop at physical exhibition',
      'Mini interview clip',
      'Priority placement',
      'Optional Essence Magazine mini-feature'
    ]
  }
]

// Physical Exhibition Tiers
const physicalExhibitionTiers: ExhibitionTier[] = [
  {
    id: 'physical_small',
    name: 'Small Piece / Individual Art',
    price: 100,
    description: 'Perfect for individual artworks',
    features: [
      'Display space at physical exhibition',
      'Mention in event program'
    ]
  },
  {
    id: 'physical_medium',
    name: 'Medium Piece / Group Display',
    price: 200,
    description: 'Larger display area',
    features: [
      'Larger display area',
      'Mention in event promotions'
    ]
  },
  {
    id: 'physical_large',
    name: 'Large Installation / Group Exhibit',
    price: 350,
    description: 'Ample space for installations',
    features: [
      'Ample display space',
      'Prominent placement',
      'Inclusion in marketing'
    ]
  }
]

const addOns: AddOn[] = [
  {
    id: 'essence_magazine',
    name: 'Essence Magazine Feature',
    price: 80,
    category: 'Content & Promotion',
    description: 'Artist write-up / interview'
  },
  {
    id: 'promo_video',
    name: 'Promo Video (30 sec)',
    price: 100,
    category: 'Content & Promotion',
    description: 'Highlight artist/team for socials & gallery'
  },
  {
    id: 'artist_profile',
    name: 'Artist Profile Listing',
    price: 50,
    category: 'Content & Promotion',
    description: 'Permanent profile on AVA Lite website'
  },
  {
    id: 'extra_social_post',
    name: 'Extra Social Media Post',
    price: 30,
    category: 'Content & Promotion',
    description: 'Additional social media feature'
  },
  {
    id: 'interview_clip',
    name: 'Interview Clip (Digital)',
    price: 50,
    category: 'Content & Promotion',
    description: '30–60 sec clip played during digital display'
  },
  {
    id: 'priority_placement',
    name: 'Priority Placement (Physical Event)',
    price: 40,
    category: 'Content & Promotion',
    description: 'Prime location during physical exhibition'
  },
  {
    id: 'vendor_table',
    name: 'Vendor Table (Physical)',
    price: 40,
    category: 'Event Engagement',
    description: 'Sell prints / merch on-site'
  },
  {
    id: 'team_shirts',
    name: 'AVA Lite Tees / Matching Team Shirts',
    price: 80,
    category: 'Event Engagement',
    description: 'Branded tees for team or group (per set)'
  },
  {
    id: 'live_painting',
    name: 'Live Painting / Art Creation Booth',
    price: 150,
    category: 'Event Engagement',
    description: 'Create and sell live during physical exhibition'
  },
  {
    id: 'workshop_slot',
    name: 'Workshop / Demo Slot',
    price: 120,
    category: 'Event Engagement',
    description: '15–20 min slot for interactive demo or talk'
  },
  {
    id: 'team_spotlight',
    name: 'Team Feature Spotlight',
    price: 100,
    category: 'Event Engagement',
    description: 'Featured in digital gallery + social media intro'
  }
]

const suggestedPackages: Package[] = [
  {
    id: 'team_combo',
    name: 'Team Combo',
    price: 880,
    description: 'Complete team experience',
    includes: [
      'Full Showcase',
      'Matching Tees',
      'Team Feature Spotlight',
      'Live Painting'
    ]
  },
  {
    id: 'solo_artist',
    name: 'Solo Artist Combo',
    price: 360,
    description: 'Perfect for individual artists',
    includes: [
      'Standard Display',
      'Promo Video',
      'Priority Placement'
    ]
  },
  {
    id: 'extended_combo',
    name: 'Extended Combo',
    price: 450,
    description: 'Extended showcase package',
    includes: [
      'Extended Display',
      'Interview Clip',
      'Priority Placement'
    ]
  }
]

export default function FirstLightPage() {
  const [formData, setFormData] = useState({
    artistName: '',
    email: '',
    phone: '',
    selectedVideoTier: '',
    selectedPhysicalTier: '',
    selectedAddOns: [] as string[],
    selectedPackage: '',
    paymentProof: null as File | null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const selectedVideoTierData = videoShowcaseTiers.find(tier => tier.id === formData.selectedVideoTier)
  const selectedPhysicalTierData = physicalExhibitionTiers.find(tier => tier.id === formData.selectedPhysicalTier)
  const selectedAddOnsData = addOns.filter(addon => formData.selectedAddOns.includes(addon.id))
  const selectedPackageData = suggestedPackages.find(pkg => pkg.id === formData.selectedPackage)
  
  const totalAmount = 
    (selectedVideoTierData?.price || 0) + 
    (selectedPhysicalTierData?.price || 0) +
    selectedAddOnsData.reduce((sum, addon) => sum + addon.price, 0) +
    (selectedPackageData?.price || 0)

  const handleVideoTierChange = (tierId: string) => {
    setFormData(prev => ({ ...prev, selectedVideoTier: tierId }))
  }

  const handlePhysicalTierChange = (tierId: string) => {
    setFormData(prev => ({ ...prev, selectedPhysicalTier: tierId }))
  }

  const handleAddOnToggle = (addonId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedAddOns: prev.selectedAddOns.includes(addonId)
        ? prev.selectedAddOns.filter(id => id !== addonId)
        : [...prev.selectedAddOns, addonId]
    }))
  }

  const handlePackageSelect = (packageId: string) => {
    setFormData(prev => ({ 
      ...prev, 
      selectedPackage: prev.selectedPackage === packageId ? '' : packageId 
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, paymentProof: e.target.files![0] || null }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission (in production, this would upload to Cosmic CMS)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          artistName: '',
          email: '',
          phone: '',
          selectedVideoTier: '',
          selectedPhysicalTier: '',
          selectedAddOns: [],
          selectedPackage: '',
          paymentProof: null
        })
        setSubmitSuccess(false)
      }, 3000)
    }, 2000)
  }

  // Group add-ons by category
  const addOnsByCategory = addOns.reduce((acc, addon) => {
    if (!acc[addon.category]) {
      acc[addon.category] = []
    }
    const categoryArray = acc[addon.category]
    if (categoryArray) {
      categoryArray.push(addon)
    }
    return acc
  }, {} as Record<string, AddOn[]>)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-accent text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              ✨ FIRST LIGHT Exhibition
            </h1>
            <p className="text-xl md:text-2xl mb-6 font-semibold">
              A Celebration of Rising Creativity
            </p>
            <div className="text-lg opacity-95 space-y-4 mb-8">
              <p>
                FIRST LIGHT marks a powerful beginning — a celebration of rising creativity and the spark of a global movement rooted in Botswana.
              </p>
              <p>
                This January in Maun, AVA Lite presents our first Digital + Physical exhibition — giving artists the opportunity to shine in both worlds and reach audiences near and far.
              </p>
              <p className="font-medium text-xl mt-6">
                Choose from our Video Showcase tiers, Physical Exhibition options, or combine them for maximum impact.
              </p>
              <p className="text-lg">
                📩 Scroll down to view pricing and reserve your spot today.
              </p>
              <p className="font-semibold text-xl mt-4">
                Your spotlight begins the moment you reach out.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a 
                href="https://instagram.com/avalite2025" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn bg-white text-accent hover:bg-gray-100 text-lg px-8 py-4"
              >
                Contact Us on Instagram
              </a>
            </div>
            <p className="text-2xl font-bold mt-8 tracking-wide">
              Be the light that leads the way.<br />
              Step into FIRST LIGHT.
            </p>
          </div>
        </div>
      </section>

      {/* Exhibition Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Exhibition Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-3">🎬</div>
                <h3 className="font-bold text-xl mb-2">Video Showcase</h3>
                <p className="text-gray-600">
                  Digital gallery display with social media features and physical exhibition loops
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-bold text-xl mb-2">Physical Exhibition</h3>
                <p className="text-gray-600">
                  Display your artwork at our physical venue with professional setup
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-3">✨</div>
                <h3 className="font-bold text-xl mb-2">Add-Ons & Combos</h3>
                <p className="text-gray-600">
                  Enhance your experience with promotional services and package deals
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Tiers */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">Video Showcase Tiers</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Digital gallery display with social media features and loops at physical exhibition
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {videoShowcaseTiers.map((tier) => (
              <div
                key={tier.id}
                className={`card cursor-pointer transition-all duration-300 ${
                  formData.selectedVideoTier === tier.id 
                    ? 'ring-4 ring-accent shadow-2xl' 
                    : 'hover:shadow-xl'
                }`}
                onClick={() => handleVideoTierChange(tier.id)}
              >
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                    {tier.duration && (
                      <p className="text-sm text-gray-500">{tier.duration}</p>
                    )}
                  </div>
                  
                  <div className="text-2xl font-bold text-accent mb-3">P{tier.price}</div>
                  
                  <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                  
                  <ul className="space-y-2">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-accent mr-2">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physical Exhibition Tiers */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">Physical Exhibition – Artworks</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Display your physical artwork at our venue with professional setup and promotion
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {physicalExhibitionTiers.map((tier) => (
              <div
                key={tier.id}
                className={`card cursor-pointer transition-all duration-300 ${
                  formData.selectedPhysicalTier === tier.id 
                    ? 'ring-4 ring-accent shadow-2xl' 
                    : 'hover:shadow-xl'
                }`}
                onClick={() => handlePhysicalTierChange(tier.id)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{tier.name}</h3>
                  
                  <div className="text-2xl font-bold text-accent mb-3">P{tier.price}</div>
                  
                  <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                  
                  <ul className="space-y-2">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-accent mr-2">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggested Packages */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">Suggested Combos</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Save with our pre-packaged combinations designed for different needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {suggestedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`card cursor-pointer transition-all duration-300 ${
                  formData.selectedPackage === pkg.id 
                    ? 'ring-4 ring-accent shadow-2xl' 
                    : 'hover:shadow-xl'
                }`}
                onClick={() => handlePackageSelect(pkg.id)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{pkg.name}</h3>
                  
                  <div className="text-3xl font-bold text-accent mb-3">P{pkg.price}</div>
                  
                  <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                  
                  <div className="mb-4">
                    <p className="font-semibold text-sm mb-2">Includes:</p>
                    <ul className="space-y-1">
                      {pkg.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">Add-Ons (Optional)</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Enhance your exhibition experience with these additional services
          </p>
          
          {Object.entries(addOnsByCategory).map(([category, categoryAddOns]) => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-accent">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryAddOns.map((addon) => (
                  <div
                    key={addon.id}
                    className={`card cursor-pointer transition-all duration-300 ${
                      formData.selectedAddOns.includes(addon.id)
                        ? 'ring-2 ring-accent'
                        : ''
                    }`}
                    onClick={() => handleAddOnToggle(addon.id)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg">{addon.name}</h4>
                        <div className="text-accent font-bold">P{addon.price}</div>
                      </div>
                      <p className="text-sm text-gray-600">{addon.description}</p>
                      
                      <div className="mt-4">
                        <input
                          type="checkbox"
                          checked={formData.selectedAddOns.includes(addon.id)}
                          onChange={() => handleAddOnToggle(addon.id)}
                          className="w-4 h-4 text-accent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Form */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Confirm Your Participation</h2>
            
            {/* Payment Instructions */}
            <div className="card mb-8 p-6 bg-accent text-white">
              <h3 className="text-xl font-bold mb-4">Payment Methods</h3>
              <div className="space-y-3">
                <div>
                  <strong>📱 Mobile Money:</strong>
                  <p>Smega: 73215307</p>
                  <p>Orange Money: 74833988</p>
                </div>
                <div>
                  <strong>🏦 Bank Transfer:</strong>
                  <p>Bank Name: Access Bank</p>
                  <p>Account Name: Thobo Mwachisenge</p>
                  <p>Account Number: 4067049700700</p>
                </div>
              </div>
              <p className="mt-4 text-sm opacity-90">
                Make payment using one of the methods above, then upload your payment proof below.
              </p>
            </div>

            {submitSuccess ? (
              <div className="card p-8 text-center bg-green-50 border-2 border-green-500">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  Thank you for confirming your spot at FIRST LIGHT!
                </h3>
                <p className="text-gray-700">
                  We will contact you shortly with next steps.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Artist Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.artistName}
                    onChange={(e) => setFormData(prev => ({ ...prev, artistName: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="+267 7XXXXXXX"
                  />
                </div>

                {/* Selected Items Summary */}
                <div className="space-y-4">
                  {selectedVideoTierData && (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Selected Video Showcase
                      </label>
                      <div className="p-4 bg-gray-100 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-bold">{selectedVideoTierData.name}</div>
                            {selectedVideoTierData.duration && (
                              <div className="text-sm text-gray-500">{selectedVideoTierData.duration}</div>
                            )}
                          </div>
                          <div className="text-accent font-bold">P{selectedVideoTierData.price}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPhysicalTierData && (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Selected Physical Exhibition
                      </label>
                      <div className="p-4 bg-gray-100 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="font-bold">{selectedPhysicalTierData.name}</div>
                          <div className="text-accent font-bold">P{selectedPhysicalTierData.price}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPackageData && (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Selected Package
                      </label>
                      <div className="p-4 bg-gray-100 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="font-bold">{selectedPackageData.name}</div>
                          <div className="text-accent font-bold">P{selectedPackageData.price}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedAddOnsData.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Selected Add-Ons
                      </label>
                      <div className="p-4 bg-gray-100 rounded-lg space-y-2">
                        {selectedAddOnsData.map(addon => (
                          <div key={addon.id} className="flex justify-between">
                            <span>{addon.name}</span>
                            <span className="font-bold">P{addon.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Total Amount
                  </label>
                  <div className="p-4 bg-accent text-white rounded-lg text-center">
                    <div className="text-3xl font-bold">P{totalAmount}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Payment Proof *
                  </label>
                  <input
                    type="file"
                    required
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Upload a screenshot or receipt of your payment
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || totalAmount === 0 || !formData.paymentProof}
                  className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Participation'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}