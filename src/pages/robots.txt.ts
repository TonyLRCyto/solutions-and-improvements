import type { APIRoute } from 'astro';
import { IS_PREVIEW, SITE_URL } from '../data/site';

// Preview builds block all crawling; production allows it and points to the sitemap.
export const GET: APIRoute = () =>
  new Response(
    IS_PREVIEW
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    { headers: { 'content-type': 'text/plain; charset=utf-8' } },
  );
