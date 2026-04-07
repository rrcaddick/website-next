import { getPageContent } from '@/lib/content'
import ListingTemplate from '@/features/listing/template'

export default function Adventure() {
  const content = getPageContent('adventures')
  return <ListingTemplate content={content} />
}
