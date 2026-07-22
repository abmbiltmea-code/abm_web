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

export interface FirstSectionItem {
  icon?: string;
  iconAlt?: string;
  value?: string;
  label?: string;
}

export interface FirstSection {
  isHidden: boolean;
  sectionLabel?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  items: FirstSectionItem[];
}

export interface SecondSection {
  isHidden: boolean;
  video?: string;
  videoAlt?: string;
  poster?: string;
  posterAlt?: string;
}

export interface ThirdSectionItem {
  icon?: string;
  iconAlt?: string;
  title?: string;
  description?: string;
}

export interface ThirdSection {
  isHidden: boolean;
  sectionLabel?: string;
  title?: string;
  items: ThirdSectionItem[];
}

export interface FourthSectionItem {
  image?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
}

export interface FourthSection {
  isHidden: boolean;
  sectionLabel?: string;
  title?: string;
  items: FourthSectionItem[];
}

export interface FifthSectionItem {
  image?: string;
  imageAlt?: string;
  year?: string;
  title?: string;
  description?: string;
}

export interface FifthSection {
  isHidden: boolean;
  sectionLabel?: string;
  title?: string;
  description?: string;
  items: FifthSectionItem[];
}

export interface SixthSectionItem {
  icon?: string;
  iconAlt?: string;
  title?: string;
  description?: string;
  button?: Button;
}

export interface SixthSection {
  isHidden: boolean;
  sectionLabel?: string;
  title?: string;
  items: SixthSectionItem[];
}

export interface SeventhSectionItem {
  image?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
}

export interface SeventhSection {
  isHidden: boolean;
  sectionLabel?: string;
  title?: string;
  items: SeventhSectionItem[];
}

export interface EighthSection {
  isHidden: boolean;
  title?: string;
  description?: string;
  button?: Button;
}

export interface AboutDoc {
  _id: string;
  seo?: Seo;
  bannerSection: BannerSection;
  firstSection: FirstSection;
  secondSection: SecondSection;
  thirdSection: ThirdSection;
  fourthSection: FourthSection;
  fifthSection: FifthSection;
  sixthSection: SixthSection;
  seventhSection: SeventhSection;
  eighthSection: EighthSection;
}

export interface GetAboutResult {
  about: AboutDoc;
}