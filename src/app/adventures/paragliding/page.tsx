import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import LogoSection from '@/components/ui/LogoSection'

// Define gallery images with thumbnails and full-size versions
const galleryImages = [
  {
    src: '/images/adventures/paragliding/full/adventure1.webp',
    alt: 'Paragliding Adventure 1',
    fullSize: '/images/adventures/paragliding/full/adventure1.webp'
  },
  {
    src: '/images/adventures/paragliding/full/adventure2.webp',
    alt: 'Paragliding Adventure 2',
    fullSize: '/images/adventures/paragliding/full/adventure2.webp'
  },
  {
    src: '/images/adventures/paragliding/full/adventure3.webp',
    alt: 'Paragliding Adventure 3',
    fullSize: '/images/adventures/paragliding/full/adventure3.webp'
  },
  {
    src: '/images/adventures/paragliding/full/adventure4.webp',
    alt: 'Paragliding Adventure 4',
    fullSize: '/images/adventures/paragliding/full/adventure4.webp'
  },
  {
    src: '/images/adventures/paragliding/full/adventure5.webp',
    alt: 'Paragliding Adventure 5',
    fullSize: '/images/adventures/paragliding/full/adventure5.webp'
  },
  {
    src: '/images/adventures/paragliding/full/adventure6.webp',
    alt: 'Paragliding Adventure 6',
    fullSize: '/images/adventures/paragliding/full/adventure6.webp'
  },
  {
    src: '/images/adventures/paragliding/full/adventure7.webp',
    alt: 'Paragliding Adventure 7',
    fullSize: '/images/adventures/paragliding/full/adventure7.webp'
  },
  {
    src: '/images/adventures/paragliding/full/adventure8.webp',
    alt: 'Paragliding Adventure 8',
    fullSize: '/images/adventures/paragliding/full/adventure8.webp'
  },
  {
    src: '/images/adventures/paragliding/full/adventure9.webp',
    alt: 'Paragliding Adventure 9',
    fullSize: '/images/adventures/paragliding/full/adventure9.webp'
  },
  {
    src: '/images/adventures/paragliding/full/adventure10.webp',
    alt: 'Paragliding Adventure 10',
    fullSize: '/images/adventures/paragliding/full/adventure10.webp'
  }
]

export default function ParaglidingPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images/home/mobile/paragliding-banner.webp"
        desktopSrc="/images/adventures/banners/paragliding-banner.webp"
        title="Paragliding"
      />

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
        <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
          Fly like a fairy or glide like a goblin with the power of levitation as you float through the air with expert pilots, taking in awe-inspiring views of the endless ocean, lush forests, and majestic mountains.
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
                      Duration: 15 minutes
                    </li>
                    <li className="text-center md:text-right">
                      Weather dependent
                    </li>
                    <li className="text-center md:text-right">
                      Professional instructor
                    </li>
                    <li className="text-center md:text-right">
                      All equipment included
                    </li>
                    <li className="text-center md:text-right">
                      Camera rental available
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
                      Water and snacks
                    </li>
                    <li className="text-center md:text-left">
                      Comfortable walking shoes
                    </li>
                    <li className="text-center md:text-left">
                      Camera for memories
                    </li>
                    <li className="text-center md:text-left">
                      Small backpack for essentials
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