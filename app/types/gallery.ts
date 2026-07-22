export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  script?: string;
}

export interface BannerSection {
  isHidden: boolean;
  image?: string;
  imageAlt?: string;
  title?: string;
}

export interface FirstSection {
  isHidden: boolean;
  sectionLabel?: string;
}

export interface GalleryCategory {
  _id: string;
  title?: string;
}

export interface GalleryImage {
  url?: string;
  alt?: string;
}

export interface GalleryItem {
  _id: string;
  title?: string;
  images: GalleryImage[];
  category: GalleryCategory | null;
}

export interface GalleryDoc {
  _id: string;
  seo?: Seo;
  bannerSection: BannerSection;
  firstSection: FirstSection;
  categories: { _id: string; title?: string }[];
  items: {
    _id: string;
    isHidden: boolean;
    title?: string;
    images: GalleryImage[];
    category?: string;
  }[];
}

export interface GetGalleryResult {
  gallery: GalleryDoc;
  categories: GalleryCategory[];
  items: GalleryItem[];
}
