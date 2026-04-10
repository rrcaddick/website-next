'use client';
import { useMemo } from 'react';
import { useTina } from 'tinacms/dist/react';
import GalleryTemplate from './template';
import type { GalleryPageContent } from '@/lib/content';

interface Props {
  query: string;
  variables: object;
  data: GalleryPageContent;
}

export default function GalleryPageClient({ query, variables, data }: Props) {
  const wrapped = useMemo(() => ({ galleryPage: data }), [data]);
  const { data: liveData } = useTina({ query, variables, data: wrapped });
  return <GalleryTemplate content={(liveData as { galleryPage: GalleryPageContent }).galleryPage} />;
}
