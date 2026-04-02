import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import BookNowButton from '@/components/ui/BookNowButton'
import LogoSection from '@/components/ui/LogoSection'

// Define gallery images with the new naming convention
const galleryImages = [
  {
    src: '/images/accommodation/double-en-suite/thumbnails/doubleensuite1.webp',
    alt: 'Double En-suite Overview',
    fullSize: '/images/accommodation/double-en-suite/full/doubleensuite1.webp'
  },
  {
    src: '/images/accommodation/double-en-suite/thumbnails/doubleensuite2.webp',
    alt: 'Double En-suite Interior',
    fullSize: '/images/accommodation/double-en-suite/full/doubleensuite2.webp'
  },
  {
    src: '/images/accommodation/double-en-suite/thumbnails/doubleensuite3.webp',
    alt: 'Double En-suite Bathroom',
    fullSize: '/images/accommodation/double-en-suite/full/doubleensuite3.webp'
  },
  {
    src: '/images/accommodation/double-en-suite/thumbnails/doubleensuite4.webp',
    alt: 'Double En-suite View',
    fullSize: '/images/accommodation/double-en-suite/full/doubleensuite4.webp'
  },
  {
    src: '/images/accommodation/double-en-suite/thumbnails/doubleensuite5.webp',
    alt: 'Double En-suite Additional View 1',
    fullSize: '/images/accommodation/double-en-suite/full/doubleensuite5.webp'
  },
  {
    src: '/images/accommodation/double-en-suite/thumbnails/doubleensuite6.webp',
    alt: 'Double En-suite Additional View 2',
    fullSize: '/images/accommodation/double-en-suite/full/doubleensuite6.webp'
  },
  {
    src: '/images/accommodation/double-en-suite/thumbnails/doubleensuite7.webp',
    alt: 'Double En-suite Additional View 3',
    fullSize: '/images/accommodation/double-en-suite/full/doubleensuite7.webp'
  },
  {
    src: '/images/accommodation/double-en-suite/thumbnails/doubleensuite8.webp',
    alt: 'Double En-suite Additional View 4',
    fullSize: '/images/accommodation/double-en-suite/full/doubleensuite8.webp'
  }
]

export default function DoubleEnSuitePage() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images/home/mobile/double-en-suite-banner.webp"
        desktopSrc="/images/accommodation/banners/doube-en-suite-banner.webp"
        title="Double En-Suite"
      />
      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            Indulge in the crème de la crème of comfort, ideal for couples or individuals who appreciate a touch of coziness. With privacy and extra amenities, this retreat offers the perfect sanctuary for a truly special and relaxing stay.
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
                    <p className="text-center">Queen bed | Comfortable bedding</p>
                    <p className="text-center">En-suite bathroom</p>
                    <p className="text-center">Towels provided</p>
                    <p className="text-center">Outdoor seating area</p>
                    <p className="text-center">Access to all facilities</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-center">Shared Facilities</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs">
                    <p className="text-center">Common kitchen area</p>
                    <p className="text-center">WiFi in common areas</p>
                    <p className="text-center">Outdoor seating areas</p>
                    <p className="text-center">Access to all resort facilities</p>
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
                    <p className="text-center sm:text-left">Queen bed | Comfortable bedding</p>
                    <p className="text-center sm:text-left">En-suite bathroom</p>
                    <p className="text-center sm:text-left">Towels provided</p>
                    <p className="text-center sm:text-left">Outdoor seating area</p>
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
                    <p className="text-center sm:text-right">Common kitchen area</p>
                    <p className="text-center sm:text-right">WiFi in common areas</p>
                    <p className="text-center sm:text-right">Outdoor seating areas</p>
                    <p className="text-center sm:text-right">Access to all resort facilities</p>
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
