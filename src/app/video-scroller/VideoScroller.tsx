'use client';

import { useState, useEffect, useRef } from 'react';
import VideoSection from './VideoSection';
import SideNavigation from './SideNavigation';
import type { VideoScrollerProps } from './types';

export default function VideoScroller({ items }: VideoScrollerProps) {
  const [playingIndices, setPlayingIndices] = useState<ReadonlySet<number>>(
    () => new Set([0]),
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrolledIntoContainer = -container.getBoundingClientRect().top;
      const sectionHeight = window.innerHeight;

      const primary = Math.max(
        0,
        Math.min(Math.floor(scrolledIntoContainer / sectionHeight), items.length - 1),
      );

      // If we've scrolled any amount past the primary boundary, the next section is
      // sliding up from below and should also play (transition state).
      const fraction = scrolledIntoContainer % sectionHeight;
      const next = fraction > 0 && primary + 1 < items.length ? primary + 1 : -1;

      setActiveIndex(primary);
      setPlayingIndices(new Set(next >= 0 ? [primary, next] : [primary]));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items.length]);

  const navItems = items.map(({ id, label }) => ({ id, label }));

  return (
    <div
      ref={containerRef}
      data-video-scroller
      className="relative bg-black"
      style={{ height: `${items.length * 100}vh` }}
    >
      <SideNavigation items={navItems} activeId={items[activeIndex]?.id ?? ''} />

      {items.map((item, index) => (
        <VideoSection
          key={item.id}
          item={item}
          index={index}
          isActive={playingIndices.has(index)}
        />
      ))}
    </div>
  );
}
