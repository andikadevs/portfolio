/** @format */

import { SectionInfo, NavLink } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
/**
 * Calculate section visibility in viewport for scroll spy functionality
 *
 * @author Andika Dwi Saputra
 * @param section The section to calculate visibility for
 * @returns The visibility score of the section (0-1)
 */
export const calculateSectionVisibility = (section: SectionInfo): number => {
  if (!section.element) return 0;

  const rect = section.element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // Simple calculation: how much of the section is in the viewport
  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, viewportHeight);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);

  // Visibility score between 0 and 1
  return visibleHeight / rect.height;
};

/**
 * Prepare sections data from nav links for scroll spy
 *
 * @author Andika Dwi Saputra
 * @param navLinks Array of navigation links to prepare for scroll spy
 * @returns Array of section info objects with DOM references
 */
export const prepareSections = (navLinks: NavLink[]): SectionInfo[] => {
  return navLinks
    .filter((link) => link.path.includes("#")) // Include all hash links
    .map((link) => {
      const id = link.path.substring(link.path.indexOf("#") + 1); // Extract ID from path
      const element = document.getElementById(id);

      // Debug to help troubleshoot if elements aren't being found
      if (
        !element &&
        typeof window !== "undefined" &&
        process.env.NODE_ENV === "development"
      ) {
        console.warn(
          `Section with ID "${id}" not found in the DOM for link "${link.path}"`
        );
      }

      return {
        id,
        element,
        path: link.path,
      };
    })
    .filter((section) => section.element !== null);
};

/**
 * Handle smooth scrolling for hash links
 *
 * @author Andika Dwi Saputra
 * @param targetId The ID of the element to scroll to
 * @param fromDifferentPage Should page navigation occur if not on home page
 */
export const scrollToSection = (
  router: AppRouterInstance,
  targetId: string,
  fromDifferentPage: boolean = false
): void => {
  // If we're not on the home page and this is triggered from a link click, navigate to home page
  if (
    fromDifferentPage &&
    typeof window !== "undefined" &&
    window.location.pathname !== "/"
  ) {
    router.push(`/#${targetId}`);
    return;
  }

  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 100, // Offset for navbar height
      behavior: "smooth",
    });
  }
};

/**
 * Handle scroll spy functionality to update active link based on scroll position
 *
 * @author Andika Dwi Saputra
 * @param navLinks Array of navigation links
 * @param setActiveLink Function to update active link state
 */
export const handleScrollSpy = (
  navLinks: NavLink[],
  setActiveLink: (path: string) => void
): void => {
  // Only run on home page
  if (typeof window === "undefined" || window.location.pathname !== "/") {
    return;
  }

  // Get all sections with IDs that match our navigation links
  const sections = navLinks
    .filter((link) => link.path.includes("#"))
    .map((link) => {
      const id = link.path.split("#")[1];
      return {
        id,
        element: document.getElementById(id),
        path: link.path,
      };
    })
    .filter((section) => section.element !== null);

  if (sections.length === 0) return;

  // Very top of page - always select Home
  if (window.scrollY < 50) {
    setActiveLink("/#home");
    return;
  }

  // Find the section that's currently most visible in the viewport
  const headerOffset = 100; // Account for fixed header

  let currentSection: SectionInfo | null = null;

  // First pass: check for sections currently in primary viewing area
  for (const section of sections) {
    if (!section.element) continue;

    const rect = section.element.getBoundingClientRect();

    // Check if this section is in the primary viewing area
    // Primary area is when the section top is at or just past the header
    if (rect.top <= headerOffset && rect.bottom > headerOffset) {
      currentSection = section;
      break; // We found our section, no need to continue checking
    }
  }

  // If no section was found in the primary area, use a backup approach
  if (!currentSection) {
    // Look for the section closest to entering the viewport from the top
    let minDistance = Infinity;

    for (const section of sections) {
      if (!section.element) continue;

      const rect = section.element.getBoundingClientRect();

      // Skip sections that are completely above viewport
      if (rect.bottom < 0) continue;

      // Calculate how close this section is to the primary viewing area
      const distance = Math.abs(rect.top - headerOffset);

      if (distance < minDistance) {
        minDistance = distance;
        currentSection = section;
      }
    }
  }

  // Update active link if we found a section
  if (currentSection) {
    setActiveLink(currentSection.path);
  }
};
