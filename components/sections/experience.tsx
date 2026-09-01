"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechPill } from "@/components/ui/tech-pill";
import { cn } from "@/lib/utils";
import { experience } from "@/lib/data";

const accents = [
  "from-accent-coral to-accent-violet",
  "from-accent-violet to-accent-cyan",
  "from-accent-cyan to-accent-lime",
  "from-accent-lime to-accent-coral",
  "from-accent-coral to-accent-cyan",
];

const snakeNodes = [
  { top: 3, x: 50 },
  { top: 22, x: 78 },
  { top: 41, x: 22 },
  { top: 60, x: 76 },
  { top: 79, x: 24 },
];

function CareerDetailPanel({
  activeIndex,
  reducedMotion,
  compact,
  side,
  staticEnter,
}: {
  activeIndex: number;
  reducedMotion: boolean | null;
  compact?: boolean;
  side: "left" | "right";
  staticEnter?: boolean;
}) {
  const active = experience[activeIndex];
  const enterX = side === "right" ? 36 : -36;
  const exitX = side === "right" ? -20 : 20;

  return (
    <motion.div
      key={activeIndex}
      initial={
        reducedMotion || staticEnter
          ? false
          : { opacity: 0, x: compact ? 0 : enterX, y: compact ? 8 : 0 }
      }
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={reducedMotion || staticEnter ? undefined : { opacity: 0, x: compact ? 0 : exitX, y: compact ? -6 : 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "scroll-ui-panel min-w-0 w-full max-w-full",
        compact
          ? "overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-2/90"
          : "sticky top-28 overflow-hidden rounded-3xl border border-white/[0.08] bg-surface-2/90 shadow-card",
      )}
    >
      <motion.div
        initial={reducedMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn("h-1 origin-left bg-gradient-to-r", accents[activeIndex % accents.length])}
      />
      <div className={cn("relative min-w-0", compact ? "p-4" : "p-5 sm:p-6")}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[0.62rem] uppercase tracking-widest text-accent-cyan">
              {active.period} · {active.location}
            </p>
            <h3 className="mt-1 break-words font-display text-lg font-bold text-ink sm:text-2xl">{active.role}</h3>
            <p className="mt-0.5 break-words text-sm text-accent-violet sm:text-base">{active.company}</p>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase",
              active.current ? "bg-accent-coral/15 text-accent-coral" : "bg-white/[0.06] text-ink-faint",
            )}
          >
            {active.current ? "Present" : "Complete"}
          </span>
        </div>

        <div className="mt-4 border-t border-white/[0.06] pt-4">
          <p className="mb-2 text-[0.62rem] font-semibold uppercase tracking-widest text-ink-faint">Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {active.tech.map((tech) => (
              <TechPill key={tech}>{tech}</TechPill>
            ))}
          </div>
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-accent-cyan">Responsibilities</p>
        <ul className={cn("mt-3 space-y-2", !compact && "max-h-[260px] overflow-y-auto pr-1")}>
          {active.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-2.5 rounded-xl border border-white/[0.06] bg-void/40 px-3 py-2.5 text-sm leading-snug text-ink-muted"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" />
              <span className="min-w-0 break-words">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function CareerMobileAccordion({
  activeIndex,
  onSelect,
  reducedMotion,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  reducedMotion: boolean | null;
}) {
  return (
    <div className="career-mobile-shell min-w-0 space-y-2">
      {experience.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <div key={`${item.company}-${item.period}`} className="career-mobile-entry min-w-0">
            <button
              type="button"
              onClick={() => onSelect(index)}
              aria-expanded={isActive}
              aria-pressed={isActive}
              className={cn("career-mobile-item w-full text-left", isActive && "is-active")}
            >
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-accent-cyan">{item.period}</span>
              <span className="mt-1 block break-words font-display text-sm font-bold leading-snug text-ink">
                {item.role}
              </span>
              <span className="mt-0.5 block break-words text-xs leading-snug text-accent-violet">{item.company}</span>
              {item.current ? (
                <span className="mt-2 inline-flex items-center gap-1 text-[0.6rem] font-semibold uppercase text-accent-coral">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  Current
                </span>
              ) : null}
            </button>

            {isActive ? (
              <div className="career-mobile-detail mt-2 min-w-0">
                <CareerDetailPanel
                  activeIndex={index}
                  reducedMotion={reducedMotion}
                  compact
                  side="right"
                  staticEnter
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function Experience() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const detailOnRight = activeIndex % 2 === 1;

  return (
    <section id="experience" className="site-section relative overflow-x-clip">
      <div className="site-container min-w-0">
        <SectionHeading
          label="Experience"
          title="Work experience"
          description="Select a role to view responsibilities and stack."
        />

        <div className="section-reveal mt-8 min-w-0">
          <div className="lg:hidden">
            <CareerMobileAccordion
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              reducedMotion={reducedMotion}
            />
          </div>

          <div className="career-track hidden min-w-0 lg:grid">
            <div className="career-track-left hidden min-h-[20rem] lg:block">
              <AnimatePresence mode="wait">
                {!detailOnRight ? (
                  <CareerDetailPanel
                    key={`left-${activeIndex}`}
                    activeIndex={activeIndex}
                    reducedMotion={reducedMotion}
                    side="left"
                  />
                ) : null}
              </AnimatePresence>
            </div>

            <div className="career-snake">
              <svg className="career-snake-path" viewBox="0 0 100 420" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="careerSnakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FB7185" stopOpacity="0.65" />
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.45" />
                  </linearGradient>
                </defs>
                <path
                  d="M 50 12 C 78 48, 22 88, 50 118 C 78 158, 22 198, 50 238 C 76 278, 24 318, 50 358 C 72 388, 28 408, 50 412"
                  fill="none"
                  stroke="url(#careerSnakeGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <div className="career-snake-nodes">
                {experience.map((item, index) => {
                  const pos = snakeNodes[index] ?? snakeNodes[snakeNodes.length - 1];
                  return (
                    <button
                      key={`${item.company}-${item.period}`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-pressed={activeIndex === index}
                      aria-label={`${item.role} at ${item.company}`}
                      className={cn("career-snake-node group", activeIndex === index && "is-active")}
                      style={{ top: `${pos.top}%`, left: `${pos.x}%` }}
                    >
                      <span className="career-snake-node-dot" aria-hidden="true" />
                      <span className="career-snake-node-card">
                        <span className="line-clamp-2 font-display text-[0.62rem] font-bold leading-snug text-ink sm:text-[0.68rem]">
                          {item.role}
                        </span>
                        <span className="mt-1 block line-clamp-2 text-[0.58rem] leading-snug text-accent-violet sm:text-[0.62rem]">
                          {item.company}
                        </span>
                        {item.current ? (
                          <Sparkles className="mt-1 h-2.5 w-2.5 text-accent-coral" aria-hidden="true" />
                        ) : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="career-track-right hidden min-h-[20rem] lg:block">
              <AnimatePresence mode="wait">
                {detailOnRight ? (
                  <CareerDetailPanel
                    key={`right-${activeIndex}`}
                    activeIndex={activeIndex}
                    reducedMotion={reducedMotion}
                    side="right"
                  />
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
