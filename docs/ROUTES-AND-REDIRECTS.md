# Routes and redirects (updated 2026-11-13, direction B)

All 36 sitemap paths from the October 26, 2026 inventory are accounted for below (`legacy-url-plan.csv` is the full source list). Useful existing addresses are kept exactly, including misspellings, so links and search history keep working.

## Pages kept on their existing address

| Path | Page |
| --- | --- |
| `/` | Home |
| `/contact` | Free consultation form, phone/email, administrative address |
| `/about-us` | About (family-owned since 1990, Gabriel Lopez – Owner, Andy Lopez – Project Manager) |
| `/blog` | Resources |
| `/blog/3-key-renovations-to-boost-your-market-price` | Article route kept. Interim rewrite, **draft + noindex** until the original is recovered and reviewed |
| `/bathroom-remodeler-contractor` | Bathrooms (featured) |
| `/kitchen-remodeling` | Kitchens (featured) |
| `/newconstruction` | New Construction (featured, East Chicago new home photo) |
| `/commercial-contractor` | Commercial & Multifamily |
| `/northwest-indiana-construcion-company` | Indiana regional page |
| `/illinois-construction` | Illinois regional page (previously empty; now has content) |

Since 2026-11-13 the smaller trades no longer have one page each. They are sections on five group pages, and every old one-service address 301s to its section (see the redirect table below).

## New pages

| Path | Page |
| --- | --- |
| `/services` | Services overview (featured four, Commercial & Multifamily, links to the five group pages) |
| `/interior-remodeling` | Group page: basements, flooring, drywall, painting, carpentry |
| `/exterior-remodeling` | Group page: roofing, siding, windows and doors, gutters, decks, masonry, landscaping, exterior remodeling |
| `/structural-and-site-work` | Group page: framing, foundations, concrete, demolition |
| `/mechanical-services` | Group page: HVAC, plumbing, electrical |
| `/repairs-and-restoration` | Group page: storm and fire damage repair (garage before/after), rehabs, code corrections, small jobs |
| `/home-additions` | Additions (new general page; framing photo used as process imagery only) |
| `/projects` | Three project stories (Munster garage before/after, second-floor addition, East Chicago new home), then the photo gallery |
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
| `/sai-mechanical` | `/mechanical-services` | SAI Mechanical brand excluded; HVAC/plumbing/electrical group page |
| `/new-folder-5` | `/newconstruction` | Observed browser destination (old HTTP code not audited) |
| `/new-folder-84` | `/bathroom-remodeler-contractor` | Observed browser destination |
| `/fdfb38cf-6959-4384-87d8-932ec80058f3` | `/exterior-remodeling#roofing` | Observed browser destination (roofing now lives on the exteriors page) |
| `/Service-areas` (capital S) | `/illinois-construction` | Observed legacy behaviour. Tested: lowercase `/service-areas` still serves the new hub (redirect matching is case-sensitive) |
| `/More` | `/about-us` | Observed browser destination |
| `/basement-remodeling` | `/interior-remodeling#basement-remodeling` | Trade moved to its group page (2026-11-13) |
| `/flooring-installation` | `/interior-remodeling#flooring-installation` | Trade moved to its group page (2026-11-13) |
| `/drywall-contrator` | `/interior-remodeling#drywall` | Trade moved to its group page (2026-11-13) |
| `/painting-company` | `/interior-remodeling#painting` | Trade moved to its group page (2026-11-13) |
| `/new-page-35` | `/interior-remodeling#carpentry` | Trade moved to its group page (2026-11-13) |
| `/roofing-replacement-contractor` | `/exterior-remodeling#roofing` | Trade moved to its group page (2026-11-13) |
| `/siding-replacement` | `/exterior-remodeling#siding` | Trade moved to its group page (2026-11-13) |
| `/window-installation-door-installtion` | `/exterior-remodeling#windows-doors` | Trade moved to its group page (2026-11-13) |
| `/gutters` | `/exterior-remodeling#gutters` | Trade moved to its group page (2026-11-13) |
| `/deck-contractor` | `/exterior-remodeling#decks` | Trade moved to its group page (2026-11-13) |
| `/masonry-brick-tuckpoint` | `/exterior-remodeling#masonry` | Trade moved to its group page (2026-11-13) |
| `/landscaping-contractor-lake-county-indiana` | `/exterior-remodeling#landscaping` | Trade moved to its group page (2026-11-13) |
| `/looking-for-something-else-1` | `/exterior-remodeling#exterior-remodeling` | Trade moved to its group page (2026-11-13) |
| `/framing-carpentry` | `/structural-and-site-work#framing` | Trade moved to its group page (2026-11-13) |
| `/foundation` | `/structural-and-site-work#foundations` | Trade moved to its group page (2026-11-13) |
| `/concrete` | `/structural-and-site-work#concrete` | Trade moved to its group page (2026-11-13) |
| `/demolition-debris-removal` | `/structural-and-site-work#demolition` | Trade moved to its group page (2026-11-13) |
| `/hvac-services` | `/mechanical-services#hvac` | Trade moved to its group page (2026-11-13) |
| `/plumbing` | `/mechanical-services#plumbing` | Trade moved to its group page (2026-11-13) |
| `/electric` | `/mechanical-services#electric` | Trade moved to its group page (2026-11-13) |
| `/rehab-remodel` | `/repairs-and-restoration#rehab-remodel` | Trade moved to its group page (2026-11-13) |
| `/how-to-fix-building-code-violations` | `/repairs-and-restoration#how-to-fix-building-code-violations` | Trade moved to its group page (2026-11-13) |
| `/looking-for-something-else` | `/repairs-and-restoration#something-else` | Trade moved to its group page (2026-11-13) |

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
