import { notFound } from 'next/navigation'
import { getAdventure, getAllAdventureSlugs } from '@/lib/content'
import DetailPageTemplate from '@/features/detail/template'

export async function generateStaticParams() {
  return getAllAdventureSlugs().map((slug) => ({ slug }))
}

export default async function AdventurePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let content
  try {
    content = getAdventure(slug)
  } catch {
    notFound()
  }

  return <DetailPageTemplate content={content} />
}
