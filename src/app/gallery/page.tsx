'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface GalleryImage {
  src: string
  alt: string
  category: string
  subcategory: string
  fullSize: string
}

type Category = 'All' | 'Accommodation' | 'Adventures' | 'Entertainment' | 'Venue Hire' | 'Facilities'

const categories: Category[] = ['All', 'Accommodation', 'Adventures', 'Entertainment', 'Venue Hire', 'Facilities']

// Helper to shuffle an array
function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All')
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1)
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set())

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return

      switch (e.key) {
        case 'ArrowLeft':
          handlePreviousImage()
          break
        case 'ArrowRight':
          handleNextImage()
          break
        case 'Escape':
          setSelectedImage(null)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, selectedImageIndex])

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/gallery')
        if (!response.ok) {
          throw new Error('Failed to fetch images')
        }
        const data = await response.json()
        setImages(data.images || [])
      } catch (error) {
        console.error('Error loading images:', error)
      } finally {
        setLoading(false)
      }
    }

    loadImages()
  }, [])

  // Reset subcategory when main category changes
  useEffect(() => {
    setSelectedSubcategory('All')
  }, [selectedCategory])

  // Balanced, shuffled round-robin for All view
  const getBalancedImages = () => {
    // Group images by category and subcategory
    const groupMap = new Map<string, GalleryImage[]>()
    images.forEach(img => {
      const key = `${img.category}|||${img.subcategory}`
      if (!groupMap.has(key)) groupMap.set(key, [])
      groupMap.get(key)!.push(img)
    })
    // Shuffle the groups and the images within each group
    const groupKeys = shuffle(Array.from(groupMap.keys()))
    const groupArrays = groupKeys.map(key => shuffle(groupMap.get(key)!))
    // Round-robin selection
    const result: GalleryImage[] = []
    let added = true
    while (added) {
      added = false
      for (let i = 0; i < groupArrays.length; i++) {
        if (groupArrays[i].length > 0) {
          result.push(groupArrays[i].shift()!)
          added = true
        }
      }
    }
    return result
  }

  // Filter images based on selected category and subcategory
  const filteredImages = images.filter(img => {
    if (selectedCategory === 'All') return true
    if (img.category !== selectedCategory) return false
    if (selectedSubcategory === 'All') return true
    return img.subcategory === selectedSubcategory
  })

  // Use balancedImages for All view, filteredImages otherwise
  const imagesToDisplay = selectedCategory === 'All' && selectedSubcategory === 'All'
    ? getBalancedImages()
    : filteredImages

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setSelectedImageIndex(index)
  }

  const handlePreviousImage = () => {
    if (selectedImageIndex > 0) {
      const newIndex = selectedImageIndex - 1
      setSelectedImageIndex(newIndex)
      setSelectedImage(imagesToDisplay[newIndex])
    }
  }

  const handleNextImage = () => {
    if (selectedImageIndex < imagesToDisplay.length - 1) {
      const newIndex = selectedImageIndex + 1
      setSelectedImageIndex(newIndex)
      setSelectedImage(imagesToDisplay[newIndex])
    }
  }

  const handleImageError = (src: string) => {
    setImageLoadErrors(prev => new Set(prev).add(src))
  }

  // Dynamically generate subcategories for the selected category
  const getSubcategories = () => {
    if (selectedCategory === 'All') return []
    const subcatSet = new Set<string>()
    images.forEach(img => {
      if (img.category === selectedCategory && img.subcategory) {
        subcatSet.add(img.subcategory)
      }
    })
    const subcatArr = Array.from(subcatSet).sort((a, b) => a.localeCompare(b))
    return ['All', ...subcatArr]
  }

  // Helper to format subcategory names
  const formatSubcategory = (name: string) =>
    name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0E7D73]"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
          Our Gallery
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Explore our collection of photos showcasing our accommodation, adventures, events, facilities, and venue. 
          Click on any image to view it in full size.
        </p>

        {/* Main Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {categories.map((category) => {
            const categoryCount = images.filter(img => img.category === category).length
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#0E7D73] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
                {category !== 'All' && categoryCount > 0 && (
                  <span className="ml-2 text-sm">({categoryCount})</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Subcategory Filter Buttons */}
        {selectedCategory !== 'All' && (
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {getSubcategories().map((subcategory) => {
              const count = subcategory === 'All'
                ? images.filter(img => img.category === selectedCategory).length
                : images.filter(img => 
                    img.category === selectedCategory && 
                    img.subcategory === subcategory
                  ).length
              if (count === 0 && subcategory !== 'All') return null
              return (
                <button
                  key={subcategory}
                  onClick={() => setSelectedSubcategory(subcategory)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    selectedSubcategory === subcategory
                      ? 'bg-[#0E7D73] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {formatSubcategory(subcategory)}
                  <span className="ml-1 text-xs">({count})</span>
                </button>
              )
            })}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagesToDisplay.map((image, index) => {
            const hasError = imageLoadErrors.has(image.src)
            if (hasError) return null

            return (
              <div
                key={`${image.category}-${image.src}`}
                className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => handleImageClick(image, index)}
              >
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  priority={index < 8}
                  onError={() => handleImageError(image.src)}
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

        {/* Empty State */}
        {imagesToDisplay.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {loading ? 'Loading images...' : 'No images found in this category.'}
            </p>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full max-w-6xl">
              {/* Navigation buttons */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#00FF7F] transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePreviousImage()
                }}
                disabled={selectedImageIndex === 0}
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#00FF7F] transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.stopPropagation()
                  handleNextImage()
                }}
                disabled={selectedImageIndex === imagesToDisplay.length - 1}
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-white hover:text-[#00FF7F] transition-colors z-10"
                onClick={() => setSelectedImage(null)}
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Main image */}
              <div className="relative h-[80vh]">
                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                <Image
                  src={selectedImage.fullSize}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                  quality={100}
                  onError={() => setSelectedImage(null)}
                />
              </div>

              {/* Image info */}
              <div className="text-white text-center mt-4">
                <p className="text-lg font-medium capitalize">{selectedImage.alt}</p>
                <p className="text-sm text-gray-300">
                  {selectedImage.subcategory 
                    ? `${selectedImage.category} - ${selectedImage.subcategory}`
                    : selectedImage.category}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {selectedImageIndex + 1} of {imagesToDisplay.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 