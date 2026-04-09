# Vercel Out-of-Memory Build Fix

## Root cause

**224 MB of unoptimised images are committed directly to the git repository.**

The git pack (what Vercel clones) is **419 MB**. Add ~200 MB for `node_modules` and the build tooling overhead and the Vercel free-tier build worker (1 GB RAM) is exhausted before `next build` even finishes.

The specific offenders are the `gallery/full/` images — raw, uncompressed photos that were uploaded straight from a camera:

| File                                           | Size  |
| ---------------------------------------------- | ----- |
| `five-sleeper/gallery/full/1.webp`             | 20 MB |
| `family-en-suite-rondawel/gallery/full/1.webp` | 20 MB |
| `double-en-suite/gallery/full/2.webp`          | 13 MB |
| `double-en-suite/gallery/full/6.webp`          | 12 MB |
| `double-en-suite/gallery/full/1.webp`          | 8 MB  |
| `safari-tent/gallery/full/2.webp`              | 7 MB  |
| … 31 more files over 1 MB                      |       |

The thumbnails (`gallery/thumb/`) are fine — they total about 3.5 MB across all accommodation rooms. Only the "full" lightbox images are the problem.

---

## Two-part fix

### Part 1 — Immediate: compress the full-size images (fixes Vercel today)

The `gallery/full/` images are only ever shown in the lightbox modal at screen size — 1920 px wide and ~400 KB is more than enough quality. They are currently raw camera exports serving no purpose at 20 MB each.

Re-export or batch-compress every file under `public/images/**/gallery/full/` to a maximum of:

- **Width**: 1920 px (scale down, preserve aspect ratio)
- **Quality**: webp at 80
- **Target size**: 200–500 KB per image

Tools:

```bash
# Using sharp CLI (already a dependency):
npx sharp-cli --input "public/images/**/gallery/full/*.webp" \
  --output . --format webp --quality 80 --resize 1920

# Or using squoosh-cli:
npx @squoosh/cli --webp '{"quality":80}' --resize '{"width":1920}' \
  public/images/**/gallery/full/*.webp
```

Expected result: total repo drops from ~420 MB to under 30 MB, well within the Vercel free tier.

### Part 2 — Proper fix: move all images to Cloudinary (removes images from git entirely)

Cloudinary is already configured in this project (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` are in `.env`, and TinaCMS media is wired to `next-tinacms-cloudinary`). Images should not live in git at all.

#### Migration steps

1. **Upload all images to Cloudinary** — use the Cloudinary dashboard bulk uploader or the CLI, preserving the folder structure (e.g. `accommodation/camping/gallery/full/1.webp` becomes `fk/accommodation/camping/gallery/full/1` in Cloudinary).

2. **Update all content JSON files** — replace every `/images/...` path with the corresponding Cloudinary delivery URL, e.g.:

   ```
   /images/accommodation/camping/gallery/full/1.webp
   →
   https://res.cloudinary.com/<cloud>/image/upload/v1/fk/accommodation/camping/gallery/full/1
   ```

3. **Update the gallery API route** (`src/app/api/gallery/route.ts`) — the current implementation scans the local filesystem. Replace with a Cloudinary Admin API call to list assets by folder:

   ```ts
   import { v2 as cloudinary } from "cloudinary";
   // fetch resources from Cloudinary instead of fs.readdirSync
   ```

4. **Remove `public/images/` from git**:

   ```bash
   echo "public/images/" >> .gitignore
   git rm -r --cached public/images/
   git commit -m "Remove images from git — now hosted on Cloudinary"
   ```

   Then purge from git history with `git filter-repo --path public/images/ --invert-paths` to shrink the clone size.

5. **Update `next.config.mjs`** — `remotePatterns` already has `https: **` which covers Cloudinary. No change needed.

---

## Why Part 1 is enough to unblock Vercel now

Compressing the full-size images resolves the OOM immediately because:

- The git clone drops from 419 MB to ~30 MB
- The Vercel build worker never loads the image bytes during `next build` — static files in `public/` are uploaded as-is, not processed in memory
- The oversized files were the only thing pushing the build over the 1 GB limit

Part 2 is the correct long-term architecture — images in git is always the wrong pattern — but it can be done as a separate piece of work.
