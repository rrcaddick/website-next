import { getPageContent } from "@/lib/content";
import ListingTemplate from "@/features/listing/template";

export default function Facilities() {
  const content = getPageContent("facilities");
  return <ListingTemplate content={content} />;
}
