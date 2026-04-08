import { notFound } from 'next/navigation'
import { getAdventure, getAllAdventureSlugs, getSiteContent } from '@/lib/content'
import DetailPageTemplate from '@/features/detail/template'

export async function generateStaticParams() {
  const slugs = await getAllAdventureSlugs()
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
    const content = await getAdventure(slug)
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

export default async function AdventurePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let content
  try {
    content = await getAdventure(slug)
  } catch {
    notFound()
  }

  return <DetailPageTemplate content={content} />
}
