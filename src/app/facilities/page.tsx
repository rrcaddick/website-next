import { getPageContent, getSiteContent } from "@/lib/content";
import { ListingPagesDocument, SiteDocument } from "@tina/__generated__/types";
import ListingTemplateClient from "@/features/listing/ListingTemplateClient";

export default async function Facilities() {
  const [data, site] = await Promise.all([getPageContent("facilities"), getSiteContent()]);
  return (
    <ListingTemplateClient
      data={data}
      query={ListingPagesDocument}
      variables={{ relativePath: "facilities.json" }}
      site={site}
      siteQuery={SiteDocument}
      siteVariables={{ relativePath: "site.json" }}
    />
  );
}
