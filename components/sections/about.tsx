import { Briefcase, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/lib/data";
import { channelMarker, getChannelById } from "@/lib/channels";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";

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
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            channel={channelMarker(aboutChannel)}
            eyebrow="About"
            title="Five years of turning product requirements into shipped software."
            description="A quick look at how Osama got here — and what he's focused on now."
          />

          <div className="space-y-8">
            <ScrollReveal delay={0.1}>
              <p className="text-balance text-lg leading-relaxed text-ink-muted">
                {profile.summary}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-balance leading-relaxed text-ink-muted">
                Osama started out freelancing on Fiverr and Upwork in 2020,
                building Python tools and full-stack websites while still
                in university. That freelance work continues alongside his
                full-time career today. After graduating with a BS in
                Computer Science, he joined WeUno Technologies as a Full
                Stack Developer, then moved to Raptr Games — where steady,
                reliable delivery on fintech and e-commerce products earned
                him a promotion to Senior Software Engineer.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="grid gap-4 sm:grid-cols-2">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="glass-panel glass-panel-hover flex items-start gap-3.5 p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet/10 text-violet-soft">
                      <fact.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-faint">
                        {fact.label}
                      </p>
                      <p className="mt-1 text-sm leading-snug text-ink">
                        {fact.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
