/** @format */

"use client";

import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { ButtonProps } from "./ButtonProps";

export const Button: React.FC<ButtonProps> = ({
  onClick,
  className = "",
  children,
  disabled = false,
  variant = "fill",
  size = "md",
}) => {
  // Combined springs for multiple animations
  const [springs, api] = useSpring(() => ({
    scale: 1,
    y: 0,
    shadow: 0,
    config: {
      tension: 400,
      friction: 17,
    },
  }));

  // Handle hover animations
  const handleMouseEnter = () => {
    if (!disabled) {
      api.start({
        y: -4,
        shadow: 8,
        scale: 1.02,
      });
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      api.start({
        y: 0,
        shadow: 0,
        scale: 1,
      });
    }
  };

  // Enhanced click animation
  const handleMouseDown = () => {
    if (!disabled) {
      api.start({
        scale: 0.95,
        y: -2,
        shadow: 4,
      });
    }
  };

  const handleMouseUp = () => {
    if (!disabled) {
      api.start({
        scale: 1.02,
        y: -4,
        shadow: 8,
      });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const baseStyles =
    "flex items-center justify-center gap-2 transition-colors duration-300 ease-in-out rounded-md";
  const fillStyles = "bg-accent hover:brightness-110 text-secondary";
  const outlineStyles =
    "bg-transparent border border-accent hover:bg-accent hover:text-secondary text-accent";
  const disabledStyles =
    "bg-transparent border border-dark text-dark cursor-not-allowed hover:bg-transparent hover:!text-dark";

  // Size variants
  const sizeStyles =
    size === "sm" ? "px-2 py-1 text-sm" : "px-4 py-2 text-base";

  // Determine the styles based on the variant and size
  const variantStyles = variant === "fill" ? fillStyles : outlineStyles;

  return (
    <animated.button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        boxShadow: springs.shadow.to(
          (s) => `0 ${s}px ${s * 2}px rgba(0, 0, 0, 0.15)`
        ),
        scale: springs.scale,
        translateY: springs.y.to((y) => `${y}px`),
      }}
      className={`${
        disabled ? disabledStyles : ""
      } ${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled}
    >
      {children}
    </animated.button>
  );
};
