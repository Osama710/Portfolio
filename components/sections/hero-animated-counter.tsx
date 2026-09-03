"use client";

import { useEffect, useRef } from "react";
import {
  HERO_COUNTER_START_MS,
  HERO_COUNTER_STEP_5_MS,
  HERO_COUNTER_STEP_10_MS,
} from "@/lib/hero-motion";

export function HeroAnimatedCounter({
  value,
  suffix = "+",
  counterId,
}: {
  value: string;
  suffix?: string;
  counterId: string;
}) {
  const target = Number(value) || 0;
  const ref = useRef<HTMLSpanElement>(null);
  const duration = target <= 5 ? HERO_COUNTER_STEP_5_MS : HERO_COUNTER_STEP_10_MS;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    let raf = 0;
    let cancelled = false;

    const start = () => {
      el.textContent = `0${suffix}`;
      const stepMs = duration / (target + 1);
      const t0 = performance.now();

      const tick = (now: number) => {
        if (cancelled) return;
        const step = Math.min(target, Math.floor((now - t0) / stepMs));
        el.textContent = `${step}${suffix}`;
        if (step < target) raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
    };

    const timer = window.setTimeout(start, HERO_COUNTER_START_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, suffix, duration]);

  return (
    <span
      ref={ref}
      suppressHydrationWarning
      className="hero-count hero-count--js"
      data-value={value}
      data-suffix={suffix}
      data-counter-id={counterId}
      aria-label={`${target}${suffix}`}
    >
      0{suffix}
    </span>
  );
}
