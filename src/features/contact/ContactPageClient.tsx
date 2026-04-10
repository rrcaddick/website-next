'use client';
import { useTina } from 'tinacms/dist/react';
import ContactPageTemplate from './template';
import type { ContactPageContent } from '@/lib/content';

interface Props {
  query: string;
  variables: object;
  data: ContactPageContent;
}

export default function ContactPageClient({ query, variables, data }: Props) {
  const { data: liveData } = useTina({ query, variables, data });
  return <ContactPageTemplate content={liveData as ContactPageContent} />;
}
