import { notFound } from 'next/navigation'
import { getAccommodation, getAllAccommodationSlugs, getSiteContent } from '@/lib/content'
import { AccommodationDocument, SiteDocument } from '@tina/__generated__/types'
import DetailPageTemplateClient from '@/features/detail/DetailPageTemplateClient'

export async function generateStaticParams() {
  const slugs = await getAllAccommodationSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const site = await getSiteContent()
  try {
    const content = await getAccommodation(slug)
    return {
      title: `${content.title} — ${site.seo.defaultTitle}`,
      description: content.description,
      openGraph: {
        title: content.title,
        description: content.description,
        images: [{ url: content.hero.desktopSrc }],
      },
    }
  } catch {
    return { title: site.seo.defaultTitle }
  }
}

export default async function AccommodationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const site = await getSiteContent()

  let content
  try {
    content = await getAccommodation(slug)
  } catch {
    notFound()
  }

  return (
    <DetailPageTemplateClient
      data={content}
      query={AccommodationDocument}
      variables={{ relativePath: `${slug}.json` }}
      collection="accommodation"
      site={site}
      siteQuery={SiteDocument}
      siteVariables={{ relativePath: 'site.json' }}
    />
  )
}
