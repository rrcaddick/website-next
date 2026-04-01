'use client'

import { useState } from 'react'
import Link from 'next/link'

interface MobileMenuProps {
  accommodationLinks: Array<{ href: string; label: string }>
  adventureLinks: Array<{ href: string; label: string }>
}

export default function MobileMenu({ accommodationLinks, adventureLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<null | 'accommodation' | 'adventures'>(null)

  return (
    <>
      {/* Mobile menu button */}
      <div className="flex items-center space-x-4 sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
        >
          <span className="sr-only">Open main menu</span>
          {!isOpen ? (
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="min-h-screen pt-4 pb-6 space-y-2">
            {/* Close button */}
            <div className="flex justify-end mb-4 sticky top-0 bg-white z-10">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile menu items */}
            <div className="pb-8 text-center">
              {/* Home button styled like other main menu items */}
              <button
                className="w-screen max-w-none relative flex items-center text-gray-900 hover:text-[#073F3A] bg-gradient-to-b from-white via-white to-[#E5E7EB] border-gray-200 hover:border-[#073F3A] px-0 py-5 text-base font-normal shadow-md hover:bg-gray-200 transition-colors rounded-none"
                onClick={() => { setIsOpen(false); window.location.href = '/'; }}
                type="button"
              >
                <span className="w-full text-center">Home</span>
              </button>
              <div className="space-y-2">
                <button
                  className="w-screen max-w-none relative flex items-center text-gray-900 hover:text-[#073F3A] bg-gradient-to-b from-white via-white to-[#E5E7EB] border-gray-200 hover:border-[#073F3A] px-0 py-5 text-base font-normal shadow-md hover:bg-gray-200 transition-colors rounded-none"
                  onClick={() => { setIsOpen(false); window.location.href = '/accommodation'; }}
                  type="button"
                >
                  <span className="w-full text-center">Accommodation</span>
                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-lg cursor-pointer z-10"
                    onClick={e => { e.stopPropagation(); setOpenDropdown(openDropdown === 'accommodation' ? null : 'accommodation'); }}
                  >
                    {openDropdown === 'accommodation' ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                </button>
                {openDropdown === 'accommodation' && (
                  <div className="grid grid-cols-3 gap-2 mt-5 mb-5">
                    {accommodationLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex flex-col h-full items-center text-gray-600 hover:text-[#073F3A] bg-gradient-to-b from-gray-100 via-white to-gray-200 border border-gray-200 hover:border-[#073F3A] text-[10px] rounded-xl shadow-md hover:bg-gray-200 transition-colors text-center"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex-1 w-full overflow-hidden rounded-xl">
                          <img 
                            src={link.label === "Mixed Dorm" ? "/images/menu/mixed-dorm.webp" : 
                                 link.label === "Camping" ? "/images/menu/camping.webp" : 
                                 link.label === "Safari Tent" ? "/images/menu/safari-tent.webp" : 
                                 link.label === "Gypsy Caravan" ? "/images/menu/gypsy-caravan.webp" : 
                                 link.label === "Twin Room" ? "/images/menu/twin-room.webp" : 
                                 link.label === "Family Room" ? "/images/menu/family-room.webp" : 
                                 link.label === "Five Sleeper" ? "/images/menu/five-sleeper.webp" : 
                                 link.label === "Double En-suite" ? "/images/menu/double-en-suite.webp" : 
                                 link.label === "Family En-suite Rondawel" ? "/images/menu/family-en-suite-rondawel.webp" : 
                                 "/images/placeholder-square.png"} 
                            alt={link.label} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-full h-12 flex items-center justify-center">
                          <span className="font-medium px-2">{link.label}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  className="w-screen max-w-none relative flex items-center text-gray-900 hover:text-[#073F3A] bg-gradient-to-b from-white via-white to-[#E5E7EB] border-gray-200 hover:border-[#073F3A] px-0 py-5 text-base font-normal shadow-md hover:bg-gray-200 transition-colors rounded-none"
                  onClick={() => { setIsOpen(false); window.location.href = '/adventures'; }}
                  type="button"
                >
                  <span className="w-full text-center">Adventures</span>
                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-lg cursor-pointer z-10"
                    onClick={e => { e.stopPropagation(); setOpenDropdown(openDropdown === 'adventures' ? null : 'adventures'); }}
                  >
                    {openDropdown === 'adventures' ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                </button>
                {openDropdown === 'adventures' && (
                  <div className="grid grid-cols-3 gap-2 mt-5 mb-5">
                    {adventureLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex flex-col h-full items-center text-gray-600 hover:text-[#073F3A] bg-gradient-to-b from-gray-100 via-white to-gray-200 border border-gray-200 hover:border-[#073F3A] text-[10px] rounded-xl shadow-md hover:bg-gray-200 transition-colors text-center"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex-1 w-full overflow-hidden rounded-xl">
                          <img 
                            src={link.label === "Kayaking" ? "/images/menu/kayaking.webp" : 
                                 link.label === "Paragliding" ? "/images/menu/paragliding.webp" : 
                                 link.label === "Horseriding" ? "/images/menu/horseriding.webp" : 
                                 link.label === "Half Collared Kingfisher Trail" ? "/images/menu/half-collared-kingfisher-trail.webp" : 
                                 link.label === "Brown Hooded Kingfisher Trail" ? "/images/menu/brown-hooded-kingfisher-trail.webp" : 
                                 link.label === "Bosduif Trail" ? "/images/menu/bosduif-trail.webp" : 
                                 link.label === "Woodville Big Tree" ? "/images/menu/woodville-big-tree.webp" : 
                                 link.label === "Map of Africa" ? "/images/menu/map-of-africa.webp" : 
                                 link.label === "Wilderness Beach" ? "/images/menu/wilderness-beach.webp" : 
                                 link.label === "Water Under the Bridge" ? "/images/menu/water-under-the-bridge.webp" : 
                                 link.label === "Fairy Labyrinth" ? "/images/menu/fairy-labyrinth.webp" : 
                                 link.label === "Ancient Archives" ? "/images/menu/ancient-archives.webp" : 
                                 "/images/placeholder-square.png"} 
                            alt={link.label} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-full h-10 flex items-center justify-center">
                          <span className="font-medium px-2">{link.label}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 2-column grid for next 6 items */}
              <div className="flex flex-col w-full mb-4">
                <Link 
                  href="/entertainment" 
                  className="w-full text-gray-900 hover:text-[#073F3A] bg-gradient-to-b from-white via-white to-[#E5E7EB] border-b border-gray-200 hover:border-[#073F3A] px-0 py-5 text-base font-normal transition-colors text-center rounded-none"
                  onClick={() => setIsOpen(false)}
                >
                  Entertainment
                </Link>
                <Link 
                  href="/venue" 
                  className="w-full text-gray-900 hover:text-[#073F3A] bg-gradient-to-b from-white via-white to-[#E5E7EB] border-b border-gray-200 hover:border-[#073F3A] px-0 py-5 text-base font-normal transition-colors text-center rounded-none"
                  onClick={() => setIsOpen(false)}
                >
                  Venue Hire
                </Link>
                <Link 
                  href="/facilities" 
                  className="w-full text-gray-900 hover:text-[#073F3A] bg-gradient-to-b from-white via-white to-[#E5E7EB] border-b border-gray-200 hover:border-[#073F3A] px-0 py-5 text-base font-normal transition-colors text-center rounded-none"
                  onClick={() => setIsOpen(false)}
                >
                  Facilities
                </Link>
                <Link 
                  href="/fairy-folk-n-roll" 
                  className="w-full text-gray-900 hover:text-[#073F3A] bg-gradient-to-b from-white via-white to-[#E5E7EB] border-b border-gray-200 hover:border-[#073F3A] px-0 py-5 text-base font-normal transition-colors text-center rounded-none"
                  onClick={() => setIsOpen(false)}
                >
                  Fairy Folk 'n Roll
                </Link>
                <Link 
                  href="/gallery" 
                  className="w-full text-gray-900 hover:text-[#073F3A] bg-gradient-to-b from-white via-white to-[#E5E7EB] border-b border-gray-200 hover:border-[#073F3A] px-0 py-5 text-base font-normal transition-colors text-center rounded-none"
                  onClick={() => setIsOpen(false)}
                >
                  Gallery
                </Link>
                <Link 
                  href="/contact" 
                  className="w-full text-gray-900 hover:text-[#073F3A] bg-gradient-to-b from-white via-white to-[#E5E7EB] border-b border-gray-200 hover:border-[#073F3A] px-0 py-5 text-base font-normal transition-colors text-center rounded-none"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 