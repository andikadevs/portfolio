import Link from "next/link";
import { X } from "lucide-react";
import { NavLink } from "@/types";
import { SocialLinks } from "../SocialLinks";
import { usePathname } from "next/navigation";

/**
 * @author Andika Dwi Saputra
 *
 * @date 30/03/2025
 * @description MobileMenu component
 */

export const MobileMenu = ({
  isOpen,
  setIsOpen,
  navLinks,
  activeLink,
  handleLinkClick,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
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
    <div
      className={`fixed inset-0 bg-[var(--dark)] h-screen z-50 transition-all duration-500 ease-in-out ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none -translate-y-10"
      }`}
    >
      {/* Close button for mobile */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 p-2 rounded-md bg-[var(--foreground)] text-[var(--accent)]"
        aria-label="Close menu"
      >
        <X size={24} strokeWidth={1.5} />
      </button>

      <div className="min-h-screen flex flex-col justify-center px-6">
        <div className="flex flex-col gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={(e) => handleLinkClick(link.path, e)}
              className={`flex items-center group transition-all duration-300 ease-out ${
                isLinkActive(link)
                  ? "text-[var(--accent)]"
                  : "text-[var(--text)]"
              }`}
              style={{
                transitionDelay: `${index * 50}ms`,
                opacity: isOpen ? 1 : 0,
              }}
            >
              <span className="w-6 h-[2px] bg-[var(--accent)] mr-4 transition-all duration-300 group-hover:w-12" />
              <span className="text-2xl font-medium tracking-wide">
                {link.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Social links for mobile */}
        <div
          className="mt-16 transition-all duration-500"
          style={{
            transitionDelay: `${navLinks.length * 50 + 100}ms`,
            opacity: isOpen ? 1 : 0,
          }}
        >
          <SocialLinks isMobile={true} />
        </div>
      </div>
    </div>
  );
};
