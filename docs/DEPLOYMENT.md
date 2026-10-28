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
