"use client";

import { cn } from "@/lib/utils";

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ShimmerText({ children, className }: ShimmerTextProps) {
  return (
    <div className="overflow-hidden">
      <div
        className={cn("inline-block whitespace-nowrap select-none shimmer-text", className)}
      >
        {children}
      </div>
    </div>
  );
}

export default ShimmerText;
