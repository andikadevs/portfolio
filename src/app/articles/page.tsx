import { fetchArticles } from "@/lib/supabase";
import { Articles } from "@/components/app";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | AndikaDS",
  description: "Read articles about web development, programming, and technology from AndikaDS",
  keywords: [
    "web development",
    "programming",
    "technology",
    "articles",
    "blog",
  ],
  openGraph: {
    title: "Articles | AndikaDS",
    description: "Read articles about web development, programming, and technology from AndikaDS",
    url: "/articles",
    type: "website",
  },
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams?: { search?: string; page?: string };
}) {
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
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-[var(--accent)]/10 blur-3xl"></div>
          <div className="absolute -bottom-[400px] -right-[400px] w-[800px] h-[800px] rounded-full bg-[var(--accent)]/10 blur-3xl"></div>
        </div>

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
                className="text-[var(--accent)]/60"
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
