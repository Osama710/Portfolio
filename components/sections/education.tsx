import { Award, GraduationCap } from "lucide-react";
import { certifications, education } from "@/lib/data";
import { channelMarker, getChannelById } from "@/lib/channels";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Education() {
  const educationChannel = getChannelById("education");

  return (
    <section id="education" className="relative py-28 sm:py-32">
      <div className="container">
        <SectionHeading
          channel={channelMarker(educationChannel)}
          eyebrow="Education & Achievements"
          title="Foundations and a few milestones along the way."
          align="center"
          className="mb-16"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <ScrollReveal>
            <div className="glass-panel glass-panel-hover h-full p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-phosphor/10 text-phosphor-soft">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                Education
              </h3>
              <div className="mt-4 space-y-4">
                {education.map((item) => (
                  <div key={item.degree}>
                    <p className="font-display text-lg font-semibold text-ink">
                      {item.degree}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">
                      {item.school}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-ink-faint">
                      <span>{item.period}</span>
                      <span>{item.detail}</span>
                      <span>{item.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="glass-panel glass-panel-hover h-full p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-crt-amber/10 text-crt-amber">
                <Award className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                Certifications &amp; Achievements
              </h3>
              <ul className="mt-4 space-y-3">
                {certifications.map((cert) => (
                  <li
                    key={cert.title}
                    className="flex gap-3 text-sm leading-relaxed text-ink-muted"
                  >
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-crt-amber"
                      aria-hidden="true"
                    />
                    {cert.title}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
