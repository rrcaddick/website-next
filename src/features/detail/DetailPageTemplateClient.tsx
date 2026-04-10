'use client';
import { useTina } from 'tinacms/dist/react';
import DetailPageTemplate from './template';
import type { DetailPageContent } from '@/lib/content';

interface Props {
  query: string;
  variables: object;
  data: DetailPageContent;
}

export default function DetailPageTemplateClient({ query, variables, data }: Props) {
  const { data: liveData } = useTina({ query, variables, data });
  return <DetailPageTemplate content={liveData as DetailPageContent} />;
}
