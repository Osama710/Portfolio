"use client";

import { useReducedMotion } from "framer-motion";

const floaters = [
  { emoji: "🎮", x: "8%", y: "18%", delay: 0 },
  { emoji: "💳", x: "88%", y: "14%", delay: 2 },
  { emoji: "⚡", x: "92%", y: "58%", delay: 1 },
  { emoji: "🚀", x: "6%", y: "72%", delay: 3 },
];

export function AmbientBackground() {
  const reduced = useReducedMotion();

  return (
    <div className="ambient-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="aurora-layer absolute inset-0 opacity-70" />
      <div className="ambient-blob ambient-blob-violet" />
      <div className="ambient-blob ambient-blob-cyan" />
      <div className="ambient-blob ambient-blob-coral" />

      {!reduced &&
        floaters.map((item) => (
          <span
            key={item.emoji + item.x}
            className="ambient-floater float-emoji absolute select-none text-lg sm:text-xl"
            style={{ left: item.x, top: item.y, animationDelay: `${item.delay}s` }}
          >
            {item.emoji}
          </span>
        ))}

      {!reduced && <div className="ambient-stars" />}

      <div className="absolute inset-0 bg-gradient-to-b from-void/85 via-transparent to-void" />
    </div>
  );
}
