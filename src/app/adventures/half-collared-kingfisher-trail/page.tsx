'use client'

import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import LogoSection from '@/components/ui/LogoSection'

// Define the gallery images
const galleryImages = [
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf1.webp',
    alt: 'Half Collared Kingfisher Trail 1',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf1.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf2.webp',
    alt: 'Half Collared Kingfisher Trail 2',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf2.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf3.webp',
    alt: 'Half Collared Kingfisher Trail 3',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf3.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf4.webp',
    alt: 'Half Collared Kingfisher Trail 4',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf4.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf5.webp',
    alt: 'Half Collared Kingfisher Trail 5',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf5.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf6.webp',
    alt: 'Half Collared Kingfisher Trail 6',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf6.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf7.webp',
    alt: 'Half Collared Kingfisher Trail 7',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf7.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf8.webp',
    alt: 'Half Collared Kingfisher Trail 8',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf8.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf9.webp',
    alt: 'Half Collared Kingfisher Trail 9',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf9.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf10.webp',
    alt: 'Half Collared Kingfisher Trail 10',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf10.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf11.webp',
    alt: 'Half Collared Kingfisher Trail 11',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf11.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf12.webp',
    alt: 'Half Collared Kingfisher Trail 12',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf12.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf13.webp',
    alt: 'Half Collared Kingfisher Trail 13',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf13.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf14.webp',
    alt: 'Half Collared Kingfisher Trail 14',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf14.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf15.webp',
    alt: 'Half Collared Kingfisher Trail 15',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf15.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf16.webp',
    alt: 'Half Collared Kingfisher Trail 16',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf16.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf17.webp',
    alt: 'Half Collared Kingfisher Trail 17',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf17.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf18.webp',
    alt: 'Half Collared Kingfisher Trail 18',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf18.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf19.webp',
    alt: 'Half Collared Kingfisher Trail 19',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf19.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf20.webp',
    alt: 'Half Collared Kingfisher Trail 20',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf20.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf21.webp',
    alt: 'Half Collared Kingfisher Trail 21',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf21.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf22.webp',
    alt: 'Half Collared Kingfisher Trail 22',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf22.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf23.webp',
    alt: 'Half Collared Kingfisher Trail 23',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf23.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf24.webp',
    alt: 'Half Collared Kingfisher Trail 24',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf24.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf25.webp',
    alt: 'Half Collared Kingfisher Trail 25',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf25.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf26.webp',
    alt: 'Half Collared Kingfisher Trail 26',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf26.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf27.webp',
    alt: 'Half Collared Kingfisher Trail 27',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf27.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf28.webp',
    alt: 'Half Collared Kingfisher Trail 28',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf28.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf29.webp',
    alt: 'Half Collared Kingfisher Trail 29',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf29.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf30.webp',
    alt: 'Half Collared Kingfisher Trail 30',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf30.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf31.webp',
    alt: 'Half Collared Kingfisher Trail 31',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf31.webp'
  },
  {
    src: '/images/adventures/half-collared-kingfisher-trail/thumbnails/kf32.webp',
    alt: 'Half Collared Kingfisher Trail 32',
    fullSize: '/images/adventures/half-collared-kingfisher-trail/full/kf32.webp'
  }
]

export default function HalfCollaredKingfisherTrailPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images/home/mobile/half-collared-kingfisher-trail-banner.webp"
        desktopSrc="/images/adventures/banners/half-collared-kingfisher-trail-banner.webp"
        title="Half Collared Kingfisher Trail"
      />

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
        <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
          Embark on a delightful 7.6-km out-and-back trail that winds its way through a serene, shaded wonderland. This moderately easy route, typically completed in around 3 hours, invites you to stroll along wooden boardwalk that meanders its way to a magical waterfall, perfect for a refreshing swim and moment of bliss. Popular among adventurers, runners, and wanderers alike, this charming path brims with life, offering a likely chance to cross paths with friendly folk as you explore its natural splendor.
          </p>
        </div>

        {/* Gallery */}
        <div className="w-full px-0 sm:px-4 mt-8 md:mt-12 mb-8 md:mb-12">
          <ImageGallery 
            images={galleryImages} 
            imagesPerPage={8} 
          />
        </div>

        {/* Safety Information - Replacing Features Section */}
        <div className="mt-8 md:mt-12 mb-8 md:mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* General Info Section */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-right">General Info</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li className="text-center md:text-right">
                    Distance: 7.6 km out-and-back
                  </li>
                  <li className="text-center md:text-right">
                    Duration: 3 hours
                  </li>
                  <li className="text-center md:text-right">
                    Difficulty: Moderate
                  </li>
                  <li className="text-center md:text-right">
                    Wooden boardwalk sections
                  </li>
                  <li className="text-center md:text-right">
                    Waterfall at the end
                  </li>
                </ul>
              </div>
              
              {/* What to Bring */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-left">What to Bring</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li className="text-center md:text-left">
                    Comfortable walking shoes
                  </li>
                  <li className="text-center md:text-left">
                    Water and snacks
                  </li>
                  <li className="text-center md:text-left">
                    Sunscreen and hat
                  </li>
                  <li className="text-center md:text-left">
                    Camera for memories
                  </li>
                  <li className="text-center md:text-left">
                    Swimwear if planning to swim
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
      )
    }