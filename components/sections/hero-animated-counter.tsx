"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type HeroAnimatedCounterProps = {
  value: string;
  suffix?: string;
  duration?: number;
  delay?: number;
};

export function HeroAnimatedCounter({
  value,
  suffix = "",
  duration = 1800,
  delay = 450,
}: HeroAnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const timerRef = useRef<number | null>(null);
  const delayRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const target = Math.max(0, Number(value) || 0);
    const finalText = `${target}${suffix}`;

    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (delayRef.current !== null) {
      window.clearTimeout(delayRef.current);
      delayRef.current = null;
    }

    if (reduced) {
      el.textContent = finalText;
      return;
    }

    if (target === 0) {
      el.textContent = finalText;
      return;
    }

    el.textContent = `0${suffix}`;

    delayRef.current = window.setTimeout(() => {
      let step = 0;
      const stepMs = Math.max(90, Math.floor(duration / target));

      timerRef.current = window.setInterval(() => {
        step += 1;
        const next = Math.min(step, target);
        el.textContent = `${next}${suffix}`;

        if (next >= target && timerRef.current !== null) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }, stepMs);
    }, delay);

    return () => {
      if (delayRef.current !== null) {
        window.clearTimeout(delayRef.current);
        delayRef.current = null;
      }
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [delay, duration, reduced, suffix, value]);

  return (
    <span ref={ref} suppressHydrationWarning className="hero-count">
      0{suffix}
    </span>
  );
}
