"use client";

import { useRef } from "react";
import { Timeline } from "@/components/ui";
import { experienceData } from "./Data";

export const Experience = () => {
  const ref = useRef(null);

  return (
    <section id="experience" className="py-20 sm:py-28 relative">
      <div ref={ref}>
        <div className="mb-8 text-center">
          <h2
            className="gsap-section-title font-caveat text-4xl sm:text-5xl font-bold mb-3 text-text"
            style={{ opacity: 0 }}
          >
            My Experience
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div
              className="gsap-tape-strip h-3 w-20 rounded-sm"
              style={{ background: "var(--tape-blue)", transform: "rotate(-0.5deg)", opacity: 0 }}
            />
            <div
              className="gsap-tape-strip h-3 w-12 rounded-sm"
              style={{ background: "var(--tape-yellow)", transform: "rotate(0.5deg)", opacity: 0 }}
            />
          </div>
          <p className="text-base sm:text-lg text-text/70 max-w-2xl mx-auto">
            Professional experience and achievements that I&apos;ve made
          </p>
        </div>

        <Timeline data={experienceData} itemClassName="gsap-timeline-item" />
      </div>
    </section>
  );
};
