import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/ui/PageHero'
import EntertainmentMobileCards from '@/components/features/entertainment/EntertainmentMobileCards'
import { events } from '@/components/features/entertainment/data'

export default function Entertainment() {
  return (
    <div>
      <PageHero
        mobileSrc="/images/home/mobile/entertainment-banner.webp"
        desktopSrc="/images/entertainment/entertainment-banner.webp"
        title="Entertainment"
      />

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            From magical nights with all sorts of musical delights to whimsical days spent hunting for treasure at the fairy family market of leisure, there's always a sprinkle of wonder waiting at the Knowe for your pleasure.
          </p>
        </div>
      </div>

      {/* Main Content */}
      {/* Mobile: button list with expandable cards */}
      <EntertainmentMobileCards />
      {/* Desktop: original grid and display */}
      <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {events.map((event, index) => (
          <div key={index} className="bg-card-light dark:bg-card-dark rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-[256px]">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{event.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
              <p className="text-primary font-semibold">{event.schedule}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Want to Perform Section */}
      <div className="mt-16 text-center px-4">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">Want to Perform?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          We're always looking for talented musicians to join our lineup.
          Contact us to discuss performance opportunities.
        </p>
        <Link
          href="/booking"
          className="inline-block bg-[#0E7D73] hover:bg-[#073F3A] text-[#C9DD94] hover:text-[#00FF7F] px-8 py-3 rounded-lg transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  )
}
