"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  duration?: number;
  className?: string;
  /** When true, starts count-up immediately instead of waiting for scroll into view. */
  start?: boolean;
}

/**
 * Parses a string like "75,000" into a numeric target, animates a count-up
 * on scroll into view, then re-renders it with the original comma formatting.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.6,
  className,
  start = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const target = Number(value.replace(/,/g, ""));
  const isNumeric = !Number.isNaN(target);
  const [display, setDisplay] = useState(isNumeric ? "0" : value);
  const shouldRun = start || isInView;

  useEffect(() => {
    if (!shouldRun || !isNumeric) return;

    if (shouldReduceMotion) {
      setDisplay(target.toLocaleString("en-US"));
      return;
    }

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(current.toLocaleString("en-US"));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shouldRun, isNumeric, target, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
