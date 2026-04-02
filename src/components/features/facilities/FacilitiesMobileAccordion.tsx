'use client'

import { useState } from 'react'

type Facility = {
  name: string
  features: string[]
}

type FacilityCategory = {
  id: number
  title: string
  image: string
  mobileImage?: string
  facilities: Facility[]
}

export default function FacilitiesMobileAccordion({ facilityCategories }: { facilityCategories: FacilityCategory[] }) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  return (
    <div className="block sm:hidden w-full max-w-full px-0 mt-8">
      {facilityCategories.map((category) => (
        <div key={category.id} className="mb-6">
          <h2 className="text-xl font-semibold text-[#202635] mb-2 text-center mx-4">{category.title}</h2>
          {category.facilities.map((facility, facIdx) => {
            const cardIdx = `${category.id}-${facIdx}`
            return (
              <div
                key={facility.name}
                className={
                  `${expandedCard === cardIdx
                    ? 'mt-4 mb-4 rounded-xl shadow-lg border overflow-hidden bg-white text-[#202635] mx-4'
                    : 'w-full max-w-full border-b-0 border-l-0 border-r-0 border-t last:border-b rounded-none shadow-none bg-gradient-to-b from-white via-white to-[#E5E7EB] text-[#202635]'}`
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
            )
          })}
        </div>
      ))}
    </div>
  )
}
