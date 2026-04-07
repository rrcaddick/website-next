import { getPageContent } from '@/lib/content'
import ListingTemplate from '@/features/listing/template'

export default function FairyFolkNRoll() {
  const content = getPageContent('fairy-folk-n-roll')
  return <ListingTemplate content={content} />
}
