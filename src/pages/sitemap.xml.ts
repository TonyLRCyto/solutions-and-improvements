import type { APIRoute } from 'astro';
import { IS_PREVIEW, SITE_URL } from '../data/site';
import { pageServices, serviceGroups } from '../data/services';
import { regions, cities } from '../data/areas';
import { posts } from '../data/posts';

/** Production sitemap: ready, canonical, indexable pages only. Preview builds publish an empty sitemap. */
export const GET: APIRoute = () => {
  const paths = IS_PREVIEW
    ? []
    : [
        '/',
        '/services',
        ...pageServices.map((s) => s.path),
        ...serviceGroups.map((g) => g.path),
        '/projects',
        '/service-areas',
        ...regions.map((r) => r.path),
        ...cities.filter((c) => c.indexReady).map((c) => c.path),
        '/about-us',
        '/contact',
        '/blog',
        ...posts.filter((p) => p.status === 'published').map((p) => `/blog/${p.slug}`),
        '/privacy',
      ];
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    paths.map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc></url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
};
