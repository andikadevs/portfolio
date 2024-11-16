/** @format */

import { Navbar, Footer } from "@/components/Global";

export default function ArticleLoading() {
  return (
    <main className="bg-main min-h-screen">
      <Navbar />

      <article className="container mx-auto px-4 py-12 md:py-24 max-w-4xl text-gray-300">
        {/* Hero Image Skeleton */}
        <div className="w-full h-[300px] md:h-[500px] bg-secondary rounded-xl mb-3 animate-pulse" />

        <div className="prose prose-lg prose-invert mx-auto">
          {/* Image Attribution and Date Skeleton */}
          <div className="flex justify-between items-center mb-10 text-sm">
            <div className="h-4 bg-secondary rounded w-48 animate-pulse" />
            <div className="h-4 bg-secondary rounded w-32 animate-pulse" />
          </div>

          {/* Title Skeleton */}
          <div className="h-12 bg-secondary rounded w-3/4 animate-pulse mb-6" />

          {/* Description Skeleton */}
          <div className="h-24 bg-secondary rounded w-full animate-pulse mb-12" />

          {/* Content Skeleton */}
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-secondary rounded w-full animate-pulse" />
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
