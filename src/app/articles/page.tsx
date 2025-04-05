import { fetchArticles } from "@/lib/supabase";
import { Articles } from "@/components/app";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | Andika Dwi Saputra - Fullstack Developer",
  description: "Insights and tutorials on web development, programming, and technology by Andika Dwi Saputra. Explore practical knowledge and industry best practices.",
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
    description: "Insights and tutorials on web development, programming, and technology by Andika Dwi Saputra. Explore practical knowledge and industry best practices.",
    url: "/articles",
    type: "website",
  },
};

type Props = {
  searchParams: any;
};

export default async function ArticlesPage({ searchParams }: Props) {
  const search = searchParams?.search || "";
  const page = parseInt(searchParams?.page || "1");

  const initialData = await fetchArticles({
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
            {/* Title with gradient */}
            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold mb-6 text-[var(--text)]">
              Articles
            </h1>

            {/* Description */}
            <p className="text-[var(--text)]/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
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
