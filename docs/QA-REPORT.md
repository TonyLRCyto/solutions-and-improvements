# QA report: first preview (2026-10-28)

Everything below was run against the actual build served locally by `astro preview` (Cloudflare `workerd` runtime), with the real photos, font, Camera Settle motion and scripts. Nothing was deployed.

## Lighthouse 13.6.0

Three runs per page and form factor; medians reported. Default Lighthouse throttling (simulated mobile, desktop preset). Full JSON for every run and the median HTML report are in `reports/lighthouse/`.

### Production configuration (indexable), built with `npm run build:production`

| Form factor | Page | Perf | A11y | Best pr. | SEO | Perf runs | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mobile | / | 97 | 100 | 100 | 100 | 95/97/97 | 2.5 s | 0 | 6 ms |
| mobile | /kitchen-remodeling | 99 | 100 | 100 | 100 | 99/99/99 | 2.1 s | 0 | 0 ms |
| mobile | /projects | 99 | 100 | 100 | 100 | 99/99/98 | 2.3 s | 0 | 0 ms |
| mobile | /illinois-construction | 100 | 100 | 100 | 100 | 100/100/100 | 0.9 s | 0 | 0 ms |
| mobile | /commercial-contractor | 100 | 100 | 100 | 100 | 100/100/100 | 1.0 s | 0 | 0 ms |
| mobile | /contact | 100 | 100 | 100 | 100 | 100/100/100 | 1.0 s | 0 | 0 ms |
| desktop | all six pages above | 100 | 100 | 100 | 100 | 100 on every run | 0.26–0.60 s | 0 | 0 ms |

### Preview configuration (noindex), built with `npm run build`

| Form factor | Page | Perf | A11y | Best pr. | SEO |
| --- | --- | --- | --- | --- | --- |
| mobile | /service-areas/munster-in (city draft) | 100 | 100 | 100 | 69 |
| mobile | / | 97 | 100 | 100 | 69 |
| desktop | /service-areas/munster-in | 100 | 100 | 100 | 69 |
| desktop | / | 100 | 100 | 100 | 69 |

The preview SEO score of 69 is entirely the intentional `noindex` ("Page is blocked from indexing"); every other SEO audit passes. City drafts are not built in production, so the city template was measured in preview mode.

### Limits

- Local server, no HTTP compression (Cloudflare compresses in production; Lighthouse flagged ~46 KB of possible savings on the home HTML for this reason). Repeat on the real Cloudflare deployment.
- Lab data only. No field data (LCP/INP/CLS from real visitors) exists yet.
- The first measurement found 780 ms of blocking time on mobile home, caused by decoding hidden service-preview images. Those images now load only after someone hovers or focuses the list; blocking time dropped to ~0–20 ms.

## Browser interaction checks (`scripts/interactions.mjs`, headless Chromium) — all pass

- No sideways scrolling and exactly one `<h1>` on 14 representative pages at 320, 390, 768, 1024, 1440 and 1920 px.
- Camera Settle starts at scale 1.026 / 8 px lower, finishes at rest with no running animation, and does not replay in the same session.
- Reduced motion and JavaScript disabled: the photo shows at rest immediately; real `<img>` elements present; gallery fully visible without JS.
- Mobile menu: opens from the keyboard, focus moves into it, Escape closes it and returns focus.
- Service preview responds to keyboard focus (not hover-only).
- Gallery: category filter, `#category` links from the home page, lightbox opens from the keyboard, arrow keys move, Escape closes, focus returns to the photo.
- Form: service context preselects the project type; empty submit shows a focused error summary and marks fields; a valid submit with no mail provider shows an honest **Not sent** message with phone and email, and keeps what was typed.
- Unknown paths return a real 404 with the custom page.

Found and fixed during testing: re-validating a field when it lost focus could shift the Submit button between mouse-down and mouse-up, so the click was lost. Validation messages now clear while typing instead.

## Endpoint checks (`scripts/test-form.mjs`) — all pass

Valid request without provider → 503 `unavailable` ("not sent"); phone-only accepted; missing fields → 422 with per-field errors; preferred-contact mismatch → 422; unknown service → 422; honeypot → rejected; too-fast submission → rejected; cross-origin → 403; oversized body → 413; non-JS form post → readable HTML page; GET → 405; rate limit → 429 after repeated requests.

## Other checks

- `astro check` (TypeScript): 0 errors, 0 warnings.
- Redirects and status codes tested locally (see `ROUTES-AND-REDIRECTS.md`), including `/Service-areas` → `/illinois-construction` while `/service-areas` still serves the hub.
- Headers: CSP, `X-Frame-Options`, `nosniff`, referrer and permissions policies on static files; `X-Robots-Tag: noindex` added only in preview builds.
- Colour contrast: white on brand red 4.70:1, blue on warm white 7.87:1, ink on warm white 15.2:1, muted text on warm white ≥ 5:1.

## Not tested (and why)

- Real iPhone/Android devices and Safari: not available here; headless Chromium only.
- Email delivery to the office inbox: no provider or credentials, and no test emails without the owner’s go-ahead.
- Turnstile: not configured.
- Behaviour on Cloudflare’s live network (compression, caching, redirect case handling): nothing has been deployed.
- Screen reader walkthrough (VoiceOver/NVDA): not run; structure, labels and live regions were checked in code and by Lighthouse/axe.
