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

export interface SecondSection {
  isHidden: boolean;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface ThirdSectionItem {
  title: string;
  content: string;
}

export interface ThirdSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  items: ThirdSectionItem[];
}

export interface FourthSectionItem {
  icon: string;
  iconAlt: string;
  title: string;
}

export interface FourthSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  items: FourthSectionItem[];
}

export interface ImageTextItem {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface FifthSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  description: string;
  items: ImageTextItem[];
}

export interface SixthSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  description: string;
  items: ImageTextItem[];
}

export interface SeventhSection {
  isHidden: boolean;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  button: Button;
}

export interface HowWeWorkDoc {
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
}

export interface GetHowWeWorkResult {
  howWeWork: HowWeWorkDoc;
}