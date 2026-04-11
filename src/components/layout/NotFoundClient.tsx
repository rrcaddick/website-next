"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTina, tinaField } from "tinacms/dist/react";
import type { SiteContent } from "@/lib/content";

const tf = tinaField as (obj: unknown, field: string) => string;

interface Props {
  site: SiteContent;
  siteQuery: string;
  siteVariables: object;
}

export default function NotFoundClient({ site, siteQuery, siteVariables }: Props) {
  const siteWrapped = useMemo(() => ({ site }), [site]);
  const { data: liveSiteData } = useTina({ query: siteQuery, variables: siteVariables, data: siteWrapped });
  const liveSite = (liveSiteData as { site: SiteContent }).site;
  const nf = liveSite.errors.notFound;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div data-tina-field={tf(nf, "image")} className="absolute inset-0">
        <Image
          src={nf.image}
          alt="A fairy lost in an enchanted forest"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pb-16 pt-24">
        <h1
          data-tina-field={tf(nf, "heading")}
          className="hestrial-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-[0_0_12px_rgba(0,0,0,0.9)] mb-6 leading-tight"
        >
          {nf.heading}
        </h1>

        <p
          data-tina-field={tf(nf, "description")}
          className="text-white/80 text-base md:text-lg max-w-sm mb-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
        >
          {nf.description}
        </p>

        <Link
          data-tina-field={tf(nf, "button")}
          href={nf.button.href}
          className="bg-[#0E7D73] hover:bg-[#073F3A] text-[#C9DD94] hover:text-[#00FF7F] px-8 py-3 rounded-lg text-base font-semibold transition-colors duration-200 shadow-lg"
        >
          {nf.button.label}
        </Link>
      </div>
    </div>
  );
}
