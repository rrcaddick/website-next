import { getPageContent } from "@/lib/content";
import ListingTemplate from "@/features/listing/template";

export default function Accommodation() {
  const content = getPageContent("accommodation");
  return <ListingTemplate content={content} />;
}
