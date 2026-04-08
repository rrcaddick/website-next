import { getContactPageContent } from "@/lib/content";
import ContactPageTemplate from "@/features/contact/template";

export default function Contact() {
  const content = getContactPageContent("contact");
  return <ContactPageTemplate content={content} />;
}
