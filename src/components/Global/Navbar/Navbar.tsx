/** @format */

"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import { FaGithub, FaList } from "react-icons/fa";
import { Button, Tooltip } from "@/components/Global";
import { BsEnvelope, BsGithub } from "react-icons/bs";
import { useSpring, animated } from "@react-spring/web";
import { HiX } from "react-icons/hi";
import { useRouter, usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Articles", href: "/articles" },
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
    
    if (href.startsWith('#')) {
      // If we're not on the home page, go there first
      if (pathname !== '/') {
        router.push('/' + href);
        return;
      }
      
      // If we're already on home page, just scroll
      const section = document.querySelector(href) as HTMLElement;
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
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
    if (pathname === '/articles') {
      setActiveSection('/articles');
      return;
    }

    navItems.forEach((item) => {
      if (item.href.startsWith('#')) {  // Only check sections for hash links
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
    if (pathname === '/articles') {
      setActiveSection('/articles');
    } else {
      handleScroll();
    }
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]); // Add pathname to dependency array

  const menuAnimation = useSpring({
    height: isOpen ? "90vh" : "0vh",
    opacity: isOpen ? 1 : 0,
    config: {
      mass: 1,
      tension: 300,
      friction: 26,
    },
  });

  const iconAnimation = useSpring({
    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
    config: {
      tension: 300,
      friction: 20,
    },
  });

  return (
    <nav className="fixed top-4 left-0 right-0 z-30" style={{ zIndex: 999 }}>
      {/* Main navbar container */}
      <div
        className={`w-[98vw] mx-auto bg-dark opacity-[0.9] shadow-2xl rounded-3xl md:rounded-full px-2 sm:px-3 sm:pr-3 py-2 ${
          isOpen ? "sm:rounded-3xl" : "sm:rounded-full"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* GitHub logo */}
          <Tooltip hasArrow position="bottom" label="Visit my GitHub Account">
            <a
              href="https://github.com/Andikss"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text hover:text-gray-400 flex items-center gap-2"
            >
              <FaGithub size={32} />
              <span className="text-xl text-text">AndikaDS</span>
            </a>
          </Tooltip>

          {/* Desktop Links (hidden on mobile) */}
          <div className="hidden md:flex space-x-6 ml-auto items-center text-text">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`hover:text-gray-400 hover:underline ${
                  activeSection === item.href ? "text-accent" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
            <Tooltip hasArrow position="bottom" label="Email me">
              <a href="mailto:andikadwisaputra.dev@gmail.com" target="_blank">
                <Button variant="outline" className="rounded-full">
                  <BsEnvelope /> Email
                </Button>
              </a>
            </Tooltip>
          </div>

          {/* Hamburger menu icon */}
          <div className="md:hidden shrink-0">
            <animated.button
              onClick={toggleMenu}
              style={iconAnimation}
              className="text-text shrink-0 hover:text-gray-400 focus:outline-none pr-2 flex items-center justify-center"
            >
              {isOpen ? (
                <HiX size={18} className="shrink-0" />
              ) : (
                <FaList size={18} className="shrink-0" />
              )}
            </animated.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <animated.div
          style={{
            ...menuAnimation,
            overflow: "hidden",
          }}
          className={`md:hidden text-text flex flex-col items-center justify-between`}
        >
          <div className="space-y-2 mt-8 flex flex-col justify-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`block hover:text-gray-400 text-center ${
                  activeSection === item.href ? "text-accent" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex gap-2">
            <Tooltip hasArrow position="top" label="Email me">
              <a href="mailto:andikadwisaputra.dev@gmail.com" target="_blank">
                <Button
                  variant="outline"
                  className="rounded-sm shadow-lg w-full"
                >
                  <BsEnvelope /> Email
                </Button>
              </a>
            </Tooltip>
            <Tooltip hasArrow position="top" label="Visit my GitHub profile">
              <Button variant="outline" className="rounded-sm shadow-lg w-full">
                <BsGithub /> GitHub
              </Button>
            </Tooltip>
          </div>
        </animated.div>
      </div>
    </nav>
  );
};
