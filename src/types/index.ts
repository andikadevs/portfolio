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
  onClick?: () => void;
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

// Statistics and chat messaging interfaces
export interface UserStatistic {
  id?: number;
  page_path: string;
  visitor_id: string;
  user_agent: string;
  ip_address: string;
  referrer: string;
  country: string;
  city: string;
  region: string;
  visit_duration?: number;
  created_at?: string;
}

export interface ChatMessage {
  id?: number;
  visitor_id: string;
  message: string;
  is_bot: boolean;
  context?: string;
  created_at?: string;
}

export interface SiteAnalytics {
  totalVisitors: number;
  uniqueVisitors: number;
  averageVisitDuration: number;
  topPages: {
    page_path: string;
    visits: number;
  }[];
  topCountries: {
    country: string;
    visits: number;
  }[];
  visitsPerDay: {
    date: string;
    count: number;
  }[];
}
