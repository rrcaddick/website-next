'use client'

import { useState } from 'react'
import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import LogoSection from '@/components/ui/LogoSection'

// Define gallery images with thumbnails and full-size versions
const galleryImages = [
  {
    src: '/images/Adventures/Horseriding/adventure1.webp',
    alt: 'Horseriding Adventure',
    fullSize: '/images/Adventures/Horseriding/adventure1.webp'
  },
  {
    src: '/images/Adventures/Horseriding/adventure2.webp',
    alt: 'Horseriding Experience',
    fullSize: '/images/Adventures/Horseriding/adventure2.webp'
  },
  {
    src: '/images/Adventures/Horseriding/adventure3.webp',
    alt: 'Horseriding Journey',
    fullSize: '/images/Adventures/Horseriding/adventure3.webp'
  },
  {
    src: '/images/Adventures/Horseriding/adventure4.webp',
    alt: 'Horseriding Views',
    fullSize: '/images/Adventures/Horseriding/adventure4.webp'
  },
  {
    src: '/images/Adventures/Horseriding/adventure5.webp',
    alt: 'Horseriding Adventure',
    fullSize: '/images/Adventures/Horseriding/adventure5.webp'
  },
  {
    src: '/images/Adventures/Horseriding/adventure6.webp',
    alt: 'Horseriding Experience',
    fullSize: '/images/Adventures/Horseriding/adventure6.webp'
  },
  {
    src: '/images/Adventures/Horseriding/adventure7.webp',
    alt: 'Horseriding Journey',
    fullSize: '/images/Adventures/Horseriding/adventure7.webp'
  },
  {
    src: '/images/Adventures/Horseriding/adventure8.webp',
    alt: 'Horseriding Views',
    fullSize: '/images/Adventures/Horseriding/adventure8.webp'
  }
]

export default function HorseridingPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images/home/mobile/horseriding-banner.webp"
        desktopSrc="/images/adventures/banners/horseriding-banner.webp"
        title="Horseriding"
      />

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
        <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
          Set out on a tranquil 1.5-hour horseback adventure through the spellbinding forests of Wilderness Heights. Guided by experienced hosts, this journey is perfect for riders of all skill levels, offering a serene and immersive way to connect with the breathtaking beauty of the area. Let the rhythmic pace of your steed and the enchanting woodland surroundings create memories to treasure.
          </p>
        </div>

        {/* Gallery */}
        <div className="w-full px-0 sm:px-4 mt-8 md:mt-12 mb-8 md:mb-12">
          <ImageGallery 
            images={galleryImages} 
            imagesPerPage={8} 
          />
        </div>

        {/* Safety Information - Replacing Features Section */}
        <div className="mt-8 md:mt-12 mb-8 md:mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* General Info Section */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-right">General Info</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li className="text-center md:text-right">
                    Duration: 1.5 hours
                  </li>
                  <li className="text-center md:text-right">
                    All skill levels welcome
                  </li>
                  <li className="text-center md:text-right">
                    Experienced guides
                  </li>
                  <li className="text-center md:text-right">
                    Safety equipment provided
                  </li>
                  <li className="text-center md:text-right">
                    Well-trained horses
                  </li>
                </ul>
              </div>
              
              {/* What to Bring */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-left">What to Bring</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li className="text-center md:text-left">
                    Long pants and closed shoes
                  </li>
                  <li className="text-center md:text-left">
                    Water and snacks
                  </li>
                  <li className="text-center md:text-left">
                    Sunscreen and hat
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
      )
    }