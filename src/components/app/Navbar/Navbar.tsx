/** @format */

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { NavLink } from "@/types";
import { handleScrollSpy } from "@/lib/navigation";
import { NavLinks, SocialLinks, MobileMenu } from "./Child";
import { useRouter, usePathname } from "next/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

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
 *
 * @date 30/03/2025
 * @description Navbar component
 */

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Use state only for scroll-spy updates (hash links)
  const [activeHashLink, setActiveHashLink] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      return `/#${window.location.hash.substring(1)}`;
    }
    return "";
  });

  // Memoize active link for non-home pages or initial render
  const activeLink = useMemo(() => {
    if (pathname !== "/") {
      const matchingLink = navLinks.find((link) => {
        const linkPath = link.path.split("#")[0];
        return linkPath !== "/" && pathname.startsWith(linkPath);
      });
      return matchingLink ? matchingLink.path : pathname;
    }
    return activeHashLink || "/#home";
  }, [pathname, activeHashLink]);

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
   * @description Setup scroll spy for home page
   */

  useEffect(() => {
    if (typeof window !== "undefined" && pathname === "/") {
      // Setup scroll spy for home page
      const scrollSpyHandler = () => {
        handleScrollSpy(navLinks, setActiveHashLink);
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
  }, [pathname]);

  /**
   * @author Andika Dwi Saputra
   * @description Handle link clicks for smooth scrolling
   */

  const handleLinkClick = useCallback((path: string, e: React.MouseEvent) => {
    // Close mobile menu if open
    setIsOpen(false);

    // Handle hash links with smooth scrolling
    if (path.includes("#")) {
      e.preventDefault();

      // Set active link immediately for better UX
      setActiveHashLink(path);

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
            top: targetElement.offsetTop - 40, // Offset for navbar height
            behavior: "smooth",
          });
        }
      }
    } else {
      // For non-hash links, the activeLink will be updated via useMemo when pathname changes
    }
  }, [router]);

  /**
   * @author Andika Dwi Saputra
   * @description Display navbar
   */

  /**
   * @author Andika Dwi Saputra
   * @description Display navbar
   */

  // Hide navbar on article detail pages
  if (pathname?.startsWith("/articles/") && pathname !== "/articles") {
    return null;
  }

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

      {/* Scrolled / open background — paper card style */}
      <div
        className={`absolute inset-0 transition-all duration-400 ease-in-out ${
          isOpen ? "rounded-none" : "rounded-2xl"
        } ${isOpen || isScrolled ? "opacity-100" : "opacity-0"}`}
        style={
          isOpen || isScrolled
            ? {
                backdropFilter: "blur(12px)",
                backgroundColor: "var(--paper)",
                border: "1px solid rgba(184,151,106,0.30)",
                boxShadow: "0 4px 20px rgba(36,22,16,0.14), 0 1px 4px rgba(36,22,16,0.08)",
              }
            : {}
        }
      />
      {/* Tape strip — shows at bottom of scrolled navbar */}
      {isScrolled && !isOpen && (
        <div
          className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full z-10 opacity-70"
          style={{ background: "var(--tape-yellow)" }}
        />
      )}

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
            <h1 className="font-caveat text-2xl lg:text-3xl font-bold text-text tracking-tight">
              AndikaDS
            </h1>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300 ease-out" />
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
