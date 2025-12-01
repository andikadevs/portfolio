"use client";

import { useRef } from "react";
import { Timeline } from "@/components/ui";
import { educationData } from "./Data";

export const Education = () => {
  const ref = useRef(null);

  return (
    <section
      id="education"
      className="py-20 sm:py-28 relative overflow-hidden bg-[var(--background)]"
    >
      <div>
        <div ref={ref} className="mb-4 text-center animate-fadeIn">
          <h2 className="text-3xl sm:text-3xl font-bold mb-3 sm:mb-4 text-[var(--text)]">
            My Education
          </h2>
          <p className="text-base sm:text-lg text-[var(--text)] max-w-2xl mx-auto">
            Academic background and educational achievements
          </p>
        </div>

        <Timeline data={educationData} position="right" />
      </div>
    </section>
  );
};
