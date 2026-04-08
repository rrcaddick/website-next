import { getPageContent } from "@/lib/content";
import ListingTemplate from "@/features/listing/template";

export default async function Accommodation() {
  const content = await getPageContent("accommodation");
  return <ListingTemplate content={content} />;
}
