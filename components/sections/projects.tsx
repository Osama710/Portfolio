"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechPill } from "@/components/ui/tech-pill";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/types";

type CardVariant = "cut-tr" | "cut-bl" | "cut-br" | "cut-tl";

const gridSlots: { span: string; variant: CardVariant }[] = [
  { span: "lg:col-span-6 lg:row-span-2", variant: "cut-tr" },
  { span: "lg:col-span-3 lg:row-span-1", variant: "cut-bl" },
  { span: "lg:col-span-3 lg:row-span-1", variant: "cut-br" },
  { span: "lg:col-span-4 lg:row-span-1", variant: "cut-tl" },
  { span: "lg:col-span-4 lg:row-span-1", variant: "cut-tr" },
  { span: "lg:col-span-4 lg:row-span-1", variant: "cut-bl" },
  { span: "lg:col-span-3 lg:row-span-2", variant: "cut-br" },
  { span: "lg:col-span-3 lg:row-span-1", variant: "cut-tl" },
  { span: "lg:col-span-6 lg:row-span-1", variant: "cut-tr" },
];

const tagThemes: Record<
  string,
  {
    accent: string;
    glow: string;
    bar: string;
    emoji: string;
    gradient: string;
  }
> = {
  Fintech: {
    accent: "#FB7185",
    glow: "rgba(251, 113, 133, 0.45)",
    bar: "bg-accent-coral",
    emoji: "💳",
    gradient: "linear-gradient(135deg, #FB7185, #8B5CF6)",
  },
  "E-commerce": {
    accent: "#8B5CF6",
    glow: "rgba(139, 92, 246, 0.45)",
    bar: "bg-accent-violet",
    emoji: "🛒",
    gradient: "linear-gradient(135deg, #8B5CF6, #22D3EE)",
  },
  Esports: {
    accent: "#22D3EE",
    glow: "rgba(34, 211, 238, 0.45)",
    bar: "bg-accent-cyan",
    emoji: "🏆",
    gradient: "linear-gradient(135deg, #22D3EE, #BEF264)",
  },
  Gaming: {
    accent: "#BEF264",
    glow: "rgba(190, 242, 100, 0.35)",
    bar: "bg-accent-lime",
    emoji: "🎮",
    gradient: "linear-gradient(135deg, #BEF264, #FB7185)",
  },
};

const defaultTheme = {
  accent: "#3B82F6",
  glow: "rgba(59, 130, 246, 0.4)",
  bar: "bg-accent-blue",
  emoji: "✨",
  gradient: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
};

function screenshotOf(p: ProjectItem) {
  return p.screenshot ?? p.image;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ProjectCard({
  project,
  index,
  span,
  variant,
}: {
  project: ProjectItem;
  index: number;
  span: string;
  variant: CardVariant;
}) {
  const [hover, setHover] = useState(false);
  const shot = screenshotOf(project);
  const reduced = useReducedMotion();
  const isFeatured = span.includes("row-span-2");
  const theme = tagThemes[project.tag] ?? defaultTheme;

  return (
    <motion.div
      className={cn("project-card-shell rounded-sm", span)}
      style={
        {
          "--project-accent": theme.gradient,
          "--project-glow": theme.glow,
        } as React.CSSProperties
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <article
        className={cn(
          "project-card-inner",
          `project-${variant}`,
          isFeatured ? "min-h-[340px]" : "min-h-[220px]",
        )}
      >
        <div className="project-card-glow" aria-hidden="true" />
        <div
          className={cn("absolute left-0 top-0 z-10 h-full w-1", theme.bar)}
          aria-hidden="true"
        />

        <div
          className={cn(
            "relative shrink-0 overflow-hidden",
            isFeatured ? "h-[52%] min-h-[180px]" : "h-[55%] min-h-[120px]",
          )}
        >
          {shot ? (
            <Image
              src={shot}
              alt=""
              fill
              className={cn(
                "object-cover object-top transition-transform duration-700 ease-out",
                hover && "scale-110",
              )}
              sizes={isFeatured ? "(max-width:1024px) 100vw, 50vw" : "(max-width:1024px) 50vw, 25vw"}
            />
          ) : (
            <div
              className="flex h-full items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${theme.accent}22, transparent)` }}
            >
              <span className="font-display text-4xl font-bold text-ink/50">
                {initials(project.name)}
              </span>
            </div>
          )}

          <div className="scanline-thumb pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-gradient-to-t from-surface-2 via-surface-2/40 to-transparent"
            aria-hidden="true"
          />

          <span
            className="project-notch-tag left-4 top-4 rounded-md px-2 py-1 text-void"
            style={{ background: theme.gradient }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="project-notch-tag right-4 top-4 rounded border border-white/15 bg-void/80 px-2 py-1 text-[0.6rem] text-ink">
            {theme.emoji} {project.tag}
          </span>

          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-full border border-white/15 bg-void/85 px-3 py-1.5 text-xs font-semibold text-ink-muted backdrop-blur-sm transition-all",
                hover && "border-transparent text-white shadow-glow-cyan",
              )}
              style={hover ? { background: theme.gradient } : undefined}
              aria-label={`Visit ${project.name}`}
            >
              Live
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>

        <div className="relative flex flex-1 flex-col p-4 sm:p-5">
          <h3
            className={cn(
              "font-display font-bold text-ink transition-colors duration-300",
              isFeatured ? "text-xl sm:text-2xl" : "text-base sm:text-lg",
              hover && "text-accent-cyan",
            )}
            style={hover ? { color: theme.accent } : undefined}
          >
            {project.name}
          </h3>
          <p
            className={cn(
              "mt-2 flex-1 text-ink-muted",
              isFeatured
                ? "line-clamp-3 text-sm leading-relaxed"
                : "line-clamp-2 text-xs leading-relaxed",
            )}
          >
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1 border-t border-white/[0.06] pt-3">
            {project.tech.slice(0, isFeatured ? 6 : 3).map((t) => (
              <TechPill key={t}>{t}</TechPill>
            ))}
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="site-section section-wash-violet relative">
      <SectionHeading
        label="Shipped live"
        title="10+ projects in the wild"
        description="Cutout cards in a mosaic grid — each tile has its own accent, clip, and hover glow."
        className="mb-10"
      />

      <div className="project-showcase-grid">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={i}
            span={gridSlots[i]?.span ?? "lg:col-span-4"}
            variant={gridSlots[i]?.variant ?? "cut-tr"}
          />
        ))}
      </div>
    </section>
  );
}
