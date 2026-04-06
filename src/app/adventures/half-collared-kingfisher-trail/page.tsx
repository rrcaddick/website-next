import ImageGallery from "@/components/gallery/ImageGallery";
import PageHero from "@/components/ui/PageHero";
import LogoSection from "@/components/ui/LogoSection";

// Define the gallery images
const galleryImages = [
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/1.webp",
    alt: "Half Collared Kingfisher Trail 1",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/1.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/2.webp",
    alt: "Half Collared Kingfisher Trail 2",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/2.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/3.webp",
    alt: "Half Collared Kingfisher Trail 3",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/3.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/4.webp",
    alt: "Half Collared Kingfisher Trail 4",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/4.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/5.webp",
    alt: "Half Collared Kingfisher Trail 5",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/5.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/6.webp",
    alt: "Half Collared Kingfisher Trail 6",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/6.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/7.webp",
    alt: "Half Collared Kingfisher Trail 7",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/7.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/8.webp",
    alt: "Half Collared Kingfisher Trail 8",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/8.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/9.webp",
    alt: "Half Collared Kingfisher Trail 9",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/9.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/10.webp",
    alt: "Half Collared Kingfisher Trail 10",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/10.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/11.webp",
    alt: "Half Collared Kingfisher Trail 11",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/11.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/12.webp",
    alt: "Half Collared Kingfisher Trail 12",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/12.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/13.webp",
    alt: "Half Collared Kingfisher Trail 13",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/13.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/14.webp",
    alt: "Half Collared Kingfisher Trail 14",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/14.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/15.webp",
    alt: "Half Collared Kingfisher Trail 15",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/15.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/16.webp",
    alt: "Half Collared Kingfisher Trail 16",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/16.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/17.webp",
    alt: "Half Collared Kingfisher Trail 17",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/17.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/18.webp",
    alt: "Half Collared Kingfisher Trail 18",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/18.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/19.webp",
    alt: "Half Collared Kingfisher Trail 19",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/19.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/20.webp",
    alt: "Half Collared Kingfisher Trail 20",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/20.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/21.webp",
    alt: "Half Collared Kingfisher Trail 21",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/21.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/22.webp",
    alt: "Half Collared Kingfisher Trail 22",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/22.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/23.webp",
    alt: "Half Collared Kingfisher Trail 23",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/23.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/24.webp",
    alt: "Half Collared Kingfisher Trail 24",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/24.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/25.webp",
    alt: "Half Collared Kingfisher Trail 25",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/25.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/26.webp",
    alt: "Half Collared Kingfisher Trail 26",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/26.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/27.webp",
    alt: "Half Collared Kingfisher Trail 27",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/27.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/28.webp",
    alt: "Half Collared Kingfisher Trail 28",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/28.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/29.webp",
    alt: "Half Collared Kingfisher Trail 29",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/29.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/30.webp",
    alt: "Half Collared Kingfisher Trail 30",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/30.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/31.webp",
    alt: "Half Collared Kingfisher Trail 31",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/31.webp",
  },
  {
    src: "/images/adventures/half-collared-kingfisher-trail/gallery/thumb/32.webp",
    alt: "Half Collared Kingfisher Trail 32",
    fullSize: "/images/adventures/half-collared-kingfisher-trail/gallery/full/32.webp",
  },
];

export default function HalfCollaredKingfisherTrailPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images/adventures/half-collared-kingfisher-trail/hero/mobile.webp"
        desktopSrc="/images/adventures/half-collared-kingfisher-trail/hero/desktop.webp"
        title="Half Collared Kingfisher Trail"
      />

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            Embark on a delightful 7.6-km out-and-back trail that winds its way through a serene, shaded wonderland.
            This moderately easy route, typically completed in around 3 hours, invites you to stroll along wooden
            boardwalk that meanders its way to a magical waterfall, perfect for a refreshing swim and moment of bliss.
            Popular among adventurers, runners, and wanderers alike, this charming path brims with life, offering a
            likely chance to cross paths with friendly folk as you explore its natural splendor.
          </p>
        </div>

        {/* Gallery */}
        <div className="w-full px-0 sm:px-4 mt-8 md:mt-12 mb-8 md:mb-12">
          <ImageGallery images={galleryImages} imagesPerPage={8} />
        </div>

        {/* Safety Information - Replacing Features Section */}
        <div className="mt-8 md:mt-12 mb-8 md:mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* General Info Section */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-right">General Info</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li className="text-center md:text-right">Distance: 7.6 km out-and-back</li>
                  <li className="text-center md:text-right">Duration: 3 hours</li>
                  <li className="text-center md:text-right">Difficulty: Moderate</li>
                  <li className="text-center md:text-right">Wooden boardwalk sections</li>
                  <li className="text-center md:text-right">Waterfall at the end</li>
                </ul>
              </div>

              {/* What to Bring */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:shadow-none">
                <h3 className="text-lg font-semibold mb-4 dark:text-white text-center md:text-left">What to Bring</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li className="text-center md:text-left">Comfortable walking shoes</li>
                  <li className="text-center md:text-left">Water and snacks</li>
                  <li className="text-center md:text-left">Sunscreen and hat</li>
                  <li className="text-center md:text-left">Camera for memories</li>
                  <li className="text-center md:text-left">Swimwear if planning to swim</li>
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
  );
}
