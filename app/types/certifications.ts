export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  script?: string;
}

export interface Button {
  text?: string;
  link?: string;
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
  title?: string;
  description?: string;
}

export interface SecondSectionItem {
  image?: string;
  imageAlt?: string;
  title?: string;
  label?: string;
}

export interface SecondSection {
  isHidden: boolean;
  items: SecondSectionItem[];
}

export interface ThirdSectionItem {
  icon?: string;
  iconAlt?: string;
  title?: string;
}

export interface ThirdSection {
  isHidden: boolean;
  title?: string;
  items: ThirdSectionItem[];
}

export interface FourthSection {
  isHidden: boolean;
  title?: string;
  button?: Button;
}

export interface FifthSection {
  isHidden: boolean;
  title?: string;
  button?: Button;
}

export interface CertificationsDoc {
  _id: string;
  seo?: Seo;
  bannerSection: BannerSection;
  firstSection: FirstSection;
  secondSection: SecondSection;
  thirdSection: ThirdSection;
  fourthSection: FourthSection;
  fifthSection: FifthSection;
}

export interface GetCertificationsResult {
  certifications: CertificationsDoc;
}