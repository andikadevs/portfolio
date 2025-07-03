/** @format */

import Link from "next/link";
import { NavLink } from "@/types";
import { usePathname } from "next/navigation";

/**
 * @author Andika Dwi Saputra
 *
 * @date 30/03/2025
 * @description NavLinks component
 */

export const NavLinks = ({
  navLinks,
  activeLink,
  handleLinkClick,
}: {
  navLinks: NavLink[];
  activeLink: string;
  handleLinkClick: (path: string, e: React.MouseEvent) => void;
}) => {
  const pathname = usePathname();

  // Helper function to check if a link is active
  const isLinkActive = (link: NavLink) => {
    // Extract the section IDs for comparison
    const activeSectionId = activeLink.includes("#")
      ? activeLink.split("#")[1]
      : "";
    const linkSectionId = link.path.includes("#")
      ? link.path.split("#")[1]
      : "";

    // Case 1: Exact match (including hash links)
    if (activeLink === link.path) {
      return true;
    }

    // Case 2: Both are hash links and the sections match
    if (
      activeLink.includes("#") &&
      link.path.includes("#") &&
      activeSectionId === linkSectionId
    ) {
      return true;
    }

    // Case 3: For regular pages (no hash)
    if (!link.path.includes("#") && pathname === link.path) {
      return true;
    }

    return false;
  };

  return (
    <div className="hidden lg:flex items-center gap-5">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.path}
          className="relative overflow-hidden px-1 py-2 group"
          onClick={(e) => handleLinkClick(link.path, e)}
        >
          <span
            className={`text-base text-[var(--text)] transition-colors duration-300 ease-out ${
              isLinkActive(link)
                ? "text-[var(--accent)]"
                : "hover:text-[var(--accent)]"
            }`}
          >
            {link.name}
          </span>
          <span
            className={`absolute bottom-0 left-0 w-full h-[2px] bg-[var(--accent)] transform transition-transform duration-300 ease-out ${
              isLinkActive(link)
                ? "scale-x-100"
                : "scale-x-0 group-hover:scale-x-100"
            }`}
            style={{
              transformOrigin: "left",
              willChange: "transform",
            }}
          />
        </Link>
      ))}
    </div>
  );
};
