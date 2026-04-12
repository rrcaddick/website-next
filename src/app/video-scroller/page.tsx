import VideoScroller from './VideoScroller';
import { VIDEO_ITEMS } from './data';

export const metadata = {
  title: 'Video Scroller',
  description: 'Full-screen video portfolio scroller',
};

export default function VideoScrollerPage() {
  // Negate the root layout's pt-12 so sections start flush with the top of the viewport,
  // sitting below the fixed site header (z-50).
  return (
    <div className="-mt-12">
      <VideoScroller items={VIDEO_ITEMS} />
    </div>
  );
}
