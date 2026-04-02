'use client'

import { useState, useEffect } from 'react'
import GalleryFilters from './GalleryFilters'
import GalleryGrid from './GalleryGrid'
import GalleryModal from './GalleryModal'
import { GalleryImage, Category, CATEGORIES } from './types'

function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function getBalancedImages(images: GalleryImage[]): GalleryImage[] {
  const groupMap = new Map<string, GalleryImage[]>()
  images.forEach(img => {
    const key = `${img.category}|||${img.subcategory}`
    if (!groupMap.has(key)) groupMap.set(key, [])
    groupMap.get(key)!.push(img)
  })
  const groupKeys = shuffle(Array.from(groupMap.keys()))
  const groupArrays = groupKeys.map(key => shuffle(groupMap.get(key)!))
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

export default function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All')
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1)
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set())

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/gallery')
        if (!response.ok) throw new Error('Failed to fetch images')
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

  useEffect(() => {
    setSelectedSubcategory('All')
  }, [selectedCategory])

  const filteredImages = images.filter(img => {
    if (selectedCategory === 'All') return true
    if (img.category !== selectedCategory) return false
    if (selectedSubcategory === 'All') return true
    return img.subcategory === selectedSubcategory
  })

  const imagesToDisplay =
    selectedCategory === 'All' && selectedSubcategory === 'All'
      ? getBalancedImages(images)
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return
      switch (e.key) {
        case 'ArrowLeft': handlePreviousImage(); break
        case 'ArrowRight': handleNextImage(); break
        case 'Escape': setSelectedImage(null); break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, selectedImageIndex])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0E7D73]" />
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

        <GalleryFilters
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          images={images}
          onSelectCategory={setSelectedCategory}
          onSelectSubcategory={setSelectedSubcategory}
        />

        <GalleryGrid
          images={imagesToDisplay}
          imageLoadErrors={imageLoadErrors}
          onImageClick={handleImageClick}
          onImageError={handleImageError}
        />

        {imagesToDisplay.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No images found in this category.</p>
          </div>
        )}

        <GalleryModal
          image={selectedImage}
          currentIndex={selectedImageIndex}
          totalImages={imagesToDisplay.length}
          onClose={() => setSelectedImage(null)}
          onNext={handleNextImage}
          onPrevious={handlePreviousImage}
        />
      </div>
    </div>
  )
}
