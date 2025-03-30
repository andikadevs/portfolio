import { Moon, Sun } from "lucide-react";

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
      className="relative flex items-center justify-center w-9 h-9 rounded-full overflow-hidden transition-all duration-300 focus:outline-none bg-[var(--foreground)] border border-[var(--accent)] shadow-sm"
      aria-label="Toggle dark mode"
    >
      {mounted && (
        <div
          className={`transition-all duration-500 ease-in-out ${
            theme === "dark" ? "rotate-180" : "rotate-0"
          }`}
        >
          {theme === "dark" ? (
            <Sun size={18} className="text-[var(--accent)]" strokeWidth={2.5} />
          ) : (
            <Moon
              size={18}
              className="text-[var(--accent)]"
              strokeWidth={2.5}
            />
          )}
        </div>
      )}
    </button>
  );
};
