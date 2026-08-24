import { Cloud, Code2, Database, Layout, Server, Sparkles } from "lucide-react";
import { skillCategories } from "@/lib/data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const iconMap = {
  code: Code2,
  layout: Layout,
  server: Server,
  database: Database,
  cloud: Cloud,
  sparkles: Sparkles,
};

export function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="A full-stack toolkit, sharpened on production fintech."
          description="Every tool here has shipped in a real product — from wallet APIs to admin dashboards."
          align="center"
          className="mb-16"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon];
            return (
              <ScrollReveal key={category.label} delay={index * 0.06}>
                <div className="glass-panel glass-panel-hover h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet/20 to-cyan/10 text-violet-soft">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-base font-semibold text-ink">
                      {category.label}
                    </h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-ink-muted transition-colors hover:border-violet/40 hover:text-ink"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
