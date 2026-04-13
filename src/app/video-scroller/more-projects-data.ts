import type { Project } from './types';

// Poster frames extracted from the Wix video assets (wixstatic.com/media/{hash}f000.jpg).
// Replace thumbnailUrl values with your own hosted images as new projects are added.
const WIX_THUMB = (hash: string) =>
  `https://static.wixstatic.com/media/${hash}f000.jpg/v1/fill/w_800,h_450,al_c,q_85,usm_0.33_1.00_0.00_enc_avif/thumb.jpg`;

export const MORE_PROJECTS: Project[] = [
  {
    id: 'odina-mq',
    title: "Odina — 'Many Things'",
    category: 'Music Video',
    thumbnailUrl: WIX_THUMB('5f8c98_923d85e5d0ec48ec9f632b95dbf00f48'),
    href: '#',
  },
  {
    id: 'blue-jean-ff',
    title: 'Blue Jean',
    category: 'Feature Film',
    thumbnailUrl: WIX_THUMB('5f8c98_7b2a879af2fc45b686daf38f6b359788'),
    href: '#',
  },
  {
    id: 'bp-commercial',
    title: "BP — 'Igniting The Energy Within'",
    category: 'Commercial',
    thumbnailUrl: WIX_THUMB('5f8c98_f7d63bbf65544b10b5c65604c070d871'),
    href: '#',
  },
  {
    id: 'roberts-bakery',
    title: "Roberts Bakery — 'Remarkably Roberts'",
    category: 'Commercial',
    thumbnailUrl: WIX_THUMB('5f8c98_aee0284fb7df420e9206685b839a3c7f'),
    href: '#',
  },
  {
    id: 'plan-b',
    title: 'Plan B',
    category: 'Short Film',
    thumbnailUrl: WIX_THUMB('5f8c98_edd95f6be7ae4eab8c569b4bb9bc32e4'),
    href: '#',
  },
  {
    id: 'fptp',
    title: 'For the People',
    category: 'Documentary',
    thumbnailUrl: WIX_THUMB('5f8c98_33f7a72b41df46fd95ecf1daff5ba7b8'),
    href: '#',
  },
];
