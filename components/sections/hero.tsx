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
  Zap,
} from "lucide-react";
import { profile } from "@/lib/data";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const [firstName, ...restName] = profile.name.split(" ");
const lastName = restName.join(" ") || firstName;

const heroStats = [
  { label: "Years building", value: "5", suffix: "+", emoji: "⚡" },
  { label: "Projects shipped", value: "10", suffix: "+", emoji: "🚀" },
  { label: "Current role", value: "Senior", suffix: " SWE", emoji: "💼" },
];

const orbitChips = [
  { label: "Next.js", color: "border-accent-violet/40 text-accent-violet" },
  { label: "FastAPI", color: "border-accent-cyan/40 text-accent-cyan" },
  { label: "Fintech", color: "border-accent-coral/40 text-accent-coral" },
  { label: "Node.js", color: "border-accent-lime/40 text-accent-lime" },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="site-container relative flex h-[100svh] max-h-[900px] min-h-[580px] flex-col justify-center overflow-hidden pt-[5.25rem] pb-10"
    >
      <div className="grid items-center gap-5 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8">
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

          <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="stat-chip flex items-center gap-2 px-3 py-2"
              >
                <span className="text-sm" aria-hidden="true">
                  {stat.emoji}
                </span>
                <div>
                  <p className="font-display text-sm font-bold leading-none text-ink sm:text-base">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-0.5 text-[0.6rem] uppercase tracking-wider text-ink-faint">
                    {stat.label}
                  </p>
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

        <motion.div
          className="relative mx-auto hidden aspect-square w-full max-w-[320px] lg:block xl:max-w-[360px]"
          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="absolute inset-0 rounded-full bg-accent-violet/12 blur-3xl" />
          <div className="absolute inset-[10%] rounded-full border border-white/10 bg-surface-2/60" />
          <div className="absolute inset-[26%] flex flex-col items-center justify-center rounded-full border border-accent-cyan/25 bg-gradient-brand-soft text-center shadow-glow-cyan">
            <Zap className="h-7 w-7 text-accent-cyan" aria-hidden="true" />
            <p className="mt-1.5 font-display text-xl font-bold text-ink">10+</p>
            <p className="text-[0.6rem] uppercase tracking-widest text-ink-faint">
              Live builds
            </p>
          </div>

          {orbitChips.map((chip, i) => {
            const angle = (i / orbitChips.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(angle) * 42;
            const y = 50 + Math.sin(angle) * 42;
            return (
              <motion.span
                key={chip.label}
                className={`absolute rounded-lg border bg-void/90 px-2.5 py-1.5 text-[0.65rem] font-semibold transition-shadow hover:shadow-glow ${chip.color}`}
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                animate={reduced ? undefined : { y: [0, -5, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.3 }}
              >
                {chip.label}
              </motion.span>
            );
          })}
        </motion.div>
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
