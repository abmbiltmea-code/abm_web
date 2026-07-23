export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  script?: string;
}

export interface HomePageSection {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  buttonLink: string;
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
  title: string;
  image: string;
  imageAlt: string;
  content: string;
}

export interface SectionItem {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ThirdSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  items: SectionItem[];
}

export interface IconItem {
  icon: string;
  iconAlt: string;
  title: string;
}

export interface FourthSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  items: IconItem[];
}

export interface FifthSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  description: string;
  items: SectionItem[];
}

export interface ButtonLink {
  text: string;
  link: string;
}

export interface SixthSection {
  isHidden: boolean;
  title: string;
  button: ButtonLink;
}

export interface SeventhSection {
  isHidden: boolean;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  button: ButtonLink;
}

export interface DivisionDetail {
  _id: string;
  name: string;
  slug: string;
  isHidden: boolean;
  seo?: Seo;
  homePageSection: HomePageSection;
  bannerSection: BannerSection;
  firstSection: FirstSection;
  secondSection: SecondSection;
  thirdSection: ThirdSection;
  fourthSection: FourthSection;
  fifthSection: FifthSection;
  sixthSection: SixthSection;
  seventhSection: SeventhSection;
  createdAt: string;
  updatedAt: string;
}

export interface DivisionDetailProps {
  data: DivisionDetail;
}