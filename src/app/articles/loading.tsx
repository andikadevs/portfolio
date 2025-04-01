import React from "react";

export default function Loading() {
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
            {/* Title skeleton */}
            <div className="h-12 w-48 bg-foreground/10 rounded-lg mx-auto mb-6 animate-pulse" />

            {/* Description skeleton */}
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="h-6 w-3/4 bg-foreground/10 rounded-md mx-auto animate-pulse" />
              <div className="h-6 w-2/3 bg-foreground/10 rounded-md mx-auto animate-pulse" />
            </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg bg-foreground/5 border border-foreground/10 shadow-sm animate-pulse"
              >
                {/* Image skeleton */}
                <div className="h-48 w-full bg-foreground/10 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
                </div>

                {/* Content skeleton */}
                <div className="p-5 space-y-3">
                  {/* Title */}
                  <div className="h-6 w-3/4 bg-foreground/10 rounded-md relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-foreground/10 rounded-md relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
                    </div>
                    <div className="h-4 w-full bg-foreground/10 rounded-md relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
                    </div>
                    <div className="h-4 w-2/3 bg-foreground/10 rounded-md relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="h-4 w-1/3 bg-foreground/10 rounded-md relative overflow-hidden mt-4">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
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
