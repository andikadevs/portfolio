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

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Project Callout Section */}
      <div className="w-full py-16 bg-[var(--dark)] relative">
        <div className="container mx-auto px-4">
          <div className="bg-[var(--foreground)] rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto shadow-lg">
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-3xl font-bold text-[var(--text)]">
                Start a Project
              </h2>
              <p className="text-[var(--text)] opacity-90 max-w-md">
                Interested in working together? We should queue up a time to
                chat. I&apos;ll buy the coffee.
              </p>
            </div>
            <Button href="https://wa.me/6285743699909" variant="primary" icon={<IconSend />}>
              Wrap it up!
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="w-full py-12 border-t border-[var(--foreground)] bg-[var(--dark)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Quote */}
            <p className="text-center text-lg font-medium text-[var(--text)] mb-8 max-w-md mx-auto italic">
              &ldquo;Living, learning, leveling up one day at a time&rdquo;
            </p>

            {/* Social links */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <a
                href="https://github.com/andikadevs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text)] hover:text-[var(--accent)] transition-all duration-300 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <IconBrandGithub size={24} strokeWidth={1.5} />
              </a>
              <a
                href="https://linkedin.com/in/andikadwisaputra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text)] hover:text-[var(--accent)] transition-all duration-300 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin size={24} strokeWidth={1.5} />
              </a>
              <a
                href="mailto:contact@andikadwisaputra.com"
                className="text-[var(--text)] hover:text-[var(--accent)] transition-all duration-300 hover:-translate-y-1"
                aria-label="Email"
              >
                <IconCoffee size={24} strokeWidth={1.5} />
              </a>
            </div>

            {/* Navigation links */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
              <Link
                href="/#home"
                className="text-sm text-[var(--text)] hover:text-[var(--accent)] transition-all duration-300 relative group"
              >
                <span>Home</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/#about"
                className="text-sm text-[var(--text)] hover:text-[var(--accent)] transition-all duration-300 relative group"
              >
                <span>About</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/#skills"
                className="text-sm text-[var(--text)] hover:text-[var(--accent)] transition-all duration-300 relative group"
              >
                <span>Skills</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/portfolio"
                className="text-sm text-[var(--text)] hover:text-[var(--accent)] transition-all duration-300 relative group"
              >
                <span>Portfolio</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/articles"
                className="text-sm text-[var(--text)] hover:text-[var(--accent)] transition-all duration-300 relative group"
              >
                <span>Articles</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center text-sm text-[var(--text)] opacity-80">
              <span>&copy; {currentYear} AndikaDS. All rights reserved</span>
              <span className="mx-2 hidden md:flex">•</span>
              <span className="flex items-center gap-1">
                <span>Made with</span>
                <IconHeart
                  size={14}
                  className="text-[var(--accent)]"
                  fill="currentColor"
                />
                <span>in Next.js</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
