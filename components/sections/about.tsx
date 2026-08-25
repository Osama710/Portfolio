import { Briefcase, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/lib/data";
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
  return (
    <section id="about" className="viewport-section">
      <ScrollReveal>
        <div className="about-panel-header">
          <p className="section-eyebrow">// About</p>
          <h2 className="section-display mt-3 max-w-2xl">
            Five years of turning product requirements into shipped software.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-muted sm:text-lg">
            A quick look at how Osama got here — and what he&apos;s focused on now.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.08} className="mt-5 block">
        <div className="about-log-panel">
          <p className="about-log-label">Summary</p>
          <p className="mt-4 text-balance text-lg leading-relaxed text-ink-muted sm:text-xl">
            {profile.summary}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.14} className="mt-5 block">
        <div className="about-log-panel border-l-2 border-editor-orange/50">
          <p className="about-log-label">Background</p>
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

      <ScrollReveal delay={0.2} className="mt-5 block">
        <div className="about-property-rail">
          {facts.map((fact) => (
            <div key={fact.label} className="about-property-cell">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-editor-blue/10 text-editor-blue">
                <fact.icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-faint">
                {fact.label}
              </p>
              <p className="mt-1.5 text-sm leading-snug text-ink">{fact.value}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
