export type EntertainmentEvent = {
  title: string
  schedule: string
  description: string
  image: string
  mobileImage: string
}

export const events: EntertainmentEvent[] = [
  {
    title: 'Live Music Gigs',
    schedule: 'Every Friday and Saturday 19:30 - 22:30',
    description: 'Experience live performances from local magical musicians and traveling musical magicians. From intimate solos to monstrous full-band spectacles, each a celebration of sound that will leave you spellbound.',
    image: '/images/entertainment/live-gigs-card.webp',
    mobileImage: '/images/entertainment/mobile/live-gigs-card.webp'
  },
  {
    title: 'Open Mic Night',
    schedule: 'Every Wednesday 19:30 - 22:30',
    description: "Step into the spotlight and share what you may dare. Whether you're an aspiring artist, poetic wordsmith, comedic genius, or not, the stage is yours to claim and fame is yours to gain.",
    image: '/images/entertainment/open-mic-night-card.webp',
    mobileImage: '/images/entertainment/mobile/open-mic-night-card.webp'
  },
  {
    title: 'Family Market',
    schedule: 'Every sunny Sunday 10:00 - 14:00',
    description: 'Explore our charming family market and discover locally crafted gems, tasty treats, unique garments and one-of-a-kind souvinirs. Connect with locals that bring together a community of creativity.',
    image: '/images/entertainment/family-market-card.webp',
    mobileImage: '/images/entertainment/mobile/family-market-card.webp'
  }
]
