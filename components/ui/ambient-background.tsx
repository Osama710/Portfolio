"use client";

import { motion, useReducedMotion } from "framer-motion";

const floaters = [
  { emoji: "🎮", x: "8%", y: "18%", delay: 0, duration: 9 },
  { emoji: "💳", x: "88%", y: "12%", delay: 1.2, duration: 11 },
  { emoji: "⚡", x: "92%", y: "58%", delay: 0.6, duration: 10 },
  { emoji: "🚀", x: "6%", y: "72%", delay: 1.8, duration: 12 },
  { emoji: "💻", x: "78%", y: "82%", delay: 0.3, duration: 8 },
  { emoji: "🎯", x: "22%", y: "88%", delay: 2.1, duration: 13 },
  { emoji: "✨", x: "48%", y: "8%", delay: 1.5, duration: 9 },
  { emoji: "🔥", x: "62%", y: "42%", delay: 0.9, duration: 11 },
];

export function AmbientBackground() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="aurora-layer absolute inset-0 opacity-60" />
      <div className="mesh-gradient absolute inset-0 opacity-40" />
      <div className="absolute inset-0 dot-grid opacity-25" />
      <div className="grid-lines absolute inset-0 opacity-[0.07]" />

      <motion.div
        className="absolute -left-32 top-[-10%] h-[520px] w-[520px] rounded-full bg-accent-violet/25 blur-[130px]"
        animate={reduced ? undefined : { x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-12%] top-[15%] h-[440px] w-[440px] rounded-full bg-accent-cyan/20 blur-[110px]"
        animate={reduced ? undefined : { x: [0, -40, 0], y: [0, 50, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[25%] h-[400px] w-[400px] rounded-full bg-accent-coral/18 blur-[120px]"
        animate={reduced ? undefined : { x: [0, 30, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[45%] top-[35%] h-[280px] w-[280px] rounded-full bg-accent-lime/10 blur-[90px]"
        animate={reduced ? undefined : { opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {!reduced &&
        floaters.map((item) => (
          <motion.span
            key={item.emoji + item.x}
            className="float-emoji absolute select-none text-xl sm:text-2xl"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0.15, y: 0 }}
            animate={{
              opacity: [0.12, 0.35, 0.12],
              y: [0, -18, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.emoji}
          </motion.span>
        ))}

      {!reduced &&
        Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={`spark-${i}`}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{
              left: `${(i * 17 + 7) % 100}%`,
              top: `${(i * 23 + 11) % 100}%`,
            }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{
              duration: 2 + (i % 5),
              delay: i * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-transparent to-void" />
    </div>
  );
}
