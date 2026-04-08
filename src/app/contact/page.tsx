import { getContactPageContent } from "@/lib/content";
import ContactPageTemplate from "@/features/contact/template";

export default async function Contact() {
  const content = await getContactPageContent("contact");
  return <ContactPageTemplate content={content} />;
}
