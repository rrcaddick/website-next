# Refactor Plan: Template + CMS Architecture

**Produced:** 2026-04-06  
**Based on:** Full analysis of `/home/ray/repos/next` codebase  
**Status:** Implementation-ready

---

## 1. Duplication Report

### 1.1 Accommodation — 9 Near-Identical Page Files

The following 9 files share an **identical layout structure** with only text and image paths varying:

| File | Differences |
|------|-------------|
| `src/app/accommodation/camping/page.tsx` | Mixed gallery (wrong paths referencing double-en-suite), no en-suite |
| `src/app/accommodation/double-en-suite/page.tsx` | En-suite bathroom items |
| `src/app/accommodation/family-en-suite-rondawel/page.tsx` | Rondawel-specific items |
| `src/app/accommodation/family-room/page.tsx` | Family bed config |
| `src/app/accommodation/five-sleeper/page.tsx` | 5-person bed config |
| `src/app/accommodation/gypsy-caravan/page.tsx` | Caravan-specific items |
| `src/app/accommodation/mixed-dorm/page.tsx` | Dorm-specific items |
| `src/app/accommodation/safari-tent/page.tsx` | Tent-specific items |
| `src/app/accommodation/twin-room/page.tsx` | Twin bed items |

**Shared layout structure (copy-pasted across all 9):**

```
<PageHero mobileSrc desktopSrc title />
<div> description paragraph </div>
<BookNowButton />
<ImageGallery images imagesPerPage={8} />
<div> 3-column grid: What's Included | Rules of the Forest | Shared Facilities </div>
<LogoSection />
```

**Hardcoded duplication per file:**
- `const galleryImages = [...]` — 8 image objects each, fully hardcoded
- Description paragraph text — unique per page, hardcoded in JSX
- "What's Included" list items — unique per page, hardcoded in JSX
- "Shared Facilities" list items — repeated verbatim across most pages
- "Rules of the Forest" list items — identical across 7 of 9 pages

**Outlier:** `src/app/accommodation/double-en-suite-rondawel/page.tsx`  
This page deviates significantly:
- Uses a local `MobileImageModal` component (`./MobileImageModal.tsx`)
- Image paths use a non-standard `thumbnails/` and `full/` convention (not `gallery/thumb/` and `gallery/full/`)
- References `/images/accommodation/banners/double-en-suite-rondawel-banner.webp` (a path that does not exist in `/public/images/`)
- Has an inline `<Link>` for the booking button (bypasses `BookNowButton`)
- Desktop info section uses different section titles: "General Info", "What to Bring", "House Rules" instead of "What's Included", "Rules of the Forest", "Shared Facilities"
- This page needs to be normalised to the standard pattern before templating

### 1.2 Adventures — 11 Near-Identical Page Files

The following 11 files share an **identical layout structure**:

| File | Differences |
|------|-------------|
| `src/app/adventures/ancient-archives/page.tsx` | Indoor activity info |
| `src/app/adventures/bosduif-trail/page.tsx` | Loop trail info |
| `src/app/adventures/brown-hooded-kingfisher-trail/page.tsx` | 13 gallery images |
| `src/app/adventures/fairy-labyrinth/page.tsx` | Labyrinth info |
| `src/app/adventures/half-collared-kingfisher-trail/page.tsx` | 32 gallery images |
| `src/app/adventures/horseriding/page.tsx` | Horseriding-specific |
| `src/app/adventures/kayaking/page.tsx` | Water activity info |
| `src/app/adventures/map-of-africa/page.tsx` | Viewpoint info |
| `src/app/adventures/paragliding/page.tsx` | 10 gallery images |
| `src/app/adventures/wilderness-beach/page.tsx` | Beach info |
| `src/app/adventures/water-under-the-bridge/page.tsx` | Bridge jump info |
| `src/app/adventures/woodville-big-tree/page.tsx` | Forest tree info |

**Shared layout structure (copy-pasted across all 11):**

```
<PageHero mobileSrc desktopSrc title />
<div> description paragraph </div>
<ImageGallery images imagesPerPage={8} />
<div> 2-column grid: General Info | What to Bring </div>
<LogoSection />
```

**Hardcoded duplication per file:**
- `const galleryImages = [...]` — 7–32 image objects each, fully hardcoded
- Description paragraph text — unique per page, hardcoded in JSX
- "General Info" list items — unique per page, hardcoded in JSX
- "What to Bring" list items — largely repeated across pages, hardcoded in JSX

**Outlier:** `src/app/adventures/lazy-library/page.tsx`  
This page deviates significantly:
- Uses a custom 9-column grid layout instead of `ImageGallery`
- References images at `/images/Adventures/Lazy Library/library-*.jpg` (wrong casing — actual filesystem uses lowercase kebab-case, these images do not exist)
- Uses `banners/` image path convention that does not exist
- Contains placeholder "Coming Soon" image blocks
- Is a legacy/draft page that needs to be rebuilt to the standard template or deleted

### 1.3 Layout Duplication Summary

| Duplicated Element | Location | Instances |
|---|---|---|
| Full accommodation page structure | 9 accommodation `page.tsx` files | 9× |
| Full adventure page structure | 11 adventure `page.tsx` files | 11× |
| `galleryImages` const array | All individual accommodation/adventure pages | 20× |
| Rules of the Forest content | Most accommodation pages | 7× identical |
| Shared Facilities content | Most accommodation pages | 7× nearly identical |
| "What to Bring" content | Most adventure pages | 9× nearly identical |

---

## 2. Component Strategy

### 2.1 UI Components (`src/components/ui/`)

| Component | Action | Reason |
|---|---|---|
| `PageHero.tsx` | **Reuse as-is** | Already parameterised, used correctly |
| `BookNowButton.tsx` | **Reuse as-is** | Already correct; inline `<Link>` in `double-en-suite-rondawel` is a violation to fix |
| `LogoSection.tsx` | **Reuse as-is** | Shared across many pages |

### 2.2 Gallery Components

| Component | Action | Reason |
|---|---|---|
| `src/components/gallery/ImageGallery.tsx` | **Reuse as-is** | Fully functional, paginated, modal-capable |
| `src/app/accommodation/double-en-suite-rondawel/MobileImageModal.tsx` | **Remove** | Local component; superseded by `ImageGallery`, not part of standard pattern |

### 2.3 Feature Components (`src/components/features/`)

| Component | Action | Reason |
|---|---|---|
| `accommodation/AccommodationDesktopGrid.tsx` | **Refactor** | Reads from `data.ts`; redirect to read from `/content` loader instead |
| `accommodation/AccommodationMobileList.tsx` | **Refactor** | Same; replace `data.ts` import with content loader |
| `accommodation/AccommodationCardImage.tsx` | **Reuse as-is** | Presentational; no content |
| `accommodation/data.ts` | **Remove** | Data moves to `/content/accommodation/`; this file becomes obsolete |
| `adventures/AdventuresMobileList.tsx` | **Refactor** | Replace `data.ts` import with content loader |
| `adventures/data.ts` | **Remove** | Data moves to `/content/adventures/`; this file becomes obsolete |
| `entertainment/EntertainmentMobileCards.tsx` | **Refactor** | Replace `data.ts` import with content loader |
| `entertainment/data.ts` | **Remove** | Data moves to `/content/entertainment/` |
| `facilities/FacilitiesMobileAccordion.tsx` | **Refactor** | Currently receives `facilityCategories` as prop from page; good pattern, keep it |
| `gallery/GalleryClient.tsx` | **Reuse as-is** | Uses API, no hardcoded content |
| `gallery/GalleryFilters.tsx` | **Reuse as-is** | Presentational |
| `gallery/GalleryGrid.tsx` | **Reuse as-is** | Presentational |
| `gallery/GalleryModal.tsx` | **Reuse as-is** | Presentational |
| `venue/VenueMobileCards.tsx` | **Reuse as-is** | No hardcoded content issues |
| `venue/WeddingGallery.tsx` | **Reuse as-is** | No hardcoded content issues |

### 2.4 Layout Components

| Component | Action | Reason |
|---|---|---|
| `layout/SiteHeader.tsx` | **Reuse as-is** | Already reads from `src/data/nav.ts` |
| `layout/SiteFooter.tsx` | **Reuse as-is** | No issues identified |
| `layout/MobileMenu.tsx` | **Reuse as-is** | No issues identified |
| `src/data/nav.ts` | **Move to `/content/nav.json`** | Navigation is content; hardcoded in source |
| `theme/MouseGradientCard.tsx` | **Reuse as-is** | Presentational UI only |

---

## 3. Template Design

### 3.1 `AccommodationPageTemplate`

**Location:** `src/features/accommodation/template.tsx`

**TypeScript Props Interface:**

```typescript
interface AccommodationPageTemplateProps {
  slug: string
  title: string
  description: string
  hero: {
    mobileSrc: string
    desktopSrc: string
  }
  gallery: GalleryImage[]
  imagesPerPage?: number
  whatsIncluded: string[]
  sharedFacilities: string[]
  rulesOfTheForest: string[]
}

interface GalleryImage {
  src: string
  alt: string
  fullSize: string
}
```

**Section Layout (ordered):**
1. `<PageHero mobileSrc={hero.mobileSrc} desktopSrc={hero.desktopSrc} title={title} />`
2. Description paragraph
3. `<BookNowButton />`
4. `<ImageGallery images={gallery} imagesPerPage={imagesPerPage ?? 8} />`
5. 3-column feature grid:
   - Col 1: "What's Included" — `whatsIncluded`
   - Col 2: "Rules of the Forest" — `rulesOfTheForest`
   - Col 3: "Shared Facilities" — `sharedFacilities`
6. `<LogoSection />`

**Mapping to existing components:**
- `PageHero` → `src/components/ui/PageHero.tsx`
- `BookNowButton` → `src/components/ui/BookNowButton.tsx`
- `ImageGallery` → `src/components/gallery/ImageGallery.tsx`
- `LogoSection` → `src/components/ui/LogoSection.tsx`
- Feature grid → inline in template (no separate component needed for a 3-item list)

### 3.2 `AdventurePageTemplate`

**Location:** `src/features/adventures/template.tsx`

**TypeScript Props Interface:**

```typescript
interface AdventurePageTemplateProps {
  slug: string
  title: string
  description: string
  hero: {
    mobileSrc: string
    desktopSrc: string
  }
  gallery: GalleryImage[]
  imagesPerPage?: number
  generalInfo: string[]
  whatToBring: string[]
}
```

**Section Layout (ordered):**
1. `<PageHero mobileSrc={hero.mobileSrc} desktopSrc={hero.desktopSrc} title={title} />`
2. Description paragraph
3. `<ImageGallery images={gallery} imagesPerPage={imagesPerPage ?? 8} />`
4. 2-column info grid:
   - Col 1: "General Info" — `generalInfo`
   - Col 2: "What to Bring" — `whatToBring`
5. `<LogoSection />`

**Mapping to existing components:**
- `PageHero` → `src/components/ui/PageHero.tsx`
- `ImageGallery` → `src/components/gallery/ImageGallery.tsx`
- `LogoSection` → `src/components/ui/LogoSection.tsx`
- Info grid → inline in template

---

## 4. Content Models

### 4.1 Accommodation

```typescript
// /content/accommodation/[slug].json
interface AccommodationContent {
  slug: string                   // required — kebab-case, maps to URL
  title: string                  // required — e.g. "Safari Tent"
  description: string            // required — page intro paragraph
  hero: {
    mobileSrc: string            // required — e.g. "/images/accommodation/safari-tent/hero/mobile.webp"
    desktopSrc: string           // required — e.g. "/images/accommodation/safari-tent/hero/desktop.webp"
  }
  gallery: Array<{
    src: string                  // required — thumb image path
    alt: string                  // required
    fullSize: string             // required — full image path
  }>
  imagesPerPage?: number         // optional — defaults to 8
  whatsIncluded: string[]        // required — list items
  sharedFacilities: string[]     // required — list items
  rulesOfTheForest: string[]     // required — list items

  // Fields used by the index page listing (AccommodationDesktopGrid / MobileList)
  cardImage: string              // required — card thumbnail for index page
  cardMobileImage?: string       // optional — mobile card image
  cardDescription: string        // required — short description for cards
  cardFeatures: string[]         // required — bullet list for cards (3 items)
}
```

### 4.2 Adventures

```typescript
// /content/adventures/[slug].json
interface AdventureContent {
  slug: string                   // required — kebab-case, maps to URL
  title: string                  // required — e.g. "Kayaking"
  description: string            // required — page intro paragraph
  category: string               // required — e.g. "Hiking", "Water Activities"
  hero: {
    mobileSrc: string            // required
    desktopSrc: string           // required
  }
  gallery: Array<{
    src: string                  // required
    alt: string                  // required
    fullSize: string             // required
  }>
  imagesPerPage?: number         // optional — defaults to 8
  generalInfo: string[]          // required — list items
  whatToBring: string[]          // required — list items

  // Fields used by the index page listing
  cardImage: string              // required — desktop card image
  cardMobileImage: string        // required — mobile card image
  cardDescription: string        // required — short description for cards
  cardFeatures: string[]         // required — bullet list for cards
}
```

### 4.3 Facilities

```typescript
// /content/facilities/facilities.json
interface FacilitiesContent {
  heroMobile: string
  heroDesktop: string
  description: string
  categories: Array<{
    id: number
    title: string
    image: string
    facilities: Array<{
      name: string
      features: string[]
    }>
  }>
  houseRules: string[]
  receptionHours: string[]
}
```

### 4.4 Navigation

```typescript
// /content/nav.json
interface NavContent {
  accommodationLinks: Array<{ href: string; label: string }>
  adventureLinks: Array<{ href: string; label: string }>
}
```

### 4.5 Entertainment

```typescript
// /content/entertainment/events.json
interface EntertainmentContent {
  heroMobile: string
  heroDesktop: string
  description: string
  events: Array<{
    title: string
    schedule: string
    description: string
    image: string
    mobileImage: string
  }>
}
```

---

## 5. Content Folder Structure

```
/content
├── nav.json                              # Navigation links (replaces src/data/nav.ts)
│
├── accommodation/
│   ├── camping.json
│   ├── safari-tent.json
│   ├── gypsy-caravan.json
│   ├── mixed-dorm.json
│   ├── twin-room.json
│   ├── family-room.json
│   ├── five-sleeper.json
│   ├── double-en-suite.json
│   ├── family-en-suite-rondawel.json
│   └── double-en-suite-rondawel.json     # Normalised from outlier
│
├── adventures/
│   ├── kayaking.json
│   ├── paragliding.json
│   ├── horseriding.json
│   ├── half-collared-kingfisher-trail.json
│   ├── brown-hooded-kingfisher-trail.json
│   ├── bosduif-trail.json
│   ├── woodville-big-tree.json
│   ├── map-of-africa.json
│   ├── wilderness-beach.json
│   ├── water-under-the-bridge.json
│   ├── fairy-labyrinth.json
│   ├── ancient-archives.json
│   └── lazy-library.json                 # Rebuilt from outlier (see §9)
│
├── entertainment/
│   └── events.json
│
└── facilities/
    └── facilities.json
```

**File naming rules:**
- All filenames use kebab-case matching the URL slug exactly
- Slug = filename without `.json` = URL path segment

**Slug-to-route mapping:**
- `/content/accommodation/safari-tent.json` → `/accommodation/safari-tent`
- `/content/adventures/kayaking.json` → `/adventures/kayaking`

---

## 6. Dynamic Routing Strategy

### 6.1 Route Structure

Replace all individual static route directories with two dynamic routes:

```
src/app/accommodation/[slug]/page.tsx   (replaces 9 static dirs + their page.tsx files)
src/app/adventures/[slug]/page.tsx      (replaces 12 static dirs + their page.tsx files)
```

The index pages remain:
```
src/app/accommodation/page.tsx          (remains, updated to read from content)
src/app/adventures/page.tsx             (remains, updated to read from content)
```

### 6.2 Data Loading Mechanism

Create utility loaders:

```typescript
// src/lib/content.ts

import fs from 'fs'
import path from 'path'

export function getAccommodation(slug: string): AccommodationContent {
  const file = path.join(process.cwd(), 'content', 'accommodation', `${slug}.json`)
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

export function getAllAccommodationSlugs(): string[] {
  const dir = path.join(process.cwd(), 'content', 'accommodation')
  return fs.readdirSync(dir).map(f => f.replace('.json', ''))
}

export function getAdventure(slug: string): AdventureContent {
  const file = path.join(process.cwd(), 'content', 'adventures', `${slug}.json`)
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

export function getAllAdventureSlugs(): string[] {
  const dir = path.join(process.cwd(), 'content', 'adventures')
  return fs.readdirSync(dir).map(f => f.replace('.json', ''))
}
```

### 6.3 `generateStaticParams` Implementation

```typescript
// src/app/accommodation/[slug]/page.tsx
export async function generateStaticParams() {
  return getAllAccommodationSlugs().map(slug => ({ slug }))
}

// src/app/adventures/[slug]/page.tsx
export async function generateStaticParams() {
  return getAllAdventureSlugs().map(slug => ({ slug }))
}
```

### 6.4 Missing Content Handling

If a slug has no matching JSON file, return a `notFound()`:

```typescript
import { notFound } from 'next/navigation'

export default function Page({ params }: { params: { slug: string } }) {
  let content: AccommodationContent
  try {
    content = getAccommodation(params.slug)
  } catch {
    notFound()
  }
  return <AccommodationPageTemplate {...content} />
}
```

---

## 7. TinaCMS Schema Design

```typescript
// tina/config.ts

import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [

      // ── Accommodation ────────────────────────────────────────────────────
      {
        name: 'accommodation',
        label: 'Accommodation',
        path: 'content/accommodation',
        format: 'json',
        fields: [
          { name: 'slug', label: 'Slug', type: 'string', required: true },
          { name: 'title', label: 'Title', type: 'string', required: true },
          { name: 'description', label: 'Description', type: 'string', ui: { component: 'textarea' }, required: true },
          {
            name: 'hero',
            label: 'Hero Images',
            type: 'object',
            fields: [
              { name: 'mobileSrc', label: 'Mobile Image', type: 'image', required: true },
              { name: 'desktopSrc', label: 'Desktop Image', type: 'image', required: true },
            ],
          },
          {
            name: 'gallery',
            label: 'Gallery Images',
            type: 'object',
            list: true,
            fields: [
              { name: 'src', label: 'Thumbnail', type: 'image', required: true },
              { name: 'alt', label: 'Alt Text', type: 'string', required: true },
              { name: 'fullSize', label: 'Full Size', type: 'image', required: true },
            ],
          },
          { name: 'imagesPerPage', label: 'Images Per Page', type: 'number' },
          { name: 'whatsIncluded', label: "What's Included", type: 'string', list: true, required: true },
          { name: 'sharedFacilities', label: 'Shared Facilities', type: 'string', list: true, required: true },
          { name: 'rulesOfTheForest', label: 'Rules of the Forest', type: 'string', list: true, required: true },
          { name: 'cardImage', label: 'Card Image (Desktop)', type: 'image', required: true },
          { name: 'cardMobileImage', label: 'Card Image (Mobile)', type: 'image' },
          { name: 'cardDescription', label: 'Card Description', type: 'string', required: true },
          { name: 'cardFeatures', label: 'Card Features', type: 'string', list: true, required: true },
        ],
      },

      // ── Adventures ───────────────────────────────────────────────────────
      {
        name: 'adventures',
        label: 'Adventures',
        path: 'content/adventures',
        format: 'json',
        fields: [
          { name: 'slug', label: 'Slug', type: 'string', required: true },
          { name: 'title', label: 'Title', type: 'string', required: true },
          { name: 'description', label: 'Description', type: 'string', ui: { component: 'textarea' }, required: true },
          { name: 'category', label: 'Category', type: 'string', required: true },
          {
            name: 'hero',
            label: 'Hero Images',
            type: 'object',
            fields: [
              { name: 'mobileSrc', label: 'Mobile Image', type: 'image', required: true },
              { name: 'desktopSrc', label: 'Desktop Image', type: 'image', required: true },
            ],
          },
          {
            name: 'gallery',
            label: 'Gallery Images',
            type: 'object',
            list: true,
            fields: [
              { name: 'src', label: 'Thumbnail', type: 'image', required: true },
              { name: 'alt', label: 'Alt Text', type: 'string', required: true },
              { name: 'fullSize', label: 'Full Size', type: 'image', required: true },
            ],
          },
          { name: 'imagesPerPage', label: 'Images Per Page', type: 'number' },
          { name: 'generalInfo', label: 'General Info', type: 'string', list: true, required: true },
          { name: 'whatToBring', label: 'What to Bring', type: 'string', list: true, required: true },
          { name: 'cardImage', label: 'Card Image (Desktop)', type: 'image', required: true },
          { name: 'cardMobileImage', label: 'Card Image (Mobile)', type: 'image', required: true },
          { name: 'cardDescription', label: 'Card Description', type: 'string', required: true },
          { name: 'cardFeatures', label: 'Card Features', type: 'string', list: true, required: true },
        ],
      },

      // ── Entertainment ────────────────────────────────────────────────────
      {
        name: 'entertainment',
        label: 'Entertainment',
        path: 'content/entertainment',
        format: 'json',
        fields: [
          { name: 'heroMobile', label: 'Hero Mobile', type: 'image', required: true },
          { name: 'heroDesktop', label: 'Hero Desktop', type: 'image', required: true },
          { name: 'description', label: 'Description', type: 'string', ui: { component: 'textarea' }, required: true },
          {
            name: 'events',
            label: 'Events',
            type: 'object',
            list: true,
            fields: [
              { name: 'title', label: 'Title', type: 'string', required: true },
              { name: 'schedule', label: 'Schedule', type: 'string', required: true },
              { name: 'description', label: 'Description', type: 'string', ui: { component: 'textarea' }, required: true },
              { name: 'image', label: 'Desktop Image', type: 'image', required: true },
              { name: 'mobileImage', label: 'Mobile Image', type: 'image', required: true },
            ],
          },
        ],
      },

      // ── Facilities ───────────────────────────────────────────────────────
      {
        name: 'facilities',
        label: 'Facilities',
        path: 'content/facilities',
        format: 'json',
        fields: [
          { name: 'heroMobile', label: 'Hero Mobile', type: 'image', required: true },
          { name: 'heroDesktop', label: 'Hero Desktop', type: 'image', required: true },
          { name: 'description', label: 'Description', type: 'string', ui: { component: 'textarea' }, required: true },
          {
            name: 'categories',
            label: 'Facility Categories',
            type: 'object',
            list: true,
            fields: [
              { name: 'id', label: 'ID', type: 'number', required: true },
              { name: 'title', label: 'Title', type: 'string', required: true },
              { name: 'image', label: 'Image', type: 'image', required: true },
              {
                name: 'facilities',
                label: 'Facilities',
                type: 'object',
                list: true,
                fields: [
                  { name: 'name', label: 'Name', type: 'string', required: true },
                  { name: 'features', label: 'Features', type: 'string', list: true, required: true },
                ],
              },
            ],
          },
          { name: 'houseRules', label: 'House Rules', type: 'string', list: true, required: true },
          { name: 'receptionHours', label: 'Reception Hours', type: 'string', list: true, required: true },
        ],
      },

      // ── Navigation ───────────────────────────────────────────────────────
      {
        name: 'nav',
        label: 'Navigation',
        path: 'content',
        format: 'json',
        match: { include: 'nav' },
        fields: [
          {
            name: 'accommodationLinks',
            label: 'Accommodation Links',
            type: 'object',
            list: true,
            fields: [
              { name: 'href', label: 'Href', type: 'string', required: true },
              { name: 'label', label: 'Label', type: 'string', required: true },
            ],
          },
          {
            name: 'adventureLinks',
            label: 'Adventure Links',
            type: 'object',
            list: true,
            fields: [
              { name: 'href', label: 'Href', type: 'string', required: true },
              { name: 'label', label: 'Label', type: 'string', required: true },
            ],
          },
        ],
      },

    ],
  },
})
```

---

## 8. API Review (`/api/gallery`)

**File:** `src/app/api/gallery/route.ts`

### 8.1 Findings

**Strengths:**
- Already filesystem-driven — no hardcoded image lists
- Handles accommodation, adventures, entertainment, facilities, and venue sub-dirs correctly
- Uses `revalidate = 3600` for edge caching
- Good helper functions (`isDir`, `fileExists`, `isImageFile`, `isGalleryImage`)
- Module-level caching via `cachedImages` prevents repeated filesystem reads per warm instance

**Issues:**
1. **Non-uniform path assumption:** Accommodation and venue subdirs expect `gallery/thumb/` + `gallery/full/` subdirs; entertainment and facilities expect a flat `images/` dir. This works but is inconsistent.
2. **Adventures scanning:** Scans `adventures/[name]/gallery/thumb/` but some adventure pages (kayaking, horseriding, paragliding) use `gallery/full/` as both src and fullSize — the gallery API will only show them if they also have a `gallery/thumb/` folder with files. Check that all adventure slugs have a `thumb/` dir or normalise the convention.
3. **`double-en-suite-rondawel` exclusion:** This accommodation's images are currently at non-standard paths (`thumbnails/`, `banners/`) — the gallery API will not pick them up. After migration to standard paths, they will be included automatically.
4. **`lazy-library` exclusion:** Images referenced at `/images/Adventures/Lazy Library/...` (wrong casing) are not scanned. After normalisation they will be included.

### 8.2 Suggested Utilities

Extract to `src/lib/gallery.ts`:

```typescript
export function buildGalleryImages(): GalleryImage[] { ... }
export function isDir(p: string): boolean { ... }
export function fileExists(p: string): boolean { ... }
export function isImageFile(name: string): boolean { ... }
export function isGalleryImage(name: string): boolean { ... }
```

This allows the gallery API route to stay lean (`import { buildGalleryImages } from '@/lib/gallery'`) and makes the logic testable independently.

### 8.3 Compatibility with New Structure

The gallery API is filesystem-based and **does not need to change** when content moves from `data.ts` to JSON files. It reads from `/public/images/`, not from `/content/`. No changes required to the API itself beyond the utility extraction suggested above.

---

## 9. Violations Report

### 9.1 Hardcoded Content in Pages

| File | Violation |
|---|---|
| `src/app/accommodation/camping/page.tsx` | `galleryImages` const (8 objects), description text, feature lists |
| `src/app/accommodation/double-en-suite/page.tsx` | `galleryImages` const (8 objects), description text, feature lists |
| `src/app/accommodation/double-en-suite-rondawel/page.tsx` | `galleryImages` const (2 objects), description text, feature lists, inline booking `<Link>` |
| `src/app/accommodation/family-en-suite-rondawel/page.tsx` | `galleryImages` const (8 objects), description text, feature lists |
| `src/app/accommodation/family-room/page.tsx` | `galleryImages` const (8 objects), description text, feature lists |
| `src/app/accommodation/five-sleeper/page.tsx` | `galleryImages` const (8 objects), description text, feature lists |
| `src/app/accommodation/gypsy-caravan/page.tsx` | `galleryImages` const (8 objects), description text, feature lists |
| `src/app/accommodation/mixed-dorm/page.tsx` | `galleryImages` const (8 objects), description text, feature lists |
| `src/app/accommodation/safari-tent/page.tsx` | `galleryImages` const (8 objects), description text, feature lists |
| `src/app/accommodation/twin-room/page.tsx` | `galleryImages` const (8 objects), description text, feature lists |
| `src/app/adventures/ancient-archives/page.tsx` | `galleryImages` const (8 objects), description text, info lists |
| `src/app/adventures/bosduif-trail/page.tsx` | `galleryImages` const (9 objects), description text, info lists |
| `src/app/adventures/brown-hooded-kingfisher-trail/page.tsx` | `galleryImages` const (13 objects), description text, info lists |
| `src/app/adventures/fairy-labyrinth/page.tsx` | `galleryImages` const (8 objects), description text, info lists |
| `src/app/adventures/half-collared-kingfisher-trail/page.tsx` | `galleryImages` const (32 objects), description text, info lists |
| `src/app/adventures/horseriding/page.tsx` | `galleryImages` const (8 objects), description text, info lists |
| `src/app/adventures/kayaking/page.tsx` | `galleryImages` const (8 objects), description text, info lists |
| `src/app/adventures/map-of-africa/page.tsx` | To be read (assumed same pattern) |
| `src/app/adventures/paragliding/page.tsx` | `galleryImages` const (10 objects), description text, info lists |
| `src/app/adventures/water-under-the-bridge/page.tsx` | (assumed same pattern) |
| `src/app/adventures/wilderness-beach/page.tsx` | (assumed same pattern) |
| `src/app/adventures/woodville-big-tree/page.tsx` | `galleryImages` const (8 objects), description text, info lists |
| `src/app/adventures/lazy-library/page.tsx` | `images` const (4 objects), bespoke layout, broken image paths |
| `src/app/facilities/page.tsx` | `facilityCategories` const (entire nested data structure), house rules text, reception hours text |
| `src/app/page.tsx` | `pages` const (6 card objects), description text, CTA text, riddle text |
| `src/app/adventures/page.tsx` | "Adventure Safely" tips list (8 items), description text |
| `src/app/accommodation/page.tsx` | Description text |
| `src/app/entertainment/page.tsx` | "Want to Perform?" section text, contact link |
| `src/data/nav.ts` | All navigation href+label pairs |

### 9.2 Inline Data in Source Files (Not `/content`)

| File | Violation |
|---|---|
| `src/components/features/accommodation/data.ts` | Full `roomTypes` array including names, descriptions, images, features |
| `src/components/features/adventures/data.ts` | Full `activities` array including names, descriptions, images, features, categories |
| `src/components/features/entertainment/data.ts` | Full `events` array including titles, schedules, descriptions, images |
| `src/data/nav.ts` | Navigation links |

### 9.3 Duplicated Layouts

| Violation | Count |
|---|---|
| Full accommodation page layout (PageHero + desc + BookNow + Gallery + 3-col grid + Logo) | 9× |
| Full adventure page layout (PageHero + desc + Gallery + 2-col grid + Logo) | 11× |
| `const galleryImages = [...]` defined in every page | 20× |
| "Rules of the Forest" content (identical 5 items) | 7× |
| "What to Bring" content (nearly identical 5 items) | 9× |

### 9.4 Broken/Non-standard Image Paths

| File | Issue |
|---|---|
| `src/app/accommodation/double-en-suite-rondawel/page.tsx` | References `/images/accommodation/banners/double-en-suite-rondawel-banner.webp` (directory does not exist in `/public/images/`) |
| `src/app/accommodation/double-en-suite-rondawel/page.tsx` | References `/images/accommodation/double-en-suite-rondawel/thumbnails/...` (no `double-en-suite-rondawel/` dir exists in `/public/images/accommodation/`) |
| `src/app/adventures/lazy-library/page.tsx` | References `/images/Adventures/Lazy Library/library-*.jpg` (wrong casing, non-existent files) |
| `src/app/adventures/lazy-library/page.tsx` | References `/images/adventures/banners/lazy-library-banner.webp` (directory does not exist) |
| `src/app/accommodation/camping/page.tsx` | `galleryImages` array references `double-en-suite` images at indices 3–8 (cross-contamination) |
| `src/components/features/accommodation/data.ts` | Card images reference `/images/accommodation/camping-card.webp` etc. (flat structure that no longer matches organised folder structure `/images/accommodation/[slug]/`) |

---

## 10. Migration Plan

### Phase 1 — Create `/content` structure and populate JSON files  
*Risk: None. Read-only additions. No routes break.*

**Steps:**
1. Create `/content/accommodation/` directory
2. For each of the 9 standard accommodation pages, extract all hardcoded data into a `[slug].json` file matching the `AccommodationContent` interface
3. For `double-en-suite-rondawel`, normalise image paths to the standard convention (`gallery/thumb/`, `gallery/full/`, `hero/mobile.webp`, `hero/desktop.webp`) in the JSON — **do not change the actual page file yet**
4. Create `/content/adventures/` directory
5. For each of the 11 standard adventure pages, extract all hardcoded data into a `[slug].json` file matching the `AdventureContent` interface
6. For `lazy-library`, create the JSON with correct image paths (matching the filesystem when fixed) and `generalInfo`/`whatToBring` lists
7. Create `/content/entertainment/events.json` from `src/components/features/entertainment/data.ts`
8. Create `/content/facilities/facilities.json` from `src/app/facilities/page.tsx`
9. Create `/content/nav.json` from `src/data/nav.ts`

**Dependency:** None  
**Validate:** JSON files parse correctly; slugs match URL paths

---

### Phase 2 — Create `src/lib/content.ts` utility
*Risk: None. New file only.*

**Steps:**
1. Create `src/lib/content.ts` with `getAccommodation`, `getAllAccommodationSlugs`, `getAdventure`, `getAllAdventureSlugs`, and equivalents for facilities/entertainment/nav
2. Each function reads from the corresponding `/content/` JSON file
3. Export TypeScript interfaces alongside the loaders

**Dependency:** Phase 1 complete  
**Validate:** Import in a test file; all slugs resolve

---

### Phase 3 — Create templates
*Risk: Low. New files only. Does not touch existing routes.*

**Steps:**
1. Create `src/features/accommodation/template.tsx` — `AccommodationPageTemplate` component
2. Create `src/features/accommodation/types.ts` — `AccommodationContent` interface
3. Create `src/features/adventures/template.tsx` — `AdventurePageTemplate` component
4. Create `src/features/adventures/types.ts` — `AdventureContent` interface

**Dependency:** Phase 2 complete  
**Validate:** Templates render correctly when passed sample data

---

### Phase 4 — Create `[slug]` dynamic routes (new files, side-by-side with static)
*Risk: Low. New dynamic routes do not conflict with existing static directories.*

**Steps:**
1. Create `src/app/accommodation/[slug]/page.tsx`:
   - `generateStaticParams` reads `getAllAccommodationSlugs()`
   - Renders `<AccommodationPageTemplate>` with data from `getAccommodation(slug)`
   - Do NOT delete static pages yet
2. Create `src/app/adventures/[slug]/page.tsx`:
   - `generateStaticParams` reads `getAllAdventureSlugs()`
   - Renders `<AdventurePageTemplate>` with data from `getAdventure(slug)`
   - Do NOT delete static pages yet

> **Important:** Next.js resolves static routes before dynamic routes. While both exist, static page.tsx files will continue to be served. This allows visual comparison/testing before deletion.

**Dependency:** Phase 3 complete  
**Validate:** Navigate to e.g. `/accommodation/safari-tent` via the dynamic route URL — should render identically to the static version

---

### Phase 5 — Delete static page files one by one
*Risk: Medium. Verify each route before deleting. Do not batch-delete.*

**Steps (per accommodation type, then per adventure):**
1. Compare rendered output of `/accommodation/[slug]` (dynamic) against the static `page.tsx` render
2. When confirmed identical, delete `src/app/accommodation/[slug]/page.tsx` (the static file)
3. Repeat for all 9 accommodation slugs
4. Repeat for all 12 adventure slugs

**Dependency:** Phase 4 complete  
**Validate:** Build passes; all routes resolve; visual output unchanged

---

### Phase 6 — Migrate `data.ts` files to content and update index pages
*Risk: Low. One data source at a time.*

**Steps:**
1. Update `src/app/accommodation/page.tsx` to load data from `getAllAccommodation()` (reads all `/content/accommodation/*.json`) instead of `src/components/features/accommodation/data.ts`
2. Update `AccommodationDesktopGrid.tsx` and `AccommodationMobileList.tsx` to accept props from the parent page (or import from `src/lib/content.ts`) instead of `data.ts`
3. Delete `src/components/features/accommodation/data.ts`
4. Update `src/app/adventures/page.tsx` similarly
5. Update `AdventuresMobileList.tsx` similarly
6. Delete `src/components/features/adventures/data.ts`
7. Update `src/app/entertainment/page.tsx` to load from `/content/entertainment/events.json`
8. Update `EntertainmentMobileCards.tsx` accordingly
9. Delete `src/components/features/entertainment/data.ts`
10. Update `src/app/facilities/page.tsx` to load from `/content/facilities/facilities.json`
11. Update `SiteHeader.tsx` (and/or `MobileMenu.tsx`) to load nav from `/content/nav.json`
12. Delete `src/data/nav.ts`

**Dependency:** Phase 5 complete  
**Validate:** Index pages render correctly; all navigation links still work

---

### Phase 7 — Fix outliers
*Risk: Low. Isolated pages.*

**Steps:**
1. Fix `double-en-suite-rondawel`:
   - Move/rename actual image files to standard paths (`gallery/thumb/`, `gallery/full/`, `hero/mobile.webp`, `hero/desktop.webp`) if they exist anywhere, or confirm they are missing and note
   - Update `/content/accommodation/double-en-suite-rondawel.json` to reflect correct paths
   - The dynamic route from Phase 4 will now serve this page correctly
   - Delete `src/app/accommodation/double-en-suite-rondawel/MobileImageModal.tsx`
2. Fix `lazy-library`:
   - Images at `/images/Adventures/Lazy Library/` do not exist; this content needs new images or the page should remain a stub
   - Create `/content/adventures/lazy-library.json` with whatever images are available
   - The dynamic adventure route will serve this page once the JSON is valid
3. Fix `camping` gallery:
   - Update `/content/accommodation/camping.json` gallery array to reference only camping images (indices 1–2 are camping, indices 3–8 erroneously reference double-en-suite)

---

### Phase 8 — Install and configure TinaCMS
*Risk: Low. Additive configuration only.*

**Steps:**
1. `npm install tinacms @tinacms/cli`
2. Create `tina/config.ts` using the schema from §7
3. Update `next.config.mjs` with TinaCMS build output folder
4. Run `tinacms build` to verify schema compiles
5. Test CMS admin at `/admin` — verify all collections and fields are accessible

**Dependency:** Phase 6 complete  
**Validate:** TinaCMS admin loads; editing a JSON file via the CMS updates the content

---

## 11. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Static routes shadowing dynamic routes during Phase 4–5 transition | Low | Low | Next.js resolves static before dynamic; side-by-side coexistence is safe by design |
| `double-en-suite-rondawel` images don't exist in `/public/` | **High** (confirmed: no folder in `/public/images/accommodation/double-en-suite-rondawel/`) | Medium | Must either find/restore original images, or use placeholder until images are added |
| `lazy-library` images don't exist (wrong casing, missing files) | **High** (confirmed: wrong path casing) | Low | Page can remain a stub in content until images are added |
| `camping.json` gallery cross-references double-en-suite images | **High** (confirmed in code) | Medium | Fix during Phase 1 content extraction |
| TinaCMS branch/token config not set up | Medium | Low | Affects CMS only; static content files work without CMS config |
| `accommodation/data.ts` card image paths don't match new folder structure | **High** (e.g. `/images/accommodation/camping-card.webp` vs `/images/accommodation/camping/`) | Medium | Verify actual image locations before extracting card images into JSON; adjust paths accordingly |
| `adventures/data.ts` image paths for `fairy-labyrinth` use non-standard path | Medium | Low | Fairy labyrinth card image in data.ts is `adventures/fairy-labyrinth-card.webp` while others use `adventures/cards/desktop/[name]-card.webp`; confirm which exists |
| Adventure pages (kayaking, horseriding, paragliding) use `gallery/full/` for both `src` and `fullSize` | Medium | Low | Gallery API scans `gallery/thumb/`; if these have no thumb dir, they won't appear in the main gallery. Normalise to thumb+full or add thumb copies |
| Deleting files that are imported elsewhere | Low | High | Grep for all imports of `data.ts` files before deleting; the plan sequences deletions after all consumers are migrated |

---

## Validation Against Success Criteria

| Criterion | Status After Migration |
|---|---|
| No hardcoded content in pages | **Met** — all pages are thin wrappers that load from `/content/*.json` |
| All repeatable pages use `[slug]` | **Met** — `accommodation/[slug]` and `adventures/[slug]` replace 21 static pages |
| All content in `/content` | **Met** — accommodation, adventures, entertainment, facilities, nav all in `/content/` |
| Templates replace duplicated layouts | **Met** — `AccommodationPageTemplate` and `AdventurePageTemplate` replace 20 copy-pasted page bodies |
| TinaCMS schema matches content exactly | **Met** — schema in §7 maps 1:1 to interfaces in §4 |
| UI/UX remains unchanged | **Met** — templates reproduce the exact same JSX structure as the existing static pages |

**All six success criteria are met by this plan.**
