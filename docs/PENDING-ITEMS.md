# Unresolved facts and launch items

Short list of what this preview still needs. Nothing below blocks reviewing the design.

## Facts needed from Andy / Gabriel

| Item | How the preview handles it now |
| --- | --- |
| Acorn Finance Solutions-specific link | Text only: “Ask us about financing through Acorn Finance.” Set `PUBLIC_ACORN_URL` to turn the mention into a link. |
| Verified New Construction photos and facts (incl. East Chicago / early addition jobs) | Original line illustration, captioned “Illustration”. |
| Commercial / multifamily project evidence | Capability copy and illustration only. No clients, logos or counts. |
| City page review: Munster, St. John, Dyer, Crown Point, Schererville, Winfield; Mokena, Frankfort, Orland Park, Tinley Park, Homewood, Flossmoor | Twelve preview-only drafts with local planning resources, `noindex`, `indexReady: false`. Review local guidance and add meaningful first-hand detail before indexed launch; see `SERVICE-AREA-LAUNCH.md`. |
| Original blog article content | Interim rewrite on the old address, draft + `noindex`, no value/ROI claims. |
| Fuller postal address (city/ZIP) and any business hours | Only “917 Ridge Road, Unit 3561 — Administrative office only” is shown. Address omitted from structured data. |
| Licensing / credential wording per trade and state | No license numbers, insurance or credential claims anywhere. Electrical/plumbing/HVAC copy says work is coordinated as part of projects. |
| FAQ answers | No FAQ sections published. |
| Team portraits or extra bio details | Names and roles only. |
| Estimate / rendering deposit specifics | Copy says terms are project-specific; no prices, amounts or refund terms. |
| `/about` and `/cart` legacy paths | Return 404; see `ROUTES-AND-REDIRECTS.md`. |

## Setup the owner needs to authorise

| Item | Notes |
| --- | --- |
| GitHub repository | Created and uploaded: private `TonyLRCyto/solutions-and-improvements`. |
| Cloudflare preview / automatic builds | Separate preview deployed. Owner chose manual updates; automatic builds remain disconnected. Keep the live domain unattached until launch approval. |
| Email provider, verified sender, secrets | Not configured; form honestly reports “not sent”. Choose provider, verify domain (keep MX/TXT), add secrets, then do an owner-approved inbox test. |
| Turnstile | Optional; not configured. |
| Analytics | Hook exists (`window.siTrack`) but nothing is loaded. Choose provider and privacy approach first. |
| Privacy note | Draft. Confirm provider names, retention and analytics before launch. |

## Measured limits of this preview

- Lighthouse was run locally against `astro preview` (Cloudflare `workerd`) without HTTP compression; Cloudflare compresses in production. Repeat on the real deployment.
- No field (CrUX) data exists yet for LCP/INP/CLS.
- Real-device testing (iOS Safari, Android Chrome) has not been done; layouts were checked in headless Chromium at 390, 768, 1440 and 1920 px.
- Inbox delivery is untested by design (no credentials, no test emails without owner direction).
