/**
 * Google reviews, copied from the business profile (screenshots supplied by Tony, 2026-11-13).
 * Quotes are short excerpts of the reviewer's own words; do not edit their wording.
 * Names are shown as first name + last initial, except Doug (Tony confirmed he can be named).
 * Update `summary` when the rating or count on Google changes.
 */
export const reviewSummary = {
  rating: 4.3,
  count: 37,
  source: 'Google',
  /** Public Google Business Profile reviews link. Pending from the owner; when empty, no link is shown. */
  url: import.meta.env.PUBLIC_GOOGLE_REVIEWS_URL || '',
} as const;

export interface Review {
  id: string;
  name: string;
  stars: 1 | 2 | 3 | 4 | 5;
  quote: string;
  /** Shorter excerpt (same words, trimmed) for small cards. */
  short?: string;
  /** What the job was, in plain words. Only what the review itself says. */
  project: string;
  /** Town, only when the review or the owner reply names it. */
  town?: string;
  /** Services this review supports (matches service slugs). */
  services: string[];
}

export const reviews: Review[] = [
  {
    id: 'doug',
    name: 'Doug',
    stars: 5,
    quote:
      'Entire back of garage was taken off and replaced. The price was very good and the work was done very efficiently. Within a matter of days. Excellent cleanup and job was well done.',
    short: 'Entire back of garage was taken off and replaced… Within a matter of days. Excellent cleanup and job was well done.',
    project: 'Garage work',
    services: ['restoration', 'framing', 'siding'],
  },
  {
    id: 'amanda',
    name: 'Amanda C.',
    stars: 5,
    quote:
      'They showed us how it will look on the computer and gave us time to think without pressuring us to commit. They were clear with the prices and policies. The room was mostly done on the day that we got home from the hospital with the baby!',
    project: 'Third-bedroom addition',
    services: ['additions'],
  },
  {
    id: 'robert',
    name: 'Robert D.',
    stars: 5,
    quote:
      'We did a rather large addition to our home with them. They finished on budget and in a timely manner with quality work. They were responsive, helpful, patient and professional.',
    project: 'Home addition',
    town: 'Munster, IN',
    services: ['additions'],
  },
  {
    id: 'luke',
    name: 'Luke B.',
    stars: 5,
    quote:
      'They were professional, reliable, and did a great job from start to finish. The crew was respectful of my property, and everything was cleaned up when they were finished.',
    project: 'Storm damage repair and remodeling',
    services: ['restoration', 'roofing', 'siding'],
  },
  {
    id: 'sonya',
    name: 'Sonya M.',
    stars: 5,
    quote:
      'They took out a load bearing wall and combined the two rooms to make a master bedroom with a HUGE closet. Work was completed quickly and efficiently.',
    project: 'Bedroom remodel',
    services: ['framing', 'carpentry', 'drywall'],
  },
  {
    id: 'jessica',
    name: 'Jessica K.',
    stars: 5,
    quote:
      'They were very prompt to come out. They quickly came back with a quote, and an entire breakdown regarding proposed plans, suggestions, 3D models, etc. Unlike many other contractors, who completely ghost you!',
    project: 'Renovation planning',
    services: ['kitchens', 'bathrooms', 'new-construction'],
  },
];

export const reviewFor = (slug: string) => reviews.find((r) => r.services.includes(slug));
