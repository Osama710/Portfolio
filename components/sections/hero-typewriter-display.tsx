"use client";

import { useEffect, useState } from "react";
import {
  HERO_DELETE_MS,
  HERO_GAP_MS,
  HERO_HOLD_MS,
  HERO_TYPEWRITER_START_MS,
  HERO_TYPE_MS,
} from "@/lib/hero-motion";

type HeroTypewriterDisplayProps = {
  items: readonly string[];
};

/** Types the first phrase after hero rotator appears, then rotates. */
export function HeroTypewriterDisplay({ items }: HeroTypewriterDisplayProps) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (items.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setDisplay(items[0] ?? "");
      if (items.length < 2) return;
      let i = 0;
      const id = window.setInterval(() => {
        i = (i + 1) % items.length;
        setDisplay(items[i]);
      }, HERO_HOLD_MS);
      return () => window.clearInterval(id);
    }

    let index = 0;
    let text = items[0] ?? "";
    let charIndex = 0;
    let phase: "hold" | "delete" | "type" = "type";
    let timer = 0;
    let cancelled = false;

    const schedule = (ms: number, fn: () => void) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    const loop = () => {
      if (phase === "hold") {
        schedule(HERO_HOLD_MS, () => {
          phase = "delete";
          loop();
        });
        return;
      }

      if (phase === "delete") {
        if (charIndex > 0) {
          charIndex -= 1;
          setDisplay(text.slice(0, charIndex));
          schedule(HERO_DELETE_MS, loop);
        } else {
          index = (index + 1) % items.length;
          text = items[index];
          phase = "type";
          schedule(HERO_GAP_MS, loop);
        }
        return;
      }

      if (charIndex < text.length) {
        charIndex += 1;
        setDisplay(text.slice(0, charIndex));
        schedule(HERO_TYPE_MS, loop);
      } else {
        phase = "hold";
        loop();
      }
    };

    timer = window.setTimeout(() => {
      if (!cancelled) loop();
    }, HERO_TYPEWRITER_START_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [items]);

  return (
    <span className="inline-flex items-baseline sm:whitespace-nowrap">
      <span suppressHydrationWarning className="hero-typewriter-text gradient-text-shimmer inline-block min-w-[12ch]">
        {display}
      </span>
      <span className="hero-typewriter-cursor ml-0.5 text-accent-cyan" aria-hidden="true">
        |
      </span>
    </span>
  );
}
