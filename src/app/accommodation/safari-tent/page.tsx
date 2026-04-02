import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import BookNowButton from '@/components/ui/BookNowButton'
import LogoSection from '@/components/ui/LogoSection'

// Define gallery images with thumbnails and full-size versions
const galleryImages = [
  {
    src: '/images-v2/accommodation/safari-tent/gallery/thumb/1.webp',
    alt: 'Safari Tent Overview',
    fullSize: '/images-v2/accommodation/safari-tent/gallery/full/1.webp'
  },
  {
    src: '/images-v2/accommodation/safari-tent/gallery/thumb/2.webp',
    alt: 'Safari Tent Interior',
    fullSize: '/images-v2/accommodation/safari-tent/gallery/full/2.webp'
  },
  {
    src: '/images-v2/accommodation/safari-tent/gallery/thumb/3.webp',
    alt: 'Safari Tent Exterior',
    fullSize: '/images-v2/accommodation/safari-tent/gallery/full/3.webp'
  },
  {
    src: '/images-v2/accommodation/safari-tent/gallery/thumb/4.webp',
    alt: 'Safari Tent Night',
    fullSize: '/images-v2/accommodation/safari-tent/gallery/full/4.webp'
  },
  {
    src: '/images-v2/accommodation/safari-tent/gallery/thumb/5.webp',
    alt: 'Safari Tent Additional View 1',
    fullSize: '/images-v2/accommodation/safari-tent/gallery/full/5.webp'
  },
  {
    src: '/images-v2/accommodation/safari-tent/gallery/thumb/6.webp',
    alt: 'Safari Tent Additional View 2',
    fullSize: '/images-v2/accommodation/safari-tent/gallery/full/6.webp'
  },
  {
    src: '/images-v2/accommodation/safari-tent/gallery/thumb/7.webp',
    alt: 'Safari Tent Additional View 3',
    fullSize: '/images-v2/accommodation/safari-tent/gallery/full/7.webp'
  },
  {
    src: '/images-v2/accommodation/safari-tent/gallery/thumb/8.webp',
    alt: 'Safari Tent Additional View 4',
    fullSize: '/images-v2/accommodation/safari-tent/gallery/full/8.webp'
  }
]

export default function SafariTentPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images-v2/accommodation/safari-tent/hero/mobile.webp"
        desktopSrc="/images-v2/accommodation/safari-tent/hero/desktop.webp"
        title="Safari Tent"
      />
      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            Immerse yourself in the ideal blend of camping and comfort with our charming safari tent. A cozy double bed and all the essentials needed to create an unforgettable stay amidst nature's splendor.
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
                    <p className="text-center">Double bed</p>
                    <p className="text-center">Comfortable bedding</p>
                    <p className="text-center">Towels available</p>
                    <p className="text-center">Electricity in the tent</p>
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
                    <p className="text-center">Keep your space tidy</p>
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
                    <p className="text-center sm:text-left">Double bed</p>
                    <p className="text-center sm:text-left">Comfortable bedding</p>
                    <p className="text-center sm:text-left">Towels available</p>
                    <p className="text-center sm:text-left">Electricity in the tent</p>
                    <p className="text-center sm:text-left">Access to all facilities</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">Rules of the Forest</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    <p className="text-center">Quiet hours: 10PM - 6AM</p>
                    <p className="text-center">Keep your space tidy</p>
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