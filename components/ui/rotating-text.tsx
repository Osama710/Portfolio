"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RotatingTextProps {
  items: string[];
  className?: string;
  intervalMs?: number;
}

export function RotatingText({ items, className, intervalMs = 2600 }: RotatingTextProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || items.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [items.length, intervalMs, reduced]);

  const current = items[index] ?? items[0];

  if (reduced || items.length < 2) {
    return <span className={cn("gradient-text-shimmer", className)}>{current}</span>;
  }

  return (
    <span className={cn("relative inline-grid min-h-[1.15em] overflow-hidden text-left", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          initial={{ y: "110%", opacity: 0, filter: "blur(8px)", scale: 0.96 }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ y: "-110%", opacity: 0, filter: "blur(8px)", scale: 0.96 }}
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="gradient-text-shimmer col-start-1 row-start-1 block sm:whitespace-nowrap"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
