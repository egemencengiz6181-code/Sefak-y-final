import { cn } from "@/lib/utils";
import Reveal from "@/components/shared/Reveal";

// ─── Highlight (inline word / phrase marker) ─────────────────────────────────
interface HighlightProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The marker sweep is a pure CSS scaleX transition — it used to be two
 * framer-motion spans per highlighted phrase.
 */
export function Highlight({ children, className }: HighlightProps) {
  return (
    <span className={cn("relative inline highlight-marker", className)}>
      <span
        className="absolute inset-0 -z-10 rounded-sm bg-gradient-to-r from-[#E21F26]/30 to-[#2E3192]/20 highlight-sweep"
        style={{ bottom: "-2px", top: "2px" }}
      />
      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E21F26] via-[#E65F5F] to-[#E21F26] rounded-full highlight-sweep highlight-sweep-delayed" />
      <span className="relative text-[#E65F5F]">{children}</span>
    </span>
  );
}

// ─── HeroHighlight (full quote / hero text block) ────────────────────────────
interface HeroHighlightProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

/**
 * The previous version tracked the cursor with React state, re-rendering the
 * whole subtree on every mousemove. The ambient glow is now static CSS.
 */
export function HeroHighlight({
  children,
  className,
  containerClassName,
}: HeroHighlightProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-3xl",
        containerClassName
      )}
    >
      {/* Static ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_50%,rgba(46,49,146,0.07),transparent)] pointer-events-none" />

      <Reveal onScroll className={cn("relative z-10 text-center px-6 py-16", className)}>
        {children}
      </Reveal>
    </div>
  );
}
