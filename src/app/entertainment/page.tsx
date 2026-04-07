import { getPageContent } from '@/lib/content'
import ListingTemplate from '@/features/listing/template'

export default function Entertainment() {
  const content = getPageContent('entertainment')
  return <ListingTemplate content={content} />
}
