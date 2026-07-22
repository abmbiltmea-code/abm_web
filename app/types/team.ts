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
  title: string;
  description: string;
}

export interface SecondSection {
  isHidden: boolean;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  name: string;
  designation: string;
}

export interface ThirdSectionItem {
  image: string;
  imageAlt: string;
  name: string;
  designation: string;
}

export interface ThirdSection {
  isHidden: boolean;
  title: string;
  description: string;
  items: ThirdSectionItem[];
}

export interface FourthSection {
  isHidden: boolean;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  button: Button;
}

export interface TeamDoc {
  _id: string;
  seo?: Seo;
  bannerSection: BannerSection;
  firstSection: FirstSection;
  secondSection: SecondSection;
  thirdSection: ThirdSection;
  fourthSection: FourthSection;
}

export interface GetTeamResult {
  team: TeamDoc;
}