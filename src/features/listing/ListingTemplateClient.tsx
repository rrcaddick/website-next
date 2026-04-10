'use client';
import { useTina } from 'tinacms/dist/react';
import ListingTemplate from './template';
import type { ListingPageContent } from '@/lib/content';

interface Props {
  query: string;
  variables: object;
  data: ListingPageContent;
}

export default function ListingTemplateClient({ query, variables, data }: Props) {
  const { data: liveData } = useTina({ query, variables, data });
  return <ListingTemplate content={liveData as ListingPageContent} />;
}
