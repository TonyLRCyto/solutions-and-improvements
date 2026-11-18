# Lighthouse, round 4 (local build, 2026-11-18)

Local `astro preview` (uncompressed), Lighthouse 13.6.0, one run each. SEO is 69 because the preview build is noindex.

| Page | Profile | Performance | Accessibility | Best practices | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home | Mobile | 89 | 100 | 100 | 3.5 s | 0 | 160 ms |
| Home | Desktop | 100 | 100 | 100 | 0.7 s | 0 | 0 ms |
| Projects | Mobile | 100 | 100 | 100 | 1.3 s | 0 | 0 ms |
| Projects | Desktop | 100 | 100 | 100 | 0.3 s | 0 | 0 ms |

Round 3 for comparison: home 87 mobile and 100 desktop locally, 100 and 100 on the hosted preview. Re-measure on the hosted preview after deploy.
