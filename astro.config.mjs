// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { readFile, writeFile } from 'node:fs/promises';

// Production builds use `npm run build:production` (CLOUDFLARE_ENV=production selects env.production in wrangler.jsonc,
// whose vars set SITE_MODE=production for the site code). Everything else is a noindex preview build.
const isProduction = process.env.CLOUDFLARE_ENV === 'production' || process.env.SITE_MODE === 'production';

/** Preview builds also send X-Robots-Tag: noindex on every static file. */
/** @type {import('astro').AstroIntegration} */
const previewNoindex = {
  name: 'si-preview-noindex',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      if (isProduction) return;
      const file = new URL('_headers', dir);
      const headers = await readFile(file, 'utf8');
      // Add to the existing "/*" block (Cloudflare applies one matching block per rule path).
      await writeFile(file, headers.replace(/^\/\*\n/m, '/*\n  X-Robots-Tag: noindex, nofollow\n'));
    },
  },
};

// Canonical origin. Production stays on the existing hostname convention.
const site = process.env.PUBLIC_SITE_URL || 'https://www.solutionsandimprovements.com';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site,
  // Content pages are pre-rendered; only /api/consultation runs on demand.
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  adapter: cloudflare({
    // Images are optimised once at build time with sharp; the Worker serves files as-is.
    imageService: 'compile',
    prerenderEnvironment: 'node',
  }),
  image: {
    responsiveStyles: false,
  },
  integrations: [previewNoindex],
  vite: {
    // Build-time settings read by src/data/site.ts. Only non-secret values belong here.
    define: {
      'import.meta.env.PUBLIC_SITE_URL': JSON.stringify(process.env.PUBLIC_SITE_URL || ''),
      'import.meta.env.PUBLIC_ACORN_URL': JSON.stringify(process.env.PUBLIC_ACORN_URL || ''),
      'import.meta.env.PUBLIC_TURNSTILE_SITE_KEY': JSON.stringify(process.env.PUBLIC_TURNSTILE_SITE_KEY || ''),
    },
  },
  devToolbar: { enabled: false },
  // No sessions are used, so no KV namespace is needed.
  session: false,
});
