"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, GraduationCap, Star } from "lucide-react";
import { certifications, education } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

export function Education() {
  const reduced = useReducedMotion();

  return (
    <section id="education" className="site-section section-wash-cyan relative">
      <SectionHeading
        label="Education"
        title="Foundations & wins"
        align="center"
        description="Degree, certs, and milestones that shaped the engineer."
        className="mb-14"
      />

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <motion.div
          className="lg:col-span-5"
          initial={reduced ? false : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="panel-vivid h-full">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-violet/15 text-2xl">
                🎓
              </span>
              {education.map((item) => (
                <div key={item.degree} className="mt-6 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent-cyan">
                    {item.period}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                    {item.degree}
                  </h3>
                  <p className="mt-2 text-lg text-ink-muted">{item.school}</p>
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
              <div className="mt-6 flex items-center gap-2 border-t border-white/[0.06] pt-5 text-sm text-ink-faint">
                <GraduationCap className="h-4 w-4 text-accent-violet" aria-hidden="true" />
                Computer Science foundation
              </div>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          initial={reduced ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="panel-hud h-full p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-coral/15 text-2xl">
                🏅
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">
                  Certifications & achievements
                </h3>
                <p className="text-sm text-ink-faint">Badges earned along the way</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  className="flex gap-3 rounded-2xl border border-white/[0.06] bg-void/40 p-4 transition-colors hover:border-accent-coral/30"
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={reduced ? undefined : { y: -2 }}
                >
                  <Star className="mt-0.5 h-4 w-4 shrink-0 text-accent-lime" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium leading-snug text-ink">{cert.title}</p>
                    {cert.issuer ? (
                      <p className="mt-1 text-xs text-ink-faint">{cert.issuer}</p>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2 rounded-2xl bg-gradient-brand-soft px-4 py-3 text-sm text-ink-muted">
              <Award className="h-4 w-4 text-accent-coral" aria-hidden="true" />
              Continuous learner — always stacking new skills 🚀
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
