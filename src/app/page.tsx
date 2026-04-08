import { getPageContent, getSiteContent } from '@/lib/content'
import ListingTemplate from '@/features/listing/template'

export async function generateMetadata() {
  const site = await getSiteContent()
  return {
    title: site.seo.home.title,
    description: site.seo.home.description,
  }
}

export default async function Home() {
  const content = await getPageContent('home')
  return <ListingTemplate content={content} />
}
