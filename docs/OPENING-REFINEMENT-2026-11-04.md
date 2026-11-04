# Approved opening and services cleanup

The owner approved the reviewed composition on November 4, 2026 and requested implementation. This is a bounded update to the existing separate preview, with further art direction to be reviewed one step at a time.

## Result

- One homepage H1: **Construction and remodeling since 1990.** One regional supporting paragraph follows.
- Two clearly shaped navigation buttons: solid-red consultation and light-outline project gallery. Both remain 56px tall at the checked widths, with phone stacking and full-width tap areas.
- Removed the extra introductory tagline, audience list, founding/location snippet and duplicate service strip. The following section uses **Our services** as its H2 and presents the four featured services once.
- The upright approved roofing image has one factual caption and a simple edge. The subtle Camera Settle, reduced-motion/no-JavaScript behavior and selective blueprint background remain.
- Homepage service navigation is direct and no longer depends on hover-preview behavior. The Services page retains its existing photo preview; gallery photographs, commercial/multifamily links, all-services navigation and small-job acceptance remain.
- Interface arrows use inline SVG; checklist marks use an SVG mask. The contact process heading's text arrows were replaced with SVGs. Original supplied logo artwork and real project photographs are unchanged.
- The hero's image sizing matches its new columns and stacking breakpoint. A 360px image candidate was added to avoid requesting a larger-than-needed source on smaller screens.

## Validation

- Astro diagnostics across 51 files: zero errors, warnings or hints. Preview build passed; `git diff --check` passed.
- Existing browser interaction checks passed: layout and one H1 across representative routes at 320, 390, 768, 1024, 1440 and 1920px; keyboard menu; service preview; gallery filter/lightbox; form validation and honest unconfigured-delivery response; unknown-route 404; Camera Settle/reduced motion/no-JavaScript behavior.
- Focused opening checks at 320, 390, 768, 1024 and 1440px passed: no horizontal overflow, equal comfortable button heights, direct keyboard navigation to Contact and Projects, four SVG service arrows, factual caption, SVG checkmarks and no emoji-style interface glyphs.
- At the same 390px phone review width, the photo begins about 511px from the top, compared with about 693px in the prior preview review, and is now 262.5px tall instead of about 218px. These are viewport observations, not universal device measurements.
- Desktop and phone screenshots and measurements are retained in the parent project's `deployment-proof/2026-11-04-opening/` folder.

## Focused local Lighthouse check

Lighthouse 13.6.0 tested the finished preview Worker at `http://127.0.0.1:8787`, one run per page/device with default simulated mobile throttling and the desktop preset. These are local regression results, not live-network or production scores. See the [saved summary and raw reports](../reports/lighthouse/2026-11-04-opening-preview/summary.md).

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | Mobile | 99 | 100 | 100 | 69 | 2,210ms | 0 | 0ms |
| Contact | Mobile | 100 | 100 | 100 | 69 | 692ms | 0 | 0ms |
| Home | Desktop | 100 | 100 | 100 | 69 | 471ms | 0 | 0ms |
| Contact | Desktop | 100 | 100 | 100 | 69 | 197ms | 0 | 0ms |

The SEO difference comes from the preview's intentional indexing block; keep that protection during review. Production migration, live domain/email settings, Acorn's missing application link and consultation email delivery remain separate launch items. The form was not connected or represented as successfully sending inquiries during this change.

Deployment provenance and hosted verification are recorded in [deployment details](DEPLOYMENT.md).
