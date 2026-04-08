import { getGalleryPageContent } from "@/lib/content";
import GalleryTemplate from "@/features/gallery/template";

export default function Gallery() {
  const content = getGalleryPageContent("gallery");
  return <GalleryTemplate content={content} />;
}
