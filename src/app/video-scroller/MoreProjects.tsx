import ProjectCard from './ProjectCard';
import type { MoreProjectsProps } from './types';

export default function MoreProjects({
  projects,
  heading = 'More Projects.',
}: MoreProjectsProps) {
  return (
    <section className="bg-black px-6 py-20 sm:px-10 lg:px-16" aria-label={heading}>
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="mb-10 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
          {heading}
        </h2>

        {/* Responsive grid: 1 → 2 → 3 columns */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
