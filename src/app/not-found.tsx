import { Button } from "@/components/ui";
import { IconHome } from "@tabler/icons-react";

export default function NotFound() {

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 bg-[var(--background)] relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-8xl md:text-9xl font-bold text-[var(--accent)] mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-4">
          Page Not Found
        </h2>
        <p className="text-[var(--text)]/70 max-w-md mx-auto mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="flex w-full justify-center">
          <Button
            href="/"
            variant="primary"
            icon={<IconHome className="w-4 h-4" />}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
