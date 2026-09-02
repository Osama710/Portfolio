"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Briefcase,
  Download,
  Github,
  Linkedin,
  MapPin,
  Rocket,
  Target,
  Zap,
} from "lucide-react";
import { heroStats, profile } from "@/lib/data";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { RotatingText } from "@/components/ui/rotating-text";
import { HeroOrbit } from "@/components/sections/hero-orbit";

const [firstName, ...restName] = profile.name.split(" ");
const lastName = restName.join(" ") || firstName;

const statIcons = [Zap, Rocket, Target];

const heroProof = ["75k+ users on Raptr Wallet", "Payments, KYC & admin systems", "Full-stack · Next.js to FastAPI"];

function finishHeroIntro() {
  document.documentElement.classList.add("hero-intro-complete");
  document.querySelector(".scroll-shell")?.classList.add("hero-intro-done");
  window.dispatchEvent(new CustomEvent("hero-intro-complete"));
}

export function Hero() {
  const reduced = useReducedMotion();
  const [introReady, setIntroReady] = useState(reduced ?? false);

  useEffect(() => {
    if (reduced) {
      finishHeroIntro();
      setIntroReady(true);
      return;
    }

    const banner = document.querySelector<HTMLElement>(".hero-enter");
    let done = false;

    const complete = () => {
      if (done) return;
      done = true;
      finishHeroIntro();
      setIntroReady(true);
    };

    banner?.addEventListener("animationend", complete, { once: true });
    const fallback = window.setTimeout(complete, 750);

    return () => {
      banner?.removeEventListener("animationend", complete);
      window.clearTimeout(fallback);
    };
  }, [reduced]);

  return (
    <section id="hero" className="hero-stage relative w-full overflow-x-clip">
      <div className="hero-banner hero-enter site-container relative flex min-h-[100svh] flex-col justify-center pb-16 pt-[5.25rem] sm:pb-10">
        <div className="grid items-center gap-6 overflow-visible lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <div className="hero-copy min-w-0">
            <span className="tag-pill border-accent-violet/35 bg-accent-violet/10 text-accent-violet">
              <Briefcase className="h-3 w-3" aria-hidden="true" />
              {profile.role} · {profile.company}
            </span>

            <h1 className="mt-4 font-display text-[clamp(2.25rem,6.5vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.04em] sm:mt-5">
              <span className="hero-name-line block text-ink">{firstName}</span>
              <span className="hero-name-line gradient-text-shimmer block">{lastName}</span>
            </h1>

            <div className="hero-signal mt-4" aria-hidden="true" />

            <div className="hero-proof mt-3 flex flex-wrap gap-2">
              {heroProof.map((item) => (
                <span key={item} className="hero-proof-item">
                  {item}
                </span>
              ))}
            </div>

            <p className="hero-rotator mt-4 flex min-h-[2.75rem] flex-wrap items-baseline gap-x-2 text-lg font-medium leading-snug sm:min-h-[3rem] sm:text-xl">
              <span className="text-ink-muted">I ship</span>
              <RotatingText items={profile.heroRotations} intervalMs={3000} paused={!introReady} />
            </p>

            <p className="hero-lead mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base sm:leading-relaxed">
              {profile.heroLead}
            </p>

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
                className="btn-ghost gap-2 px-4 py-2.5 text-sm"
                aria-label="GitHub profile"
              >
                <Github className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost gap-2 px-4 py-2.5 text-sm"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>

            <div className="hero-location mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-accent-coral" aria-hidden="true" />
                {profile.location}
              </span>
              <span className="hidden text-ink-faint sm:inline" aria-hidden="true">
                ·
              </span>
              <span className="text-accent-cyan">{profile.relocation}</span>
            </div>

            <div className="hero-stats relative z-20 mt-2 flex flex-wrap gap-2 sm:mt-4">
              {heroStats.map((stat, index) => {
                const StatIcon = statIcons[index] ?? Zap;
                return (
                  <div key={stat.label} className="hero-stat stat-chip flex items-center gap-2 px-3 py-2">
                    <StatIcon className="h-3.5 w-3.5 shrink-0 text-accent-cyan/80" aria-hidden="true" />
                    <div>
                      <p className="font-display text-sm font-bold leading-none text-ink sm:text-base">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} start={introReady} />
                      </p>
                      <p className="mt-0.5 text-[0.6rem] uppercase tracking-wider text-ink-faint">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hero-orbit-wrap hero-orbit-wrap-mobile hero-beacon mx-auto my-5 w-full max-w-[280px] origin-center overflow-hidden sm:max-w-[300px] lg:hidden">
              <HeroOrbit />
            </div>
          </div>

          <div className="hero-orbit-wrap hero-orbit-wrap-desktop hero-beacon relative mx-auto hidden w-full max-w-[420px] origin-center overflow-visible py-4 lg:block">
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
