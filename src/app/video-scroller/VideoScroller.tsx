'use client';

import { useState, useEffect, useRef } from 'react';
import VideoSection from './VideoSection';
import SideNavigation from './SideNavigation';
import type { VideoScrollerProps } from './types';

export default function VideoScroller({ items }: VideoScrollerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      // How far the viewport has scrolled into the container
      const scrolledIntoContainer = -container.getBoundingClientRect().top;
      const sectionHeight = window.innerHeight;

      const index = Math.max(
        0,
        Math.min(
          Math.floor(scrolledIntoContainer / sectionHeight),
          items.length - 1,
        ),
      );

      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items.length]);

  const navItems = items.map(({ id, label }) => ({ id, label }));

  return (
    // Total height = N × 100vh — this is the scrollable distance.
    // Each sticky section occupies one "slot" of that scroll budget.
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
          isActive={activeIndex === index}
        />
      ))}
    </div>
  );
}
