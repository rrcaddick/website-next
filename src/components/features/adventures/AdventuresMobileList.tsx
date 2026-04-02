'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { activities } from './data'

export default function AdventuresMobileList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (openIndex !== null && cardRefs.current[openIndex]) {
      const offset = 56
      const top = cardRefs.current[openIndex]!.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [openIndex])

  return (
    <div className="block sm:hidden">
      {activities.map((activity, idx) => (
        <div
          key={activity.id}
          ref={(el) => { cardRefs.current[idx] = el }}
          className={
            `${openIndex === idx
              ? 'mt-4 mb-4 rounded-xl shadow-lg border overflow-hidden bg-white text-[#202635]'
              : 'w-screen max-w-none -mx-4 border-b-0 border-l-0 border-r-0 border-t last:border-b rounded-none shadow-none bg-gradient-to-b from-white via-white to-[#E5E7EB] text-[#202635]'}`
          }
          style={openIndex === idx ? {} : { borderRadius: 0 }}
        >
          <button
            className="w-full flex flex-col items-center text-left focus:outline-none text-[#202635]"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            <div className="py-5 w-full text-center">{activity.name}</div>
          </button>
          {openIndex === idx && (
            <div>
              <div className="w-full aspect-square overflow-hidden rounded-t-xl rounded-b-xl">
                <Image
                  src={activity.mobileImage}
                  alt={activity.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full block sm:hidden"
                />
                <Image
                  src={activity.image}
                  alt={activity.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full hidden sm:block"
                />
              </div>
              <div className="px-4 pb-4 pt-2">
                <p className="mb-4 text-center text-[#202635] text-sm mt-4">{activity.description}</p>
                <div className="flex justify-center mb-4">
                  <Link
                    href={`/adventures/${activity.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                    className="inline-block mb-3 px-6 py-2 rounded-full bg-[#0E7D73] text-[#C9DD94] font-semibold text-sm text-center shadow hover:bg-[#073F3A] hover:text-[#00FF7F] transition-colors"
                  >
                    View
                  </Link>
                </div>
                <ul className="pl-0 space-y-1.5 text-center text-xs text-[#202635]" style={{ listStyleType: 'none' }}>
                  {activity.features.map((feature, index) => (
                    <li key={`${activity.id}-feature-${index}`}>{feature}</li>
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
