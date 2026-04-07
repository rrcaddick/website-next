import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { accommodationLinks, adventureLinks } from "@/data/nav";

export default function SiteHeader() {
  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Single flex row that wraps: logo | links | hamburger */}
        <div className="flex flex-wrap items-center justify-between min-h-12">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center" title="Fairy Knowe Backpackers">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/ui/logos/logo-icon.png"
                  alt="Fairy Knowe Backpackers"
                  priority
                  width={32}
                  height={32}
                  className="object-contain mt-1"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation — hidden on mobile */}
          {/* Uses order-last + w-full so when it wraps it takes its own full-width centered row */}
          <div className="hidden sm:flex flex-wrap justify-center items-center gap-x-1 gap-y-0 order-last w-full sm:order-none sm:w-auto sm:flex-1 sm:justify-center py-1">
            {/* Accommodation Dropdown */}
            <div className="relative group">
              <Link
                href="/accommodation"
                className="text-gray-900 hover:text-primary px-2 py-2 rounded-md text-sm font-medium whitespace-nowrap inline-flex items-center"
              >
                Accommodation
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <div className="relative top-2">
                  <div className="bg-white border border-gray-100 rounded-lg shadow-lg">
                    {accommodationLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary first:rounded-t-lg last:rounded-b-lg"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Adventures Dropdown */}
            <div className="relative group">
              <Link
                href="/adventures"
                className="text-gray-900 hover:text-primary px-2 py-2 rounded-md text-sm font-medium whitespace-nowrap inline-flex items-center"
              >
                Adventures
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <div className="relative top-2">
                  <div className="bg-white border border-gray-100 rounded-lg shadow-lg">
                    {adventureLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary first:rounded-t-lg last:rounded-b-lg"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/entertainment"
              className="text-gray-900 hover:text-primary px-2 py-2 rounded-md text-sm font-medium whitespace-nowrap"
            >
              Entertainment
            </Link>
            <Link
              href="/venue"
              className="text-gray-900 hover:text-primary px-2 py-2 rounded-md text-sm font-medium whitespace-nowrap"
            >
              Venue Hire
            </Link>
            <Link
              href="/facilities"
              className="text-gray-900 hover:text-primary px-2 py-2 rounded-md text-sm font-medium whitespace-nowrap"
            >
              Facilities
            </Link>
            <Link
              href="/gallery"
              className="text-gray-900 hover:text-primary px-2 py-2 rounded-md text-sm font-medium whitespace-nowrap"
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              className="text-gray-900 hover:text-primary px-2 py-2 rounded-md text-sm font-medium whitespace-nowrap"
            >
              Contact
            </Link>
            <Link
              href="/fairy-folk-n-roll"
              title="Fairy Folk 'n Roll"
              className="text-gray-900 hover:text-primary px-2 py-2 rounded-md text-sm font-medium whitespace-nowrap"
            >
              <span className="bg-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-300 transition-colors">
                #fairyfolknroll
              </span>
            </Link>
          </div>

          {/* Mobile Menu — stays on the right of the logo row */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
