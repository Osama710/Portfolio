"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { experience } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechPill } from "@/components/ui/tech-pill";
import { cn } from "@/lib/utils";

function LogBlock({
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
  const blockId = `log-block-${index}`;

  return (
    <motion.li layout className="console-log-block">
      <button
        type="button"
        id={blockId}
        aria-expanded={expanded || reducedMotion}
        aria-controls={`${blockId}-output`}
        onClick={reducedMotion ? undefined : onToggle}
        className={cn(
          "console-log-header w-full",
          !reducedMotion && "cursor-pointer",
        )}
      >
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-[0.8rem] leading-snug text-ink">
            <span className="text-editor-blue">[BUILD]</span>{" "}
            <span className="text-ink">{item.company}</span>
            <span className="text-ink-faint"> — </span>
            <span className="text-ink-muted">{item.role}</span>
          </p>
          <p className="text-[0.72rem] text-ink-faint">
            {item.period} · {item.location}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            className={cn(
              item.current ? "log-tag-running" : "log-tag-complete",
            )}
          >
            {item.current ? "Running" : "Complete"}
          </span>
          {!reducedMotion ? (
            <ChevronDown
              className={cn(
                "h-4 w-4 text-ink-faint transition-transform duration-200",
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
          id={`${blockId}-output`}
          role="region"
          aria-labelledby={blockId}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="console-log-output space-y-2"
        >
          {item.bullets.map((bullet) => (
            <p key={bullet} className="console-log-line">
              <span className="text-editor-blue/60">&gt;</span> {bullet}
            </p>
          ))}
          <div className="flex flex-wrap gap-2 pt-3">
            {item.tech.map((tech) => (
              <TechPill key={tech}>{tech}</TechPill>
            ))}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}

export function Experience() {
  const reducedMotion = useReducedMotion();
  const [expandedBlocks, setExpandedBlocks] = useState<Set<number>>(
    () => new Set(),
  );

  useEffect(() => {
    if (reducedMotion) {
      setExpandedBlocks(new Set(experience.map((_, index) => index)));
    }
  }, [reducedMotion]);

  const toggleBlock = (index: number) => {
    setExpandedBlocks((prev) => {
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
    <section id="experience" className="viewport-section">
      <SectionHeading
        eyebrow="// Console"
        title="Where the work happened, in order."
        description="Five roles across fintech, agency, and freelance work — each one building on the last."
        className="mb-12"
      />

      <LayoutGroup>
        <ol className="space-y-3">
          {experience.map((item, index) => (
            <LogBlock
              key={`${item.company}-${item.period}`}
              item={item}
              index={index}
              expanded={expandedBlocks.has(index)}
              onToggle={() => toggleBlock(index)}
              reducedMotion={Boolean(reducedMotion)}
            />
          ))}
        </ol>
      </LayoutGroup>
    </section>
  );
}
