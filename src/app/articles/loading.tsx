/** @format */

import { Navbar, Footer } from "@/components/Global";

export default function Loading() {
  return (
    <main className="bg-main min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-24">
        {/* Profile Section Skeleton */}
        <div className="max-w-4xl mx-auto mb-8 flex items-center gap-4 bg-secondary p-6 rounded-xl">
          <div className="w-16 h-16 rounded-full bg-dark animate-pulse"></div>
          <div className="flex-1">
            <div className="h-6 bg-dark rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-dark rounded w-32 animate-pulse"></div>
          </div>
        </div>

        {/* Title Section Skeleton */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="h-12 bg-secondary rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-secondary rounded w-96 mx-auto mb-8 animate-pulse"></div>
          
          {/* Search Bar Skeleton */}
          <div className="relative mb-12">
            <div className="w-full h-14 rounded-full bg-secondary animate-pulse"></div>
          </div>
        </div>

        {/* Articles Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              className="bg-secondary rounded-xl overflow-hidden shadow-lg flex flex-col"
            >
              <div className="h-48 md:h-56 bg-dark animate-pulse"></div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="h-8 bg-dark rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-4 bg-dark rounded w-full mb-2 animate-pulse"></div>
                <div className="mt-auto pt-4 border-t border-text/10 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-dark animate-pulse"></div>
                    <div className="h-4 bg-dark rounded w-32 animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-dark rounded w-24 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
