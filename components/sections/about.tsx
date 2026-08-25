"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

const journey = [
  { year: "2020", label: "Freelance kickoff", emoji: "💼", detail: "Fiverr & Upwork while at university", hue: "violet" },
  { year: "2022", label: "WeUno Technologies", emoji: "🏢", detail: "Agency delivery on client products", hue: "cyan" },
  { year: "2024", label: "Raptr Games", emoji: "🎮", detail: "Fintech + e-commerce at scale", hue: "coral" },
  { year: "2025", label: "Senior promotion", emoji: "🚀", detail: "Lead on Wallet, Store & admin", hue: "lime" },
];

const hueMap = {
  violet: "from-accent-violet/25 to-transparent border-accent-violet/30 hover:border-accent-violet/50",
  cyan: "from-accent-cyan/25 to-transparent border-accent-cyan/30 hover:border-accent-cyan/50",
  coral: "from-accent-coral/25 to-transparent border-accent-coral/30 hover:border-accent-coral/50",
  lime: "from-accent-lime/20 to-transparent border-accent-lime/30 hover:border-accent-lime/50",
};

export function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="site-section section-wash-violet relative overflow-hidden">
      <SectionHeading
        label="About"
        title="Built in public, shipped in production"
        description="From freelance hustle to senior engineer — still obsessed with products people actually use."
        className="mb-12"
      />

      <div className="relative grid gap-6 lg:grid-cols-12">
        <motion.div
          className="panel-vivid lg:col-span-5 lg:row-span-2"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-5xl font-bold leading-none text-ink/10 sm:text-6xl">
            MO
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent-coral">
            The short version
          </p>
          <p className="mt-4 text-xl font-medium leading-relaxed text-ink sm:text-2xl">
            I build{" "}
            <span className="text-accent-cyan">systems people trust</span> with their
            money — and platforms teams ship every day.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["💻 Full stack", "💳 Fintech", "🛒 E-commerce", "⚡ 10+ shipped"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-ink-muted transition-all hover:border-accent-violet/30 hover:text-ink"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="panel-hud lg:col-span-7"
          initial={reduced ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-cyan">
            Full story
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            {profile.summary}
          </p>
          <p className="mt-4 border-l-2 border-accent-violet/40 pl-4 text-sm leading-relaxed text-ink-faint">
            Osama started freelancing on Fiverr and Upwork in 2020 while still in
            university. After graduating, he joined WeUno Technologies, then Raptr
            Games — where consistent delivery earned a promotion to{" "}
            <span className="font-medium text-accent-coral">Senior Software Engineer</span>.
            Freelance work continues alongside his full-time role today.
          </p>
        </motion.div>

        <motion.div
          className="panel-hud lg:col-span-7"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { n: "5+", label: "Years shipping", c: "text-accent-violet" },
              { n: "10+", label: "Live products", c: "text-accent-cyan" },
              { n: "75k+", label: "Wallet users (team)", c: "text-accent-coral" },
              { n: "PK", label: "Open to relocate", c: "text-accent-lime" },
            ].map((s) => (
              <div key={s.label} className="stat-chip">
                <p className={`font-display text-2xl font-bold ${s.c}`}>{s.n}</p>
                <p className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-ink-faint">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-14"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-accent-cyan">
          The journey
        </p>
        <div className="panel-hud overflow-x-auto">
          <div className="flex min-w-[720px] items-start justify-between gap-4">
            {journey.map((step, i) => (
              <motion.div
                key={step.year}
                className="flex w-[150px] flex-col items-center text-center"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span
                  className={`hover-lift flex h-14 w-14 cursor-default items-center justify-center rounded-2xl border bg-gradient-to-br text-2xl ${hueMap[step.hue as keyof typeof hueMap]}`}
                >
                  {step.emoji}
                </span>
                {i < journey.length - 1 ? (
                  <span
                    className="mt-3 hidden h-px w-full max-w-[80px] bg-gradient-to-r from-accent-violet/50 to-accent-cyan/30 sm:block"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="mt-3 font-mono text-xs font-bold text-accent-violet">
                  {step.year}
                </span>
                <span className="mt-1 font-display text-sm font-semibold text-ink">
                  {step.label}
                </span>
                <span className="mt-1 text-[0.65rem] leading-snug text-ink-faint">
                  {step.detail}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
