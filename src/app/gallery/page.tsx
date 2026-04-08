import { getGalleryPageContent } from "@/lib/content";
import GalleryTemplate from "@/features/gallery/template";

export default async function Gallery() {
  const content = await getGalleryPageContent("gallery");
  return <GalleryTemplate content={content} />;
}
