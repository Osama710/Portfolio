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

    let intervalId = 0;
    let timeoutId = 0;
    let cancelled = false;

    timeoutId = window.setTimeout(() => {
      if (cancelled || target <= 0) return;

      let step = 0;
      el.textContent = `0${suffix}`;
      const stepMs = Math.max(80, duration / target);

      intervalId = window.setInterval(() => {
        if (cancelled) return;
        step += 1;
        el.textContent = `${step}${suffix}`;
        if (step >= target) {
          window.clearInterval(intervalId);
        }
      }, stepMs);
    }, HERO_COUNTER_START_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [target, suffix, duration]);

  return (
    <span
      ref={ref}
      suppressHydrationWarning
      className="hero-count"
      data-value={value}
      data-suffix={suffix}
      data-counter-id={counterId}
      aria-label={`${target}${suffix}`}
    >
      0{suffix}
    </span>
  );
}
