import fs from "fs";
import path from "path";
// ─────────────────────────────────────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────────────────────────────────────

export interface GalleryImage {
  src: string;
  alt: string;
  fullSize: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Listing
// ─────────────────────────────────────────────────────────────────────────────

export type CardBlock = {
  type: "title" | "text" | "subheading" | "list";
  content: string | string[];
};

export interface ListingItem {
  image: string;
  href: string;
  blocks: CardBlock[];
}

export interface ListingPageContent {
  title: string;
  description?: string;
  hero: {
    mobileSrc: string;
    desktopSrc: string;
  };
  items: ListingItem[];
  columns?: number;
  showBookNow?: boolean;
  cta?: {
    title: string;
    description?: string;
    href?: string;
    label?: string;
    generalInfo?: {
      leftTitle: string;
      leftItems: string[];
      rightTitle: string;
      rightItems: string[];
    };
  };
  footnote?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Accommodation
// ─────────────────────────────────────────────────────────────────────────────

export interface AccommodationContent {
  slug: string;
  title: string;
  description: string;
  hero: {
    mobileSrc: string;
    desktopSrc: string;
  };
  gallery: GalleryImage[];
  imagesPerPage?: number;
  whatsIncluded: string[];
  sharedFacilities: string[];
  rulesOfTheForest: string[];
  cardImage: string;
  cardMobileImage?: string;
  cardDescription: string;
  cardFeatures: string[];
}

const accommodationDir = path.join(process.cwd(), "content", "accommodation");

export function getAccommodation(slug: string): AccommodationContent {
  const file = path.join(accommodationDir, `${slug}.json`);
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as AccommodationContent;
}

export function getAllAccommodationSlugs(): string[] {
  return fs
    .readdirSync(accommodationDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

export function getAllAccommodation(): AccommodationContent[] {
  return getAllAccommodationSlugs().map(getAccommodation);
}

// ─────────────────────────────────────────────────────────────────────────────
// Adventures
// ─────────────────────────────────────────────────────────────────────────────

export interface AdventureContent {
  slug: string;
  title: string;
  description: string;
  category: string;
  hero: {
    mobileSrc: string;
    desktopSrc: string;
  };
  gallery: GalleryImage[];
  imagesPerPage?: number;
  generalInfo: string[];
  whatToBring: string[];
  cardImage: string;
  cardMobileImage: string;
  cardDescription: string;
  cardFeatures: string[];
}

const adventuresDir = path.join(process.cwd(), "content", "adventures");

export function getAdventure(slug: string): AdventureContent {
  const file = path.join(adventuresDir, `${slug}.json`);
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as AdventureContent;
}

export function getAllAdventureSlugs(): string[] {
  return fs
    .readdirSync(adventuresDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

export function getAllAdventures(): AdventureContent[] {
  return getAllAdventureSlugs().map(getAdventure);
}

// ─────────────────────────────────────────────────────────────────────────────
// Entertainment
// ─────────────────────────────────────────────────────────────────────────────

export interface EntertainmentEvent {
  title: string;
  schedule: string;
  description: string;
  image: string;
  mobileImage: string;
}

export interface EntertainmentContent {
  heroMobile: string;
  heroDesktop: string;
  description: string;
  events: EntertainmentEvent[];
}

export function getEntertainment(): EntertainmentContent {
  const file = path.join(process.cwd(), "content", "entertainment", "events.json");
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as EntertainmentContent;
}

// ─────────────────────────────────────────────────────────────────────────────
// Facilities
// ─────────────────────────────────────────────────────────────────────────────

export interface FacilityItem {
  name: string;
  features: string[];
}

export interface FacilityCategory {
  id: number;
  title: string;
  image: string;
  facilities: FacilityItem[];
}

export interface FacilitiesContent {
  heroMobile: string;
  heroDesktop: string;
  description: string;
  categories: FacilityCategory[];
  houseRules: string[];
  receptionHours: string[];
}

export function getFacilities(): FacilitiesContent {
  const file = path.join(process.cwd(), "content", "facilities", "facilities.json");
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as FacilitiesContent;
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────

export interface NavLink {
  href: string;
  label: string;
}

export interface NavContent {
  accommodationLinks: NavLink[];
  adventureLinks: NavLink[];
}

export function getNav(): NavContent {
  const file = path.join(process.cwd(), "content", "nav.json");
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as NavContent;
}

// ─────────────────────────────────────────────────────────────────────────────
// Listing pages
// ─────────────────────────────────────────────────────────────────────────────

export function getPageContent(slug: string): ListingPageContent {
  const file = path.join(process.cwd(), "content", "pages", `${slug}.json`);
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as ListingPageContent;
}
