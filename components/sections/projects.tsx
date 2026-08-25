"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/data";
import { channelMarker, getChannelById } from "@/lib/channels";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechPill } from "@/components/ui/tech-pill";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/types";

const gradients = [
  "from-phosphor/25 via-phosphor/5 to-transparent",
  "from-crt-amber/20 via-crt-amber/5 to-transparent",
  "from-phosphor/15 via-crt-amber/5 to-transparent",
  "from-crt-amber/15 via-phosphor/5 to-transparent",
];

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function projectScreenshot(project: ProjectItem) {
  return project.screenshot ?? project.image;
}

function CrtMonitorScreen({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const screenRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(screenRef, { once: true, amount: 0.45 });
  const screenshot = projectScreenshot(project);

  return (
    <div className="crt-monitor px-4 pt-4">
      <div className="crt-monitor-bezel">
        <div className="crt-monitor-bezel-notch" aria-hidden="true" />
        <div
          ref={screenRef}
          className={cn(
            "crt-monitor-screen",
            !reducedMotion &&
              (isInView ? "crt-monitor-screen-on" : "crt-monitor-screen-off"),
          )}
        >
          {screenshot ? (
            <Image
              src={screenshot}
              alt=""
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-gradient-to-br",
                gradients[index % gradients.length],
              )}
            >
              <span className="font-display text-3xl font-bold tracking-tight text-white/90">
                {initialsOf(project.name)}
              </span>
            </div>
          )}
          <div className="crt-monitor-scanlines" aria-hidden="true" />
          <div className="crt-monitor-vignette" aria-hidden="true" />
          {!reducedMotion ? (
            <motion.div
              className="crt-monitor-sweep"
              aria-hidden="true"
              initial={{ x: "-120%" }}
              animate={
                isInView
                  ? { x: ["-120%", "120%"] }
                  : { x: "-120%" }
              }
              transition={{
                duration: 1.1,
                ease: "easeInOut",
                delay: 0.15,
              }}
            />
          ) : null}
        </div>
        <span className="crt-monitor-led" aria-hidden="true" />
      </div>

      <span className="absolute right-7 top-7 rounded-full border border-white/15 bg-void/70 px-2.5 py-1 font-mono text-[0.65rem] text-ink-muted">
        {project.tag}
      </span>
    </div>
  );
}

export function Projects() {
  const projectsChannel = getChannelById("projects");

  return (
    <section id="projects" className="relative py-28 sm:py-32">
      <div className="container">
        <SectionHeading
          channel={channelMarker(projectsChannel)}
          eyebrow="Projects"
          title="Products shipped in production, not just prototypes."
          description="A selection of the platforms Osama has built and maintained — spanning fintech, gaming, healthcare, and more."
          className="mb-16"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollReveal key={project.name} delay={(index % 3) * 0.08}>
              <article className="project-monitor-card group flex h-full flex-col overflow-hidden">
                <CrtMonitorScreen project={project} index={index} />

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {project.name}
                    </h3>
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Visit ${project.name}`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-ink-muted transition-all group-hover:border-phosphor/40 group-hover:text-phosphor-soft"
                      >
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>

                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <TechPill key={tech}>{tech}</TechPill>
                    ))}
                  </div>

                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-phosphor-soft transition-colors hover:text-crt-amber"
                    >
                      {project.domain}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
