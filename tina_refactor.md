# TinaCMS Live Preview – Phased Refactor Plan

## Overview

Eight phases, ordered from zero-risk to high-effort. Each phase is independently shippable and leaves the site in a working state. Do not start a phase until all success criteria for the previous phase pass.

**Current stack facts:**
- Next.js 14 App Router, all pages are server components
- 11 page routes: 7 listing pages + 2 dynamic `[slug]` detail sets (accommodation, adventures) + contact + gallery
- Content read via `src/lib/content.ts` using `fs.readFileSync` — bypasses Tina entirely at runtime
- Tina backend API at `src/pages/api/tina/[...routes].ts` — working
- Generated client at `.tina/__generated__/client.ts` — exists but not used by any page
- No `TinaProvider`, no `useTina()` anywhere in the app

**The pattern every live-preview page will use:**
```
Server page component
  → fetches { data, query, variables } via client.queries.xxx
  → passes as props to a 'use client' wrapper component
      → calls useTina({ data, query, variables })
      → renders template with the live-updating data
```

---

## Phase 1 — Fix the `/admin` Route

**Scope:** One config file, zero component changes.

### What to do

In `next.config.js`, add a `rewrites` function:

```js
const nextConfig = {
  // ...existing config unchanged...
  async rewrites() {
    return {
      afterFiles: [
        { source: '/admin', destination: '/admin/index.html' },
        { source: '/admin/:path*', destination: '/admin/:path*' },
      ],
    };
  },
};
```

Then rebuild the Tina admin dashboard to ensure the output is current:

```bash
npx tinacms build
```

### Success criteria

- [ ] `http://localhost:3000/admin` loads the TinaCMS dashboard (no 404)
- [ ] Login with credentials works and lands on the collection browser
- [ ] All 7 collections are visible: Accommodation, Adventures, Listing Pages, Contact Page, Gallery Page, Site Settings, Navigation
- [ ] Opening any document shows editable fields
- [ ] `npm run build` still passes with no errors

---

## Phase 2 — Regenerate the Tina Client with the Correct API URL

**Scope:** Environment config + running `tinacms build`. No application code changes.

### Background

`.tina/__generated__/client.ts` is auto-generated and currently hardcodes `http://localhost:3000/api/tina/gql`. This works for local dev but will break the browser-side live preview in any other environment. The URL is derived from `contentApiUrlOverride` in `.tina/config.ts`, which already reads `NEXT_PUBLIC_SITE_URL`.

### What to do

1. Confirm `.env.local` has `NEXT_PUBLIC_SITE_URL=http://localhost:3000` for local dev.
2. Confirm production `.env` (or platform env vars) has `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`.
3. Run `npx tinacms build` in each environment so `client.ts` is regenerated with the correct URL.
4. Commit the regenerated `client.ts` for the development URL.

### Success criteria

- [ ] `.tina/__generated__/client.ts` URL matches `NEXT_PUBLIC_SITE_URL`
- [ ] `npx tsx -e "import('./\.tina/__generated__/client.ts').then(m => console.log(m.client))"` (or equivalent) shows no import errors
- [ ] `npm run build` still passes

---

## Phase 3 — Add TinaProvider to the App (Infrastructure Only)

**Scope:** Two files — a new client wrapper component + a one-line change to `layout.tsx`. No page changes.

### Background

`useTina()` requires a `TinaProvider` somewhere above it in the React tree. Because `layout.tsx` is a server component, you cannot import `TinaProvider` directly there. The fix is a thin `'use client'` boundary component.

### What to do

**Create `src/components/TinaProvider.tsx`:**

```tsx
'use client';
import { TinaProvider as Tina } from 'tinacms';

export default function TinaProvider({ children }: { children: React.ReactNode }) {
  return <Tina>{children}</Tina>;
}
```

**Update `src/app/layout.tsx`** — wrap `{children}` with the provider:

```tsx
import TinaProvider from '@/components/TinaProvider';

// inside RootLayout:
<body className="font-sans bg-white">
  <SiteHeader />
  <TinaProvider>
    <main className="min-h-screen pt-12">{children}</main>
  </TinaProvider>
  <SiteFooter site={site} />
</body>
```

### Success criteria

- [ ] `npm run build` passes with no errors or type errors
- [ ] Site renders identically in the browser — no visual change, no hydration errors in the console
- [ ] `/admin` still loads correctly

---

## Phase 4 — Live Preview on the Home Page (Pilot)

**Scope:** One page route (`src/app/page.tsx`) + one new client component. `ListingTemplate` itself is not changed.

### Why start here

The home page is the simplest listing page (no dynamic slug, no special layout). It de-risks the full pattern before scaling to 10 other pages.

### What to do

**Create `src/features/listing/ListingTemplateClient.tsx`:**

```tsx
'use client';
import { useTina } from 'tinacms/dist/react';
import ListingTemplate from './template';
import type { ListingPageContent } from '@/lib/content';

interface Props {
  query: string;
  variables: object;
  data: { listingPages: ListingPageContent };
}

export default function ListingTemplateClient({ query, variables, data }: Props) {
  const { data: liveData } = useTina({ query, variables, data });
  return <ListingTemplate content={liveData.listingPages} />;
}
```

**Update `src/app/page.tsx`:**

```tsx
import { client } from '@tina/__generated__/client';
import { getSiteContent } from '@/lib/content';
import ListingTemplateClient from '@/features/listing/ListingTemplateClient';

export async function generateMetadata() {
  const site = await getSiteContent();
  return {
    title: site.seo.home.title,
    description: site.seo.home.description,
  };
}

export default async function Home() {
  const { data, query, variables } = await client.queries.listingPages({
    relativePath: 'home.json',
  });
  return <ListingTemplateClient data={data} query={query} variables={variables} />;
}
```

### Important notes

- `getSiteContent()` remains filesystem-based for metadata — this is fine as metadata is server-only.
- The `data` object shape from `client.queries.listingPages` must match `ListingPageContent`. Check the generated types in `.tina/__generated__/types.ts` if there are mismatches.
- `ListingTemplate` is unchanged — it still accepts `ListingPageContent` as a prop.

### Success criteria

- [ ] Home page renders identically to before (visual regression check)
- [ ] `npm run build` passes
- [ ] Open `/admin`, edit a field on the home page — the preview pane on the right updates without a page reload
- [ ] No TypeScript errors (`npm run lint`)

---

## Phase 5 — Live Preview on Remaining Listing Pages

**Scope:** 6 page routes — `accommodation/page.tsx`, `adventures/page.tsx`, `entertainment/page.tsx`, `facilities/page.tsx`, `fairy-folk-n-roll/page.tsx`, `venue/page.tsx`.

### What to do

All six follow the same pattern as Phase 4. For each page:

1. Replace the `getPageContent(slug)` call with `client.queries.listingPages({ relativePath: '<slug>.json' })`.
2. Replace `<ListingTemplate content={content} />` with `<ListingTemplateClient data={data} query={query} variables={variables} />`.

The `ListingTemplateClient` created in Phase 4 is reused for all of them.

Slugs to relativePath mapping:
| Route | relativePath |
|---|---|
| `accommodation/page.tsx` | `accommodation.json` |
| `adventures/page.tsx` | `adventures.json` |
| `entertainment/page.tsx` | `entertainment.json` |
| `facilities/page.tsx` | `facilities.json` |
| `fairy-folk-n-roll/page.tsx` | `fairy-folk-n-roll.json` |
| `venue/page.tsx` | `venue.json` |

### Success criteria

- [ ] All 6 listing pages render identically
- [ ] `npm run build` passes
- [ ] Editing any listing page document in Tina admin updates the preview pane in real time
- [ ] `npm run lint` — no TypeScript errors

---

## Phase 6 — Live Preview on Detail Pages (Accommodation + Adventures)

**Scope:** Two dynamic route pages (`accommodation/[slug]/page.tsx`, `adventures/[slug]/page.tsx`) + two new client wrapper components.

### Background

These pages use `generateStaticParams()` for static generation. The server component still calls the Tina client query (which works server-side), and `generateStaticParams` stays as-is. The only change is that data is passed through `useTina` in a client wrapper instead of directly to `DetailPageTemplate`.

### What to do

**Create `src/features/detail/DetailPageTemplateClient.tsx`:**

```tsx
'use client';
import { useTina } from 'tinacms/dist/react';
import DetailPageTemplate from './template';
import type { AccommodationContent, AdventureContent } from '@/lib/content';

type DetailData = { accommodation: AccommodationContent } | { adventures: AdventureContent };

interface Props {
  query: string;
  variables: object;
  data: DetailData;
  collection: 'accommodation' | 'adventures';
}

export default function DetailPageTemplateClient({ query, variables, data, collection }: Props) {
  const { data: liveData } = useTina({ query, variables, data });
  const content = collection === 'accommodation'
    ? (liveData as { accommodation: AccommodationContent }).accommodation
    : (liveData as { adventures: AdventureContent }).adventures;
  return <DetailPageTemplate content={content} />;
}
```

**Update `accommodation/[slug]/page.tsx`:**

```tsx
import { notFound } from 'next/navigation';
import { client } from '@tina/__generated__/client';
import { getAllAccommodationSlugs, getSiteContent } from '@/lib/content';
import DetailPageTemplateClient from '@/features/detail/DetailPageTemplateClient';

export async function generateStaticParams() {
  const slugs = await getAllAccommodationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await getSiteContent();
  try {
    const { data } = await client.queries.accommodation({ relativePath: `${slug}.json` });
    return {
      title: `${data.accommodation.title} — ${site.seo.defaultTitle}`,
      description: data.accommodation.description,
      openGraph: {
        title: data.accommodation.title,
        description: data.accommodation.description,
        images: [{ url: data.accommodation.hero.desktopSrc }],
      },
    };
  } catch {
    return { title: site.seo.defaultTitle };
  }
}

export default async function AccommodationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const { data, query, variables } = await client.queries.accommodation({
      relativePath: `${slug}.json`,
    });
    return (
      <DetailPageTemplateClient
        data={data}
        query={query}
        variables={variables}
        collection="accommodation"
      />
    );
  } catch {
    notFound();
  }
}
```

Apply the equivalent pattern to `adventures/[slug]/page.tsx` using `client.queries.adventures`.

### Success criteria

- [ ] All accommodation detail pages render correctly (spot check 3+)
- [ ] All adventure detail pages render correctly (spot check 3+)
- [ ] `npm run build` passes — `generateStaticParams` still produces the correct static paths
- [ ] Editing any accommodation or adventure document in Tina admin updates the preview in real time
- [ ] `npm run lint` — no TypeScript errors

---

## Phase 7 — Live Preview on Contact and Gallery Pages

**Scope:** `contact/page.tsx`, `gallery/page.tsx`. These have unique schemas so they get their own client components.

### What to do

**Contact page** — create `src/features/contact/ContactPageClient.tsx` with `useTina`, update `contact/page.tsx` to fetch via `client.queries.contactPage({ relativePath: 'contact.json' })`.

**Gallery page** — the gallery page pulls live images from `/api/gallery` (Cloudinary), which is separate from Tina content. Only the heading/description text fields live in Tina. Create `src/features/gallery/GalleryPageClient.tsx` with `useTina` for the text content. The Cloudinary gallery fetch remains unchanged.

Check the generated types for both collections to ensure the shape returned by `client.queries.contactPage` and `client.queries.galleryPage` aligns with `ContactPageContent` and `GalleryPageContent` from `@/lib/content`.

### Success criteria

- [ ] Contact page renders correctly (form, map, info sections)
- [ ] Gallery page renders correctly (images still load from Cloudinary)
- [ ] `npm run build` passes
- [ ] Editing contact page or gallery page fields in admin updates preview in real time
- [ ] `npm run lint` clean

---

## Phase 8 — Live Preview for Global Content (Site Settings + Navigation)

**Scope:** `src/app/layout.tsx`, `SiteHeader`, `SiteFooter`. This is the most architecturally involved phase.

### Background

`site.json` and `nav.json` are `global: true` collections in Tina. They affect the layout wrapper, not individual pages. Because `layout.tsx` is a server component, you cannot use `useTina` directly in it.

The approach: create client wrapper versions of `SiteHeader` and `SiteFooter` that receive `{ data, query, variables }` as props and use `useTina` internally.

### What to do

1. **`layout.tsx`** — fetch `site` and `nav` via `client.queries.site` and `client.queries.nav`, pass `{ data, query, variables }` to client wrapper components.

2. **`src/components/layout/SiteHeaderClient.tsx`** — `'use client'` component that calls `useTina` for nav data, renders `SiteHeader` with live data.

3. **`src/components/layout/SiteFooterClient.tsx`** — same pattern for site/footer data.

### Caution

- Layout-level live updates are cosmetically low-priority (nav and footer rarely change during a content editing session).
- If this phase adds complexity without clear benefit, it is acceptable to leave `SiteHeader` and `SiteFooter` as static server components and skip this phase. The rest of the site will still have full live preview.

### Success criteria

- [ ] `npm run build` passes
- [ ] Editing site settings (address, phone, social) in Tina admin updates the footer preview in real time
- [ ] Editing nav links in Tina admin updates the header preview in real time
- [ ] No hydration errors in the browser console
- [ ] `npm run lint` clean

---

## Final Verification Checklist

Run these after Phase 8 (or whichever is the last phase you implement):

- [ ] `npm run build` — clean build, no TypeScript errors
- [ ] `npm run lint` — no lint errors
- [ ] `npx knip --include files,dependencies,exports` — no newly orphaned files
- [ ] Spot-check every page route visually in the browser
- [ ] In Tina admin: open each collection type and confirm the preview pane updates on field edit
- [ ] Verify static build still works (pages load without the dev server's Tina daemon if needed)
