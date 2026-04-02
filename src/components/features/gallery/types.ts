export type GalleryImage = {
  src: string
  alt: string
  category: string
  subcategory: string
  fullSize: string
}

export type Category = 'All' | 'Accommodation' | 'Adventures' | 'Entertainment' | 'Venue Hire' | 'Facilities'

export const CATEGORIES: Category[] = ['All', 'Accommodation', 'Adventures', 'Entertainment', 'Venue Hire', 'Facilities']
