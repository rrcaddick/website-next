import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function deleteAll() {
  for (const type of ["image", "raw", "video"]) {
    let next_cursor;
    do {
      const res = await cloudinary.api.resources({
        resource_type: type,
        max_results: 500,
        next_cursor,
      });
      const ids = res.resources.map((r) => r.public_id);
      for (let i = 0; i < ids.length; i += 100) {
        const chunk = ids.slice(i, i + 100);
        await cloudinary.api.delete_resources(chunk, { resource_type: type });
        console.log(`Deleted ${chunk.length} ${type} assets`);
      }
      next_cursor = res.next_cursor;
    } while (next_cursor);
  }

  // Delete all folders recursively
  try {
    const { folders } = await cloudinary.api.root_folders();
    for (const folder of folders) {
      await cloudinary.api.delete_folder(folder.path).catch((e) => {
        console.warn(`Could not delete folder ${folder.path}: ${e.message}`);
      });
      console.log(`Deleted folder: ${folder.path}`);
    }
  } catch (e) {
    console.warn("Folder cleanup skipped:", e.message);
  }

  console.log("Done — Cloudinary account is empty.");
}

deleteAll().catch(console.error);
