# Round 3 import

The owner requested the supplied `solutions-round-3.patch` using the established GitHub/manual-preview workflow. Local and remote `direction-b-2026-11-13` matched base `946439ffbf9fad6066c61a38df655c011e1384ba` before import. The patch message is preserved in commit `bb7797a8b39f51a556a9ba7dadccf8da73a459dc`; all nine backup files matched that commit byte for byte.

## Result

- Shorter homepage opening, with a framed desktop photo beside the form. On phones the opening contains the photograph and copy, followed by the before/after, rating, trust facts and reviews.
- One visible homepage form at each width: opening above 992px, bottom contact section at 992px and below. Independent IDs keep both copies valid and their controls scoped correctly.
- The phone bottom bar supplies Call, Text and Free consultation; the redundant header call icon is hidden at 760px and below. Tablet call access remains available. Larger opening header heights, scroll compaction, Archivo, horizontal outlined footer and SVG interface symbols are retained.
- Six grouped service links replace the homepage's extra-service chips, including commercial/multifamily work.
- Contact begins with its heading and form, and its `#consultation` target now exists in the opening section.
- A focused correction restores dark outlined Back buttons and blue keyboard-focus outlines on the white form inside the dark mobile contact section. This avoids inheriting white-on-white controls from the surrounding theme.

## Verification

- Astro check: 58 files, zero errors, warnings or hints. Preview build and source diff checks passed.
- Browser layout checks at 320, 390, 760, 761, 768, 992, 993, 1024, 1120, 1121 and 1440px; exactly one visible homepage form, unique IDs, header/bar/menu behavior, hero bounds and six service destinations passed.
- Contact checked at six widths; the form starts in the first screen and contextual consultation links reach the correct section. Three visible-form journeys, slider input, no-JavaScript and reduced-motion views passed.
- Local screenshots and detailed measurements are retained in the parent project's `design-playbook/round3-review/` folder. Hosted deployment and Lighthouse results are recorded in `DEPLOYMENT.md` after upload.

## Scope

The existing preview remains noindex with `MAIL_PROVIDER=none` and targeted `/api/*` Worker routing for native form submission. Manual deployment remains in use; PR #1 stays open and unmerged. Production/Squarespace, custom domains, DNS/MX, secrets and live email delivery are unchanged. Physical-phone review and existing launch/content confirmations remain pending.
