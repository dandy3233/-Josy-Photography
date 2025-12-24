export const GALLERY_CATEGORIES = [
  'Wedding',
  'Mels',
  'Genfo',
  'Bridal Shower',
  'Maternity',
  'Kids',
  'Kiristina',
  'Family',
] as const;

export type GalleryCategory = typeof GALLERY_CATEGORIES[number];