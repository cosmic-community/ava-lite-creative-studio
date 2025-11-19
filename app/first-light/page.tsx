'use client'

import { useState } from 'react'

interface ExhibitionTier {
  id: string
  name: string
  price: number
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

const exhibitionTiers: ExhibitionTier[] = [
  {
    id: 'digital_tier_1',
    name: 'Digital Exhibition - Tier 1',
    price: 150,
    description: 'Perfect for new creators',
    features: [
      '1 artwork uploaded to AVA Lite Digital Gallery',
      'Artist profile featured online',
      'Exhibition marketing included'
    ]
  },
  {
    id: 'digital_tier_2',
    name: 'Digital Exhibition - Tier 2',
    price: 250,
    description: 'Enhanced digital presence',
    features: [
      'Up to 3 artworks uploaded',
      'Social media feature (1 post)',
      'Artist profile enhancements + exhibition promo'
    ]
  },
  {
    id: 'physical_standard',
    name: 'Physical Exhibition - Standard',
    price: 300,
    description: 'Best for small artworks',
    features: [
      '1 physical artwork displayed at venue',
      'Included in event promo',
      'Online gallery preview'
    ]
  },
  {
    id: 'physical_premium',
    name: 'Physical Exhibition - Premium',
    price: 500,
    description: 'Priority placement',
    features: [
      'Up to 2 physical artworks displayed',
      'Priority wall placement',
      'Social media feature + online gallery profile'
    ]
  },
  {
    id: 'combo',
    name: 'Digital + Physical Combo',
    price: 650,
    description: 'Best of both worlds',
    features: [
      '1 physical artwork + 2 digital uploads',
      'Social media feature',
      'Priority listing in exhibition catalog'
    ]
  }
]

const addOns: AddOn[] = [
  {
    id: 'essence_magazine',
    name: 'Essence Magazine Feature',
    price: 80,
    category: 'Content & Promotion',
    description: 'Artist write-up or interview featured in magazine edition'
  },
  {
    id: 'promo_video',
    name: 'Promo Video (30 sec)',
    price: 100,
    category: 'Content & Promotion',
    description: 'Short video highlighting the artist for social media'
  },
  {
    id: 'artist_profile',
    name: 'Artist Profile Listing',
    price: 50,
    category: 'Content & Promotion',
    description: 'Permanent profile on AVA Lite website with links and bio'
  },
  {
    id: 'extra_social_post',
    name: 'Extra Social Media Post',
    price: 30,
    category: 'Content & Promotion',
    description: 'Additional social media feature on AVA Lite platforms'
  },
  {
    id: 'priority_placement',
    name: 'Priority Placement (Physical Event)',
    price: 40,
    category: 'Content & Promotion',
    description: 'Your work displayed at prime location during physical exhibition'
  },
  {
    id: 'vendor_table',
    name: 'Vendor Table (Physical)',
    price: 40,
    category: 'Event Engagement',
    description: 'Table or space to sell prints, merch, or creations during event'
  },
  {
    id: 'team_shirts',
    name: 'AVA Lite Tees / Matching Team Shirts',
    price: 80,
    category: 'Event Engagement',
    description: 'Matching tees for teams or groups, worn during event'
  },
  {
    id: 'live_painting',
    name: 'Live Painting / Art Creation Booth',
    price: 150,
    category: 'Event Engagement',
    description: 'Artist paints or creates live during exhibition'
  },
  {
    id: 'workshop_slot',
    name: 'Workshop / Demo Slot',
    price: 120,
    category: 'Event Engagement',
    description: '15–20 min slot for mini-demo or live interactive session'
  },
  {
    id: 'merch_combo',
    name: 'Merch Combo Pack',
    price: 150,
    category: 'Event Engagement',
    description: 'Includes AVA Lite tote bag, stickers, and small print'
  },
  {
    id: 'team_spotlight',
    name: 'Team Feature Spotlight',
    price: 100,
    category: 'Event Engagement',
    description: 'Special highlight for teams/groups during event'
  },
  {
    id: 'art_photography',
    name: 'Professional Art Photography',
    price: 200,
    category: 'Photography & Media',
    description: 'Professional photography of your artwork (per artwork)'
  },
  {
    id: 'artist_photoshoot',
    name: 'Artist Portrait Photoshoot',
    price: 350,
    category: 'Photography & Media',
    description: 'Professional portrait session for artist profile'
  },
  {
    id: 'group_promo',
    name: 'Group Promo Shot',
    price: 200,
    category: 'Photography & Media',
    description: 'Group promotional photography for teams'
  },
  {
    id: 'photo_pack',
    name: 'Event Photo Pack Download',
    price: 100,
    category: 'Photography & Media',
    description: 'Digital download of event photos'
  },
  {
    id: 'business_cards',
    name: 'Artist Business Card Design',
    price: 120,
    category: 'Photography & Media',
    description: 'Professional business card design and printing'
  },
  {
    id: 'gift_pack',
    name: 'First-Light Gift Pack',
    price: 180,
    category: 'Photography & Media',
    description: 'Includes pins, stickers, and exclusive merchandise'
  },
  {
    id: 'installation_service',
    name: 'Artwork Installation & Handling Service',
    price: 100,
    category: 'Photography & Media',
    description: 'Professional installation and handling of your artwork'
  },
  {
    id: 'delivery_service',
    name: 'Post-Show Artwork Delivery Service',
    price: 250,
    category: 'Photography & Media',
    description: 'Local delivery service after the exhibition (if local)'
  }
]

export default function FirstLightPage() {
  const [formData, setFormData] = useState({
    artistName: '',
    email: '',
    phone: '',
    selectedTier: '',
    selectedAddOns: [] as string[],
    paymentProof: null as File | null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const selectedTierData = exhibitionTiers.find(tier => tier.id === formData.selectedTier)
  const selectedAddOnsData = addOns.filter(addon => formData.selectedAddOns.includes(addon.id))
  
  const totalAmount = (selectedTierData?.price || 0) + 
    selectedAddOnsData.reduce((sum, addon) => sum + addon.price, 0)

  const handleTierChange = (tierId: string) => {
    setFormData(prev => ({ ...prev, selectedTier: tierId }))
  }

  const handleAddOnToggle = (addonId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedAddOns: prev.selectedAddOns.includes(addonId)
        ? prev.selectedAddOns.filter(id => id !== addonId)
        : [...prev.selectedAddOns, addonId]
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, paymentProof: e.target.files![0] }))
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
          selectedTier: '',
          selectedAddOns: [],
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
    acc[addon.category].push(addon)
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
                If you're ready to take the next step in your creative journey:
              </p>
              <p className="text-lg">
                📩 DM us on our listed socials to receive the official exhibition tiers, pricing, and payment instructions.
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
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-bold text-xl mb-2">Digital + Physical</h3>
                <p className="text-gray-600">
                  This is the payment page for the AVA Lite Digital + Physical Exhibition
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="font-bold text-xl mb-2">Choose Your Tier</h3>
                <p className="text-gray-600">
                  Exhibitors must select a tier based on their exhibition type
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-3">✓</div>
                <h3 className="font-bold text-xl mb-2">Confirm Participation</h3>
                <p className="text-gray-600">
                  Payments confirm your participation in FIRST LIGHT
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibition Tiers */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">Exhibition Tiers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {exhibitionTiers.map((tier) => (
              <div
                key={tier.id}
                className={`card cursor-pointer transition-all duration-300 ${
                  formData.selectedTier === tier.id 
                    ? 'ring-4 ring-accent shadow-2xl' 
                    : 'hover:shadow-xl'
                }`}
                onClick={() => handleTierChange(tier.id)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{tier.name}</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">P{tier.price}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  
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

      {/* Add-Ons */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">Add-Ons (Optional)</h2>
          
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

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Selected Exhibition Tier *
                  </label>
                  <div className="p-4 bg-gray-100 rounded-lg">
                    {selectedTierData ? (
                      <div>
                        <div className="font-bold text-lg">{selectedTierData.name}</div>
                        <div className="text-accent font-bold text-xl">P{selectedTierData.price}</div>
                      </div>
                    ) : (
                      <div className="text-gray-500">Please select a tier above</div>
                    )}
                  </div>
                </div>

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
                  disabled={isSubmitting || !formData.selectedTier || !formData.paymentProof}
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