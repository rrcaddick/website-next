# Project Context

## Architecture

- Next.js 14 App Router
- Feature-based structure

## Key Rules

- No content inside React components
- All content must come from `/content`
- Pages must be template-driven (no duplicated layouts)
- Use dynamic routes (`[slug]`) for repeatable content types
- Use `generateStaticParams` for all dynamic routes
- Prefer JSON for structured content; use MDX only when rich text is required

## Patterns

- Feature code lives in: `features/[feature]/`
  - `components/` → UI pieces
  - `template.tsx` → page-level template
  - `types.ts` → TypeScript interfaces
- Shared UI lives in: `components/ui/`

## CMS (TinaCMS)

- Content must be schema-compatible
- Content stored in `/content`
- No hardcoded text, images, or metadata in pages

## General Principles

- Eliminate duplication
- Prefer composition over repetition
- Keep components small and reusable
- Maintain consistent naming (kebab-case folders, PascalCase components)

## References

- See `docs/architecture.md` if present
- See `docs/cms.md` if present
