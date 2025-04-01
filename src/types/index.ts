export interface NavLink {
  name: string;
  path: string;
}

export interface SectionInfo {
  id: string;
  element: HTMLElement | null;
  path: string;
}

export interface PortfolioItem {
  title: string;
  imgSrc: string;
  description: string;
  url: string;
  stacks: string[];
}

export type PortfolioData = PortfolioItem[]; 

export interface AuthorInfo {
  name: string;
  bio: string;
  github: string;
  instagram: string;
  avatarUrl: string;
}
