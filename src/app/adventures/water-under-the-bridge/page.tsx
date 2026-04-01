'use client'

import Image from 'next/image'
import Link from 'next/link'
import ImageGallery from '@/components/gallery/ImageGallery'

// Define gallery images with thumbnails and full-size versions
const galleryImages = [
  {
    src: '/images/adventures/water-under-the-bridge/thumbnails/adventure1.webp',
    alt: 'Water Under the Bridge Adventure',
    description: 'Scenic river views',
    fullSize: '/images/adventures/water-under-the-bridge/full/adventure1.webp'
  },
  {
    src: '/images/adventures/water-under-the-bridge/thumbnails/adventure2.webp',
    alt: 'Water Under the Bridge Experience',
    description: 'River pathway',
    fullSize: '/images/adventures/water-under-the-bridge/full/adventure2.webp'
  },
  {
    src: '/images/adventures/water-under-the-bridge/thumbnails/adventure3.webp',
    alt: 'Water Under the Bridge Journey',
    description: 'Bridge views',
    fullSize: '/images/adventures/water-under-the-bridge/full/adventure3.webp'
  },
  {
    src: '/images/adventures/water-under-the-bridge/thumbnails/adventure4.webp',
    alt: 'Water Under the Bridge Views',
    description: 'River landscape',
    fullSize: '/images/adventures/water-under-the-bridge/full/adventure4.webp'
  },
  {
    src: '/images/adventures/water-under-the-bridge/thumbnails/adventure5.webp',
    alt: 'Water Under the Bridge Adventure',
    description: 'Scenic river views',
    fullSize: '/images/adventures/water-under-the-bridge/full/adventure5.webp'
  },
  {
    src: '/images/adventures/water-under-the-bridge/thumbnails/adventure6.webp',
    alt: 'Water Under the Bridge Experience',
    description: 'River pathway',
    fullSize: '/images/adventures/water-under-the-bridge/full/adventure6.webp'
  },
  {
    src: '/images/adventures/water-under-the-bridge/thumbnails/adventure7.webp',
    alt: 'Water Under the Bridge Journey',
    description: 'Bridge views',
    fullSize: '/images/adventures/water-under-the-bridge/full/adventure7.webp'
  },
  {
    src: '/images/adventures/water-under-the-bridge/thumbnails/adventure8.webp',
    alt: 'Water Under the Bridge Views',
    description: 'River landscape',
    fullSize: '/images/adventures/water-under-the-bridge/full/adventure8.webp'
  }
]

export default function WaterUnderTheBridgePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      {/* Mobile Banner */}
      <div className="relative w-full aspect-[9/5] mb-6 bg-gray-900 block md:hidden">
        <Image
          src="/images/home/mobile/water-under-the-bridge-banner.webp"
          alt="Fairy Knowe Water Under the Bridge Mobile Banner"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-4 drop-shadow-[0_0_8px_rgba(0,0,0,1)] hestrial-font px-4 text-center">
            Water Under the Bridge
          </h1>
        </div>
      </div>
      {/* Desktop Banner */}
      <div className="relative h-[300px] lg:h-[500px] w-full mb-6 bg-gray-900 hidden md:block">
        <Image
          src="/images/adventures/banners/water-under-the-bridge-banner.webp"
          alt="Fairy Knowe Water Under the Bridge"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[0_0_8px_rgba(0,0,0,1)] hestrial-font px-4 text-center">
            Water Under the Bridge
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            Discover the enchanting Water Under the Bridge trail, a picturesque 2.5-km walk that follows the gentle flow of the Touw River. This easy, family-friendly path winds through lush indigenous forest, offering glimpses of the river&apos;s crystal-clear waters and the historic railway bridge that spans its width. The trail is perfect for nature lovers and photographers, with opportunities to spot local birdlife and enjoy the peaceful sounds of flowing water. Whether you&apos;re seeking a leisurely stroll or a moment of tranquility in nature, this trail provides a perfect escape into the heart of Wilderness&apos;s natural beauty.
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
                      Distance: 2.5 km round trip
                    </li>
                    <li className="text-center md:text-right">
                      Duration: 1-1.5 hours
                    </li>
                    <li className="text-center md:text-right">
                      Difficulty: Easy
                    </li>
                    <li className="text-center md:text-right">
                      Family-friendly trail
                    </li>
                    <li className="text-center md:text-right">
                      Historic railway bridge
                    </li>
                  </ul>
                </div>
                
                {/* What to Bring */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-left">What to Bring</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li className="text-center md:text-left">
                      Comfortable walking shoes
                    </li>
                    <li className="text-center md:text-left">
                      Water bottle
                    </li>
                    <li className="text-center md:text-left">
                      Sun protection
                    </li>
                    <li className="text-center md:text-left">
                      Camera for photos
                    </li>
                    <li className="text-center md:text-left">
                      Binoculars for bird watching
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="mt-12 mb-8 flex justify-center">
          <Image
            src="/images/home/logo.webp"
            alt="Fairy Knowe Backpackers Logo"
            width={400}
            height={400}
            className="w-auto h-auto max-w-[200px] md:max-w-[250px]"
            priority
          />
        </div>
      </div>
    </div>
  )
} 