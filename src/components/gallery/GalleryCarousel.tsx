'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const images = [
  '/images/gallery/carousel/Family Room Card.webp',
  '/images/gallery/carousel/Twin Room Card.webp',
  '/images/gallery/carousel/Mixed Dorm Card.webp',
  '/images/gallery/carousel/vlcsnap-2024-08-21-15h33m26s538.webp',
  '/images/gallery/carousel/vlcsnap-2024-08-21-15h47m57s761.webp',
  '/images/gallery/carousel/vlcsnap-2024-08-21-15h56m21s810.webp',
  '/images/gallery/carousel/vlcsnap-2024-08-21-15h57m11s255.webp',
  '/images/gallery/carousel/vlcsnap-2024-08-21-15h57m20s770.webp',
  '/images/gallery/carousel/vlcsnap-2024-08-21-16h06m00s459.webp',
  '/images/gallery/carousel/vlcsnap-2024-08-21-16h06m29s832.webp',
  '/images/gallery/carousel/vlcsnap-2024-08-21-16h08m19s649.webp',
  '/images/gallery/carousel/vlcsnap-2024-08-21-16h08m59s747.webp',
  '/images/gallery/carousel/Nightlife.webp',
  '/images/gallery/carousel/Live Music Gigs Card.webp',
  '/images/gallery/carousel/Lively Bar Card.webp'
];

const CHANGE_INTERVAL = 2000; // 2 seconds between each section change

const getNextUniqueIndex = (currentIndices: number[]) => {
  const availableIndices = Array.from({ length: images.length }, (_, i) => i)
    .filter(i => !currentIndices.includes(i));
  return availableIndices[Math.floor(Math.random() * availableIndices.length)];
};

export default function GalleryCarousel() {
  const [currentIndices, setCurrentIndices] = useState<number[]>([0, 1, 2]);
  const [currentSection, setCurrentSection] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndices(prev => {
        const newIndices = [...prev];
        const nextIndex = getNextUniqueIndex(prev);
        newIndices[currentSection] = nextIndex;
        return newIndices;
      });
      
      setCurrentSection((prev) => (prev + 1) % 3);
    }, CHANGE_INTERVAL);

    return () => clearInterval(interval);
  }, [currentSection]);

  return (
    <div className="mt-8">
      <Link href="/gallery" className="group">
        <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
          <div className="grid grid-cols-3 gap-1">
            {[0, 1, 2].map((section) => (
              <div key={section} className="relative h-[400px]">
                {images.map((image, index) => (
                  <Image
                    key={`${section}-${image}`}
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className={`object-cover transition-opacity duration-1000 absolute inset-0 ${
                      index === currentIndices[section] ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary dark:text-white">
              Gallery
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              View photos of our backpackers and beautiful surroundings.
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
} 