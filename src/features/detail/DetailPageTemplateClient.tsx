'use client';
import { useMemo } from 'react';
import { useTina } from 'tinacms/dist/react';
import DetailPageTemplate from './template';
import type { DetailPageContent } from '@/lib/content';

interface Props {
  query: string;
  variables: object;
  data: DetailPageContent;
  collection: 'accommodation' | 'adventures';
}

export default function DetailPageTemplateClient({ query, variables, data, collection }: Props) {
  const wrapped = useMemo(() => ({ [collection]: data }), [collection, data]);
  const { data: liveData } = useTina({ query, variables, data: wrapped });
  return <DetailPageTemplate content={(liveData as Record<string, DetailPageContent>)[collection]} />;
}
