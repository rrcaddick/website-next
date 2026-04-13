export interface VideoItem {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  href: string;
  videoUrl: string;
  posterUrl?: string;
}

export interface VideoScrollerProps {
  items: VideoItem[];
}

export interface VideoSectionProps {
  item: VideoItem;
  index: number;
  isActive: boolean;
}

export interface SideNavigationProps {
  items: Pick<VideoItem, 'id' | 'label'>[];
  activeId: string;
}

// ── More Projects ────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  href: string;
}

export interface ProjectCardProps {
  project: Project;
}

export interface MoreProjectsProps {
  projects: Project[];
  heading?: string;
}
