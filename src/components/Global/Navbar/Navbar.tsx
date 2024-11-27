/** @format */

"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import { FaGithub, FaList } from "react-icons/fa";
import { Button, Tooltip } from "@/components/Global";
import { BsEnvelope, BsGithub } from "react-icons/bs";
import { useSpring, animated, config, useTrail } from "@react-spring/web";
import { HiX } from "react-icons/hi";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
  ariaLabel?: string;
  description?: string;
}

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "#home",
    ariaLabel: "Navigate to home section",
    description: "Introduction and overview of Andika Dwi Saputra's portfolio",
  },
  {
    label: "About",
    href: "#about",
    ariaLabel: "Learn more about Andika",
    description: "Professional background and expertise of Andika Dwi Saputra",
  },
  {
    label: "Skills",
    href: "#skills",
    ariaLabel: "View technical skills",
    description: "Technical skills and expertise in web development",
  },
  {
    label: "Education",
    href: "#education",
    ariaLabel: "View educational background",
    description: "Academic qualifications and certifications",
  },
  {
    label: "Experience",
    href: "#experience",
    ariaLabel: "View work experience",
    description: "Professional work experience and achievements",
  },
  {
    label: "Portfolio",
    href: "#portfolio",
    ariaLabel: "Browse portfolio projects",
    description: "Showcase of web development projects and applications",
  },
  {
    label: "Articles",
    href: "/articles",
    ariaLabel: "Read technical articles",
    description: "Technical articles and development insights",
  },
];

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith("#")) {
      // If we're not on the home page, go there first
      if (pathname !== "/") {
        router.push("/" + href);
        return;
      }

      // If we're already on home page, just scroll
      const section = document.querySelector(href) as HTMLElement;
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 100,
          behavior: "smooth",
        });
      }
    } else {
      // For non-hash links (like /articles), navigate normally
      router.push(href);
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 80; // Account for offset

    // Don't check sections if we're on the articles page
    if (pathname === "/articles") {
      setActiveSection("/articles");
      return;
    }

    navItems.forEach((item) => {
      if (item.href.startsWith("#")) {
        // Only check sections for hash links
        const section = document.querySelector(item.href) as HTMLElement;
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(item.href);
          }
        }
      }
    });
  };

  useEffect(() => {
    // Update active section when pathname changes
    if (pathname === "/articles") {
      setActiveSection("/articles");
    } else {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]); // Add pathname to dependency array

  const menuAnimation = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(-100%) scale(0.95)",
      backdropFilter: "blur(0px)",
    },
    to: {
      opacity: isOpen ? 1 : 0,
      transform: isOpen
        ? "translateY(0%) scale(1)"
        : "translateY(-100%) scale(0.95)",
      backdropFilter: isOpen ? "blur(10px)" : "blur(0px)",
    },
    config: { ...config.gentle, tension: 200, friction: 20 },
  });

  const navTrail = useTrail(navItems.length, {
    from: { opacity: 0, transform: "translateY(50px)" },
    to: {
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? "translateY(0px)" : "translateY(50px)",
    },
    config: config.gentle,
    delay: isOpen ? 100 : 0,
  });

  const iconAnimation = useSpring({
    transform: isOpen ? "rotate(180deg) scale(1.2)" : "rotate(0deg) scale(1)",
    config: {
      tension: 300,
      friction: 10,
    },
  });

  return (
    <nav
      className="fixed top-4 left-0 right-0 z-30"
      style={{ zIndex: 999 }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className={`w-[98vw] mx-auto bg-dark opacity-[0.9] shadow-2xl rounded-3xl md:rounded-full px-2 sm:px-3 sm:pr-3 py-2 ${
          isOpen ? "sm:rounded-3xl" : "sm:rounded-full"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* GitHub logo with enhanced accessibility */}
          <Tooltip hasArrow position="bottom" label="Visit my GitHub Account">
            <Link
              href="https://github.com/Andikss"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text hover:text-gray-400 flex items-center gap-2"
              aria-label="GitHub Profile"
            >
              <FaGithub size={32} aria-hidden="true" />
              <span className="text-xl text-text" itemProp="name">
                AndikaDS
              </span>
            </Link>
          </Tooltip>

          {/* Desktop Links with enhanced SEO and accessibility */}
          <div
            className="hidden md:flex space-x-6 ml-auto items-center text-text"
            role="menubar"
            aria-label="Main menu"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e as any, item.href)}
                className={`hover:text-gray-400 hover:underline ${
                  activeSection === item.href ? "text-accent" : ""
                }`}
                aria-label={item.ariaLabel}
                role="menuitem"
                title={item.description}
              >
                {item.label}
              </Link>
            ))}
            <Tooltip hasArrow position="bottom" label="Email me">
              <Link
                href="mailto:andikadwisaputra.dev@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send email to Andika"
              >
                <Button variant="outline" className="!rounded-full">
                  <BsEnvelope aria-hidden="true" /> Email
                </Button>
              </Link>
            </Tooltip>
          </div>

          {/* Hamburger menu with accessibility */}
          <div className="md:hidden shrink-0">
            <animated.button
              onClick={toggleMenu}
              style={iconAnimation}
              className="text-text shrink-0 hover:text-gray-400 focus:outline-none pr-2 flex items-center justify-center"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <HiX size={18} className="shrink-0" aria-hidden="true" />
              ) : (
                <FaList size={18} className="shrink-0" aria-hidden="true" />
              )}
            </animated.button>
          </div>
        </div>

        {/* Mobile Menu - Full Screen */}
        <animated.div
          id="mobile-menu"
          style={{
            ...menuAnimation,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100dvh",
            width: "100vw",
            background: "var(--main)",
            opacity: 0.98,
          }}
          className="md:hidden text-text"
          role="menu"
          aria-label="Mobile navigation menu"
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute z-[9999] top-6 right-6 text-text hover:text-gray-400 p-2"
            aria-label="Close menu"
          >
            <HiX size={24} aria-hidden="true" />
          </button>

          <animated.div
            style={navTrail[0]}
            className="h-full flex flex-col justify-center items-center gap-8 px-4"
          >
            <div className="space-y-6 flex flex-col items-center">
              {navTrail.map((style, index) => (
                <animated.div key={navItems[index].label} style={style}>
                  <Link
                    href={navItems[index].href}
                    onClick={(e) => {
                      scrollToSection(e as any, navItems[index].href);
                      setIsOpen(false);
                    }}
                    className={`block hover:text-gray-400 text-center text-xl transition-all duration-300 hover:scale-110 ${
                      activeSection === navItems[index].href
                        ? "text-accent"
                        : ""
                    }`}
                    aria-label={navItems[index].ariaLabel}
                    role="menuitem"
                    title={navItems[index].description}
                  >
                    {navItems[index].label}
                  </Link>
                </animated.div>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <Tooltip hasArrow position="top" label="Email me">
                <Link
                  href="mailto:andikadwisaputra.dev@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Send email to Andika"
                >
                  <Button
                    variant="fill"
                    className="rounded-sm shadow-lg w-full"
                  >
                    <BsEnvelope aria-hidden="true" /> Email
                  </Button>
                </Link>
              </Tooltip>
              <Tooltip hasArrow position="top" label="Visit my GitHub profile">
                <Link
                  href="https://github.com/Andikss"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Button
                    variant="outline"
                    className="rounded-sm shadow-lg w-full"
                  >
                    <BsGithub aria-hidden="true" /> GitHub
                  </Button>
                </Link>
              </Tooltip>
            </div>
          </animated.div>
        </animated.div>
      </div>
    </nav>
  );
};
