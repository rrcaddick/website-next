import PageHero from "@/components/ui/PageHero";
import LogoSection from "@/components/ui/LogoSection";
import BookNowButton from "@/components/ui/BookNowButton";
import CTASection from "@/components/ui/CTASection";
import InfoSections from "@/components/ui/InfoSections";
import Card from "@/components/features/listing/Card";
import type { ListingPageContent } from "@/lib/content";

interface Props {
  content: ListingPageContent;
}

export default function ListingTemplate({ content }: Props) {
  const { title, description, hero, items, columns = 3, showBookNow, infoSections, cta, footnote } = content;

  const itemCount = items.length;

  // Dynamic column classes (still respects the `columns` prop from content)
  const colClass =
    columns === 4 ? "lg:grid-cols-4 xl:grid-cols-4" : columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  // Smart grid that perfectly centers 1 or 2 cards
  const gridClasses = `grid grid-cols-1 md:grid-cols-2 ${colClass} gap-8 justify-center place-items-center`;

  return (
    <div className="min-h-screen">
      <PageHero mobileSrc={hero.mobileSrc} desktopSrc={hero.desktopSrc} title={title} />

      {(description || showBookNow) && (
        <div className="mb-8">
          <div className="max-w-7xl mx-auto px-4">
            {description && (
              <p className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
                {description}
              </p>
            )}
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
          <div className={gridClasses}>
            {items.map((item, index) => (
              <Card key={`${item.href}-${item.image}`} item={item} priority={index === 0} />
            ))}
          </div>

          {infoSections && infoSections.length > 0 && (
            <div className="max-w-7xl mx-auto px-4 mt-8 sm:mt-12 mb-8 sm:mb-12">
              <InfoSections sections={infoSections} />
            </div>
          )}

          {cta && (
            <div className="mt-16">
              <CTASection heading={cta.heading} description={cta.description} button={cta.button} />
            </div>
          )}

          <div className="mt-16 mb-8">
            <LogoSection />
          </div>

          {footnote && (
            <div className="mt-12 mb-12 text-center px-8 md:px-16 lg:px-24">
              <p className="text-xs md:text-base text-gray-600 dark:text-gray-300 max-w-4xl mx-auto italic">
                {footnote.split("\n").map((line, i, arr) => (
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
  );
}
