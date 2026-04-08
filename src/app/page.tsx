import { getPageContent, getSiteContent } from '@/lib/content'
import ListingTemplate from '@/features/listing/template'

export function generateMetadata() {
  const site = getSiteContent()
  return {
    title: site.seo.home.title,
    description: site.seo.home.description,
  }
}

export default function Home() {
  const content = getPageContent('home')
  return <ListingTemplate content={content} />
}
