"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type HeroAnimatedCounterProps = {
  value: string;
  suffix?: string;
  duration?: number;
};

export function HeroAnimatedCounter({ value, suffix = "", duration = 1400 }: HeroAnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const started = useRef(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;

    const target = Number(value) || 0;
    const finalText = `${target}${suffix}`;

    if (reduced) {
      el.textContent = finalText;
      started.current = true;
      return;
    }

    const current = el.textContent?.trim() ?? "";
    if (current === finalText || el.dataset.done === "1") {
      started.current = true;
      return;
    }

    if (el.dataset.animating === "1") {
      started.current = true;
      return;
    }

    started.current = true;
    let raf = 0;
    const from = current.endsWith(suffix) ? Number(current.slice(0, -suffix.length)) || 0 : 0;
    const t0 = performance.now();

    const ease = (p: number) => 1 - Math.pow(1 - p, 4);

    const frame = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const next = Math.round(from + (target - from) * ease(p));
      el.textContent = `${next}${suffix}`;
      if (p < 1) raf = requestAnimationFrame(frame);
    };

    el.textContent = `${from}${suffix}`;
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, [duration, reduced, suffix, value]);

  return (
    <span
      ref={ref}
      suppressHydrationWarning
      className="hero-count"
      data-value={value}
      data-suffix={suffix}
      data-duration={String(duration)}
    />
  );
}
