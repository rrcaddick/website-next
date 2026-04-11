"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      >
        {/* Drawer — 90% width, anchored right */}
        <div
          id="mobile-drawer-menu"
          className={`absolute right-0 top-0 h-full w-[90%] overflow-hidden transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background image */}
          <Image
            src="/images/ui/mobile-menu-background.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="90vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/75" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <span className="hestrial-font text-lg text-[#C9DD94] drop-shadow-[0_0_10px_rgba(201,221,148,0.9)] tracking-widest">
                ✦ Fairy Knowe ✦
              </span>
              <button
                onClick={() => setIsOpen(false)}
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
            <nav className="flex-1 flex flex-col justify-center px-6 py-4 overflow-y-auto">
              <div className="space-y-3">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block hestrial-font text-center text-xl text-white
                               drop-shadow-[0_2px_6px_rgba(255,255,255,0.9)]
                               bg-black/30 backdrop-blur-sm
                               border border-[#C9DD94]/30
                               rounded-xl px-5 py-4
                               hover:bg-[#0E7D73]/50 hover:border-[#C9DD94]/80
                               hover:text-[#C9DD94]
                               hover:drop-shadow-[0_0_12px_rgba(255,255,255,1)]
                               transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
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
