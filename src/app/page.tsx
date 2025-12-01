import { Button } from "@/components/ui/Button";
import { Hero, About, Education, Experience, Skills } from "@/sections";
import { IconArrowRight } from "@tabler/icons-react";
import type { Metadata } from "next";
import {
  generatePersonSchema,
  generateWebsiteSchema,
} from "@/lib/structuredData";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Home | Andika Dwi Saputra - Fullstack Developer",
  description:
    "Professional portfolio of Andika Dwi Saputra, a fullstack developer specializing in Next.js, React, Laravel, and modern web technologies.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Home | Andika Dwi Saputra - Fullstack Developer",
    description:
      "Professional portfolio of Andika Dwi Saputra, a fullstack developer specializing in Next.js, React, Laravel, and modern web technologies.",
  },
};

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://andikads.cloud";
  const personSchema = generatePersonSchema(baseUrl);
  const websiteSchema = generateWebsiteSchema(baseUrl);

  return (
    <div className="bg-background relative text-text max-w-7xl px-12 mx-auto">
      {/* Structured Data for Person */}
      <Script
        id="person-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Structured Data for Website */}
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <div className="flex justify-center py-16">
        <Button href="/portfolio" variant="primary" icon={<IconArrowRight />}>
          View My Portfolio
        </Button>
      </div>
    </div>
  );
}
