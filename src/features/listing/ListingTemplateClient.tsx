'use client';
import { useMemo } from 'react';
import { useTina } from 'tinacms/dist/react';
import ListingTemplate from './template';
import type { ListingPageContent, SiteContent } from '@/lib/content';

interface Props {
  query: string;
  variables: object;
  data: ListingPageContent;
  siteQuery: string;
  siteVariables: object;
  site: SiteContent;
}

export default function ListingTemplateClient({ query, variables, data, siteQuery, siteVariables, site }: Props) {
  const wrapped = useMemo(() => ({ listingPages: data }), [data]);
  const { data: liveData } = useTina({ query, variables, data: wrapped });

  const siteWrapped = useMemo(() => ({ site }), [site]);
  const { data: liveSiteData } = useTina({ query: siteQuery, variables: siteVariables, data: siteWrapped });

  return (
    <ListingTemplate
      content={(liveData as { listingPages: ListingPageContent }).listingPages}
      site={(liveSiteData as { site: SiteContent }).site}
    />
  );
}
