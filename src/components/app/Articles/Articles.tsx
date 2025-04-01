"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { Search, FilterX } from "lucide-react";
import { fetchArticles, Article } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

/**
 * @author Andika Dwi Saputra
 *
 * @description Dynamically import ArticleCard component with SSR support
 * @returns {React.ReactNode} The ArticleCard component
 */
const ArticleCard = dynamic(
  () =>
    import("@/components/ui/ArticleCard/ArticleCard").then(
      (mod) => mod.ArticleCard
    ),
  { ssr: true }
);

/**
 * @author Andika Dwi Saputra
 *
 * @description Client component for articles page with infinite scroll, search functionality, and responsive design
 * @param {Object} props - Component props
 * @param {Article[]} props.initialArticles - Initial articles data from server-side rendering
 * @param {boolean} props.initialHasMore - Flag indicating if more articles are available
 * @returns {React.ReactNode} The ArticlesClient component
 */
export const Articles = ({
  initialArticles,
  initialHasMore,
}: {
  initialArticles: Article[];
  initialHasMore: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State management
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);

  // For search functionality
  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useState(initialSearch);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Reference for infinite scroll detection - increased threshold for earlier loading
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "200px", // Load earlier when scrolling down
  });

  /**
   * @description Ensures articles are unique by ID and properly sorted
   * @param {Article[]} currentArticles - Current articles in state
   * @param {Article[]} newArticles - New articles to merge
   * @returns {Article[]} Merged and sorted articles array
   */
  const mergeArticles = (
    currentArticles: Article[],
    newArticles: Article[]
  ): Article[] => {
    // Create a Map with ID as key to ensure uniqueness
    const articlesMap = new Map<string, Article>();

    // Add current articles to the map
    currentArticles.forEach((article) => {
      articlesMap.set(article.id, article);
    });

    // Add new articles to the map (will overwrite any duplicates)
    newArticles.forEach((article) => {
      articlesMap.set(article.id, article);
    });

    // Convert back to array and sort by created_at date
    return Array.from(articlesMap.values()).sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  };

  /**
   * @description Debounces search query and updates URL parameters
   */
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);

      // Update URL with search query
      const params = new URLSearchParams(window.location.search);
      if (searchQuery) {
        params.set("search", searchQuery);
      } else {
        params.delete("search");
      }

      // Use router.push instead of replace to properly handle the navigation
      const newPath = `/articles${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      router.push(newPath, { scroll: false });
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchQuery, router]);

  /**
   * @description Resets state when search changes
   */
  useEffect(() => {
    if (debouncedSearchQuery !== initialSearch) {
      setArticles([]);
      setPage(1);
      setHasMore(true);
      setLoading(true);
    }
  }, [debouncedSearchQuery, initialSearch]);

  /**
   * @description Fetches more articles when needed for infinite scroll
   */
  useEffect(() => {
    // Skip initial load as we already have the data from SSR
    if (
      page === 1 &&
      articles.length > 0 &&
      debouncedSearchQuery === initialSearch
    ) {
      return;
    }

    const loadMoreArticles = async () => {
      try {
        if (!hasMore) return;

        // Set loading states
        setLoading(true);
        if (page === 1) {
          setSearchLoading(true);
        }

        const result = await fetchArticles({
          page,
          searchQuery: debouncedSearchQuery,
          limit: 9, // Increased for smoother infinite scroll
        });

        // Handle the case when no articles are returned
        if (!result || !result.articles) {
          setHasMore(false);
          setError("No articles found");
          return;
        }

        if (page === 1) {
          setArticles(result.articles);
        } else {
          // Use the mergeArticles function to prevent duplicates
          setArticles((prevArticles) =>
            mergeArticles(prevArticles, result.articles)
          );
        }

        setHasMore(result.hasMore);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles");
        setHasMore(false);
      } finally {
        setLoading(false);
        setSearchLoading(false);
      }
    };

    loadMoreArticles();
  }, [page, debouncedSearchQuery, hasMore, articles.length, initialSearch]);

  /**
   * @description Loads more articles when scrolling to the bottom
   */
  useEffect(() => {
    if (inView && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, loading, hasMore]);

  /**
   * @description Handles search input change
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  /**
   * @description Clears the search query
   */
  const clearSearch = () => {
    setSearchQuery("");
  };

  /**
   * @description Retry loading articles
   */
  const retryLoading = () => {
    setError(null);
    setPage(1);
    setHasMore(true);
    setLoading(true);
  };

  return (
    <div className="relative overflow-x-hidden">
      {/* Enhanced search bar with visual effects */}
      <div className="mb-16 md:mb-20 relative z-10">
        <div
          className={cn(
            "relative max-w-2xl mx-auto transition-all duration-300 transform",
            isSearchFocused ? "scale-100" : "scale-100"
          )}
        >
          <div className="absolute inset-0 -m-1 bg-[var(--foreground)]/20 rounded-full blur-md"></div>
          <div className="relative bg-[var(--foreground)]/5 backdrop-blur-md border border-[var(--foreground)]/10 rounded-full shadow-lg overflow-hidden group hover:shadow-[var(--accent)]/20 transition-all duration-500">
            <div className="absolute inset-0 bg-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center relative">
              <div className="pl-5 text-[var(--accent)]">
                <Search className="h-5 w-5 group-hover:animate-pulse" />
              </div>
              <input
                type="text"
                className="w-full py-5 pl-4 pr-12 bg-transparent text-[var(--text)] placeholder-[var(--text)]/50 focus:outline-none text-base font-medium"
                placeholder="Search articles by keyword..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                aria-label="Search articles"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 text-[var(--text)]/50 hover:text-[var(--accent)] transition-colors"
                  aria-label="Clear search"
                >
                  <FilterX className="h-5 w-5" />
                </button>
              )}
              {searchLoading && (
                <div className="absolute right-4">
                  <div className="w-5 h-5 border-2 border-[var(--foreground)]/30 border-t-[var(--accent)] rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-center italic text-[var(--text)]/60 mt-3 max-w-2xl mx-auto">
          Discover insightful articles about technology, design, and innovation
        </p>

        {/* Search statistics with improved presentation */}
        {debouncedSearchQuery && articles.length > 0 && (
          <div className="text-center mt-5 text-[var(--text)]/60 text-sm animate-fadeIn">
            Found{" "}
            <span className="font-semibold text-[var(--accent)]">
              {articles.length}
            </span>{" "}
            result{articles.length !== 1 ? "s" : ""} matching{" "}
            <span className="italic">&quot;{debouncedSearchQuery}&quot;</span>
          </div>
        )}
      </div>

      {/* Articles presentation with enhanced styling and animations */}
      {loading && articles.length === 0 ? (
        <div className="w-full py-20 text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-[var(--foreground)]/5 border-t-[var(--accent)]/40 rounded-full animate-spin"></div>
            <div
              className="absolute inset-1 border-4 border-[var(--foreground)]/5 border-t-[var(--accent)]/70 rounded-full animate-spin"
              style={{ animationDuration: "1s" }}
            ></div>
            <div
              className="absolute inset-2 border-4 border-[var(--foreground)]/5 border-t-[var(--accent)] rounded-full animate-spin"
              style={{ animationDuration: "0.8s" }}
            ></div>
          </div>
          <p className="text-[var(--text)]/60 text-base">
            Loading amazing articles...
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-20 max-w-xl mx-auto">
          <div className="bg-[var(--foreground)]/5 backdrop-blur-md rounded-2xl p-8 border border-[var(--foreground)]/10 shadow-lg">
            <p className="text-[var(--accent)] text-xl font-medium mb-3">
              {error}
            </p>
            <p className="text-[var(--text)]/70">
              Please try again later or refine your search criteria.
            </p>
            <button
              onClick={retryLoading}
              className="mt-6 px-8 py-3 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full hover:bg-[var(--accent)]/20 transition-colors font-medium text-sm"
            >
              Retry Loading
            </button>
          </div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 mb-24 bg-[var(--foreground)]/5 rounded-2xl border border-[var(--foreground)]/10 max-w-2xl mx-auto backdrop-blur-md">
          <div className="p-8">
            <h3 className="text-2xl font-semibold mb-4 text-[var(--text)] inline-block">
              No articles found
            </h3>
            <p className="text-[var(--text)]/70 max-w-md mx-auto leading-relaxed">
              {debouncedSearchQuery ? (
                <>
                  No articles matching &quot;
                  <span className="text-[var(--accent)] font-medium">
                    {debouncedSearchQuery}
                  </span>
                  &quot;
                </>
              ) : (
                "There are no articles published yet. Check back soon for inspiring content!"
              )}
            </p>
            {debouncedSearchQuery && (
              <button
                onClick={clearSearch}
                className="mt-8 px-8 py-3 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full hover:bg-[var(--accent)]/20 transition-all duration-300 font-medium text-sm inline-flex items-center shadow-md hover:shadow-xl transform hover:-translate-y-1"
              >
                <FilterX className="h-4 w-4 mr-2" />
                Clear search
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-16 relative z-10">
          {/* Articles grid with enhanced animation and layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className="group"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: "0.6s",
                  animationFillMode: "both",
                  animationName: "fadeInUp",
                }}
              >
                <div className="transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative rounded-xl overflow-hidden backdrop-blur-sm bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 group-hover:border-[var(--accent)]/20">
                  <div className="absolute inset-0 bg-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <ArticleCard article={article} />
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced load more indicator */}
          {hasMore && (
            <div
              ref={ref}
              className={cn(
                "w-full flex justify-center py-12",
                loading ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-14 h-14 mb-4">
                  <div className="absolute inset-0 border-4 border-[var(--foreground)]/5 border-t-[var(--accent)]/40 rounded-full animate-spin"></div>
                  <div
                    className="absolute inset-1 border-4 border-[var(--foreground)]/5 border-t-[var(--accent)]/70 rounded-full animate-spin"
                    style={{ animationDuration: "1s" }}
                  ></div>
                  <div
                    className="absolute inset-2 border-4 border-[var(--foreground)]/5 border-t-[var(--accent)] rounded-full animate-spin"
                    style={{ animationDuration: "0.8s" }}
                  ></div>
                </div>
                <p className="text-[var(--text)]/60 text-base font-medium">
                  Loading more inspiring articles...
                </p>
              </div>
            </div>
          )}

          {/* End of content indication */}
          {!hasMore && articles.length > 6 && (
            <div className="text-center py-12 border-t border-[var(--foreground)]/10">
              <div className="inline-block pb-3 relative">
                <p className="text-[var(--text)]/70 font-medium text-lg">
                  You&apos;ve reached the end of the articles
                </p>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-[var(--accent)]/40"></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
