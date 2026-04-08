"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import GalleryFilters from "./GalleryFilters";
import GalleryGrid from "./GalleryGrid";
import GalleryModal from "./GalleryModal";
import { GalleryImage, Category, CATEGORIES } from "./types";

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getBalancedImages(images: GalleryImage[]): GalleryImage[] {
  const groupMap = new Map<string, GalleryImage[]>();
  images.forEach((img) => {
    const key = `${img.category}|||${img.subcategory}`;
    if (!groupMap.has(key)) groupMap.set(key, []);
    groupMap.get(key)?.push(img);
  });
  const groupKeys = shuffle(Array.from(groupMap.keys()));
  const groupArrays = groupKeys.map((key) => shuffle(groupMap.get(key) ?? []));
  const result: GalleryImage[] = [];
  let added = true;
  while (added) {
    added = false;
    for (let i = 0; i < groupArrays.length; i++) {
      if (groupArrays[i].length > 0) {
        const img = groupArrays[i].shift();
        if (img) {
          result.push(img);
          added = true;
        }
      }
    }
  }
  return result;
}

interface Props {
  emptyMessage: string;
}

export default function GalleryClient({ emptyMessage }: Props) {
  const IMAGES_PER_PAGE = 12;

  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(0);

  // Ref to scroll back to the top of the gallery when pagination changes
  const galleryTopRef = useRef<HTMLDivElement>(null);

  // Load all images once
  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/gallery");
        if (!response.ok) throw new Error("Failed to fetch images");
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error("Error loading images:", error);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, []);

  // Reset subcategory to "All" and page to 1 when main category changes
  useEffect(() => {
    setSelectedSubcategory("All");
    setCurrentPage(0);
  }, [selectedCategory]);

  // Auto-scroll to top of gallery when Next/Previous is clicked
  useLayoutEffect(() => {
    if (galleryTopRef.current && !selectedImage) {
      galleryTopRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage, selectedImage]);

  const filteredImages = images.filter((img) => {
    if (selectedCategory === "All") return true;
    if (img.category !== selectedCategory) return false;
    if (selectedSubcategory === "All") return true;
    return img.subcategory === selectedSubcategory;
  });

  const imagesToDisplay =
    selectedCategory === "All" && selectedSubcategory === "All" ? getBalancedImages(images) : filteredImages;

  const totalPages = Math.ceil(imagesToDisplay.length / IMAGES_PER_PAGE);
  const currentImages = imagesToDisplay.slice(currentPage * IMAGES_PER_PAGE, (currentPage + 1) * IMAGES_PER_PAGE);

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex > 0) {
      const newIndex = selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
      setSelectedImage(imagesToDisplay[newIndex]);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex < imagesToDisplay.length - 1) {
      const newIndex = selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
      setSelectedImage(imagesToDisplay[newIndex]);
    }
  };

  const handleImageError = (src: string) => {
    setImageLoadErrors((prev) => new Set(prev).add(src));
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      switch (e.key) {
        case "ArrowLeft":
          handlePreviousImage();
          break;
        case "ArrowRight":
          handleNextImage();
          break;
        case "Escape":
          setSelectedImage(null);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, selectedImageIndex]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0E7D73]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={galleryTopRef} className="container mx-auto px-4 py-8">
      <GalleryFilters
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        images={images}
        onSelectCategory={setSelectedCategory}
        onSelectSubcategory={setSelectedSubcategory}
      />

      <GalleryGrid
        images={currentImages}
        imageLoadErrors={imageLoadErrors}
        onImageClick={handleImageClick}
        onImageError={handleImageError}
      />

      {/* Clean arrow-only pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-40"
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="text-sm text-gray-600 dark:text-gray-300 px-4">
            Page <strong>{currentPage + 1}</strong> of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-40"
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {imagesToDisplay.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
        </div>
      )}

      <GalleryModal
        image={selectedImage}
        currentIndex={selectedImageIndex}
        totalImages={imagesToDisplay.length}
        onClose={() => setSelectedImage(null)}
        onNext={handleNextImage}
        onPrevious={handlePreviousImage}
      />
    </div>
  );
}
