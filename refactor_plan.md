# Refactor Plan

## 1. Critical Issues (High Priority)

- Broken asset references remain from an older `/images` structure, while the repo only contains `/public/images`. This affects active routes and shared data, so multiple pages are likely rendering broken images in production. Confirmed examples:
  - `src/components/features/accommodation/data.ts` uses `/images/accommodation/...` for all accommodation cards ([src/components/features/accommodation/data.ts](/home/ray/repos/next/src/components/features/accommodation/data.ts#L10)).
  - `src/components/features/adventures/data.ts` uses `/images/adventures/...` for all adventure cards ([src/components/features/adventures/data.ts](/home/ray/repos/next/src/components/features/adventures/data.ts#L11)).
  - `src/app/venue/page.tsx` uses `/images/venue-hire/...` for all event cards ([src/app/venue/page.tsx](/home/ray/repos/next/src/app/venue/page.tsx#L7)).
  - `src/app/contact/page.tsx` still uses `/images/contact/contact-banner.webp` ([src/app/contact/page.tsx](/home/ray/repos/next/src/app/contact/page.tsx#L6)).
  - `src/app/fairy-folk-n-roll/page.tsx` still uses `/images/ffr/...` assets ([src/app/fairy-folk-n-roll/page.tsx](/home/ray/repos/next/src/app/fairy-folk-n-roll/page.tsx#L8)).
  - `src/app/accommodation/double-en-suite-rondawel/page.tsx` still uses `/images/accommodation/...` for both hero and gallery ([src/app/accommodation/double-en-suite-rondawel/page.tsx](/home/ray/repos/next/src/app/accommodation/double-en-suite-rondawel/page.tsx#L8)).
  - `src/components/layout/MobileMenu.tsx` hardcodes `/images/menu/...` and `/images/placeholder-square.png` ([src/components/layout/MobileMenu.tsx](/home/ray/repos/next/src/components/layout/MobileMenu.tsx#L84)).

- Next image optimization is globally disabled via `images.unoptimized: true` in [next.config.js](/home/ray/repos/next/next.config.js#L3). Because the project serves a large number of local WebP images and uses `next/image` heavily, this directly sacrifices LCP, bandwidth savings, and responsive image generation.

- The gallery route is implemented as a client waterfall instead of server-rendered content. `GalleryClient` fetches `/api/gallery` on mount, keeps all filtering state in the browser, and renders loading UI first ([src/components/features/gallery/GalleryClient.tsx](/home/ray/repos/next/src/components/features/gallery/GalleryClient.tsx#L41)). This delays content, increases client JS, and prevents static/server rendering for a page whose data comes from the local filesystem.

- Booking and contact forms are non-functional from a product perspective:
  - `BookingForm` prevents submit and only logs to console ([src/components/features/booking/BookingForm.tsx](/home/ray/repos/next/src/components/features/booking/BookingForm.tsx#L29)).
  - `Contact` renders a plain form with no action, handler, or server endpoint ([src/app/contact/page.tsx](/home/ray/repos/next/src/app/contact/page.tsx#L56)).
    These pages look complete but do not perform the expected user task.

- There are two Next config files with conflicting image configuration: [next.config.js](/home/ray/repos/next/next.config.js) and [next.config.mjs](/home/ray/repos/next/next.config.mjs). Even if only one is used at runtime, keeping both is a deployment and maintenance risk because image behavior differs between them.

## 2. Architectural Improvements

- Replace the many hand-authored detail route files under `src/app/accommodation/*/page.tsx` and `src/app/adventures/*/page.tsx` with data-driven dynamic routes such as:
  - `src/app/accommodation/[slug]/page.tsx`
  - `src/app/adventures/[slug]/page.tsx`
    The current structure repeats the same layout pattern, hero, gallery wrapper, rules/info blocks, and logo section across roughly 20 files. Representative examples are [src/app/accommodation/five-sleeper/page.tsx](/home/ray/repos/next/src/app/accommodation/five-sleeper/page.tsx) and [src/app/adventures/woodville-big-tree/page.tsx](/home/ray/repos/next/src/app/adventures/woodville-big-tree/page.tsx).

- Move page content into typed content modules. The repo already has list-level data files for accommodation and adventures, but detail pages still embed their own gallery arrays and content blocks inline. Introduce a single domain model per feature:
  - summary card data
  - hero assets
  - gallery image manifest
  - feature lists
  - rules/info sections
  - optional SEO metadata

- Normalize folder ownership by domain. The current split between `src/app/*`, `src/components/features/*`, `src/components/gallery`, `src/components/ui`, and `src/data` is workable, but the detail page content currently lives in route files instead of feature modules. The route layer should become thin composition only.

- Consolidate gallery implementations. There are at least three overlapping galleries:
  - generic gallery page client ([src/components/features/gallery/GalleryClient.tsx](/home/ray/repos/next/src/components/features/gallery/GalleryClient.tsx))
  - reusable detail page gallery ([src/components/gallery/ImageGallery.tsx](/home/ray/repos/next/src/components/gallery/ImageGallery.tsx))
  - venue-specific gallery ([src/components/features/venue/WeddingGallery.tsx](/home/ray/repos/next/src/components/features/venue/WeddingGallery.tsx))
    These should be refactored into one reusable gallery system with configurable pagination, modal behavior, and data source.

- Extract shared section components for recurring structures:
  - intro/description + CTA block
  - info cards / rules cards
  - mobile expandable list
  - desktop card grid
    Multiple feature areas implement the same pattern independently.

## 3. Code Quality Improvements

- Remove duplicated content definitions. Room type labels exist in at least two places and are already drifting:
  - shared room list in [src/components/features/accommodation/data.ts](/home/ray/repos/next/src/components/features/accommodation/data.ts#L10)
  - separate booking form room list in [src/components/features/booking/BookingForm.tsx](/home/ray/repos/next/src/components/features/booking/BookingForm.tsx#L5)
    The booking version uses `double-ensuite` and `rondawel`, which do not match the actual route naming shape.

- Eliminate duplicated mobile list logic across:
  - [src/components/features/accommodation/AccommodationMobileList.tsx](/home/ray/repos/next/src/components/features/accommodation/AccommodationMobileList.tsx)
  - `AdventuresMobileList.tsx`
  - `EntertainmentMobileCards.tsx`
  - `VenueMobileCards.tsx`
    All four implement the same expand/scroll pattern with slightly different content models.

- Eliminate duplicated modal/gallery logic across:
  - [src/components/gallery/ImageGallery.tsx](/home/ray/repos/next/src/components/gallery/ImageGallery.tsx)
  - [src/components/features/venue/WeddingGallery.tsx](/home/ray/repos/next/src/components/features/venue/WeddingGallery.tsx)
  - [src/app/accommodation/double-en-suite-rondawel/MobileImageModal.tsx](/home/ray/repos/next/src/app/accommodation/double-en-suite-rondawel/MobileImageModal.tsx)

- Remove dead or stale route code:
  - `src/app/adventures/lazy-library/page.tsx` uses the legacy asset tree and appears disconnected from the current nav/data model ([src/app/adventures/lazy-library/page.tsx](/home/ray/repos/next/src/app/adventures/lazy-library/page.tsx#L4)).
  - `src/app/accommodation/double-en-suite-rondawel/page.tsx` also appears to be a legacy branch, while current accommodation links point to `family-en-suite-rondawel` and `double-en-suite` ([src/data/nav.ts](/home/ray/repos/next/src/data/nav.ts)).
  - `src/app/camping/camping.module.css` appears unused.

- Clean up inconsistent style and formatting conventions. The codebase mixes semicolon-heavy files and semicolon-free files, single and double quotes, and differing comment styles. Representative contrast:
  - [src/components/gallery/ImageGallery.tsx](/home/ray/repos/next/src/components/gallery/ImageGallery.tsx)
  - [src/app/accommodation/page.tsx](/home/ray/repos/next/src/app/accommodation/page.tsx)

- Remove unused dependencies from [package.json](/home/ray/repos/next/package.json#L11). `framer-motion`, `react-icons`, `react-intersection-observer`, and `react-responsive` were not referenced in `src`, which increases install size and signals abandoned implementation paths.

## 4. Performance Improvements

- Re-enable Next image optimization for local assets. This is the highest-leverage performance fix because the project is image-heavy and already uses `next/image` across heroes, cards, grids, and modals.

- Convert the gallery page to a server component that reads the image manifest on the server and passes serialized data to small client children only for filtering and modal interactions. Today the entire page is client-first and network-dependent ([src/components/features/gallery/GalleryClient.tsx](/home/ray/repos/next/src/components/features/gallery/GalleryClient.tsx#L50)).

- Avoid loading full-size images with `priority` inside image modals. `ImageGallery` marks the modal image as `priority` and `quality={100}` ([src/components/gallery/ImageGallery.tsx](/home/ray/repos/next/src/components/gallery/ImageGallery.tsx#L231)). This is expensive for a non-LCP interaction and should be replaced with default lazy behavior plus a lower quality ceiling where acceptable.

- Reduce unnecessary client component scope:
  - [src/components/features/accommodation/AccommodationCardImage.tsx](/home/ray/repos/next/src/components/features/accommodation/AccommodationCardImage.tsx) is client-only just to handle image error fallback.
  - [src/components/layout/MobileMenu.tsx](/home/ray/repos/next/src/components/layout/MobileMenu.tsx) embeds a large amount of static content and image mapping in a single client component.
  - Detail pages rely on fully client-side galleries even when most of the page is static.

- Memoize or precompute the balanced gallery ordering on the server. `getBalancedImages` reshuffles the whole dataset client-side whenever the page renders with the default filter ([src/components/features/gallery/GalleryClient.tsx](/home/ray/repos/next/src/components/features/gallery/GalleryClient.tsx#L18)).

- Avoid shipping duplicate mobile and desktop UI trees when content is identical. Many pages render separate mobile and desktop blocks with mostly the same data and slightly different order/alignment, which increases markup size and maintenance cost.

- Replace `window.location.href` navigation in the mobile menu with `Link` or router navigation. Current implementation forces full navigations for top-level entries ([src/components/layout/MobileMenu.tsx](/home/ray/repos/next/src/components/layout/MobileMenu.tsx#L55)).

## 5. Image & Asset Improvements

- Finish the migration to a single asset root. Standardize on `/images` and delete remaining references to `/images/*` after verification.

- Add a typed image manifest layer instead of hardcoding image paths in dozens of route files. The current approach makes renames expensive and error-prone.

- Normalize naming conventions:
  - mostly kebab-case under `images`
  - but legacy paths still include spaces and capitalization such as `/images/Adventures/Lazy Library/...` ([src/app/adventures/lazy-library/page.tsx](/home/ray/repos/next/src/app/adventures/lazy-library/page.tsx#L4))
    This should be unified to predictable lowercase kebab-case.

- Consolidate gallery folder conventions. Current `hero`, `gallery/thumb`, and `gallery/full` structure is reasonable; apply it consistently across all feature areas and eliminate older bespoke layouts.

- Add menu/thumbnail assets to the same structured asset system instead of hardcoding label-to-path ternaries in [src/components/layout/MobileMenu.tsx](/home/ray/repos/next/src/components/layout/MobileMenu.tsx#L84).

- Review redundancy in gallery storage. Some detail pages use only `full` images as thumbnails (`kayaking`, `paragliding`, `horseriding`), while others use both `thumb` and `full`. Unify this so the rendering strategy is predictable.

## 6. Next.js Best Practice Fixes

- Use route segment metadata per page or per dynamic segment. Only the root layout and home page export metadata ([src/app/layout.tsx](/home/ray/repos/next/src/app/layout.tsx#L8), [src/app/page.tsx](/home/ray/repos/next/src/app/page.tsx#L8)). High-value routes like accommodation, adventures, venue, and gallery should provide route-specific metadata for SEO and social sharing.

- Replace static hand-authored route duplication with dynamic segments and `generateStaticParams` for accommodation/adventure detail pages. This fits the current content model better than maintaining many near-identical `page.tsx` files.

- Keep server/client boundaries tighter:
  - data assembly from filesystem belongs in server components or shared server utilities
  - only interaction shells should be client components
  - avoid making an entire page client-rendered just to support filters and modals

- Remove the duplicate Next config file and keep one canonical config.

- Revisit `experimental.caseSensitiveRoutes: false` in [next.config.js](/home/ray/repos/next/next.config.js#L16). This currently masks case inconsistencies instead of fixing them at the source, which is especially relevant because old asset references already show naming drift.

- Simplify the global dark-mode setup. Tailwind is configured for `darkMode: 'class'` ([tailwind.config.js](/home/ray/repos/next/tailwind.config.js#L8)), but the app never sets a dark class at the root, while many components still ship `dark:*` variants. That creates dead styling branches and extra class noise.

## 7. Low Priority / Nice-to-Have

- Move repeated section descriptions and CTA copy into content modules so copy edits do not require touching route components.

- Standardize helper/component naming. Examples like `ImageGallery`, `WeddingGallery`, and `MobileImageModal` describe implementation details rather than a shared domain abstraction.

- Replace raw SVG repetition with small icon components where the same icons recur across header, footer, cards, and galleries.

- Add a proper lint/typecheck/test script set. The project currently exposes only `dev`, `build`, `start`, and `lint` in [package.json](/home/ray/repos/next/package.json#L5). This is not a blocker for refactoring, but it will make phased changes safer.

- Review custom font inventory under `/public/fonts`. Only `hestrial.ttf` is referenced in global styles ([src/app/globals.css](/home/ray/repos/next/src/app/globals.css#L5)); the remaining font files may be unnecessary.

## 8. Suggested Refactor Roadmap

1. Fix correctness first: replace all remaining `/images/*` references with verified `/images/*` assets, remove or quarantine legacy routes (`lazy-library`, `double-en-suite-rondawel`) if they are no longer meant to ship, and delete the extra Next config file.
2. Re-enable image optimization and validate that all `next/image` usage still works with the cleaned asset paths.
3. Extract canonical content manifests for accommodation, adventures, venue, facilities, and entertainment. Make routes consume these manifests instead of embedding data inline.
4. Replace hand-authored accommodation and adventure detail pages with dynamic `[slug]` routes plus `generateStaticParams`.
5. Consolidate gallery implementations into one reusable gallery system and move the gallery index page to server-rendered data loading.
6. Refactor mobile expandable lists into one generic component driven by typed item data.
7. Refactor booking and contact into real server actions or route handlers, or clearly mark them as external/contact-only flows if no submission backend is intended.
8. Remove unused dependencies, dead styles, unused files, and dark-mode branches that are not actually activated.
9. Add route-level metadata for major pages once the route structure is stable.
10. After the structural refactor, do a final cleanup pass for naming consistency, formatting consistency, and shared UI primitives.
