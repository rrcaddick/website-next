import { getPageContent, getSiteContent } from "@/lib/content";
import CTASection from "@/components/ui/CTASection";
import LogoSection from "@/components/ui/LogoSection";
import VideoScroller from "./VideoScroller";
import MoreProjects from "./MoreProjects";
import { VIDEO_ITEMS } from "./data";
import { MORE_PROJECTS } from "./more-projects-data";

export const metadata = {
  title: "Fairy Folk 'n Roll",
  description: "Full-screen video showcase of live music sessions at Fairy Knowe Backpackers.",
};

export default async function VideoScrollerPage() {
  const [content, site] = await Promise.all([getPageContent("fairy-folk-n-roll"), getSiteContent()]);

  const { cta } = content;

  return (
    <div>
      <VideoScroller items={VIDEO_ITEMS} />

      <MoreProjects projects={MORE_PROJECTS} />

      {/* Post-scroller content — scrolls in normally below the video sections */}
      <div className="bg-white px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {cta && <CTASection heading={cta.heading} description={cta.description} button={cta.button} />}
          <div className="mt-16 mb-8">
            <LogoSection site={site} />
          </div>
        </div>
      </div>
    </div>
  );
}
