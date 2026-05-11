/** @format */

import Link from "next/link";
import { NavLink } from "@/types";
import { usePathname } from "next/navigation";

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

  const isLinkActive = (link: NavLink) => {
    const activeSectionId = activeLink.includes("#") ? activeLink.split("#")[1] : "";
    const linkSectionId = link.path.includes("#") ? link.path.split("#")[1] : "";

    if (activeLink === link.path) return true;
    if (activeLink.includes("#") && link.path.includes("#") && activeSectionId === linkSectionId) return true;
    if (!link.path.includes("#") && pathname === link.path) return true;
    return false;
  };

  return (
    <div className="hidden lg:flex items-center gap-1">
      {navLinks.map((link) => {
        const active = isLinkActive(link);
        return (
          <Link
            key={link.name}
            href={link.path}
            className="relative px-3 py-1.5 group cursor-pointer"
            onClick={(e) => handleLinkClick(link.path, e)}
          >
            <span
              className="relative z-10 text-sm font-medium transition-colors duration-200"
              style={{ color: active ? "var(--accent)" : "var(--text)" }}
            >
              {link.name}
            </span>

            {/* Active: tape-strip underline */}
            {active && (
              <span
                className="absolute bottom-0.5 left-2 right-2 h-[3px] rounded-sm"
                style={{
                  background: "var(--tape-yellow)",
                  transform: "rotate(-0.4deg)",
                }}
              />
            )}

            {/* Hover: thinner underline that slides in */}
            {!active && (
              <span
                className="absolute bottom-0.5 left-2 right-2 h-[2px] rounded-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left"
                style={{ background: "var(--tape-blue)", opacity: 0.8 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
};
