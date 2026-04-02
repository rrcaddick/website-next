'use client'

import { useEffect } from 'react'

export default function GalleryError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Gallery unavailable
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
        We couldn&apos;t load the gallery images. Please check your connection and try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-2 rounded-full bg-[#0E7D73] text-[#C9DD94] font-semibold hover:bg-[#073F3A] hover:text-[#00FF7F] transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
