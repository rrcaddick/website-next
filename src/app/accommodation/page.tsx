import { getPageContent } from "@/lib/content";
import { ListingPagesDocument } from "@tina/__generated__/types";
import ListingTemplateClient from "@/features/listing/ListingTemplateClient";

export default async function Accommodation() {
  const data = await getPageContent("accommodation");
  return (
    <ListingTemplateClient
      data={data}
      query={ListingPagesDocument}
      variables={{ relativePath: "accommodation.json" }}
    />
  );
}
