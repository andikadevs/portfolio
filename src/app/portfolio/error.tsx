"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Portfolio page error:", error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center backdrop-blur-md bg-background/50 dark:bg-dark/50">
      <div className="p-8 max-w-md rounded-xl bg-foreground dark:bg-foreground shadow-xl border border-[var(--accent)] animate-gradient">
        <div className="w-16 h-16 mx-auto mb-6 text-[var(--accent)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-text text-center mb-3">Oops!</h2>
        <p className="text-text text-center mb-6">
          Unable to load portfolio projects. Please try again later.
        </p>
        <button
          onClick={() => reset()}
          className="w-full py-2.5 px-4 bg-background dark:bg-dark hover:bg-[var(--accent)] text-text hover:text-background dark:hover:text-dark border border-[var(--accent)] font-medium rounded-lg transition-colors duration-300 focus:outline-none"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
