"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero, About, Education, Experience, Skills } from "@/sections";
import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

export function HomeClient() {
  useEffect(() => {
    // Ensure ScrollTrigger refreshes on scroll (Lenis is handled globally by LenisProvider)
    window.addEventListener("scroll", ScrollTrigger.update, { passive: true });
    gsap.ticker.lagSmoothing(0);

    // Skip motion for users who prefer reduced motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      return () => {
        window.removeEventListener("scroll", ScrollTrigger.update);
      };
    }

    // ── Scroll progress bar ──────────────────────────────────────────────
    gsap.to("#gsap-progress-bar", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
      },
    });

    // ── About: polaroid drops in from above ──────────────────────────────
    gsap.fromTo(
      ".gsap-polaroid",
      { y: -60, rotation: -6, opacity: 0, scale: 0.92 },
      {
        y: 0,
        rotation: -2,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: "#about", start: "top 75%", once: true },
      }
    );

    // About notepad text lines reveal
    gsap.fromTo(
      ".gsap-notepad p",
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: { trigger: "#about", start: "top 65%", once: true },
      }
    );

    // ── Section titles: elastic stamp ────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".gsap-section-title").forEach((el) => {
      gsap.fromTo(
        el,
        { scale: 0.72, opacity: 0, y: 28 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "elastic.out(1.1, 0.5)",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
    });

    // Tape strips under headings wipe in from left
    gsap.utils.toArray<HTMLElement>(".gsap-tape-strip").forEach((el) => {
      gsap.fromTo(
        el,
        { scaleX: 0, opacity: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%", once: true },
        }
      );
    });

    // ── About CTA buttons ────────────────────────────────────────────────
    gsap.fromTo(
      ".gsap-about-cta",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ".gsap-about-cta", start: "top 88%", once: true },
      }
    );

    // ── Education / Experience timeline items ────────────────────────────
    gsap.utils.toArray<HTMLElement>(".gsap-timeline-item").forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: i % 2 === 0 ? -55 : 55, y: 15 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 86%", once: true },
        }
      );
    });

    // ── Skills section ───────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".gsap-skill-cat").forEach((cat, i) => {
      gsap.fromTo(
        cat,
        { opacity: 0, y: 40, scale: 0.88 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          delay: i * 0.12,
          ease: "back.out(1.9)",
          scrollTrigger: { trigger: cat, start: "top 88%", once: true },
        }
      );
    });

    // Language cards pop in
    gsap.utils.toArray<HTMLElement>(".gsap-lang-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.7, rotation: ((i % 2) - 0.5) * 6 },
        {
          opacity: 1,
          scale: 1,
          rotation: ([-1, 0.8, -0.5, 1.2] as number[])[i] || 0,
          duration: 0.65,
          delay: i * 0.1,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ".gsap-lang-grid", start: "top 88%", once: true },
        }
      );
    });

    // ── Bottom CTA ───────────────────────────────────────────────────────
    gsap.fromTo(
      ".gsap-cta",
      { opacity: 0, y: 50, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".gsap-cta", start: "top 88%", once: true },
      }
    );

    // ── Subtle depth parallax on alternating sections ────────────────────
    const parallaxSections = ["#about", "#experience", "#skills"];
    parallaxSections.forEach((id) => {
      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;
      gsap.fromTo(
        el,
        { backgroundPositionY: "0%" },
        {
          backgroundPositionY: "30%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    });

    return () => {
      window.removeEventListener("scroll", ScrollTrigger.update);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* Scroll progress bar — amber tape strip at viewport top */}
      <div
        id="gsap-progress-bar"
        className="fixed top-0 left-0 right-0 z-[9999] h-[3px] origin-left scale-x-0"
        style={{ background: "var(--tape-yellow)", pointerEvents: "none" }}
      />

      <div className="bg-background relative text-text max-w-7xl px-4 md:px-12 mx-auto">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />

        <div className="gsap-cta flex flex-col items-center gap-4 py-16">
          <p
            className="font-caveat text-2xl text-text/60"
            style={{ transform: "rotate(-1deg)" }}
          >
            want to see more?
          </p>
          <Button href="/portfolio" variant="primary" icon={<IconArrowRight />}>
            View My Portfolio
          </Button>
        </div>
      </div>
    </>
  );
}
