"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Timeline } from "@/components/ui";
import { educationData } from "./Data";

export const Education = () => {
  const ref = useRef(null);

  return (
    <section
      id="education"
      className="py-20 sm:py-28 relative overflow-hidden"
    >
      <div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="font-caveat text-4xl sm:text-5xl font-bold mb-3 text-text">
            My Education
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div
              className="h-3 w-16 rounded-sm"
              style={{ background: "var(--tape-pink)", transform: "rotate(-0.5deg)" }}
            />
            <div
              className="h-3 w-10 rounded-sm"
              style={{ background: "var(--tape-blue)", transform: "rotate(0.5deg)" }}
            />
          </div>
          <p className="text-base sm:text-lg text-text/70 max-w-2xl mx-auto">
            Academic background and educational achievements
          </p>
        </motion.div>

        <Timeline data={educationData} position="right" />
      </div>
    </section>
  );
};
