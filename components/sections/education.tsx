import { Award, GraduationCap, Star } from "lucide-react";
import { certifications, education } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

export function Education() {
  return (
    <section id="education" className="site-section relative overflow-x-clip">
      <div className="site-container min-w-0">
        <SectionHeading
          label="Education"
          title="Education and certifications"
          description="Degree, certifications, and competition results."
        />

        <div className="section-reveal edu-reveal mt-8 flex min-w-0 flex-col gap-6">
          <div className="panel-vivid edu-degree-panel w-full min-w-0">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-violet/15 text-2xl">
              🎓
            </span>
            {education.map((item) => (
              <div key={item.degree} className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-cyan">{item.period}</p>
                <h3 className="mt-2 break-words font-display text-2xl font-bold text-ink">{item.degree}</h3>
                <p className="mt-2 break-words text-lg text-ink-muted">{item.school}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-ink-faint">
                    📍 {item.location}
                  </span>
                  <span className="rounded-full border border-accent-violet/30 bg-accent-violet/10 px-3 py-1 text-xs text-accent-violet">
                    {item.detail}
                  </span>
                </div>
              </div>
            ))}
            <div className="edu-footnote mt-6 flex items-center gap-2 border-t border-white/[0.06] pt-5 text-sm text-ink-faint">
              <GraduationCap className="h-4 w-4 shrink-0 text-accent-violet" aria-hidden="true" />
              BS Computer Science
            </div>
          </div>

          <div className="panel-hud edu-cert-panel w-full min-w-0 p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-coral/15 text-2xl">
                🏅
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-xl font-bold text-ink">Certifications and achievements</h3>
                <p className="text-sm text-ink-faint">Professional and academic credentials</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="edu-cert-card flex min-w-0 gap-3 rounded-2xl border border-white/[0.06] bg-void/40 p-4 transition-colors hover:border-accent-coral/30"
                >
                  <Star className="mt-0.5 h-4 w-4 shrink-0 text-accent-lime" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug text-ink">{cert.title}</p>
                    {cert.issuer ? <p className="mt-1 text-xs text-ink-faint">{cert.issuer}</p> : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="edu-footnote mt-6 flex items-center gap-2 rounded-2xl bg-gradient-brand-soft px-4 py-3 text-sm text-ink-muted">
              <Award className="h-4 w-4 shrink-0 text-accent-coral" aria-hidden="true" />
              Python certification and competitive programming background.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
