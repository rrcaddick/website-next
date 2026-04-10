'use client';
import { useTina } from 'tinacms/dist/react';
import SiteFooter from './SiteFooter';
import type { SiteContent } from '@/lib/content';

interface Props {
  query: string;
  variables: object;
  data: SiteContent;
}

export default function SiteFooterClient({ query, variables, data }: Props) {
  const { data: liveData } = useTina({ query, variables, data });
  return <SiteFooter site={liveData as SiteContent} />;
}
