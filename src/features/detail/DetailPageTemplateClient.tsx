'use client';
import { useMemo } from 'react';
import { useTina } from 'tinacms/dist/react';
import DetailPageTemplate from './template';
import type { DetailPageContent, SiteContent } from '@/lib/content';

interface Props {
  query: string;
  variables: object;
  data: DetailPageContent;
  collection: 'accommodation' | 'adventures';
  siteQuery: string;
  siteVariables: object;
  site: SiteContent;
}

export default function DetailPageTemplateClient({ query, variables, data, collection, siteQuery, siteVariables, site }: Props) {
  const wrapped = useMemo(() => ({ [collection]: data }), [collection, data]);
  const { data: liveData } = useTina({ query, variables, data: wrapped });

  const siteWrapped = useMemo(() => ({ site }), [site]);
  const { data: liveSiteData } = useTina({ query: siteQuery, variables: siteVariables, data: siteWrapped });

  return (
    <DetailPageTemplate
      content={(liveData as Record<string, DetailPageContent>)[collection]}
      site={(liveSiteData as { site: SiteContent }).site}
    />
  );
}
