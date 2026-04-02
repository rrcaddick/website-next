import Image from 'next/image'
import BookNowButton from '@/components/ui/BookNowButton'
import LogoSection from '@/components/ui/LogoSection'
import AccommodationMobileList from '@/components/features/accommodation/AccommodationMobileList'
import AccommodationDesktopGrid from '@/components/features/accommodation/AccommodationDesktopGrid'

export default function Accommodation() {
  return (
    <div>
      {/* Hero Banner */}
      {/* Mobile Banner */}
      <div className="relative w-full aspect-[9/5] mb-12 bg-gray-900 block md:hidden">
        <Image
          src="/images/home/mobile/accommodation-banner.webp"
          alt="Fairy Knowe Accommodation Mobile Banner"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-4 drop-shadow-[0_0_8px_rgba(0,0,0,1)] hestrial-font px-4 text-center">
            Accommodation
          </h1>
        </div>
      </div>
      {/* Desktop Banner */}
      <div className="relative h-[300px] lg:h-[500px] w-full mb-12 bg-gray-900 hidden md:block">
        <Image
          src="/images/accommodation/banner.webp"
          alt="Fairy Knowe Accommodation"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[0_0_8px_rgba(0,0,0,1)] hestrial-font px-4 text-center">
            Accommodation
          </h1>
        </div>
      </div>

      {/* Description */}
      <div className="px-2">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            Nestled in the heart of Wilderness, our enchanting backpackers offers a magical retreat with room for every wandering soul.
            With cozy beds for up to 50 guests and a sprawling campsite that welcomes twice as many adventurers,
            we've created a space where lifelong friendships and unforgettable memories are made.
          </p>

          {/* Book Now Button */}
          <div className="mt-6">
            <BookNowButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <AccommodationMobileList />
        <AccommodationDesktopGrid />
      </div>

      {/* Logo Section */}
      <div className="max-w-7xl mx-auto px-4">
        <LogoSection />
      </div>
    </div>
  )
}
