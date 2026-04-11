import { getPageContent, getSiteContent } from "@/lib/content";
import { ListingPagesDocument, SiteDocument } from "@tina/__generated__/types";
import ListingTemplateClient from "@/features/listing/ListingTemplateClient";

export default async function FairyFolkNRoll() {
  const [data, site] = await Promise.all([getPageContent("fairy-folk-n-roll"), getSiteContent()]);
  return (
    <ListingTemplateClient
      data={data}
      query={ListingPagesDocument}
      variables={{ relativePath: "fairy-folk-n-roll.json" }}
      site={site}
      siteQuery={SiteDocument}
      siteVariables={{ relativePath: "site.json" }}
    />
  );
}
