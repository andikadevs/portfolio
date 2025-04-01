"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";

export default function ArticleNotFound() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-8xl italic font-bold mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
        <p className="text-text/70 mb-8">
          The article you are looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Button
          onClick={() => router.push("/articles")}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Back to Articles
        </Button>
      </div>
    </div>
  );
}
