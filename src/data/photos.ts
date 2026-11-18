/**
 * Approved project photographs (see docs/ASSET-MAP.md).
 * Captions are factual limits from the owner: do not add towns, scopes or stories here
 * unless they have been confirmed.
 * 2026-11-13: Tony supplied the garage, addition, East Chicago and Munster kitchen photos. Towns come from
 * his file names and his messages (Munster garage rebuild, East Chicago new home built from scratch).
 */
import type { ImageMetadata } from 'astro';
import roofingA from '../assets/photos/roofing-opening-A-v3.jpg';
import bathroomB1 from '../assets/photos/bathroom-detail-B1.jpg';
import kitchenK1 from '../assets/photos/kitchen-feature-K1.jpg';
import kitchenK2 from '../assets/photos/kitchen-wide-K2.jpg';
import framingWide from '../assets/photos/framing-progress-C-desktop.jpg';
import framingTall from '../assets/photos/framing-progress-C-phone.jpg';
import framingFull from '../assets/photos/framing-progress-C-full.jpg';
import garageBefore from '../assets/photos/garage-before-munster.jpg';
import garageAfter from '../assets/photos/garage-after-munster.jpg';
import additionCrane from '../assets/photos/addition-second-floor-crane.jpg';
import newHomeEC from '../assets/photos/new-home-east-chicago.jpg';
import kitchenIsland from '../assets/photos/kitchen-munster-island.jpg';
import kitchenQuartz from '../assets/photos/kitchen-munster-quartz.jpg';
import bathShower from '../assets/photos/bathroom-walk-in-shower.jpg';
import basementBar from '../assets/photos/basement-bar.jpg';

export type PhotoCategory = 'New construction' | 'Additions' | 'Kitchens' | 'Bathrooms' | 'Restoration' | 'Basements' | 'Roofing' | 'In progress';

export interface Photo {
  id: string;
  src: ImageMetadata;
  /** Short factual caption shown to visitors. */
  caption: string;
  /** Descriptive alternative text. */
  alt: string;
  category: PhotoCategory;
  /** Shown in the Projects gallery. Alternate crops of the same photo are not repeated there. */
  inGallery: boolean;
}

export const photos = {
  EC: {
    id: 'EC',
    src: newHomeEC,
    caption: 'New home built from scratch · East Chicago, IN',
    alt: 'New single-story home with blue siding, a stone base and a covered front porch with white columns',
    category: 'New construction',
    inGallery: true,
  },
  ADD: {
    id: 'ADD',
    src: additionCrane,
    caption: 'Second-floor addition in progress',
    alt: 'Second-floor addition being framed on a two-story house, with roof trusses set and a crane on site',
    category: 'Additions',
    inGallery: true,
  },
  GA: {
    id: 'GA',
    src: garageAfter,
    caption: 'Garage rebuilt after a fire · Munster, IN',
    alt: 'Rebuilt detached garage with tan siding, a white overhead door and a new concrete apron',
    category: 'Restoration',
    inGallery: true,
  },
  GB: {
    id: 'GB',
    src: garageBefore,
    caption: 'The same garage after the fire, before the rebuild',
    alt: 'Burned remains of a detached garage and a vehicle, with charred framing and debris on the driveway',
    category: 'Restoration',
    inGallery: false,
  },
  KI: {
    id: 'KI',
    src: kitchenIsland,
    caption: 'Kitchen remodel · Munster, IN',
    alt: 'White kitchen with a large island, bar stools, pendant lights and stainless appliances',
    category: 'Kitchens',
    inGallery: true,
  },
  KQ: {
    id: 'KQ',
    src: kitchenQuartz,
    caption: 'Kitchen remodel · Munster, IN',
    alt: 'Kitchen with a black quartz island, white cabinets, a stainless range hood and wood floors',
    category: 'Kitchens',
    inGallery: true,
  },
  BS: {
    id: 'BS',
    src: bathShower,
    caption: 'Walk-in shower',
    alt: 'Walk-in shower with white subway tile, a frameless glass door and black fixtures',
    category: 'Bathrooms',
    inGallery: true,
  },
  BAR: {
    id: 'BAR',
    src: basementBar,
    caption: 'Custom basement bar in progress',
    alt: 'Custom wood basement bar being built, with a raised top and paneled front',
    category: 'Basements',
    inGallery: true,
  },
  A: {
    id: 'A',
    src: roofingA,
    caption: 'Roofing project',
    alt: 'Two-story house with gray shingle siding, stone entry and a dark asphalt shingle roof',
    category: 'Roofing',
    inGallery: true,
  },
  K1: {
    id: 'K1',
    src: kitchenK1,
    caption: 'Kitchen remodel · Munster, IN',
    alt: 'Kitchen with white tile wall, dark floating shelves, black range hood and marble-look counters',
    category: 'Kitchens',
    inGallery: true,
  },
  K2: {
    id: 'K2',
    src: kitchenK2,
    caption: 'Kitchen view',
    alt: 'Kitchen with white shaker cabinets, a dark island, marble-look backsplash, pendant lights and light wood-look floor',
    category: 'Kitchens',
    inGallery: true,
  },
  B1: {
    id: 'B1',
    src: bathroomB1,
    caption: 'Bathroom detail',
    alt: 'Bathroom with marble-look floor tile, a glass walk-in shower with black hardware and a marble-look vanity top',
    category: 'Bathrooms',
    inGallery: true,
  },
  C: {
    id: 'C',
    src: framingFull,
    caption: 'Framing in progress',
    alt: 'Open wood wall and roof framing on a slab, with sawhorses, a ladder and stacked lumber',
    category: 'In progress',
    inGallery: true,
  },
  Cwide: {
    id: 'C-wide',
    src: framingWide,
    caption: 'Framing in progress',
    alt: 'Wood wall and roof framing in progress on a building under construction',
    category: 'In progress',
    inGallery: false,
  },
  Ctall: {
    id: 'C-tall',
    src: framingTall,
    caption: 'Framing in progress',
    alt: 'Wood framing in progress on a building under construction',
    category: 'In progress',
    inGallery: false,
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export const galleryPhotos: Photo[] = Object.values(photos).filter((p) => p.inGallery);
