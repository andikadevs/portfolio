import type { Metadata } from "next";
import {
  generatePersonSchema,
  generateWebsiteSchema,
} from "@/lib/structured-data";
import Script from "next/script";
import { HomeClient } from "./home-client";

export const metadata: Metadata = {
  title: "Home | Andika Dwi Saputra - Fullstack Developer",
  description:
    "Professional portfolio of Andika Dwi Saputra, a fullstack developer specializing in Next.js, React, Laravel, and modern web technologies.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Home | Andika Dwi Saputra - Fullstack Developer",
    description:
      "Professional portfolio of Andika Dwi Saputra, a fullstack developer specializing in Next.js, React, Laravel, and modern web technologies.",
  },
};

export default function Home() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://andikads.vercel.app";
  const personSchema = generatePersonSchema(baseUrl);
  const websiteSchema = generateWebsiteSchema(baseUrl);

  return (
    <>
      <Script
        id="person-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeClient />
    </>
  );
}
