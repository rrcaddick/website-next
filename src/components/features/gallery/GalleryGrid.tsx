'use client'

import Image from 'next/image'
import { GalleryImage } from './types'

type Props = {
  images: GalleryImage[]
  imageLoadErrors: Set<string>
  onImageClick: (image: GalleryImage, index: number) => void
  onImageError: (src: string) => void
}

export default function GalleryGrid({ images, imageLoadErrors, onImageClick, onImageError }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => {
        if (imageLoadErrors.has(image.src)) return null
        return (
          <div
            key={`${image.category}-${image.src}`}
            className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => onImageClick(image, index)}
          >
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              priority={index < 8}
              onError={() => onImageError(image.src)}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-2 py-1 bg-[#0E7D73]/80 rounded-lg text-sm">
                  {image.subcategory || image.category}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
