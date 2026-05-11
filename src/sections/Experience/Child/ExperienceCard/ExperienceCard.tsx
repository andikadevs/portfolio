import React from "react";
import { motion } from "motion/react";

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
    <div
      className="relative overflow-hidden p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: "var(--paper)",
        border: "1px solid rgba(184,151,106,0.40)",
        boxShadow: "2px 3px 10px rgba(36,22,16,0.10)",
        backgroundImage:
          "repeating-linear-gradient(transparent, transparent 27px, rgba(184,151,106,0.13) 27px, rgba(184,151,106,0.13) 28px)",
        backgroundSize: "100% 28px",
        backgroundPositionY: "14px",
      }}
    >
      {/* Left margin line */}
      <div
        className="absolute left-10 top-0 bottom-0 w-px opacity-50"
        style={{ background: "var(--tape-blue)" }}
      />

      <div className="pl-5 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
          <p className="font-caveat text-xl font-bold text-text">{title}</p>
          <span
            className="font-mono text-[11px] px-2 py-1 rounded-sm whitespace-nowrap self-start"
            style={{
              background: "var(--foreground)",
              border: "1px solid rgba(184,151,106,0.35)",
              color: "var(--accent)",
            }}
          >
            {date}
          </span>
        </div>

        <p className="text-text/75 text-sm leading-relaxed mb-4">{content}</p>

        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {technologies.map((skill, idx) => (
              <motion.span
                key={idx}
                whileHover={{ y: -2 }}
                className="font-mono text-xs px-2.5 py-1 rounded-sm cursor-default"
                style={{
                  background: "var(--foreground)",
                  color: "var(--text)",
                  border: "1px solid var(--kraft)",
                  opacity: 0.9,
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
