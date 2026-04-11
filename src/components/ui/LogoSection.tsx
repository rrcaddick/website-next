import Image from 'next/image';
import { tinaField } from 'tinacms/dist/react';
import type { SiteContent } from '@/lib/content';

const tf = tinaField as (obj: unknown, field: string) => string;

interface Props {
  site: SiteContent;
}

export default function LogoSection({ site }: Props) {
  return (
    <div className="flex justify-center">
      <div data-tina-field={tf(site, 'logo')}>
        <Image
          src={site.logo}
          alt="Fairy Knowe Backpackers Logo"
          width={250}
          height={250}
          sizes="(max-width: 768px) 200px, 250px"
          className="w-[200px] md:w-[250px] h-auto"
        />
      </div>
    </div>
  );
}
