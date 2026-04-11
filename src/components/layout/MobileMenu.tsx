"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NavLink } from "@/lib/content";

interface Props {
  links: NavLink[];
}

export default function MobileMenu({ links }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div className="flex items-center space-x-4 sm:hidden">
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

      <div
        className={`sm:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto bg-black/40 opacity-100" : "pointer-events-none bg-black/0 opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      >
        <div
          id="mobile-drawer-menu"
          className={`absolute right-0 top-0 h-full w-[88vw] max-w-sm bg-[#F9FAFB] transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#073F3A]">Menu</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <span className="sr-only">Close main menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-5">
              <div className="space-y-3">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block hestrial-font rounded-2xl border border-[#D1D5DB] bg-gradient-to-b from-white via-white to-[#E5E7EB] px-5 py-4 text-base font-medium text-[#202635] transition-colors hover:text-[#073F3A] hover:border-[#073F3A]"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
