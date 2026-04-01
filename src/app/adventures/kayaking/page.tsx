'use client'

import { useState } from 'react'
import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import LogoSection from '@/components/ui/LogoSection'

// Define gallery images with thumbnails and full-size versions
const galleryImages = [
  {
    src: '/images/adventures/kayaking/full/adventure1.webp',
    alt: 'Kayaking Adventure 1',
    fullSize: '/images/adventures/kayaking/full/adventure1.webp'
  },
  {
    src: '/images/adventures/kayaking/full/adventure2.webp',
    alt: 'Kayaking Adventure 2',
    fullSize: '/images/adventures/kayaking/full/adventure2.webp'
  },
  {
    src: '/images/adventures/kayaking/full/adventure3.webp',
    alt: 'Kayaking Adventure 3',
    fullSize: '/images/adventures/kayaking/full/adventure3.webp'
  },
  {
    src: '/images/adventures/kayaking/full/adventure4.webp',
    alt: 'Kayaking Adventure 4',
    fullSize: '/images/adventures/kayaking/full/adventure4.webp'
  },
  {
    src: '/images/adventures/kayaking/full/adventure5.webp',
    alt: 'Kayaking Adventure 5',
    fullSize: '/images/adventures/kayaking/full/adventure5.webp'
  },
  {
    src: '/images/adventures/kayaking/full/adventure6.webp',
    alt: 'Kayaking Adventure 6',
    fullSize: '/images/adventures/kayaking/full/adventure6.webp'
  },
  {
    src: '/images/adventures/kayaking/full/adventure7.webp',
    alt: 'Kayaking Adventure 7',
    fullSize: '/images/adventures/kayaking/full/adventure7.webp'
  },
  {
    src: '/images/adventures/kayaking/full/adventure8.webp',
    alt: 'Kayaking Adventure 8',
    fullSize: '/images/adventures/kayaking/full/adventure8.webp'
  }
]

export default function KayakingPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images/home/mobile/kayaking-banner.webp"
        desktopSrc="/images/adventures/banners/kayaking-banner.webp"
        title="Kayaking"
      />

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
        <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
          Paddle your way over serene waters, dyed red and orange by the tannins in the ground, through the Wilderness National Park. A wonderful walk and magnificent waterfall wait on the other side.
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
          {/* Safety Information - Replacing Features Section */}
          <div className="mt-8 md:mt-12 mb-8 md:mb-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* General Info Section */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-right">General Info</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li className="text-center md:text-right">
                      Duration: 2-3 hours
                    </li>
                    <li className="text-center md:text-right">
                      Difficulty: Moderate
                    </li>
                    <li className="text-center md:text-right">
                      Equipment provided
                    </li>
                    <li className="text-center md:text-right">
                      Expert guides included
                    </li>
                    <li className="text-center md:text-right">
                      Wildlife spotting opportunities
                    </li>
                  </ul>
                </div>
                
                {/* What to Bring */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-left">What to Bring</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li className="text-center md:text-left">
                      Sunscreen and hat
                    </li>
                    <li className="text-center md:text-left">
                      Water and snacks
                    </li>
                    <li className="text-center md:text-left">
                      Comfortable walking shoes
                    </li>
                    <li className="text-center md:text-left">
                      Camera for memories
                    </li>
                    <li className="text-center md:text-left">
                      Small backpack for essentials
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