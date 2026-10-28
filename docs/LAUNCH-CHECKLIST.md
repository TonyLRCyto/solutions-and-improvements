# Launch checklist (not authorised yet)

The live Squarespace site stays as-is until every item here is done and the owner approves the release.

## Content and facts
- [ ] Owner review of all copy, photos, captions and the Camera Settle motion on real phones and desktops.
- [ ] Acorn link supplied and verified (`PUBLIC_ACORN_URL`).
- [ ] City pages: either real local content + `indexReady: true`, or left unpublished.
- [ ] Original blog article recovered, reviewed and published (or route decision made).
- [ ] Privacy note finalised (provider, retention, analytics).
- [ ] Any licensing/credential wording confirmed per jurisdiction.

## Backups and search
- [ ] Full Squarespace export: pages, images, blog, private/unlisted pages, form data.
- [ ] Search Console: landing pages, top queries, backlinks reviewed against `ROUTES-AND-REDIRECTS.md`.
- [ ] Final redirect list approved; old URLs’ live HTTP codes/chains checked.

## Platform
- [ ] GitHub repo created; Cloudflare Workers Builds connected; preview and production Workers separate.
- [ ] Email provider configured, sender domain verified, secrets set; **owner-approved test submission arrives in office@solutionsandimprovements.com**.
- [ ] Turnstile decided (and both keys set if used).
- [ ] Analytics decided (or confirmed off); privacy note matches.

## Release day
- [ ] `npm run build:production` deploy to the production Worker; check `robots.txt`, `sitemap.xml`, canonicals, `index, follow` meta.
- [ ] DNS cutover plan reviewed. **Preserve MX, TXT (SPF/DKIM/DMARC) and other email records exactly.** Lower TTLs beforehand; keep a rollback path to Squarespace.
- [ ] SSL valid on `www` and apex; apex → `www` redirect (current hostname convention).
- [ ] Re-test every redirect and the 404 on the live host, including `/Service-areas` case behaviour.
- [ ] Production Lighthouse runs (mobile + desktop, 3 each) saved; fix regressions.
- [ ] Submit sitemap in Search Console; monitor coverage and 404s for a few weeks.
- [ ] Named owner for ongoing maintenance and form inbox.
