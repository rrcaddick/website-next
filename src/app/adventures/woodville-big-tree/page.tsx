'use client'

import Image from 'next/image'
import Link from 'next/link'
import ImageGallery from '@/components/gallery/ImageGallery'

// Define gallery images with thumbnails and full-size versions
const galleryImages = [
  {
    src: '/images/adventures/woodville-big-tree/thumbnails/adventure1.webp',
    alt: 'Woodville Big Tree Adventure',
    description: 'The majestic Outeniqua Yellowwood',
    fullSize: '/images/adventures/woodville-big-tree/full/adventure1.webp'
  },
  {
    src: '/images/adventures/woodville-big-tree/thumbnails/adventure2.webp',
    alt: 'Woodville Big Tree Experience',
    description: 'Forest pathway',
    fullSize: '/images/adventures/woodville-big-tree/full/adventure2.webp'
  },
  {
    src: '/images/adventures/woodville-big-tree/thumbnails/adventure3.webp',
    alt: 'Woodville Big Tree Journey',
    description: 'Tree canopy views',
    fullSize: '/images/adventures/woodville-big-tree/full/adventure3.webp'
  },
  {
    src: '/images/adventures/woodville-big-tree/thumbnails/adventure4.webp',
    alt: 'Woodville Big Tree Views',
    description: 'Forest surroundings',
    fullSize: '/images/adventures/woodville-big-tree/full/adventure4.webp'
  },
  {
    src: '/images/adventures/woodville-big-tree/thumbnails/adventure5.webp',
    alt: 'Woodville Big Tree Adventure',
    description: 'The majestic Outeniqua Yellowwood',
    fullSize: '/images/adventures/woodville-big-tree/full/adventure5.webp'
  },
  {
    src: '/images/adventures/woodville-big-tree/thumbnails/adventure6.webp',
    alt: 'Woodville Big Tree Experience',
    description: 'Forest pathway',
    fullSize: '/images/adventures/woodville-big-tree/full/adventure6.webp'
  },
  {
    src: '/images/adventures/woodville-big-tree/thumbnails/adventure7.webp',
    alt: 'Woodville Big Tree Journey',
    description: 'Tree canopy views',
    fullSize: '/images/adventures/woodville-big-tree/full/adventure7.webp'
  },
  {
    src: '/images/adventures/woodville-big-tree/thumbnails/adventure8.webp',
    alt: 'Woodville Big Tree Views',
    description: 'Forest surroundings',
    fullSize: '/images/adventures/woodville-big-tree/full/adventure8.webp'
  }
]

export default function WoodvilleBigTreePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      {/* Mobile Banner */}
      <div className="relative w-full aspect-[9/5] mb-6 bg-gray-900 block md:hidden">
        <Image
          src="/images/home/mobile/woodville-big-tree-banner.webp"
          alt="Fairy Knowe Woodville Big Tree Mobile Banner"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-4 drop-shadow-[0_0_8px_rgba(0,0,0,1)] hestrial-font px-4 text-center">
            Woodville Big Tree
          </h1>
        </div>
      </div>
      {/* Desktop Banner */}
      <div className="relative h-[300px] lg:h-[500px] w-full mb-6 bg-gray-900 hidden md:block">
        <Image
          src="/images/adventures/banners/woodville-big-tree-banner.webp"
          alt="Fairy Knowe Woodville Big Tree"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[0_0_8px_rgba(0,0,0,1)] hestrial-font px-4 text-center">
            Woodville Big Tree
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            Marvel at the majestic Outeniqua Yellowwood, a sentinel of time standing for nearly a thousand years. Choose between a 2.2-km or 7-km loop trail that wind through an ancient forest brimming with life, where countless species of mushrooms dot the forest surfaces like jewels of nature&apos;s treasure. This iconic wonder has become a cherished highlight of the indigenous Wilderness forests, captivating the hearts of all who visit. Its sprawling crown serves as a sanctuary for birds like the Knysna Turaco and Cape Parrot, while its bountiful fruit provides sustenance to bats and bush pigs alike. The essence of this enchanting tree and its surroundings is nothing short of magical.
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
                      Distance: 2.2 km or 7 km loop
                    </li>
                    <li className="text-center md:text-right">
                      Duration: 1-3 hours
                    </li>
                    <li className="text-center md:text-right">
                      Difficulty: Easy to Moderate
                    </li>
                    <li className="text-center md:text-right">
                      1000-year-old Outeniqua Yellowwood
                    </li>
                    <li className="text-center md:text-right">
                      Ancient forest with diverse wildlife
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
                      Water and snacks
                    </li>
                    <li className="text-center md:text-left">
                      Sunscreen and hat
                    </li>
                    <li className="text-center md:text-left">
                      Camera for memories
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