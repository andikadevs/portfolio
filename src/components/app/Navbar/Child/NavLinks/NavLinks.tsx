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
    // For hash links on homepage
    if (link.path.includes("#") && pathname === "/") {
      return (
        activeLink === link.path ||
        (activeLink.includes("#") &&
          link.path.endsWith(activeLink.substring(activeLink.indexOf("#"))))
      );
    }

    // For regular page links
    return pathname === link.path || activeLink === link.path;
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
            className={`text-base text-[var(--text)] transition-all duration-300 ease-out ${
              isLinkActive(link)
                ? "text-[var(--accent)]"
                : "hover:text-[var(--accent)]"
            }`}
          >
            {link.name}
          </span>
          <span
            className={`absolute bottom-0 left-0 w-full h-[2px] ${
              isLinkActive(link)
                ? "bg-[var(--accent)] scale-x-100"
                : "bg-[var(--accent)] scale-x-0 group-hover:scale-x-100"
            } transition-transform duration-300 ease-out origin-left`}
          />
        </Link>
      ))}
    </div>
  );
};
