export interface Seo {
  metaTitle: string;
  metaDescription: string;
  script: string;
}

export interface BannerSection {
  isHidden: boolean;
  image: string;
  imageAlt: string;
  title: string;
}

export interface FirstSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  description: string;
}

export interface SecondSectionItem {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface SecondSection {
  isHidden: boolean;
  title: string;
  items: SecondSectionItem[];
}

export interface JobSpecs {
  location: string;
  experience: string;
  type: string;
}

export interface JobDoc {
  _id: string;
  isHidden: boolean;
  title: string;
  category: string;
  slug: string;
  specs: JobSpecs;
  content: string;
}

export interface ThirdSection {
  isHidden: boolean;
  title: string;
  subTitle: string;
  description: string;
  mail: string;
  jobs: JobDoc[];
}

export interface CareersDoc {
  _id: string;
  seo: Seo;
  bannerSection: BannerSection;
  firstSection: FirstSection;
  secondSection: SecondSection;
  thirdSection: ThirdSection;
}

export interface GetCareersResult {
  careers: CareersDoc;
  jobs: JobDoc[];
}