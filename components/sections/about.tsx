import { Briefcase, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/lib/data";
import { channelMarker, getChannelById } from "@/lib/channels";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const facts = [
  {
    icon: Briefcase,
    label: "Currently",
    value: "Senior Software Engineer at Raptr Games",
  },
  {
    icon: Sparkles,
    label: "Focus",
    value: "Fintech systems, payments & admin platforms",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "BS Computer Science, Usman Institute of Technology",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: `${profile.location} · ${profile.relocation}`,
  },
];

export function About() {
  const aboutChannel = getChannelById("about");

  return (
    <section id="about" className="relative py-28 sm:py-32">
      <div className="container space-y-6">
        {/* Full-width transmission header bar */}
        <ScrollReveal>
          <div className="transmission-header">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-crt-amber">
                  {channelMarker(aboutChannel)}
                </p>
                <h2 className="section-display mt-3 max-w-3xl">
                  Five years of turning product requirements into shipped software.
                </h2>
              </div>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-phosphor/60">
                Signal: strong
              </span>
            </div>
            <p className="mt-4 max-w-2xl text-base text-ink-muted sm:text-lg">
              A quick look at how Osama got here — and what he&apos;s focused on now.
            </p>
          </div>
        </ScrollReveal>

        {/* Log entry 01 — summary */}
        <ScrollReveal delay={0.08}>
          <div className="transmission-log">
            <p className="transmission-log-label">Log 01 · Summary</p>
            <p className="mt-4 text-balance text-lg leading-relaxed text-ink-muted sm:text-xl">
              {profile.summary}
            </p>
          </div>
        </ScrollReveal>

        {/* Log entry 02 — background narrative */}
        <ScrollReveal delay={0.14}>
          <div className="transmission-log transmission-log-accent">
            <p className="transmission-log-label">Log 02 · Background</p>
            <p className="mt-4 text-balance leading-relaxed text-ink-muted sm:text-lg">
              Osama started out freelancing on Fiverr and Upwork in 2020,
              building Python tools and full-stack websites while still
              in university. That freelance work continues alongside his
              full-time career today. After graduating with a BS in
              Computer Science, he joined WeUno Technologies as a Full
              Stack Developer, then moved to Raptr Games — where steady,
              reliable delivery on fintech and e-commerce products earned
              him a promotion to Senior Software Engineer.
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontal status rail — not a 2×2 grid */}
        <ScrollReveal delay={0.2}>
          <div className="status-rail">
            {facts.map((fact) => (
              <div key={fact.label} className="status-rail-cell">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-phosphor/10 text-phosphor-soft">
                  <fact.icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-crt-amber/80">
                  {fact.label}
                </p>
                <p className="mt-1.5 text-sm leading-snug text-ink">{fact.value}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
