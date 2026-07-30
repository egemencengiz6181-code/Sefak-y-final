'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  /** Wait for the element to scroll into view instead of revealing on mount. */
  onScroll?: boolean;
  direction?: Direction;
  /** Milliseconds. */
  delay?: number;
  className?: string;
  as?: ElementType;
  style?: React.CSSProperties;
}

const OFFSET: Record<Direction, string> = {
  up: 'translate3d(0, 24px, 0)',
  down: 'translate3d(0, -24px, 0)',
  left: 'translate3d(-32px, 0, 0)',
  right: 'translate3d(32px, 0, 0)',
  none: 'none',
};

/**
 * CSS-only replacement for the `motion.div` fade/slide reveals this site used
 * everywhere. framer-motion cost ~50 kB gzip on every page that imported it,
 * for animations the compositor can do on its own.
 *
 * Transform + opacity only, so it never triggers layout.
 */
export default function Reveal({
  children,
  onScroll = false,
  direction = 'up',
  delay = 0,
  className,
  as: Tag = 'div',
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(!onScroll);

  useEffect(() => {
    if (!onScroll) return;

    const node = ref.current;
    if (!node) return;

    // No IntersectionObserver (or reduced motion): show immediately.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [onScroll]);

  return (
    <Tag
      ref={ref}
      className={cn('motion-reveal', shown && 'is-visible', className)}
      style={{
        ...style,
        transitionDelay: delay ? `${delay}ms` : undefined,
        ['--reveal-from' as string]: OFFSET[direction],
      }}
    >
      {children}
    </Tag>
  );
}
