# Fairy Knowe Backpackers – CLAUDE.md

## Project Overview

Modern, content-driven Next.js 14 (App Router) website for Fairy Knowe Backpackers. All pages are template-driven. No hardcoded content in components. Everything lives in `/content/` (JSON) or dynamic routes.

## Architecture & File Structure

- **Feature-based**: `src/features/[feature]/` contains `template.tsx`, `types.ts`, and any feature-specific components.
- **Content-driven**: All page content from `/content/pages/` and `/content/[feature]/`. Use `getPageContent()`, `getAccommodation()`, `getAdventure()` from `@/lib/content`.
- **Dynamic routes**: Use `[slug]` + `generateStaticParams()` for accommodation and adventures.
- **Shared UI**: `src/components/ui/` and `src/components/features/`.
- **Never**: Hardcode text, images, or metadata in page components. Always pull from content JSON.
- **Detail pages**: Both accommodation and adventure `[slug]` pages use the single `DetailPageTemplate` at `src/features/detail/template.tsx`. Content is driven by `sections[]` in the JSON — no hardcoded section titles or layouts.
- **Listing pages**: Use `ListingTemplate` at `src/features/listing/template.tsx`. CTA uses `CTASection` (`src/components/ui/CTASection.tsx`) — schema: `{ heading, description?, button?: { href, label } }`.
- **CTA schema**: `ListingPageContent.cta` and `DetailPageContent.cta` both use `{ heading, description?, button? }`. No `title`, `href`, `label`, or `generalInfo` at top level.

## Key Rules (Follow These Strictly)

- No content inside React components → everything from `/content/`.
- Pages must be template-driven (use `ListingTemplate` for listing pages, `DetailPageTemplate` for `[slug]` detail pages).
- Use TypeScript strictly. No `any`. Prefer named exports.
- Tailwind only. No inline styles except where explicitly allowed (e.g., MouseGradientCard).
- Mobile-first responsive.
- Images: Always use Next.js `Image` with proper `sizes` and `fill`. Gallery images come from the `/api/gallery` route.

## Cleanup Protocol

**Before any deletion:**

1. Run `npx knip --include files,dependencies,exports` to detect unused files/exports/dependencies.
2. Manually verify with `grep -r "from ['\"].*filename"`.
3. Never delete silently. Always propose a list with reasoning first.

**Cleanup rules:**

- Delete unused files only after confirming they are not imported anywhere.
- After cleanup, run `npm run build` to verify and update this CLAUDE.md.
- Goal: Minimal, clean codebase. Prefer deletion over leaving commented-out code.

**Last cleanup (2026-04-07):** Removed 11 dead files — old mobile list/card/grid components for accommodation, adventures, entertainment, facilities, and venue. Removed orphaned `src/app/camping/` CSS. Fixed pre-existing TypeScript error in `Card.tsx` (`item.href!` assertion).

**Detail page refactor (2026-04-07):** Merged `AccommodationPageTemplate` and `AdventurePageTemplate` into single `DetailPageTemplate`. Removed hardcoded section titles — all sections driven by `sections[]` in JSON. Extracted `CTASection` component. Replaced `ListingTemplate` `generalInfo` logic with `CTASection`. Updated all accommodation (10) and adventure (13) JSON files to use `sections[]`. Updated all listing page CTAs to `{ heading, description?, button? }` schema. Deleted `src/features/accommodation/template.tsx`, `src/features/adventures/template.tsx`, and their `types.ts` re-export files.

## Commands / Scripts

- `npm run dev` → development
- `npm run build` → production build
- `npm run lint` → linting
- `npx knip` → dead code detection (use before cleanup)

## CMS & Content Rules

- Content must be schema-compatible and live in `/content/`.
- Use `src/data/nav.ts` for navigation links.
- Accommodation and adventures use dynamic `[slug]` pages + JSON files.

## General Principles

- Eliminate duplication.
- Prefer composition over repetition.
- Keep components small and reusable.
- Consistent naming: kebab-case folders, PascalCase components.
- Feature code lives in `src/features/[feature]/`.

## References

- See `refactor_plan.md` for recent changes.
- See `content/` structure for all page data.
