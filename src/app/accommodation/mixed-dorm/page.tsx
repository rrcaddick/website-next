'use client'

import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import BookNowButton from '@/components/ui/BookNowButton'
import LogoSection from '@/components/ui/LogoSection'

// Define gallery images with the new naming convention
const galleryImages = [
  {
    src: '/images/accommodation/mixed-dorm/thumbnails/dorm1.webp',
    alt: 'Mixed Dorm Overview',
    fullSize: '/images/accommodation/mixed-dorm/full/dorm1.webp'
  },
  {
    src: '/images/accommodation/mixed-dorm/thumbnails/dorm2.webp',
    alt: 'Mixed Dorm Interior',
    fullSize: '/images/accommodation/mixed-dorm/full/dorm2.webp'
  },
  {
    src: '/images/accommodation/mixed-dorm/thumbnails/dorm3.webp',
    alt: 'Mixed Dorm Beds',
    fullSize: '/images/accommodation/mixed-dorm/full/dorm3.webp'
  },
  {
    src: '/images/accommodation/mixed-dorm/thumbnails/dorm4.webp',
    alt: 'Mixed Dorm View',
    fullSize: '/images/accommodation/mixed-dorm/full/dorm4.webp'
  },
  {
    src: '/images/accommodation/mixed-dorm/thumbnails/dorm5.webp',
    alt: 'Mixed Dorm Additional View 1',
    fullSize: '/images/accommodation/mixed-dorm/full/dorm5.webp'
  },
  {
    src: '/images/accommodation/mixed-dorm/thumbnails/dorm6.webp',
    alt: 'Mixed Dorm Additional View 2',
    fullSize: '/images/accommodation/mixed-dorm/full/dorm6.webp'
  },
  {
    src: '/images/accommodation/mixed-dorm/thumbnails/dorm7.webp',
    alt: 'Mixed Dorm Additional View 3',
    fullSize: '/images/accommodation/mixed-dorm/full/dorm7.webp'
  },
  {
    src: '/images/accommodation/mixed-dorm/thumbnails/dorm8.webp',
    alt: 'Mixed Dorm Additional View 4',
    fullSize: '/images/accommodation/mixed-dorm/full/dorm8.webp'
  }
]

export default function MixedDormPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images/home/mobile/mixed-dorm-banner.webp"
        desktopSrc="/images/accommodation/banners/mixed-dorm-banner.webp"
        title="Mixed Dorm"
      />
      {/* Desktop Banner */}
      <div className="relative h-[300px] lg:h-[500px] w-full mb-6 bg-gray-900 hidden md:block">
        <Image
          src="/images/accommodation/banners/mixed-dorm-banner.webp"
          alt="Fairy Knowe Accommodation Mixed Dorm"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[0_0_8px_rgba(0,0,0,1)] hestrial-font px-4 text-center">
            Mixed Dorm
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            Our mixed dorm offers a social atmosphere with comfortable bunk beds, perfect for solo travelers looking to meet new friends. A great budget-friendly option with all the essential amenities.
          </p>

          {/* Book Now Button */}
          <div className="mt-6">
            <BookNowButton />
          </div>
        </div>

        {/* Gallery */}
        <div className="w-full px-0 sm:px-4 mt-8 md:mt-12 mb-8 md:mb-12">
          <ImageGallery 
            images={galleryImages} 
            imagesPerPage={8} 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          {/* Features and Rules */}
          <div className="mt-8 sm:mt-12 mb-8 sm:mb-12">
            <div className="max-w-6xl mx-auto">
              {/* Mobile Order (What's Included, Shared Facilities, Rules of the Forest) */}
              <div className="grid grid-cols-1 gap-6 sm:hidden">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-center">What's Included</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs">
                    <p className="text-center">Bunk beds</p>
                    <p className="text-center">Comfortable bedding</p>
                    <p className="text-center">Towels available</p>
                    <p className="text-center">Access to all facilities</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-center">Shared Facilities</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs">
                    <p className="text-center">Bathrooms</p>
                    <p className="text-center">Hot showers</p>
                    <p className="text-center">Common kitchen area</p>
                    <p className="text-center">WiFi in common areas</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-center">Rules of the Forest</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs">
                    <p className="text-center">Quiet hours: 10PM - 6AM</p>
                    <p className="text-center">No smoking inside</p>
                    <p className="text-center">No private alcohol</p>
                    <p className="text-center">Be friendly to fellow wanderers</p>
                    <p className="text-center">Respect the forest</p>
                  </div>
                </div>
              </div>

              {/* Desktop Order (What's Included, Rules of the Forest, Shared Facilities) */}
              <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center sm:text-left">What's Included</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    <p className="text-center sm:text-left">Bunk beds</p>
                    <p className="text-center sm:text-left">Comfortable bedding</p>
                    <p className="text-center sm:text-left">Towels available</p>
                    <p className="text-center sm:text-left">Access to all facilities</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">Rules of the Forest</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    <p className="text-center">Quiet hours: 10PM - 6AM</p>
                    <p className="text-center">No smoking inside</p>
                    <p className="text-center">No private alcohol</p>
                    <p className="text-center">Be friendly to fellow wanderers</p>
                    <p className="text-center">Respect the forest</p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center sm:text-right">Shared Facilities</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    <p className="text-center sm:text-right">Bathrooms</p>
                    <p className="text-center sm:text-right">Hot showers</p>
                    <p className="text-center sm:text-right">Common kitchen area</p>
                    <p className="text-center sm:text-right">WiFi in common areas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="mt-16 mb-8">
          <LogoSection />
        </div>
      </div>
    </div>
  )
} 