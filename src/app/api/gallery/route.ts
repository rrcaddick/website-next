import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

type GalleryImage = {
  category: string;
  subcategory?: string;
  src: string;
  alt: string;
  fullSize: string;
};

export async function GET() {
  try {
    const images: GalleryImage[] = [];
    const baseDir = path.join(process.cwd(), 'public', 'images');

    // --- Accommodation ---
    const accommodationDir = path.join(baseDir, 'accommodation');
    const SKIP_ACCOMMODATION = new Set(['banners', 'mobile-banners', 'test']);
    if (isDir(accommodationDir)) {
      for (const room of fs.readdirSync(accommodationDir)) {
        if (SKIP_ACCOMMODATION.has(room)) continue;
        const roomPath = path.join(accommodationDir, room);
        if (!isDir(roomPath)) continue;
        const thumbDir = path.join(roomPath, 'thumbnails');
        const fullDir = path.join(roomPath, 'full');
        if (!isDir(thumbDir)) continue;
        const subcategory = room.replace(/-/g, ' ');
        for (const file of fs.readdirSync(thumbDir)) {
          if (!isGalleryImage(file)) continue;
          const fullSizePath = fileExists(path.join(fullDir, file))
            ? `/images/accommodation/${room}/full/${file}`
            : `/images/accommodation/${room}/thumbnails/${file}`;
          images.push({
            category: 'Accommodation',
            subcategory,
            src: `/images/accommodation/${room}/thumbnails/${file}`,
            alt: `${subcategory} ${file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')}`,
            fullSize: fullSizePath,
          });
        }
      }
    }

    // --- Adventures ---
    const adventuresDir = path.join(baseDir, 'adventures');
    const SKIP_ADVENTURES = new Set(['banners', 'cards']);
    if (isDir(adventuresDir)) {
      for (const adventure of fs.readdirSync(adventuresDir)) {
        if (SKIP_ADVENTURES.has(adventure)) continue;
        const adventurePath = path.join(adventuresDir, adventure);
        if (!isDir(adventurePath)) continue;
        const thumbDir = path.join(adventurePath, 'thumbnails');
        const fullDir = path.join(adventurePath, 'full');
        if (!isDir(thumbDir)) continue;
        const subcategory = adventure.replace(/-/g, ' ');
        for (const file of fs.readdirSync(thumbDir)) {
          if (!isGalleryImage(file)) continue;
          const fullSizePath = fileExists(path.join(fullDir, file))
            ? `/images/adventures/${adventure}/full/${file}`
            : `/images/adventures/${adventure}/thumbnails/${file}`;
          images.push({
            category: 'Adventures',
            subcategory,
            src: `/images/adventures/${adventure}/thumbnails/${file}`,
            alt: `${subcategory} ${file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')}`,
            fullSize: fullSizePath,
          });
        }
      }
    }

    // --- Entertainment ---
    // Flat files at root (no thumbnails subdir)
    const entertainmentDir = path.join(baseDir, 'entertainment');
    if (isDir(entertainmentDir)) {
      for (const file of fs.readdirSync(entertainmentDir)) {
        if (!isGalleryImage(file) || file.includes('banner')) continue;
        const filePath = path.join(entertainmentDir, file);
        if (!isDir(filePath)) {
          const src = `/images/entertainment/${file}`;
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
    // Flat files at root (no thumbnails subdir)
    const facilitiesDir = path.join(baseDir, 'facilities');
    if (isDir(facilitiesDir)) {
      for (const file of fs.readdirSync(facilitiesDir)) {
        if (!isGalleryImage(file) || file.includes('banner')) continue;
        const filePath = path.join(facilitiesDir, file);
        if (!isDir(filePath)) {
          const src = `/images/facilities/${file}`;
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
    // Thumbnails are nested: venue-hire/{subdir}/thumbnails/
    const venueDir = path.join(baseDir, 'venue-hire');
    if (isDir(venueDir)) {
      for (const subdir of fs.readdirSync(venueDir)) {
        const subdirPath = path.join(venueDir, subdir);
        if (!isDir(subdirPath)) continue;
        const thumbDir = path.join(subdirPath, 'thumbnails');
        const fullDir = path.join(subdirPath, 'full');
        if (!isDir(thumbDir)) continue;
        const subcategory = subdir.replace(/-/g, ' ');
        for (const file of fs.readdirSync(thumbDir)) {
          if (!isGalleryImage(file)) continue;
          const fullSizePath = fileExists(path.join(fullDir, file))
            ? `/images/venue-hire/${subdir}/full/${file}`
            : `/images/venue-hire/${subdir}/thumbnails/${file}`;
          images.push({
            category: 'Venue Hire',
            subcategory,
            src: `/images/venue-hire/${subdir}/thumbnails/${file}`,
            alt: `${subcategory} ${file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')}`,
            fullSize: fullSizePath,
          });
        }
      }
    }

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading gallery images:', error);
    return NextResponse.json({ images: [] });
  }
}
