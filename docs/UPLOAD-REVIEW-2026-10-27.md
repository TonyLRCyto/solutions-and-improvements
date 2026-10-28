# Upload review / October 27, 2026

Reviewed Claude’s delivered source before uploading to a dedicated Solutions repository. The original ZIP was preserved; its bundled `.git` metadata was excluded from the clean working copy. Existing Calumet and Sparkclean repositories were not used.

## Changes made

- The consultation endpoint now handles malformed/non-object JSON and invalid Origin headers without an unhandled server error.
- Turnstile also fails closed when its public site key is configured at build time but the server secret is missing.
- Production-build and Lighthouse commands now work across Windows and POSIX without relying on Windows `.cmd` shell quoting. Lighthouse supports an explicit CLI path and remains pinned to 13.6.0 for comparable audits.
- Added the missing pinned `@types/node` **24.19.2** dependency for clean type checking.
- Corrected copy that combined the confirmed 1990 founding year with an unverified claim that Munster had continuously been the company’s base since that year.

## Verified checks

- Astro/TypeScript check: **0 errors, 0 warnings**. Production configuration builds successfully.
- Local consultation endpoint: **19 checks passed**, including validation/failure behavior. No customer email was sent.
- A second local run with a deliberately configured public Turnstile key and no secret passed **20 checks**, including the explicit fail-closed regression. The test key was removed and a normal noindex preview was rebuilt before upload.
- Fresh Lighthouse 13.6.0 audits against the local production-mode build: **three runs per page and form factor**. Mobile Home median Performance **98** (97/98/98); mobile Contact and desktop Home/Contact Performance **100**. Accessibility, Best Practices and SEO were **100** for all four combinations. See [saved summary](../reports/lighthouse/codex-local-2026-10-27/summary.md) and the accompanying raw reports.
- The delivered **48** earlier raw Lighthouse reports were present and their reported score medians were independently validated. They remain prior local-build evidence, separate from the fresh checks above.
- All **seven** supplied project-photo files exactly match the approved handoff exports by SHA256. All **36** legacy sitemap paths are accounted for by retained routes or planned redirects.

The fresh report’s UTC timestamp is October 28; it corresponds to **October 27 in America/Mazatlan**. These are local lab results, not Cloudflare-network or real-user measurements. Real-device/Safari/screen-reader checks and live-network redirect, caching and compression behavior have not been newly verified here.

## Repository and deployment status

A new **private** repository was created: [TonyLRCyto/solutions-and-improvements](https://github.com/TonyLRCyto/solutions-and-improvements). At this review’s completion, source push and Cloudflare preview setup remain pending. No live-domain cutover occurred; Squarespace remains unchanged. Mail is still configured as `none`, so valid consultation submissions honestly report that they were **not sent** until delivery is configured and tested.
