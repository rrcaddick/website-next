"use client";
import Image from 'next/image'
import Link from 'next/link'
import MouseGradientCard from '@/components/theme/MouseGradientCard'
import BookNowButton from '@/components/ui/BookNowButton'
import LogoSection from '@/components/ui/LogoSection'
import { useState, useRef, useEffect } from 'react'

const roomTypes = [
  {
    id: 1,
    name: 'Camping',
    description: 'Bring your own tent and enjoy our beautiful campsite with access to shared facilities.',
    image: '/images/accommodation/camping-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/camping-card.webp',
    features: ['Shared bathroom facilities', 'Kitchen access', 'Sunny or shaded camping grounds']
  },
  {
    id: 2,
    name: 'Safari Tent',
    description: 'Experience glamping in our comfortable safari tent, perfect for those who want to be close to nature.',
    image: '/images/accommodation/safari-tent-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/safari-tent-card.webp',
    features: ['Double bed', 'Shared bathroom facilities', 'Electricity']
  },
  {
    id: 3,
    name: 'Gypsy Caravan',
    description: 'Stay in our unique and charming gypsy caravan for a truly magical experience.',
    image: '/images/accommodation/gypsy-caravan-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/gypsy-caravan-card.webp',
    features: ['Double bed + two sleeper couches', 'Secluded privacy', 'Electricity']
  },
  {
    id: 4,
    name: 'Mixed Dorm',
    description: 'Comfortable bunk beds in our mixed dormitory, perfect for solo travelers and backpackers.',
    image: '/images/accommodation/mixed-dorm-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/mixed-dorm-card.webp',
    features: ['Bunk beds', 'Shared bathroom facilities', 'Towels available']
  },
  {
    id: 5,
    name: 'Twin Room',
    description: 'Cozy room with two single beds, ideal for friends traveling together.',
    image: '/images/accommodation/twin-room-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/twin-room-card.webp',
    features: ['Two single beds', 'Shared bathroom facilities', 'Fresh linen']
  },
  {
    id: 6,
    name: 'Family Room',
    description: 'Spacious room perfect for families, featuring multiple beds and shared facilities.',
    image: '/images/accommodation/family-room-card.webp',
    features: ['Double bed + bunk bed', 'Shared bathroom facilities', 'Family friendly']
  },
  {
    id: 7,
    name: 'Five Sleeper',
    description: 'Large room that comfortably accommodates up to five people, perfect for groups or families.',
    image: '/images/accommodation/five-sleeper-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/five-sleeper-card.webp',
    features: ['Double bed + bunk bed + single bed', 'Shared bathroom facilities', 'Spacious layout']
  },
  {
    id: 8,
    name: 'Double En-suite',
    description: 'Private room with a queen size bed and en-suite bathroom for added comfort.',
    image: '/images/accommodation/double-ensuite-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/double-en-suite-card.webp',
    features: ['Queen bed', 'Private bathroom', 'Extra comfort']
  },
  {
    id: 9,
    name: 'Family En-suite Rondawel',
    description: 'Traditional round African house with modern amenities, perfect for families seeking a unique stay.',
    image: '/images/accommodation/family-en-suite-rondawel-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/family-en-suite-rondawel-card.webp',
    features: ['Queen bed + bunk bed', 'Private bathroom', 'Secluded privacy']
  }
]

export default function Accommodation() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const handleImageError = (imagePath: string) => {
    setImageError(prev => ({ ...prev, [imagePath]: true }));
  };

  return (
    <div>
      {/* Hero Banner */}
      {/* Mobile Banner */}
      <div className="relative w-full aspect-[9/5] mb-12 bg-gray-900 block md:hidden">
        <Image
          src="/images/home/mobile/accommodation-banner.webp"
          alt="Fairy Knowe Accommodation Mobile Banner"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
          onError={() => handleImageError('mobile-banner')}
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-4 drop-shadow-[0_0_8px_rgba(0,0,0,1)] hestrial-font px-4 text-center">
            Accommodation
          </h1>
        </div>
      </div>
      {/* Desktop Banner */}
      <div className="relative h-[300px] lg:h-[500px] w-full mb-12 bg-gray-900 hidden md:block">
        <Image
          src="/images/accommodation/banner.webp"
          alt="Fairy Knowe Accommodation"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
          onError={() => handleImageError('desktop-banner')}
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[0_0_8px_rgba(0,0,0,1)] hestrial-font px-4 text-center">
            Accommodation
          </h1>
        </div>
      </div>

      {/* Description */}
      <div className="px-2">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            Nestled in the heart of Wilderness, our enchanting backpackers offers a magical retreat with room for every wandering soul. 
            With cozy beds for up to 50 guests and a sprawling campsite that welcomes twice as many adventurers, 
            we've created a space where lifelong friendships and unforgettable memories are made.
          </p>

          {/* Book Now Button */}
          <div className="mt-6">
            <BookNowButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Mobile Expandable List */}
        <div className="block sm:hidden">
          {roomTypes.map((room, idx) => {
            const cardRef = useRef<HTMLDivElement>(null);

            useEffect(() => {
              if (openIndex === idx && cardRef.current) {
                const offset = 56; // px, adjust as needed
                const top = cardRef.current.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }, [openIndex]);

            return (
              <div
                key={room.id}
                ref={cardRef}
                className={
                  `${openIndex === idx
                    ? `${idx === roomTypes.length - 1 ? 'mt-4 mb-2' : 'mt-4 mb-4'} rounded-xl shadow-lg border overflow-hidden bg-white text-[#202635]`
                    : 'w-screen max-w-none -mx-4 border-b-0 border-l-0 border-r-0 border-t last:border-b rounded-none shadow-none bg-gradient-to-b from-white via-white to-[#E5E7EB] text-[#202635]'}
                  `
                }
                style={openIndex === idx ? {} : { borderRadius: 0 }}
              >
                <button
                  className={`w-full flex flex-col items-center text-left focus:outline-none text-[#202635]`}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  aria-expanded={openIndex === idx}
                >
                  <div className="py-5 w-full text-center">{room.name}</div>
                </button>
                {openIndex === idx && (
                  <div>
                    <div className="w-full aspect-square overflow-hidden rounded-t-xl rounded-b-xl">
                      <Image
                        src={room.image}
                        alt={room.name}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="px-4 pb-4 pt-2">
                      <p className="mb-4 text-center text-[#202635] text-sm mt-4">{room.description}</p>
                      <div className="flex justify-center mb-4">
                        <Link
                          href={`/accommodation/${room.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="inline-block mb-3 px-6 py-2 rounded-full bg-[#0E7D73] text-[#C9DD94] font-semibold text-sm text-center shadow hover:bg-[#073F3A] hover:text-[#00FF7F] transition-colors"
                        >
                          View
                        </Link>
                      </div>
                      <ul className="pl-0 space-y-1.5 text-center text-xs text-[#202635]" style={{ listStyleType: 'none' }}>
                        {room.features.map((feature, index) => (
                          <li key={`${room.id}-feature-${index}`}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomTypes.map((room) => (
            <Link 
              key={room.id} 
              href={`/accommodation/${room.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group"
            >
              <MouseGradientCard className="bg-[#F3F4F6] text-[#202635] rounded-lg shadow-lg overflow-hidden flex flex-col h-full transition-all duration-500 ease-in-out transform hover:scale-105">
                <div className="relative w-full h-[250px]">
                  {!imageError[room.image] ? (
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover w-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={room.id <= 3}
                      loading={room.id <= 3 ? 'eager' : 'lazy'}
                      quality={85}
                      onError={() => handleImageError(room.image)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Image not available</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div>
                    <h2 className="text-2xl font-bold mb-3 text-[#202635] group-hover:text-[#00FF7F] transition-colors duration-500 ease-in-out">{room.name}</h2>
                    <p className="text-gray-600 mb-6 min-h-[3rem] group-hover:text-white transition-colors duration-500 ease-in-out">{room.description}</p>
                  </div>
                  <div className="mt-auto">
                    <h3 className="font-semibold mb-3 text-[#202635] group-hover:text-[#00FF7F] transition-colors duration-500 ease-in-out">Features:</h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600 group-hover:text-white transition-colors duration-500 ease-in-out">
                      {room.features.map((feature, index) => (
                        <li key={`${room.id}-feature-${index}`}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MouseGradientCard>
            </Link>
          ))}
        </div>
      </div>

      {/* Logo Section */}
      <div className="max-w-7xl mx-auto px-4">
        <LogoSection />
      </div>
    </div>
  )
} 