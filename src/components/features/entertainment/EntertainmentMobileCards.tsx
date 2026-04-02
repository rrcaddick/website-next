'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { events } from './data'

export default function EntertainmentMobileCards() {
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
      {events.map((event, idx) => (
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
                  src={event.mobileImage || event.image}
                  alt={event.title}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="px-4 pb-4 pt-2">
                <p className="mb-4 text-center text-[#202635] text-sm mt-4">{event.description}</p>
                {event.schedule && (() => {
                  const match = event.schedule.match(/^(.*?)(\d.*)$/)
                  if (match) {
                    return (
                      <>
                        <p className="text-primary font-semibold mb-0 text-center text-sm">{match[1].trim()}</p>
                        <p className="text-primary font-semibold mb-2 text-center text-sm">{match[2].trim()}</p>
                      </>
                    )
                  }
                  return <p className="text-primary font-semibold mb-2 text-center text-sm">{event.schedule}</p>
                })()}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
