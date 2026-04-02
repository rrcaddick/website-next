'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MouseGradientCard from '@/components/theme/MouseGradientCard'
import { roomTypes } from './data'

export default function AccommodationDesktopGrid() {
  const [imageError, setImageError] = useState<Record<string, boolean>>({})

  const handleImageError = (imagePath: string) => {
    setImageError(prev => ({ ...prev, [imagePath]: true }))
  }

  return (
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
  )
}
