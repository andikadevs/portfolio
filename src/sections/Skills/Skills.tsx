"use client";

import { motion } from "motion/react";
import { Marquee } from "@/components/ui";
import Image from "next/image";

export const Skills = () => {
  const skillCategories = [
    {
      name: "Frontend",
      tape: "var(--tape-yellow)",
      skills: [
        { name: "React", icon: "/static/Icons/react.svg", level: 95 },
        { name: "Next.js", icon: "/static/Icons/next.svg", level: 90 },
        { name: "TypeScript", icon: "/static/Icons/typescript.svg", level: 85 },
        { name: "TailwindCSS", icon: "/static/Icons/tailwind.svg", level: 95 },
        { name: "JavaScript", icon: "/static/Icons/javascript.svg", level: 90 },
        { name: "HTML", icon: "/static/Icons/html.svg", level: 95 },
        { name: "CSS", icon: "/static/Icons/css.svg", level: 95 },
        { name: "Material UI", icon: "/static/Icons/material-ui.svg", level: 85 },
        { name: "Chakra UI", icon: "/static/Icons/chakra.svg", level: 80 },
        { name: "Bootstrap", icon: "/static/Icons/bootstrap.svg", level: 90 },
      ],
    },
    {
      name: "Backend",
      tape: "var(--tape-blue)",
      skills: [
        { name: "Node.js", icon: "/static/Icons/nodejs.svg", level: 85 },
        { name: "Express", icon: "/static/Icons/express.svg", level: 80 },
        { name: "PHP", icon: "/static/Icons/php.svg", level: 75 },
        { name: "Laravel", icon: "/static/Icons/laravel.svg", level: 70 },
        { name: "MySQL", icon: "/static/Icons/mysql.svg", level: 80 },
        { name: "SQL Server", icon: "/static/Icons/sql-server.svg", level: 75 },
        { name: "Alpine.js", icon: "/static/Icons/alpinejs.svg", level: 70 },
        { name: "Livewire", icon: "/static/Icons/livewire.svg", level: 65 },
        { name: ".NET", icon: "/static/Icons/net.svg", level: 60 },
        { name: "C#", icon: "/static/Icons/csharp.svg", level: 65 },
      ],
    },
    {
      name: "Tools & Other",
      tape: "var(--tape-pink)",
      skills: [
        { name: "Git", icon: "/static/Icons/git.svg", level: 85 },
        { name: "GitHub", icon: "/static/Icons/github.svg", level: 85 },
        { name: "Docker", icon: "/static/Icons/docker.svg", level: 70 },
        { name: "Linux", icon: "/static/Icons/linux.svg", level: 75 },
        { name: "Nginx", icon: "/static/Icons/nginx.svg", level: 65 },
        { name: "Apache", icon: "/static/Icons/apache.svg", level: 70 },
        { name: "Figma", icon: "/static/Icons/figma.svg", level: 80 },
        { name: "Photoshop", icon: "/static/Icons/photoshop.svg", level: 75 },
        { name: "Canva", icon: "/static/Icons/canva.svg", level: 90 },
        { name: "Unity", icon: "/static/Icons/unity.svg", level: 60 },
      ],
    },
  ];

  const renderSkillItem = (
    skill: { name: string; icon: string; level: number },
    tape: string
  ) => (
    <div
      className="flex flex-col items-center justify-center p-3 gap-2 w-24 h-28 cursor-default group relative"
      style={{
        background: "var(--paper)",
        border: "1px solid rgba(196,167,125,0.35)",
        boxShadow: "1px 2px 5px rgba(44,24,16,0.10)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg) translateY(-3px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "2px 4px 10px rgba(44,24,16,0.16)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "1px 2px 5px rgba(44,24,16,0.10)";
      }}
    >
      {/* Tape top */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-10 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: tape }}
      />

      <div className="relative w-10 h-10 flex items-center justify-center">
        <Image
          src={skill.icon}
          alt={skill.name}
          width={36}
          height={36}
          className="object-contain"
        />
      </div>

      <span className="text-xs font-medium text-center text-text/80 leading-tight">
        {skill.name}
      </span>

      {/* Progress bar — hand-drawn style */}
      <div
        className="w-14 h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(196,167,125,0.25)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${skill.level}%`,
            background: "var(--accent)",
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="container mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14 sm:mb-18"
        >
          <h2 className="font-caveat text-4xl sm:text-5xl font-bold mb-3 text-text">
            Technical Skills
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-3 w-16 rounded-sm" style={{ background: "var(--tape-yellow)", transform: "rotate(-0.5deg)" }} />
            <div className="h-3 w-10 rounded-sm" style={{ background: "var(--tape-blue)", transform: "rotate(0.5deg)" }} />
          </div>
          <p className="text-base sm:text-lg text-text/70">
            A comprehensive overview of my technical expertise across various technologies.
          </p>
        </motion.div>

        {/* Skill category marquees */}
        <div className="space-y-14 sm:space-y-18">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="flex items-center justify-center gap-3"
              >
                {/* Tape tab as category label */}
                <div
                  className="px-4 py-1 font-caveat text-xl font-semibold text-text/80 rounded-sm"
                  style={{
                    background: category.tape,
                    transform: `rotate(${categoryIndex % 2 === 0 ? -0.5 : 0.5}deg)`,
                  }}
                >
                  {category.name}
                </div>
              </motion.div>

              <Marquee
                items={category.skills}
                direction={categoryIndex % 2 === 0 ? "left" : "right"}
                speed={categoryIndex === 0 ? "fast" : categoryIndex === 1 ? "normal" : "slow"}
                pauseOnHover={true}
                renderItem={(skill) => renderSkillItem(skill, category.tape)}
                className="py-4"
                itemClassName="mx-3"
              />
            </div>
          ))}
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 sm:mt-20 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div
              className="px-4 py-1 font-caveat text-xl font-semibold text-text/80 rounded-sm"
              style={{ background: "var(--tape-yellow)", transform: "rotate(-0.5deg)" }}
            >
              Languages
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {[
              { name: "English", level: "Professional" },
              { name: "Indonesian", level: "Native" },
              { name: "Javanese", level: "Native" },
              { name: "Japanese", level: "Basic" },
            ].map((language, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-4 text-center relative"
                style={{
                  background: "var(--paper)",
                  border: "1px solid rgba(196,167,125,0.35)",
                  boxShadow: "2px 3px 8px rgba(44,24,16,0.10)",
                  transform: `rotate(${[-1, 0.8, -0.5, 1.2][index]}deg)`,
                }}
              >
                {/* Push pin */}
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full shadow-sm"
                  style={{ background: "radial-gradient(circle at 40% 40%, #E08080, #C03030)" }}
                />
                <h4 className="font-caveat font-bold text-lg text-text mb-1">{language.name}</h4>
                <p className="text-xs text-text/60 font-medium uppercase tracking-wide">{language.level}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
