import { SectionInfo, NavLink } from "@/types";

/**
 * Calculate section visibility in viewport for scroll spy functionality
 * 
 * @author Andika Dwi Saputra
 * @param section The section to calculate visibility for
 * @returns The visibility score of the section (0-1.5)
 */
export const calculateSectionVisibility = (section: { element: HTMLElement | null }) => {
  if (!section.element) return 0;
  
  const rect = section.element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // Calculate how much of the section is visible in the viewport
  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, viewportHeight);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);

  // Calculate visibility as a percentage of the element's height
  const percentVisible = visibleHeight / rect.height;

  // Special case: if element top is close to the top of the viewport
  const topProximityBonus = rect.top > 0 && rect.top < 100 ? 0.5 : 0;
  
  return percentVisible + topProximityBonus;
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
    .filter((link) => link.path.startsWith("#")) // Only include section links
    .map((link) => ({
      id: link.path.substring(1), // Remove # from the path
      element: document.getElementById(link.path.substring(1)),
      path: link.path,
    }))
    .filter((section) => section.element !== null);
};

/**
 * Handle smooth scrolling for hash links
 * 
 * @author Andika Dwi Saputra
 * @param targetId The ID of the element to scroll to
 */
export const scrollToSection = (targetId: string) => {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 100, // Offset for navbar height
      behavior: "smooth",
    });
  }
};

/**
 * Determine the most visible section in the viewport
 * 
 * @author Andika Dwi Saputra
 * @param sections Array of section info objects
 * @returns Object containing the most visible section and its visibility score
 */
export const findMostVisibleSection = (sections: SectionInfo[]) => {
  let mostVisibleSection: SectionInfo | null = null;
  let maxVisibility = 0;

  for (const section of sections) {
    const totalVisibility = calculateSectionVisibility(section);

    if (totalVisibility > maxVisibility) {
      maxVisibility = totalVisibility;
      mostVisibleSection = section;
    }
  }

  return { mostVisibleSection, maxVisibility };
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
) => {
  // For the home page
  if (typeof window !== "undefined" && window.location.pathname === "/") {
    const sections = prepareSections(navLinks);

    // If near the top of the page, set Home as active
    if (window.scrollY < 300) {
      setActiveLink("/#home");
      return;
    }

    const { mostVisibleSection, maxVisibility } = findMostVisibleSection(sections);

    // Update active link if a section is found and is at least 10% visible
    if (mostVisibleSection && maxVisibility > 0.1) {
      // Use the full path with hash for accurate matching
      setActiveLink(`/#${mostVisibleSection.id}`);
    }
  }
}; 