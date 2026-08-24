import { experience } from "@/lib/data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusDot } from "@/components/ui/status-dot";
import { TechPill } from "@/components/ui/tech-pill";

export function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Where the work happened, in order."
          description="Five roles across fintech, agency, and freelance work — each one building on the last."
          className="mb-16"
        />

        <div className="relative">
          <div
            className="absolute left-[15px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-violet/60 via-white/10 to-transparent sm:block"
            aria-hidden="true"
          />

          <ol className="space-y-10">
            {experience.map((item, index) => (
              <li key={`${item.company}-${item.period}`} className="relative">
                <ScrollReveal delay={index * 0.05}>
                  <div className="grid gap-4 sm:grid-cols-[32px_1fr] sm:gap-6">
                    <div className="hidden sm:flex sm:justify-center sm:pt-1.5">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                          item.current
                            ? "border-violet/50 bg-violet/15"
                            : "border-white/15 bg-surface-2"
                        }`}
                      >
                        {item.current ? (
                          <StatusDot color="violet" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
                        )}
                      </span>
                    </div>

                    <div className="glass-panel glass-panel-hover p-6 sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-lg font-semibold text-ink">
                            {item.role}
                          </h3>
                          <p className="mt-1 text-sm text-violet-soft">
                            {item.company} · {item.location}
                          </p>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-ink-muted">
                          {item.period}
                        </span>
                      </div>

                      <ul className="mt-5 space-y-2.5">
                        {item.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-2.5 text-sm leading-relaxed text-ink-muted"
                          >
                            <span
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint"
                              aria-hidden="true"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tech.map((tech) => (
                          <TechPill key={tech}>{tech}</TechPill>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
