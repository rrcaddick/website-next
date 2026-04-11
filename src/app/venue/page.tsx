import { getPageContent, getSiteContent } from "@/lib/content";
import { ListingPagesDocument, SiteDocument } from "@tina/__generated__/types";
import ListingTemplateClient from "@/features/listing/ListingTemplateClient";
import VenueGallery from "@/components/features/venue/VenueGallery";

export default async function Venue() {
  const [data, site] = await Promise.all([getPageContent("venue"), getSiteContent()]);
  return (
    <>
      <ListingTemplateClient
        data={data}
        query={ListingPagesDocument}
        variables={{ relativePath: "venue.json" }}
        site={site}
        siteQuery={SiteDocument}
        siteVariables={{ relativePath: "site.json" }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <VenueGallery heading={data.galleryHeading ?? site.defaults.galleryHeading} />
      </div>
    </>
  );
}
