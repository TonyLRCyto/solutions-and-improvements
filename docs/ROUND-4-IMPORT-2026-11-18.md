# Round 4 import

The owner requested the supplied round-four update through the existing GitHub/manual-preview workflow. Local and remote `direction-b-2026-11-13` matched base `571205cb1c50882c3c2a8a9d28108897994eb58e`. The patch is preserved as commit `56e3ffac3ff2745864ce0c7e6341a308b9ac618d`; all 21 backup files matched that commit byte for byte.

## Result

- The shorter footer uses one supplied horizontal logo image with its white contour baked in. The browser SVG filter is removed. The PNG retains alpha transparency and edge padding; original branding remains intact. Services and Company sit side by side on phones, and contact information is more compact.
- On desktop the home photo again covers the entire opening behind the headline and form. The location tag is removed; phone placement, Archivo and the larger initial header remain intact.
- The homepage image's `sizes` now matches its full-width background, replacing the former panel-width hint so medium desktop screens do not select an undersized image.
- Projects starts with the East Chicago home and the restored SVG drawing-to-photo reveal. The garage story retains its review with a still photo; the before/after control remains on Home.
- Service Areas has two regional cards with community links and nonrepeating additional coverage. City buttons retain preview/indexReady gating. A focused follow-up splits combined coverage entries before filtering so a ready Mokena page cannot inadvertently remove unready Frankfort from coverage.
- Permit-service promises are removed from region/city notes and service steps. Existing municipal planning links remain, as supplied.

## Verification

- Astro check: 59 files, zero errors, warnings or hints. Preview build and source diff checks passed.
- Coverage scenarios checked: one ready Illinois city, all preview cities, no ready production cities and Indiana coverage. The fix preserves current preview output and full coverage when no city pages are ready.
- Local browser checks passed at eleven homepage and six contact widths, plus 21 affected-page layouts. The footer image and phone columns, full-width hero, larger header, compact menu, forms, two region cards and all twelve community destinations passed. Ten main-page accessibility audits reported zero violations.
- Projects reveal completed on phone and desktop; no-JavaScript, blocked-script and reduced-motion views immediately showed the photo. Gallery filtering/lightbox and the home comparison passed. Footer PNG transparency, encoded-image edges and visible white contour were inspected.
- Detailed local and hosted screenshots/measurements are retained outside this repository in the parent project's `design-playbook/round4-review/` folder. Final runtime and Lighthouse results are recorded in `DEPLOYMENT.md` after deployment.
- Hosted affected-page, footer, form, city-link and animation checks passed on phone and desktop. Final image selection at 1024px used the actual 1024×768 source and covered the full hero. Deployed code `cfc3a953287004481f88e7a0584084906474d3e9`, Cloudflare version `5aa51899-a897-4305-841f-7f15a619118c`.
- Hosted Lighthouse, one run per device/page: Home Performance 95 mobile/100 desktop; Projects 100 on both. Accessibility and Best Practices 100, CLS 0 and blocking time 0ms on all four profiles. SEO 69 is expected for the noindex preview. Detailed results and measurement limits are in `reports/lighthouse/2026-11-18-round4-hosted/summary.md` and the deployment record.

## Scope

Only the existing review preview is deployed. PR #1 stays open and unmerged. Manual updates, preview noindex, `MAIL_PROVIDER=none`, targeted `/api/*` routing and no custom domain routes remain in force. Production/Squarespace, DNS/MX, secrets and live form delivery are unchanged. Physical-device review and existing launch/content confirmations remain pending.
