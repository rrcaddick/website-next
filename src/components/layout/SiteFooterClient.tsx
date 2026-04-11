'use client';
import { useMemo } from 'react';
import { useTina } from 'tinacms/dist/react';
import SiteFooter from './SiteFooter';
import type { SiteContent } from '@/lib/content';

interface Props {
  data: SiteContent;
  query: string;
  variables: object;
}

export default function SiteFooterClient({ data, query, variables }: Props) {
  const wrapped = useMemo(() => ({ site: data }), [data]);
  const { data: liveData } = useTina({ query, variables, data: wrapped });
  return <SiteFooter site={(liveData as { site: SiteContent }).site} />;
}
