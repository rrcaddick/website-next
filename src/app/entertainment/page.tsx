import { getPageContent } from "@/lib/content";
import { ListingPagesDocument } from "@tina/__generated__/types";
import ListingTemplateClient from "@/features/listing/ListingTemplateClient";

export default async function Entertainment() {
  const data = await getPageContent("entertainment");
  return (
    <ListingTemplateClient
      data={data}
      query={ListingPagesDocument}
      variables={{ relativePath: "entertainment.json" }}
    />
  );
}
