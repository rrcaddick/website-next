# Fairy Knowe Backpackers – CLAUDE.md

## Project Overview

Modern, content-driven Next.js 14 (App Router) website for Fairy Knowe Backpackers. All pages are template-driven. No hardcoded content in components. Everything lives in `/content/` (JSON) or dynamic routes.

## Architecture & File Structure

- **Feature-based**: `src/features/[feature]/` contains `template.tsx`, `types.ts`, and any feature-specific components.
- **Content-driven**: All page content from `/content/pages/` and `/content/[feature]/`. Use `getPageContent()`, `getAccommodation()`, `getAdventure()` from `@/lib/content`.
- **Dynamic routes**: Use `[slug]` + `generateStaticParams()` for accommodation and adventures.
- **Shared UI**: `src/components/ui/` and `src/components/features/`.
- **Never**: Hardcode text, images, or metadata in page components. Always pull from content JSON.

## Key Rules (Follow These Strictly)

- No content inside React components → everything from `/content/`.
- Pages must be template-driven (use `ListingTemplate`, `AccommodationPageTemplate`, `AdventurePageTemplate`).
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

**Last cleanup (2026-04-07):** Removed 11 dead files — old mobile list/card/grid components for accommodation, adventures, entertainment, facilities, and venue that were replaced by the unified card/listing system. Also removed orphaned `src/app/camping/` CSS. Fixed pre-existing TypeScript error in `Card.tsx` (`item.href!` assertion).

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
