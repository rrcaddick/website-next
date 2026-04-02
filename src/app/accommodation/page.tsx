import BookNowButton from '@/components/ui/BookNowButton'
import LogoSection from '@/components/ui/LogoSection'
import AccommodationMobileList from '@/components/features/accommodation/AccommodationMobileList'
import AccommodationDesktopGrid from '@/components/features/accommodation/AccommodationDesktopGrid'
import PageHero from '@/components/ui/PageHero'

export default function Accommodation() {
  return (
    <div>
      <PageHero
        mobileSrc="/images/home/mobile/accommodation-banner.webp"
        desktopSrc="/images/accommodation/banner.webp"
        title="Accommodation"
      />

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
