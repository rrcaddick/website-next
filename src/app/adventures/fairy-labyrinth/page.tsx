import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import LogoSection from '@/components/ui/LogoSection'

// Define gallery images with thumbnails and full-size versions
const galleryImages = [
  {
    src: '/images/adventures/fairy-labyrinth/thumbnails/adventure1.webp',
    alt: 'Fairy Labyrinth Adventure',
    description: 'Mystical forest path',
    fullSize: '/images/adventures/fairy-labyrinth/full/adventure1.webp'
  },
  {
    src: '/images/adventures/fairy-labyrinth/thumbnails/adventure2.webp',
    alt: 'Fairy Labyrinth Experience',
    description: 'Ancient tree formations',
    fullSize: '/images/adventures/fairy-labyrinth/full/adventure2.webp'
  },
  {
    src: '/images/adventures/fairy-labyrinth/thumbnails/adventure3.webp',
    alt: 'Fairy Labyrinth Journey',
    description: 'Enchanted pathways',
    fullSize: '/images/adventures/fairy-labyrinth/full/adventure3.webp'
  },
  {
    src: '/images/adventures/fairy-labyrinth/thumbnails/adventure4.webp',
    alt: 'Fairy Labyrinth Views',
    description: 'Magical forest scenes',
    fullSize: '/images/adventures/fairy-labyrinth/full/adventure4.webp'
  },
  {
    src: '/images/adventures/fairy-labyrinth/thumbnails/adventure5.webp',
    alt: 'Fairy Labyrinth Adventure',
    description: 'Mystical forest path',
    fullSize: '/images/adventures/fairy-labyrinth/full/adventure5.webp'
  },
  {
    src: '/images/adventures/fairy-labyrinth/thumbnails/adventure6.webp',
    alt: 'Fairy Labyrinth Experience',
    description: 'Ancient tree formations',
    fullSize: '/images/adventures/fairy-labyrinth/full/adventure6.webp'
  },
  {
    src: '/images/adventures/fairy-labyrinth/thumbnails/adventure7.webp',
    alt: 'Fairy Labyrinth Journey',
    description: 'Enchanted pathways',
    fullSize: '/images/adventures/fairy-labyrinth/full/adventure7.webp'
  },
  {
    src: '/images/adventures/fairy-labyrinth/thumbnails/adventure8.webp',
    alt: 'Fairy Labyrinth Views',
    description: 'Magical forest scenes',
    fullSize: '/images/adventures/fairy-labyrinth/full/adventure8.webp'
  }
]

export default function FairyLabyrinthPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images/home/mobile/fairy-labyrinth-banner.webp"
        desktopSrc="/images/adventures/banners/fairy-labyrinth-banner.webp"
        title="Fairy Labyrinth"
      />

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            Step into a world of enchantment at the Fairy Labyrinth, a magical 1.5-km trail that winds through an ancient forest filled with towering trees and mystical formations. This easy, family-friendly walk offers a perfect blend of adventure and wonder, with winding paths that lead through a natural maze of giant tree roots and moss-covered rocks. The trail is alive with the sounds of forest birds and the gentle rustling of leaves, creating an atmosphere straight out of a fairy tale. Whether you&apos;re seeking a peaceful nature walk or a magical adventure with children, the Fairy Labyrinth provides an unforgettable experience in the heart of Wilderness&apos;s mystical forests.
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
                      Distance: 1.5 km round trip
                    </li>
                    <li className="text-center md:text-right">
                      Duration: 45-60 minutes
                    </li>
                    <li className="text-center md:text-right">
                      Difficulty: Easy
                    </li>
                    <li className="text-center md:text-right">
                      Family-friendly trail
                    </li>
                    <li className="text-center md:text-right">
                      Ancient forest setting
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
                      Water bottle
                    </li>
                    <li className="text-center md:text-left">
                      Camera for memories
                    </li>
                    <li className="text-center md:text-left">
                      Light jacket
                    </li>
                    <li className="text-center md:text-left">
                      Sense of wonder
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