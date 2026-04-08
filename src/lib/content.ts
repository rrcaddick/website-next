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
  // _template is added by TinaCMS when blocks are edited via the admin UI.
  // CardBlockRenderer checks `_template || type` so both old and new JSON work.
  _template?: string;
  type: "title" | "text" | "subheading" | "list";
  content: string | string[];
  // contentItems is used by the Tina `list` template (avoids String vs [String]
  // GraphQL conflict). Existing JSON uses `content: string[]`; Tina writes `contentItems`.
  contentItems?: string[];
};

export interface ListingItem {
  image: string;
  href?: string;
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
  infoSections?: InfoSection[];
  cta?: {
    heading: string;
    description?: string;
    button?: {
      href: string;
      label: string;
    };
  };
  footnote?: string;
  galleryHeading?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact page
// ─────────────────────────────────────────────────────────────────────────────

export interface InfoSections {
  sectionTitle: string;
  sectionsItems: string[];
}

export interface FormFields {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

export interface ContactPageContent {
  title: string;
  mobileSrc: string;
  desktopSrc: string;
  infoHeading: string;
  infoSections: InfoSections[];
  formHeading: string;
  formFields: FormFields[];
  formSubmitLabel: string;
}

export function getContactPageContent(slug: string): ContactPageContent {
  const file = path.join(process.cwd(), "content", "pages", `${slug}.json`);
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as ContactPageContent;
}

// ─────────────────────────────────────────────────────────────────────────────
// Gallery page
// ─────────────────────────────────────────────────────────────────────────────

export interface GalleryPageContent {
  galleryHeading: string;
  galleryDetail: string;
  emptyMessage: string;
}

export function getGalleryPageContent(slug: string): GalleryPageContent {
  const file = path.join(process.cwd(), "content", "pages", `${slug}.json`);
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as GalleryPageContent;
}

// ─────────────────────────────────────────────────────────────────────────────
// Detail pages (shared by Accommodation + Adventures)
// ─────────────────────────────────────────────────────────────────────────────

export interface InfoSection {
  heading: string;
  content: string | string[];
  align?: "left" | "center" | "right";
}

export interface DetailCTA {
  heading: string;
  description?: string;
  button?: {
    href: string;
    label: string;
  };
}

export interface DetailPageContent {
  title: string;
  description: string;
  hero: {
    mobileSrc: string;
    desktopSrc: string;
  };
  gallery: GalleryImage[];
  imagesPerPage?: number;
  showBookNow?: boolean;
  infoSections?: InfoSection[];
  cta?: DetailCTA;
}

// ─────────────────────────────────────────────────────────────────────────────
// Accommodation
// ─────────────────────────────────────────────────────────────────────────────

export interface AccommodationContent extends DetailPageContent {
  slug: string;
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

export interface AdventureContent extends DetailPageContent {
  slug: string;
  category: string;
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
  topLevelLinks: NavLink[];
  accommodationLinks: NavLink[];
  adventureLinks: NavLink[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Site-wide content (footer, social links)
// ─────────────────────────────────────────────────────────────────────────────

export interface SiteContent {
  address: string;
  phone: string;
  email: string;
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    home: {
      title: string;
      description: string;
    };
  };
  errors: {
    generic: { title: string; message: string; button: string };
    gallery: { title: string; message: string; button: string };
  };
  defaults: {
    galleryHeading: string;
  };
}

export function getSiteContent(): SiteContent {
  const file = path.join(process.cwd(), "content", "site.json");
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as SiteContent;
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
