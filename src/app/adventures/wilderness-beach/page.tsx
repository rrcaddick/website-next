import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import LogoSection from '@/components/ui/LogoSection'

// Define the gallery images
const galleryImages = [
  {
    src: '/images/adventures/wilderness-beach/thumbnails/adventure1.webp',
    alt: 'Wilderness Beach Adventure 1',
    fullSize: '/images/adventures/wilderness-beach/full/adventure1.webp'
  },
  {
    src: '/images/adventures/wilderness-beach/thumbnails/adventure2.webp',
    alt: 'Wilderness Beach Adventure 2',
    fullSize: '/images/adventures/wilderness-beach/full/adventure2.webp'
  },
  {
    src: '/images/adventures/wilderness-beach/thumbnails/adventure3.webp',
    alt: 'Wilderness Beach Adventure 3',
    fullSize: '/images/adventures/wilderness-beach/full/adventure3.webp'
  },
  {
    src: '/images/adventures/wilderness-beach/thumbnails/adventure4.webp',
    alt: 'Wilderness Beach Adventure 4',
    fullSize: '/images/adventures/wilderness-beach/full/adventure4.webp'
  },
  {
    src: '/images/adventures/wilderness-beach/thumbnails/adventure5.webp',
    alt: 'Wilderness Beach Adventure 5',
    fullSize: '/images/adventures/wilderness-beach/full/adventure5.webp'
  },
  {
    src: '/images/adventures/wilderness-beach/thumbnails/adventure6.webp',
    alt: 'Wilderness Beach Adventure 6',
    fullSize: '/images/adventures/wilderness-beach/full/adventure6.webp'
  },
  {
    src: '/images/adventures/wilderness-beach/thumbnails/adventure7.webp',
    alt: 'Wilderness Beach Adventure 7',
    fullSize: '/images/adventures/wilderness-beach/full/adventure7.webp'
  },
  {
    src: '/images/adventures/wilderness-beach/thumbnails/adventure8.webp',
    alt: 'Wilderness Beach Adventure 8',
    fullSize: '/images/adventures/wilderness-beach/full/adventure8.webp'
  }
]

export default function WildernessBeachPage() {
  return (
    <div>
      <PageHero
        mobileSrc="/images/home/mobile/wilderness-beach-banner.webp"
        desktopSrc="/images/adventures/banners/wilderness-beach-banner.webp"
        title="Wilderness Beach"
      />

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
        <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            Bask in the sun on the golden shores of Wilderness Beach, a Blue Flag gem renowned for its beauty and charm. Whether you&apos;re diving for a volleyball, soaking up the sunshine, wafting through the waters, or crafting a kingdom of sandcastles, this beach promises a day filled with joy and seaside smiles.
          </p>
        </div>

        {/* Gallery */}
        <div className="mt-8 md:mt-12 mb-8 md:mb-12">
          <ImageGallery 
            images={galleryImages} 
            imagesPerPage={8} 
          />
        </div>

        {/* Adventure Safely Section */}
        <div className="mt-8 md:mt-12 mb-8 md:mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* General Info Section */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-right">General Info</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li className="text-center md:text-right">
                    Blue Flag beach status
                  </li>
                  <li className="text-center md:text-right">
                    Lifeguards on duty
                  </li>
                  <li className="text-center md:text-right">
                    Perfect for swimming
                  </li>
                  <li className="text-center md:text-right">
                    Beach volleyball available
                  </li>
                  <li className="text-center md:text-right">
                    Stunning sunset views
                  </li>
                </ul>
              </div>
              
              {/* What to Bring */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-left">What to Bring</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li className="text-center md:text-left">
                    Sunscreen and hat
                  </li>
                  <li className="text-center md:text-left">
                    Beach towels
                  </li>
                  <li className="text-center md:text-left">
                    Water bottles
                  </li>
                  <li className="text-center md:text-left">
                    Beach games
                  </li>
                  <li className="text-center md:text-left">
                    Camera
                  </li>
                </ul>
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