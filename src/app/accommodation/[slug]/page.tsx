import { notFound } from 'next/navigation'
import { getAccommodation, getAllAccommodationSlugs } from '@/lib/content'
import DetailPageTemplate from '@/features/detail/template'

export async function generateStaticParams() {
  return getAllAccommodationSlugs().map((slug) => ({ slug }))
}

export default async function AccommodationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let content
  try {
    content = getAccommodation(slug)
  } catch {
    notFound()
  }

  return <DetailPageTemplate content={content} />
}
