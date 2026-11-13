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
