import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeProps = React.ComponentProps<"span"> & {
  variant?: "default" | "secondary";
};

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        variant === "secondary"
          ? "border-white/10 bg-secondary text-secondary-foreground"
          : "border-transparent bg-primary text-primary-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
