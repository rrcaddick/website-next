import { notFound } from 'next/navigation'
import { getAccommodation, getAllAccommodationSlugs } from '@/lib/content'
import AccommodationPageTemplate from '@/features/accommodation/template'

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

  return <AccommodationPageTemplate content={content} />
}
