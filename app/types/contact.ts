export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  script?: string;
}

export interface BannerSection {
  isHidden: boolean;
  image: string;
  imageAlt: string;
  title: string;
}

export interface FirstSection {
  isHidden: boolean;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  address: string;
  phone: string;
  email: string;
  fax: string;
}

export interface SecondSection {
  isHidden: boolean;
  title: string;
  description: string;
}

export interface ThirdSection {
  isHidden: boolean;
  map: string;
}

export interface ContactDoc {
  _id: string;
  seo?: Seo;
  bannerSection: BannerSection;
  firstSection: FirstSection;
  secondSection: SecondSection;
  thirdSection: ThirdSection;
}

export interface GetContactResult {
  contact: ContactDoc;
}