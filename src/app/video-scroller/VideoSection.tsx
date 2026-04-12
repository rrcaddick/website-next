'use client';

import { useRef, useEffect } from 'react';
import type { VideoSectionProps } from './types';

export default function VideoSection({ item, index, isActive }: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play only the active (topmost visible) section's video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    // Sticky stacking: each section pins to top-0 and is covered by the next (higher z-index)
    <div
      id={item.id}
      className="group sticky top-0 h-screen w-full overflow-hidden"
      style={{ zIndex: index + 1 }}
      aria-label={item.title}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={item.videoUrl}
        poster={item.posterUrl}
        muted
        loop
        playsInline
        preload={index === 0 ? 'auto' : 'metadata'}
        aria-hidden="true"
      />

      {/* Static dark gradient at bottom — always visible */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/50" />

      {/* Content — slides up on hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
        {item.subtitle && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
            {item.subtitle}
          </p>
        )}
        <h2 className="mb-6 max-w-2xl text-2xl font-bold uppercase tracking-widest text-white sm:text-3xl md:text-4xl">
          {item.title}
        </h2>
        <a
          href={item.href}
          className="inline-block border border-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-white hover:text-black"
        >
          View Project
        </a>
      </div>

      {/* Section index — subtle label revealed on hover */}
      <div className="absolute bottom-6 left-8 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
