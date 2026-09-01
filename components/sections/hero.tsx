"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Briefcase,
  Download,
  Github,
  Linkedin,
  MapPin,
  Rocket,
  Workflow,
} from "lucide-react";
import { heroStats, profile } from "@/lib/data";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { HeroOrbit } from "@/components/sections/hero-orbit";

const [firstName, ...restName] = profile.name.split(" ");
const lastName = restName.join(" ") || firstName;

const statEmoji = ["⚡", "🚀", "🎯"];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="hero" className="hero-stage relative w-full overflow-x-clip">
      <div className="site-container relative flex min-h-[100svh] flex-col justify-center pb-16 pt-[5.25rem] sm:pb-10">
        <div className="grid items-center gap-6 overflow-visible lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <div className="hero-copy">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="tag-pill border-accent-violet/30 bg-accent-violet/10 text-accent-violet">
                <Briefcase className="h-3 w-3" aria-hidden="true" />
                {profile.role}
              </span>
              <span className="tag-pill max-w-full border-accent-cyan/30 text-accent-cyan">
                <Workflow className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span className="truncate">KYC · Payments · Admin · APIs</span>
              </span>
            </div>

            <h1 className="mt-4 font-display text-[clamp(2.25rem,6.5vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.04em] sm:mt-5">
              <span className="block text-ink">{firstName}</span>
              <span className="gradient-text block">{lastName}</span>
            </h1>

            <p className="hero-lead mt-3 max-w-xl text-base font-medium leading-snug text-ink-muted sm:text-lg">
              {profile.heroLead}
            </p>

            <div className="hero-location mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-accent-coral" aria-hidden="true" />
                {profile.location}
              </span>
              <span className="hidden text-ink-faint sm:inline" aria-hidden="true">
                ·
              </span>
              <span className="text-accent-cyan/90">{profile.relocation}</span>
            </div>

            <div className="hero-orbit-wrap hero-orbit-wrap-mobile hero-beacon mx-auto my-5 w-full max-w-[280px] origin-center overflow-hidden will-change-transform sm:max-w-[300px] lg:hidden">
              <HeroOrbit />
            </div>

            <div className="mt-2 flex flex-wrap gap-2 sm:mt-4">
              {heroStats.map((stat, index) => (
                <div key={stat.label} className="hero-stat stat-chip flex items-center gap-2 px-3 py-2">
                  <span className="text-sm" aria-hidden="true">
                    {statEmoji[index] ?? "✦"}
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

            <div className="hero-actions mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6">
              <a href="#projects" className="btn-primary px-5 py-2.5 text-sm">
                <Rocket className="h-4 w-4" aria-hidden="true" />
                View projects
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
          </div>

          <div className="hero-orbit-wrap hero-orbit-wrap-desktop hero-beacon relative mx-auto hidden w-full max-w-[420px] origin-center overflow-visible py-4 will-change-transform lg:block">
            <HeroOrbit />
          </div>
        </div>

        <motion.a
          href="#about"
          className="hero-scroll-cue absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-0.5 text-ink-faint transition-colors hover:text-accent-cyan sm:bottom-4"
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Scroll to about"
        >
          <span className="text-[0.6rem] uppercase tracking-widest">Scroll down</span>
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.a>
      </div>
    </section>
  );
}
