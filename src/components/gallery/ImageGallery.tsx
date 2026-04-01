'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

interface GalleryImage {
  src: string;
  alt: string;
  fullSize: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
  imagesPerPage?: number;
}

export default function ImageGallery({ 
  images, 
  title, 
  imagesPerPage = 8 
}: ImageGalleryProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const totalPages = Math.ceil(images.length / imagesPerPage);
  
  // Get current page images
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
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
      setSelectedImage(images[selectedImageIndex + 1]);
    } else {
      // Loop back to the first image
      setSelectedImageIndex(0);
      setSelectedImage(images[0]);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
      setSelectedImage(images[selectedImageIndex - 1]);
    } else {
      // Loop to the last image
      setSelectedImageIndex(images.length - 1);
      setSelectedImage(images[images.length - 1]);
    }
  };

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextImage();
    }
    
    if (isRightSwipe) {
      prevImage();
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape') {
        closeImage();
      }
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
          {/* Current page images */}
          {currentImages.map((image, index) => {
            const globalIndex = currentPage * imagesPerPage + index;
            
            return (
              <div 
                key={`${image.src}-${globalIndex}`}
                className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg hover:shadow-xl cursor-pointer"
                onClick={() => openImage(image, globalIndex)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 4}
                  quality={75}
                />
              </div>
            );
          })}
        </div>
        
        {/* Navigation buttons */}
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

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-0"
          onClick={closeImage}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center"
            ref={modalRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-[#00FF7F] transition-colors z-10 opacity-50 hover:opacity-100"
              onClick={closeImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Left Navigation Button */}
            <button
              className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 bg-[#0E7D73] bg-opacity-50 hover:bg-opacity-100 text-[#C9DD94] hover:text-[#00FF7F] p-2 sm:p-4 rounded-full transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Right Navigation Button */}
            <button
              className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 bg-[#0E7D73] bg-opacity-50 hover:bg-opacity-100 text-[#C9DD94] hover:text-[#00FF7F] p-2 sm:p-4 rounded-full transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage.fullSize}
                alt={selectedImage.alt}
                width={2560}
                height={1440}
                className="object-contain max-w-full max-h-full w-auto h-auto"
                priority
                quality={100}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            {/* Image counter */}
            <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center text-white text-xs sm:text-sm opacity-50">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 