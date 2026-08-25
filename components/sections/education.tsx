import { Award, GraduationCap } from "lucide-react";
import { certifications, education } from "@/lib/data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Education() {
  return (
    <section id="education" className="viewport-section">
      <SectionHeading
        eyebrow="// Education"
        title="Foundations and a few milestones along the way."
        align="center"
        className="mb-12"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <ScrollReveal>
          <div className="editor-panel-card editor-panel-card-hover h-full p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-editor-blue/10 text-editor-blue">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
              Education
            </h3>
            <div className="mt-4 space-y-4">
              {education.map((item) => (
                <div key={item.degree}>
                  <p className="font-display text-lg font-semibold text-ink">
                    {item.degree}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">{item.school}</p>
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

        <ScrollReveal delay={0.08}>
          <div className="editor-panel-card editor-panel-card-hover h-full p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-editor-orange/10 text-editor-orange">
              <Award className="h-4 w-4" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
              Certifications &amp; Achievements
            </h3>
            <ul className="mt-4 space-y-3">
              {certifications.map((cert) => (
                <li
                  key={cert.title}
                  className="flex gap-3 text-sm leading-relaxed text-ink-muted"
                >
                  <span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-editor-orange"
                    aria-hidden="true"
                  />
                  {cert.title}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
