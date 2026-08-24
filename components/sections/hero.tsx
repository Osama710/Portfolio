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
    rotateY.set(px * 10);
    rotateX.set(py * -10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 sm:pt-24"
    >
      <div className="container grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Copy column */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="channel-tag mb-4"
          >
            <span className="h-px w-4 bg-phosphor/40" aria-hidden="true" />
            {channelMarker(heroChannel)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5"
          >
            <StatusDot color="mint" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              Open to relocation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[3.75rem]"
          >
            {profile.name},{" "}
            <span className="text-gradient">{profile.title}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-muted"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
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
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white/[0.08]"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-faint"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.location}
            </span>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1.5 transition-colors hover:text-ink"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.githubLabel}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1.5 transition-colors hover:text-ink"
            >
              <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
              LinkedIn
            </a>
          </motion.div>
        </div>

        {/* Signature dashboard card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1200 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="animate-float">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
            className="glass-panel relative overflow-hidden"
          >
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-5 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 font-mono text-[0.7rem] text-phosphor/50">
                CH 01 · LIVE FEED
              </span>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Wallet Overview</span>
                <span className="flex items-center gap-1.5 rounded-full bg-mint/10 px-2.5 py-1 font-mono text-[0.65rem] text-mint">
                  <StatusDot color="mint" />
                  Live
                </span>
              </div>

              <div className="mt-5">
                <p className="font-display text-4xl font-semibold tracking-tight text-ink">
                  <AnimatedCounter value="75,000" suffix="+" />
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  Active users on Raptr Wallet
                </p>
              </div>

              <div className="mt-5 h-14 w-full">
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
                    <linearGradient
                      id="sparkGradient"
                      x1="0"
                      y1="0"
                      x2="110"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#7C5CFF" />
                      <stop offset="100%" stopColor="#22D3EE" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-lg font-semibold text-ink">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </p>
                    <p className="mt-0.5 text-[0.65rem] leading-tight text-ink-faint">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          </div>

          {/* floating tech badge */}
          <div className="animate-float-slow absolute -bottom-6 -left-6 hidden sm:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-panel px-4 py-2.5"
            >
              <p className="font-mono text-[0.7rem] text-ink-muted">
                KYC · JWT · Webhooks
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
