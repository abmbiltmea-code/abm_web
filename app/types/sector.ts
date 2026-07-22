export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  script?: string;
}

export interface Button {
  text: string;
  link: string;
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

export interface SectorItem {
  _id: string;
  isHidden: boolean;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailAlt: string;
  button: Button;
  homePageImage: string;
  homePageImageAlt: string;
  homePageIcon: string;
  homePageIconAlt: string;
  homePageButton: Button;
  homePageDescription: string;
}

export interface SecondSection {
  isHidden: boolean;
  sectors: SectorItem[];
}

export interface ThirdSectionItem {
  title?: string;
}

export interface ThirdSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  items: ThirdSectionItem[];
}

export interface FourthSection {
  isHidden: boolean;
  title: string;
  button: Button;
}

export interface FifthSection {
  isHidden: boolean;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  button: Button;
}

export interface SectorDoc {
  _id: string;
  seo?: Seo;
  bannerSection: BannerSection;
  firstSection: FirstSection;
  secondSection: SecondSection;
  thirdSection: ThirdSection;
  fourthSection: FourthSection;
  fifthSection: FifthSection;
}

export interface GetSectorResult {
  sector: SectorDoc;
  sectors: SectorItem[];
}