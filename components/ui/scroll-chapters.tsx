"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const chapters = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function ScrollChapters() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-42% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      aria-label="Page sections"
    >
      {chapters.map((chapter, i) => {
        const isActive = active === chapter.id;
        return (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className="group relative flex items-center justify-end gap-3"
            aria-label={chapter.label}
            aria-current={isActive ? "location" : undefined}
          >
            <span
              className={cn(
                "pointer-events-none rounded-lg bg-surface/90 px-2 py-1 text-[0.65rem] font-medium text-ink opacity-0 shadow-card transition-all group-hover:opacity-100",
                isActive && "opacity-100",
              )}
            >
              {chapter.label}
            </span>
            <span className="relative flex h-3 w-3 items-center justify-center">
              {isActive ? (
                <motion.span
                  layoutId="chapter-dot"
                  className="absolute h-3 w-3 rounded-full bg-gradient-brand shadow-glow"
                />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-white/25 transition-colors group-hover:bg-white/50" />
              )}
            </span>
            <span className="sr-only">{i + 1}</span>
          </a>
        );
      })}
    </nav>
  );
}
