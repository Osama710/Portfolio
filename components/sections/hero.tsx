"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, MapPin } from "lucide-react";
import { heroStats, profile } from "@/lib/data";
import { channelMarker, getChannelById } from "@/lib/channels";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { StatusDot } from "@/components/ui/status-dot";

const SPARK_POINTS =
  "M0,42 C10,40 18,44 28,36 C38,28 44,34 54,26 C64,18 72,24 82,14 C92,4 100,10 110,2";

const [firstName, ...restName] = profile.name.split(" ");
const lastName = restName.join(" ") || firstName;

function WalletPipCard({
  cardRef,
  transformStyle,
  onMouseMove,
  onMouseLeave,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>;
  transformStyle: ReturnType<typeof useMotionTemplate>;
  onMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transform: transformStyle }}
      className="glass-panel hero-pip-card relative overflow-hidden"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 font-mono text-[0.6rem] text-phosphor/60">
          raptr_wallet — production
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-crt-amber/80">
            Wallet Overview
          </span>
          <span className="flex items-center gap-1 rounded-full bg-phosphor/10 px-2 py-0.5 font-mono text-[0.58rem] text-phosphor">
            <StatusDot color="phosphor" />
            Live
          </span>
        </div>

        <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
          <AnimatedCounter value="75,000" suffix="+" />
        </p>
        <p className="mt-0.5 text-xs text-ink-muted">Active users on Raptr Wallet</p>

        <div className="mt-3 h-10 w-full">
          <svg
            viewBox="0 0 110 46"
            fill="none"
            className="h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={SPARK_POINTS}
              stroke="url(#sparkGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="1000"
              className="animate-draw"
            />
            <defs>
              <linearGradient id="sparkGradient" x1="0" y1="0" x2="110" y2="0">
                <stop offset="0%" stopColor="#39FF14" />
                <stop offset="100%" stopColor="#FFB000" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-sm font-semibold text-ink">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-0.5 text-[0.58rem] leading-tight text-ink-faint">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const heroChannel = getChannelById("hero");

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 18 });
  const transformStyle = useMotionTemplate`rotateX(${springX}deg) rotateY(${springY}deg)`;

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(py * -8);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-12 pt-28 sm:pt-24 lg:pb-16"
    >
      <div className="container flex flex-col gap-8 lg:gap-10">
        {/* CH 01 tuning bar — full width */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hero-tuning-bar"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="broadcast-label-live" aria-hidden="true" />
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-crt-amber">
              {channelMarker(heroChannel)}
            </span>
            <span className="hidden h-px flex-1 bg-gradient-to-r from-crt-amber/40 via-phosphor/20 to-transparent sm:block" aria-hidden="true" />
            <span className="flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-phosphor/70">
              <StatusDot color="phosphor" />
              Signal locked
            </span>
          </div>
          <div className="hero-tuning-ticks mt-2" aria-hidden="true" />
        </motion.div>

        {/* Name stage — card overlaps whitespace on lg+, stacks below on narrow */}
        <div className="hero-name-stage relative">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="hero-display-stacked"
          >
            <span className="hero-name-line block">{firstName}</span>
            <span className="hero-name-line block">{lastName}</span>
            <span className="hero-display-accent mt-3 block">{profile.title}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1200 }}
            className="hero-pip-wrap mx-auto mt-8 w-full max-w-[300px] lg:mx-0 lg:mt-0"
          >
            <div className="animate-float lg:animate-none">
              <WalletPipCard
                cardRef={cardRef}
                transformStyle={transformStyle}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            </div>
            <p className="mt-2 hidden font-mono text-[0.55rem] uppercase tracking-[0.2em] text-crt-amber/60 lg:block" aria-hidden="true">
              PiP · live feed
            </p>
          </motion.div>
        </div>

        {/* Telemetry strip — full-width tagline readout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="hero-telemetry-strip"
        >
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-crt-amber/70">
            Telemetry · role summary
          </p>
          <p className="hero-lead mt-3 max-w-3xl">{profile.tagline}</p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
            <StatusDot color="phosphor" />
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-ink-muted">
              Open to relocation
            </span>
          </span>
        </motion.div>

        {/* Bottom action rail */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="hero-action-rail"
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-phosphor px-6 py-3.5 text-sm font-semibold text-void shadow-[0_0_40px_-5px_rgba(57,255,20,0.35)] transition-transform hover:scale-[1.03]"
            >
              View Projects
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={profile.resumeFile}
              download
              className="inline-flex items-center gap-2 rounded-full border border-crt-amber/30 bg-crt-amber/[0.06] px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-crt-amber/10"
            >
              <Download className="h-4 w-4 text-crt-amber" aria-hidden="true" />
              Download CV
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-faint">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.location}
            </span>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1.5 transition-colors hover:text-phosphor-soft"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.githubLabel}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1.5 transition-colors hover:text-phosphor-soft"
            >
              <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
