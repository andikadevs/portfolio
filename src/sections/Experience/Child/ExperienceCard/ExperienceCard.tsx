import React from "react";
import { motion } from "framer-motion";

export const ExperienceCard = ({
  title,
  content,
  date,
  technologies,
}: {
  title: string;
  content: string;
  date: string;
  technologies: string[];
}) => {
  return (
    <div className="relative overflow-hidden bg-[var(--foreground)] hover:shadow-xl hover:scale-[1.02] transition-all duration-150 ease-out p-6 rounded-lg">
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
          <p className="text-[var(--text)] font-medium">{title}</p>
          <p className="text-[var(--accent)] text-sm">{date}</p>
        </div>
        <p className="text-[var(--text)] mb-4">{content}</p>
        <div className="mt-4">
          <p className="text-xs uppercase tracking-wider text-[var(--text)] mb-2">
            KEY TECHNOLOGIES
          </p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 cursor-pointer bg-[var(--background)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-[var(--background)] hover:scale-105 transition-all duration-100 ease-out rounded-md text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
