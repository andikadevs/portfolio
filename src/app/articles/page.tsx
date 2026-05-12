import { getArticles } from "@/actions/articles";
import { Articles } from "@/components/app";
import { Metadata } from "next";
import { ArticlePageProps } from "@/types";

export const metadata: Metadata = {
  title: "Articles | Andika Dwi Saputra - Fullstack Developer",
  description:
    "Insights and tutorials on web development, programming, and technology by Andika Dwi Saputra. Explore practical knowledge and industry best practices.",
  keywords: [
    "web development",
    "programming",
    "technology",
    "articles",
    "blog",
    "Andika Dwi Saputra",
    "fullstack developer",
  ],
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Articles | Andika Dwi Saputra - Fullstack Developer",
    description:
      "Insights and tutorials on web development, programming, and technology by Andika Dwi Saputra. Explore practical knowledge and industry best practices.",
    url: "/articles",
    type: "website",
  },
};

export default async function ArticlesPage({ searchParams }: ArticlePageProps) {
  const resolvedSearchParams = await searchParams;
  
  // Normalize search parameter
  const rawSearch = resolvedSearchParams?.search;
  const search = Array.isArray(rawSearch) ? rawSearch[0] : (rawSearch || "");
  
  // Normalize page parameter
  const rawPage = resolvedSearchParams?.page;
  const pageStr = Array.isArray(rawPage) ? rawPage[0] : (rawPage || "1");
  const page = parseInt(pageStr);

  const initialData = await getArticles({
    page,
    searchQuery: search,
    limit: 9, // Match the client-side limit
  });

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full pt-16 pb-24 md:pt-32 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="font-caveat text-4xl md:text-6xl font-bold mb-4 text-text">
              Articles
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-3 w-16 rounded-sm" style={{ background: "var(--tape-yellow)", transform: "rotate(-0.5deg)" }} />
              <div className="h-3 w-10 rounded-sm" style={{ background: "var(--tape-blue)", transform: "rotate(0.5deg)" }} />
            </div>
            <p className="text-text/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10">
              Explore my thoughts, tutorials, and insights on web development,
              programming, and technology.
            </p>

            {/* Animated arrow down */}
            <div className="animate-bounce inline-block mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--accent)]"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 -mt-6 md:-mt-24 relative z-20">
        <div className="max-w-screen-xl mx-auto">
          <Articles
            initialArticles={initialData.articles}
            initialHasMore={initialData.hasMore}
          />
        </div>
      </div>
    </>
  );
}
