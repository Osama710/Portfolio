"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechPill } from "@/components/ui/tech-pill";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/types";

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

function projectFilename(name: string) {
  const base = name.replace(/[^a-zA-Z0-9]/g, "");
  return `${base}.scene`;
}

export function Projects() {
  const [activeTile, setActiveTile] = useState<string | null>(null);

  return (
    <section id="projects" className="viewport-section">
      <SectionHeading
        eyebrow="// Asset Browser"
        title="Products shipped in production, not just prototypes."
        description="A selection of the platforms Osama has built and maintained — spanning fintech, gaming, healthcare, and more."
        className="mb-12"
      />

      <div className="asset-browser-grid">
        {projects.map((project) => {
          const screenshot = projectScreenshot(project);
          const filename = projectFilename(project.name);
          const isActive = activeTile === project.name;

          return (
            <article
              key={project.name}
              className="asset-tile"
              tabIndex={0}
              onMouseEnter={() => setActiveTile(project.name)}
              onMouseLeave={() => setActiveTile(null)}
              onFocus={() => setActiveTile(project.name)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setActiveTile(null);
                }
              }}
              onClick={() =>
                setActiveTile((current) =>
                  current === project.name ? null : project.name,
                )
              }
            >
              <div className="asset-thumbnail">
                {screenshot ? (
                  <Image
                    src={screenshot}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 50vw, 200px"
                  />
                ) : (
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-editor-blue/20 via-surface-2 to-editor-orange/10",
                    )}
                  >
                    <span className="font-mono text-lg font-bold text-ink/80">
                      {initialsOf(project.name)}
                    </span>
                  </div>
                )}

                <div
                  className={cn(
                    "asset-overlay",
                    isActive && "asset-overlay-visible",
                  )}
                >
                  <p className="line-clamp-3 text-[0.68rem] leading-relaxed text-ink-muted">
                    {project.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.tech.slice(0, 4).map((tech) => (
                      <TechPill key={tech} className="text-[0.58rem] px-2 py-0.5">
                        {tech}
                      </TechPill>
                    ))}
                  </div>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-2 inline-flex items-center gap-1 font-mono text-[0.62rem] text-editor-blue hover:text-editor-orange"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {project.domain}
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </div>

              <p className="asset-caption" title={filename}>
                {filename}
              </p>
              <p className="sr-only">{project.name}: {project.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
