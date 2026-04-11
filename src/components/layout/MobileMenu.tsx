"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTina, tinaField } from "tinacms/dist/react";
import type { NavContent, SiteContent } from "@/lib/content";

const tf = tinaField as (obj: unknown, field: string) => string;

interface Props {
  nav: NavContent;
  navQuery: string;
  navVariables: object;
  site: SiteContent;
  siteQuery: string;
  siteVariables: object;
}

export default function MobileMenu({ nav, navQuery, navVariables, site, siteQuery, siteVariables }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const navWrapped = useMemo(() => ({ nav }), [nav]);
  const { data: liveNavData } = useTina({ query: navQuery, variables: navVariables, data: navWrapped });
  const liveNav = (liveNavData as { nav: NavContent }).nav;

  const siteWrapped = useMemo(() => ({ site }), [site]);
  const { data: liveSiteData } = useTina({ query: siteQuery, variables: siteVariables, data: siteWrapped });
  const liveSite = (liveSiteData as { site: SiteContent }).site;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    setExpandedIndex(null);
  };

  return (
    <>
      {/* Hamburger trigger */}
      <div className="flex items-center sm:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          aria-expanded={isOpen}
          aria-controls="mobile-drawer-menu"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={`sm:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden={!isOpen}
      >
        {/* Drawer */}
        <div
          id="mobile-drawer-menu"
          className={`absolute right-0 top-0 h-full w-[90%] overflow-hidden transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background image */}
          <div data-tina-field={tf(liveSite, "mobileMenuBackground")} className="absolute inset-0">
            <Image
              src={liveSite.mobileMenuBackground}
              alt=""
              fill
              className="object-cover object-center"
              priority
              sizes="90vw"
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/75" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <span
                data-tina-field={tf(liveSite, "mobileMenuHeading")}
                className="hestrial-font text-lg text-[#C9DD94] drop-shadow-[0_0_10px_rgba(201,221,148,0.9)] tracking-widest"
              >
                ✦ {liveSite.mobileMenuHeading} ✦
              </span>
              <button
                onClick={close}
                className="rounded-full p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9DD94]/50"
              >
                <span className="sr-only">Close main menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="mx-5 mb-2 h-px bg-gradient-to-r from-transparent via-[#C9DD94]/50 to-transparent" />

            {/* Nav */}
            <nav className="flex-1 px-6 py-4 overflow-y-auto flex flex-col justify-center">
              <div className="space-y-2">
                {liveNav.nav.map((item, index) => {
                  const hasChildren = item.children && item.children.length > 0;
                  const isExpanded = expandedIndex === index;

                  if (hasChildren) {
                    return (
                      <div key={item.href}>
                        {/* Parent row — tap label to navigate, tap chevron to expand */}
                        <div className="flex items-stretch gap-0 rounded-xl overflow-hidden border border-[#C9DD94]/30 bg-black/30 backdrop-blur-sm">
                          <Link
                            data-tina-field={tf(item, "label")}
                            href={item.href}
                            className="flex-1 hestrial-font text-center text-xl text-white px-5 py-4
                                       hover:bg-[#0E7D73]/50 hover:text-[#C9DD94]
                                       transition-all duration-200"
                            onClick={close}
                          >
                            {item.label}
                          </Link>
                          <button
                            onClick={() => setExpandedIndex(isExpanded ? null : index)}
                            className="px-4 text-white/70 hover:text-[#C9DD94] hover:bg-[#0E7D73]/40 transition-all duration-200 border-l border-[#C9DD94]/20"
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                          >
                            <svg
                              className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                              fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>

                        {/* Children */}
                        {isExpanded && (
                          <div className="mt-1 ml-3 space-y-1">
                            {item.children!.map((child) => (
                              <Link
                                key={child.href}
                                data-tina-field={tf(child, "label")}
                                href={child.href}
                                className="block hestrial-font text-center text-base text-white/90
                                           bg-black/20 backdrop-blur-sm
                                           border border-[#C9DD94]/20
                                           rounded-lg px-4 py-3
                                           hover:bg-[#0E7D73]/50 hover:border-[#C9DD94]/60
                                           hover:text-[#C9DD94]
                                           transition-all duration-200"
                                onClick={close}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      data-tina-field={tf(item, "label")}
                      href={item.href}
                      className="block hestrial-font text-center text-xl text-white
                                 drop-shadow-[0_2px_6px_rgba(255,255,255,0.9)]
                                 bg-black/30 backdrop-blur-sm
                                 border border-[#C9DD94]/30
                                 rounded-xl px-5 py-4
                                 hover:bg-[#0E7D73]/50 hover:border-[#C9DD94]/80
                                 hover:text-[#C9DD94]
                                 hover:drop-shadow-[0_0_12px_rgba(255,255,255,1)]
                                 transition-all duration-200"
                      onClick={close}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            <p className="pb-6 text-center text-[#C9DD94]/50 text-xs tracking-[0.4em] hestrial-font">
              ✦ &nbsp; ✦ &nbsp; ✦
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
