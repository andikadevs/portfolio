"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { fetchArticles } from "@/lib/supabase";
import { Article } from "@/types";

export function useArticles(initialArticles: Article[], initialHasMore: boolean) {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);

  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearchParams(new URLSearchParams(window.location.search));
    }
  }, []);

  useEffect(() => {
    if (searchParams) {
      const initialSearch = searchParams.get("search") || "";
      setSearchQuery(initialSearch);
      setDebouncedSearchQuery(initialSearch);
    }
  }, [searchParams]);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "200px",
  });

  const mergeArticles = (
    currentArticles: Article[],
    newArticles: Article[]
  ): Article[] => {
    const articlesMap = new Map<string, Article>();
    currentArticles.forEach((article) => {
      articlesMap.set(article.id, article);
    });
    newArticles.forEach((article) => {
      articlesMap.set(article.id, article);
    });
    return Array.from(articlesMap.values()).sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      const params = new URLSearchParams(window.location.search);
      if (searchQuery) {
        params.set("search", searchQuery);
      } else {
        params.delete("search");
      }
      const newPath = `/articles${params.toString() ? `?${params.toString()}` : ""}`;
      router.push(newPath, { scroll: false });
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchQuery, router]);

  useEffect(() => {
    const initialSearch = searchParams?.get("search") || "";
    if (debouncedSearchQuery !== initialSearch) {
      setArticles([]);
      setPage(1);
      setHasMore(true);
      setLoading(true);
    }
  }, [debouncedSearchQuery, searchParams]);

  useEffect(() => {
    const initialSearch = searchParams?.get("search") || "";
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
        setLoading(true);
        if (page === 1) {
          setSearchLoading(true);
        }

        const result = await fetchArticles({
          page,
          searchQuery: debouncedSearchQuery,
          limit: 9,
        });

        if (!result || !result.articles) {
          setHasMore(false);
          setError("No articles found");
          return;
        }

        if (page === 1) {
          setArticles(result.articles);
        } else {
          setArticles((prevArticles) =>
            mergeArticles(prevArticles, result.articles)
          );
        }

        setHasMore(result.hasMore);
        setError(null);
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
  }, [page, debouncedSearchQuery, hasMore, articles.length, searchParams]);

  useEffect(() => {
    if (inView && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, loading, hasMore]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const retryLoading = () => {
    setError(null);
    setPage(1);
    setHasMore(true);
    setLoading(true);
  };

  useEffect(() => {
    const animatedArticles = new Set();
    const animateNewArticles = () => {
      document.querySelectorAll(".article-card").forEach((element, index) => {
        if (element instanceof HTMLElement && !animatedArticles.has(element)) {
          animatedArticles.add(element);
          const delay = (index % 9) * 100;
          setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          }, delay);
        }
      });
    };
    animateNewArticles();
  }, [articles]);

  return {
    articles,
    loading,
    error,
    hasMore,
    searchQuery,
    debouncedSearchQuery,
    searchLoading,
    isSearchFocused,
    setIsSearchFocused,
    infiniteScrollRef: ref,
    handleSearchChange,
    clearSearch,
    retryLoading,
  };
}
