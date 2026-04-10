import ImageGallery from "@/components/gallery/ImageGallery";
import PageHero from "@/components/ui/PageHero";
import BookNowButton from "@/components/ui/BookNowButton";
import LogoSection from "@/components/ui/LogoSection";
import CTASection from "@/components/ui/CTASection";
import InfoSections from "@/components/ui/InfoSections";
import { tinaField } from "tinacms/dist/react";
import type { DetailPageContent } from "@/lib/content";

interface Props {
  content: DetailPageContent;
}

const tf = tinaField as (obj: unknown, field: string) => string;

export default function DetailPageTemplate({ content }: Props) {
  const { title, description, hero, gallery, imagesPerPage = 8, showBookNow, infoSections, cta } = content;

  return (
    <div className="min-h-screen">
      <PageHero mobileSrc={hero.mobileSrc} desktopSrc={hero.desktopSrc} title={title} />

      <div className="pt-2 pb-8 sm:pt-4 sm:pb-12 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <p data-tina-field={tf(content, "description")} className="text-xs md:text-base text-gray-600 max-w-3xl mx-auto text-center">{description}</p>
          {showBookNow && (
            <div className="mt-6">
              <BookNowButton />
            </div>
          )}
        </div>

        <div className="w-full px-0 sm:px-4 mt-8 md:mt-12 mb-8 md:mb-12">
          <ImageGallery images={gallery ?? []} imagesPerPage={imagesPerPage} />
        </div>

        {infoSections && infoSections.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 mt-8 sm:mt-12 mb-8 sm:mb-12">
            <InfoSections sections={infoSections} />
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
  );
}
