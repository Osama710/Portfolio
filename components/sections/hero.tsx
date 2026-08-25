"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, Github, Linkedin, MapPin } from "lucide-react";
import { heroStats, profile } from "@/lib/data";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const [firstName, ...restName] = profile.name.split(" ");
const lastName = restName.join(" ") || firstName;

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="viewport-section flex min-h-[calc(100dvh-3rem)] flex-col justify-center"
    >
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-eyebrow">// Scene Root</p>

        <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl">
          <span className="block">{firstName}</span>
          <span className="block">{lastName}</span>
        </h1>

        <p className="mt-3 font-display text-lg font-medium text-editor-blue sm:text-xl">
          {profile.title}
        </p>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {profile.tagline}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-faint">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {profile.location} · {profile.relocation}
          </span>
        </div>

        <div className="hero-stat-panel">
          <div className="hero-stat-panel-header">
            <span className="h-2 w-2 rounded-full bg-[#FF5F57]" aria-hidden="true" />
            <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
            <span className="h-2 w-2 rounded-full bg-[#28C840]" aria-hidden="true" />
            <span className="ml-1 font-mono text-[0.62rem] text-ink-faint">
              Stats · Inspector
            </span>
          </div>
          <div className="hero-stat-row">
            {heroStats.map((stat) => (
              <div key={stat.label} className="hero-stat-cell">
                <p className="font-display text-lg font-semibold text-ink">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 font-mono text-[0.58rem] leading-tight text-ink-faint">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={profile.resumeFile} download className="editor-btn-secondary">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download CV
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-editor-blue"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            {profile.githubLabel}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-editor-blue"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}
