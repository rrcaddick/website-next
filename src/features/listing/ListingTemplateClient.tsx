'use client';
import { useMemo } from 'react';
import { useTina } from 'tinacms/dist/react';
import ListingTemplate from './template';
import type { ListingPageContent } from '@/lib/content';

interface Props {
  query: string;
  variables: object;
  data: ListingPageContent;
}

export default function ListingTemplateClient({ query, variables, data }: Props) {
  const wrapped = useMemo(() => ({ listingPages: data }), [data]);
  const { data: liveData } = useTina({ query, variables, data: wrapped });
  return <ListingTemplate content={(liveData as { listingPages: ListingPageContent }).listingPages} />;
}
