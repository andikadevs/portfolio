/** @format */

"use client";

import { Button } from "@/components/ui";
import { motion, useScroll, useTransform } from "motion/react";
import { IconArrowRight, IconMessageCircle } from "@tabler/icons-react";
import { useRef } from "react";
import Image from "next/image";

export const heroImageId = "main-image";

export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const imageOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.88]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-4 sm:pt-20"
    >
      {/* Ruled paper lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 27px, rgba(196,167,125,0.13) 27px, rgba(196,167,125,0.13) 28px)",
          backgroundSize: "100% 28px",
        }}
      />

      {/* Coffee ring stain — decorative */}
      <div className="absolute top-28 right-16 hidden lg:block pointer-events-none select-none">
        <div
          className="w-32 h-32 rounded-full border-[3px] border-kraft/25 opacity-50"
          style={{ boxShadow: "inset 0 0 0 8px transparent" }}
        />
        <div className="absolute inset-3 rounded-full border-[2px] border-kraft/15 opacity-40" />
      </div>

      <div className="container mx-auto z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">

          {/* ── Text content ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 sm:mb-16 relative lg:mb-0 max-w-xl"
          >
            {/* "Hello, I'm a" — handwritten */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-caveat text-2xl sm:text-3xl text-accent mb-1"
              style={{ transform: "rotate(-1deg)", transformOrigin: "left center", display: "inline-block" }}
            >
              Hello, I&apos;m a
            </motion.p>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-caveat text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-text"
            >
              Full Stack
              <br />
              <span className="text-accent">Developer.</span>
            </motion.h1>

            {/* Washi tape colour strip */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-2 mt-4 mb-6 origin-left"
            >
              <div
                className="h-3 w-20 rounded-sm"
                style={{ background: "var(--tape-yellow)", transform: "rotate(-0.5deg)" }}
              />
              <div
                className="h-3 w-12 rounded-sm"
                style={{ background: "var(--tape-blue)", transform: "rotate(0.5deg)" }}
              />
              <div
                className="h-3 w-8 rounded-sm"
                style={{ background: "var(--tape-pink)", transform: "rotate(-0.8deg)" }}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-base sm:text-lg font-light text-text/75 leading-relaxed mb-8 max-w-md"
            >
              Creating elegant, high-performance applications with modern web technologies.
              Let&apos;s build something amazing together.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Button
                variant="primary"
                href="/portfolio"
                icon={<IconArrowRight size={16} />}
              >
                View My Projects
              </Button>
              <Button
                variant="secondary"
                href="https://wa.me/6285743699909"
                icon={<IconMessageCircle size={16} />}
              >
                Contact Me
              </Button>
            </motion.div>

            {/* Sticky note */}
            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 3 }}
              transition={{ delay: 2.0, duration: 0.6 }}
              className="hidden sm:block absolute -bottom-16 right-0 lg:-right-20 w-28 h-28 p-3 shadow-md cursor-default"
              style={{ background: "var(--tape-yellow)" }}
            >
              <p className="font-caveat text-sm text-text/80 leading-snug mt-1">
                Available for new projects!
              </p>
              <div
                className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-red-400/70 shadow-sm"
              />
            </motion.div>
          </motion.div>

          {/* ── Floating image — Desktop ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ opacity: imageOpacity, scale: imageScale }}
            transition={{ opacity: { delay: 0.8, duration: 0.8 }, x: { delay: 0.8, duration: 0.8 } }}
            className="hidden lg:block relative"
            layoutId={heroImageId}
          >
            {/* Tape decorations — positioned relative to image */}
            <div
              className="absolute -top-3 left-10 h-5 w-16 rounded-sm z-10"
              style={{ background: "var(--tape-yellow)", transform: "rotate(-3deg)" }}
            />
            <div
              className="absolute -top-3 right-8 h-5 w-12 rounded-sm z-10"
              style={{ background: "var(--tape-blue)", transform: "rotate(4deg)" }}
            />

            <Image
              src="/static/img/main.webp"
              alt="Andika Dwi Saputra – Full Stack Developer"
              className="object-contain relative z-[1]"
              width={420}
              height={420}
              style={{ width: 420, height: 420, filter: "drop-shadow(4px 8px 20px rgba(44,24,16,0.18))" }}
              priority
            />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-text/20 rounded-full flex justify-center pt-1.5 sm:pt-2"
        >
          <div className="w-1 h-1 bg-text/30 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
