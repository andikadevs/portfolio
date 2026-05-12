"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      href,
      icon,
      external,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative flex cursor-pointer justify-center items-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 gap-2";

    const variantClass = {
      primary: "text-white",
      secondary: "text-[var(--text)]",
    };

    const variantStyle: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: "var(--accent)",
        border: "2px solid var(--accent)",
        boxShadow: "2px 3px 0px rgba(36,22,16,0.25)",
      },
      secondary: {
        backgroundColor: "var(--paper)",
        border: "2px solid var(--kraft)",
        boxShadow: "2px 3px 0px rgba(36,22,16,0.12)",
      },
    };

    const content = (
      <span className="flex items-center gap-2">
        {icon && icon}
        {children}
      </span>
    );

    if (href) {
      return (
        <Link
          href={href}
          className={cn(baseStyles, variantClass[variant], className)}
          style={variantStyle[variant]}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {content}
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variantClass[variant], className)}
        style={variantStyle[variant]}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0, scale: 0.98 }}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
