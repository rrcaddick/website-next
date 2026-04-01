import { Inter } from 'next/font/google'
import './globals.css'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Fairy Knowe Backpackers',
  description: 'Adventure Backpackers in the heart of the Garden Route',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-white">
        <SiteHeader />
        <main className="min-h-screen pt-12">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
