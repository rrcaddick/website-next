import { getPageContent } from '@/lib/content'
import ListingTemplate from '@/features/listing/template'

export default async function Entertainment() {
  const content = await getPageContent('entertainment')
  return <ListingTemplate content={content} />
}
