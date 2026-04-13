import Image from 'next/image';
import type { ProjectCardProps } from './types';

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, category, thumbnailUrl, href } = project;

  return (
    <a
      href={href}
      className="group relative block aspect-video overflow-hidden bg-neutral-900"
      aria-label={`View project: ${title}`}
    >
      {/* Thumbnail */}
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Persistent dark gradient so text is always readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Hover tint */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/30" />

      {/* Labels */}
      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
          {category}
        </p>
        <h3 className="text-sm font-bold uppercase tracking-wider text-white sm:text-base">
          {title}
        </h3>
      </div>

      {/* "View" indicator on hover */}
      <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
          View →
        </span>
      </div>
    </a>
  );
}
