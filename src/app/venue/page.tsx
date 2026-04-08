import { getPageContent, getSiteContent } from "@/lib/content";
import ListingTemplate from "@/features/listing/template";
import VenueGallery from "@/components/features/venue/VenueGallery";

export default async function Venue() {
  const content = await getPageContent("venue");
  const site = await getSiteContent();
  return (
    <>
      <ListingTemplate content={content} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <VenueGallery heading={content.galleryHeading ?? site.defaults.galleryHeading} />
      </div>
    </>
  );
}
