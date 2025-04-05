"use client";

import { motion } from "motion/react";
import { useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui";
import { IconBrandGithub } from "@tabler/icons-react";

// Lazy load the DirectionAwareHover component with reduced loading priority
const DirectionAwareHover = dynamic(
  () =>
    import("@/components/ui/DirectionAwareHover/DirectionAwareHover").then(
      (mod) => ({ default: mod.DirectionAwareHover })
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full rounded-lg bg-foreground/10 animate-pulse"></div>
    ),
  }
);

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
          className="flex flex-col md:flex-row gap-8 md:gap-12 items-center"
        >
          <div className="order-2 md:order-1 w-full md:w-7/12">
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
                className="h-1 bg-accent mt-2"
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
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="order-1 md:order-2 w-full md:w-5/12 relative h-full mx-auto max-w-[400px] md:max-w-none"
          >
            <Suspense
              fallback={
                <div className="w-full h-full rounded-lg bg-foreground/10 animate-pulse"></div>
              }
            >
              <DirectionAwareHover
                imageUrl="/static/img/person.webp"
                className="w-full h-full rounded-lg"
                imageClassName="object-cover object-bottom filter brightness-80 contrast-105"
                childrenClassName="bottom-0 left-0 right-0"
              >
                <div className="p-5 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                    Full Stack Developer
                  </h3>
                  <p className="text-sm sm:text-base text-text/70">
                    2+ years of experience
                  </p>

                  <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs sm:text-sm text-text/60">
                        Specialization
                      </p>
                      <p className="text-sm sm:text-base font-medium">
                        Web Applications
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-text/60">
                        Based in
                      </p>
                      <p className="text-sm sm:text-base font-medium">
                        Semarang, ID
                      </p>
                    </div>
                  </div>
                </div>
              </DirectionAwareHover>
            </Suspense>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
