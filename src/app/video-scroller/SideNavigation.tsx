'use client';

import type { SideNavigationProps } from './types';

export default function SideNavigation({ items, activeId }: SideNavigationProps) {
  // Sections are sticky and don't move — scroll to the position in the container instead.
  const scrollToIndex = (index: number) => {
    const target = index * window.innerHeight;
    // Offset by the container's top in case it doesn't start at 0
    const container = document.querySelector('[data-video-scroller]');
    const containerTop = container
      ? container.getBoundingClientRect().top + window.scrollY
      : 0;
    window.scrollTo({ top: containerTop + target, behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed right-6 top-1/2 z-[100] -translate-y-1/2 flex flex-col gap-4"
      aria-label="Section navigation"
    >
      {items.map((item, index) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => scrollToIndex(index)}
            className="group/dot flex items-center gap-3 focus-visible:outline-none"
            aria-label={`Go to ${item.label}`}
            aria-current={isActive ? 'true' : undefined}
          >
            {/* Label — appears to the left on hover */}
            <span className="ml-auto text-[10px] font-semibold uppercase tracking-widest text-white opacity-0 transition-all duration-200 group-hover/dot:opacity-100 pointer-events-none">
              {item.label}
            </span>

            {/* Dot */}
            <span
              className={[
                'block h-2 w-2 rounded-full border border-white transition-all duration-300',
                isActive ? 'bg-white scale-125' : 'bg-transparent scale-100',
              ].join(' ')}
            />
          </button>
        );
      })}
    </nav>
  );
}
