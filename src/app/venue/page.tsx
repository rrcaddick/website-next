'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import PageHero from '@/components/ui/PageHero'

interface WeddingImage {
  src: string;
  alt: string;
  fullSize: string;
}

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

const weddingImages: WeddingImage[] = [
  {
    src: '/images/venue-hire/weddings/thumbnails/wedding1.webp',
    alt: 'Wedding at Fairy Knowe 1',
    fullSize: '/images/venue-hire/weddings/full/wedding1.webp'
  },
  {
    src: '/images/venue-hire/weddings/thumbnails/wedding2.webp',
    alt: 'Wedding at Fairy Knowe 2',
    fullSize: '/images/venue-hire/weddings/full/wedding2.webp'
  },
  {
    src: '/images/venue-hire/weddings/thumbnails/wedding3.webp',
    alt: 'Wedding at Fairy Knowe 3',
    fullSize: '/images/venue-hire/weddings/full/wedding3.webp'
  },
  {
    src: '/images/venue-hire/weddings/thumbnails/wedding4.webp',
    alt: 'Wedding at Fairy Knowe 4',
    fullSize: '/images/venue-hire/weddings/full/wedding4.webp'
  },
  {
    src: '/images/venue-hire/weddings/thumbnails/wedding5.webp',
    alt: 'Wedding at Fairy Knowe 5',
    fullSize: '/images/venue-hire/weddings/full/wedding5.webp'
  },
  {
    src: '/images/venue-hire/weddings/thumbnails/wedding6.webp',
    alt: 'Wedding at Fairy Knowe 6',
    fullSize: '/images/venue-hire/weddings/full/wedding6.webp'
  },
  {
    src: '/images/venue-hire/weddings/thumbnails/wedding7.webp',
    alt: 'Wedding at Fairy Knowe 7',
    fullSize: '/images/venue-hire/weddings/full/wedding7.webp'
  },
  {
    src: '/images/venue-hire/weddings/thumbnails/wedding8.webp',
    alt: 'Wedding at Fairy Knowe 8',
    fullSize: '/images/venue-hire/weddings/full/wedding8.webp'
  },
  {
    src: '/images/venue-hire/weddings/thumbnails/wedding9.webp',
    alt: 'Wedding at Fairy Knowe 9',
    fullSize: '/images/venue-hire/weddings/full/wedding9.webp'
  },
  {
    src: '/images/venue-hire/weddings/thumbnails/wedding10.webp',
    alt: 'Wedding at Fairy Knowe 10',
    fullSize: '/images/venue-hire/weddings/full/wedding10.webp'
  }
]

export default function Venue() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<WeddingImage | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const imagesPerPage = 12;
  const totalPages = Math.ceil(weddingImages.length / imagesPerPage);
  const currentImages = weddingImages.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const openImage = (image: WeddingImage, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setSelectedImageIndex(-1);
  };

  const nextImage = () => {
    if (selectedImageIndex < weddingImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
      setSelectedImage(weddingImages[selectedImageIndex + 1]);
    } else {
      // Loop back to the first image
      setSelectedImageIndex(0);
      setSelectedImage(weddingImages[0]);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
      setSelectedImage(weddingImages[selectedImageIndex - 1]);
    } else {
      // Loop to the last image
      setSelectedImageIndex(weddingImages.length - 1);
      setSelectedImage(weddingImages[weddingImages.length - 1]);
    }
  };

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
      <div className="block sm:hidden w-full max-w-full px-0">
        {eventTypes.map((event, idx) => {
          const cardRef = useRef<HTMLDivElement>(null);
  
          useEffect(() => {
            if (expandedCard === idx && cardRef.current) {
              const offset = 56; // px, adjust as needed
              const top = cardRef.current.getBoundingClientRect().top + window.scrollY - offset;
              window.scrollTo({ top, behavior: 'smooth' });
            }
          }, [expandedCard]);
  
          return (
            <div
              key={idx}
              ref={cardRef}
              className={
                `${expandedCard === idx
                  ? 'mt-4 mb-4 rounded-xl shadow-lg border overflow-hidden bg-white text-[#202635] mx-4'
                  : 'w-full max-w-full border-b-0 border-l-0 border-r-0 border-t last:border-b rounded-none shadow-none bg-gradient-to-b from-white via-white to-[#E5E7EB] text-[#202635]'}
                `
              }
              style={expandedCard === idx ? {} : { borderRadius: 0 }}
            >
              <button
                className="w-full flex flex-col items-center text-left focus:outline-none text-[#202635]"
                onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
                aria-expanded={expandedCard === idx}
              >
                <div className="py-5 w-full text-center">{event.title}</div>
              </button>
              {expandedCard === idx && (
                <div>
                  <div className="w-full aspect-square overflow-hidden rounded-t-xl rounded-b-xl">
                    <Image
                      src={event.imageMobile || event.image}
                      alt={event.title}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="px-4 pb-4 pt-2">
                    <p className="mb-4 text-center text-[#202635] text-sm mt-4">{event.description}</p>
                    <ul className="space-y-1 text-gray-600 text-left flex-1">
                      {event.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm">
                          <svg className="h-4 w-4 text-[#073F3A] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-900">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Desktop: original grid and display */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {eventTypes.map((event, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="relative aspect-square">
                <Image
                  src={event.imageMobile || event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
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
        <div className="mt-16 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Wedding Gallery
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {currentImages.map((image, index) => (
              <div 
                key={index}
                className="relative aspect-square cursor-pointer group"
                onClick={() => openImage(image, currentPage * imagesPerPage + index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-lg" />
              </div>
            ))}
          </div>
          
          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={prevPage}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeImage}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col">
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
            >
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative flex-1">
              <Image
                src={selectedImage.fullSize}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={prevImage}
                className="p-3 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
              >
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-white text-sm">
                {selectedImageIndex + 1} of {weddingImages.length}
              </span>
              <button
                onClick={nextImage}
                className="p-3 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
              >
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 