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
      "relative flex cursor-pointer justify-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-full transition-all duration-300 overflow-hidden hover:scale-[1.03] active:scale-[0.98]";

    const variants = {
      primary:
        "bg-[var(--dark)] text-[var(--text)] shadow-md hover:shadow-[var(--accent)]/20",
      secondary:
        "bg-gradient-to-br from-[var(--foreground)]/10 to-[var(--foreground)]/20 backdrop-blur-sm border border-[var(--foreground)]/30 text-[var(--text)] hover:bg-[var(--foreground)]/25 hover:border-[var(--foreground)]/40 hover:shadow-md",
    };

    const buttonContent = (
      <>
        <span
          className={
            variant === "primary"
              ? "absolute inset-0 bg-[var(--accent)]/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"
              : "absolute inset-0 bg-[var(--accent)]/5 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"
          }
        ></span>
        <span className="relative z-10 flex items-center gap-2">
          {icon && icon}
          {children}
        </span>
      </>
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
          {buttonContent}
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {buttonContent}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
