import { v2 as cloudinary } from "cloudinary";
import { readdir } from "fs/promises";
import { join, relative, extname, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const IMAGES_DIR = join(__dirname, "../public/images");

const TEST_MODE = false; 
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

  let filesToUpload = files;
  if (TEST_MODE) {
    const seenFolders = new Set();
    filesToUpload = [];
    for (const file of files) {
      const rel = relative(IMAGES_DIR, file).replace(/\\/g, "/");
      const folder = dirname(rel);
      if (!seenFolders.has(folder)) {
        seenFolders.add(folder);
        filesToUpload.push(file);
      }
    }
    console.log(`TEST MODE: ${filesToUpload.length} files selected (1 per folder)`);
  } else {
    console.log(`Uploading all ${files.length} files…`);
  }

  let done = 0;
  let failed = 0;

  for (const file of filesToUpload) {
    const rel = relative(IMAGES_DIR, file).replace(/\\/g, "/"); // e.g. "hero/banner.jpg"
    const ext = extname(file).toLowerCase();
    const nameWithoutExt = rel.slice(0, -ext.length); // e.g. "hero/banner"

    const publicId = `images/${nameWithoutExt}`;
    const assetFolder = `images/${dirname(rel) || ""}`.replace(/\/$/, ""); // clean trailing slash

    console.log(` [${done + 1}/${filesToUpload.length}] ${rel} → ${publicId}`);

    try {
      await cloudinary.uploader.upload(file, {
        public_id: publicId,
        asset_folder: assetFolder, // ← This is the key fix for modern accounts
        resource_type: "image",
        overwrite: true,
      });
      done++;
      console.log(`   ✅ Uploaded`);
    } catch (e) {
      console.error(`   ❌ FAILED ${rel} — ${e.message}`);
      failed++;
    }
  }

  console.log(`\n🎉 Finished — ${done} uploaded, ${failed} failed.`);
}

upload().catch(console.error);
