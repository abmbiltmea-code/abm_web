export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  script?: string;
}

export interface Button {
  text?: string;
  link?: string;
}

// ---------- Home doc sections ----------

export interface HeroSlide {
  image: string;
  imageAlt: string;
  title: string;
  subTitle: string;
  subDescription: string;
}

export interface FirstSection {
  isHidden: boolean;
  items: HeroSlide[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface SecondSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  items: StatItem[];
}

export interface ThirdSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  description: string;
  divisionIds: string[];
}

export interface FourthSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  description: string;
  sectorIds: string[];
}

export interface FifthSectionItem {
  icon: string;
  iconAlt: string;
  title: string;
}

export interface FifthSection {
  isHidden: boolean;
  title: string;
  description: string;
  items: FifthSectionItem[];
}

export interface SixthSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  description: string;
  button: Button;
}

export interface SeventhSectionItem {
  image: string;
  imageAlt: string;
}

export interface SeventhSection {
  isHidden: boolean;
  sectionLabel: string;
  title: string;
  description: string;
  items: SeventhSectionItem[];
}

export interface EighthSectionItem {
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
}

export interface EighthSection {
  isHidden: boolean;
  title: string;
  description: string;
  items: EighthSectionItem[];
}

export interface HomeDoc {
  _id: string;
  seo?: Seo;
  firstSection: FirstSection;
  secondSection: SecondSection;
  thirdSection: ThirdSection;
  fourthSection: FourthSection;
  fifthSection: FifthSection;
  sixthSection: SixthSection;
  seventhSection: SeventhSection;
  eighthSection: EighthSection;
}

// ---------- Resolved/joined data returned alongside the doc ----------

export interface HomeDivisionCard {
  _id: string;
  name: string;
  slug: string;
  homePageSection?: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    buttonLink: string;
  };
}

export interface HomeSectorCard {
  _id: string;
  title?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  homePageImage?: string;
  homePageImageAlt?: string;
  homePageIcon?: string;
  homePageIconAlt?: string;
  homePageButton?: Button;
  homePageDescription?: string;
}

export interface HomeFeaturedProject {
  _id: string;
  title?: string;
  slug?: string;
  thumbImage?: string;
  thumbImageAlt?: string;
  location?: string;
}

// ---------- Final shape returned by getHome() ----------

export interface GetHomeResult {
  home: HomeDoc;
  divisions: HomeDivisionCard[];
  sectors: HomeSectorCard[];
  featuredProjects: HomeFeaturedProject[];
}