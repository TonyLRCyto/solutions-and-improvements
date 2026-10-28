# Routes and redirects (first preview)

All 36 sitemap paths from the October 26, 2026 inventory are accounted for below (`legacy-url-plan.csv` is the full source list). Useful existing addresses are kept exactly, including misspellings, so links and search history keep working.

## Pages kept on their existing address

| Path | Page |
| --- | --- |
| `/` | Home |
| `/contact` | Free consultation form, phone/email, administrative address |
| `/about-us` | About (since 1990, Gabriel – Owner, Andy – Project Manager) |
| `/blog` | Resources |
| `/blog/3-key-renovations-to-boost-your-market-price` | Article route kept. Interim rewrite, **draft + noindex** until the original is recovered and reviewed |
| `/bathroom-remodeler-contractor` | Bathrooms (featured) |
| `/kitchen-remodeling` | Kitchens (featured) |
| `/newconstruction` | New Construction (featured, illustration until verified photos) |
| `/commercial-contractor` | Commercial & Multifamily |
| `/northwest-indiana-construcion-company` | Indiana regional page |
| `/illinois-construction` | Illinois regional page (previously empty; now has content) |
| `/basement-remodeling` | Basement remodeling (now has its own title) |
| `/flooring-installation`, `/drywall-contrator`, `/painting-company`, `/new-page-35` (Carpentry) | Interiors |
| `/roofing-replacement-contractor`, `/siding-replacement`, `/window-installation-door-installtion`, `/gutters`, `/deck-contractor`, `/masonry-brick-tuckpoint`, `/landscaping-contractor-lake-county-indiana`, `/looking-for-something-else-1` (Exterior remodeling) | Exteriors |
| `/framing-carpentry`, `/foundation`, `/concrete`, `/demolition-debris-removal` | Structure & site |
| `/hvac-services`, `/plumbing`, `/electric` | Mechanical services (grouped at `/services#mechanical-services`) |
| `/rehab-remodel`, `/how-to-fix-building-code-violations`, `/looking-for-something-else` (Small jobs & something else) | Property projects |

## New pages

| Path | Page |
| --- | --- |
| `/services` | Services overview (featured four, Commercial & Multifamily, grouped wider work) |
| `/home-additions` | Additions (new general page; framing photo used as process imagery only) |
| `/projects` | Approved-photo gallery with filters and lightbox |
| `/service-areas` | Coverage overview |
| `/service-areas/munster-in`, `/st-john-in`, `/dyer-in`, `/crown-point-in`, `/mokena-il`, `/frankfort-il` | City drafts: preview only, `noindex`, not built in production until `indexReady: true` |
| `/privacy` | Draft privacy note for the form |
| `/api/consultation` | Form endpoint (POST only, `noindex`) |
| `/robots.txt`, `/sitemap.xml` | Mode-aware |
| 404 | Custom page with real 404 status |

## Redirects implemented in this build (`public/_redirects`)

All are single-hop 301s to a real page. Tested locally with `astro preview` (Cloudflare `workerd`) on 2026-10-28.

| From | To | Basis |
| --- | --- | --- |
| `/home` | `/` | Old alias already canonicalised to `/` |
| `/estimate` | `/contact` | Owner retired the ADU/Jotform campaign in favour of the free consultation |
| `/sai-mechanical` | `/services#mechanical-services` | SAI Mechanical brand excluded; real HVAC/plumbing/electrical group exists there |
| `/new-folder-5` | `/newconstruction` | Observed browser destination (old HTTP code not audited) |
| `/new-folder-84` | `/bathroom-remodeler-contractor` | Observed browser destination |
| `/fdfb38cf-6959-4384-87d8-932ec80058f3` | `/roofing-replacement-contractor` | Observed browser destination |
| `/Service-areas` (capital S) | `/illinois-construction` | Observed legacy behaviour. Tested: lowercase `/service-areas` still serves the new hub (redirect matching is case-sensitive) |
| `/More` | `/about-us` | Observed browser destination |

Trailing-slash variants (e.g. `/kitchen-remodeling/`) are redirected by Cloudflare to the slash-less page (307 in local testing).

## Not redirected yet (launch decisions)

| Path | Current behaviour | Decision needed |
| --- | --- | --- |
| `/about` | 404 | Old “Personal Construction Program” link was already broken. Decide whether anything should replace it; don’t send it to `/about-us` by assumption. |
| `/cart` | 404 | Squarespace cart route. Check backlinks/usage, then retire or redirect. |

## Before launch

- Re-check every old URL’s live HTTP status and chain (the inventory recorded browser destinations only).
- Review Search Console landing pages and backlinks for any address not listed here.
- Re-test redirects on the real Cloudflare deployment, including case handling of `/Service-areas`.
