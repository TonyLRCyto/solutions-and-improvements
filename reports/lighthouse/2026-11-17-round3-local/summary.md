# Lighthouse: round 3 home page (local, 2026-11-17)

One run per profile against `astro preview` on the local build (no HTTP compression), Lighthouse 13.6.0, headless Chromium. Lab data only.

| Page | Profile | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|---|
| `/` | Mobile | 87 | 100 | 100 | 69 | 4.1 s | 0 |
| `/` | Desktop | 100 | 100 | 100 | 69 | 0.7 s | 0 |

The mobile LCP is the opening photo, and almost all of it is render delay in this uncompressed local setup. Round 2 measured 86-93 locally and 99 on the hosted preview, so re-measure after the preview deploy. SEO 69 is the intentional preview `noindex`.
