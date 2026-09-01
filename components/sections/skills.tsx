"use client";

import { useState } from "react";
import {
  Cloud,
  Code2,
  Database,
  Layout,
  MousePointerClick,
  Server,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { skillCategories } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const iconMap = {
  code: Code2,
  layout: Layout,
  server: Server,
  database: Database,
  cloud: Cloud,
  sparkles: Sparkles,
};

const loadout = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "React",
  "FastAPI",
  "MongoDB",
  "MySQL",
  "Redis",
];

const moduleThemes = [
  { glow: "shadow-glow", bar: "bg-accent-violet" },
  { glow: "shadow-glow-cyan", bar: "bg-accent-cyan" },
  { glow: "shadow-glow-coral", bar: "bg-accent-coral" },
  { glow: "", bar: "bg-accent-lime" },
  { glow: "", bar: "bg-accent-blue" },
  { glow: "shadow-glow", bar: "bg-accent-violet" },
];

const ringColors = [
  "border-accent-violet/40",
  "border-accent-cyan/40",
  "border-accent-coral/40",
  "border-accent-lime/30",
  "border-accent-blue/40",
  "border-accent-violet/30",
];

const iconColors = [
  "text-accent-violet",
  "text-accent-cyan",
  "text-accent-coral",
  "text-accent-lime",
  "text-accent-blue",
  "text-accent-violet",
];

const ORBIT_RADIUS = 130;
const CENTER = 200;

function orbitPosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER + Math.cos(angle) * ORBIT_RADIUS,
    y: CENTER + Math.sin(angle) * ORBIT_RADIUS,
  };
}

export function Skills() {
  const reduced = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const active = skillCategories[activeCategory];
  const ActiveIcon = iconMap[active.icon];
  const theme = moduleThemes[activeCategory % moduleThemes.length];

  return (
    <section id="skills" className="site-section relative overflow-x-clip">
      <div className="site-container relative min-w-0">
        <SectionHeading
          label="Skills"
          title="Skills and stack"
          description="Browse categories — first stack is shown by default."
        />

      <div className="section-reveal skills-reveal mt-8 min-w-0">
      <div className="skills-loadout-strip panel-hud mb-8">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-accent-cyan">
          Primary stack
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {loadout.map((skill) => (
            <span
              key={skill}
              className="rounded-xl border border-white/10 bg-void/80 px-3 py-2 text-xs font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-accent-violet/40 hover:text-accent-cyan hover:shadow-glow"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="skills-reveal grid min-w-0 gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
        <div>
          <p className="mb-4 flex items-center justify-center gap-2 text-center text-xs text-ink-faint">
            <MousePointerClick className="h-3.5 w-3.5 text-accent-cyan" aria-hidden="true" />
            Click a node to switch category
          </p>

          <div className="skill-orbit relative mx-auto h-[min(88vw,420px)] w-full max-w-[420px] overflow-hidden lg:max-w-none">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 400 400"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="skillLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {skillCategories.map((_, i) => {
                const { x, y } = orbitPosition(i, skillCategories.length);
                return (
                  <line
                    key={i}
                    x1={CENTER}
                    y1={CENTER}
                    x2={x}
                    y2={y}
                    stroke="url(#skillLine)"
                    strokeWidth={activeCategory === i ? 2.5 : 1}
                    strokeDasharray={activeCategory === i ? "0" : "4 6"}
                    opacity={activeCategory === i ? 0.95 : 0.3}
                  />
                );
              })}
            </svg>

            <div
              className="skill-orbit-hub relative absolute left-1/2 top-1/2 z-20 flex h-[5.75rem] w-[5.75rem] origin-center -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-accent-cyan/35 bg-void/95 text-center shadow-glow-cyan sm:h-28 sm:w-28"
            >
              <span className="skill-orbit-hub-glow" aria-hidden="true" />
              <span className="skill-orbit-hub-ring" aria-hidden="true" />
              <span className="relative font-display text-sm font-bold leading-none text-ink sm:text-base">Tech</span>
              <span className="relative font-display text-sm font-bold leading-none text-accent-cyan sm:text-base">Stack</span>
              <span className="relative mt-1 max-w-[4.5rem] truncate text-[0.45rem] uppercase tracking-widest text-ink-faint">
                {active.label}
              </span>
            </div>

            {skillCategories.map((category, i) => {
              const { x, y } = orbitPosition(i, skillCategories.length);
              const leftPct = (x / 400) * 100;
              const topPct = (y / 400) * 100;
              const Icon = iconMap[category.icon];
              const isActive = activeCategory === i;
              const isHovered = hoveredCategory === i;

              return (
                <button
                  key={category.label}
                  type="button"
                  onClick={() => setActiveCategory(i)}
                  onMouseEnter={() => setHoveredCategory(i)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={cn(
                    "skill-orbit-node group/orbit absolute z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border bg-surface/95 transition-all duration-300 sm:h-16 sm:w-16",
                    ringColors[i % ringColors.length],
                    isActive
                      ? "border-accent-cyan shadow-glow-cyan ring-2 ring-accent-cyan/40"
                      : "hover:scale-105 hover:border-white/30 hover:shadow-glow",
                  )}
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                  aria-pressed={isActive}
                  aria-label={`View ${category.label} stack`}
                >
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${iconColors[i]}`} />

                  <span
                    className={cn(
                      "pointer-events-none absolute left-1/2 z-30 hidden max-w-[10rem] -translate-x-1/2 truncate whitespace-nowrap rounded-lg border border-white/10 bg-void/95 px-2.5 py-1 text-[0.65rem] font-medium text-ink shadow-card transition-all duration-200 sm:block",
                      isHovered || isActive
                        ? "bottom-[calc(100%+8px)] opacity-100"
                        : "bottom-[calc(100%+4px)] opacity-0",
                    )}
                  >
                    {category.label}
                    {!isActive ? (
                      <span className="ml-1 text-accent-cyan">· view</span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={reduced ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -16 }}
            transition={{ duration: 0.35 }}
            className={cn("skill-module-panel overflow-hidden rounded-3xl", theme.glow)}
          >
            <div className={cn("h-1 w-full", theme.bar)} aria-hidden="true" />

            <div className="relative p-6 sm:p-8">

              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-void/60 ${iconColors[activeCategory]}`}
                  >
                    <ActiveIcon className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-accent-cyan">
                      Category {activeCategory + 1} of {skillCategories.length}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-ink">
                      {active.label}
                    </h3>
                  </div>
                </div>
                <span className="rounded-lg border border-white/10 bg-void/60 px-3 py-1.5 font-mono text-xs text-ink-muted">
                  {active.skills.length} tools
                </span>
              </div>

              <div className="relative mt-5 flex items-center gap-3">
                <span className="text-xs text-ink-faint">Skills listed</span>
                <div className="xp-bar h-1.5 flex-1">
                  <motion.div
                    className={cn("h-full rounded-full", theme.bar)}
                    initial={{ width: 0 }}
                    animate={{ width: `${60 + activeCategory * 6}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>

              <div className="relative mt-6 grid gap-2 sm:grid-cols-2">
                {active.skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={reduced ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="hover-lift flex items-center gap-3 rounded-xl border border-white/[0.08] bg-void/50 px-3 py-2.5"
                  >
                    <span className="font-mono text-[0.6rem] text-accent-violet/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-ink">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      </div>
      </div>
    </section>
  );
}
