import { IconMoon, IconSun } from "@tabler/icons-react";

/**
 * @author Andika Dwi Saputra
 *
 * @date 30/03/2025
 * @description ThemeToggle component
 */

export const ThemeToggle = ({
  theme,
  setTheme,
  mounted,
}: {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  mounted: boolean;
}) => {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative cursor-pointer flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus:outline-none hover:bg-[var(--accent-hover)] bg-transparent"
      aria-label="Toggle dark mode"
    >
      {mounted && (
        <div
          className={`flex items-center justify-center transition-all duration-500 ease-in-out ${
            theme === "dark" ? "rotate-180" : "rotate-0"
          }`}
        >
          {theme === "dark" ? (
            <IconSun size={20} className="text-yellow-400" strokeWidth={2} />
          ) : (
            <IconMoon size={20} className="text-blue-500" strokeWidth={2} />
          )}
        </div>
      )}
    </button>
  );
};
