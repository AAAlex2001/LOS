import type { MetadataRoute } from 'next';

// For now, include static top-level pages. Later can generate from backend.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://109.196.103.12').replace(/\/$/, '');
  const pages = [
    '',
    '/cities',
    '/parties',
    '/mountain-routes',
    '/excursions',
    '/hot-springs',
    '/important',
    '/mobile-communication',
    '/taxi',
    '/banks',
    '/government-structure',
    '/transport-communications',
    '/history-and-culture',
    '/abkhazian-cuizine',
    '/abkhazian-customs',
    '/elementary-dictionary',
  ];
  const now = new Date();
  return pages.map((p) => ({ url: `${base}${p}`, lastModified: now }));
}


