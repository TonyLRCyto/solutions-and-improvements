# Footer branding and mobile menu refinement

The owner requested a transparent footer logo treatment with a white contour and larger artwork, plus smaller mobile-navigation arrows and more compact menu text/spacing. Font alternatives and a header-style footer arrangement are being compared separately; neither is applied by this change.

## Changes

- Removed the cream footer badge background and padding. The supplied stacked logo remains unchanged and renders up to 224px wide by 152px high, compared with the previous 76px image height.
- Added a lightweight SVG filter that dilates the logo's existing alpha channel by 1.15px, colors that contour white, then composites the original artwork over it. This follows the actual star/checkmark and lettering, not a rectangular image border. No logo was regenerated, traced or recolored.
- Set mobile-menu SVG arrows to a fixed 18px square, preventing the default oversized SVG viewport from stretching the links.
- Set menu text to 20px and rows to 52px with balanced spacing. Call/email links retain comfortable targets and wrapping. Header expansion/compaction and the supplied logo artwork remain unchanged.
- The website's Bricolage Grotesque/Figtree fonts are unchanged. Archivo, Exo 2 with Source Sans 3, and the Barlow family are review-only comparisons outside the application.

## Validation

- Astro diagnostics: zero errors, warnings or hints across 58 files. Preview build and diff checks passed.
- Footer checked at 320, 390, 1024 and 1440px: transparent background, loaded original artwork, correct white filter, no clipped footer links/images or page overflow, and correct homepage link/accessibility name.
- Menu checked at 320, 390 and 768px: 18px arrows, 20px text, 52px rows, no clipped links or horizontal overflow, focus moves into the open menu, Escape closes it and returns focus.
- Local screenshots/measurements are retained in the parent project's `design-playbook/font-footer-review/` folder. Font comparison scenes separately passed loading, native carousel and bounds checks at 736, 390 and 320px; these are not deployed font changes.

Deployment provenance is recorded in [deployment details](DEPLOYMENT.md). Production, DNS/MX, secrets and consultation delivery are outside this change.
