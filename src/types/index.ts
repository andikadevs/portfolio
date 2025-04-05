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

// From Button.tsx
export interface ButtonProps {
  variant?: "primary" | "secondary";
  href?: string;
  icon?: React.ReactNode;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

// From Share.tsx
export interface ShareProps {
  url: string;
  title: string;
}

// From Certification.tsx
export interface Certification {
  title: string;
  imgSrc: string;
  description: string;
  url: string;
  issuer: string;
  date: string;
}

export interface CertificationGridProps {
  certifications: Certification[];
  className?: string;
}

// From supabase.ts
export type Article = {
  id: string;
  title: string;
  content: string;
  meta_description: string | null;
  image_url: string | null;
  image_author: string | null;
  slug: string;
  status: 'draft' | 'published';
  created_at: string;
};

// From articles page.tsx
export type ArticlePageProps = {
  searchParams: any;
};

// From article [slug] page.tsx
export type ArticleDetailProps = {
  params: any;
};
