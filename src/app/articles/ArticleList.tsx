"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { FaRobot, FaSpinner } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from "lodash.debounce";
import { supabase } from "@/utils/Global";

const ITEMS_PER_PAGE = 9;

export default function ArticlesList({
  initialArticles,
}: {
  initialArticles: any[];
}) {
  const [articles, setArticles] = useState(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      setIsSearching(true);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .ilike("title", `%${query}%`)
        .order("created_at", { ascending: false })
        .range(0, ITEMS_PER_PAGE - 1);

      if (!error && data) {
        setArticles(data);
        setPage(1);
        setHasMore(data.length === ITEMS_PER_PAGE);
      }
      setIsSearching(false);
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Load more articles
  const loadMore = async () => {
    if (isSearching) return;

    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE - 1;

    const query = supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false })
      .range(start, end);

    if (searchQuery) {
      query.ilike("title", `%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (!error && data) {
      setArticles((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
      setHasMore(data.length === ITEMS_PER_PAGE);
    }
  };

  return (
    <>
      <div className="relative max-w-4xl mx-auto mb-8 flex items-center gap-4 bg-secondary p-6 rounded-xl">
        <img
          src="/assets/static/img/formal.webp"
          alt="Andika Dwi Saputra"
          className="w-16 h-16 rounded-full object-cover object-[center_30%] border-2 border-accent shrink-0"
        />
        <div>
          <h2 className="text-xl font-semibold text-text">
            Andika Dwi Saputra
          </h2>
          <p className="text-accent">Software Engineer | AI Enthusiast</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-12 relative">
        <h1 className="text-5xl font-bold mb-2 text-text text-center">
          Articles
        </h1>
        <p className="text-center text-text mb-8">
          This is a collection of articles that created by my{" "}
          <span className="text-accent">AI Assistant</span>
        </p>

        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-6 py-4 rounded-full bg-secondary text-text placeholder-text/50 focus:outline-none focus:ring-2 focus:ring-accent shadow-md"
          />
          <svg
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <InfiniteScroll
        dataLength={articles.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="text-center flex items-center justify-center my-4 text-text">
            <FaSpinner className="animate-spin inline-block mr-2" size={20} />
            Loading more articles...
          </div>
        }
        endMessage={
          <div className="text-center py-4 text-text">
            {articles.length === 0 ? "No articles found" : ""}
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-0 md:px-4">
          {articles.map((article: any) => (
            <article
              key={article.id}
              className="relative bg-secondary rounded-xl overflow-hidden shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl flex flex-col"
            >
              <div className="relative h-48 md:h-56">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-full object-cover object-[center_30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <Link href={`/articles/${article.slug}`} className="group">
                  <h2 className="text-xl md:text-2xl font-semibold mb-3 text-text group-hover:text-accent transition-colors line-clamp-3">
                    {article.title}
                  </h2>
                </Link>
                <div className="mt-auto pt-4 border-t border-text/10 flex justify-between items-center text-sm text-text/70">
                  <div className="flex items-center gap-2 text-gray-400">
                    <FaRobot size={24} className="mt-[-4px]" />
                    <span>By Andika`s AI Assistant</span>
                  </div>
                  <time className="text-gray-400">
                    {new Date(article.created_at).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
