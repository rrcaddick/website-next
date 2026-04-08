import { getPageContent } from "@/lib/content";
import ListingTemplate from "@/features/listing/template";

export default async function Facilities() {
  const content = await getPageContent("facilities");
  return <ListingTemplate content={content} />;
}
