"use client";

import { Button } from "@/components/ui";
import { IconAlertTriangle, IconRefresh } from "@tabler/icons-react";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="container min-h-screen mx-auto flex items-center justify-center px-4 py-24">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <IconAlertTriangle className="w-16 h-16 text-accent mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Something went wrong!
          </h1>
          <p className="text-text/70 max-w-md mb-6">
            We encountered an error while trying to load the portfolio. Please
            try again or come back later.
          </p>
          <Button onClick={reset} icon={<IconRefresh className="w-4 h-4" />}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
