import { databaseClient } from "./tina-client";
import type {
  AccommodationQuery,
  AccommodationConnectionQuery,
  AdventuresQuery,
  AdventuresConnectionQuery,
  ListingPagesQuery,
  ContactPageQuery,
  GalleryPageQuery,
  SiteQuery,
  NavQuery,
  ListingPagesItemsBlocks,
} from "../../.tina/__generated__/types";

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

// ─────────────────────────────────────────────────────────────────────────────
// Mapping helpers (Tina → app types)
// ─────────────────────────────────────────────────────────────────────────────

type TinaInfoSection = {
  heading: string;
  content?: Array<string | null> | null;
  align?: string | null;
};

function mapInfoSection(s: TinaInfoSection): InfoSection {
  const items = (s.content ?? []).filter((c): c is string => c !== null);
  return {
    heading: s.heading,
    // Preserve single-string shorthand; renderer handles both.
    content: items.length === 1 ? items[0] : items,
    align: (s.align as InfoSection["align"]) ?? undefined,
  };
}

type TinaCta = {
  heading: string;
  description?: string | null;
  button?: { href?: string | null; label?: string | null } | null;
} | null | undefined;

function mapCta(cta: TinaCta): DetailCTA | undefined {
  if (!cta) return undefined;
  return {
    heading: cta.heading,
    description: cta.description ?? undefined,
    button:
      cta.button?.href && cta.button?.label
        ? { href: cta.button.href, label: cta.button.label }
        : undefined,
  };
}

function mapBlock(block: ListingPagesItemsBlocks): CardBlock {
  switch (block.__typename) {
    case "ListingPagesItemsBlocksTitle":
      return { type: "title", content: block.content ?? "" };
    case "ListingPagesItemsBlocksText":
      return { type: "text", content: block.content ?? "" };
    case "ListingPagesItemsBlocksSubheading":
      return { type: "subheading", content: block.content ?? "" };
    case "ListingPagesItemsBlocksList":
      return {
        type: "list",
        content: [],
        contentItems: (block.contentItems ?? []).filter(
          (s): s is string => s !== null
        ),
      };
    default:
      return { type: "text", content: "" };
  }
}

type TinaAccommodation = AccommodationQuery["accommodation"];
type TinaAdventures = AdventuresQuery["adventures"];
type TinaListingPages = ListingPagesQuery["listingPages"];
type TinaContactPage = ContactPageQuery["contactPage"];
type TinaGalleryPage = GalleryPageQuery["galleryPage"];
type TinaSite = SiteQuery["site"];
type TinaNav = NavQuery["nav"];
type TinaAccommodationNode = NonNullable<
  NonNullable<AccommodationConnectionQuery["accommodationConnection"]["edges"]>[number]
>["node"];
type TinaAdventuresNode = NonNullable<
  NonNullable<AdventuresConnectionQuery["adventuresConnection"]["edges"]>[number]
>["node"];

function mapAccommodation(data: TinaAccommodation | TinaAccommodationNode): AccommodationContent {
  if (!data) throw new Error("Accommodation data is null");
  return {
    slug: data.slug,
    title: data.title,
    description: data.description,
    hero: {
      mobileSrc: data.hero?.mobileSrc ?? "",
      desktopSrc: data.hero?.desktopSrc ?? "",
    },
    gallery: (data.gallery ?? [])
      .filter((g): g is NonNullable<typeof g> => g !== null)
      .map((g) => ({ src: g.src ?? "", alt: g.alt ?? "", fullSize: g.fullSize ?? "" })),
    imagesPerPage: data.imagesPerPage ?? undefined,
    cardImage: data.cardImage ?? "",
    cardMobileImage: data.cardMobileImage ?? undefined,
    cardDescription: data.cardDescription ?? "",
    cardFeatures: (data.cardFeatures ?? []).filter((f): f is string => f !== null),
    showBookNow: data.showBookNow ?? undefined,
    infoSections: data.infoSections
      ? data.infoSections
          .filter((s): s is NonNullable<typeof s> => s !== null)
          .map(mapInfoSection)
      : undefined,
    cta: mapCta(data.cta),
  };
}

function mapAdventure(data: TinaAdventures | TinaAdventuresNode): AdventureContent {
  if (!data) throw new Error("Adventure data is null");
  return {
    slug: data.slug,
    title: data.title,
    description: data.description,
    category: data.category ?? "",
    hero: {
      mobileSrc: data.hero?.mobileSrc ?? "",
      desktopSrc: data.hero?.desktopSrc ?? "",
    },
    gallery: (data.gallery ?? [])
      .filter((g): g is NonNullable<typeof g> => g !== null)
      .map((g) => ({ src: g.src ?? "", alt: g.alt ?? "", fullSize: g.fullSize ?? "" })),
    imagesPerPage: data.imagesPerPage ?? undefined,
    cardImage: data.cardImage ?? "",
    cardMobileImage: data.cardMobileImage ?? "",
    cardDescription: data.cardDescription ?? "",
    cardFeatures: (data.cardFeatures ?? []).filter((f): f is string => f !== null),
    infoSections: data.infoSections
      ? data.infoSections
          .filter((s): s is NonNullable<typeof s> => s !== null)
          .map(mapInfoSection)
      : undefined,
    cta: mapCta(data.cta),
  };
}

function mapListingPage(data: TinaListingPages): ListingPageContent {
  return {
    title: data.title,
    description: data.description ?? undefined,
    hero: {
      mobileSrc: data.hero?.mobileSrc ?? "",
      desktopSrc: data.hero?.desktopSrc ?? "",
    },
    items: (data.items ?? [])
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .map((item) => ({
        image: item.image ?? "",
        href: item.href ?? undefined,
        blocks: (item.blocks ?? [])
          .filter((b): b is NonNullable<typeof b> => b !== null)
          .map(mapBlock),
      })),
    columns: data.columns ?? undefined,
    showBookNow: data.showBookNow ?? undefined,
    infoSections: data.infoSections
      ? data.infoSections
          .filter((s): s is NonNullable<typeof s> => s !== null)
          .map(mapInfoSection)
      : undefined,
    cta: mapCta(data.cta),
    footnote: data.footnote ?? undefined,
    galleryHeading: data.galleryHeading ?? undefined,
  };
}

function mapContactPage(data: TinaContactPage): ContactPageContent {
  return {
    title: data.title ?? "",
    mobileSrc: data.mobileSrc ?? "",
    desktopSrc: data.desktopSrc ?? "",
    infoHeading: data.infoHeading ?? "",
    infoSections: (data.infoSections ?? [])
      .filter((s): s is NonNullable<typeof s> => s !== null)
      .map((s) => ({
        sectionTitle: s.sectionTitle ?? "",
        sectionsItems: (s.sectionsItems ?? []).filter(
          (i): i is string => i !== null
        ),
      })),
    formHeading: data.formHeading ?? "",
    formFields: (data.formFields ?? [])
      .filter((f): f is NonNullable<typeof f> => f !== null)
      .map((f) => ({
        name: f.name ?? "",
        label: f.label ?? "",
        type: f.type ?? "text",
        placeholder: f.placeholder ?? undefined,
        required: f.required ?? undefined,
      })),
    formSubmitLabel: data.formSubmitLabel ?? "",
  };
}

function mapGalleryPage(data: TinaGalleryPage): GalleryPageContent {
  return {
    galleryHeading: data.galleryHeading ?? "",
    galleryDetail: data.galleryDetail ?? "",
    emptyMessage: data.emptyMessage ?? "",
  };
}

function mapSite(data: TinaSite): SiteContent {
  return {
    address: data.address ?? "",
    phone: data.phone ?? "",
    email: data.email ?? "",
    social: {
      facebook: data.social?.facebook ?? "",
      instagram: data.social?.instagram ?? "",
      youtube: data.social?.youtube ?? "",
    },
    seo: {
      defaultTitle: data.seo?.defaultTitle ?? "",
      defaultDescription: data.seo?.defaultDescription ?? "",
      home: {
        title: data.seo?.home?.title ?? "",
        description: data.seo?.home?.description ?? "",
      },
    },
    errors: {
      generic: {
        title: data.errors?.generic?.title ?? "",
        message: data.errors?.generic?.message ?? "",
        button: data.errors?.generic?.button ?? "",
      },
      gallery: {
        title: data.errors?.gallery?.title ?? "",
        message: data.errors?.gallery?.message ?? "",
        button: data.errors?.gallery?.button ?? "",
      },
    },
    defaults: {
      galleryHeading: data.defaults?.galleryHeading ?? "Gallery",
    },
  };
}

function mapNav(data: TinaNav): NavContent {
  const mapLinks = (
    links: Array<{ href?: string | null; label?: string | null } | null> | null | undefined
  ): NavLink[] =>
    (links ?? [])
      .filter((l): l is NonNullable<typeof l> => l !== null)
      .map((l) => ({ href: l.href ?? "", label: l.label ?? "" }));

  return {
    topLevelLinks: mapLinks(data.topLevelLinks),
    accommodationLinks: mapLinks(data.accommodationLinks),
    adventureLinks: mapLinks(data.adventureLinks),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Accommodation
// ─────────────────────────────────────────────────────────────────────────────

export async function getAccommodation(slug: string): Promise<AccommodationContent> {
  const res = await databaseClient.queries.accommodation({ relativePath: `${slug}.json` });
  return mapAccommodation(res.data.accommodation);
}

export async function getAllAccommodationSlugs(): Promise<string[]> {
  const res = await databaseClient.queries.accommodationConnection({ first: 100 });
  return (res.data.accommodationConnection.edges ?? [])
    .filter((e): e is NonNullable<typeof e> => e?.node != null)
    .map((e) => e.node!._sys.filename);
}

export async function getAllAccommodation(): Promise<AccommodationContent[]> {
  const res = await databaseClient.queries.accommodationConnection({ first: 100 });
  return (res.data.accommodationConnection.edges ?? [])
    .filter((e): e is NonNullable<typeof e> => e?.node != null)
    .map((e) => mapAccommodation(e.node!));
}

// ─────────────────────────────────────────────────────────────────────────────
// Adventures
// ─────────────────────────────────────────────────────────────────────────────

export async function getAdventure(slug: string): Promise<AdventureContent> {
  const res = await databaseClient.queries.adventures({ relativePath: `${slug}.json` });
  return mapAdventure(res.data.adventures);
}

export async function getAllAdventureSlugs(): Promise<string[]> {
  const res = await databaseClient.queries.adventuresConnection({ first: 100 });
  return (res.data.adventuresConnection.edges ?? [])
    .filter((e): e is NonNullable<typeof e> => e?.node != null)
    .map((e) => e.node!._sys.filename);
}

export async function getAllAdventures(): Promise<AdventureContent[]> {
  const res = await databaseClient.queries.adventuresConnection({ first: 100 });
  return (res.data.adventuresConnection.edges ?? [])
    .filter((e): e is NonNullable<typeof e> => e?.node != null)
    .map((e) => mapAdventure(e.node!));
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────

export async function getSiteContent(): Promise<SiteContent> {
  const res = await databaseClient.queries.site({ relativePath: "site.json" });
  return mapSite(res.data.site);
}

export async function getNav(): Promise<NavContent> {
  const res = await databaseClient.queries.nav({ relativePath: "nav.json" });
  return mapNav(res.data.nav);
}

// ─────────────────────────────────────────────────────────────────────────────
// Listing pages
// ─────────────────────────────────────────────────────────────────────────────

export async function getPageContent(slug: string): Promise<ListingPageContent> {
  const res = await databaseClient.queries.listingPages({ relativePath: `${slug}.json` });
  return mapListingPage(res.data.listingPages);
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact page
// ─────────────────────────────────────────────────────────────────────────────

export async function getContactPageContent(_slug: string): Promise<ContactPageContent> {
  const res = await databaseClient.queries.contactPage({ relativePath: "contact.json" });
  return mapContactPage(res.data.contactPage);
}

// ─────────────────────────────────────────────────────────────────────────────
// Gallery page
// ─────────────────────────────────────────────────────────────────────────────

export async function getGalleryPageContent(_slug: string): Promise<GalleryPageContent> {
  const res = await databaseClient.queries.galleryPage({ relativePath: "gallery.json" });
  return mapGalleryPage(res.data.galleryPage);
}
