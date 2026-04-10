'use client';
import { useTina } from 'tinacms/dist/react';
import GalleryTemplate from './template';
import type { GalleryPageContent } from '@/lib/content';

interface Props {
  query: string;
  variables: object;
  data: GalleryPageContent;
}

export default function GalleryPageClient({ query, variables, data }: Props) {
  const { data: liveData } = useTina({ query, variables, data });
  return <GalleryTemplate content={liveData as GalleryPageContent} />;
}
