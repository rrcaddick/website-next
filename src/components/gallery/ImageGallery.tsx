'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import GalleryModal from '@/components/features/gallery/GalleryModal'

interface GalleryImage {
  src: string;
  alt: string;
  fullSize: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
  imagesPerPage?: number;
  tinaFields?: string[];
}

export default function ImageGallery({
  images,
  title,
  imagesPerPage = 8,
  tinaFields,
}: ImageGalleryProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);

  const totalPages = Math.ceil(images.length / imagesPerPage);

  const currentImages = images.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const openImage = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setSelectedImageIndex(-1);
  };

  const nextImage = () => {
    const next = selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0;
    setSelectedImageIndex(next);
    setSelectedImage(images[next]);
  };

  const prevImage = () => {
    const prev = selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1;
    setSelectedImageIndex(prev);
    setSelectedImage(images[prev]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'Escape') closeImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedImageIndex]);

  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-4 mb-16">
      {title && (
        <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
          {title}
        </h2>
      )}

      <div className="relative overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {currentImages.map((image, index) => {
            const globalIndex = currentPage * imagesPerPage + index;
            return (
              <div
                key={`${image.src}-${globalIndex}`}
                data-tina-field={tinaFields?.[globalIndex]}
                className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg hover:shadow-xl cursor-pointer"
                onClick={() => openImage(image, globalIndex)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={prevPage}
            className="bg-[#0E7D73] hover:bg-[#073F3A] text-[#C9DD94] hover:text-[#00FF7F] px-4 py-2 rounded-lg transition-colors"
            aria-label="Previous page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextPage}
            className="bg-[#0E7D73] hover:bg-[#073F3A] text-[#C9DD94] hover:text-[#00FF7F] px-4 py-2 rounded-lg transition-colors"
            aria-label="Next page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <GalleryModal
        image={selectedImage}
        currentIndex={selectedImageIndex}
        totalImages={images.length}
        onClose={closeImage}
        onNext={nextImage}
        onPrevious={prevImage}
      />
    </div>
  );
}
