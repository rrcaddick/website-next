import { getPageContent } from "@/lib/content";
import ListingTemplate from "@/features/listing/template";
import VenueGallery from "@/components/features/venue/VenueGallery";

export default function Venue() {
  const content = getPageContent("venue");
  return (
    <>
      <ListingTemplate content={content} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <VenueGallery heading={content.galleryHeading ?? "Gallery"} />
      </div>
    </>
  );
}
