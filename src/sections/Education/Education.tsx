"use client";

import { useRef } from "react";
import { Timeline } from "@/components/ui";
import { educationData } from "./Data";

export const Education = () => {
  const ref = useRef(null);

  return (
    <section id="education" className="py-20 sm:py-28 relative">
      <div ref={ref}>
        <div className="mb-8 text-center">
          <h2
            className="gsap-section-title font-caveat text-4xl sm:text-5xl font-bold mb-3 text-text"
            style={{ opacity: 0 }}
          >
            My Education
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div
              className="gsap-tape-strip h-3 w-16 rounded-sm"
              style={{ background: "var(--tape-pink)", transform: "rotate(-0.5deg)", opacity: 0 }}
            />
            <div
              className="gsap-tape-strip h-3 w-10 rounded-sm"
              style={{ background: "var(--tape-blue)", transform: "rotate(0.5deg)", opacity: 0 }}
            />
          </div>
          <p className="text-base sm:text-lg text-text/70 max-w-2xl mx-auto">
            Academic background and educational achievements
          </p>
        </div>

        <Timeline data={educationData} position="right" itemClassName="gsap-timeline-item" />
      </div>
    </section>
  );
};
