"use client";
import { useMemo } from "react";
import { useTina } from "tinacms/dist/react";
import ContactPageTemplate from "./template";
import type { ContactPageContent } from "@/lib/content";

interface Props {
  query: string;
  variables: object;
  data: ContactPageContent;
}

export default function ContactPageClient({ query, variables, data }: Props) {
  const wrapped = useMemo(() => ({ contactPage: data }), [data]);
  const { data: liveData } = useTina({ query, variables, data: wrapped });
  return <ContactPageTemplate content={(liveData as { contactPage: ContactPageContent }).contactPage} />;
}
