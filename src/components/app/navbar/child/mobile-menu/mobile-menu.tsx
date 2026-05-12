import Link from "next/link";
import { IconX } from "@tabler/icons-react";
import { NavLink } from "@/types";
import { SocialLinks } from "../social-links";
import { usePathname } from "next/navigation";

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

  const isLinkActive = (link: NavLink) => {
    if (link.path.includes("#") && pathname === "/") {
      return (
        activeLink === link.path ||
        (activeLink.includes("#") &&
          link.path.endsWith(activeLink.substring(activeLink.indexOf("#"))))
      );
    }
    return pathname === link.path || activeLink === link.path;
  };

  return (
    <div
      className={`fixed inset-0 h-screen z-50 transition-all duration-400 ease-in-out ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none -translate-y-10"
      }`}
      style={{ backgroundColor: "var(--paper)" }}
    >
      {/* Tape strip at top */}
      <div className="h-1 w-full" style={{ background: "var(--tape-yellow)" }} />

      {/* Header row */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-caveat text-2xl font-bold text-text cursor-pointer"
          onClick={(e) => handleLinkClick("/", e)}
        >
          AndikaDS
        </Link>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-sm cursor-pointer text-accent hover:-translate-y-0.5 transition-transform"
          aria-label="Close menu"
          style={{ border: "1px solid var(--kraft)" }}
        >
          <IconX size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Ruled lines background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 27px, rgba(184,151,106,0.14) 27px, rgba(184,151,106,0.14) 28px)",
          backgroundSize: "100% 28px",
        }}
      />

      {/* Nav links */}
      <div className="relative min-h-screen flex flex-col justify-center px-8 pb-24">
        <div className="flex flex-col gap-2">
          {navLinks.map((link, index) => {
            const active = isLinkActive(link);
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={(e) => handleLinkClick(link.path, e)}
                className="relative flex items-center py-3 group cursor-pointer"
                style={{
                  transitionDelay: `${index * 40}ms`,
                  opacity: isOpen ? 1 : 0,
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                {/* Tape indicator for active */}
                <span
                  className="w-8 h-[3px] rounded-sm mr-4 flex-shrink-0 transition-all duration-300"
                  style={{
                    background: active ? "var(--tape-yellow)" : "var(--kraft)",
                    opacity: active ? 1 : 0.4,
                    width: active ? "2rem" : "1rem",
                  }}
                />
                <span
                  className="font-caveat text-3xl font-bold transition-colors duration-200"
                  style={{ color: active ? "var(--accent)" : "var(--text)" }}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Social links */}
        <div
          className="mt-12 transition-all duration-400"
          style={{
            transitionDelay: `${navLinks.length * 40 + 80}ms`,
            opacity: isOpen ? 1 : 0,
          }}
        >
          <SocialLinks isMobile={true} />
        </div>
      </div>
    </div>
  );
};
