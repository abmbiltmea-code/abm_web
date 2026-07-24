export interface RefEntry {
  _id: string;
  title: string;
}

export interface Button {
  text: string;
  link: string;
}

export interface DivisionRef {
  _id: string;
  name: string;
  slug: string;
}

export interface ProjectImage {
  url: string;
  alt: string;
}

export interface ScopeOfWorksItem {
  title: string;
}

export interface ProjectListItem {
  _id: string;
  title: string;
  slug: string;
  featured: boolean;
  thumbImage: string;
  thumbImageAlt: string;
  location: RefEntry | null;
  status: RefEntry | null;
  sector: RefEntry | null;
  division: DivisionRef | null;
}

export interface ProjectDetail extends ProjectListItem {
  isHidden: boolean;
  images: ProjectImage[];
  client: string;
  consultant: string;
  duration: string;
  projectValue: string;
  content: string;
  scopeOfWorks: { items: ScopeOfWorksItem[] };
  cta: {
    isHidden: boolean;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    button: Button;
  };
  relatedProjects: ProjectListItem[];
}

export interface Seo {
  metaTitle: string;
  metaDescription: string;
  script: string;
}

export interface BannerSection {
  isHidden: boolean;
  imageAlt: string;
  title: string;
  image: string;
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
  description: string;
  image: string;
  imageAlt: string;
  button: Button;
}

export interface GetProjectsResult {
  seo: Seo;
  bannerSection: BannerSection;
  firstSection: FirstSection;
  secondSection: SecondSection;
  locations: RefEntry[];
  statuses: RefEntry[];
  sectors: RefEntry[];
  divisions: DivisionRef[];
  projects: ProjectListItem[];
}