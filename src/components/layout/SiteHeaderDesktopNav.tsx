"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useTina, tinaField } from "tinacms/dist/react";
import type { NavContent } from "@/lib/content";

const tf = tinaField as (obj: unknown, field: string) => string;

interface Props {
  nav: NavContent;
  navQuery: string;
  navVariables: object;
}

export default function SiteHeaderDesktopNav({ nav, navQuery, navVariables }: Props) {
  const wrapped = useMemo(() => ({ nav }), [nav]);
  const { data: liveData } = useTina({ query: navQuery, variables: navVariables, data: wrapped });
  const liveNav = (liveData as { nav: NavContent }).nav;

  return (
    <div className="hidden sm:flex flex-wrap justify-center items-center gap-x-1 gap-y-0 order-last w-full sm:order-none sm:w-auto sm:flex-1 sm:justify-center py-1">
      {liveNav.nav.map((item) => {
        const isFolk = item.href === "/fairy-folk-n-roll";

        if (item.children && item.children.length > 0) {
          return (
            <div key={item.href} className="relative group">
              <Link
                data-tina-field={tf(item, "label")}
                href={item.href}
                className="text-gray-900 hover:text-primary px-2 py-2 rounded-md text-sm font-medium whitespace-nowrap inline-flex items-center"
              >
                {item.label}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <div className="relative top-2">
                  <div className="bg-white border border-gray-100 rounded-lg shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        data-tina-field={tf(child, "label")}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary first:rounded-t-lg last:rounded-b-lg"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            data-tina-field={tf(item, "label")}
            href={item.href}
            title={isFolk ? "Fairy Folk 'n Roll" : undefined}
            className="text-gray-900 hover:text-primary px-2 py-2 rounded-md text-sm font-medium whitespace-nowrap"
          >
            {isFolk ? (
              <span className="bg-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-300 transition-colors">
                #fairyfolknroll
              </span>
            ) : (
              item.label
            )}
          </Link>
        );
      })}
    </div>
  );
}
