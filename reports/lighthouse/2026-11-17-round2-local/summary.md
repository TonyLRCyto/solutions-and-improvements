# Lighthouse: round 2 home page (local, 2026-11-17)

One run per profile against `astro preview` (Cloudflare workerd) on the local build, Lighthouse 13.6.0, headless Chromium. Lab data only; repeat on the hosted preview.

| Page | Profile | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| `/` | Mobile | 90 | 100 | 100 | 69 | 3.6 s | 0.001 | 0 ms |
| `/` | Desktop | 100 | 100 | 100 | 69 | 0.7 s | 0 | 0 ms |

SEO 69 is expected: preview builds are `noindex` on purpose. The 2026-11-13 direction B home scored 89 mobile / 97 desktop for performance.
