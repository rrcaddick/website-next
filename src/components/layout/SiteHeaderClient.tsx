'use client';
import { useTina } from 'tinacms/dist/react';
import SiteHeader from './SiteHeader';
import type { NavContent } from '@/lib/content';

interface Props {
  query: string;
  variables: object;
  data: NavContent;
}

export default function SiteHeaderClient({ query, variables, data }: Props) {
  const { data: liveData } = useTina({ query, variables, data });
  return <SiteHeader nav={liveData as NavContent} />;
}
