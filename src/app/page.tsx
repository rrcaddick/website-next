import { getPageContent } from '@/lib/content'
import ListingTemplate from '@/features/listing/template'

export const metadata = {
  title: 'Fairy Knowe Backpackers',
  description:
    'Your home away from home in the heart of Wilderness, offering comfortable accommodation, exciting adventures, and a vibrant social atmosphere.',
}

export default function Home() {
  const content = getPageContent('home')
  return <ListingTemplate content={content} />
}
