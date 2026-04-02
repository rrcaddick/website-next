export type Activity = {
  id: number
  name: string
  description: string
  image: string
  mobileImage: string
  category: string
  features: string[]
}

export const activities: Activity[] = [
  {
    id: 1,
    name: 'Kayaking',
    description: '3 hour return trip to the waterfall and back, totaling around 2 hours paddling and 1 hour hiking.',
    image: '/images/adventures/cards/desktop/kayaking-card.webp',
    mobileImage: '/images/adventures/cards/mobile/kayaking-card.webp',
    category: 'Water Activities',
    features: ['Life jackets included', 'Moderate fitness required', 'Paddling, hiking and swimming', 'Waterfall']
  },
  {
    id: 2,
    name: 'Paragliding',
    description: '15 minutes in the air with beautiful views of the ocean and surrounding forests and mountains.',
    image: '/images/adventures/cards/desktop/paragliding-card.webp',
    mobileImage: '/images/adventures/cards/mobile/paragliding-card.webp',
    category: 'Air Activities',
    features: ['Professional pilots', 'All equipment provided', 'Weather dependent', 'Camera rental available']
  },
  {
    id: 3,
    name: 'Horseriding',
    description: '1.5 hour trail through the forests of the Wilderness Heights.',
    image: '/images/adventures/cards/desktop/horseriding-card.webp',
    mobileImage: '/images/adventures/cards/mobile/horseriding-card.webp',
    category: 'Land Activities',
    features: ['Experienced guide', 'Beginner an/or skilled riders', 'Helmets provided', 'Beautiful forest views']
  },
  {
    id: 4,
    name: 'Half Collared Kingfisher Trail',
    description: '3 hour trail along the Touw River, leading to the waterfall. Great for swimming.',
    image: '/images/adventures/cards/desktop/half-collared-kingfisher-trail-card.webp',
    mobileImage: '/images/adventures/cards/mobile/half-collared-kingfisher-trail-card.webp',
    category: 'Hiking',
    features: ['There and back trail', 'moderate difficulty', 'Swimming spots', 'Waterfall']
  },
  {
    id: 6,
    name: 'Brown Hooded Kingfisher Trail',
    description: '2 hour trail crossing multiple times over the Duiwe River.',
    image: '/images/adventures/cards/desktop/brown-hooded-kingfisher-trail-card.webp',
    mobileImage: '/images/adventures/cards/mobile/brown-hooded-kingfisher-trail-card.webp',
    category: 'Hiking',
    features: ['There and back trail', 'Easy difficulty', 'Bird watching', 'River crossings']
  },
  {
    id: 5,
    name: 'Bosduif Trail',
    description: '2 hour loop trail up to breath-taking viewpoints above the Touw River, and back down again.',
    image: '/images/adventures/cards/desktop/bosduif-trail-card.webp',
    mobileImage: '/images/adventures/cards/mobile/bosduif-trail-card.webp',
    category: 'Hiking',
    features: ['Loop trail', 'Tougher difficulty', 'Steep ups and downs', 'Elevated viewpoints']
  },
  {
    id: 7,
    name: 'Woodville Big Tree',
    description: 'Visit a 1000 year old Yellow Wood tree and marvel at its size and glory. 3km and 7km trails looping back around.',
    image: '/images/adventures/cards/desktop/woodville-big-tree-card.webp',
    mobileImage: '/images/adventures/cards/mobile/woodville-big-tree-card.webp',
    category: 'Nature',
    features: ['Multiple trails', 'Easy difficulty', 'Picnic tables', 'Braai facilities']
  },
  {
    id: 8,
    name: 'Map of Africa',
    description: 'A sight to behold.',
    image: '/images/adventures/cards/desktop/map-of-africa-card.webp',
    mobileImage: '/images/adventures/cards/mobile/map-of-africa-card.webp',
    category: 'Viewpoints',
    features: ['Easy access', 'Spectacular views', 'Picnic spot', 'Birds eye view']
  },
  {
    id: 9,
    name: 'Wilderness Beach',
    description: 'Blue Flag beach perfect for a nice sunny day.',
    image: '/images/adventures/cards/desktop/wilderness-beach-card.webp',
    mobileImage: '/images/adventures/cards/mobile/wilderness-beach-card.webp',
    category: 'Beach',
    features: ['Blue Flag status', 'Swimming', 'Running', 'Relaxing']
  },
  {
    id: 10,
    name: 'Water Under the Bridge',
    description: 'Take a leap into the refreshing Touws River from our railway bridge jumping spot.',
    image: '/images/adventures/cards/desktop/water-under-the-bridge-card.webp',
    mobileImage: '/images/adventures/cards/mobile/water-under-the-bridge-card.webp',
    category: 'Water Activities',
    features: ['Close to backpackers', 'Water jump', 'Swimming', 'Local favorite']
  },
  {
    id: 11,
    name: 'Fairy Labyrinth',
    description: 'Something on your mind? Unravel and unwind.',
    image: '/images/adventures/fairy-labyrinth-card.webp',
    mobileImage: '/images/adventures/fairy-labyrinth-card.webp',
    category: 'Relaxation',
    features: ['Meditatative walk', 'Unwind', 'Intention', 'Garden environment']
  },
  {
    id: 12,
    name: 'Ancient Archives',
    description: 'Books, books, books in all the nooks.',
    image: '/images/adventures/cards/desktop/ancient-archives-card.webp',
    mobileImage: '/images/adventures/cards/mobile/ancient-archives-card.webp',
    category: 'Indoor Activities',
    features: ['Book exchange', 'Over 1500 books', 'Endless adventures', 'Perfect for rainy days']
  }
]
