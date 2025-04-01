"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X } from "lucide-react";
import { NavLink } from "@/types";
import { scrollToSection, handleScrollSpy } from "@/lib/navigation";
import { NavLinks, ThemeToggle, SocialLinks, MobileMenu } from "./Child";
import { useRouter } from "next/navigation";

/**
 * @author Andika Dwi Saputra
 *
 * @date 30/03/2025
 * @description Navbar component
 */

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const navLinks: NavLink[] = [
    { name: "Home", path: "/#home" },
    { name: "About", path: "/#about" },
    { name: "Education", path: "/#education" },
    { name: "Experience", path: "/#experience" },
    { name: "Skills", path: "/#skills" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Articles", path: "/articles" },
  ];

  /**
   * @author Andika Dwi Saputra
   * @description Set mounted state to true after mounting
   */

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * @author Andika Dwi Saputra
   * @description Handle scroll effect with smoother transition
   */

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * @author Andika Dwi Saputra
   * @description Set active link based on current path or scroll position
   */

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;

      // For non-home pages, find the matching nav link based on path inclusion
      if (currentPath !== "/") {
        const matchingLink = navLinks.find((link) => {
          const linkPath = link.path.split("#")[0]; // Remove hash if present
          return linkPath !== "/" && currentPath.startsWith(linkPath);
        });

        if (matchingLink) {
          setActiveLink(matchingLink.path);
        } else {
          setActiveLink(currentPath);
        }
      } else {
        setActiveLink("/");
      }

      // Update active link on scroll for home page sections
      const scrollSpyHandler = () => handleScrollSpy(navLinks, setActiveLink);

      // Run once on initial load to set correct active section
      if (currentPath === "/") {
        setTimeout(scrollSpyHandler, 100);
        window.addEventListener("scroll", scrollSpyHandler, { passive: true });
        return () => {
          window.removeEventListener("scroll", scrollSpyHandler);
        };
      }
    }
  }, [navLinks]);

  /**
   * @author Andika Dwi Saputra
   * @description Handle link clicks for smooth scrolling
   */

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    // Close mobile menu if open
    if (isOpen) {
      setIsOpen(false);
    }

    // Handle hash links with smooth scrolling
    if (path.includes("#")) {
      e.preventDefault();
      // Set active link to the full path including hash
      setActiveLink(path);

      const targetId = path.substring(path.indexOf("#") + 1);
      const isNotHomePage =
        typeof window !== "undefined" && window.location.pathname !== "/";
      scrollToSection(router, targetId, isNotHomePage);
    } else {
      // For non-hash links, set active link directly
      setActiveLink(path);
    }
  };

  /**
   * @author Andika Dwi Saputra
   * @description Display navbar
   */

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] z-50 transition-all duration-300 ${
        isOpen ? "!w-full left-0 !top-0 -translate-x-0" : ""
      }`}
    >
      {/**
       * Animated background effect
       *
       * @author Andika Dwi Saputra
       *
       * @description Animated background effect, will be applied when the menu is open or scrolled
       */}

      <div
        className={`absolute inset-0 transition-all rounded-2xl duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 backdrop-blur-md bg-[var(--dark)] shadow-lg"
            : isScrolled
            ? "opacity-100 backdrop-blur-md bg-[var(--dark)] shadow-lg"
            : "opacity-0"
        }`}
      />

      <nav className="relative mx-auto px-4 lg:px-8">
        <div className="h-14 flex items-center justify-between">
          {/**
           * Logo
           *
           * @author Andika Dwi Saputra
           * @description Display logo
           */}

          <Link
            href="/"
            className="group relative overflow-hidden flex items-center"
            onClick={(e) => handleLinkClick("/", e)}
          >
            <h1 className="text-xl lg:text-2xl font-bold text-[var(--text)] tracking-tight">
              <span className="bg-clip-text text-text">AndikaDS</span>
            </h1>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--accent)] group-hover:w-full transition-all duration-300 ease-out" />
          </Link>

          {/**
           * Desktop Navigation Links
           *
           * @author Andika Dwi Saputra
           * @description Display navigation links on desktop (centered)
           */}

          <NavLinks
            navLinks={navLinks}
            activeLink={activeLink}
            handleLinkClick={handleLinkClick}
          />

          {/* Right side actions */}
          <div className="flex items-center gap-5">
            {/**
             * Social Links
             *
             * @author Andika Dwi Saputra
             * @description Social links component, will be shown on desktop only
             */}

            <SocialLinks />

            {/**
             * Theme Toggle
             *
             * @author Andika Dwi Saputra
             * @description Theme toggle component, set app theme state to be dark or light
             */}

            <ThemeToggle theme={theme} setTheme={setTheme} mounted={mounted} />

            {/**
             * Mobile Menu Button
             *
             * @author Andika Dwi Saputra
             * @description Display mobile menu toggle
             */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative flex items-center justify-center w-9 h-9 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative">
                {isOpen ? (
                  <X
                    size={20}
                    className="text-[var(--accent)]"
                    strokeWidth={2}
                  />
                ) : (
                  <Menu
                    size={20}
                    className="text-[var(--text)]"
                    strokeWidth={2}
                  />
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/**
       * Mobile Menu
       *
       * @author Andika Dwi Saputra
       * @description Mobile menu component, will be shown when the screen is below 1024px
       */}

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navLinks={navLinks}
        activeLink={activeLink}
        handleLinkClick={handleLinkClick}
      />
    </header>
  );
};
