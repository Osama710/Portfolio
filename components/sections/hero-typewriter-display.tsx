"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 42;
const DELETE_MS = 26;
const HOLD_MS = 2400;
const GAP_MS = 180;

type HeroTypewriterDisplayProps = {
  items: readonly string[];
};

/** Rotates after hydration — SSR shows the first phrase immediately with CSS cursor blink. */
export function HeroTypewriterDisplay({ items }: HeroTypewriterDisplayProps) {
  const initial = items[0] ?? "";
  const [display, setDisplay] = useState(initial);

  useEffect(() => {
    if (items.length < 2) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      let i = 0;
      const id = window.setInterval(() => {
        i = (i + 1) % items.length;
        setDisplay(items[i]);
      }, HOLD_MS);
      return () => window.clearInterval(id);
    }

    let index = 0;
    let text = items[0];
    let charIndex = text.length;
    let phase: "hold" | "delete" | "type" = "hold";
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
        schedule(HOLD_MS, () => {
          phase = "delete";
          loop();
        });
        return;
      }

      if (phase === "delete") {
        if (charIndex > 0) {
          charIndex -= 1;
          setDisplay(text.slice(0, charIndex));
          schedule(DELETE_MS, loop);
        } else {
          index = (index + 1) % items.length;
          text = items[index];
          phase = "type";
          schedule(GAP_MS, loop);
        }
        return;
      }

      if (charIndex < text.length) {
        charIndex += 1;
        setDisplay(text.slice(0, charIndex));
        schedule(TYPE_MS, loop);
      } else {
        phase = "hold";
        loop();
      }
    };

    loop();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [items]);

  return (
    <span className="inline-flex items-baseline sm:whitespace-nowrap">
      <span className="gradient-text-shimmer inline-block min-w-[10ch]">{display}</span>
      <span className="hero-typewriter-cursor ml-0.5 text-accent-cyan" aria-hidden="true">
        |
      </span>
    </span>
  );
}
