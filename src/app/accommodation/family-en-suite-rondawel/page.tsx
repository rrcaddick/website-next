import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import BookNowButton from '@/components/ui/BookNowButton'
import LogoSection from '@/components/ui/LogoSection'

// Define gallery images with thumbnails and full-size versions
const galleryImages = [
  {
    src: '/images-v2/accommodation/family-en-suite-rondawel/gallery/thumb/1.webp',
    alt: 'Family En-suite Rondawel Overview',
    fullSize: '/images-v2/accommodation/family-en-suite-rondawel/gallery/full/1.webp'
  },
  {
    src: '/images-v2/accommodation/family-en-suite-rondawel/gallery/thumb/2.webp',
    alt: 'Family En-suite Rondawel Interior',
    fullSize: '/images-v2/accommodation/family-en-suite-rondawel/gallery/full/2.webp'
  },
  {
    src: '/images-v2/accommodation/family-en-suite-rondawel/gallery/thumb/3.webp',
    alt: 'Family En-suite Rondawel Bathroom',
    fullSize: '/images-v2/accommodation/family-en-suite-rondawel/gallery/full/3.webp'
  },
  {
    src: '/images-v2/accommodation/family-en-suite-rondawel/gallery/thumb/4.webp',
    alt: 'Family En-suite Rondawel View',
    fullSize: '/images-v2/accommodation/family-en-suite-rondawel/gallery/full/4.webp'
  },
  {
    src: '/images-v2/accommodation/family-en-suite-rondawel/gallery/thumb/5.webp',
    alt: 'Family En-suite Rondawel Additional View 1',
    fullSize: '/images-v2/accommodation/family-en-suite-rondawel/gallery/full/5.webp'
  },
  {
    src: '/images-v2/accommodation/family-en-suite-rondawel/gallery/thumb/6.webp',
    alt: 'Family En-suite Rondawel Additional View 2',
    fullSize: '/images-v2/accommodation/family-en-suite-rondawel/gallery/full/6.webp'
  },
  {
    src: '/images-v2/accommodation/family-en-suite-rondawel/gallery/thumb/7.webp',
    alt: 'Family En-suite Rondawel Additional View 3',
    fullSize: '/images-v2/accommodation/family-en-suite-rondawel/gallery/full/7.webp'
  },
  {
    src: '/images-v2/accommodation/family-en-suite-rondawel/gallery/thumb/8.webp',
    alt: 'Family En-suite Rondawel Additional View 4',
    fullSize: '/images-v2/accommodation/family-en-suite-rondawel/gallery/full/8.webp'
  }
]

export default function FamilyEnSuiteRondawelPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images-v2/accommodation/family-en-suite-rondawel/hero/mobile.webp"
        desktopSrc="/images-v2/accommodation/family-en-suite-rondawel/hero/desktop.webp"
        title="Family En-Suite Rondawel"
      />
      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            The forest's very own penthouse suite - A luxurious traditional African-style round house with modern amenities. Perfect for families seeking a private and authentic experience with all the comforts of home.
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
                    <p className="text-center">Double bed + bunk bed | Comfortable bedding</p>
                    <p className="text-center">En-suite bathroom | Towels provided</p>
                    <p className="text-center">Traditional African design</p>
                    <p className="text-center">Outside seating area | View of the forest</p>
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
                    <p>Double bed + bunk bed | Comfortable bedding</p>
                    <p>En-suite bathroom | Towels provided</p>
                    <p>Traditional African design</p>
                    <p>Outside seating area | View of the forest</p>
                    <p>Access to all facilities</p>
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
