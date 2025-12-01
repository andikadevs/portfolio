/** @format */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { NavLink } from "@/types";
import { handleScrollSpy } from "@/lib/navigation";
import { NavLinks, SocialLinks, MobileMenu } from "./Child";
import { useRouter, usePathname } from "next/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

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
  const router = useRouter();
  const pathname = usePathname();

  // Hide navbar on article detail pages
  if (pathname?.startsWith("/articles/") && pathname !== "/articles") {
    return null;
  }

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
        // On home page, check for hash in URL first
        const hash = window.location.hash;
        if (hash) {
          setActiveLink(`/#${hash.substring(1)}`);
        } else {
          setActiveLink("/#home");
        }

        // Setup scroll spy for home page
        const scrollSpyHandler = () => {
          handleScrollSpy(navLinks, setActiveLink);
        };

        // Run immediately on mount and after a short delay to ensure all elements are rendered
        scrollSpyHandler();
        const initialTimeoutId = setTimeout(scrollSpyHandler, 500);

        // Use throttled scroll event for better performance
        let isThrottled = false;
        const throttledScrollHandler = () => {
          if (!isThrottled) {
            isThrottled = true;
            requestAnimationFrame(() => {
              scrollSpyHandler();
              setTimeout(() => {
                isThrottled = false;
              }, 100);
            });
          }
        };

        window.addEventListener("scroll", throttledScrollHandler, {
          passive: true,
        });
        window.addEventListener("resize", throttledScrollHandler, {
          passive: true,
        });

        // Also recheck when all content is fully loaded
        window.addEventListener("load", scrollSpyHandler);

        return () => {
          clearTimeout(initialTimeoutId);
          window.removeEventListener("scroll", throttledScrollHandler);
          window.removeEventListener("resize", throttledScrollHandler);
          window.removeEventListener("load", scrollSpyHandler);
        };
      }
    }
    // Use only navLinks as dependency to avoid errors
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

      // Set active link immediately for better UX
      setActiveLink(path);

      const targetId = path.substring(path.indexOf("#") + 1);
      const isNotHomePage =
        typeof window !== "undefined" && window.location.pathname !== "/";

      // If we're on a different page, navigate to home with the hash
      if (isNotHomePage) {
        router.push(`/#${targetId}`);
      } else {
        // Use smooth scrolling directly if already on home page
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100, // Offset for navbar height
            behavior: "smooth",
          });
        }
      }
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
      className={`fixed max-w-7xl mx-auto top-4 left-1/2 -translate-x-1/2 w-[95%] z-50 transition-all duration-300 ${
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
          <div className="flex items-center gap-2 md:gap-5">
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

            <AnimatedThemeToggler />

            {/**
             * Mobile Menu Button
             *
             * @author Andika Dwi Saputra
             * @description Display mobile menu toggle
             */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden cursor-pointer relative flex items-center justify-center w-9 h-9 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative">
                {isOpen ? (
                  <IconX
                    size={20}
                    className="text-[var(--accent)]"
                    strokeWidth={2}
                  />
                ) : (
                  <IconMenu2
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
