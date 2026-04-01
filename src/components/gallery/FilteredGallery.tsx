'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal';

type Category = 'All' | 'Accommodation' | 'Adventures' | 'Entertainment' | 'Facilities' | 'Events' | 'Fairy Folk \'n Roll';

interface GalleryImage {
  src: string;
  category: Category;
  alt: string;
}

const categories: Category[] = [
  'All',
  'Accommodation',
  'Adventures',
  'Entertainment',
  'Facilities',
  'Events',
  'Fairy Folk \'n Roll'
];

const formatImageName = (filename: string): string => {
  // Remove file extension and replace hyphens/underscores with spaces
  return filename
    .replace(/\.[^/.]+$/, "") // Remove extension
    .replace(/[-_]/g, " ") // Replace hyphens and underscores with spaces
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default function FilteredGallery() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/gallery');
        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();

    // Set up interval to check for new images every minute
    const interval = setInterval(loadImages, 60000);

    return () => clearInterval(interval);
  }, []);

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex > 0) {
      const newIndex = selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex < filteredImages.length - 1) {
      const newIndex = selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-card-light dark:bg-card-dark hover:bg-primary/10'
            } ${images.some(img => img.category === category || category === 'All') 
                ? 'opacity-100' 
                : 'opacity-50 cursor-not-allowed'}`}
          >
            {category}
            {category !== 'All' && (
              <span className="ml-2 text-sm">
                ({images.filter(img => img.category === category).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={`${image.category}-${index}`}
              className="relative aspect-[4/3] group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => handleImageClick(image, index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-2 py-1 bg-primary/80 rounded-lg text-sm">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => {
          setSelectedImage(null);
          setSelectedImageIndex(-1);
        }}
        imageSrc={selectedImage?.src || ''}
        imageAlt={selectedImage?.alt || ''}
        onNext={handleNextImage}
        onPrevious={handlePreviousImage}
      />

      {/* Empty State */}
      {!loading && filteredImages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {selectedCategory === 'All' 
              ? 'No images found in any category.' 
              : `No images found in ${selectedCategory} category.`}
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Add images to the corresponding folder to see them here.
          </p>
        </div>
      )}
    </div>
  );
} 