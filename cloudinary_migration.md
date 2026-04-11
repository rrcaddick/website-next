# Cloudinary Migration Plan

**Cloud Name:** `dqxnz4cpu`  
**Total local images:** ~510 files across ~136 directories  
**Content files to update:** 34 JSON files + 1 API route  
**Date:** 2026-04-11

---

## Overview

This migration moves all images from `public/images/` to Cloudinary, maintaining the exact same folder hierarchy. After migration, no component or content file references a local `/images/` path.

The work is split into three phases:

1. **Phase 1** — Clean the Cloudinary account (delete all existing assets)
2. **Phase 2** — Upload the local `public/images/` tree to Cloudinary
3. **Phase 3** — Update all content JSON files and the gallery API route

---

## Phase 1: Clean the Cloudinary Account

**Goal:** Delete all sample/test assets so the account is empty before the canonical upload.

**Method:** Use the Cloudinary Admin API via a one-shot Node script.

### Script: `scripts/cloudinary-clean.mjs`

```js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function deleteAll() {
  // Delete all resources (images, raw, video)
  for (const type of ["image", "raw", "video"]) {
    let next_cursor;
    do {
      const res = await cloudinary.api.resources({
        resource_type: type,
        max_results: 500,
        next_cursor,
      });
      const ids = res.resources.map((r) => r.public_id);
      if (ids.length) {
        await cloudinary.api.delete_resources(ids, { resource_type: type });
        console.log(`Deleted ${ids.length} ${type} assets`);
      }
      next_cursor = res.next_cursor;
    } while (next_cursor);
  }

  // Delete all empty folders
  const folders = await cloudinary.api.root_folders();
  for (const folder of folders.folders) {
    await cloudinary.api.delete_folder(folder.path).catch(() => {});
    console.log(`Deleted folder: ${folder.path}`);
  }

  console.log("Done — Cloudinary account is empty.");
}

deleteAll().catch(console.error);
```

**Run with:**
```bash
node -r dotenv/config scripts/cloudinary-clean.mjs
```

> **Warning:** This is destructive and irreversible. Only run once you've confirmed there is nothing worth keeping on the account.

---

## Phase 2: Upload Local Images to Cloudinary

**Goal:** Upload every file in `public/images/` to Cloudinary, preserving the folder hierarchy exactly (minus the `public/` prefix).

**Folder mapping:**  
`public/images/accommodation/camping/hero/desktop.webp`  
→ Cloudinary `public_id`: `images/accommodation/camping/hero/desktop`  
→ URL: `https://res.cloudinary.com/dqxnz4cpu/image/upload/images/accommodation/camping/hero/desktop.webp`

### Script: `scripts/cloudinary-upload.mjs`

```js
import { v2 as cloudinary } from "cloudinary";
import { readdir, stat } from "fs/promises";
import { join, relative, extname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const IMAGES_DIR = join(__dirname, "../public/images");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function upload() {
  const files = [];
  for await (const file of walk(IMAGES_DIR)) files.push(file);

  console.log(`Uploading ${files.length} files…`);
  let done = 0;

  for (const file of files) {
    const rel = relative(IMAGES_DIR, file);               // e.g. accommodation/camping/hero/desktop.webp
    const ext = extname(file);
    const publicId = "images/" + rel.replace(/\\/g, "/").replace(ext, "");

    await cloudinary.uploader.upload(file, {
      public_id: publicId,
      resource_type: "image",
      overwrite: true,
      use_filename: false,
      // Preserve format so .webp stays .webp
      format: ext.replace(".", ""),
    });

    done++;
    if (done % 10 === 0) console.log(`  ${done}/${files.length}`);
  }

  console.log(`Upload complete — ${done} files.`);
}

upload().catch(console.error);
```

**Run with:**
```bash
node -r dotenv/config scripts/cloudinary-upload.mjs
```

**Expected output:** Each file uploaded to a `public_id` matching its local path structure, accessible at:
```
https://res.cloudinary.com/dqxnz4cpu/image/upload/{public_id}.{ext}
```

---

## Phase 3: Update Content Files and Gallery API

This is the largest phase. Every `/images/…` path in every JSON file must be replaced with the corresponding Cloudinary URL, and the gallery API route must be rewritten to query Cloudinary instead of scanning the local filesystem.

### 3a. Cloudinary URL Format

All updated paths will use the following base:
```
https://res.cloudinary.com/dqxnz4cpu/image/upload
```

**Mapping rule:**  
`/images/foo/bar.webp` → `https://res.cloudinary.com/dqxnz4cpu/image/upload/images/foo/bar.webp`

This is a simple string replacement — no restructuring of paths needed.

---

### 3b. Automated Content Patch Script

### Script: `scripts/cloudinary-patch-content.mjs`

```js
import { readFile, writeFile } from "fs/promises";
import { glob } from "glob";

const BASE_URL = "https://res.cloudinary.com/dqxnz4cpu/image/upload";
const CONTENT_DIR = "content";

async function patch() {
  const files = await glob(`${CONTENT_DIR}/**/*.json`);
  let patched = 0;

  for (const file of files) {
    const original = await readFile(file, "utf8");
    const updated = original.replace(/\/images\//g, `${BASE_URL}/images/`);
    if (updated !== original) {
      await writeFile(file, updated, "utf8");
      console.log(`Patched: ${file}`);
      patched++;
    }
  }

  console.log(`Done — patched ${patched} files.`);
}

patch().catch(console.error);
```

**Run with:**
```bash
node scripts/cloudinary-patch-content.mjs
```

**Files that will be patched (34 total):**

| Directory | Files |
|---|---|
| `content/accommodation/` | camping, double-en-suite, double-en-suite-rondawel, family-en-suite-rondawel, family-room, five-sleeper, gypsy-caravan, mixed-dorm, safari-tent, twin-room |
| `content/adventures/` | ancient-archives, bosduif-trail, brown-hooded-kingfisher-trail, fairy-labyrinth, half-collared-kingfisher-trail, horseriding, kayaking, lazy-library, map-of-africa, paragliding, water-under-the-bridge, wilderness-beach, woodville-big-tree |
| `content/pages/` | accommodation, adventures, contact, entertainment, facilities, fairy-folk-n-roll, home, venue |
| `content/entertainment/` | events |
| `content/facilities/` | facilities |
| `content/` | site |

---

### 3c. Rewrite the Gallery API Route

`src/app/api/gallery/route.ts` currently scans `public/images/` using `fs.readdir`. After migration this directory can be empty (or deleted), so the route must be rewritten to fetch assets from the Cloudinary API instead.

**Current behaviour:** Scans local filesystem for `gallery/full/` and `gallery/thumb/` subdirectories, constructs local URLs.

**New behaviour:** Uses `cloudinary.api.resources_by_prefix()` to list assets under a given folder prefix, returns Cloudinary delivery URLs.

**New `src/app/api/gallery/route.ts`:**

```ts
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category"); // e.g. "accommodation/camping"

  if (!category) {
    return NextResponse.json({ error: "Missing category" }, { status: 400 });
  }

  const prefix = `images/${category}/gallery`;

  try {
    const [fullRes, thumbRes] = await Promise.all([
      cloudinary.api.resources_by_prefix(`${prefix}/full`, {
        resource_type: "image",
        max_results: 100,
      }),
      cloudinary.api.resources_by_prefix(`${prefix}/thumb`, {
        resource_type: "image",
        max_results: 100,
      }),
    ]);

    const full = fullRes.resources.map((r: { secure_url: string }) => r.secure_url);
    const thumb = thumbRes.resources.map((r: { secure_url: string }) => r.secure_url);

    return NextResponse.json({ full, thumb });
  } catch (error) {
    console.error("Cloudinary gallery error:", error);
    return NextResponse.json({ error: "Failed to load gallery" }, { status: 500 });
  }
}
```

> **Note:** Review how `category` is passed from the client (currently from gallery components reading content JSON). The `category` param value should match the Cloudinary folder path segment — e.g. for `images/accommodation/camping/gallery/full/…` the category is `accommodation/camping`.

---

### 3d. Update Next.js Image Domain Config

Cloudinary's delivery domain must be added to `next.config.js` so `<Image>` components can load remote URLs:

**In `next.config.js` (or `next.config.ts`):**

```js
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: "/dqxnz4cpu/**",
    },
  ],
},
```

---

## Execution Order

Run phases strictly in order:

```bash
# 1. Install cloudinary SDK if not already present
npm install cloudinary

# 2. Clean the Cloudinary account
node -r dotenv/config scripts/cloudinary-clean.mjs

# 3. Upload all local images
node -r dotenv/config scripts/cloudinary-upload.mjs

# 4. Patch all content JSON files
node scripts/cloudinary-patch-content.mjs

# 5. Manually rewrite src/app/api/gallery/route.ts (see 3c above)

# 6. Add Cloudinary to next.config remotePatterns (see 3d above)

# 7. Verify build
npm run build
```

---

## Post-Migration Verification

- [ ] `npm run build` passes with no errors
- [ ] All hero images load on every page (spot-check home, accommodation, adventures)
- [ ] Gallery modal opens and shows full-size Cloudinary images
- [ ] Card images on listing pages load correctly
- [ ] Logo and footer banner load correctly (`/images/ui/logos/logo.webp` etc.)
- [ ] Contact and venue hero images load
- [ ] No `<Image>` component errors about unoptimised domains in console
- [ ] `grep -r '"/images/' content/` returns zero results

---

## Optional: Delete Local Images After Verification

Once all checks pass, the `public/images/` directory can be removed to reduce repo size:

```bash
rm -rf public/images/
```

Commit and push. The only images remaining locally should be `public/admin/` (TinaCMS UI), `public/fonts/`, and any non-image public assets.
