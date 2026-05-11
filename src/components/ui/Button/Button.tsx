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

    const variants = {
      primary:
        "bg-accent text-white border-2 border-accent/80 shadow-[2px_3px_0px_rgba(44,24,16,0.22)] hover:shadow-[3px_4px_0px_rgba(44,24,16,0.28)] active:shadow-[1px_1px_0px_rgba(44,24,16,0.2)]",
      secondary:
        "bg-[var(--paper)] text-text border-2 border-kraft shadow-[2px_3px_0px_rgba(44,24,16,0.12)] hover:shadow-[3px_4px_0px_rgba(44,24,16,0.18)] active:shadow-[1px_1px_0px_rgba(44,24,16,0.1)]",
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
          className={cn(baseStyles, variants[variant], className)}
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
        className={cn(baseStyles, variants[variant], className)}
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
