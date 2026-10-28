# Header and service-area refresh review

Reviewed October 28, 2026. This records the scope and checks for the second preview; see [deployment details](DEPLOYMENT.md) for the deployed state.

## Changes

- The header places the original star/check to the left of the original lettering. Both pieces are lossless crops of the supplied transparent PNG; neither was regenerated or redrawn. The footer retains the original stacked logo.
- The header compacts after 40 pixels of scroll and expands again at the top. Its outer sticky slot reserves the expanded height, avoiding movement of the page content when the visible header changes size. Menu and sticky-section offsets share the active header height. Transitions honor the existing reduced-motion rule.
- The community preview expands from six to 12 pages: six Indiana and six Illinois. Each has local planning context and an official municipal resource. Income and homeownership informed the shortlist, not public copy or claims about an individual customer's intent. See the [launch plan and sources](SERVICE-AREA-LAUNCH.md).
- All city pages remain review drafts with `draft: true` and `indexReady: false`. Preview builds remain noindex; city drafts remain excluded from production generation and the production sitemap until reviewed. Regional coverage remains broader than the listed cities.

## Verified directly in this review

- Raw RGBA comparison with the source logo: star/check crop `(328, 0, 608, 556)` matches every original pixel; lettering crop `(0, 639, 1241, 202)` also matches every original pixel.
- Data import: 12 cities, six per state, 12 unique paths, all draft gates retained, and an HTTPS planning-resource URL on every city.
- Source review: responsive navigation, menu offsets, sticky offsets, reduced-motion override, draft generation and sitemap filters are consistent with the intended behavior.
- `git diff --check` passed at review time.
- Static review identified an inert hidden-menu-button risk in the no-JavaScript fallback and an existing Shift+Tab escape from the open menu's header toggle. The implementation now explicitly hides the button while `hidden` and wraps Shift+Tab from the toggle to the menu's final link. The implementing agent verified the keyboard wrap in the finished build as recorded below; the no-JavaScript hiding fix was checked in source.

## Browser checks reported by the implementing agent

These were performed through the review browser, not repeated by this source audit:

- Desktop header: 112 pixels at the top, 80 after scrolling; mobile: 88 to 68 pixels.
- Page content's document position stayed at 112 pixels during desktop compaction.
- No horizontal overflow at widths 320, 390, 768, 1024, 1120, 1121 and 1440 pixels.
- Compact mobile menu top aligned with the header bottom at 68 pixels; opening moved focus into the menu, and Escape closed it and returned focus to the toggle.
- Finished-build keyboard check: Shift+Tab from the first menu link moved to the toggle; Shift+Tab from the toggle wrapped to the final email link; Escape closed the menu and returned focus to the toggle.
- Finished-build area pages `/service-areas`, `/illinois-construction`, `/service-areas/winfield-in` and `/service-areas/flossmoor-il`: zero horizontal overflow at 320 and 1440 pixels, exactly one H1 and noindex metadata.

The implementing agent reports final Astro diagnostics of zero errors, warnings or hints and a passing preview build. Deployment verification is recorded separately in the deployment details.

## Focused fresh Lighthouse benchmark

Lighthouse 13.6.0 tested the finished preview Worker locally at `http://127.0.0.1:8787`, using the default simulated mobile throttling and desktop preset. This is **one run per page and form factor**, a focused regression check rather than repeated-run or live-network evidence. Raw JSON, HTML reports and the [saved summary](../reports/lighthouse/2026-10-28-header-area-preview/summary.md) are included.

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | Mobile | 98 | 100 | 100 | 69 | 2,353 ms | 0 | 0 ms |
| Winfield | Mobile | 100 | 100 | 100 | 69 | 656 ms | 0 | 0 ms |
| Home | Desktop | 100 | 100 | 100 | 69 | 551 ms | 0 | 0 ms |
| Winfield | Desktop | 100 | 100 | 100 | 69 | 178 ms | 0 | 0 ms |

All four SEO results have one failing audit: `is-crawlable`, caused by the preview's intentional indexing blocks. Keep those blocks during review. This is not an achieved production SEO score; production indexing and the affected city-page readiness gates need separate launch review. Earlier production-mode Lighthouse results remain historical evidence.
