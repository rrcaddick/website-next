import localFont from "next/font/local";
import "@/app/globals.css";
import SiteHeaderClient from "@/components/layout/SiteHeaderClient";
import SiteFooterClient from "@/components/layout/SiteFooterClient";
import { getSiteContent, getNav } from "@/lib/content";
import { SiteDocument, NavDocument } from "@tina/__generated__/types";

const inter = localFont({
  src: "../../public/fonts/Inter.ttf",
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata() {
  const site = await getSiteContent();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    metadataBase: new URL(baseUrl),
    title: site.seo.defaultTitle,
    description: site.seo.defaultDescription,
    icons: {
      icon: "/favicon.png",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [site, nav] = await Promise.all([getSiteContent(), getNav()]);

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-white">
        <SiteHeaderClient
          data={nav}
          query={NavDocument}
          variables={{ relativePath: "nav.json" }}
        />
        <main className="min-h-screen pt-12">{children}</main>
        <SiteFooterClient
          data={site}
          query={SiteDocument}
          variables={{ relativePath: "site.json" }}
        />
      </body>
    </html>
  );
}
