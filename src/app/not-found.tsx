import { getSiteContent } from "@/lib/content";
import { SiteDocument } from "@tina/__generated__/types";
import NotFoundClient from "@/components/layout/NotFoundClient";

export default async function NotFound() {
  const site = await getSiteContent();
  return (
    <NotFoundClient
      site={site}
      siteQuery={SiteDocument}
      siteVariables={{ relativePath: "site.json" }}
    />
  );
}
