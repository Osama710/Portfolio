"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
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

const introEase = [0.22, 1, 0.36, 1] as const;

const introContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.055,
    },
  },
};

const fromLeft: Variants = {
  hidden: { opacity: 0, x: -26, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.42, ease: introEase },
  },
};

const fromRight: Variants = {
  hidden: { opacity: 0, x: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.48, ease: introEase },
  },
};

const signalLine: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.38, ease: introEase },
  },
};

const scrollCueIntro: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: introEase, delay: 0.72 },
  },
};

function finishHeroIntro() {
  document.documentElement.classList.add("hero-intro-complete");
  document.querySelector(".scroll-shell")?.classList.add("hero-intro-done");
  window.dispatchEvent(new CustomEvent("hero-intro-complete"));
}

export function Hero() {
  const reduced = useReducedMotion();
  const [introReady, setIntroReady] = useState(false);
  const introDoneRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      finishHeroIntro();
      setIntroReady(true);
    }
  }, [reduced]);

  const handleIntroComplete = () => {
    if (introDoneRef.current) return;
    introDoneRef.current = true;
    finishHeroIntro();
    setIntroReady(true);
  };

  return (
    <section id="hero" className="hero-stage relative w-full overflow-x-clip">
      <div className="hero-banner site-container relative flex min-h-[100svh] flex-col justify-center pb-16 pt-[5.25rem] sm:pb-10">
        <div className="grid items-center gap-6 overflow-visible lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <motion.div
            className="hero-copy"
            variants={introContainer}
            initial={reduced ? false : "hidden"}
            animate="visible"
            onAnimationComplete={reduced ? undefined : handleIntroComplete}
          >
            <motion.span
              variants={fromLeft}
              className="hero-intro-target hero-intro-target--left tag-pill border-accent-violet/35 bg-accent-violet/10 text-accent-violet"
            >
              <Briefcase className="h-3 w-3" aria-hidden="true" />
              {profile.role} · {profile.company}
            </motion.span>

            <h1 className="mt-4 font-display text-[clamp(2.25rem,6.5vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.04em] sm:mt-5">
              <motion.span
                variants={fromLeft}
                className="hero-intro-target hero-intro-target--left hero-name-line block text-ink"
              >
                {firstName}
              </motion.span>
              <motion.span
                variants={fromLeft}
                className="hero-intro-target hero-intro-target--left hero-name-line gradient-text-shimmer block"
              >
                {lastName}
              </motion.span>
            </h1>

            <motion.div
              variants={signalLine}
              className="hero-intro-target hero-signal mt-4 origin-left"
              aria-hidden="true"
            />

            <motion.div variants={fromLeft} className="hero-proof mt-3 flex flex-wrap gap-2">
              {heroProof.map((item) => (
                <span key={item} className="hero-proof-item">
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.p
              variants={fromLeft}
              className="hero-intro-target hero-intro-target--left hero-rotator mt-4 flex min-h-[2.75rem] flex-wrap items-baseline gap-x-2 text-lg font-medium leading-snug sm:min-h-[3rem] sm:text-xl"
            >
              <span className="text-ink-muted">I ship</span>
              <RotatingText items={profile.heroRotations} intervalMs={3000} paused={!introReady} />
            </motion.p>

            <motion.p
              variants={fromLeft}
              className="hero-intro-target hero-intro-target--left hero-lead mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base sm:leading-relaxed"
            >
              {profile.heroLead}
            </motion.p>

            <motion.div variants={fromLeft} className="hero-actions mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6">
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
            </motion.div>

            <motion.div
              variants={fromLeft}
              className="hero-intro-target hero-intro-target--left hero-location mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted sm:text-sm"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-accent-coral" aria-hidden="true" />
                {profile.location}
              </span>
              <span className="hidden text-ink-faint sm:inline" aria-hidden="true">
                ·
              </span>
              <span className="text-accent-cyan">{profile.relocation}</span>
            </motion.div>

            <motion.div variants={fromLeft} className="hero-stats relative z-20 mt-2 flex flex-wrap gap-2 sm:mt-4">
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
            </motion.div>

            <motion.div
              variants={fromRight}
              className="hero-orbit-wrap hero-orbit-wrap-mobile hero-beacon hero-intro-target hero-intro-target--right mx-auto my-5 w-full max-w-[280px] origin-center overflow-hidden will-change-transform sm:max-w-[300px] lg:hidden"
            >
              <HeroOrbit />
            </motion.div>
          </motion.div>

          <motion.div
            variants={fromRight}
            initial={reduced ? false : "hidden"}
            animate="visible"
            className="hero-orbit-wrap hero-orbit-wrap-desktop hero-beacon hero-intro-target hero-intro-target--right relative mx-auto hidden w-full max-w-[420px] origin-center overflow-visible py-4 will-change-transform lg:block"
          >
            <HeroOrbit />
          </motion.div>
        </div>

        <motion.a
          href="#about"
          variants={scrollCueIntro}
          initial={reduced ? false : "hidden"}
          animate="visible"
          className="hero-scroll-cue hero-intro-target absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-0.5 text-ink-faint transition-colors hover:text-accent-cyan sm:bottom-4"
          aria-label="Scroll to about"
        >
          <span className="text-[0.6rem] uppercase tracking-widest">Scroll down</span>
          <motion.span
            animate={reduced ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
