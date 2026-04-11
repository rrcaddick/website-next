import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const revalidate = 3600;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type GalleryImage = {
  category: string;
  subcategory?: string;
  src: string;
  alt: string;
  fullSize: string;
};

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
};

async function fetchByPrefix(prefix: string): Promise<CloudinaryResource[]> {
  const all: CloudinaryResource[] = [];
  let next_cursor: string | undefined;
  do {
    const res: { resources: CloudinaryResource[]; next_cursor?: string } =
      await cloudinary.api.resources({
        type: "upload",
        resource_type: "image",
        prefix,
        max_results: 500,
        next_cursor,
      });
    all.push(...res.resources);
    next_cursor = res.next_cursor;
  } while (next_cursor);
  return all;
}

/** Parse paths like images/{cat}/{slug}/gallery/thumb/{name} */
function buildGalleryImages(
  resources: CloudinaryResource[],
  category: string,
  pathCategory: string
): GalleryImage[] {
  // Build a map of full-size images: slug/name → secure_url
  const fullMap = new Map<string, string>();
  for (const r of resources) {
    // e.g. images/accommodation/camping/gallery/full/1
    const match = r.public_id.match(
      new RegExp(`^images/${pathCategory}/([^/]+)/gallery/full/(.+)$`)
    );
    if (match) fullMap.set(`${match[1]}/${match[2]}`, r.secure_url);
  }

  const images: GalleryImage[] = [];
  for (const r of resources) {
    const match = r.public_id.match(
      new RegExp(`^images/${pathCategory}/([^/]+)/gallery/thumb/(.+)$`)
    );
    if (!match) continue;
    const [, slug, name] = match;
    const subcategory = slug.replace(/-/g, " ");
    const fullUrl = fullMap.get(`${slug}/${name}`) ?? r.secure_url;
    images.push({
      category,
      subcategory,
      src: r.secure_url,
      alt: `${subcategory} ${name.replace(/[-_]/g, " ")}`,
      fullSize: fullUrl,
    });
  }
  return images;
}

/** Parse paths like images/{pathPrefix}/{name} (flat — no thumb/full split) */
function buildFlatImages(
  resources: CloudinaryResource[],
  category: string,
  pathPrefix: string
): GalleryImage[] {
  return resources
    .filter((r) => r.public_id.startsWith(`images/${pathPrefix}/`))
    .map((r) => {
      const name = r.public_id.split("/").pop() ?? "";
      return {
        category,
        src: r.secure_url,
        alt: `${category} ${name.replace(/[-_]/g, " ")}`,
        fullSize: r.secure_url,
      };
    });
}

async function buildAllGalleryImages(): Promise<GalleryImage[]> {
  const [accommodation, adventures, entertainment, facilities, venue] =
    await Promise.all([
      fetchByPrefix("images/accommodation"),
      fetchByPrefix("images/adventures"),
      fetchByPrefix("images/entertainment/images"),
      fetchByPrefix("images/facilities/images"),
      fetchByPrefix("images/venue"),
    ]);

  return [
    ...buildGalleryImages(accommodation, "Accommodation", "accommodation"),
    ...buildGalleryImages(adventures, "Adventures", "adventures"),
    ...buildFlatImages(entertainment, "Entertainment", "entertainment/images"),
    ...buildFlatImages(facilities, "Facilities", "facilities/images"),
    ...buildGalleryImages(venue, "Venue Hire", "venue"),
  ];
}

export async function GET() {
  try {
    const images = await buildAllGalleryImages();
    return NextResponse.json({ images });
  } catch (error) {
    console.error("Gallery API error:", error);
    return NextResponse.json({ error: "Failed to load gallery" }, { status: 500 });
  }
}
