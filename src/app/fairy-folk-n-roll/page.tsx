import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export default function FairyFolkNRoll() {
  return (
    <div>
      <PageHero
        mobileSrc="/images/ffr/ffr-banner.webp"
        desktopSrc="/images/ffr/ffr-banner.webp"
        title="Fairy Folk 'n Roll"
      />

      {/* Description */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">Fairy Folk 'n Roll</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto px-4 text-gray-600 dark:text-gray-300">
          Welcome to our vibrant music community where local talent meets global audiences through our YouTube channel.
          We capture the magic of live performances and blend it with the natural beauty of our enchanted milkwood
          forest, creating a unique musical experience that celebrates both artistry and nature.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/images/ffr/ffr-live-music.webp"
                alt="Live Music Events"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Live Music Sessions</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Experience the raw energy and authentic sound of local artists in our professionally recorded live
                sessions. Each performance is carefully captured to preserve the intimate atmosphere and musical
                excellence that defines our venue.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  Professional audio and video recording
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  Intimate acoustic performances
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  Showcasing local talent
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/images/ffr/ffr-youtube.webp"
                alt="Our Venue"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Our YouTube Channel</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Subscribe to our YouTube channel to discover the diverse musical talent of the Garden Route. From folk
                and acoustic to indie rock and world music, our channel is a platform for artists to reach audiences
                worldwide while capturing the unique atmosphere of our backpackers.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  Regular new content
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  High-quality production
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  Behind-the-scenes content
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">Be Part of Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Are you a musician looking to showcase your talent? We're always excited to feature new artists in our live
            sessions. Join our growing community of musicians and reach audiences worldwide through our YouTube channel.
          </p>
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            <Link
              href="/booking"
              className="inline-block bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="#"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Our Channel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
