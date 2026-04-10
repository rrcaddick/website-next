import { getContactPageContent } from "@/lib/content";
import { ContactPageDocument } from "@tina/__generated__/types";
import ContactPageClient from "@/features/contact/ContactPageClient";

export default async function Contact() {
  const data = await getContactPageContent("contact");
  return (
    <ContactPageClient
      data={data}
      query={ContactPageDocument}
      variables={{ relativePath: "contact.json" }}
    />
  );
}
