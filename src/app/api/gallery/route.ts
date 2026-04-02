import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Cache the response for 1 hour at the CDN/edge level
export const revalidate = 3600;

type GalleryImage = {
  category: string;
  subcategory?: string;
  src: string;
  alt: string;
  fullSize: string;
};

function isDir(p: string): boolean {
  try { return fs.statSync(p).isDirectory(); } catch { return false; }
}

function fileExists(p: string): boolean {
  try { return fs.existsSync(p); } catch { return false; }
}

function isImageFile(name: string): boolean {
  return /\.(jpg|jpeg|png|webp)$/i.test(name);
}

function isGalleryImage(name: string): boolean {
  return isImageFile(name) && !name.includes('-card') && !name.includes('-mobile');
}

function buildGalleryImages(): GalleryImage[] {
  const images: GalleryImage[] = [];
  const baseDir = path.join(process.cwd(), 'public', 'images-v2');

  // --- Accommodation ---
  const accommodationDir = path.join(baseDir, 'accommodation');
  if (isDir(accommodationDir)) {
    for (const room of fs.readdirSync(accommodationDir)) {
      const roomPath = path.join(accommodationDir, room);
      if (!isDir(roomPath)) continue;
      const thumbDir = path.join(roomPath, 'gallery', 'thumb');
      const fullDir = path.join(roomPath, 'gallery', 'full');
      if (!isDir(thumbDir)) continue;
      const subcategory = room.replace(/-/g, ' ');
      for (const file of fs.readdirSync(thumbDir)) {
        if (!isGalleryImage(file)) continue;
        const fullSizePath = fileExists(path.join(fullDir, file))
          ? `/images-v2/accommodation/${room}/gallery/full/${file}`
          : `/images-v2/accommodation/${room}/gallery/thumb/${file}`;
        images.push({
          category: 'Accommodation',
          subcategory,
          src: `/images-v2/accommodation/${room}/gallery/thumb/${file}`,
          alt: `${subcategory} ${file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')}`,
          fullSize: fullSizePath,
        });
      }
    }
  }

  // --- Adventures ---
  const adventuresDir = path.join(baseDir, 'adventures');
  if (isDir(adventuresDir)) {
    for (const adventure of fs.readdirSync(adventuresDir)) {
      const adventurePath = path.join(adventuresDir, adventure);
      if (!isDir(adventurePath)) continue;
      const thumbDir = path.join(adventurePath, 'gallery', 'thumb');
      const fullDir = path.join(adventurePath, 'gallery', 'full');
      if (!isDir(thumbDir)) continue;
      const subcategory = adventure.replace(/-/g, ' ');
      for (const file of fs.readdirSync(thumbDir)) {
        if (!isGalleryImage(file)) continue;
        const fullSizePath = fileExists(path.join(fullDir, file))
          ? `/images-v2/adventures/${adventure}/gallery/full/${file}`
          : `/images-v2/adventures/${adventure}/gallery/thumb/${file}`;
        images.push({
          category: 'Adventures',
          subcategory,
          src: `/images-v2/adventures/${adventure}/gallery/thumb/${file}`,
          alt: `${subcategory} ${file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')}`,
          fullSize: fullSizePath,
        });
      }
    }
  }

  // --- Entertainment ---
  const entertainmentImagesDir = path.join(baseDir, 'entertainment', 'images');
  if (isDir(entertainmentImagesDir)) {
    for (const file of fs.readdirSync(entertainmentImagesDir)) {
      if (!isGalleryImage(file)) continue;
      const filePath = path.join(entertainmentImagesDir, file);
      if (!isDir(filePath)) {
        const src = `/images-v2/entertainment/images/${file}`;
        images.push({
          category: 'Entertainment',
          src,
          alt: `Entertainment ${file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')}`,
          fullSize: src,
        });
      }
    }
  }

  // --- Facilities ---
  const facilitiesImagesDir = path.join(baseDir, 'facilities', 'images');
  if (isDir(facilitiesImagesDir)) {
    for (const file of fs.readdirSync(facilitiesImagesDir)) {
      if (!isGalleryImage(file)) continue;
      const filePath = path.join(facilitiesImagesDir, file);
      if (!isDir(filePath)) {
        const src = `/images-v2/facilities/images/${file}`;
        images.push({
          category: 'Facilities',
          src,
          alt: `Facilities ${file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')}`,
          fullSize: src,
        });
      }
    }
  }

  // --- Venue Hire ---
  const venueDir = path.join(baseDir, 'venue');
  if (isDir(venueDir)) {
    for (const subdir of fs.readdirSync(venueDir)) {
      const subdirPath = path.join(venueDir, subdir);
      if (!isDir(subdirPath)) continue;
      const thumbDir = path.join(subdirPath, 'gallery', 'thumb');
      const fullDir = path.join(subdirPath, 'gallery', 'full');
      if (!isDir(thumbDir)) continue;
      const subcategory = subdir.replace(/-/g, ' ');
      for (const file of fs.readdirSync(thumbDir)) {
        if (!isGalleryImage(file)) continue;
        const fullSizePath = fileExists(path.join(fullDir, file))
          ? `/images-v2/venue/${subdir}/gallery/full/${file}`
          : `/images-v2/venue/${subdir}/gallery/thumb/${file}`;
        images.push({
          category: 'Venue Hire',
          subcategory,
          src: `/images-v2/venue/${subdir}/gallery/thumb/${file}`,
          alt: `${subcategory} ${file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')}`,
          fullSize: fullSizePath,
        });
      }
    }
  }

  return images;
}

// Scan the filesystem once at module load time.
// In a long-running server this is computed once and reused for all requests.
// On serverless platforms it is computed once per warm instance.
let cachedImages: GalleryImage[];
try {
  cachedImages = buildGalleryImages();
} catch (error) {
  console.error('Error building gallery image list:', error);
  cachedImages = [];
}

export async function GET() {
  return NextResponse.json({ images: cachedImages });
}
