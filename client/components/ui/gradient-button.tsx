"use client";

import type React from "react";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export const GradientButton = forwardRef<
  HTMLButtonElement,
  GradientButtonProps
>(
  (
    { variant = "primary", size = "md", className, children, ...props },
    ref
  ) => {
    const baseClasses =
      "relative inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary disabled:opacity-50 disabled:pointer-events-none";

    const sizeClasses = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-4 py-2",
      lg: "text-base px-6 py-3",
    };

    const variantClasses = {
      primary: "text-white",
      secondary: "text-white bg-secondary hover:bg-secondary/80",
      outline:
        "text-foreground bg-transparent border border-border hover:bg-accent/10",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {variant === "primary" && (
          <>
            <span className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></span>
            <span className="absolute inset-[1px] rounded-[5px] bg-gradient-to-br from-violet-900/90 via-slate-900 to-slate-950"></span>
            <span className="relative flex items-center">{children}</span>
          </>
        )}
        {variant !== "primary" && children}
      </motion.button>
    );
  }
);

GradientButton.displayName = "GradientButton";
