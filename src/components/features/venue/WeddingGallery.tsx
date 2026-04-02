'use client'

import { useState } from 'react'
import Image from 'next/image'

type WeddingImage = {
  src: string
  alt: string
  fullSize: string
}

const weddingImages: WeddingImage[] = [
  { src: '/images/venue-hire/weddings/thumbnails/wedding1.webp', alt: 'Wedding at Fairy Knowe 1', fullSize: '/images/venue-hire/weddings/full/wedding1.webp' },
  { src: '/images/venue-hire/weddings/thumbnails/wedding2.webp', alt: 'Wedding at Fairy Knowe 2', fullSize: '/images/venue-hire/weddings/full/wedding2.webp' },
  { src: '/images/venue-hire/weddings/thumbnails/wedding3.webp', alt: 'Wedding at Fairy Knowe 3', fullSize: '/images/venue-hire/weddings/full/wedding3.webp' },
  { src: '/images/venue-hire/weddings/thumbnails/wedding4.webp', alt: 'Wedding at Fairy Knowe 4', fullSize: '/images/venue-hire/weddings/full/wedding4.webp' },
  { src: '/images/venue-hire/weddings/thumbnails/wedding5.webp', alt: 'Wedding at Fairy Knowe 5', fullSize: '/images/venue-hire/weddings/full/wedding5.webp' },
  { src: '/images/venue-hire/weddings/thumbnails/wedding6.webp', alt: 'Wedding at Fairy Knowe 6', fullSize: '/images/venue-hire/weddings/full/wedding6.webp' },
  { src: '/images/venue-hire/weddings/thumbnails/wedding7.webp', alt: 'Wedding at Fairy Knowe 7', fullSize: '/images/venue-hire/weddings/full/wedding7.webp' },
  { src: '/images/venue-hire/weddings/thumbnails/wedding8.webp', alt: 'Wedding at Fairy Knowe 8', fullSize: '/images/venue-hire/weddings/full/wedding8.webp' },
  { src: '/images/venue-hire/weddings/thumbnails/wedding9.webp', alt: 'Wedding at Fairy Knowe 9', fullSize: '/images/venue-hire/weddings/full/wedding9.webp' },
  { src: '/images/venue-hire/weddings/thumbnails/wedding10.webp', alt: 'Wedding at Fairy Knowe 10', fullSize: '/images/venue-hire/weddings/full/wedding10.webp' },
]

const imagesPerPage = 12

export default function WeddingGallery() {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedImage, setSelectedImage] = useState<WeddingImage | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1)

  const totalPages = Math.ceil(weddingImages.length / imagesPerPage)
  const currentImages = weddingImages.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage)

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages)
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)

  const openImage = (image: WeddingImage, index: number) => {
    setSelectedImage(image)
    setSelectedImageIndex(index)
  }

  const closeImage = () => {
    setSelectedImage(null)
    setSelectedImageIndex(-1)
  }

  const nextImage = () => {
    if (selectedImageIndex < weddingImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
      setSelectedImage(weddingImages[selectedImageIndex + 1])
    } else {
      setSelectedImageIndex(0)
      setSelectedImage(weddingImages[0])
    }
  }

  const prevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
      setSelectedImage(weddingImages[selectedImageIndex - 1])
    } else {
      setSelectedImageIndex(weddingImages.length - 1)
      setSelectedImage(weddingImages[weddingImages.length - 1])
    }
  }

  return (
    <div className="mt-16 mb-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Wedding Gallery
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
        {currentImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer group"
            onClick={() => openImage(image, currentPage * imagesPerPage + index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={prevPage}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeImage}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col">
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
            >
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative flex-1">
              <Image
                src={selectedImage.fullSize}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={prevImage}
                className="p-3 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
              >
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-white text-sm">
                {selectedImageIndex + 1} of {weddingImages.length}
              </span>
              <button
                onClick={nextImage}
                className="p-3 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
              >
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
