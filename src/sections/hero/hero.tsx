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
      className="relative min-h-screen flex flex-col justify-center items-center pt-4 sm:pt-20"
    >
      {/* Ruled paper lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 27px, rgba(184,151,106,0.12) 27px, rgba(184,151,106,0.12) 28px)",
          backgroundSize: "100% 28px",
        }}
      />

      <div className="container mx-auto z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">

          {/* ── Text content ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 sm:mb-16 relative lg:mb-0 max-w-xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-caveat text-2xl sm:text-3xl text-accent mb-1"
              style={{ transform: "rotate(-1deg)", transformOrigin: "left center", display: "inline-block" }}
            >
              Hello, I&apos;m a
            </motion.p>

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

            {/* Tape strip — masculine amber + slate + olive */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-2 mt-4 mb-6 origin-left"
            >
              <div className="h-3 w-20 rounded-sm" style={{ background: "var(--tape-yellow)", transform: "rotate(-0.5deg)" }} />
              <div className="h-3 w-12 rounded-sm" style={{ background: "var(--tape-blue)", transform: "rotate(0.5deg)" }} />
              <div className="h-3 w-8 rounded-sm" style={{ background: "var(--tape-pink)", transform: "rotate(-0.8deg)" }} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-base sm:text-lg font-light text-text/75 leading-relaxed mb-8 max-w-md"
            >
              Creating elegant, high-performance applications with modern web technologies.
              Let&apos;s build something amazing together.
            </motion.p>

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

            {/* Memo note — utilitarian look */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.6 }}
              className="hidden sm:block absolute -bottom-14 right-0 lg:-right-16 w-32 p-3 cursor-default"
              style={{
                background: "var(--tape-yellow)",
                transform: "rotate(2deg)",
                boxShadow: "1px 2px 6px rgba(36,22,16,0.18)",
              }}
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--kraft)]" />
              <p className="font-caveat text-sm text-text/85 leading-snug mt-1">
                Open to new projects
              </p>
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
            {/* Tape strips */}
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
              style={{ width: 420, height: 420, filter: "drop-shadow(4px 8px 20px rgba(36,22,16,0.20))" }}
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
