# Fairy Knowe — Phased Refactor & Optimization Plan

Generated: 2026-04-07  
Status: Phase 1 complete ✅

---

## Pre-Plan: Issues Found

| Category | Count | Severity |
|---|---|---|
| Hardcoded content violations | 8 locations | High |
| Missing `sizes` on `<Image>` | 5+ | Medium |
| `unoptimized: true` in next.config | 1 | High (Perf) |
| Unused dependencies | 2 (`framer-motion`, `react-responsive`) | Low |
| Duplicate gallery components | 3 implementations | Medium |
| Unsafe `!` assertions | 3 in GalleryClient | Low |
| Dead Tailwind/tsconfig paths | 2 | Low |
| Form with no backend | 2 (booking, contact) | High |
| Hardcoded nav data | 1 (`src/data/nav.ts`) | Medium |
| No metadata on dynamic routes | All `[slug]` pages | Medium (SEO) |
| No sitemap / robots.txt | — | Medium (SEO) |

---

## Phase 1 — Safe Cleanup ✅ COMPLETE

No behaviour changes. Bug fixes and dead config removal.

### 1.1 Remove Unused Dependencies ✅
- `framer-motion` (11.0.3) — installed, never imported
- `react-responsive` (10.0.1) — installed, never imported
- Fix: `npm uninstall framer-motion react-responsive`

### 1.2 Remove Dead Config Paths ✅
- **tailwind.config.js**: Remove `./src/pages/**` glob (directory doesn't exist)
- **tsconfig.json**: Remove `src/app/facilities/old.tsx2` from `include` array

### 1.3 Fix Unsafe `!` Assertions in GalleryClient ✅
- File: `src/components/features/gallery/GalleryClient.tsx` lines 23, 26, 33
- `groupMap.get(key)!.push(img)` → guard with `??` pattern
- `groupMap.get(key)!` in map → use safe local variable
- `groupArrays[i].shift()!` → store result and check before push

### 1.4 Fix State Race Condition in ImageGallery ✅
- File: `src/components/gallery/ImageGallery.tsx` lines 57-64 (`nextImage`) and 66-76 (`prevImage`)
- Reading stale `selectedImageIndex` after calling `setSelectedImageIndex`
- Fix: compute new index once, use it for both state updates

### 1.5 Fix GalleryModal Silent Close on Image Error ✅
- File: `src/components/features/gallery/GalleryModal.tsx` line 65
- `onError={onClose}` — failed images silently close the modal
- Fix: replace with inline error state that shows a placeholder without closing

---

## Phase 2 — Hardcoded Content Violations

All violate the core rule: no content inside React components.

### 2.1 Contact Page
- File: `src/app/contact/page.tsx`
- Hardcoded: address, phone, email, hours + broken form (console.log only)
- Fix:
  1. Create `content/pages/contact.json` with all contact fields + hero
  2. Add `ContactPageContent` interface to `src/lib/content.ts`
  3. Add `getContactPage()` loader
  4. Create `src/features/contact/template.tsx`
  5. Connect form to real endpoint (Formspree / Resend / serverless)

### 2.2 BookingForm — Hardcoded Room Types & Policy
- File: `src/components/features/booking/BookingForm.tsx`
- Hardcoded: `roomTypes[]` array (lines 5–15), booking policy text (lines 190–195), submit = console.log
- Fix:
  1. Create `content/pages/booking.json` with `roomTypes[]` and `bookingPolicy`
  2. Add `BookingPageContent` interface and loader
  3. Pass content as props into form
  4. Integrate with Nightsbridge or redirect to existing BookNow URL

### 2.3 WeddingGallery — Hardcoded Image Array
- File: `src/components/features/venue/WeddingGallery.tsx`
- Hardcoded: 10 wedding image paths (lines 12–63), duplicates pagination+modal logic
- Fix:
  1. Confirm `/api/gallery` already scans `venue/{subdir}/gallery/` (it does)
  2. Replace `WeddingGallery` with filtered `GalleryClient` (venue category) or `ImageGallery` fed from API
  3. Delete `WeddingGallery.tsx`

### 2.4 SiteFooter — Hardcoded Contact & Social
- File: `src/components/layout/SiteFooter.tsx`
- Hardcoded: address, phone, Facebook/Instagram/YouTube URLs
- Fix:
  1. Create `content/site.json` with `address`, `phone`, `email`, `social: { facebook, instagram, youtube }`
  2. Add `SiteContent` interface and `getSiteContent()` to `content.ts`
  3. Load in root `layout.tsx`, pass to header and footer

### 2.5 MobileMenu — Hardcoded Top-Level Links
- File: `src/components/layout/MobileMenu.tsx` lines 6–16
- Hardcoded `topLevelLinks` array duplicates nav data already in `src/data/nav.ts`
- Fix: Import from `src/data/nav.ts` (same source as SiteHeader)

### 2.6 nav.ts — Hardcoded Navigation Links
- File: `src/data/nav.ts`
- Hardcoded arrays of accommodation and adventure links
- Fix:
  - Derive `accommodationLinks` from `getAllAccommodationSlugs()` + each JSON's `title` field
  - Derive `adventureLinks` from `getAllAdventureSlugs()` + each JSON's `title` field
  - Move generation into `getNav()` in `content.ts` or a new `getStaticNav()` server function

---

## Phase 3 — Image Optimization (High Lighthouse Impact)

### 3.1 Remove `unoptimized: true` from next.config.js
- File: `next.config.js`
- Disables ALL Next.js image optimization globally — WebP, responsive resizing, caching
- Fix: Remove entirely, or make conditional: `unoptimized: process.env.NODE_ENV === 'development'`

### 3.2 Add `sizes` to Images Missing It
| Component | Image | Fix |
|---|---|---|
| `SiteHeader.tsx` | Logo | `sizes="(max-width: 768px) 120px, 160px"` |
| `SiteFooter.tsx` | Footer banner | `sizes="100vw"` |
| `LogoSection.tsx` | Logo | `sizes="(max-width: 768px) 200px, 250px"` |
| `WeddingGallery.tsx` | Grid images | `sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"` |
| `ImageGallery.tsx` | Modal image | `sizes="(max-width: 768px) 100vw, 80vw"` |

### 3.3 Fix LogoSection Width/Height Mismatch
- Intrinsic `width={400} height={400}` but displayed at 200–250px
- Fix: Change to `width={250} height={250}`, add correct `sizes`

### 3.4 Audit `priority` Usage
- `GalleryGrid`: `priority={index < 8}` is too many — change to `priority={index < 2}`
- `CardImage`: Accept optional `priority` prop; pass `true` for first card from parent
- Goal: only LCP element gets `priority`

### 3.5 Add `quality` Consistently
- `PageHero` uses `quality={85}` — set `quality={80}` on `CardImage` and gallery grids for consistency

---

## Phase 4 — Performance & Rendering

### 4.1 Evaluate Client Component Downgrades
- `CardImage`: Error state is never surfaced to user — consider removing error state and converting to server component

### 4.2 Add Metadata to Dynamic Routes
- `src/app/accommodation/[slug]/page.tsx` — no `generateMetadata`
- `src/app/adventures/[slug]/page.tsx` — no `generateMetadata`
- Fix: Add `export async function generateMetadata({ params })` using `content.title`, `content.description`, `content.hero.desktopSrc`

### 4.3 Add Sitemap and Robots.txt
- Add `src/app/sitemap.ts` (Next.js 14 native) covering all static + dynamic routes
- Add `src/app/robots.ts` with standard allow-all + sitemap URL

### 4.4 Consolidate Gallery Duplicate Logic (Post Phase 2.3)
- After WeddingGallery is deleted, extract shared Modal + Pagination into reusable components
- `ImageGallery` and `GalleryClient` can share `GalleryModal` (already exists) and pagination UI

### 4.5 API Gallery — Filesystem Scan Safety
- `/api/gallery/route.ts` silently returns empty array on filesystem scan failure
- Fix: Add `console.error` logging when catch fires; add startup image count log

---

## Phase 5 — TinaCMS Foundation (Non-Breaking)

Goal: Install and configure Tina so it can read/edit the existing JSON files without changing any content loading code.

### 5.1 Install
```
npm install tinacms @tinacms/cli
```

### 5.2 Create `.tina/config.ts`
Define Tina collections that map to existing JSON files:

| Collection | Source files |
|---|---|
| `accommodation` | `content/accommodation/*.json` |
| `adventures` | `content/adventures/*.json` |
| `pages` | `content/pages/*.json` |
| `site` | `content/site.json` (created in Phase 2.4) |
| `nav` | `content/nav.json` |

Key nested object types: `hero`, `infoSections[]`, `cta`, `gallery[]`, `blocks[]` (CardBlock union — use Tina list with multiple templates, one per type)

### 5.3 Strategy: Option A — Tina as Editor, Keep JSON Loaders
- Tina writes to same JSON files; `fs.readFileSync()` loaders unchanged
- No changes to `src/lib/content.ts` or any page component
- Editing requires a redeploy (git-backed mode commits changes)
- **Recommended first step** — zero breaking changes

### 5.4 Risks
| Risk | Mitigation |
|---|---|
| `blocks: CardBlock[]` is a typed union | Model as Tina list with one template per block type |
| Nav data in `src/data/nav.ts` is TS, not JSON | Must complete Phase 2.6 first |
| Gallery uses filesystem scan not media manager | Keep filesystem gallery; migrate media in Phase 6 |
| New slug = needs rebuild | Set up Tina webhook → CI/CD pipeline |

---

## Phase 6 — Full TinaCMS Migration

### 6.1 Replace `fs.readFileSync` Loaders with Tina GraphQL Client
- Replace each `getAccommodation()`, `getPageContent()`, etc. with `client.queries.*`
- Enables live preview in Tina visual editor
- All page data fetching becomes async Tina client queries

### 6.2 Enable Tina Cloud for Production Editing
- Set up Tina Cloud or self-host for production CMS access
- Configure media manager to replace filesystem gallery scanning

---

## Phase 7 — Final Lighthouse Pass

### 7.1 Accessibility
Known likely issues:
- Gallery modal missing `role="dialog"`, `aria-modal`, focus trap
- Mobile menu missing `aria-expanded`, `aria-controls`
- Icon-only buttons missing `aria-label` (audit all)
- Color contrast: `#00CD9D` and `#C9DD94` against white — check WCAG AA
- Image alt text quality (auto-generated from filenames in gallery)

### 7.2 Performance Tuning
- Measure actual LCP after Phase 3.1 (removing `unoptimized: true`)
- Consider dynamic import with `ssr: false` for `GalleryClient` to reduce TBT
- Check for CLS: hero images should have explicit aspect ratio containers

### 7.3 SEO Final Check
- Verify all `[slug]` pages have `generateMetadata` (Phase 4.2)
- Verify sitemap includes all routes (Phase 4.3)
- Verify OpenGraph images for social sharing
- Check canonical URLs match `trailingSlash: true` config

---

## Execution Order & Dependencies

```
Phase 1 (safe, no deps)
  → Phase 2 (content violations)
      → 2.4 must complete before Phase 5 (site.json needed for Tina)
      → 2.6 must complete before Phase 5 (nav.json needed for Tina)
      → 2.3 must complete before Phase 4.4 (WeddingGallery deleted first)
  → Phase 3 (images, no deps, can run alongside Phase 2)
  → Phase 4 (perf, after Phase 2+3)
  → Phase 5 (Tina foundation, after 2.4 + 2.6)
  → Phase 6 (Tina migration, after Phase 5)
  → Phase 7 (final pass, after all above)
```
