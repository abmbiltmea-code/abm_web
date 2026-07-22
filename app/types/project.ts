export interface RefEntry {
  _id: string;
  title?: string;
}

export interface DivisionRef {
  _id: string;
  name?: string;
  slug?: string;
}

export interface ProjectImage {
  url?: string;
  alt?: string;
}

export interface ScopeOfWorksItem {
  title?: string;
}

export interface ProjectListItem {
  _id: string;
  title?: string;
  slug?: string;
  featured: boolean;
  thumbImage?: string;
  thumbImageAlt?: string;
  location: RefEntry | null;
  status: RefEntry | null;
  sector: RefEntry | null;
  division: DivisionRef | null;
}

export interface ProjectDetail extends ProjectListItem {
  isHidden: boolean;
  images: ProjectImage[];
  client?: string;
  consultant?: string;
  duration?: string;
  projectValue?: string;
  content?: string;
  scopeOfWorks: { items: ScopeOfWorksItem[] };
}

export interface GetProjectsResult {
  locations: RefEntry[];
  statuses: RefEntry[];
  projects: ProjectListItem[];
}