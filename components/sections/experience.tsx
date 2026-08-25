"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Building2, Calendar, MapPin } from "lucide-react";
import { experience } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechPill } from "@/components/ui/tech-pill";
import { cn } from "@/lib/utils";

const bulletVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.25 },
  }),
};

export function Experience() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = experience[activeIndex];
  const chronological = [...experience].reverse();

  return (
    <section id="experience" className="site-section section-wash-coral relative overflow-hidden">
      <SectionHeading
        label="Experience"
        title="Career path"
        description="Five roles connected in sequence — select any step to view details."
        className="mb-10"
      />

      <div className="panel-hud mb-8 overflow-x-auto">
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-ink-faint">
          Timeline
        </p>

        <div className="flex min-w-[680px] items-start px-2">
          {chronological.map((item, chronIndex) => {
            const index = experience.length - 1 - chronIndex;
            const isActive = index === activeIndex;
            const isLast = chronIndex === chronological.length - 1;
            const newerIndex = experience.length - 1 - (chronIndex + 1);
            const segmentLit = !isLast && activeIndex <= newerIndex;

            return (
              <div key={`${item.company}-${item.period}`} className="flex flex-1 items-start">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group relative z-10 flex w-[128px] shrink-0 flex-col items-center text-center"
                  aria-pressed={isActive}
                >
                  <span
                    className={cn(
                      "flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border-[3px] transition-all duration-300",
                      isActive
                        ? "scale-110 border-accent-coral bg-accent-coral/20 shadow-glow-coral"
                        : index >= activeIndex
                          ? "border-accent-violet/50 bg-accent-violet/10 group-hover:border-accent-violet"
                          : "border-white/15 bg-surface group-hover:border-accent-cyan/50",
                    )}
                  >
                    <span
                      className={cn(
                        "h-2.5 w-2.5 rounded-full transition-colors",
                        isActive
                          ? "bg-accent-coral"
                          : index >= activeIndex
                            ? "bg-accent-violet"
                            : "bg-white/30 group-hover:bg-accent-cyan",
                      )}
                    />
                  </span>

                  <span
                    className={cn(
                      "mt-3 font-mono text-[0.6rem] font-bold uppercase tracking-wide",
                      isActive ? "text-accent-coral" : "text-ink-faint",
                    )}
                  >
                    {item.period.split(" — ")[0]}
                  </span>
                  <span className="mt-1 line-clamp-2 font-display text-xs font-semibold leading-tight text-ink">
                    {item.company}
                  </span>
                  <span className="mt-0.5 line-clamp-2 text-[0.65rem] text-ink-muted">
                    {item.role}
                  </span>
                </button>

                {!isLast ? (
                  <div className="relative mt-[1.625rem] flex h-0.5 min-w-[12px] flex-1 items-center">
                    <div
                      className={cn(
                        "h-full w-full rounded-full transition-all duration-500",
                        segmentLit
                          ? "bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-coral/80"
                          : "bg-white/10",
                      )}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-3xl border border-white/10 bg-surface-2/90 shadow-card"
        >
          <div
            className={cn(
              "h-1 w-full",
              active.current ? "bg-accent-coral" : "bg-gradient-to-r from-accent-violet to-accent-cyan",
            )}
          />

          <div className="border-b border-white/[0.06] bg-gradient-to-r from-accent-violet/10 via-transparent to-accent-cyan/5 p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-void/50">
                  <Building2 className="h-5 w-5 text-accent-violet" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                    {active.role}
                  </h3>
                  <p className="mt-0.5 text-accent-cyan">{active.company}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-ink-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-accent-violet" aria-hidden="true" />
                  {active.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-accent-coral" aria-hidden="true" />
                  {active.location}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase",
                    active.current
                      ? "bg-accent-coral/15 text-accent-coral"
                      : "bg-white/[0.06] text-ink-faint",
                  )}
                >
                  {active.current ? "Present" : "Completed"}
                </span>
              </div>
            </div>

            <div className="mt-4 border-t border-white/[0.06] pt-4">
              <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-widest text-ink-faint">
                Technologies
              </p>
              <div className="flex flex-wrap gap-1.5">
                {active.tech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <TechPill>{tech}</TechPill>
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-cyan">
              Key contributions
            </p>
            <ul className="mt-4 grid max-h-[280px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:max-h-[240px]">
              {active.bullets.map((bullet, i) => (
                <motion.li
                  key={bullet}
                  custom={i}
                  initial={reducedMotion ? false : "hidden"}
                  animate="visible"
                  variants={reducedMotion ? undefined : bulletVariants}
                  className="flex gap-2.5 rounded-xl border border-white/[0.06] bg-void/30 px-3 py-2.5 text-sm leading-snug text-ink-muted transition-colors hover:border-white/12 hover:bg-void/50"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" />
                  {bullet}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
