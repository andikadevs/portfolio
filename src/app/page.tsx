import { Button } from "@/components/ui/Button";
import { Hero, About, Education, Experience, Skills } from "@/sections";
import { IconArrowRight } from "@tabler/icons-react";
import type { Metadata } from "next";

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
  return (
    <div className="bg-background relative text-text">
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
