"use client";

import { useHomeAnimations } from "@/hooks/use-home-animations";
import { Hero, About, Education, Experience, Skills } from "@/sections";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";

export function HomeClient() {
  useHomeAnimations();

  return (
    <>
      {/* Scroll progress bar — amber tape strip at viewport top */}
      <div
        id="gsap-progress-bar"
        className="fixed top-0 left-0 right-0 z-[9999] h-[3px] origin-left scale-x-0"
        style={{ background: "var(--tape-yellow)", pointerEvents: "none" }}
      />

      <div className="bg-background relative text-text max-w-7xl px-4 md:px-12 mx-auto">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />

        <div className="gsap-cta flex flex-col items-center gap-4 py-16">
          <p
            className="font-caveat text-2xl text-text/60"
            style={{ transform: "rotate(-1deg)" }}
          >
            want to see more?
          </p>
          <Button href="/portfolio" variant="primary" icon={<IconArrowRight />}>
            View My Portfolio
          </Button>
        </div>
      </div>
    </>
  );
}
