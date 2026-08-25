"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { experience } from "@/lib/data";
import { channelMarker, getChannelById } from "@/lib/channels";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechPill } from "@/components/ui/tech-pill";
import { cn } from "@/lib/utils";

function CircuitNode({
  item,
  index,
  expanded,
  onToggle,
  reducedMotion,
}: {
  item: (typeof experience)[number];
  index: number;
  expanded: boolean;
  onToggle: () => void;
  reducedMotion: boolean;
}) {
  const nodeId = `experience-node-${index}`;

  return (
    <motion.li layout className="relative pl-10 sm:pl-14">
      <span
        className={cn(
          "absolute left-0 top-5 z-[1] flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 sm:h-5 sm:w-5",
          item.current
            ? "border-crt-amber bg-crt-amber/25 shadow-[0_0_12px_rgba(255,176,0,0.45)]"
            : "border-phosphor/35 bg-phosphor/10",
        )}
        aria-hidden="true"
      >
        <span
          className={cn(
            "rounded-full",
            item.current
              ? "h-2 w-2 bg-crt-amber"
              : "h-1.5 w-1.5 bg-phosphor/50",
          )}
        />
      </span>

      <motion.article
        layout
        className={cn(
          "circuit-node overflow-hidden rounded-xl border bg-surface-2/90",
          item.current
            ? "border-crt-amber/25"
            : "border-white/10",
        )}
      >
        <button
          type="button"
          id={nodeId}
          aria-expanded={expanded}
          aria-controls={`${nodeId}-details`}
          onClick={reducedMotion ? undefined : onToggle}
          className={cn(
            "flex w-full items-start justify-between gap-3 p-5 text-left sm:p-6",
            !reducedMotion && "cursor-pointer transition-colors hover:bg-white/[0.02]",
          )}
        >
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-semibold text-ink">
              {item.role}
            </h3>
            <p
              className={cn(
                "mt-1 text-sm",
                item.current ? "text-crt-amber/90" : "text-phosphor-soft/80",
              )}
            >
              {item.company} · {item.location}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-ink-muted">
              {item.period}
            </span>
            {!reducedMotion ? (
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-ink-faint transition-transform duration-300",
                  expanded && "rotate-180",
                )}
                aria-hidden="true"
              />
            ) : null}
          </div>
        </button>

        {(expanded || reducedMotion) && (
          <motion.div
            layout
            id={`${nodeId}-details`}
            role="region"
            aria-labelledby={nodeId}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="border-t border-white/5 px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
          >
            <ul className="space-y-2.5">
              {item.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-2.5 text-sm leading-relaxed text-ink-muted"
                >
                  <span
                    className={cn(
                      "mt-2 h-1 w-1 shrink-0 rounded-full",
                      item.current ? "bg-crt-amber/70" : "bg-phosphor/40",
                    )}
                    aria-hidden="true"
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.tech.map((tech) => (
                <TechPill key={tech}>{tech}</TechPill>
              ))}
            </div>
          </motion.div>
        )}
      </motion.article>
    </motion.li>
  );
}

export function Experience() {
  const experienceChannel = getChannelById("experience");
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(() => new Set());

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const traceDraw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (reducedMotion) {
      setExpandedNodes(new Set(experience.map((_, index) => index)));
    }
  }, [reducedMotion]);

  const toggleNode = (index: number) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-28 sm:py-32"
    >
      <div className="container">
        <SectionHeading
          channel={channelMarker(experienceChannel)}
          eyebrow="Experience"
          title="Where the work happened, in order."
          description="Five roles across fintech, agency, and freelance work — each one building on the last."
          className="mb-16"
        />

        <div className="relative">
          <div
            className="circuit-trace-rail absolute bottom-4 left-[7px] top-4 w-px sm:left-[9px]"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-phosphor/10" />
            {reducedMotion ? (
              <div className="circuit-trace-fill absolute inset-0 origin-top bg-gradient-to-b from-phosphor/70 via-phosphor/35 to-phosphor/15" />
            ) : (
              <motion.div
                className="circuit-trace-fill absolute inset-0 origin-top bg-gradient-to-b from-phosphor/70 via-phosphor/35 to-phosphor/15"
                style={{ scaleY: traceDraw }}
              />
            )}
          </div>

          <LayoutGroup>
            <ol className="relative space-y-6 sm:space-y-8">
              {experience.map((item, index) => (
                <CircuitNode
                  key={`${item.company}-${item.period}`}
                  item={item}
                  index={index}
                  expanded={expandedNodes.has(index)}
                  onToggle={() => toggleNode(index)}
                  reducedMotion={Boolean(reducedMotion)}
                />
              ))}
            </ol>
          </LayoutGroup>
        </div>
      </div>
    </section>
  );
}
