import Link from "next/link";
import MobileMenu from "./MobileMenu";
import SiteHeaderLogoClient from "./SiteHeaderLogoClient";
import SiteHeaderDesktopNav from "./SiteHeaderDesktopNav";
import { getNav, getSiteContent } from "@/lib/content";
import { SiteDocument } from "@tina/__generated__/types";

// Written inline because the Tina-generated NavDocument still references the old
// schema (topLevelLinks / accommodationLinks / adventureLinks). This query matches
// the new unified nav schema and will continue to work after Tina regenerates types.
const NAV_QUERY = `
  query NavQuery($relativePath: String!) {
    nav(relativePath: $relativePath) {
      __typename
      id
      nav {
        __typename
        href
        label
        children {
          __typename
          href
          label
        }
      }
    }
  }
`;

const NAV_VARIABLES = { relativePath: "nav.json" };

export default async function SiteHeader() {
  const [nav, site] = await Promise.all([getNav(), getSiteContent()]);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between min-h-12">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center" title="Fairy Knowe Backpackers">
              <SiteHeaderLogoClient
                data={site}
                query={SiteDocument}
                variables={{ relativePath: "site.json" }}
              />
            </Link>
          </div>

          {/* Desktop nav — client component for live preview */}
          <SiteHeaderDesktopNav
            nav={nav}
            navQuery={NAV_QUERY}
            navVariables={NAV_VARIABLES}
          />

          {/* Mobile menu */}
          <MobileMenu
            nav={nav}
            navQuery={NAV_QUERY}
            navVariables={NAV_VARIABLES}
            site={site}
            siteQuery={SiteDocument}
            siteVariables={{ relativePath: "site.json" }}
          />
        </div>
      </div>
    </nav>
  );
}
