import { getPageContent } from "@/lib/content";
import { ListingPagesDocument } from "@tina/__generated__/types";
import ListingTemplateClient from "@/features/listing/ListingTemplateClient";

export default async function FairyFolkNRoll() {
  const data = await getPageContent("fairy-folk-n-roll");
  return (
    <ListingTemplateClient
      data={data}
      query={ListingPagesDocument}
      variables={{ relativePath: "fairy-folk-n-roll.json" }}
    />
  );
}
