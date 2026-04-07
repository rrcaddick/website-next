import ImageGallery from '@/components/gallery/ImageGallery'
import PageHero from '@/components/ui/PageHero'
import BookNowButton from '@/components/ui/BookNowButton'
import LogoSection from '@/components/ui/LogoSection'
import CTASection from '@/components/ui/CTASection'
import type { DetailPageContent, DetailSection } from '@/lib/content'

interface Props {
  content: DetailPageContent
}

type Align = 'left' | 'center' | 'right'

function resolveAlign(index: number, total: number, override?: Align): Align {
  if (override) return override
  if (total === 1) return 'center'
  if (total === 2) return index === 0 ? 'left' : 'right'
  if (index === 0) return 'left'
  if (index === total - 1) return 'right'
  return 'center'
}

const alignClass: Record<Align, string> = {
  left: 'text-center md:text-left',
  center: 'text-center',
  right: 'text-center md:text-right',
}

const headingAlignClass: Record<Align, string> = {
  left: 'text-center md:text-left',
  center: 'text-center',
  right: 'text-center md:text-right',
}

function SectionCard({ section, index, total }: { section: DetailSection; index: number; total: number }) {
  const align = resolveAlign(index, total, section.align)
  const textClass = alignClass[align]
  const headClass = headingAlignClass[align]

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
      <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${headClass}`}>
        {section.heading}
      </h3>
      <div className={`space-y-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm ${textClass}`}>
        {Array.isArray(section.content) ? (
          <ul className="space-y-2">
            {section.content.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>{section.content}</p>
        )}
      </div>
    </div>
  )
}

function sectionsGridClass(count: number): string {
  if (count === 1) return ''
  if (count === 2) return 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'
  return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8'
}

export default function DetailPageTemplate({ content }: Props) {
  const {
    title,
    description,
    hero,
    gallery,
    imagesPerPage = 8,
    showBookNow,
    sections,
    cta,
  } = content

  const hasSections = sections && sections.length > 0

  return (
    <div className="min-h-screen">
      <PageHero mobileSrc={hero.mobileSrc} desktopSrc={hero.desktopSrc} title={title} />

      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">
            {description}
          </p>
          {showBookNow && (
            <div className="mt-6">
              <BookNowButton />
            </div>
          )}
        </div>

        <div className="w-full px-0 sm:px-4 mt-8 md:mt-12 mb-8 md:mb-12">
          <ImageGallery images={gallery} imagesPerPage={imagesPerPage} />
        </div>

        {hasSections && (
          <div className="max-w-7xl mx-auto px-4">
            <div className="mt-8 sm:mt-12 mb-8 sm:mb-12">
              <div className="max-w-6xl mx-auto">
                {sections!.length === 1 ? (
                  <div className="max-w-2xl mx-auto">
                    <SectionCard section={sections![0]} index={0} total={1} />
                  </div>
                ) : (
                  <div className={sectionsGridClass(sections!.length)}>
                    {sections!.map((section, i) => (
                      <SectionCard key={section.heading} section={section} index={i} total={sections!.length} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4">
          {cta && (
            <div className="mt-8 mb-8">
              <CTASection heading={cta.heading} description={cta.description} button={cta.button} />
            </div>
          )}

          <div className="mt-16 mb-8">
            <LogoSection />
          </div>
        </div>
      </div>
    </div>
  )
}
