"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertTriangle className="w-16 h-16 text-accent mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Something went wrong!
          </h1>
          <p className="text-text/70 max-w-md mb-6">
            We encountered an error while trying to load the articles. Please
            try again or come back later.
          </p>
          <Button onClick={reset} icon={<RefreshCw className="w-4 h-4" />}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
