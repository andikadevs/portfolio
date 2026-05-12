"use client";

import { IconSearch, IconFilterX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Article } from "@/types";
import { useArticles } from "@/hooks/use-articles";

/**
 * @author Andika Dwi Saputra
 *
 * @description Dynamically import ArticleCard component with SSR support
 * @returns {React.ReactNode} The ArticleCard component
 */
const ArticleCard = dynamic(
  () =>
    import("./child/article-card/article-card").then((mod) => mod.ArticleCard),
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
  const {
    articles,
    loading,
    error,
    hasMore,
    searchQuery,
    debouncedSearchQuery,
    searchLoading,
    setIsSearchFocused,
    infiniteScrollRef,
    handleSearchChange,
    clearSearch,
    retryLoading,
  } = useArticles(initialArticles, initialHasMore);

  return (
    <div className="relative overflow-x-hidden">
      <div className="mb-16 md:mb-20 relative z-10">
        <div
          className="relative max-w-2xl mx-auto"
        >
          <div
            className="relative overflow-hidden"
            style={{
              background: "var(--paper)",
              border: "1px solid rgba(184,151,106,0.45)",
              boxShadow: "2px 3px 8px rgba(36,22,16,0.10)",
            }}
          >
            {/* Tape top */}
            <div className="h-2 w-full" style={{ background: "var(--tape-yellow)" }} />
            <div className="flex items-center">
              <div className="pl-4 text-accent">
                <IconSearch className="h-4 w-4" />
              </div>
              <input
                type="text"
                className="w-full py-3.5 pl-3 pr-10 bg-transparent text-text focus:outline-none text-sm font-mono"
                placeholder="search articles..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                aria-label="Search articles"
                style={{ caretColor: "var(--accent)" }}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 text-[var(--text)]/50 hover:text-[var(--accent)] transition-colors"
                  aria-label="Clear search"
                >
                  <IconFilterX className="h-5 w-5" />
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

        <p className="font-caveat text-center text-xl text-text/55 mt-3 max-w-2xl mx-auto">
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
                <IconFilterX className="h-4 w-4 mr-2" />
                Clear search
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {articles.map((article, articleIndex) => (
              <div
                key={article.id}
                className="article-card"
                style={{
                  opacity: "0",
                  transform: "translateY(20px)",
                  willChange: "transform, opacity",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                <ArticleCard article={article} index={articleIndex} />
              </div>
            ))}
          </div>
          {hasMore && (
            <div
              ref={infiniteScrollRef}
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
