"use client";

import React from "react";
import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconHeart,
  IconCoffee,
  IconSend,
} from "@tabler/icons-react";
import { Button } from "@/components/ui";
import { motion } from "motion/react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Project callout — scrapbook card */}
      <div
        className="w-full py-16 relative overflow-hidden"
        style={{ background: "var(--foreground)" }}
      >
        {/* Ruled lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 27px, rgba(196,167,125,0.18) 27px, rgba(196,167,125,0.18) 28px)",
            backgroundSize: "100% 28px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto relative"
            style={{
              background: "var(--paper)",
              border: "1px solid rgba(196,167,125,0.40)",
              boxShadow: "4px 6px 20px rgba(44,24,16,0.14), 0 2px 6px rgba(44,24,16,0.08)",
              padding: "2.5rem",
            }}
          >
            {/* Top tape */}
            <div
              className="absolute -top-3 left-16 h-5 w-24 rounded-sm z-10"
              style={{ background: "var(--tape-yellow)", transform: "rotate(-2deg)" }}
            />
            <div
              className="absolute -top-3 right-20 h-5 w-16 rounded-sm z-10"
              style={{ background: "var(--tape-blue)", transform: "rotate(2deg)" }}
            />

            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <h2 className="font-caveat text-3xl sm:text-4xl font-bold text-text">
                  Start a Project
                </h2>
                <p className="text-text/70 max-w-md">
                  Interested in working together? Let&apos;s queue up a time to chat.
                  I&apos;ll buy the coffee.
                </p>
              </div>
              <Button
                href="https://wa.me/6285743699909"
                variant="primary"
                icon={<IconSend size={16} />}
              >
                Wrap it up!
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <footer
        className="w-full py-12 border-t"
        style={{
          background: "var(--dark)",
          borderColor: "rgba(196,167,125,0.25)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">

            {/* Logo */}
            <p className="font-caveat text-3xl font-bold text-text mb-5">
              AndikaDS
            </p>

            {/* Handwritten quote */}
            <p className="font-caveat text-center text-xl text-text/60 mb-8 max-w-md mx-auto">
              &ldquo;Living, learning, leveling up one day at a time&rdquo;
            </p>

            {/* Tape accent */}
            <div className="flex items-center gap-2 mb-8">
              <div className="h-2.5 w-12 rounded-sm" style={{ background: "var(--tape-yellow)", transform: "rotate(-0.5deg)" }} />
              <div className="h-2.5 w-8 rounded-sm" style={{ background: "var(--tape-pink)", transform: "rotate(0.5deg)" }} />
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <a
                href="https://github.com/andikadevs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/60 hover:text-accent transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                aria-label="GitHub"
              >
                <IconBrandGithub size={22} strokeWidth={1.5} />
              </a>
              <a
                href="https://linkedin.com/in/andikadwisaputra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/60 hover:text-accent transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin size={22} strokeWidth={1.5} />
              </a>
              <a
                href="mailto:andikadwisaputra.dev@gmail.com"
                className="text-text/60 hover:text-accent transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                aria-label="Email"
              >
                <IconCoffee size={22} strokeWidth={1.5} />
              </a>
            </div>

            {/* Nav links */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
              {[
                { label: "Home", href: "/#home" },
                { label: "About", href: "/#about" },
                { label: "Skills", href: "/#skills" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Articles", href: "/articles" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-text/60 hover:text-accent transition-all duration-300 relative group cursor-pointer"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center text-sm text-text/50 gap-1 md:gap-2">
              <span>&copy; {currentYear} AndikaDS. All rights reserved</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                Made with
                <IconHeart size={12} className="text-accent" fill="currentColor" />
                in Next.js
              </span>
            </div>

          </div>
        </div>
      </footer>
    </>
  );
};
