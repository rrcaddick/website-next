import { getGalleryPageContent } from "@/lib/content";
import { GalleryPageDocument } from "@tina/__generated__/types";
import GalleryPageClient from "@/features/gallery/GalleryPageClient";

export default async function Gallery() {
  const data = await getGalleryPageContent("gallery");
  return (
    <GalleryPageClient
      data={data}
      query={GalleryPageDocument}
      variables={{ relativePath: "gallery.json" }}
    />
  );
}
