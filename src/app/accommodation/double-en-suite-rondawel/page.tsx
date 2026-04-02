import Image from 'next/image'
import Link from 'next/link'
import ImageGallery from '@/components/gallery/ImageGallery'
import LogoSection from '@/components/ui/LogoSection'
import MobileImageModal from './MobileImageModal'

const galleryImages = [
  {
    src: '/images/accommodation/double-en-suite-rondawel/thumbnails/rondawel1.webp',
    alt: 'Double En-suite Rondawel Overview',
    fullSize: '/images/accommodation/double-en-suite-rondawel/full/rondawel1.webp'
  },
  {
    src: '/images/accommodation/double-en-suite-rondawel/thumbnails/rondawel2.webp',
    alt: 'Double En-suite Rondawel Interior',
    fullSize: '/images/accommodation/double-en-suite-rondawel/full/rondawel2.webp'
  }
]

export default function DoubleEnSuiteRondawelPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[500px] w-full bg-gray-900">
        <Image
          src="/images/accommodation/banners/double-en-suite-rondawel-banner.webp"
          alt="Double En-suite Rondawel Banner"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4 drop-shadow-[0_0_8px_rgba(0,0,0,1)] hestrial-font px-4 text-center">Double En-suite Rondawel</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8 sm:mb-12 max-w-4xl mx-auto text-sm sm:text-base">
            Experience the charm of our traditional rondawel with modern comforts. This cozy double en-suite room offers a unique circular design with all the amenities you need for a comfortable stay.
          </p>

          {/* Gallery */}
          <div className="mt-8 sm:mt-12 mb-8 sm:mb-12">
            {/* Mobile Gallery + Modal */}
            <MobileImageModal images={galleryImages} />

            {/* Desktop Gallery */}
            <div className="hidden sm:block">
              <ImageGallery
                images={galleryImages}
                imagesPerPage={2}
              />
            </div>
          </div>

          {/* Mobile Book Now Button - Only visible on mobile */}
          <div className="flex justify-center mt-6 mb-8 sm:hidden">
            <Link href="https://book.nightsbridge.com/21082" className="bg-[#0E7D73] hover:bg-[#073F3A] text-[#C9DD94] hover:text-[#00FF7F] px-6 py-3 rounded-lg font-semibold transition-colors text-base">
              Book Now
            </Link>
          </div>

          {/* Features and Rules */}
          <div className="mt-8 sm:mt-12 mb-8 sm:mb-12">
            <div className="max-w-6xl mx-auto">
              {/* Mobile Order (What's Included, Shared Facilities, Rules of the Forest) */}
              <div className="grid grid-cols-1 gap-6 sm:hidden">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-center">What&apos;s Included</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs">
                    <p className="text-center">Double bed</p>
                    <p className="text-center">En-suite bathroom</p>
                    <p className="text-center">Private entrance</p>
                    <p className="text-center">Air conditioning</p>
                    <p className="text-center">WiFi access</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-center">Shared Facilities</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs">
                    <p className="text-center">Common kitchen area</p>
                    <p className="text-center">Outdoor seating</p>
                    <p className="text-center">Laundry facilities</p>
                    <p className="text-center">Parking</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-center">House Rules</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs">
                    <p className="text-center">Check-in: 2PM - 8PM</p>
                    <p className="text-center">Check-out: 10AM</p>
                    <p className="text-center">No smoking</p>
                    <p className="text-center">No pets</p>
                    <p className="text-center">Quiet hours: 10PM - 6AM</p>
                  </div>
                </div>
              </div>

              {/* Desktop Order (General Info, What to Bring, Adventure Safely) */}
              <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg order-1 md:order-2 shadow-md md:shadow-none">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white text-center">General Info</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li className="text-center">Double bed with comfortable mattress</li>
                    <li className="text-center">En-suite bathroom with hot shower</li>
                    <li className="text-center">Private entrance with key access</li>
                    <li className="text-center">Air conditioning for climate control</li>
                    <li className="text-center">WiFi access in the room</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg order-2 md:order-3 shadow-md md:shadow-none">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white text-center">What to Bring</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li className="text-center">Personal toiletries</li>
                    <li className="text-center">Towels (available for rent)</li>
                    <li className="text-center">Travel adapter if needed</li>
                    <li className="text-center">Insect repellent</li>
                    <li className="text-center">Sense of adventure</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg order-3 md:order-1 shadow-md md:shadow-none">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white text-center">House Rules</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li className="text-center">Check-in: 2PM - 8PM</li>
                    <li className="text-center">Check-out: 10AM</li>
                    <li className="text-center">No smoking inside</li>
                    <li className="text-center">No pets allowed</li>
                    <li className="text-center">Quiet hours: 10PM - 6AM</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Book Now Button - Only visible on desktop */}
          <div className="hidden sm:flex justify-center mt-8 sm:mt-12 mb-8 sm:mb-12">
            <Link href="https://book.nightsbridge.com/21082" className="bg-[#0E7D73] hover:bg-[#073F3A] text-[#C9DD94] hover:text-[#00FF7F] px-8 py-3 rounded-lg font-semibold transition-colors text-lg">
              Book Now
            </Link>
          </div>

          {/* Logo Section */}
          <div className="mt-16 mb-8">
            <LogoSection />
          </div>
        </div>
      </div>
    </div>
  )
}
