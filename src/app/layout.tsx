import { Inter } from "next/font/google";
import "@/app/globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { getSiteContent } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export function generateMetadata() {
  const site = getSiteContent();
  return {
    title: site.seo.defaultTitle,
    description: site.seo.defaultDescription,
    icons: {
      icon: "/favicon.png",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const site = getSiteContent();

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-white">
        <SiteHeader />
        <main className="min-h-screen pt-12">{children}</main>
        <SiteFooter site={site} />
      </body>
    </html>
  );
}
