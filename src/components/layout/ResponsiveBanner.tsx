'use client'

import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'

interface ResponsiveBannerProps {
  desktopImage: string
  mobileImage: string
  alt: string
  title: string
}

export default function ResponsiveBanner({ desktopImage, mobileImage, alt, title }: ResponsiveBannerProps) {
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <div className="relative w-full aspect-[9/5] mb-4 md:mb-12">
      <Image
        src={isMobile ? mobileImage : desktopImage}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
          {title}
        </h1>
      </div>
    </div>
  )
} 