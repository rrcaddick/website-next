"use client";

import { useState, useEffect } from "react";
import GalleryGrid from "@/components/features/gallery/GalleryGrid";
import GalleryModal from "@/components/features/gallery/GalleryModal";
import type { GalleryImage } from "@/components/features/gallery/types";

const IMAGES_PER_PAGE = 12;

interface Props {
  heading: string;
}

export default function VenueGallery({ heading }: Props) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/gallery");
        if (!res.ok) throw new Error("Failed to fetch gallery");
        const data = await res.json();
        const venueImages = (data.images as GalleryImage[]).filter((img) => img.category === "Venue Hire");
        setImages(venueImages);
      } catch (err) {
        console.error("VenueGallery: failed to load images", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  const currentImages = images.slice(currentPage * IMAGES_PER_PAGE, (currentPage + 1) * IMAGES_PER_PAGE);

  const handleImageClick = (_image: GalleryImage, indexInPage: number) => {
    const absoluteIndex = currentPage * IMAGES_PER_PAGE + indexInPage;
    setSelectedImage(images[absoluteIndex]);
    setSelectedIndex(absoluteIndex);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setSelectedIndex(-1);
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      const i = selectedIndex - 1;
      setSelectedIndex(i);
      setSelectedImage(images[i]);
    }
  };

  const handleNext = () => {
    if (selectedIndex < images.length - 1) {
      const i = selectedIndex + 1;
      setSelectedIndex(i);
      setSelectedImage(images[i]);
    }
  };

  if (loading) {
    return (
      <div className="mt-16 mb-16 flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0E7D73]" />
      </div>
    );
  }

  if (images.length === 0) return null;

  return (
    <div className="mt-16 mb-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">{heading}</h2>

      <GalleryGrid
        images={currentImages}
        imageLoadErrors={imageLoadErrors}
        onImageClick={handleImageClick}
        onImageError={(src) => setImageLoadErrors((prev) => new Set(prev).add(src))}
      />

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-40"
            aria-label="Previous page"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-40"
            aria-label="Next page"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      <GalleryModal
        image={selectedImage}
        currentIndex={selectedIndex}
        totalImages={images.length}
        onClose={handleClose}
        onNext={handleNext}
        onPrevious={handlePrev}
      />
    </div>
  );
}
