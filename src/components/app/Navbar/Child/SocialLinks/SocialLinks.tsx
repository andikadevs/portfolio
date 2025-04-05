import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

/**
 * @author Andika Dwi Saputra
 *
 * @date 30/03/2025
 * @description SocialLinks component
 */

export const SocialLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
  return (
    <div
      className={`${isMobile ? "flex" : "hidden lg:flex"} items-center ${
        isMobile ? "justify-center gap-8" : "gap-4"
      }`}
    >
      <a
        href="https://github.com/Andikss"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--text)] hover:text-[var(--accent)] transition-all duration-300 hover:-translate-y-1"
        aria-label="GitHub"
      >
        <IconBrandGithub size={isMobile ? 24 : 20} strokeWidth={1.5} />
      </a>
      <a
        href="https://linkedin.com/in/andikadwisaputra"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--text)] hover:text-[var(--accent)] transition-all duration-300 hover:-translate-y-1"
        aria-label="LinkedIn"
      >
        <IconBrandLinkedin size={isMobile ? 24 : 20} strokeWidth={1.5} />
      </a>
    </div>
  );
};
