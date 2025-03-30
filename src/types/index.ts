// Navigation link type
export interface NavLink {
  name: string;
  path: string;
}

// Section type for scroll spy
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