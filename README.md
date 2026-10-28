# Solutions and Improvements website (first preview)

A rebuild of [solutionsandimprovements.com](https://www.solutionsandimprovements.com) for review. **This is a preview build.** It does not replace the live Squarespace site, and nothing here changes DNS, email records or the live domain.

- **Stack:** Astro 7.4.2 + TypeScript, pre-rendered pages, one on-demand API route (`/api/consultation`), deployed as a Cloudflare Worker with static assets via `@astrojs/cloudflare` 14.4.2. Versions are pinned in `package.json` / `package-lock.json`.
- **Workflow:** Claude/source review → the dedicated private [Solutions repository](https://github.com/TonyLRCyto/solutions-and-improvements) → Cloudflare preview/hosting. The new repository is separate from Calumet and Sparkclean. Automatic Cloudflare Git integration and deployment status are tracked below; the live Squarespace site stays unchanged.
- **Node:** 22.23.4 or newer (24 LTS used for this build, see `.node-version`).

## Commands

| Command | What it does |
| --- | --- |
| `npm ci` | Install exact dependency versions. |
| `npm run dev` | Local dev server at http://localhost:4321 (runs in Cloudflare's `workerd` runtime). |
| `npm run build` | **Preview** build into `dist/`: every page `noindex`, `robots.txt` disallows all, empty sitemap, `X-Robots-Tag: noindex` header, draft city pages included for review. |
| `npm run build:production` | **Production** build (`CLOUDFLARE_ENV=production`): indexable, real sitemap of ready pages only, draft city pages not built. |
| `npm run preview` | Build (preview mode) and serve the real Worker locally with `workerd`. |
| `npx astro preview` | Serve whatever is in `dist/` (use after `build:production` to test production mode locally). |
| `npm run check` | Astro/TypeScript type check. |
| `npm run lighthouse -- <label>` | Lighthouse (mobile + desktop, 3 runs each) against `BASE_URL` (default `http://localhost:4321`); saves reports to `reports/lighthouse/<label>/`. Needs `CHROME_PATH` if Chrome isn't on the default path. |
| `npm run test:form` | Exercises the consultation endpoint states against a running server (`BASE_URL`). Sends nothing. |

On Windows, run Lighthouse through `npm run lighthouse -- <label>` so the runner invokes npm's JavaScript CLI directly, without a `.cmd` shell wrapper. For an existing Lighthouse installation, set `LIGHTHOUSE_CLI_PATH` to its CLI JavaScript file (for example, `node_modules/lighthouse/cli/index.js`); that override takes precedence. Use Lighthouse 13.6.0 for comparable reports. `CHROME_PATH`, `BASE_URL`, `PAGES` and `RUNS` work with either invocation.

## Where things live

| Path | Contents |
| --- | --- |
| `src/data/site.ts` | Company facts (name, phone, email, admin address, team, approach), navigation, CTA, financing link, pending flags. **Edit business details here only.** |
| `src/data/services.ts` | Every service page: path (legacy paths preserved), titles, descriptions, intro, examples, photos, process steps, related links, service groups. |
| `src/data/areas.ts` | Indiana/Illinois regional pages and twelve city drafts (six per state) with `draft` / `indexReady` flags. Selection and launch review are in `docs/SERVICE-AREA-LAUNCH.md`. |
| `src/data/photos.ts` | Approved photos with factual captions and alt text. |
| `src/data/posts.ts` | Resources/blog posts (the legacy article is a draft). |
| `src/data/form-options.ts`, `src/lib/consultation.ts` | Form choices, limits, validation, email formatting. |
| `src/lib/mail.ts`, `src/lib/turnstile.ts` | Email provider adapter and Turnstile verification (server only). |
| `src/pages/` | Routes. `[service].astro` renders all service pages; `service-areas/[city].astro` the city template; `api/consultation.ts` the form endpoint. |
| `src/components/`, `src/layouts/` | Shared header, footer, hero pieces, form, gallery, graphics. |
| `src/styles/global.css` | Design tokens (colours, type scale, spacing) and all styles. |
| `src/scripts/` | Small progressive enhancements: menu, Camera Settle, service preview, gallery, form. |
| `src/assets/` | Original approved photos and logo (resized/converted at build). |
| `public/` | Font (Manrope, subset WOFF2), icons, OG image, `_headers`, `_redirects`. |
| `docs/` | Routes/redirects, pending items, launch checklist, QA report, content guide, asset map. |
| `reports/lighthouse/` | Saved Lighthouse reports and summaries. |

See `docs/CONTENT-GUIDE.md` for common edits (copy, photos, cities, posts).

## Preview vs production

`SITE_MODE` comes from `wrangler.jsonc` `vars`. The top-level config is the preview Worker (`solutions-and-improvements-preview`, `SITE_MODE=preview`); `env.production` is the production Worker (`solutions-and-improvements`, `SITE_MODE=production`). `npm run build:production` sets `CLOUDFLARE_ENV=production`, which selects it at build time.

| | Preview | Production |
| --- | --- | --- |
| robots meta / header | `noindex, nofollow` on every page | `index, follow` (drafts stay `noindex`) |
| `robots.txt` | `Disallow: /` | allows crawling, points to sitemap |
| `sitemap.xml` | empty | ready canonical pages only |
| City drafts (`indexReady: false`) | built for review, with a yellow "Preview draft" note | not built, not linked |
| Draft article | listed, noindex, draft note | route still served (legacy address) but noindex; not listed or in sitemap |
| Form | “not connected” message unless mail is configured | same honest behaviour until configured |

Canonical URLs always use `PUBLIC_SITE_URL` (default `https://www.solutionsandimprovements.com`), so preview copies never claim to be canonical.

## Consultation form

- One shared form (home + `/contact`), with service pages linking to `/contact?service=…&topic=…` to preselect the project type. Only the service slug is in the URL, never personal data.
- Works without JavaScript (native POST, plain HTML result page). With JavaScript: inline validation, error summary, duplicate-click prevention, idempotency key, and accessible status messages.
- Server (`src/pages/api/consultation.ts`): same-origin check, 16 KB body limit, accepts only expected fields, validates everything again, strips control characters, escapes the email HTML, never takes the destination from the request, honeypot + minimum fill time, rate limiting (Workers rate-limit binding `CONSULT_RATE_LIMITER`, 6 requests/minute per IP, with an in-memory fallback), optional Turnstile verified server-side.
- **Honest delivery:** `accepted` only when the provider accepts the message. Without configuration the endpoint returns `unavailable` and the page says the request was **not sent** and shows the phone number and email. No personal data is logged.

### Turning on email delivery (owner action, not done)

The adapter currently supports [Resend](https://resend.com/docs/api-reference/emails/send-email) because it is a simple HTTPS API that works from Workers. Another provider can be added as one more `case` in `src/lib/mail.ts`.

1. Choose the provider and create the account (owner decision; may have a cost). Verify a sending domain, e.g. `website@solutionsandimprovements.com`. **Keep existing MX/TXT records intact**; only add the provider's DNS records.
2. Set `MAIL_PROVIDER` to `resend` in `wrangler.jsonc` (`vars`, and `env.production.vars`).
3. Add secrets: `npx wrangler secret put MAIL_API_KEY` and `npx wrangler secret put MAIL_FROM_VERIFIED` (add `--env production` for production). `CONSULTATION_TO` is already `office@solutionsandimprovements.com`.
4. Optional Turnstile: create a widget in the Cloudflare dashboard, set `PUBLIC_TURNSTILE_SITE_KEY` as a build variable and `TURNSTILE_SECRET_KEY` as a secret. If only the site key is set, the form refuses submissions rather than skipping the check.
5. With the owner's go-ahead, send a real test and confirm it arrives in the office inbox (provider "accepted" is not proof of delivery). Decide and document retention.

For local testing copy `.dev.vars.example` to `.dev.vars`. `DEV_MOCK_DELIVERY=1` makes `npm run dev` return a clearly labelled mock result; it never applies to built sites.

## Cloudflare + GitHub

The dedicated private repository is **TonyLRCyto/solutions-and-improvements**. Local Git and Cloudflare sign-in are configured, and the first preview is deployed. **The owner chose manual preview updates on October 27, 2026.** Automatic repository-to-Cloudflare builds remain unconnected; Cloudflare's default setup requests a new persistent token with account-wide storage and route permissions, and that setup was canceled without creating the token. Update the preview manually with Wrangler after pushing reviewed source. Production cutover is not authorized.

**Initial preview is now deployed:** [open the Solutions preview](https://solutions-and-improvements-preview.gabe-tony-lr.workers.dev). See [deployment and verification details](docs/DEPLOYMENT.md). It remains noindex, has no live custom domain attached and does not send consultation email yet.

1. Keep source changes in this Solutions-only repository. Do not initialize another project in the Calumet or Sparkclean repositories. Use the existing `origin` and review changed files before committing; local credentials/build outputs are ignored.
2. To finish automatic builds after approving the required build credential: open the existing **solutions-and-improvements-preview → Settings → Builds → Connect**, select **TonyLRCyto/solutions-and-improvements**, branch **main**, root **/**. Do not create a duplicate Worker. Cloudflare's Git integration ([docs](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/)) can then build on pushes; verify a successful run before claiming this is connected.
3. Build settings for the **preview** Worker: build command `npm run check && npm run build`, deploy command `npx wrangler deploy --config dist/server/wrangler.json`. That generated configuration already selects the preview Worker. Keep the custom domain unattached and all pages noindex. Branch/production terminology in the dashboard must not be confused with attaching the company's live domain.
4. For **production** later: build command `npm run build:production`, deploy command `npx wrangler deploy --config dist/server/wrangler.json`. The production build selects and flattens `env.production` into that generated config. Verify the generated name/vars/assets before upload; do not add a second `--env production` to the flattened output. Attach the custom domain only after the launch checklist and owner release approval.
5. Add `PUBLIC_SITE_URL` (and later `PUBLIC_ACORN_URL`, `PUBLIC_TURNSTILE_SITE_KEY`) as build variables; add secrets with `wrangler secret put`.

Do not use GitHub Pages; it can't run the form endpoint.

## Decisions made for this preview

- **Workers + static assets, not Pages.** Astro 6+ and adapter v13+ dropped Cloudflare Pages support; Workers is the current target.
- **Build-time image optimisation** (`imageService: 'compile'`): AVIF/WebP/JPEG at several widths, generated once with sharp. No Cloudflare Images binding needed.
- **Sessions disabled** (`session: false`) so no KV namespace is created.
- **No motion library.** Camera Settle uses one WAAPI animation; other pages use a small CSS rise on headings.
- **Font:** Manrope variable, subset to Latin (24 KB WOFF2), self-hosted and preloaded, with a metric-matched fallback. License in `LICENSES/Manrope-OFL.txt`.
- **Blueprint treatment** only on the home hero and the home "How projects begin" panel. It is hidden behind text on phones.
- **New Construction / Commercial** use original line illustrations, clearly captioned as illustrations, until verified project photos exist.
