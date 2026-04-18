"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium text-sm leading-none",
    "rounded-xl border transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-legendary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "select-none cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-gold text-background border-gold/50",
          "hover:bg-amber-400 hover:border-amber-400 hover:shadow-lg hover:shadow-gold/25",
          "active:scale-[0.97]",
        ].join(" "),
        outline: [
          "bg-transparent border-white/15 text-foreground",
          "hover:bg-white/5 hover:border-white/30",
          "active:scale-[0.97]",
        ].join(" "),
        ghost: [
          "bg-transparent border-transparent text-muted",
          "hover:bg-white/5 hover:text-foreground",
          "active:scale-[0.97]",
        ].join(" "),
        legendary: [
          "bg-legendary/10 border-legendary/40 text-legendary",
          "hover:bg-legendary/20 hover:border-legendary/60 hover:shadow-lg hover:shadow-legendary/20",
          "active:scale-[0.97]",
        ].join(" "),
        destructive: [
          "bg-red-500/10 border-red-500/30 text-red-400",
          "hover:bg-red-500/20 hover:border-red-500/50",
        ].join(" "),
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-lg",
        md: "h-10 px-5",
        lg: "h-12 px-7 text-base rounded-xl",
        xl: "h-14 px-9 text-base rounded-2xl",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
