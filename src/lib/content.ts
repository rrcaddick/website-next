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
  __typename?: string;
  _template?: string;
  type?: "title" | "text" | "subheading" | "list";
  content?: string | string[];
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
  formConfig: {
    recipientEmail: string;
    subjectTemplate: string;
    successMessage: string;
    errorMessage: string;
  };
  emailTemplate: {
    intro: string;
    footer: string;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Gallery page
// ─────────────────────────────────────────────────────────────────────────────

export interface GalleryPageContent {
  galleryHeading: string;
  galleryDetail: string;
  emptyMessage: string;
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

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

export interface NavContent {
  nav: NavItem[];
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
  headerLogo: string;
  logo: string;
  footerImage: string;
  mobileMenuBackground: string;
  mobileMenuHeading: string;
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
    notFound: {
      image: string;
      heading: string;
      description: string;
      button: { label: string; href: string };
    };
  };
  defaults: {
    galleryHeading: string;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Filesystem helpers
// ─────────────────────────────────────────────────────────────────────────────

function readJson<T>(relativePath: string): T {
  const abs = path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(abs, "utf-8")) as T;
}

function listJsonSlugs(dir: string): string[] {
  const abs = path.join(process.cwd(), dir);
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

// ─────────────────────────────────────────────────────────────────────────────
// Accommodation
// ─────────────────────────────────────────────────────────────────────────────

export async function getAccommodation(slug: string): Promise<AccommodationContent> {
  return readJson<AccommodationContent>(`content/accommodation/${slug}.json`);
}

export async function getAllAccommodationSlugs(): Promise<string[]> {
  return listJsonSlugs("content/accommodation");
}

export async function getAllAccommodation(): Promise<AccommodationContent[]> {
  const slugs = listJsonSlugs("content/accommodation");
  return slugs.map((slug) => readJson<AccommodationContent>(`content/accommodation/${slug}.json`));
}

// ─────────────────────────────────────────────────────────────────────────────
// Adventures
// ─────────────────────────────────────────────────────────────────────────────

export async function getAdventure(slug: string): Promise<AdventureContent> {
  return readJson<AdventureContent>(`content/adventures/${slug}.json`);
}

export async function getAllAdventureSlugs(): Promise<string[]> {
  return listJsonSlugs("content/adventures");
}

export async function getAllAdventures(): Promise<AdventureContent[]> {
  const slugs = listJsonSlugs("content/adventures");
  return slugs.map((slug) => readJson<AdventureContent>(`content/adventures/${slug}.json`));
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────

export async function getSiteContent(): Promise<SiteContent> {
  return readJson<SiteContent>("content/site.json");
}

export async function getNav(): Promise<NavContent> {
  return readJson<NavContent>("content/nav.json");
}

// ─────────────────────────────────────────────────────────────────────────────
// Listing pages
// ─────────────────────────────────────────────────────────────────────────────

export async function getPageContent(slug: string): Promise<ListingPageContent> {
  return readJson<ListingPageContent>(`content/pages/${slug}.json`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact page
// ─────────────────────────────────────────────────────────────────────────────

export async function getContactPageContent(_slug: string): Promise<ContactPageContent> {
  return readJson<ContactPageContent>("content/pages/contact.json");
}

// ─────────────────────────────────────────────────────────────────────────────
// Gallery page
// ─────────────────────────────────────────────────────────────────────────────

export async function getGalleryPageContent(_slug: string): Promise<GalleryPageContent> {
  return readJson<GalleryPageContent>("content/pages/gallery.json");
}
