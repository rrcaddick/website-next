import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import LogoSection from "@/components/ui/LogoSection";
import BookNowButton from "@/components/ui/BookNowButton";
import Card from "@/components/features/listing/Card";
import type { ListingPageContent } from "@/lib/content";

interface Props {
  content: ListingPageContent;
}

export default function ListingTemplate({ content }: Props) {
  const { title, description, hero, items, columns = 3, showBookNow, cta, footnote } = content;

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
            {items.map((item) => (
              <Card key={`${item.href}-${item.image}`} item={item} />
            ))}
          </div>

          {cta && (
            <div className="mt-16">
              <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">{cta.title}</h2>

                {/* Rich General Information - House Rules + Reception Hours */}
                {cta.generalInfo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12">
                    {/* Left Column - House Rules */}
                    <div className="bg-white rounded-2xl shadow-sm" style={{ padding: "2rem 0 2rem 2rem" }}>
                      <h3 className="text-xl font-semibold mb-6" style={{ textAlign: "right" }}>
                        {cta.generalInfo.leftTitle}
                      </h3>
                      <ul className="space-y-2.5 text-sm text-gray-700" style={{ textAlign: "right" }}>
                        {cta.generalInfo.leftItems.map((item, index) => (
                          <li key={index} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Column - Reception Hours */}
                    <div className="bg-white rounded-2xl shadow-sm" style={{ padding: "2rem 2rem 2rem 0" }}>
                      <h3 className="text-xl font-semibold mb-6">{cta.generalInfo.rightTitle}</h3>
                      <ul className="space-y-2.5 text-sm text-gray-700">
                        {cta.generalInfo.rightItems.map((item, index) => (
                          <li key={index} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Simple description fallback (used by Adventures, Entertainment, etc.) */}
                {cta.description && !cta.generalInfo && (
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-center leading-relaxed">{cta.description}</p>
                )}

                {/* Button - shows for both rich and simple cta */}
                {cta.href && cta.label && (
                  <div className="text-center">
                    <Link
                      href={cta.href}
                      className="inline-block bg-[#0E7D73] hover:bg-[#073F3A] text-[#C9DD94] hover:text-[#00FF7F] px-8 py-3 rounded-lg transition-colors font-medium"
                    >
                      {cta.label}
                    </Link>
                  </div>
                )}
              </div>
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
