'use client'

import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import LogoSection from '@/components/ui/LogoSection'

// Define gallery images with thumbnails and full-size versions
const galleryImages = [
  {
    src: '/images/adventures/map-of-africa/thumbnails/adventure1.webp',
    alt: 'Map of Africa Adventure',
    description: 'Panoramic views from the top',
    fullSize: '/images/adventures/map-of-africa/full/adventure1.webp'
  },
  {
    src: '/images/adventures/map-of-africa/thumbnails/adventure2.webp',
    alt: 'Map of Africa Experience',
    description: 'Hiking trail views',
    fullSize: '/images/adventures/map-of-africa/full/adventure2.webp'
  },
  {
    src: '/images/adventures/map-of-africa/thumbnails/adventure3.webp',
    alt: 'Map of Africa Journey',
    description: 'Scenic overlook',
    fullSize: '/images/adventures/map-of-africa/full/adventure3.webp'
  },
  {
    src: '/images/adventures/map-of-africa/thumbnails/adventure4.webp',
    alt: 'Map of Africa Views',
    description: 'Mountain landscape',
    fullSize: '/images/adventures/map-of-africa/full/adventure4.webp'
  },
  {
    src: '/images/adventures/map-of-africa/thumbnails/adventure5.webp',
    alt: 'Map of Africa Adventure',
    description: 'Panoramic views from the top',
    fullSize: '/images/adventures/map-of-africa/full/adventure5.webp'
  },
  {
    src: '/images/adventures/map-of-africa/thumbnails/adventure6.webp',
    alt: 'Map of Africa Experience',
    description: 'Hiking trail views',
    fullSize: '/images/adventures/map-of-africa/full/adventure6.webp'
  },
  {
    src: '/images/adventures/map-of-africa/thumbnails/adventure7.webp',
    alt: 'Map of Africa Journey',
    description: 'Scenic overlook',
    fullSize: '/images/adventures/map-of-africa/full/adventure7.webp'
  },
  {
    src: '/images/adventures/map-of-africa/thumbnails/adventure8.webp',
    alt: 'Map of Africa Views',
    description: 'Mountain landscape',
    fullSize: '/images/adventures/map-of-africa/full/adventure8.webp'
  }
]

export default function MapOfAfricaPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images/home/mobile/map-of-africa-banner.webp"
        desktopSrc="/images/adventures/banners/map-of-africa-banner.webp"
        title="Map of Africa"
      />

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
          The Map of Africa offers a spellbinding viewpoint, where nature's artistry is unveiled in the form of a river that gracefully sculpts the shape of the African continent into the valley below. Just across the way, another mesmerizing vantage point awaits, offering sweeping views of the ocean's endless expanse, golden sands of the beach, and the picturesque charm of Wilderness itself.
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
                      Distance: 6.5 km round trip
                    </li>
                    <li className="text-center md:text-right">
                      Duration: 2-3 hours
                    </li>
                    <li className="text-center md:text-right">
                      Difficulty: Moderate
                    </li>
                    <li className="text-center md:text-right">
                      Panoramic ocean views
                    </li>
                    <li className="text-center md:text-right">
                      Iconic Map of Africa formation
                    </li>
                  </ul>
                </div>
                
                {/* What to Bring */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-left">What to Bring</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li className="text-center md:text-left">
                      Sturdy hiking shoes
                    </li>
                    <li className="text-center md:text-left">
                      Water and snacks
                    </li>
                    <li className="text-center md:text-left">
                      Sunscreen and hat
                    </li>
                    <li className="text-center md:text-left">
                      Camera for the views
                    </li>
                    <li className="text-center md:text-left">
                      Light jacket for wind
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