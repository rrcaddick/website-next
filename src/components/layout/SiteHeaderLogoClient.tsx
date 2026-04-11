'use client';
import { useMemo } from 'react';
import Image from 'next/image';
import { useTina } from 'tinacms/dist/react';
import { tinaField } from 'tinacms/dist/react';
import type { SiteContent } from '@/lib/content';

const tf = tinaField as (obj: unknown, field: string) => string;

interface Props {
  data: SiteContent;
  query: string;
  variables: object;
}

export default function SiteHeaderLogoClient({ data, query, variables }: Props) {
  const wrapped = useMemo(() => ({ site: data }), [data]);
  const { data: liveData } = useTina({ query, variables, data: wrapped });
  const site = (liveData as { site: SiteContent }).site;

  return (
    <div className="relative w-12 h-12" data-tina-field={tf(site, 'headerLogo')}>
      <Image
        src={site.headerLogo}
        alt="Fairy Knowe Backpackers"
        priority
        width={32}
        height={32}
        className="object-contain mt-1"
      />
    </div>
  );
}
