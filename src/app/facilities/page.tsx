'use client'

import Image from 'next/image'
import { useState } from 'react'
import PageHero from '@/components/ui/PageHero'

const facilityCategories = [
  {
    id: 1,
    title: 'Amenities & Services',
    image: '/images/facilities/pet-friendly.webp',
    facilities: [
      {
        name: 'Communal wi-fi',
        features: [
          'High-speed connection',
          'In communal areas',
          'Multiple devices',
          'Streaming capable',
          'Work spaces'
        ]
      },
      {
        name: 'Laundry services',
        features: [
          'Washing machines',
          'Dryers',
          'Iron available',
          'Washing powder',
          'Clothes lines',
          'Same-day service'
        ]
      },
      {
        name: 'Pet friendly',
        features: [
          'Dogs welcome',
          'Outdoor spaces for pets',
          'Pet-friendly accommodation options',
          'Please inform us in advance'
        ]
      },
      {
        name: 'Secure parking',
        features: [
          '24/7 security',
          'Well-lit area',
          'Camera surveillance',
          'Gated entrance',
          'Free for guests',
          'Large vehicle space'
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Entertainment & Recreation',
    image: '/images/facilities/jungle-gym.webp',
    facilities: [
      {
        name: 'Books & board games',
        features: [
          'Wide selection of books',
          'Board games collection',
          'Reading corner',
          'Social gaming area'
        ]
      },
      {
        name: 'Jungle gym',
        features: [
          'Safe equipment',
          'Shaded area',
          'Child-friendly',
          'Multiple activities',
          'Outdoor setting',
          'Parent seating nearby'
        ]
      },
      {
        name: 'Musical instruments',
        features: [
          'Guitars available',
          'Percussion instruments',
          'Open mic equipment',
          'Jam sessions welcome'
        ]
      },
      {
        name: 'Ping pong',
        features: [
          'Quality table',
          'Paddles provided',
          'Indoor space',
          'Evening lighting',
          'Social activity',
          'All skill levels'
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Food & Drink',
    image: '/images/facilities/restaurant-kitchen.webp',
    facilities: [
      {
        name: 'Lively bar',
        features: [
          'Local craft beers',
          'Wide selection of drinks',
          'Social atmosphere',
          'Evening entertainment',
          'Outdoor seating',
          'Sports viewing'
        ]
      },
      {
        name: 'Outdoor braai area',
        features: [
          'Multiple braai stations',
          'Outdoor seating',
          'Wood provided',
          'Utensils available',
          'Garden setting',
          'Evening lighting'
        ]
      },
      {
        name: 'Restaurant kitchen',
        features: [
          'Breakfast service',
          'Dinner options',
          'Fresh ingredients',
          'Affordable meals'
        ]
      },
      {
        name: 'Self-catering kitchen',
        features: [
          'Gas stoves and oven',
          'Refrigerators',
          'Cooking utensils',
          'Storage space',
          'Dining area',
          'Tea and coffee station'
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Social & Gathering Spaces',
    image: '/images/facilities/lively-bar.webp',
    mobileImage: '/images/facilities/restaurant-kitchen.webp',
    facilities: [
      {
        name: 'Communal fire pit',
        features: [
          'Nightly fires',
          'Seating area',
          'Social atmosphere',
          'Wood provided'
        ]
      },
      {
        name: 'Lively bar',
        features: [
          'Local craft beers',
          'Wide selection of drinks',
          'Social atmosphere',
          'Evening entertainment',
          'Outdoor seating',
          'Sports viewing'
        ]
      },
      {
        name: 'TV lounge',
        features: [
          'Large screen TV',
          'Comfortable seating',
          'Online streaming services',
          'Board games',
          'Reading corner'
        ]
      }
    ]
  }
]

export default function Facilities() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images/home/mobile/facilities-banner.webp"
        desktopSrc="/images/facilities/facilities-banner.webp"
        title="Facilities"
      />

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            Everything you need to keep clean, comfortable, connected, captivated, cozy, fed and feeling good during your stay in the enchanted realms of the wood.
          </p>
        </div>
      </div>
      {/* Facilities Categories - Mobile Only */}
      <div className="block sm:hidden w-full max-w-full px-0 mt-8">
        {facilityCategories.map((category, catIdx) => (
          <div key={category.id} className="mb-6">
            <h2 className="text-xl font-semibold text-[#202635] mb-2 text-center mx-4">{category.title}</h2>
            {category.facilities.map((facility, facIdx) => {
              const cardIdx = `${category.id}-${facIdx}`;
              return (
                <div
                  key={facility.name}
                  className={
                    `${expandedCard === cardIdx
                      ? 'mt-4 mb-4 rounded-xl shadow-lg border overflow-hidden bg-white text-[#202635] mx-4'
                      : 'w-full max-w-full border-b-0 border-l-0 border-r-0 border-t last:border-b rounded-none shadow-none bg-gradient-to-b from-white via-white to-[#E5E7EB] text-[#202635]'}
                  `
                  }
                  style={expandedCard === cardIdx ? {} : { borderRadius: 0 }}
                >
                  <button
                    className="w-full flex flex-col items-center text-left focus:outline-none text-[#202635]"
                    onClick={() => setExpandedCard(expandedCard === cardIdx ? null : cardIdx)}
                    aria-expanded={expandedCard === cardIdx}
                  >
                    <div className="py-5 w-full text-center">{facility.name}</div>
                  </button>
                  {expandedCard === cardIdx && (
                    <div>
                      <div className="px-4 pb-4 pt-2">
                        <ul className="space-y-1 text-gray-600 text-left flex-1">
                          {facility.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-sm">
                              <span className="mr-1">•</span>
                              <span className="text-gray-900">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {/* Desktop: original grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilityCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 flex flex-col h-full">
              <div className="relative w-full aspect-square">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-gray-900 min-h-[2.5rem] sm:min-h-[3rem]">{category.title}</h2>
                <ul className="space-y-1 sm:space-y-2 text-gray-600 text-center md:text-left flex-1">
                  {category.facilities.map((facility) => (
                    <li key={facility.name} className="flex items-start text-sm sm:text-base">
                      <span className="mr-1 sm:mr-2">•</span>
                      <span className="text-gray-900">{facility.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* General Information Section */}
      <div className="max-w-7xl mx-auto mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center mb-6">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* House Rules */}
          <div className="bg-white rounded-lg p-6 text-center md:text-right">
            <h3 className="text-xl font-semibold mb-4">House Rules</h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <div>Quiet hours: 10PM - 8AM</div>
              <div>Keep common areas clean</div>
              <div>Label and store food properly</div>
              <div>Respect other guests</div>
              <div>No smoking indoors</div>
            </div>
          </div>
          {/* Reception Hours */}
          <div className="bg-white rounded-lg p-6 text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Reception Hours</h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <div>Monday - Sunday: 8AM - 8PM</div>
              <div>Check-in: 2PM - 8PM</div>
              <div>Check-out: by 10AM</div>
              <div>After hours: Security on site</div>
              <div>Emergency contact available 24/7</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 