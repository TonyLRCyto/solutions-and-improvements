# Round 2 import and approved brand refinements

The owner supplied `solutions-round-2.patch` and its changed-file backup, then requested upload and preview deployment. Local and remote `direction-b-2026-11-13` both matched the expected base `8ceea19a8cc90f5a4535fa3dd082d5f4e97457ed` before import. The original patch message is preserved in commit `22873646171be4c7708ddda5d4783129c6b658fb`. All 21 backup files matched that commit byte for byte; `PlanToBuilt.astro` was removed as intended.

## Final behavior

- The supplied six-section homepage uses a real project photograph behind the opening, a three-step consultation request, mobile photo/review scrolling, compact services and a separate before/after proof section. Pages, service coverage and legacy redirects are retained.
- The owner selected Archivo for the whole website: one self-hosted Latin variable font, 400–700 weight, with 700-weight headings at 105% width. The OFL license is included; no external font request is needed.
- The footer uses the original star/check and lettering horizontally on a transparent background. One shared 3.25px SVG alpha contour creates the requested thicker connected white outline. The artwork and project photography were not regenerated.
- The larger header remains 112px initially and 80px after scrolling on desktop, with a 324px initial desktop logo. Phone/tablet headers remain 88px/68px, call/menu targets 44px, and mobile menu arrows 18px SVGs.
- On phones the hero photograph now grows with its text, preventing white controls and facts from spilling onto the cream form area. The project swipe hint is visible, and the bottom consultation control has readable padding at narrow widths.
- Native keyboard scrolling is enabled for project/review rows. Gallery button names include their visible category and caption.
- The form starts with a small synchronous working wizard, then hands off to the enhanced module without resetting the selected service, current step or entered details. If that module fails, Next/Back, native validation and ordinary form submission still work. With JavaScript disabled, all fields are visible together. No loading timeout or module-dependent hiding is used.
- Error-summary links reveal the correct step before focusing their field. Rendering/deposit wording remains consistent with the confirmed contract policy.
- `assets.run_worker_first: ["/api/*"]` ensures ordinary browser form POSTs reach the API, including when scripts are unavailable. Other requests retain static asset routing. See [Cloudflare's routing documentation](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/).

## Verification

- Astro check: 58 files, zero errors, warnings or hints; preview build and source diff checks passed.
- Browser checks across 320, 390, 768, 1024, 1120, 1121 and 1440px: no horizontal overflow or clipped controls; header expansion/compaction, compact menu/focus, slider input and Archivo loading passed.
- Ten representative routes, legacy redirects with/without trailing slashes, no-JavaScript and reduced-motion views passed.
- Eighteen accessibility audits across nine pages and both motion preferences reported zero violations.
- Both enhanced form journeys, optional blank note, server-error navigation, blocked/delayed module behavior and native browser submission were checked. Native preview submission returns the intended 503 HTML “Your request was not sent” response. The separate server validation suite passed all 19 checks, including malformed input, origin protection and rate limiting.
- Local screenshots and detailed measurements are retained outside this repository in the parent project's `design-playbook/round2-review/` folder. Lighthouse results and hosted deployment verification are recorded in `DEPLOYMENT.md` after upload.
- Final local homepage Lighthouse, one run per device: Performance 93 mobile/100 desktop, Accessibility and Best Practices 100 on both. CLS is 0.001 mobile/0 desktop, with zero blocking time. SEO 69 reflects intentional preview indexing blocks. These are lab measurements, not physical-device or production results; see `reports/lighthouse/2026-11-17-round2-archivo-final-local/summary.md`.

## Scope

Only the existing review preview is authorized. PR #1 remains open and unmerged. `SITE_MODE=preview`, `MAIL_PROVIDER=none`, no custom domain routes and manual deployment remain in place. Production, Squarespace, DNS/MX, credentials and live email delivery are unchanged. Physical iPhone/Android review and the existing launch/content confirmations remain pending.
