"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RotatingTextProps {
  items: string[];
  className?: string;
  intervalMs?: number;
  paused?: boolean;
}

export function RotatingText({ items, className, intervalMs = 2600, paused = false }: RotatingTextProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const hasRotated = useRef(false);

  useLayoutEffect(() => {
    if (reduced || paused || items.length < 2) return;
    const id = window.setInterval(() => {
      hasRotated.current = true;
      setIndex((current) => (current + 1) % items.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [items.length, intervalMs, reduced, paused]);

  const current = items[index] ?? items[0];

  if (reduced || items.length < 2) {
    return <span className={cn("gradient-text-shimmer", className)}>{current}</span>;
  }

  return (
    <span className={cn("relative inline-grid min-h-[1.15em] overflow-hidden text-left", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          initial={
            hasRotated.current
              ? { y: "110%", opacity: 0, filter: "blur(6px)", scale: 0.98 }
              : false
          }
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ y: "-110%", opacity: 0, filter: "blur(6px)", scale: 0.98 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="gradient-text-shimmer col-start-1 row-start-1 block sm:whitespace-nowrap"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
