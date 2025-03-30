"use client";

import { useRef } from "react";
import { Timeline } from "@/components/ui";
import { experienceData } from "./Data";

export const Experience = () => {
  const ref = useRef(null);

  return (
    <section
      id="experience"
      className="py-20 sm:py-28 relative overflow-hidden bg-[var(--background)]"
    >
      <div className="px-4 lg:px-20">
        <div ref={ref} className="mb-4 text-center animate-fadeIn">
          <h2 className="text-3xl sm:text-3xl font-bold mb-3 sm:mb-4 text-[var(--text)]">
            My Experience
          </h2>
          <p className="text-base sm:text-lg text-[var(--text)] max-w-2xl mx-auto">
            Professional experience and achievements that I&apos;ve made
          </p>
        </div>

        <Timeline data={experienceData} />
      </div>
    </section>
  );
};
