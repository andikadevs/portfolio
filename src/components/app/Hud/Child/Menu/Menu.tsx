import Link from "next/link";
import React, { forwardRef, ReactElement } from "react";

/**
 * @author Andika Dwi Saputra
 * 
 * @date 30/03/2025
 * @description Menu component
 */

export const Menu = forwardRef<
  HTMLDivElement,
  {
    isOpen: boolean;
    menuItems: {
      icon: ReactElement;
      label: string;
      href: string;
    }[];
  }
>(({ isOpen, menuItems }, ref) => {
  return (
    <div
      ref={ref}
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pl-6
        transform transition-all duration-400 ease-in-out
        ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      onClick={(e) => e.stopPropagation()}
    >
      {menuItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          target="_blank"
          className="group flex items-center bg-[var(--dark)] hover:bg-[var(--foreground)] transition-all duration-300 rounded-full shadow-lg border border-zinc-800/50 w-12 h-12 hover:w-auto hover:pr-5 overflow-hidden"
        >
          <div className="w-10 h-10 ml-[3px] rounded-full bg-[var(--background)] flex items-center justify-center shrink-0 group-hover:scale-90 group-hover:bg-[var(--dark)] transition-all duration-300">
            <div className="text-[var(--accent)]">{item.icon}</div>
          </div>
          <span className="ml-2 font-medium text-[var(--text)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
});

Menu.displayName = "Menu";
