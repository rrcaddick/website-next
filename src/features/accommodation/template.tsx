import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import BookNowButton from '@/components/ui/BookNowButton'
import LogoSection from '@/components/ui/LogoSection'
import type { AccommodationContent } from './types'

interface Props {
  content: AccommodationContent
}

export default function AccommodationPageTemplate({ content }: Props) {
  const {
    title,
    description,
    hero,
    gallery,
    imagesPerPage = 8,
    whatsIncluded,
    sharedFacilities,
    rulesOfTheForest,
  } = content

  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc={hero.mobileSrc}
        desktopSrc={hero.desktopSrc}
        title={title}
      />

      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            {description}
          </p>

          <div className="mt-6">
            <BookNowButton />
          </div>
        </div>

        <div className="w-full px-0 sm:px-4 mt-8 md:mt-12 mb-8 md:mb-12">
          <ImageGallery images={gallery} imagesPerPage={imagesPerPage} />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="mt-8 sm:mt-12 mb-8 sm:mb-12">
            <div className="max-w-6xl mx-auto">

              {/* Mobile order: What's Included → Shared Facilities → Rules of the Forest */}
              <div className="grid grid-cols-1 gap-6 sm:hidden">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-center">What&apos;s Included</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs">
                    {whatsIncluded.map((item) => (
                      <p key={item} className="text-center">{item}</p>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-center">Shared Facilities</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs">
                    {sharedFacilities.map((item) => (
                      <p key={item} className="text-center">{item}</p>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-center">Rules of the Forest</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs">
                    {rulesOfTheForest.map((item) => (
                      <p key={item} className="text-center">{item}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop order: What's Included → Rules of the Forest → Shared Facilities */}
              <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center sm:text-left">
                    What&apos;s Included
                  </h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    {whatsIncluded.map((item) => (
                      <p key={item} className="text-center sm:text-left">{item}</p>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">
                    Rules of the Forest
                  </h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    {rulesOfTheForest.map((item) => (
                      <p key={item} className="text-center">{item}</p>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center sm:text-right">
                    Shared Facilities
                  </h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    {sharedFacilities.map((item) => (
                      <p key={item} className="text-center sm:text-right">{item}</p>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-16 mb-8">
            <LogoSection />
          </div>
        </div>
      </div>
    </div>
  )
}
