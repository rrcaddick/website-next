'use client'

import Image from 'next/image'
import { GalleryImage } from './types'

type Props = {
  image: GalleryImage | null
  currentIndex: number
  totalImages: number
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export default function GalleryModal({ image, currentIndex, totalImages, onClose, onNext, onPrevious }: Props) {
  if (!image) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-6xl">
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#00FF7F] transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={(e) => { e.stopPropagation(); onPrevious() }}
          disabled={currentIndex === 0}
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#00FF7F] transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={(e) => { e.stopPropagation(); onNext() }}
          disabled={currentIndex === totalImages - 1}
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          className="absolute top-4 right-4 text-white hover:text-[#00FF7F] transition-colors z-10"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative h-[80vh]">
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
          <Image
            src={image.fullSize}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
            quality={100}
            onError={onClose}
          />
        </div>

        <div className="text-white text-center mt-4">
          <p className="text-lg font-medium capitalize">{image.alt}</p>
          <p className="text-sm text-gray-300">
            {image.subcategory ? `${image.category} - ${image.subcategory}` : image.category}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {currentIndex + 1} of {totalImages}
          </p>
        </div>
      </div>
    </div>
  )
}
