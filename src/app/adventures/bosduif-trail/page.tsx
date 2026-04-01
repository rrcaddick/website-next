'use client'

import { useState } from 'react'
import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import LogoSection from '@/components/ui/LogoSection'

// Define the gallery images
const galleryImages = [
  {
    src: '/images/adventures/bosduif-trail/thumbnails/bosduif1.webp',
    alt: 'Bosduif Trail View 1',
    fullSize: '/images/adventures/bosduif-trail/full/bosduif1.webp'
  },
  {
    src: '/images/adventures/bosduif-trail/thumbnails/bosduif2.webp',
    alt: 'Bosduif Trail View 2',
    fullSize: '/images/adventures/bosduif-trail/full/bosduif2.webp'
  },
  {
    src: '/images/adventures/bosduif-trail/thumbnails/bosduif3.webp',
    alt: 'Bosduif Trail View 3',
    fullSize: '/images/adventures/bosduif-trail/full/bosduif3.webp'
  },
  {
    src: '/images/adventures/bosduif-trail/thumbnails/bosduif4.webp',
    alt: 'Bosduif Trail View 4',
    fullSize: '/images/adventures/bosduif-trail/full/bosduif4.webp'
  },
  {
    src: '/images/adventures/bosduif-trail/thumbnails/bosduif5.webp',
    alt: 'Bosduif Trail View 5',
    fullSize: '/images/adventures/bosduif-trail/full/bosduif5.webp'
  },
  {
    src: '/images/adventures/bosduif-trail/thumbnails/bosduif6.webp',
    alt: 'Bosduif Trail View 6',
    fullSize: '/images/adventures/bosduif-trail/full/bosduif6.webp'
  },
  {
    src: '/images/adventures/bosduif-trail/thumbnails/bosduif7.webp',
    alt: 'Bosduif Trail View 7',
    fullSize: '/images/adventures/bosduif-trail/full/bosduif7.webp'
  },
  {
    src: '/images/adventures/bosduif-trail/thumbnails/bosduif8.webp',
    alt: 'Bosduif Trail View 8',
    fullSize: '/images/adventures/bosduif-trail/full/bosduif8.webp'
  },
  {
    src: '/images/adventures/bosduif-trail/thumbnails/bosduif9.webp',
    alt: 'Bosduif Trail View 9',
    fullSize: '/images/adventures/bosduif-trail/full/bosduif9.webp'
  }
]

export default function BosduifTrailPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images/home/mobile/bosduif-trail-banner.webp"
        desktopSrc="/images/adventures/banners/bosduif-trail-banner.webp"
        title="Bosduif Trail"
      />

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            Embark on a 2-hour loop trail that takes you up to breathtaking viewpoints above the Touw River. Experience the perfect blend of forest exploration and scenic vistas as you make your way back down through the enchanting landscape.
          </p>
        </div>

        {/* Gallery */}
        <div className="w-full px-0 sm:px-4 mt-8 md:mt-12 mb-8 md:mb-12">
          <ImageGallery 
            images={galleryImages} 
            imagesPerPage={8} 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="mt-8 md:mt-12 mb-8 md:mb-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* General Info Section */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-right">General Info</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li className="text-center md:text-right">
                      2-hour loop trail
                    </li>
                    <li className="text-center md:text-right">
                      Moderate difficulty
                    </li>
                    <li className="text-center md:text-right">
                      Scenic viewpoints
                    </li>
                    <li className="text-center md:text-right">
                      Forest environment
                    </li>
                    <li className="text-center md:text-right">
                      River views
                    </li>
                  </ul>
                </div>
                
                {/* What to Bring */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-left">What to Bring</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li className="text-center md:text-left">
                      Comfortable hiking shoes
                    </li>
                    <li className="text-center md:text-left">
                      Water bottle
                    </li>
                    <li className="text-center md:text-left">
                      Sunscreen and hat
                    </li>
                    <li className="text-center md:text-left">
                      Camera
                    </li>
                    <li className="text-center md:text-left">
                      Snacks
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="mt-12 mb-8">
          <LogoSection />
        </div>
      </div>
    </div>
  )
} 