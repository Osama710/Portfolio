"use client";

import { useState } from "react";
import {
  FlaskConical,
  Layers,
  Layout,
  Plug,
  Server,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { capabilities } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechPill } from "@/components/ui/tech-pill";
import { cn } from "@/lib/utils";

const iconMap: Record<(typeof capabilities)[number]["icon"], LucideIcon> = {
  layers: Layers,
  layout: Layout,
  server: Server,
  plug: Plug,
  shield: Shield,
  test: FlaskConical,
};

const slotThemes = [
  { bar: "bg-accent-coral", glow: "rgba(251, 113, 133, 0.35)" },
  { bar: "bg-accent-violet", glow: "rgba(139, 92, 246, 0.35)" },
  { bar: "bg-accent-cyan", glow: "rgba(34, 211, 238, 0.35)" },
  { bar: "bg-accent-lime", glow: "rgba(190, 242, 100, 0.3)" },
  { bar: "bg-accent-blue", glow: "rgba(96, 165, 250, 0.3)" },
  { bar: "bg-accent-violet", glow: "rgba(167, 139, 250, 0.3)" },
];

function CapabilityBriefing({
  active,
  activeIndex,
  theme,
}: {
  active: (typeof capabilities)[number];
  activeIndex: number;
  theme: (typeof slotThemes)[number];
}) {
  const Icon = iconMap[active.icon];

  return (
    <>
      <div className={cn("h-1 w-full", theme.bar)} aria-hidden="true" />
      <div className="relative p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-void/40 text-accent-cyan">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-accent-cyan">Selected service</p>
              <h3 className="break-words font-display text-xl font-bold text-ink sm:text-2xl">{active.title}</h3>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-accent-coral/30 bg-accent-coral/10 px-3 py-1 text-[0.62rem] font-bold uppercase text-accent-coral">
              Full-time
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.62rem] font-bold uppercase text-ink-faint">
              Contract
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.62rem] font-bold uppercase text-ink-faint">
              Freelance
            </span>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-muted">{active.summary}</p>

        <p className="mt-5 text-[0.65rem] font-bold uppercase tracking-widest text-ink-faint">Typical deliverables</p>
        <ul className="mt-3 space-y-2">
          {active.deliverables.map((item) => (
            <li
              key={item}
              className="capability-deliverable"
            >
              <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", theme.bar)} />
              <span className="min-w-0 break-words">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-white/[0.06] pt-4">
          <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-widest text-ink-faint">Stack focus</p>
          <div className="flex flex-wrap gap-1.5">
            {active.tags.map((tag) => (
              <TechPill key={tag}>{tag}</TechPill>
            ))}
          </div>
        </div>

        <p className="mt-5 rounded-xl border border-white/[0.06] bg-gradient-brand-soft px-4 py-3 text-xs leading-relaxed text-ink-muted sm:text-sm">
          <span className="font-semibold text-ink">Pricing depends on scope. </span>
          Share your product, timeline, and stack for a quote. Open to senior full-time roles and relocation.
        </p>
      </div>
    </>
  );
}

function CapabilitySlotButton({
  cap,
  index,
  isActive,
  onSelect,
}: {
  cap: (typeof capabilities)[number];
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const CapIcon = iconMap[cap.icon];
  const slotTheme = slotThemes[index % slotThemes.length];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      aria-expanded={isActive}
      className={cn(
        "capability-slot group relative w-full overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-all duration-300",
        isActive
          ? "border-white/20 bg-surface-2 shadow-glow"
          : "border-white/[0.08] bg-surface/60 hover:border-white/15 hover:bg-surface",
      )}
      style={isActive ? { boxShadow: `0 0 28px ${slotTheme.glow}` } : undefined}
    >
      <span
        className={cn(
          "absolute inset-y-0 left-0 w-1 transition-opacity",
          slotTheme.bar,
          isActive ? "opacity-100" : "opacity-40 group-hover:opacity-70",
        )}
        aria-hidden="true"
      />
      <div className="flex items-start gap-3 pl-2">
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-void/50",
            isActive ? "text-accent-cyan" : "text-ink-muted",
          )}
        >
          <CapIcon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[0.58rem] uppercase tracking-wider text-accent-cyan">
            {String(index + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}
          </p>
          <p className="font-display text-sm font-bold text-ink sm:text-base">{cap.title}</p>
          <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-ink-muted">{cap.summary}</p>
        </div>
      </div>
    </button>
  );
}

export function Capabilities() {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(capabilities[0].id);
  const active = capabilities.find((c) => c.id === activeId) ?? capabilities[0];
  const activeIndex = capabilities.findIndex((c) => c.id === activeId);
  const theme = slotThemes[activeIndex % slotThemes.length];

  return (
    <section id="capabilities" className="site-section relative overflow-x-clip">
      <div className="site-container min-w-0">
        <SectionHeading
          label="Services"
          title="What I can build"
          description="Available for full-time roles, relocation, contract work, and selected freelance projects."
        />

        <div className="section-reveal caps-reveal mt-8 min-w-0">
          <div className="space-y-2 lg:hidden">
            {capabilities.map((cap, index) => {
              const isActive = cap.id === activeId;
              return (
                <div key={cap.id} className="cap-mobile-entry min-w-0">
                  <CapabilitySlotButton
                    cap={cap}
                    index={index}
                    isActive={isActive}
                    onSelect={() => setActiveId(cap.id)}
                  />
                  {isActive ? (
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="scroll-ui-panel capability-briefing capability-briefing-vivid mt-2 overflow-hidden rounded-3xl"
                    >
                      <CapabilityBriefing active={cap} activeIndex={index} theme={slotThemes[index % slotThemes.length]} />
                    </motion.div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="hidden min-w-0 gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8">
            <div className="capability-slots grid min-w-0 grid-cols-1 gap-3">
              {capabilities.map((cap, index) => (
                <CapabilitySlotButton
                  key={cap.id}
                  cap={cap}
                  index={index}
                  isActive={cap.id === activeId}
                  onSelect={() => setActiveId(cap.id)}
                />
              ))}
            </div>

            <motion.div
              key={active.id}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="scroll-ui-panel capability-briefing capability-briefing-vivid min-w-0 overflow-hidden rounded-3xl"
            >
              <CapabilityBriefing active={active} activeIndex={activeIndex} theme={theme} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
