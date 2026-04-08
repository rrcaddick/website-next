import { getPageContent } from '@/lib/content'
import ListingTemplate from '@/features/listing/template'

export default async function FairyFolkNRoll() {
  const content = await getPageContent('fairy-folk-n-roll')
  return <ListingTemplate content={content} />
}
