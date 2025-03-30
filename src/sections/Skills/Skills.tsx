"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { Marquee } from "@/components/ui";
import Image from "next/image";

export const Skills = () => {
  // Reference for scroll animation
  const ref = useRef(null);

  // Skills data grouped by categories with icon paths
  const skillCategories = [
    {
      name: "Frontend",
      skills: [
        { name: "React", icon: "/static/Icons/react.svg", level: 95 },
        { name: "Next.js", icon: "/static/Icons/next.svg", level: 90 },
        { name: "TypeScript", icon: "/static/Icons/typescript.svg", level: 85 },
        { name: "TailwindCSS", icon: "/static/Icons/tailwind.svg", level: 95 },
        { name: "JavaScript", icon: "/static/Icons/javascript.svg", level: 90 },
        { name: "HTML", icon: "/static/Icons/html.svg", level: 95 },
        { name: "CSS", icon: "/static/Icons/css.svg", level: 95 },
        {
          name: "Material UI",
          icon: "/static/Icons/material-ui.svg",
          level: 85,
        },
        { name: "Chakra UI", icon: "/static/Icons/chakra.svg", level: 80 },
        { name: "Bootstrap", icon: "/static/Icons/bootstrap.svg", level: 90 },
      ],
    },
    {
      name: "Backend",
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

  // Custom render function for the infinite scroll items
  const renderSkillItem = (skill: {
    name: string;
    icon: string;
    level: number;
  }) => (
    <div className="flex flex-col items-center justify-center p-4 gap-2 bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-xl w-24 h-28 transition-all hover:scale-110 hover:bg-foreground/10 group">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <Image
          src={skill.icon}
          alt={skill.name}
          width={40}
          height={40}
          className="object-contain group-hover:scale-110 transition-transform"
        />
      </div>
      <span className="text-xs font-medium text-center">{skill.name}</span>
      <div className="w-16 h-1 bg-foreground/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 relative overflow-hidden bg-background"
    >
      <div className="container mx-auto px-4 lg:px-[34px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-3xl font-bold mb-3 sm:mb-4 text-[var(--text)]">
            Technical Skills
          </h2>
          <p className="text-base sm:text-lg text-text/80">
            A comprehensive overview of my technical expertise and proficiency
            across various technologies and tools.
          </p>
        </motion.div>

        {/* Skills infinite scrollers */}
        <div ref={ref} className="space-y-16 sm:space-y-20">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="text-2xl sm:text-3xl font-bold text-center flex items-center justify-center gap-2"
              >
                {category.name === "Frontend" && (
                  <div className="flex items-center gap-1">
                    <Image
                      src="/static/Icons/html.svg"
                      alt="HTML Icon"
                      width={22}
                      height={22}
                      className="inline-block"
                    />
                    <Image
                      src="/static/Icons/css.svg"
                      alt="CSS Icon"
                      width={22}
                      height={22}
                      className="inline-block"
                    />
                    <Image
                      src="/static/Icons/javascript.svg"
                      alt="JavaScript Icon"
                      width={22}
                      height={22}
                      className="inline-block"
                    />
                  </div>
                )}
                {category.name === "Backend" && (
                  <div className="flex items-center gap-1">
                    <Image
                      src="/static/Icons/nodejs.svg"
                      alt="Node.js Icon"
                      width={22}
                      height={22}
                      className="inline-block"
                    />
                    <Image
                      src="/static/Icons/php.svg"
                      alt="PHP Icon"
                      width={22}
                      height={22}
                      className="inline-block"
                    />
                    <Image
                      src="/static/Icons/mysql.svg"
                      alt="Database Icon"
                      width={22}
                      height={22}
                      className="inline-block"
                    />
                  </div>
                )}
                {category.name === "Tools & Other" && (
                  <div className="flex items-center gap-1">
                    <Image
                      src="/static/Icons/git.svg"
                      alt="Git Icon"
                      width={22}
                      height={22}
                      className="inline-block"
                    />
                    <Image
                      src="/static/Icons/docker.svg"
                      alt="Docker Icon"
                      width={22}
                      height={22}
                      className="inline-block"
                    />
                    <Image
                      src="/static/Icons/figma.svg"
                      alt="Figma Icon"
                      width={22}
                      height={22}
                      className="inline-block"
                    />
                  </div>
                )}
                {category.name}
              </motion.h3>

              <Marquee
                items={category.skills}
                direction={categoryIndex % 2 === 0 ? "left" : "right"}
                speed={
                  categoryIndex === 0
                    ? "fast"
                    : categoryIndex === 1
                    ? "normal"
                    : "slow"
                }
                pauseOnHover={true}
                renderItem={renderSkillItem}
                className="py-4"
                itemClassName="mx-3"
              />
            </div>
          ))}
        </div>

        {/* Languages section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 sm:mt-20 max-w-4xl mx-auto"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
            Languages
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
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
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-xl p-4 sm:p-5 text-center"
              >
                <h4 className="font-bold mb-1 sm:mb-2">{language.name}</h4>
                <p className="text-sm text-text/70">{language.level}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
