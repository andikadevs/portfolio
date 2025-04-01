"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertTriangle className="w-16 h-16 text-accent mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Article Error</h1>
          <p className="text-text/70 max-w-md mb-6">
            We encountered an error while trying to load this article. Please
            try again or return to the articles list.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button
              onClick={reset}
              icon={<AlertTriangle className="w-4 h-4" />}
            >
              Try again
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push("/articles")}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
