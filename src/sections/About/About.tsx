/** @format */

"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui";
import { IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";

export const About = () => {
  const ref = useRef(null);

  return (
    <section
      id="about"
      className="py-16 sm:py-24 relative overflow-hidden bg-background"
    >
      <div className="px-4 lg:px-17">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Image on the left */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="w-full md:w-4/12 order-2 md:order-1"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src="/static/img/person.webp"
                alt="Profile Photo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Text content on the right */}
          <div className="w-full md:w-7/12 text-right order-1 md:order-2">
            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-3xl sm:text-3xl font-bold mb-4 sm:mb-6"
            >
              <span className="text-text">About Me</span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="h-1 bg-accent mt-2 ml-auto"
              />
            </motion.h2>

            {/* Use a single motion div for all text content to reduce animation calculations */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-3 sm:space-y-4"
            >
              <p className="text-base sm:text-lg text-text/80">
                Hi, I&apos;m Andika Dwi Saputra, a passionate Fullstack
                Developer with expertise in building modern web applications. I
                specialize in creating seamless user experiences and robust
                backend solutions. Let&apos;s explore my work together!
              </p>

              <p className="text-base sm:text-lg text-text/80">
                I&apos;m a passionate Full Stack Developer with a focus on
                creating elegant, high-performance web applications. My journey
                in software development started with a curiosity about how
                digital experiences are built, and has evolved into a
                professional pursuit of creating software that makes a
                difference.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end"
            >
              <Button
                href="https://github.com/Andikss"
                external
                variant="primary"
                icon={<IconBrandGithub />}
              >
                See My GitHub
              </Button>

              <Button variant="secondary" href="#">
                Download <span className="inline-block">Resume</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
