import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Parallax Section Loading */}
      <section className="py-0">
        <div className="container mx-auto px-4 pt-16 pb-24 md:pt-32 md:pb-32">
          <div className="max-w-screen-xl mx-auto">
            {/* Header Loading */}
            <div className="space-y-4 mb-12 text-center">
              <div className="h-12 w-3/4 bg-[var(--foreground)] rounded-lg mx-auto animate-pulse" />
              <div className="h-12 w-1/2 bg-[var(--foreground)] rounded-lg mx-auto animate-pulse" />
              <div className="h-24 w-2/3 bg-[var(--foreground)] rounded-lg mx-auto animate-pulse opacity-70" />
            </div>

            {/* Projects Grid Loading */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg bg-[var(--foreground)] aspect-video animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Section Loading */}
      <section className="pt-16 md:pt-24">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <div className="h-10 w-64 bg-[var(--foreground)] rounded-lg mx-auto animate-pulse mb-4" />
            <div className="h-6 w-96 max-w-full bg-[var(--foreground)] rounded-lg mx-auto animate-pulse" />
          </div>

          <div className="p-6 md:p-10 rounded-3xl">
            {/* Swiper Card Loading */}
            <div className="relative overflow-hidden rounded-2xl bg-[var(--foreground)] aspect-[16/9] animate-pulse">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Loading */}
      <section>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-3/4 bg-[var(--foreground)] rounded-lg mx-auto" />
              <div className="h-4 w-1/2 bg-[var(--foreground)] rounded-lg mx-auto" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
