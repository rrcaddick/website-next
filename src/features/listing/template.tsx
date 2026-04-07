import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/ui/PageHero'
import LogoSection from '@/components/ui/LogoSection'
import BookNowButton from '@/components/ui/BookNowButton'
import type { ListingPageContent } from './types'

interface Props {
  content: ListingPageContent
}

export default function ListingTemplate({ content }: Props) {
  const { title, description, hero, items, showBookNow, cta, footnote } = content

  return (
    <div className="min-h-screen">
      <PageHero mobileSrc={hero.mobileSrc} desktopSrc={hero.desktopSrc} title={title} />

      {description && (
        <div className="mb-8">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
              {description}
            </p>
            {showBookNow && (
              <div className="mt-6">
                <BookNowButton />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <Link href={item.href} key={item.title} className="group">
                <div className="bg-[#E5E7EB] text-[#202635] rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out transform md:hover:scale-105 md:hover:bg-gradient-to-tl md:hover:from-[#35946E] md:hover:to-[#094B44] h-auto md:h-[360px] flex flex-col">
                  <div className="relative aspect-video md:h-56 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-fill md:object-cover transition-transform duration-500 ease-in-out md:group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                    <h2 className="text-3xl md:text-2xl font-bold mb-1 md:mb-2 text-[#202635] md:group-hover:text-[#00FF7F] transition-colors duration-500 ease-in-out text-center md:text-left">
                      {item.title}
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 md:group-hover:text-white transition-colors duration-500 ease-in-out text-center md:text-left">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {cta && (
            <div className="mt-12 text-center">
              <h2 className="text-3xl font-bold mb-4">{cta.title}</h2>
              {cta.description && (
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{cta.description}</p>
              )}
              {cta.href && cta.label && (
                <Link
                  href={cta.href}
                  className="inline-block bg-[#0E7D73] hover:bg-[#073F3A] text-[#C9DD94] hover:text-[#00FF7F] px-8 py-3 rounded-lg transition-colors"
                >
                  {cta.label}
                </Link>
              )}
            </div>
          )}

          <div className="mt-16 mb-8">
            <LogoSection />
          </div>

          {footnote && (
            <div className="mt-12 mb-12 text-center px-8 md:px-16 lg:px-24">
              <p className="text-xs md:text-gray-600 dark:text-gray-300 max-w-4xl mx-auto italic">
                {footnote.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
