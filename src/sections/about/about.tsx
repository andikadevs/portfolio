/** @format */

"use client";

import { useRef } from "react";
import { Button } from "@/components/ui";
import { IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";

export const About = () => {
  const ref = useRef(null);

  return (
    <section id="about" className="py-16 sm:py-24 relative">
      <div
        ref={ref}
        className="flex flex-col-reverse md:flex-row items-start justify-between gap-10 md:gap-14"
      >

        {/* ── Polaroid photo ───────────────────────────────────────── */}
        <div className="gsap-polaroid w-full md:w-5/12 order-2 md:order-1" style={{ opacity: 0 }}>

          {/* Mobile heading */}
          <div className="flex flex-col items-start mb-5 md:hidden">
            <h2 className="gsap-section-title font-caveat text-4xl font-bold text-text" style={{ opacity: 0 }}>About Me</h2>
            <div
              className="gsap-tape-strip h-3 w-20 mt-2 rounded-sm"
              style={{ background: "var(--tape-yellow)", transform: "rotate(-0.5deg)", opacity: 0 }}
            />
          </div>

          {/* Polaroid wrapper */}
          <div className="relative">
            <div
              className="relative bg-white dark:bg-paper p-3 pb-12"
              style={{
                transform: "rotate(-2deg)",
                boxShadow: "3px 6px 16px rgba(44,24,16,0.15), 0 1px 4px rgba(44,24,16,0.08)",
              }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-20 rounded-sm z-10"
                style={{ background: "var(--tape-pink)", transform: "translateX(-50%) rotate(1.5deg)" }}
              />
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src="/static/img/person.webp"
                  alt="Andika Dwi Saputra – Profile Photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <p className="font-caveat text-center text-text/50 text-lg mt-2 tracking-wide">
                Andika, 2025
              </p>
            </div>
            <div
              className="absolute -bottom-3 left-3 right-3 h-4 bg-black/10 dark:bg-black/25 blur-md rounded-full"
              style={{ transform: "rotate(-2deg)" }}
            />
          </div>
        </div>

        {/* ── Text ─────────────────────────────────────────────────── */}
        <div className="w-full md:w-7/12 order-1 md:order-2">

          {/* Desktop heading */}
          <div className="hidden md:flex flex-col items-end mb-6">
            <h2 className="gsap-section-title font-caveat text-4xl sm:text-5xl font-bold text-text" style={{ opacity: 0 }}>
              About Me
            </h2>
            <div
              className="gsap-tape-strip h-3 w-24 mt-2 rounded-sm"
              style={{ background: "var(--tape-yellow)", transform: "rotate(-0.5deg)", opacity: 0 }}
            />
          </div>

          {/* Notepad */}
          <div
            className="gsap-notepad relative rounded-sm border border-kraft/30 shadow-sm overflow-hidden"
            style={{
              background: "var(--paper)",
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 27px, rgba(196,167,125,0.20) 27px, rgba(196,167,125,0.20) 28px)",
              backgroundSize: "100% 28px",
              backgroundPositionY: "14px",
            }}
          >
            <div
              className="absolute left-10 top-0 bottom-0 w-px"
              style={{ background: "var(--tape-pink)", opacity: 0.7 }}
            />
            <div className="p-5 pl-14 space-y-4">
              <p className="text-base sm:text-lg text-text/80 leading-relaxed">
                Hi, I&apos;m Andika Dwi Saputra, a passionate Fullstack Developer with expertise
                in building modern web applications. I specialize in creating seamless user
                experiences and robust backend solutions.
              </p>
              <p className="text-base sm:text-lg text-text/80 leading-relaxed">
                My journey in software development started with a curiosity about how digital
                experiences are built, and has evolved into a professional pursuit of creating
                software that makes a difference.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
            <div className="gsap-about-cta" style={{ opacity: 0 }}>
              <Button
                href="https://github.com/andikadevs"
                external
                variant="primary"
                icon={<IconBrandGithub size={16} />}
              >
                See My GitHub
              </Button>
            </div>
            <div className="gsap-about-cta" style={{ opacity: 0 }}>
              <Button
                variant="secondary"
                href="/static/portfolio/cv/curicullum-vitae-andika-dwi-saputra.pdf"
                external
              >
                Download Resume
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
