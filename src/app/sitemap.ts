import type { MetadataRoute } from 'next'
import { getAllAccommodationSlugs, getAllAdventureSlugs } from '@/lib/content'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.wildernessbackpackers.com'

const STATIC_ROUTES = [
  '/',
  '/accommodation/',
  '/adventures/',
  '/entertainment/',
  '/venue/',
  '/facilities/',
  '/gallery/',
  '/contact/',
  '/fairy-folk-n-roll/',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }))

  const [accommodationSlugs, adventureSlugs] = await Promise.all([
    getAllAccommodationSlugs(),
    getAllAdventureSlugs(),
  ])

  const accommodationEntries: MetadataRoute.Sitemap = accommodationSlugs.map((slug) => ({
    url: `${BASE_URL}/accommodation/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const adventureEntries: MetadataRoute.Sitemap = adventureSlugs.map((slug) => ({
    url: `${BASE_URL}/adventures/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticEntries, ...accommodationEntries, ...adventureEntries]
}
