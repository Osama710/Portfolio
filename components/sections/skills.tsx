import { Cloud, Code2, Database, GripVertical, Layout, Server, Sparkles } from "lucide-react";
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
    <section id="skills" className="viewport-section">
      <SectionHeading
        eyebrow="// Attached Components"
        title="A full-stack toolkit, sharpened on production fintech."
        description="Every tool here has shipped in a real product — from wallet APIs to admin dashboards."
        align="center"
        className="mb-12"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {skillCategories.map((category, index) => {
          const Icon = iconMap[category.icon];
          return (
            <ScrollReveal key={category.label} delay={index * 0.04}>
              <div className="component-block">
                <div className="component-block-header">
                  <GripVertical
                    className="h-3.5 w-3.5 text-ink-faint opacity-50"
                    aria-hidden="true"
                  />
                  <Icon className="h-3.5 w-3.5 text-editor-blue" aria-hidden="true" />
                  <span className="font-mono text-xs font-medium text-ink">
                    {category.label}
                  </span>
                </div>
                <div className="component-block-body">
                  {category.skills.map((skill) => (
                    <span key={skill} className="component-skill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
