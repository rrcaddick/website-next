'use client'

import { useState } from 'react'
import Image from 'next/image'

type GalleryImage = {
  src: string
  alt: string
  fullSize: string
}

export default function MobileImageModal({ images }: { images: GalleryImage[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const handlePrevImage = () => {
    setSelectedImage((prev) => {
      if (prev === null) return 0
      return prev === 0 ? images.length - 1 : prev - 1
    })
  }

  const handleNextImage = () => {
    setSelectedImage((prev) => {
      if (prev === null) return 0
      return prev === images.length - 1 ? 0 : prev + 1
    })
  }

  return (
    <>
      {/* Mobile Gallery - 2 images per row */}
      <div className="grid grid-cols-2 gap-2 sm:hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] cursor-pointer"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 640px) 50vw"
            />
          </div>
        ))}
      </div>

      {/* Mobile Image Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center sm:hidden"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75"
              onClick={(e) => { e.stopPropagation(); handlePrevImage() }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={images[selectedImage].fullSize}
                alt={images[selectedImage].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75"
              onClick={(e) => { e.stopPropagation(); handleNextImage() }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-xs opacity-50">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
