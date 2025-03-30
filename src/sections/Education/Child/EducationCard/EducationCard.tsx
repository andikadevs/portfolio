import React from "react";
import { motion } from "framer-motion";

export const EducationCard = ({
  institution,
  degree,
  date,
  description,
}: {
  institution: string;
  degree: string;
  date: string;
  description: string;
}) => {
  return (
    <div className="relative overflow-hidden bg-[var(--foreground)] hover:shadow-xl transition-all duration-150 ease-out p-6 rounded-lg">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-light)] to-transparent opacity-0"
        animate={{
          opacity: [0, 0.05, 0],
          x: ["-100%", "100%", "100%"],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <div className="relative z-10 animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
          <p className="text-[var(--text)] font-medium">{institution}</p>
          <p className="text-[var(--accent)] text-sm">{date}</p>
        </div>
        <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
          {degree}
        </h3>
        <p className="text-[var(--text)] mb-4">{description}</p>
      </div>
    </div>
  );
};
