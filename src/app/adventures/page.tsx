import { getPageContent } from '@/lib/content'
import ListingTemplate from '@/features/listing/template'

export default async function Adventures() {
  const content = await getPageContent('adventures')
  return <ListingTemplate content={content} />
}
