import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import LogoSection from '@/components/ui/LogoSection'

// Define gallery images with thumbnails and full-size versions
const galleryImages = [
  {
    src: '/images/adventures/brown-hooded-kingfisher-trail/thumbnails/brownhood1.webp',
    alt: 'Brown Hooded Kingfisher Trail Adventure',
    fullSize: '/images/adventures/brown-hooded-kingfisher-trail/full/brownhood1.webp'
  },
  {
    src: '/images/adventures/brown-hooded-kingfisher-trail/thumbnails/brownhood2.webp',
    alt: 'Brown Hooded Kingfisher Trail Experience',
    fullSize: '/images/adventures/brown-hooded-kingfisher-trail/full/brownhood2.webp'
  },
  {
    src: '/images/adventures/brown-hooded-kingfisher-trail/thumbnails/brownhood3.webp',
    alt: 'Brown Hooded Kingfisher Trail Journey',
    fullSize: '/images/adventures/brown-hooded-kingfisher-trail/full/brownhood3.webp'
  },
  {
    src: '/images/adventures/brown-hooded-kingfisher-trail/thumbnails/brownhood4.webp',
    alt: 'Brown Hooded Kingfisher Trail Views',
    fullSize: '/images/adventures/brown-hooded-kingfisher-trail/full/brownhood4.webp'
  },
  {
    src: '/images/adventures/brown-hooded-kingfisher-trail/thumbnails/brownhood5.webp',
    alt: 'Brown Hooded Kingfisher Trail Additional View 1',
    fullSize: '/images/adventures/brown-hooded-kingfisher-trail/full/brownhood5.webp'
  },
  {
    src: '/images/adventures/brown-hooded-kingfisher-trail/thumbnails/brownhood6.webp',
    alt: 'Brown Hooded Kingfisher Trail Additional View 2',
    fullSize: '/images/adventures/brown-hooded-kingfisher-trail/full/brownhood6.webp'
  },
  {
    src: '/images/adventures/brown-hooded-kingfisher-trail/thumbnails/brownhood7.webp',
    alt: 'Brown Hooded Kingfisher Trail Additional View 3',
    fullSize: '/images/adventures/brown-hooded-kingfisher-trail/full/brownhood7.webp'
  },
  {
    src: '/images/adventures/brown-hooded-kingfisher-trail/thumbnails/brownhood8.webp',
    alt: 'Brown Hooded Kingfisher Trail Additional View 4',
    fullSize: '/images/adventures/brown-hooded-kingfisher-trail/full/brownhood8.webp'
  },
  {
    src: '/images/adventures/brown-hooded-kingfisher-trail/thumbnails/brownhood9.webp',
    alt: 'Brown Hooded Kingfisher Trail Additional View 5',
    fullSize: '/images/adventures/brown-hooded-kingfisher-trail/full/brownhood9.webp'
  },
  {
    src: '/images/adventures/brown-hooded-kingfisher-trail/thumbnails/brownhood10.webp',
    alt: 'Brown Hooded Kingfisher Trail Additional View 6',
    fullSize: '/images/adventures/brown-hooded-kingfisher-trail/full/brownhood10.webp'
  },
  {
    src: '/images/adventures/brown-hooded-kingfisher-trail/thumbnails/brownhood11.webp',
    alt: 'Brown Hooded Kingfisher Trail Additional View 7',
    fullSize: '/images/adventures/brown-hooded-kingfisher-trail/full/brownhood11.webp'
  },
  {
    src: '/images/adventures/brown-hooded-kingfisher-trail/thumbnails/brownhood12.webp',
    alt: 'Brown Hooded Kingfisher Trail Additional View 8',
    fullSize: '/images/adventures/brown-hooded-kingfisher-trail/full/brownhood12.webp'
  },
  {
    src: '/images/adventures/brown-hooded-kingfisher-trail/thumbnails/brownhood13.webp',
    alt: 'Brown Hooded Kingfisher Trail Additional View 9',
    fullSize: '/images/adventures/brown-hooded-kingfisher-trail/full/brownhood13.webp'
  }
]

export default function BrownHoodedKingfisherTrailPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images/home/mobile/brown-hooded-kingfisher-trail-banner.webp"
        desktopSrc="/images/adventures/banners/brown-hooded-kingfisher-trail-banner.webp"
        title="Brown Hooded Kingfisher Trail"
      />

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
        <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
          Embark on a teeming 4.2-km out-and-back journey along the delightful Duiwe River. This quick and easy trail, typically completed in about 1 hour and 20 minutes, invites adventurers on a short and sweet stroll along the stream. Meandering across the river on well-crafted crossings, the path leads to a little rockpool waterfall - a refreshing haven at the trail's end. While beloved by many wonderful wanderers, moments of quiet solitude still await those who venture during the trail's calmer hours.
          </p>
        </div>

        {/* Gallery */}
        <div className="w-full px-0 sm:px-4 mt-8 md:mt-12 mb-8 md:mb-12">
          <ImageGallery images={galleryImages} />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* General Info Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
              <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-right">General Info</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li className="text-center md:text-right">
                  Distance: 4.2 km out-and-back
                </li>
                <li className="text-center md:text-right">
                  Duration: 1.5 hours
                </li>
                <li className="text-center md:text-right">
                  Difficulty: Easy
                </li>
                <li className="text-center md:text-right">
                  River crossings
                </li>
                <li className="text-center md:text-right">
                  Rockpool waterfall
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

        {/* Logo Section */}
        <div className="mt-12 mb-8">
          <LogoSection />
        </div>
      </div>
    </div>
  )
} 