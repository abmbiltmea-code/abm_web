export interface Button {
  text: string;
  link: string;
}

export interface NewsSeo {
  metaTitle: string;
  metaDescription: string;
  script: string;
}

export interface NewsBannerSection {
  isHidden: boolean;
  image: string;
  imageAlt: string;
  title: string;
}

export interface NewsFirstSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  description: string;
}

export interface NewsSecondSection {
  isHidden: boolean;
  sectionLabel: string;
}

export interface NewsCategory {
  _id: string;
  title: string;
}

export interface NewsListItem {
  _id: string;
  title: string;
  slug: string;
  date: string;
  thumbImage: string;
  thumbImageAlt: string;
  category: NewsCategory;
}

export interface NewsDetail {
  _id: string;
  isHidden: boolean;
  title: string;
  slug: string;
  date: string;
  thumbImage: string;
  thumbImageAlt: string;
  content: string;
  category: NewsCategory;
  cta: {
    title: string;
    image: string;
    imageAlt: string;
    description: string;
    button: Button
  };
  relatedNews: NewsListItem[];
}

export interface GetNewsResult {
  seo: NewsSeo;
  bannerSection: NewsBannerSection;
  firstSection: NewsFirstSection;
  secondSection: NewsSecondSection;
  categories: NewsCategory[];
  items: NewsListItem[];
  detail: NewsDetail;
}