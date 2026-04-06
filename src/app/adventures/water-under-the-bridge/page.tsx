import ImageGallery from "@/components/gallery/ImageGallery";
import PageHero from "@/components/ui/PageHero";
import LogoSection from "@/components/ui/LogoSection";

// Define gallery images with thumbnails and full-size versions
const galleryImages = [
  {
    src: "/images/adventures/water-under-the-bridge/gallery/thumb/1.webp",
    alt: "Water Under the Bridge Adventure",
    description: "Scenic river views",
    fullSize: "/images/adventures/water-under-the-bridge/gallery/full/1.webp",
  },
  {
    src: "/images/adventures/water-under-the-bridge/gallery/thumb/2.webp",
    alt: "Water Under the Bridge Experience",
    description: "River pathway",
    fullSize: "/images/adventures/water-under-the-bridge/gallery/full/2.webp",
  },
  {
    src: "/images/adventures/water-under-the-bridge/gallery/thumb/3.webp",
    alt: "Water Under the Bridge Journey",
    description: "Bridge views",
    fullSize: "/images/adventures/water-under-the-bridge/gallery/full/3.webp",
  },
  {
    src: "/images/adventures/water-under-the-bridge/gallery/thumb/4.webp",
    alt: "Water Under the Bridge Views",
    description: "River landscape",
    fullSize: "/images/adventures/water-under-the-bridge/gallery/full/4.webp",
  },
  {
    src: "/images/adventures/water-under-the-bridge/gallery/thumb/5.webp",
    alt: "Water Under the Bridge Adventure",
    description: "Scenic river views",
    fullSize: "/images/adventures/water-under-the-bridge/gallery/full/5.webp",
  },
  {
    src: "/images/adventures/water-under-the-bridge/gallery/thumb/6.webp",
    alt: "Water Under the Bridge Experience",
    description: "River pathway",
    fullSize: "/images/adventures/water-under-the-bridge/gallery/full/6.webp",
  },
  {
    src: "/images/adventures/water-under-the-bridge/gallery/thumb/7.webp",
    alt: "Water Under the Bridge Journey",
    description: "Bridge views",
    fullSize: "/images/adventures/water-under-the-bridge/gallery/full/7.webp",
  },
  {
    src: "/images/adventures/water-under-the-bridge/gallery/thumb/8.webp",
    alt: "Water Under the Bridge Views",
    description: "River landscape",
    fullSize: "/images/adventures/water-under-the-bridge/gallery/full/8.webp",
  },
];

export default function WaterUnderTheBridgePage() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images/adventures/water-under-the-bridge/hero/mobile.webp"
        desktopSrc="/images/adventures/water-under-the-bridge/hero/desktop.webp"
        title="Water Under the Bridge"
      />

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            Discover the enchanting Water Under the Bridge trail, a picturesque 2.5-km walk that follows the gentle flow
            of the Touw River. This easy, family-friendly path winds through lush indigenous forest, offering glimpses
            of the river&apos;s crystal-clear waters and the historic railway bridge that spans its width. The trail is
            perfect for nature lovers and photographers, with opportunities to spot local birdlife and enjoy the
            peaceful sounds of flowing water. Whether you&apos;re seeking a leisurely stroll or a moment of tranquility
            in nature, this trail provides a perfect escape into the heart of Wilderness&apos;s natural beauty.
          </p>
        </div>

        {/* Gallery */}
        <div className="w-full px-0 sm:px-4 mt-8 md:mt-12 mb-8 md:mb-12">
          <ImageGallery images={galleryImages} imagesPerPage={8} />
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
                    <li className="text-center md:text-right">Distance: 2.5 km round trip</li>
                    <li className="text-center md:text-right">Duration: 1-1.5 hours</li>
                    <li className="text-center md:text-right">Difficulty: Easy</li>
                    <li className="text-center md:text-right">Family-friendly trail</li>
                    <li className="text-center md:text-right">Historic railway bridge</li>
                  </ul>
                </div>

                {/* What to Bring */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-left">What to Bring</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li className="text-center md:text-left">Comfortable walking shoes</li>
                    <li className="text-center md:text-left">Water bottle</li>
                    <li className="text-center md:text-left">Sun protection</li>
                    <li className="text-center md:text-left">Camera for photos</li>
                    <li className="text-center md:text-left">Binoculars for bird watching</li>
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
  );
}
