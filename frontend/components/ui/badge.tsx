import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border transition-colors",
  {
    variants: {
      variant: {
        common: "bg-slate-500/15 border-slate-500/30 text-slate-300",
        uncommon: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
        rare: "bg-blue-500/15 border-blue-500/30 text-blue-300",
        epic: "bg-violet-500/15 border-violet-500/30 text-violet-300",
        legendary:
          "bg-gradient-to-r from-amber-500/20 to-violet-500/20 border-amber-500/40 text-amber-300",
        currency: "bg-amber-500/15 border-amber-500/30 text-amber-300",
        weapon: "bg-blue-500/15 border-blue-500/30 text-blue-300",
        armor: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
        outline: "bg-transparent border-white/15 text-muted",
      },
    },
    defaultVariants: { variant: "common" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
