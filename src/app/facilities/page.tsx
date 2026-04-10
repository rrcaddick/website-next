import { getPageContent } from "@/lib/content";
import { ListingPagesDocument } from "@tina/__generated__/types";
import ListingTemplateClient from "@/features/listing/ListingTemplateClient";

export default async function Facilities() {
  const data = await getPageContent("facilities");
  return (
    <ListingTemplateClient
      data={data}
      query={ListingPagesDocument}
      variables={{ relativePath: "facilities.json" }}
    />
  );
}
