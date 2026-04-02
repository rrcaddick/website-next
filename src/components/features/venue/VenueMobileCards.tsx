'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

type EventType = {
  title: string
  description: string
  features: string[]
  image: string
  imageMobile?: string
}

export default function VenueMobileCards({ eventTypes }: { eventTypes: EventType[] }) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (expandedCard !== null && cardRefs.current[expandedCard]) {
      const offset = 56
      const top = cardRefs.current[expandedCard]!.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [expandedCard])

  return (
    <div className="block sm:hidden w-full max-w-full px-0">
      {eventTypes.map((event, idx) => (
        <div
          key={idx}
          ref={(el) => { cardRefs.current[idx] = el }}
          className={
            `${expandedCard === idx
              ? 'mt-4 mb-4 rounded-xl shadow-lg border overflow-hidden bg-white text-[#202635] mx-4'
              : 'w-full max-w-full border-b-0 border-l-0 border-r-0 border-t last:border-b rounded-none shadow-none bg-gradient-to-b from-white via-white to-[#E5E7EB] text-[#202635]'}`
          }
          style={expandedCard === idx ? {} : { borderRadius: 0 }}
        >
          <button
            className="w-full flex flex-col items-center text-left focus:outline-none text-[#202635]"
            onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
            aria-expanded={expandedCard === idx}
          >
            <div className="py-5 w-full text-center">{event.title}</div>
          </button>
          {expandedCard === idx && (
            <div>
              <div className="w-full aspect-square overflow-hidden rounded-t-xl rounded-b-xl">
                <Image
                  src={event.imageMobile || event.image}
                  alt={event.title}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="px-4 pb-4 pt-2">
                <p className="mb-4 text-center text-[#202635] text-sm mt-4">{event.description}</p>
                <ul className="space-y-1 text-gray-600 text-left flex-1">
                  {event.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm">
                      <svg className="h-4 w-4 text-[#073F3A] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-900">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
