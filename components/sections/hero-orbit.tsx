"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Orbit } from "lucide-react";
import { useCallback, useId, useRef } from "react";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const orbitChips = [
  { label: "Next.js", color: "border-accent-violet/45 text-accent-violet", glow: "rgba(139,92,246,0.4)" },
  { label: "FastAPI", color: "border-accent-cyan/45 text-accent-cyan", glow: "rgba(34,211,238,0.35)" },
  { label: "Fintech", color: "border-accent-coral/40 text-accent-coral", glow: "rgba(244,114,182,0.32)" },
  { label: "Node.js", color: "border-accent-blue/40 text-accent-blue", glow: "rgba(99,102,241,0.35)" },
  { label: "React", color: "border-accent-violet/35 text-accent-violet/90", glow: "rgba(139,92,246,0.3)" },
  { label: "TypeScript", color: "border-accent-cyan/35 text-accent-cyan/90", glow: "rgba(34,211,238,0.28)" },
];

type HeroOrbitProps = {
  className?: string;
};

export function HeroOrbit({ className }: HeroOrbitProps) {
  const reduced = useReducedMotion();
  const gradientId = useId();
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
    <div
      ref={ref}
      className={cn(
        "hero-orbit relative mx-auto aspect-square w-full max-w-[240px] overflow-visible sm:max-w-[280px] lg:max-w-[340px] xl:max-w-[380px]",
        className,
      )}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="hero-orbit-aurora absolute inset-0 rounded-full" aria-hidden="true" />
      <div className="absolute inset-0 rounded-full bg-accent-violet/10 blur-3xl" aria-hidden="true" />

      <motion.div
        className="hero-orbit-ring hero-orbit-ring-live absolute inset-[4%] rounded-full"
        style={reduced ? undefined : { rotate: ringRotate }}
        aria-hidden="true"
      />

      <div className="absolute inset-[12%] rounded-full border border-white/[0.08] bg-surface-2/40 backdrop-blur-sm" aria-hidden="true" />

      <svg className="absolute inset-[8%] h-[84%] w-[84%] overflow-visible" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        {orbitChips.map((chip, i) => {
          const angle = (i / orbitChips.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(angle) * 36;
        const y = 50 + Math.sin(angle) * 36;
          return (
            <line
              key={chip.label}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke={`url(#${gradientId})`}
              strokeWidth="0.35"
              strokeDasharray="2 2"
              opacity="0.55"
            />
          );
        })}
      </svg>

      <motion.div
        className="hero-orbit-hub absolute inset-[24%] flex flex-col items-center justify-center rounded-full border border-accent-cyan/30 bg-gradient-brand-soft px-3 text-center shadow-glow-cyan"
        style={reduced ? undefined : { y: hubY }}
      >
        <div className="hero-orbit-icon-spin">
          <Orbit className="h-5 w-5 text-accent-violet sm:h-6 sm:w-6" aria-hidden="true" />
        </div>
        <p className="mt-2 font-display text-2xl font-bold leading-none text-ink sm:text-3xl">{profile.initials}</p>
        <p className="mt-2 max-w-[7rem] text-[0.55rem] font-medium leading-snug text-ink-muted sm:max-w-[8rem] sm:text-[0.6rem]">
          {profile.title}
        </p>
      </motion.div>

      {orbitChips.map((chip, i) => {
        const angle = (i / orbitChips.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(angle) * 39;
        const y = 50 + Math.sin(angle) * 39;
        return (
          <div
            key={chip.label}
            className="hero-orbit-chip-slot absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span
              className="hero-orbit-chip-float inline-block"
              style={{ ["--chip-delay" as string]: `${i * 0.12}s` }}
            >
              <span
                className={cn(
                  "hero-orbit-chip inline-block whitespace-nowrap rounded-lg border bg-void/90 px-2 py-1 text-[0.58rem] font-semibold backdrop-blur-sm sm:px-2.5 sm:py-1.5 sm:text-[0.65rem]",
                  chip.color,
                )}
                style={{ ["--chip-glow" as string]: chip.glow }}
              >
                {chip.label}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
