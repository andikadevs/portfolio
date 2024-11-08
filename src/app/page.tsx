import { Suspense } from "react";
import { Navbar, Progress, Facts, Footer, Loader } from "@/components/Global";
import {
  About,
  Certificate,
  Companies,
  Education,
  Experience,
  Hero,
  Portfolio,
  Skills,
} from "@/sections/Home";

export default function Home() {
  return (
    <Suspense fallback={<Loader />}>
      <main className="bg-main relative">
        <Progress />
        <Navbar />
        <Facts />

        {/* Contents */}
        <Hero />
        <About />
        <Companies />
        <Skills />
        <Education />
        <Experience />
        <Portfolio />
        <Certificate />

        <Footer />
      </main>
    </Suspense>
  );
}
