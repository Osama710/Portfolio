"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Cloud, Cpu, Zap } from "lucide-react";
import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

const orbitChips = [
  { label: "Next.js", color: "border-accent-violet/50 text-accent-violet", glow: "rgba(139,92,246,0.45)" },
  { label: "FastAPI", color: "border-accent-cyan/50 text-accent-cyan", glow: "rgba(34,211,238,0.45)" },
  { label: "Fintech", color: "border-accent-coral/50 text-accent-coral", glow: "rgba(251,113,133,0.45)" },
  { label: "Node.js", color: "border-accent-lime/50 text-accent-lime", glow: "rgba(190,242,100,0.45)" },
  { label: "React", color: "border-accent-violet/40 text-accent-violet", glow: "rgba(139,92,246,0.35)" },
  { label: "TypeScript", color: "border-accent-cyan/40 text-accent-cyan", glow: "rgba(34,211,238,0.35)" },
];

type HeroOrbitProps = {
  className?: string;
};

export function HeroOrbit({ className }: HeroOrbitProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 22 });
  const ringRotate = useTransform(springX, [-1, 1], [-8, 8]);
  const hubY = useTransform(springY, [-1, 1], [-6, 6]);

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      pointerX.set(x * 2);
      pointerY.set(y * 2);
    },
    [pointerX, pointerY, reduced],
  );

  const onLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <motion.div
      ref={ref}
      className={cn("hero-orbit relative mx-auto aspect-square w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[340px] xl:max-w-[380px]", className)}
      initial={reduced ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="hero-orbit-aurora absolute inset-0 rounded-full" aria-hidden="true" />
      <div className="absolute inset-0 rounded-full bg-accent-violet/10 blur-3xl" aria-hidden="true" />

      <motion.div
        className="hero-orbit-ring absolute inset-[4%] rounded-full"
        style={reduced ? undefined : { rotate: ringRotate }}
        aria-hidden="true"
      />

      <div className="absolute inset-[12%] rounded-full border border-white/[0.08] bg-surface-2/40 backdrop-blur-sm" aria-hidden="true" />

      <svg className="absolute inset-[8%] h-[84%] w-[84%] overflow-visible" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id="heroOrbitLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        {orbitChips.map((chip, i) => {
          const angle = (i / orbitChips.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 38;
          const y = 50 + Math.sin(angle) * 38;
          return (
            <line key={chip.label} x1="50" y1="50" x2={x} y2={y} stroke="url(#heroOrbitLine)" strokeWidth="0.35" strokeDasharray="2 2" opacity="0.55" />
          );
        })}
      </svg>

      <motion.div
        className="absolute inset-[24%] flex flex-col items-center justify-center rounded-full border border-accent-cyan/30 bg-gradient-brand-soft text-center shadow-glow-cyan"
        style={reduced ? undefined : { y: hubY }}
        whileHover={reduced ? undefined : { scale: 1.04 }}
      >
        <motion.div
          animate={reduced ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="h-6 w-6 text-accent-cyan sm:h-7 sm:w-7" aria-hidden="true" />
        </motion.div>
        <p className="mt-1 font-display text-lg font-bold text-ink sm:text-xl">10+</p>
        <p className="text-[0.55rem] uppercase tracking-widest text-ink-faint sm:text-[0.6rem]">Live builds</p>
        <div className="mt-1.5 flex items-center gap-2 text-[0.5rem] uppercase tracking-wider text-ink-faint">
          <Cloud className="h-3 w-3 text-accent-violet" aria-hidden="true" />
          <Cpu className="h-3 w-3 text-accent-coral" aria-hidden="true" />
        </div>
      </motion.div>

      {orbitChips.map((chip, i) => {
        const angle = (i / orbitChips.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(angle) * 42;
        const y = 50 + Math.sin(angle) * 42;
        return (
          <motion.span
            key={chip.label}
            className={cn(
              "hero-orbit-chip absolute rounded-lg border bg-void/90 px-2 py-1 text-[0.58rem] font-semibold backdrop-blur-sm sm:px-2.5 sm:py-1.5 sm:text-[0.65rem]",
              chip.color,
            )}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
              ["--chip-glow" as string]: chip.glow,
            }}
            animate={
              reduced
                ? undefined
                : {
                    y: [0, i % 2 === 0 ? -6 : -4, 0],
                    rotate: [0, i % 2 === 0 ? 2 : -2, 0],
                  }
            }
            transition={{ duration: 4.5 + i * 0.4, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
            whileHover={reduced ? undefined : { scale: 1.12, y: -4 }}
          >
            {chip.label}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
