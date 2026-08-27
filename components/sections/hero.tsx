"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Github,
  Layers,
  Linkedin,
  MapPin,
  Rocket,
  Sparkles,
} from "lucide-react";
import { profile } from "@/lib/data";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { HeroOrbit } from "@/components/sections/hero-orbit";

const [firstName, ...restName] = profile.name.split(" ");
const lastName = restName.join(" ") || firstName;

const heroStats = [
  { label: "Years building", value: "5", suffix: "+", emoji: "⚡" },
  { label: "Projects shipped", value: "10", suffix: "+", emoji: "🚀" },
  { label: "Current role", value: "Senior", suffix: " SWE", emoji: "💼" },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="site-container relative flex min-h-[580px] flex-col justify-center overflow-hidden pb-10 pt-[5.25rem] lg:h-[100svh] lg:max-h-[900px]"
    >
      <div className="grid items-center gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="tag-pill border-accent-violet/30 bg-accent-violet/10 text-accent-violet">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Senior Engineer · Raptr Games
            </span>
            <span className="tag-pill border-accent-cyan/30 text-accent-cyan">
              <Layers className="h-3 w-3" aria-hidden="true" />
              Fintech · E-commerce
            </span>
          </div>

          <h1 className="mt-4 font-display text-[clamp(2.25rem,6.5vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.04em] sm:mt-5">
            <span className="block text-ink">{firstName}</span>
            <span className="gradient-text block">{lastName}</span>
          </h1>

          <p className="mt-3 max-w-xl text-base font-medium leading-snug text-ink-muted sm:text-lg">
            {profile.title} building{" "}
            <span className="text-accent-cyan">fintech</span> &{" "}
            <span className="text-accent-coral">gaming</span> products at scale.
          </p>

          <p className="mt-2 line-clamp-3 max-w-xl text-sm leading-relaxed text-ink-faint sm:line-clamp-4 sm:text-base">
            {profile.tagline}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-ink-muted sm:text-sm">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-accent-coral" aria-hidden="true" />
            {profile.location} · {profile.relocation}
          </div>

          <HeroOrbit className="my-5 lg:hidden" />

          <div className="mt-2 flex flex-wrap gap-2 sm:mt-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="stat-chip flex items-center gap-2 px-3 py-2">
                <span className="text-sm" aria-hidden="true">
                  {stat.emoji}
                </span>
                <div>
                  <p className="font-display text-sm font-bold leading-none text-ink sm:text-base">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-0.5 text-[0.6rem] uppercase tracking-wider text-ink-faint">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6">
            <a href="#projects" className="btn-primary px-5 py-2.5 text-sm">
              <Rocket className="h-4 w-4" aria-hidden="true" />
              See 10+ projects
            </a>
            <a href={profile.resumeFile} download className="btn-ghost px-5 py-2.5 text-sm">
              <Download className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-faint transition-all hover:-translate-y-0.5 hover:border-accent-cyan/40 hover:text-accent-cyan hover:shadow-glow-cyan"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-faint transition-all hover:-translate-y-0.5 hover:border-accent-violet/40 hover:text-accent-violet hover:shadow-glow"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <HeroOrbit className="hidden lg:block" />
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-0.5 text-ink-faint transition-colors hover:text-accent-cyan"
        animate={reduced ? undefined : { y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll to about"
      >
        <span className="text-[0.6rem] uppercase tracking-widest">Scroll</span>
        <ArrowDown className="h-3.5 w-3.5" />
      </motion.a>
    </section>
  );
}
