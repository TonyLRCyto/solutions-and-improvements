# Solutions preview deployment

Verified October 27, 2026 (America/Mazatlan).

- **Dedicated private source repository:** [TonyLRCyto/solutions-and-improvements](https://github.com/TonyLRCyto/solutions-and-improvements).
- **Preview:** [solutions-and-improvements-preview.gabe-tony-lr.workers.dev](https://solutions-and-improvements-preview.gabe-tony-lr.workers.dev).
- Worker: `solutions-and-improvements-preview`.
- Initial deployed source commit: `c1e3d6ecb417b4c3ede93f7361840bb286c72112`.
- Initial Cloudflare version: `3fa16258-aea7-4c95-a53d-6054210c80ce`.
- Build/deploy used the generated `dist/server/wrangler.json`, with `SITE_MODE=preview`, `MAIL_PROVIDER=none`, no custom domain routes and the real approved assets.

The first upload used Wrangler after pushing the reviewed source to GitHub. **The owner chose manual preview updates on October 27, 2026; automatic GitHub-to-Cloudflare builds are not connected.** Cloudflare's default new build token includes account-wide storage and Worker-route editing permissions. The connection form was canceled without submitting Connect or creating that token. Existing Calumet/Sparkclean build tokens were not reused. Keep source changes in this dedicated repository and deploy manually with Wrangler after review. Existing Calumet and Sparkclean repositories and deployments were not modified.

## Verified on the deployed HTTPS preview

- Home, Contact, Services, both regional hubs: 200; one H1; intended live-domain canonicals.
- HTML robots metadata and response `X-Robots-Tag`: `noindex, nofollow`. `robots.txt` disallows crawling; sitemap is empty.
- CSP, `nosniff` and frame `DENY` present.
- `/Service-areas` permanently redirects to Illinois; lowercase `/service-areas` stays the hub.
- `/estimate` → `/contact`; `/sai-mechanical` → the actual mechanical-services group.
- Unknown routes return 404. Safe GET to the consultation API returns 405 with `Allow: POST`.
- The live homepage and project image rendered correctly in the review browser.

No live email was sent. The consultation form explicitly reports **not sent** while delivery is unconfigured. Acorn's application link, remaining project facts and production launch items remain in [Pending items](PENDING-ITEMS.md).

Fresh **local production-mode** Lighthouse results are in [the saved summary](../reports/lighthouse/codex-local-2026-10-27/summary.md): Home mobile median Performance 98, all other tested scores 100; Contact and both desktop tests all 100. These are not claimed as live-network Lighthouse results. The preview intentionally blocks indexing, so its SEO audit differs.

The actual Squarespace website, production domain and DNS/email records remain unchanged. Production cutover still requires review and approval through the launch checklist.

## October 28 refinement preview

- Deployed source commit: `80b190dbdeb20ccebbcbba37022d7429028ae35c`.
- Cloudflare version: `c3bdda28-cf7b-4d71-aaa7-27868a162afe` at the same preview URL.
- Horizontal header uses the original star/check and lettering, with an expanded-to-compact scroll state. The hosted desktop header measured 112 to 80 pixels while the main content's document position stayed at 112 pixels.
- Twelve city-page drafts (six per state) now include local planning guidance and municipal resources. All 12, the directory, both regional hubs and Home passed live HTTPS checks: 200, exactly one H1, new header markup and preview noindex metadata/headers.
- Fresh local preview Lighthouse: Home mobile Performance 98; Winfield mobile and both desktop tests 100. Accessibility and Best Practices 100 throughout; SEO 69 solely from the intentional preview indexing blocks. These were single-run regression checks; see [the full refresh review](REFRESH-REVIEW-2026-10-28.md).
- City pages remain excluded from indexed production until local review. Manual updates, disabled email delivery and the separate production-launch boundary remain unchanged.

## November 4 approved opening cleanup

- Deployed source commit: `54110df3493b36b7d3b3c8a65d0312ddaa8730e7`.
- Cloudflare version: `aa10b020-39af-40e8-8b28-2a839c579547`, at the same Solutions preview URL.
- The owner approved the clear opening statement, two-button hierarchy and concise following services group, then explicitly requested the build. The implementation and validation are recorded in [the opening review](OPENING-REFINEMENT-2026-11-04.md).
- Hosted browser checks passed at 320, 390, 768, 1024 and 1440px: no overflow, one H1, direct services H2, equal 56px hero buttons, four SVG service icons, SVG checklist masks and working keyboard navigation to Contact and Projects. The 390px photo starts around 511px from the top instead of the earlier 693px observation.
- Hosted HTTPS checks passed for Home, Contact, Services, Projects, Winfield and Illinois: 200, one H1, correct live-domain canonical and retained noindex metadata/response header.
- Fresh local preview Lighthouse, one run per device/page: Home Performance 99 mobile/100 desktop; Contact 100 on both. Accessibility and Best Practices 100 throughout; preview SEO 69 from the intentional indexing block. These are local regression measurements, not live-network or production scores.
- Manual GitHub/Cloudflare updates remain in place. This updated only the existing preview Worker; production migration, live form delivery and broader art direction remain separate steps.

## November 13 Direction B preview

- The owner explicitly approved deployment to the existing preview after reviewing [pull request #1](https://github.com/TonyLRCyto/solutions-and-improvements/pull/1).
- Deployed source: `4c4347ac08b895418d6db622996acd8f8829644d`, from `direction-b-2026-11-13`. The PR remains open and unmerged; manual preview deployment does not require merging it.
- Cloudflare version: `114d31fe-c78a-4387-a373-9badb17576d2` at [the same Solutions preview](https://solutions-and-improvements-preview.gabe-tony-lr.workers.dev/).
- Hosted header/slider checks passed at 320, 390, 768, 1120, 1121, 1280 and 1440px. Desktop starts at 112px with a 324px logo and compacts to 80px; phone/tablet header starts at 88px and compacts to 68px. Call/menu controls remain 44px and the slider responds to pointer and keyboard input.
- Hosted motion completion, no-JavaScript fallback, menu focus, SVG rating graphics and legacy redirects passed. Nine representative phone pages passed layout checks. Home, Services, Projects, all five service hubs and Contact returned 200 with one H1 and retained noindex metadata/response headers.
- A fresh local Lighthouse homepage check, one run per profile, scored Performance 89 mobile/97 desktop, Accessibility 100, Best Practices 100 and preview SEO 69. Mobile LCP was 3,779ms; desktop LCP 1,208ms. These are local measurements, not live-network or physical-device results. Mobile performance needs further optimization; see [the audit summary](../reports/lighthouse/2026-11-13-direction-b-preview/summary.md).
- Existing production/Squarespace, DNS/MX, secrets and consultation delivery settings were not changed. `SITE_MODE=preview`, `MAIL_PROVIDER=none`, no custom routes and manual updates remain in place.

## November 13 footer and mobile-menu refinement

- Deployed source: `ba12704672325377526a5d308b259e5e24235c0d`, Cloudflare version `eaf1abee-6ebc-42b0-b6be-bf2295287068`, at the same Solutions preview URL.
- The requested footer correction keeps the original stacked artwork, removes the cream badge, increases the logo to roughly 224×152px and draws a white contour from its alpha channel. No source artwork was regenerated or recolored.
- Mobile navigation now uses 18px SVG arrows, 20px labels and 52px rows. This fixes the oversized default SVG viewports while retaining comfortable links and keyboard operation.
- Hosted footer checks passed at 320, 390, 1024 and 1440px; hosted menu checks passed at 320, 390 and 768px, including no overflow/clipping, readable icon/text bounds, focus inside the open menu and Escape/focus return. Typecheck/build/diff checks also passed. See [the focused review](FOOTER-MENU-REFINEMENT-2026-11-13.md).
- The website fonts remain Bricolage Grotesque and Figtree. Archivo, Exo 2/Source Sans 3 and Barlow comparisons, plus an alternative header-style footer arrangement, are discussion-only. No global font or footer-arrangement selection has been made.
- PR #1 remains open/unmerged; production, DNS/MX, secrets and live email delivery remain unchanged. The earlier Direction B Lighthouse results are a baseline before these footer/menu changes, not a newly rerun benchmark.

## November 17 round 2 and approved typography

- The owner supplied the round-two patch and explicitly requested upload and preview deployment, selecting Archivo and the horizontal footer arrangement with a thicker connected white contour.
- Deployed source: `b755ea800a584fb75596885ccbd6da81938e7636` on `direction-b-2026-11-13`; Cloudflare version `7ee80a74-7175-491e-b01e-7d001d813e97`, at [the same Solutions preview](https://solutions-and-improvements-preview.gabe-tony-lr.workers.dev/).
- The original patch is retained as commit `2287364`, with the chosen font/footer and verified fixes in following commits. The final six-section homepage, photo opening and three-step form supersede the earlier Direction B plan-to-built scene and Bricolage/Figtree comparison status. See [the import and verification record](ROUND-2-IMPORT-2026-11-17.md).
- Hosted checks passed across seven viewport widths and ten representative routes: larger initial header and scroll compaction, compact SVG menu, Archivo loading, transparent outlined horizontal footer, before/after input, keyboard scrolling, reduced-motion/no-JavaScript views and both form journeys. An additional hosted test confirmed native HTML form submission returns the intended not-sent response with modules blocked; delayed enhancement preserves the visitor's entries and step.
- All 62 exact legacy redirect rules (31 original paths and their trailing-slash variants) returned their correct 301 status and destination on the hosted preview. The two slash variants found during verification were corrected and rechecked.
- Final local homepage Lighthouse, one run per device: Performance 93 mobile/100 desktop; Accessibility and Best Practices 100 on both; SEO 69 from intentional noindex. CLS 0.001 mobile/0 desktop and blocking time 0ms. Full results are in [the local summary](../reports/lighthouse/2026-11-17-round2-archivo-final-local/summary.md).
- Final hosted homepage Lighthouse, one run per device: Performance 99 mobile/100 desktop; Accessibility and Best Practices 100 on both; preview SEO 69. Mobile LCP 2,165ms, CLS 0.002; desktop LCP 489ms, CLS 0.004; blocking time 0ms on both. These remain lab audits rather than physical-device measurements. See [the hosted summary](../reports/lighthouse/2026-11-17-round2-archivo-hosted/summary.md).
- Typecheck reported zero errors, warnings or hints; build, source checks, the 19-case server-validation suite and 18 page/motion accessibility audits passed. The final inline wizard removes the initial desktop layout jump while retaining usable controls if its enhanced module cannot load.
- PR #1 remains open and unmerged. Only the existing preview Worker was deployed: `SITE_MODE=preview`, `MAIL_PROVIDER=none`, no custom domain routes, no new secrets and manual updates. Production/Squarespace, domain/DNS/MX settings and live email delivery remain unchanged. Physical-phone review and existing launch/content confirmations remain pending.

## November 17 round 3

- The owner supplied `solutions-round-3.patch` and requested the update using the established review-preview workflow. Both local and remote branch heads matched its expected base `946439f`. All nine backup files matched the preserved patch commit `bb7797a` byte for byte.
- Deployed code: `ff02d0705dc6de636b80e7a44983d46f4f004c71`, Cloudflare version `eb56dc1d-7fe1-46ca-8443-5c6e41dfd50e`, at [the Solutions preview](https://solutions-and-improvements-preview.gabe-tony-lr.workers.dev/).
- Round three simplifies the opening, frames the desktop photograph beside the form, puts proof directly afterward, moves the phone/tablet homepage form into the bottom contact section, uses one phone action group and replaces extra-service chips with six grouped rows. Contact now begins with its form and a valid consultation anchor. Larger header heights, Archivo, original outlined footer artwork and SVG symbols remain intact. See [the import record](ROUND-3-IMPORT-2026-11-17.md).
- A focused follow-up keeps the Back button and keyboard focus visible on the white form inside the dark mobile contact section. The form component and API behavior were otherwise retained.
- Local layout checks passed at eleven widths, with exactly one visible homepage form and no duplicate IDs. Six contact widths, both responsive forms under blocked/delayed modules, native submission, no-JavaScript/reduced-motion views and sixteen accessibility audits passed. Typecheck reported zero errors, warnings or hints; build and source diff checks passed.
- Hosted checks passed at 390 and 1440px on Home and Contact, including one visible form, consultation destinations, menu/header behavior, footer/Archivo, before/after input, form steps, readable Back/focus, indexing protection and the two checked trailing-slash legacy redirects. One blocked-module native submission returned the intended 503 not-sent HTML. No email was delivered.
- Hosted homepage Lighthouse, one run per device: Performance, Accessibility and Best Practices 100 on both mobile and desktop. Mobile LCP 1,711ms; desktop LCP 443ms; CLS 0 and blocking time 0ms on both. Preview SEO 69 reflects deliberate noindex protection. These are lab results, not physical-device measurements or production guarantees; see [the hosted summary](../reports/lighthouse/2026-11-17-round3-hosted/summary.md).
- PR #1 remains open and unmerged; manual deployment, `SITE_MODE=preview`, `MAIL_PROVIDER=none`, `/api/*` Worker-first routing and no custom domain routes remain in place. Production/Squarespace, DNS/MX, secrets and live form delivery are unchanged. Physical-device review and existing launch/content confirmations remain pending.

## Round 4 (package dated November 18)

- The owner requested the supplied round-four update. Local and remote branch heads matched expected base `571205c`; all 21 backup files matched preserved patch commit `56e3ffa` byte for byte.
- Final deployed code: `cfc3a953287004481f88e7a0584084906474d3e9`, Cloudflare version `5aa51899-a897-4305-841f-7f15a619118c`, at [the Solutions preview](https://solutions-and-improvements-preview.gabe-tony-lr.workers.dev/).
- The shorter footer uses the supplied transparent horizontal PNG with a baked white outline, without the former browser SVG filter. Desktop opening photography covers the whole section; phone layout and the larger header remain. Projects begins with the restored East Chicago drawing-to-photo scene; the garage uses a still image and its review. Service Areas uses two regional cards with linked city buttons, gated to preview or ready city pages. Permit-service promises were removed, while municipal planning links remain.
- Two focused follow-ups preserve neighboring-town coverage when city pages launch separately, and make the home image's responsive size hint match the full-width background. See [the import record](ROUND-4-IMPORT-2026-11-18.md).
- Astro check: 59 files, zero errors, warnings or hints; build and source diff checks passed. Local checks covered eleven homepage widths, six contact widths and 21 affected-page layouts. Ten main-page accessibility audits passed. New logo edges, compact footer columns, forms, all twelve city destinations, reveal completion, no-JavaScript/blocked-script/reduced-motion fallback and gallery controls were checked.
- Hosted Home/Contact/Projects/Service Areas/city checks passed at phone and desktop widths, with no overflow or browser errors. Both region cards and twelve city links, footer image without a filter, animation completion and fallback, forms, before/after, gallery and checked trailing-slash redirects passed. One native preview form submission returned the intended not-sent response without delivering email.
- Final 1024px image check selected an actual 1024×768 asset with `sizes="100vw"` and aligned background/hero bounds. Home, Projects, Service Areas and Contact returned 200 with retained noindex protection.
- Hosted Lighthouse, one run per page/device: Home Performance 95 mobile/100 desktop; Projects 100 on both. Accessibility and Best Practices 100 on all four profiles, CLS 0 and blocking time 0ms. Mobile LCP: Home 3,012ms, Projects 979ms; desktop: 418ms and 280ms. Preview SEO 69 reflects intentional noindex. These are lab measurements rather than physical-device results or production guarantees; see [the full hosted summary](../reports/lighthouse/2026-11-18-round4-hosted/summary.md).
- PR #1 remains open and unmerged. Manual preview deployment, `SITE_MODE=preview`, `MAIL_PROVIDER=none`, targeted `/api/*` routing and no custom domains remain in force. Production/Squarespace, DNS/MX, secrets and live email delivery were not changed. Physical-device review and existing launch/content confirmations remain pending.
