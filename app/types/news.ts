export interface NewsCategory {
  _id: string;
  title?: string;
}

export interface NewsListItem {
  _id: string;
  title?: string;
  slug?: string;
  date?: string;
  thumbImage?: string;
  thumbImageAlt?: string;
  category: NewsCategory | null;
}

export interface NewsDetail {
  _id: string;
  isHidden: boolean;
  title?: string;
  slug?: string;
  date?: string;
  thumbImage?: string;
  thumbImageAlt?: string;
  content?: string;
  category: NewsCategory | null;
}

export interface GetNewsResult {
  categories: NewsCategory[];
  items: NewsListItem[];
}