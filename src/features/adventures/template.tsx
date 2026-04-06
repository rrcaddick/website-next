import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import LogoSection from '@/components/ui/LogoSection'
import type { AdventureContent } from './types'

interface Props {
  content: AdventureContent
}

export default function AdventurePageTemplate({ content }: Props) {
  const {
    title,
    description,
    hero,
    gallery,
    imagesPerPage = 8,
    generalInfo,
    whatToBring,
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
        </div>

        <div className="w-full px-0 sm:px-4 mt-8 md:mt-12 mb-8 md:mb-12">
          <ImageGallery images={gallery} imagesPerPage={imagesPerPage} />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="mt-8 md:mt-12 mb-8 md:mb-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-right">
                    General Info
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    {generalInfo.map((item) => (
                      <li key={item} className="text-center md:text-right">{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-left">
                    What to Bring
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    {whatToBring.map((item) => (
                      <li key={item} className="text-center md:text-left">{item}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 mb-8">
          <LogoSection />
        </div>
      </div>
    </div>
  )
}
