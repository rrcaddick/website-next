'use client'

import { GalleryImage, Category } from './types'

function formatSubcategory(name: string) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

type Props = {
  categories: Category[]
  selectedCategory: Category
  selectedSubcategory: string
  images: GalleryImage[]
  onSelectCategory: (cat: Category) => void
  onSelectSubcategory: (sub: string) => void
}

export default function GalleryFilters({
  categories,
  selectedCategory,
  selectedSubcategory,
  images,
  onSelectCategory,
  onSelectSubcategory,
}: Props) {
  const subcategories = (() => {
    if (selectedCategory === 'All') return []
    const seen = new Set<string>()
    images.forEach(img => {
      if (img.category === selectedCategory && img.subcategory) seen.add(img.subcategory)
    })
    return ['All', ...Array.from(seen).sort((a, b) => a.localeCompare(b))]
  })()

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {categories.map((category) => {
          const count = images.filter(img => img.category === category).length
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-[#0E7D73] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
              {category !== 'All' && count > 0 && (
                <span className="ml-2 text-sm">({count})</span>
              )}
            </button>
          )
        })}
      </div>

      {selectedCategory !== 'All' && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {subcategories.map((subcategory) => {
            const count =
              subcategory === 'All'
                ? images.filter(img => img.category === selectedCategory).length
                : images.filter(img => img.category === selectedCategory && img.subcategory === subcategory).length
            if (count === 0 && subcategory !== 'All') return null
            return (
              <button
                key={subcategory}
                onClick={() => onSelectSubcategory(subcategory)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  selectedSubcategory === subcategory
                    ? 'bg-[#0E7D73] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {formatSubcategory(subcategory)}
                <span className="ml-1 text-xs">({count})</span>
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}
