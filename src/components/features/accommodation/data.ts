export type RoomType = {
  id: number
  name: string
  description: string
  image: string
  mobileImage?: string
  features: string[]
}

export const roomTypes: RoomType[] = [
  {
    id: 1,
    name: 'Camping',
    description: 'Bring your own tent and enjoy our beautiful campsite with access to shared facilities.',
    image: '/images/accommodation/camping-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/camping-card.webp',
    features: ['Shared bathroom facilities', 'Kitchen access', 'Sunny or shaded camping grounds']
  },
  {
    id: 2,
    name: 'Safari Tent',
    description: 'Experience glamping in our comfortable safari tent, perfect for those who want to be close to nature.',
    image: '/images/accommodation/safari-tent-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/safari-tent-card.webp',
    features: ['Double bed', 'Shared bathroom facilities', 'Electricity']
  },
  {
    id: 3,
    name: 'Gypsy Caravan',
    description: 'Stay in our unique and charming gypsy caravan for a truly magical experience.',
    image: '/images/accommodation/gypsy-caravan-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/gypsy-caravan-card.webp',
    features: ['Double bed + two sleeper couches', 'Secluded privacy', 'Electricity']
  },
  {
    id: 4,
    name: 'Mixed Dorm',
    description: 'Comfortable bunk beds in our mixed dormitory, perfect for solo travelers and backpackers.',
    image: '/images/accommodation/mixed-dorm-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/mixed-dorm-card.webp',
    features: ['Bunk beds', 'Shared bathroom facilities', 'Towels available']
  },
  {
    id: 5,
    name: 'Twin Room',
    description: 'Cozy room with two single beds, ideal for friends traveling together.',
    image: '/images/accommodation/twin-room-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/twin-room-card.webp',
    features: ['Two single beds', 'Shared bathroom facilities', 'Fresh linen']
  },
  {
    id: 6,
    name: 'Family Room',
    description: 'Spacious room perfect for families, featuring multiple beds and shared facilities.',
    image: '/images/accommodation/family-room-card.webp',
    features: ['Double bed + bunk bed', 'Shared bathroom facilities', 'Family friendly']
  },
  {
    id: 7,
    name: 'Five Sleeper',
    description: 'Large room that comfortably accommodates up to five people, perfect for groups or families.',
    image: '/images/accommodation/five-sleeper-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/five-sleeper-card.webp',
    features: ['Double bed + bunk bed + single bed', 'Shared bathroom facilities', 'Spacious layout']
  },
  {
    id: 8,
    name: 'Double En-suite',
    description: 'Private room with a queen size bed and en-suite bathroom for added comfort.',
    image: '/images/accommodation/double-ensuite-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/double-en-suite-card.webp',
    features: ['Queen bed', 'Private bathroom', 'Extra comfort']
  },
  {
    id: 9,
    name: 'Family En-suite Rondawel',
    description: 'Traditional round African house with modern amenities, perfect for families seeking a unique stay.',
    image: '/images/accommodation/family-en-suite-rondawel-card.webp',
    mobileImage: '/images/accommodation/mobile-banners/family-en-suite-rondawel-card.webp',
    features: ['Queen bed + bunk bed', 'Private bathroom', 'Secluded privacy']
  }
]
