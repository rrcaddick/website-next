import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import VenueMobileCards from '@/components/features/venue/VenueMobileCards'
import WeddingGallery from '@/components/features/venue/WeddingGallery'

const eventTypes = [
  {
    title: 'Weddings',
    description: 'Host your special day in our enchanted fairy forest. Entwine yourselves in a space perfect for intimate ceremonies and receptions entangled in the trees.',
    features: [
      'Garden ceremony space',
      'Reception area',
      'Catering options',
      'Accommodation for guests',
      'Wedding planning assistance',
      'Beautiful photo opportunities'
    ],
    image: '/images/venue-hire/weddings-card.webp',
    imageMobile: '/images/venue-hire/mobile/weddings-card.webp'
  },
  {
    title: 'Private Parties',
    description: 'Celebrate lifes most treasured birthdays, anniversaries, or special occasions with a touch of fairy magic.',
    features: [
      'Indoor and outdoor venues',
      'Bar service available',
      'Sound system',
      'Flexible seating arrangements',
      'Decorating options',
      'Catering packages'
    ],
    image: '/images/venue-hire/private-parties-card.webp',
    imageMobile: '/images/venue-hire/mobile/private-parties-card.webp'
  },
  {
    title: 'Corporate Events',
    description: 'With the ideal setting  to inspire collaboration and creativity, our venue provides a calming backdrop for productive corporate gatherings.',
    features: [
      'Meeting spaces',
      'Team building activities',
      'Adventure packages',
      'Accommodation options',
      'Catering services',
      'Wi-Fi and basic equipment'
    ],
    image: '/images/venue-hire/corporate-events-card.webp',
    imageMobile: '/images/venue-hire/mobile/corporate-events-card.webp'
  },
  {
    title: 'Film Crews',
    description: 'A magical setting for your next film or photo shoot. From fantasy flicks to nature documentaries, our location offers diverse and dense backdrops.',
    features: [
      'Diverse natural settings',
      'Power supply points',
      'Equipment storage',
      'Crew accommodation',
      'Flexible shooting hours',
      'Dedicated crew facilities'
    ],
    image: '/images/venue-hire/film-crews-card.webp',
    imageMobile: '/images/venue-hire/mobile/film-crews-card.webp'
  },
  {
    title: 'Skill Trades & Workshops',
    description: 'Share, learn, or host hands-on workshops and skill trades in a creative, collaborative environment. Perfect for artists, makers, and lifelong learners.',
    features: [
      'Artisan workshops',
      'Skill-sharing sessions',
      'Craft & DIY events',
      'Guest instructors welcome',
      'Flexible indoor/outdoor spaces',
      'Community-driven learning'
    ],
    image: '/images/venue-hire/skill-trades-workshops-card.webp',
    imageMobile: '/images/venue-hire/mobile/skill-trades-workshops-card.webp'
  },
  {
    title: 'Expo Events',
    description: 'Host your next trade show, exhibition, or product launch in our versatile event space. Perfect for showcasing products, networking, and creating memorable brand experiences.',
    features: [
      'Spacious exhibition areas',
      'Professional lighting & sound',
      'Customizable booth layouts',
      'Catering services available',
      'High-speed WiFi',
      'On-site support staff'
    ],
    image: '/images/venue-hire/expo-events-card.webp',
    imageMobile: '/images/venue-hire/mobile/expo-events-card.webp'
  }
]

export default function Venue() {
  return (
    <div>
      <PageHero
        mobileSrc="/images/home/mobile/venue-hire-banner.webp"
        desktopSrc="/images/venue-hire/venue-hire-banner.webp"
        title="Venue Hire"
      />

      {/* Content Section */}
      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            Whether you&apos;re planning an intimate wedding amongst the trees, a captivating film shoot for the next Peter Pan, a corporate retreat where nature fuels inspiration, or a special celebration glowing with fairy-tale splendor, Fairy Knowe Backpackers Lodge opens the door to magical moments. Nestled against a backdrop of natural beauty, this rustic haven of enchanting wonder creates unforgettable memories for all those who wander.
          </p>
        </div>
      </div>

      {/* Mobile: button list with expandable cards */}
      <VenueMobileCards eventTypes={eventTypes} />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Desktop: original grid and display */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {eventTypes.map((event, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-square">
                <Image
                  src={event.imageMobile || event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {event.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4">
                  {event.description}
                </p>
                <ul className="space-y-2">
                  {event.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-600 dark:text-gray-300 text-sm sm:text-base"
                    >
                      <svg className="h-4 w-4 text-[#073F3A] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Wedding Gallery */}
        <WeddingGallery />
      </div>
    </div>
  )
}
