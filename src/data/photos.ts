/**
 * Approved project photographs (see docs/ASSET-MAP.md).
 * Captions are factual limits from the owner: do not add towns, scopes or stories here
 * unless they have been confirmed.
 */
import type { ImageMetadata } from 'astro';
import roofingA from '../assets/photos/roofing-opening-A-v3.jpg';
import bathroomB1 from '../assets/photos/bathroom-detail-B1.jpg';
import kitchenK1 from '../assets/photos/kitchen-feature-K1.jpg';
import kitchenK2 from '../assets/photos/kitchen-wide-K2.jpg';
import framingWide from '../assets/photos/framing-progress-C-desktop.jpg';
import framingTall from '../assets/photos/framing-progress-C-phone.jpg';
import framingFull from '../assets/photos/framing-progress-C-full.jpg';

export type PhotoCategory = 'Roofing' | 'Kitchens' | 'Bathrooms' | 'In progress';

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
    caption: 'Kitchen detail',
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
