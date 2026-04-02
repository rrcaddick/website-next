import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import LogoSection from '@/components/ui/LogoSection'

// Define gallery images with thumbnails and full-size versions
const galleryImages = [
  {
    src: '/images/adventures/ancient-archives/thumbnails/adventure1.webp',
    alt: 'Ancient Archives Adventure',
    description: 'Historic library views',
    fullSize: '/images/adventures/ancient-archives/full/adventure1.webp'
  },
  {
    src: '/images/adventures/ancient-archives/thumbnails/adventure2.webp',
    alt: 'Ancient Archives Experience',
    description: 'Book collection',
    fullSize: '/images/adventures/ancient-archives/full/adventure2.webp'
  },
  {
    src: '/images/adventures/ancient-archives/thumbnails/adventure3.webp',
    alt: 'Ancient Archives Journey',
    description: 'Reading spaces',
    fullSize: '/images/adventures/ancient-archives/full/adventure3.webp'
  },
  {
    src: '/images/adventures/ancient-archives/thumbnails/adventure4.webp',
    alt: 'Ancient Archives Views',
    description: 'Library atmosphere',
    fullSize: '/images/adventures/ancient-archives/full/adventure4.webp'
  },
  {
    src: '/images/adventures/ancient-archives/thumbnails/adventure5.webp',
    alt: 'Ancient Archives Adventure',
    description: 'Historic library views',
    fullSize: '/images/adventures/ancient-archives/full/adventure5.webp'
  },
  {
    src: '/images/adventures/ancient-archives/thumbnails/adventure6.webp',
    alt: 'Ancient Archives Experience',
    description: 'Book collection',
    fullSize: '/images/adventures/ancient-archives/full/adventure6.webp'
  },
  {
    src: '/images/adventures/ancient-archives/thumbnails/adventure7.webp',
    alt: 'Ancient Archives Journey',
    description: 'Reading spaces',
    fullSize: '/images/adventures/ancient-archives/full/adventure7.webp'
  },
  {
    src: '/images/adventures/ancient-archives/thumbnails/adventure8.webp',
    alt: 'Ancient Archives Views',
    description: 'Library atmosphere',
    fullSize: '/images/adventures/ancient-archives/full/adventure8.webp'
  }
]

export default function AncientArchivesPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images/home/mobile/ancient-archives-banner.webp"
        desktopSrc="/images/adventures/banners/ancient-archives-banner.webp"
        title="Ancient Archives"
      />

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
          Feeling a little lazy, or perhaps things are looking rather rainy? Explore the boundless worlds within our endless library. Trade in your finished tale for another, and let your journey continue with the pages of a new adventure waiting to unfold. With stories for every soul and swaps to keep the exploration alive, our library is your perfect rainy-day retreat.
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
          {/* Safety Information - Replacing Features Section */}
          <div className="mt-8 md:mt-12 mb-8 md:mb-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* General Info Section */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-right">General Info</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li className="text-center md:text-right">
                      Open daily
                    </li>
                    <li className="text-center md:text-right">
                      Quiet reading space
                    </li>
                    <li className="text-center md:text-right">
                      Free access
                    </li>
                    <li className="text-center md:text-right">
                      Historical collection
                    </li>
                    <li className="text-center md:text-right">
                      Travel resources
                    </li>
                  </ul>
                </div>
                
                {/* What to Bring */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-left">What to Bring</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li className="text-center md:text-left">
                      Reading glasses
                    </li>
                    <li className="text-center md:text-left">
                      Notebook
                    </li>
                    <li className="text-center md:text-left">
                      Camera for photos
                    </li>
                    <li className="text-center md:text-left">
                      Water bottle
                    </li>
                    <li className="text-center md:text-left">
                      Curiosity
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