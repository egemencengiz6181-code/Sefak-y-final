"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** easeOutExpo-ish — matches the previous [0.16, 1, 0.3, 1] curve closely. */
function easeOut(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Minimal numeric tween. This was the only reason the whole framer-motion
 * bundle was pulled into every page that rendered a GlowingEffect.
 */
function tween(
  from: number,
  to: number,
  durationMs: number,
  onUpdate: (v: number) => void
): () => void {
  let raf = 0;
  let start = 0;
  const step = (now: number) => {
    if (!start) start = now;
    const t = Math.min(1, (now - start) / durationMs);
    onUpdate(from + (to - from) * easeOut(t));
    if (t < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);
    const cancelTweenRef = useRef<(() => void) | null>(null);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          cancelTweenRef.current?.();
          cancelTweenRef.current = tween(
            currentAngle,
            newAngle,
            movementDuration * 1000,
            (value) => {
              element.style.setProperty("--start", String(value));
            }
          );
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      // Pointer-tracking glow is a desktop-only affordance. On touch devices
      // every instance would add a body-level pointermove listener that runs
      // getBoundingClientRect on each drag frame, so skip it entirely.
      if (
        typeof window !== "undefined" &&
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        return;
      }

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        cancelTweenRef.current?.();
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #E21F26 10%, #E21F2600 20%),
                radial-gradient(circle at 40% 40%, #2E3192 5%, #2E319200 15%),
                radial-gradient(circle at 60% 60%, #E21F26 10%, #E21F2600 20%),
                radial-gradient(circle at 40% 60%, #2E3192 10%, #2E319200 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #E21F26 0%,
                  #2E3192 calc(25% / var(--repeating-conic-gradient-times)),
                  #E21F26 calc(50% / var(--repeating-conic-gradient-times)),
                  #2E3192 calc(75% / var(--repeating-conic-gradient-times)),
                  #E21F26 calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)]",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
