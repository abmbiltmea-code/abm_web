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

export interface IconItem {
  icon: string;
  iconAlt: string;
}

export interface SecondSection {
  isHidden: boolean;
  items: IconItem[];
}

export interface ThirdSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  description: string;
}

export interface FourthSection {
  isHidden: boolean;
  items: IconItem[];
}

export interface FifthSection {
  isHidden: boolean;
  title: string;
  button: Button;
}

export interface SixthSection {
  isHidden: boolean;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  button: Button;
}

export interface ClientsDoc {
  _id: string;
  seo?: Seo;
  bannerSection: BannerSection;
  firstSection: FirstSection;
  secondSection: SecondSection;
  thirdSection: ThirdSection;
  fourthSection: FourthSection;
  fifthSection: FifthSection;
  sixthSection: SixthSection;
}

export interface GetClientsResult {
  clients: ClientsDoc;
}