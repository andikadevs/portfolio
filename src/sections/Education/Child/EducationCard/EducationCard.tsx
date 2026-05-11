import React from "react";

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
    <div
      className="relative overflow-hidden p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: "var(--paper)",
        border: "1px solid rgba(196,167,125,0.40)",
        boxShadow: "2px 3px 10px rgba(44,24,16,0.10)",
        backgroundImage:
          "repeating-linear-gradient(transparent, transparent 27px, rgba(196,167,125,0.14) 27px, rgba(196,167,125,0.14) 28px)",
        backgroundSize: "100% 28px",
        backgroundPositionY: "14px",
      }}
    >
      {/* Red margin line */}
      <div
        className="absolute left-10 top-0 bottom-0 w-px"
        style={{ background: "var(--tape-pink)", opacity: 0.55 }}
      />

      <div className="pl-5 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
          <p className="font-caveat text-xl font-bold text-text">{institution}</p>
          <span
            className="font-mono text-[11px] px-2 py-1 rounded-sm whitespace-nowrap self-start"
            style={{
              background: "var(--foreground)",
              border: "1px solid rgba(196,167,125,0.35)",
              color: "var(--accent)",
            }}
          >
            # {date}
          </span>
        </div>
        <h3 className="font-caveat text-lg font-semibold text-accent mb-2">{degree}</h3>
        <p className="text-text/75 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
