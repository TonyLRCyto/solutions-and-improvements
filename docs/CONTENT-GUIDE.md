# Content editing guide

Most changes are one edit in `src/data/`. Templates read from these files, so the same fact is never typed twice.

| To change… | Edit |
| --- | --- |
| Phone, email, address, team, “Since 1990”, approach values, nav, CTA label | `src/data/site.ts` |
| A service page’s title, intro, examples, process steps, photos, related links | `src/data/services.ts` (find the entry by `path`) |
| Add a service page | Add an entry to `secondaryServices` with a unique `slug`, `path`, `group`. The page, services index and sitemap pick it up. |
| Regional page text | `src/data/areas.ts` → `regions` |
| City draft text, or publish a city | `src/data/areas.ts` → `cities`. Set `indexReady: true` only when the page has genuinely local content. |
| Photo captions / alt text | `src/data/photos.ts` |
| Add a photo | Put the approved original in `src/assets/photos/`, add a record in `photos.ts` with an honest caption and category. Set `inGallery: true` to show it on `/projects`. Responsive versions are generated at build. |
| Blog post | `src/data/posts.ts` (`status: 'published'` to index it) |
| Form choices | `src/data/form-options.ts` and `src/lib/consultation.ts` |
| Colours, spacing, type | Tokens at the top of `src/styles/global.css` |

## Writing rules (from the brief)

- Intros 20–40 words; cards one sentence; paragraphs 1–3 sentences.
- No prices, timelines, response-time promises, warranties, ratings, awards, invented projects or customer descriptions.
- “Free consultation, includes an on-site visit.” Estimates may be free or paid depending on the project. Design/renders may begin after a rendering deposit or signed contract.
- Captions describe only what a photo shows (“Kitchen detail”, “Roofing project”, “Framing in progress”).
- Keep internal notes out of customer copy; use `reviewNotes` / `draftNote` fields, which only show in preview builds.
