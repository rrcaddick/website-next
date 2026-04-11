import { getPageContent, getSiteContent } from "@/lib/content";
import { ListingPagesDocument, SiteDocument } from "@tina/__generated__/types";
import ListingTemplateClient from "@/features/listing/ListingTemplateClient";

export default async function Entertainment() {
  const [data, site] = await Promise.all([getPageContent("entertainment"), getSiteContent()]);
  return (
    <ListingTemplateClient
      data={data}
      query={ListingPagesDocument}
      variables={{ relativePath: "entertainment.json" }}
      site={site}
      siteQuery={SiteDocument}
      siteVariables={{ relativePath: "site.json" }}
    />
  );
}
