export interface ListingItem {
  title: string
  description: string
  image: string
  href: string
}

export interface ListingPageContent {
  title: string
  description?: string
  hero: {
    mobileSrc: string
    desktopSrc: string
  }
  items: ListingItem[]
  showBookNow?: boolean
  cta?: {
    title: string
    description?: string
    href?: string
    label?: string
  }
  footnote?: string
}
