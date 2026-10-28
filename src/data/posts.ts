/**
 * Resources / blog posts. The legacy article route is preserved.
 * status "draft": noindex and excluded from the sitemap until the original article is recovered and reviewed.
 */
export interface Post {
  slug: string;
  title: string;
  description: string;
  status: 'draft' | 'published';
  reviewNote?: string;
  /** Simple HTML body authored here (trusted content only). */
  body: string;
}

export const posts: Post[] = [
  {
    slug: '3-key-renovations-to-boost-your-market-price',
    title: '3 key renovations to consider before you sell',
    description:
      'Kitchens, bathrooms and the outside of the house are the projects sellers most often ask about. What to think through before you start.',
    status: 'draft',
    reviewNote:
      'Interim rewrite on the legacy route. Recover the original Squarespace article and review before publishing; no value or ROI figures are claimed.',
    body: `
<p>If you’re preparing a house for sale, the question is usually where a limited budget does the most good. These are the three areas owners ask us about most. Every house and market is different, so treat this as a starting point for a conversation, not a promise about price.</p>
<h2>1. The kitchen</h2>
<p>Buyers spend time in the kitchen when they tour. A full remodel isn’t always needed: updated counters, hardware, lighting and paint can change how the room reads. Fix anything that looks neglected first.</p>
<h2>2. Bathrooms</h2>
<p>Dated or worn bathrooms stand out. Re-caulking, new fixtures, a vanity or updated tile can make a bathroom feel cared for. Address leaks and soft floors before cosmetic work.</p>
<h2>3. The outside of the house</h2>
<p>The roof, siding, windows, gutters and entry are the first things people see, and inspectors look closely at them. Repairs here can matter as much as anything inside.</p>
<h2>Before you start</h2>
<p>Talk to your real estate agent about what buyers in your area expect, then let us look at the house. The consultation is free and includes an on-site visit.</p>`,
  },
];
