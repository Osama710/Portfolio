"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { experience } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechPill } from "@/components/ui/tech-pill";
import { cn } from "@/lib/utils";

const bulletVariants = {
  hidden: { opacity: 0, x: -18, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: {
    opacity: 0,
    x: 16,
    filter: "blur(6px)",
    transition: { duration: 0.22 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
};

function CareerTreeDot({
  isActive,
  onSelect,
  label,
}: {
  isActive: boolean;
  onSelect: () => void;
  label: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      aria-label={label}
      animate={
        isActive
          ? { scale: 1.25, boxShadow: "0 0 20px rgba(255, 107, 107, 0.55)" }
          : { scale: 1, boxShadow: "0 0 0 rgba(255, 107, 107, 0)" }
      }
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative z-10 h-3.5 w-3.5 shrink-0 self-center rounded-full border-2 transition-colors duration-300 sm:h-4 sm:w-4",
        isActive
          ? "border-accent-coral bg-accent-coral"
          : "border-white/25 bg-surface hover:border-accent-cyan hover:bg-accent-cyan/30",
      )}
    />
  );
}

function CareerTreeCard({
  item,
  isActive,
  onSelect,
  align,
  className,
}: {
  item: (typeof experience)[number];
  isActive: boolean;
  onSelect: () => void;
  align: "left" | "right";
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      aria-expanded={isActive}
      layout
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative w-full rounded-2xl border px-3.5 py-3 text-left transition-colors duration-300 sm:px-4 lg:max-w-[260px]",
        align === "right" ? "lg:mr-0" : "lg:ml-0",
        isActive
          ? "border-accent-coral/45 bg-gradient-brand-soft shadow-glow"
          : "border-white/[0.08] bg-surface/70 hover:border-white/18 hover:bg-surface-2",
        className,
      )}
    >
      <p className="font-mono text-[0.58rem] uppercase tracking-wider text-accent-cyan sm:text-[0.6rem]">
        {item.period}
      </p>
      <p className="mt-1 font-display text-sm font-bold leading-snug text-ink sm:text-base">
        {item.company}
      </p>
      <p className="mt-0.5 text-xs leading-snug text-ink-muted">{item.role}</p>
      {item.current ? (
        <span className="mt-2 inline-block rounded-full bg-accent-coral/15 px-2 py-0.5 text-[0.6rem] font-bold uppercase text-accent-coral">
          Present
        </span>
      ) : null}
    </motion.button>
  );
}

function CareerDetailContent({
  activeIndex,
  reducedMotion,
  compact,
}: {
  activeIndex: number;
  reducedMotion: boolean | null;
  compact?: boolean;
}) {
  const active = experience[activeIndex];

  return (
    <>
      <motion.div
        key={`bar-${activeIndex}`}
        initial={reducedMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "h-1 origin-left",
          active.current ? "bg-accent-coral" : "bg-gradient-to-r from-accent-violet to-accent-cyan",
        )}
      />

      <div className={cn("relative", compact ? "p-4" : "p-4 sm:p-6")}>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -12, transition: { duration: 0.22 } }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              variants={reducedMotion ? undefined : headerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-accent-cyan">
                  {active.period} · {active.location}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-ink sm:text-2xl">
                  {active.role}
                </h3>
                <p className="mt-0.5 text-sm text-accent-violet sm:text-base">{active.company}</p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase",
                  active.current
                    ? "bg-accent-coral/15 text-accent-coral"
                    : "bg-white/[0.06] text-ink-faint",
                )}
              >
                {active.current ? "Present" : "Complete"}
              </span>
            </motion.div>

            <motion.div
              variants={reducedMotion ? undefined : headerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.06 }}
              className="relative mt-4 border-t border-white/[0.06] pt-4"
            >
              <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-widest text-ink-faint">
                Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                <AnimatePresence mode="popLayout">
                  {active.tech.map((tech, i) => (
                    <motion.span
                      key={`${activeIndex}-${tech}`}
                      initial={reducedMotion ? false : { opacity: 0, scale: 0.8, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={reducedMotion ? undefined : { opacity: 0, scale: 0.8, y: -6 }}
                      transition={{ delay: 0.08 + i * 0.04, duration: 0.3 }}
                    >
                      <TechPill>{tech}</TechPill>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            <p className="relative mt-5 text-xs font-semibold uppercase tracking-widest text-accent-cyan">
              Impact
            </p>
            <AnimatePresence mode="wait">
              <motion.ul
                key={`bullets-${activeIndex}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
                  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                }}
                className={cn(
                  "relative mt-3 space-y-2",
                  !compact && "lg:max-h-[300px] lg:overflow-y-auto lg:pr-1",
                )}
              >
                {active.bullets.map((bullet, i) => (
                  <motion.li
                    key={`${activeIndex}-${bullet}`}
                    custom={i}
                    variants={reducedMotion ? undefined : bulletVariants}
                    className="flex gap-2.5 rounded-xl border border-white/[0.06] bg-void/40 px-3 py-2.5 text-sm leading-snug text-ink-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" />
                    {bullet}
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

function CareerDetailPanel({
  activeIndex,
  reducedMotion,
}: {
  activeIndex: number;
  reducedMotion: boolean | null;
}) {
  return (
    <div className="skill-module-panel overflow-hidden rounded-3xl shadow-card">
      <CareerDetailContent activeIndex={activeIndex} reducedMotion={reducedMotion} />
    </div>
  );
}

function CareerTreeNode({
  index,
  isActive,
  onSelect,
  reducedMotion,
}: {
  index: number;
  isActive: boolean;
  onSelect: () => void;
  reducedMotion: boolean | null;
}) {
  const item = experience[index];
  const isLeft = index % 2 === 0;
  const nodeLabel = `${item.company}, ${item.role}`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="lg:hidden">
        <div className="flex items-center gap-3 sm:gap-4">
          <CareerTreeDot isActive={isActive} onSelect={onSelect} label={nodeLabel} />
          <CareerTreeCard
            item={item}
            isActive={isActive}
            onSelect={onSelect}
            align="left"
            className="min-w-0 flex-1"
          />
        </div>

        <AnimatePresence initial={false}>
          {isActive ? (
            <motion.div
              key={`mobile-detail-${index}`}
              initial={reducedMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="ml-7 mt-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-2/90 sm:ml-8">
                <CareerDetailContent
                  activeIndex={index}
                  reducedMotion={reducedMotion}
                  compact
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="hidden grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 lg:grid">
        <div className="flex justify-end">
          {isLeft ? (
            <CareerTreeCard
              item={item}
              isActive={isActive}
              onSelect={onSelect}
              align="right"
            />
          ) : null}
        </div>

        <CareerTreeDot isActive={isActive} onSelect={onSelect} label={nodeLabel} />

        <div className="flex justify-start">
          {!isLeft ? (
            <CareerTreeCard
              item={item}
              isActive={isActive}
              onSelect={onSelect}
              align="left"
            />
          ) : null}
        </div>
      </div>
    </motion.li>
  );
}

export function Experience() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const treeRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="experience"
      className="site-section section-wash-coral relative overflow-hidden"
    >
      <SectionHeading
        label="Experience"
        title="Career path"
        description="Five roles across fintech, agency, and freelance."
        className="mb-8 sm:mb-10"
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.12fr] lg:gap-12 lg:items-start">
        <div ref={treeRef} className="relative pl-1 lg:pl-0">
          <div
            className="pointer-events-none absolute bottom-4 left-[6px] top-2 w-px opacity-60 lg:left-1/2 lg:-translate-x-1/2 bg-gradient-to-b from-accent-coral via-accent-violet to-accent-cyan/50"
            aria-hidden="true"
          />

          <motion.div
            className="pointer-events-none absolute left-[6px] top-2 w-[2px] lg:left-1/2 lg:-translate-x-1/2 bg-gradient-to-b from-accent-coral to-accent-cyan"
            style={{ bottom: "1rem" }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          />

          <motion.div
            className="pointer-events-none absolute left-[5px] top-2 w-[3px] origin-top rounded-full bg-gradient-to-b from-accent-coral to-accent-cyan shadow-glow-coral lg:left-1/2 lg:-translate-x-1/2"
            animate={{
              height: `${(activeIndex / Math.max(experience.length - 1, 1)) * 100}%`,
            }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          />

          <ol className="relative space-y-5 sm:space-y-7 lg:space-y-12">
            {experience.map((item, index) => (
              <CareerTreeNode
                key={`${item.company}-${item.period}`}
                index={index}
                isActive={activeIndex === index}
                onSelect={() => setActiveIndex(index)}
                reducedMotion={reducedMotion}
              />
            ))}
          </ol>
        </div>

        <motion.div
          className="hidden lg:block lg:sticky lg:top-28"
          initial={reducedMotion ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <CareerDetailPanel activeIndex={activeIndex} reducedMotion={reducedMotion} />
        </motion.div>
      </div>
    </section>
  );
}
