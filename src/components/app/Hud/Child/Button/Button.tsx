import React from "react";

/**
 * @author Andika Dwi Saputra
 *
 * @date 30/03/2025
 * @description Button component
 */

export const Button: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  return (
    <button
      data-hud-toggle
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
      className="fixed left-0 top-1/2 -translate-y-1/2 
      w-3 h-24 cursor-pointer
      backdrop-blur-sm rounded-r-lg 
      bg-[var(--dark)] hover:bg-[var(--foreground)]
      hover:w-4 shadow-md transition-all duration-300 
      z-50 active:scale-95"
    ></button>
  );
};
