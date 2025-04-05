import React from "react";

export default function Loading() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full pt-16 pb-24 md:pt-32 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-screen-xl mx-auto text-center">
            {/* Category tag skeleton */}
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-6 w-20 bg-[var(--foreground)] rounded-full animate-pulse opacity-70"
                />
              ))}
            </div>

            {/* Title skeleton */}
            <div className="space-y-3 mb-6">
              <div className="h-12 w-3/4 bg-[var(--foreground)] rounded-lg mx-auto animate-pulse" />
              <div className="h-12 w-1/2 bg-[var(--foreground)] rounded-lg mx-auto animate-pulse" />
            </div>

            {/* Meta info skeleton */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-[var(--foreground)] rounded-full animate-pulse" />
                <div className="h-4 w-24 bg-[var(--foreground)] rounded-md animate-pulse" />
              </div>
              <div className="h-4 w-px bg-[var(--foreground)]" />
              <div className="h-4 w-20 bg-[var(--foreground)] rounded-md animate-pulse" />
            </div>

            {/* Description skeleton */}
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="h-6 w-full bg-[var(--foreground)] rounded-md mx-auto animate-pulse opacity-90" />
              <div className="h-6 w-5/6 bg-[var(--foreground)] rounded-md mx-auto animate-pulse opacity-80" />
              <div className="h-6 w-4/5 bg-[var(--foreground)] rounded-md mx-auto animate-pulse opacity-70" />
            </div>

            {/* Animated arrow down */}
            <div className="animate-bounce inline-block mt-8">
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
      <div className="container mx-auto px-4 -mt-6 md:-mt-24 relative z-20 mb-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg bg-[var(--background)] border border-[var(--foreground)] shadow-sm group hover:border-[var(--accent)] transition-colors"
              >
                {/* Image skeleton */}
                <div className="h-48 w-full bg-[var(--foreground)] relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-[var(--foreground)] to-transparent" />
                </div>

                {/* Content skeleton */}
                <div className="p-5 space-y-4">
                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-6 w-16 bg-[var(--foreground)] rounded-full animate-pulse opacity-70"
                      />
                    ))}
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <div className="h-6 w-5/6 bg-[var(--foreground)] rounded-md animate-pulse" />
                    <div className="h-6 w-4/6 bg-[var(--foreground)] rounded-md animate-pulse" />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-[var(--foreground)] rounded-md animate-pulse opacity-80" />
                    <div className="h-4 w-full bg-[var(--foreground)] rounded-md animate-pulse opacity-70" />
                    <div className="h-4 w-2/3 bg-[var(--foreground)] rounded-md animate-pulse opacity-60" />
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center justify-between pt-2">
                    {/* Author */}
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 bg-[var(--foreground)] rounded-full animate-pulse" />
                      <div className="h-4 w-20 bg-[var(--foreground)] rounded-md animate-pulse" />
                    </div>
                    {/* Date */}
                    <div className="h-4 w-24 bg-[var(--foreground)] rounded-md animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
